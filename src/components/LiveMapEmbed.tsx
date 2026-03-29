'use client';

import { useEffect, useState, useCallback } from 'react';
import { MapContainer, TileLayer, Marker, Circle, Polyline, Tooltip, useMap } from 'react-leaflet';
import L from 'leaflet';
import 'leaflet/dist/leaflet.css';

// ─── COORDINATES ────────────────────────────────────────────

const stagingPos: [number, number] = [33.5350, -111.8550];
const fireTarget: [number, number] = [33.5590, -111.8030];

// Transit path: staging → fire
const transitPath: [number, number][] = [
  stagingPos,
  [33.5400, -111.8480],
  [33.5520, -111.8300],
  fireTarget,
];

// Return path: fire → staging
const returnPath: [number, number][] = [
  fireTarget,
  [33.5520, -111.8300],
  [33.5400, -111.8480],
  stagingPos,
];

// Pre-placed AI detection points (appear during search)
const detectionPoints: { pos: [number, number]; time: number; label: string }[] = [
  { pos: [33.5594, -111.8038], time: 45, label: 'Person detected' },
  { pos: [33.5602, -111.8015], time: 80, label: 'Person detected' },
  { pos: [33.5578, -111.8055], time: 120, label: 'Person detected' },
];

// ─── ICONS ──────────────────────────────────────────────────

const aircraftIcon = L.divIcon({
  html: `<div style="position:relative;width:20px;height:20px;">
    <div style="position:absolute;inset:0;border-radius:50%;background:#dc2626;opacity:0.3;animation:mapPulse 2s ease-in-out infinite;"></div>
    <div style="position:absolute;inset:4px;border-radius:50%;background:#dc2626;border:2px solid #fff;"></div>
  </div>
  <style>@keyframes mapPulse{0%,100%{transform:scale(1);opacity:.3}50%{transform:scale(2.2);opacity:0}}</style>`,
  className: '', iconSize: [20, 20], iconAnchor: [10, 10],
});

const fireIcon = L.divIcon({
  html: `<div style="position:relative;width:18px;height:18px;">
    <div style="position:absolute;inset:0;border-radius:50%;background:#f97316;opacity:.25;animation:mapPulse 3s ease-in-out infinite;"></div>
    <div style="position:absolute;inset:3px;border-radius:50%;background:#f97316;border:2px solid #fff;"></div>
  </div>`,
  className: '', iconSize: [18, 18], iconAnchor: [9, 9],
});

const stagingIcon = L.divIcon({
  html: `<div style="width:12px;height:12px;border-radius:50%;background:#3b82f6;border:2px solid #fff;"></div>`,
  className: '', iconSize: [12, 12], iconAnchor: [6, 6],
});

const personIcon = L.divIcon({
  html: `<div style="display:flex;align-items:center;justify-content:center;width:20px;height:20px;border-radius:50%;background:#dc2626;border:2px solid #fff;color:#fff;font-family:monospace;font-size:10px;font-weight:bold;animation:mapPulse 2s ease-in-out infinite;">P</div>`,
  className: '', iconSize: [20, 20], iconAnchor: [10, 10],
});

// ─── MISSION PHASES ─────────────────────────────────────────

type Phase = 'transit' | 'search' | 'rtb' | 'landed';

// Generate expanding spiral search pattern around fire target
function generateSearchPattern(center: [number, number], elapsed: number): [number, number] {
  // Spiral outward — radius grows over time, angle rotates
  const maxRadius = 0.006; // ~600m in degrees
  const rotSpeed = 0.03; // radians per tick
  const growRate = 0.000008; // radius growth per tick

  const angle = elapsed * rotSpeed;
  const radius = Math.min(elapsed * growRate, maxRadius);

  const lat = center[0] + Math.cos(angle) * radius;
  const lng = center[1] + Math.sin(angle) * radius * 1.2; // stretch for longitude

  return [lat, lng];
}

// ─── MAP INTERNALS ──────────────────────────────────────────

function FitBounds() {
  const map = useMap();
  useEffect(() => {
    map.fitBounds(L.latLngBounds([33.525, -111.870], [33.570, -111.790]), { padding: [30, 30] });
  }, [map]);
  return null;
}

interface AnimatedMissionProps {
  onDetection: (det: { lat: number; lng: number; label: string }) => void;
  onPhaseChange: (phase: Phase) => void;
  searchDuration: number; // seconds of search before RTB
}

function AnimatedMission({ onDetection, onPhaseChange, searchDuration }: AnimatedMissionProps) {
  const [pos, setPos] = useState<[number, number]>(stagingPos);
  const [phase, setPhase] = useState<Phase>('transit');
  const [searchElapsed, setSearchElapsed] = useState(0);
  const [searchTrail, setSearchTrail] = useState<[number, number][]>([]);
  const [detections, setDetections] = useState<{ pos: [number, number]; label: string }[]>([]);
  const [transitStep, setTransitStep] = useState(0);
  const [rtbStep, setRtbStep] = useState(0);
  const [marker, setMarker] = useState<L.Marker | null>(null);
  const [cameraCircle, setCameraCircle] = useState<L.Circle | null>(null);

  // Transit to target (~40 seconds at 100ms ticks = 400 steps)
  const TRANSIT_STEPS = 400;
  const RTB_STEPS = 400;

  useEffect(() => {
    const interval = setInterval(() => {
      if (phase === 'transit') {
        setTransitStep((prev) => {
          const next = prev + 1;
          if (next >= TRANSIT_STEPS) {
            setPhase('search');
            onPhaseChange('search');
            return prev;
          }
          const t = next / TRANSIT_STEPS;
          const pathLen = transitPath.length - 1;
          const segFloat = t * pathLen;
          const seg = Math.min(Math.floor(segFloat), pathLen - 1);
          const segT = segFloat - seg;
          const lat = transitPath[seg][0] + (transitPath[seg + 1][0] - transitPath[seg][0]) * segT;
          const lng = transitPath[seg][1] + (transitPath[seg + 1][1] - transitPath[seg][1]) * segT;
          setPos([lat, lng]);
          return next;
        });
      } else if (phase === 'search') {
        setSearchElapsed((prev) => {
          const next = prev + 1;
          // Check for RTB (searchDuration is in seconds, ticks are 100ms = 10 ticks/sec)
          if (next >= searchDuration * 10) {
            setPhase('rtb');
            onPhaseChange('rtb');
            return prev;
          }
          const newPos = generateSearchPattern(fireTarget, next);
          setPos(newPos);
          // Add to trail every 5 ticks
          if (next % 5 === 0) {
            setSearchTrail((trail) => [...trail, newPos]);
          }
          // Check for AI detections
          for (const det of detectionPoints) {
            if (Math.abs(next - det.time * 10) < 5) {
              // Only fire once (check if already detected)
              setDetections((prev) => {
                if (prev.some((d) => d.pos[0] === det.pos[0] && d.pos[1] === det.pos[1])) return prev;
                onDetection({ lat: det.pos[0], lng: det.pos[1], label: det.label });
                return [...prev, { pos: det.pos, label: det.label }];
              });
            }
          }
          return next;
        });
      } else if (phase === 'rtb') {
        setRtbStep((prev) => {
          const next = prev + 1;
          if (next >= RTB_STEPS) {
            setPhase('landed');
            onPhaseChange('landed');
            setPos(stagingPos);
            return prev;
          }
          const t = next / RTB_STEPS;
          const pathLen = returnPath.length - 1;
          const segFloat = t * pathLen;
          const seg = Math.min(Math.floor(segFloat), pathLen - 1);
          const segT = segFloat - seg;
          const lat = returnPath[seg][0] + (returnPath[seg + 1][0] - returnPath[seg][0]) * segT;
          const lng = returnPath[seg][1] + (returnPath[seg + 1][1] - returnPath[seg][1]) * segT;
          setPos([lat, lng]);
          return next;
        });
      }
    }, 100);

    return () => clearInterval(interval);
  }, [phase, onDetection, onPhaseChange, searchDuration]);

  // Update marker and camera circle
  useEffect(() => {
    if (marker) marker.setLatLng(pos);
    if (cameraCircle) cameraCircle.setLatLng(pos);
  }, [pos, marker, cameraCircle]);

  const phaseLabel = phase === 'transit' ? 'EN ROUTE' : phase === 'search' ? 'SEARCHING' : phase === 'rtb' ? 'RTB' : 'LANDED';

  return (
    <>
      {/* Search trail */}
      {searchTrail.length > 1 && (
        <Polyline positions={searchTrail} pathOptions={{ color: '#22c55e', weight: 1.5, opacity: 0.4 }} />
      )}

      {/* Camera FOV circle — blue */}
      <Circle
        center={pos}
        radius={200}
        pathOptions={{ color: '#3b82f6', fillColor: '#3b82f6', fillOpacity: 0.1, weight: 1.5, opacity: 0.6 }}
        ref={(ref) => { if (ref) setCameraCircle(ref); }}
      />

      {/* Search area covered (expanding during search) */}
      {phase === 'search' && searchElapsed > 0 && (
        <Circle
          center={fireTarget}
          radius={Math.min(searchElapsed * 0.08, 600)}
          pathOptions={{ color: '#22c55e', fillColor: '#22c55e', fillOpacity: 0.04, weight: 1, dashArray: '4, 4', opacity: 0.3 }}
        />
      )}

      {/* AI person detections */}
      {detections.map((det, i) => (
        <Marker key={i} position={det.pos} icon={personIcon}>
          <Tooltip permanent direction="right" offset={[14, 0]}
            className="!bg-red-600 !text-white !text-[8px] !font-mono !px-1.5 !py-0.5 !rounded !shadow-lg !border-0">
            AI: {det.label}
          </Tooltip>
        </Marker>
      ))}

      {/* Aircraft marker */}
      <Marker position={pos} icon={aircraftIcon}
        ref={(ref) => { if (ref) setMarker(ref); }}>
        <Tooltip permanent direction="top" offset={[0, -14]}
          className="!bg-white !text-slate-900 !text-[10px] !font-mono !px-2 !py-0.5 !rounded !shadow-lg !border-0">
          Blackfly · {phaseLabel}
        </Tooltip>
      </Marker>
    </>
  );
}

// ─── MAIN EXPORT ────────────────────────────────────────────

interface LiveMapEmbedProps {
  onDetection?: (det: { lat: number; lng: number; label: string }) => void;
  onPhaseChange?: (phase: string) => void;
  searchDuration?: number;
}

export default function LiveMapEmbed({
  onDetection,
  onPhaseChange,
  searchDuration = 167,
}: LiveMapEmbedProps) {
  const handleDetection = useCallback((det: { lat: number; lng: number; label: string }) => {
    onDetection?.(det);
  }, [onDetection]);

  const handlePhaseChange = useCallback((phase: Phase) => {
    onPhaseChange?.(phase);
  }, [onPhaseChange]);

  return (
    <MapContainer
      center={[33.5470, -111.8290]}
      zoom={13}
      style={{ height: '100%', width: '100%' }}
      zoomControl={false}
      scrollWheelZoom={false}
    >
      <TileLayer
        url="https://{s}.google.com/vt/lyrs=s&x={x}&y={y}&z={z}"
        subdomains={['mt0', 'mt1', 'mt2', 'mt3']}
        attribution="&copy; Google"
      />
      <FitBounds />

      {/* Transit path */}
      <Polyline positions={transitPath} pathOptions={{ color: '#dc2626', weight: 2, opacity: 0.5, dashArray: '8, 6' }} />

      {/* Return path (shown faintly) */}
      <Polyline positions={returnPath} pathOptions={{ color: '#64748b', weight: 1, opacity: 0.3, dashArray: '4, 4' }} />

      {/* Fire target zone */}
      <Circle center={fireTarget} radius={500}
        pathOptions={{ color: '#f97316', fillColor: '#f97316', fillOpacity: 0.08, weight: 1.5, dashArray: '6, 4' }} />

      {/* Staging marker */}
      <Marker position={stagingPos} icon={stagingIcon}>
        <Tooltip permanent direction="bottom" offset={[0, 8]}
          className="!bg-white !text-slate-900 !text-[9px] !font-mono !px-1.5 !py-0.5 !rounded !shadow-lg !border-0">
          Staging
        </Tooltip>
      </Marker>

      {/* Fire target marker */}
      <Marker position={fireTarget} icon={fireIcon}>
        <Tooltip permanent direction="top" offset={[0, -12]}
          className="!bg-white !text-slate-900 !text-[9px] !font-mono !px-1.5 !py-0.5 !rounded !shadow-lg !border-0">
          Fire Target
        </Tooltip>
      </Marker>

      {/* Animated mission (transit → search → RTB) */}
      <AnimatedMission
        onDetection={handleDetection}
        onPhaseChange={handlePhaseChange}
        searchDuration={searchDuration}
      />
    </MapContainer>
  );
}
