'use client';

import { useEffect, useState } from 'react';
import { MapContainer, TileLayer, Marker, Popup, Polyline, Circle, useMap } from 'react-leaflet';
import L from 'leaflet';
import 'leaflet/dist/leaflet.css';

const createIcon = (color: string, size = 16, label?: string) => {
  const labelHtml = label
    ? `<div style="position:absolute;top:-14px;left:50%;transform:translateX(-50%);font-family:monospace;font-size:7px;color:${color};white-space:nowrap;text-shadow:0 0 3px #000,0 0 3px #000">${label}</div>`
    : '';
  const svg = `<div style="position:relative">${labelHtml}<svg xmlns="http://www.w3.org/2000/svg" viewBox="0 0 24 36" width="${size}" height="${Math.round(size * 1.5)}">
    <path d="M12 0C5.4 0 0 5.4 0 12c0 9 12 24 12 24s12-15 12-24C24 5.4 18.6 0 12 0z" fill="${color}" stroke="#fff" stroke-width="1.5"/>
    <circle cx="12" cy="12" r="5" fill="#fff"/>
  </svg></div>`;
  return L.divIcon({
    html: svg, className: '', iconSize: [size, Math.round(size * 1.5)],
    iconAnchor: [size / 2, Math.round(size * 1.5)], popupAnchor: [0, -Math.round(size * 1.5)],
  });
};

const createDroneIcon = (heading: number, color = '#22c55e') => {
  const svg = `<svg xmlns="http://www.w3.org/2000/svg" viewBox="0 0 32 32" width="24" height="24" style="transform:rotate(${heading}deg)">
    <polygon points="16,2 26,28 16,22 6,28" fill="${color}" stroke="#fff" stroke-width="1.5" opacity="0.9"/>
  </svg>`;
  return L.divIcon({ html: svg, className: '', iconSize: [24, 24], iconAnchor: [12, 12], popupAnchor: [0, -12] });
};

// ─── RIO VERDE DESERT WILDFIRE SCENARIO ─────────────────────
// Staging at Rio Verde fire station, fire is ~5nm NE in remote desert

const stagingPos: [number, number] = [33.5350, -111.8550];  // Rio Verde FD Station 1

// Multi-waypoint flight plan: launch → climb → transit → survey legs → loiter → RTB
const waypoints: { pos: [number, number]; name: string; alt: number }[] = [
  { pos: [33.5350, -111.8550], name: 'WP1 LAUNCH', alt: 0 },
  { pos: [33.5400, -111.8480], name: 'WP2 CLIMB', alt: 800 },
  { pos: [33.5520, -111.8300], name: 'WP3 TRANSIT', alt: 1200 },
  { pos: [33.5680, -111.8100], name: 'WP4 SURVEY-N', alt: 1000 },
  { pos: [33.5600, -111.7950], name: 'WP5 SURVEY-E', alt: 1000 },
  { pos: [33.5500, -111.8000], name: 'WP6 SURVEY-S', alt: 800 },
  { pos: [33.5580, -111.8080], name: 'WP7 LOITER', alt: 1000 },
  { pos: [33.5520, -111.8300], name: 'WP8 RTB-TRANS', alt: 1200 },
  { pos: [33.5350, -111.8550], name: 'WP9 LAND', alt: 0 },
];

const flightPath = waypoints.map((w) => w.pos);

// Fire center — remote desert NE of Rio Verde
const fireCenter: [number, number] = [33.5590, -111.8030];
// Secondary fire spot
const fireSpot2: [number, number] = [33.5650, -111.7970];

function FitBounds() {
  const map = useMap();
  useEffect(() => {
    const allPoints = [...flightPath, fireCenter, fireSpot2];
    const lats = allPoints.map((p) => p[0]);
    const lngs = allPoints.map((p) => p[1]);
    map.fitBounds(L.latLngBounds(
      [Math.min(...lats) - 0.008, Math.min(...lngs) - 0.008],
      [Math.max(...lats) + 0.008, Math.max(...lngs) + 0.008]
    ), { padding: [20, 20] });
  }, [map]);
  return null;
}

// ─── ANIMATED DRONE-1 ───────────────────────────────────────
function AnimatedDrone1({ onPositionUpdate }: { onPositionUpdate: (pos: [number, number]) => void }) {
  const [pos, setPos] = useState<[number, number]>(flightPath[3]);
  const [heading, setHeading] = useState(45);
  const [marker, setMarker] = useState<L.Marker | null>(null);

  useEffect(() => {
    let step = 0;
    const interval = setInterval(() => {
      step++;
      const totalSteps = 600; // Slower loop for longer path
      const t = (step % totalSteps) / totalSteps;
      const pathLen = flightPath.length - 1;
      const segFloat = t * pathLen;
      const seg = Math.min(Math.floor(segFloat), pathLen - 1);
      const segT = segFloat - seg;
      const lat = flightPath[seg][0] + (flightPath[seg + 1][0] - flightPath[seg][0]) * segT;
      const lng = flightPath[seg][1] + (flightPath[seg + 1][1] - flightPath[seg][1]) * segT;
      const dlat = flightPath[seg + 1][0] - flightPath[seg][0];
      const dlng = flightPath[seg + 1][1] - flightPath[seg][1];
      const angle = (Math.atan2(dlng, dlat) * 180 / Math.PI + 360) % 360;
      setPos([lat, lng]);
      setHeading(angle);
      onPositionUpdate([lat, lng]);
    }, 100);
    return () => clearInterval(interval);
  }, [onPositionUpdate]);

  useEffect(() => {
    if (marker) { marker.setLatLng(pos); marker.setIcon(createDroneIcon(heading, '#22c55e')); }
  }, [pos, heading, marker]);

  return (
    <Marker position={pos} icon={createDroneIcon(heading, '#22c55e')}
      ref={(ref) => { if (ref) setMarker(ref); }}>
      <Popup><strong>Demo-1</strong><br />ALT: 1,000ft · SPD: 68kts<br />PIC: J. Kibe · ON MISSION</Popup>
    </Marker>
  );
}

// ─── ANIMATED DRONE-2 ───────────────────────────────────────
function AnimatedDrone2() {
  const [launched, setLaunched] = useState(false);
  const [pos, setPos] = useState<[number, number]>(stagingPos);
  const [heading, setHeading] = useState(45);
  const [marker, setMarker] = useState<L.Marker | null>(null);

  useEffect(() => {
    const timeout = setTimeout(() => setLaunched(true), 60000);
    return () => clearTimeout(timeout);
  }, []);

  useEffect(() => {
    if (!launched) return;
    let step = 0;
    const interval = setInterval(() => {
      step++;
      const t = Math.min((step % 500) / 500, 0.35);
      const segFloat = t * 3;
      const seg = Math.min(Math.floor(segFloat), 2);
      const segT = segFloat - seg;
      const lat = flightPath[seg][0] + (flightPath[seg + 1][0] - flightPath[seg][0]) * segT;
      const lng = flightPath[seg][1] + (flightPath[seg + 1][1] - flightPath[seg][1]) * segT;
      const dlat = flightPath[seg + 1][0] - flightPath[seg][0];
      const dlng = flightPath[seg + 1][1] - flightPath[seg][1];
      const angle = (Math.atan2(dlng, dlat) * 180 / Math.PI + 360) % 360;
      setPos([lat, lng]);
      setHeading(angle);
    }, 100);
    return () => clearInterval(interval);
  }, [launched]);

  useEffect(() => {
    if (marker) { marker.setLatLng(pos); marker.setIcon(createDroneIcon(heading, '#3b82f6')); }
  }, [pos, heading, marker]);

  if (!launched) {
    return (
      <Marker position={stagingPos} icon={createDroneIcon(0, '#3b82f6')}>
        <Popup><strong>Demo-2</strong><br />STATUS: STANDBY<br />Ready at staging</Popup>
      </Marker>
    );
  }

  return (
    <Marker position={pos} icon={createDroneIcon(heading, '#3b82f6')}
      ref={(ref) => { if (ref) setMarker(ref); }}>
      <Popup><strong>Demo-2</strong><br />ALT: 800ft · SPD: 55kts<br />EN ROUTE to fire zone</Popup>
    </Marker>
  );
}

// ─── BATTERY ENDURANCE RING ─────────────────────────────────
function EnduranceRing({ dronePos }: { dronePos: [number, number] }) {
  return (
    <Circle center={dronePos} radius={23000}
      pathOptions={{ color: '#22c55e', fillColor: '#22c55e', fillOpacity: 0.02, weight: 1, dashArray: '10, 6', opacity: 0.3 }} />
  );
}

// ─── WAYPOINT LABELS ────────────────────────────────────────
function WaypointMarkers() {
  return (
    <>
      {waypoints.map((wp, i) => {
        // Skip launch and land (same as staging)
        if (i === 0 || i === waypoints.length - 1) return null;
        const color = i <= 3 ? '#22c55e' : i <= 6 ? '#eab308' : '#64748b';
        return (
          <Marker key={i} position={wp.pos} icon={createIcon(color, 10, wp.name)}>
            <Popup><strong>{wp.name}</strong><br />ALT: {wp.alt}ft<br />Lat: {wp.pos[0].toFixed(4)} Lng: {wp.pos[1].toFixed(4)}</Popup>
          </Marker>
        );
      })}
    </>
  );
}

export default function MissionControlMapClient() {
  const [dronePos, setDronePos] = useState<[number, number]>(flightPath[3]);

  return (
    <div className="h-full w-full relative">
      <MapContainer
        center={[33.555, -111.825]}
        zoom={13}
        style={{ height: '100%', width: '100%' }}
        scrollWheelZoom={true}
        zoomControl={false}
      >
        <TileLayer
          attribution='&copy; OpenTopoMap'
          url="https://{s}.tile.opentopomap.org/{z}/{x}/{y}.png"
        />
        <FitBounds />

        {/* Endurance ring */}
        <EnduranceRing dronePos={dronePos} />

        {/* Staging */}
        <Marker position={stagingPos} icon={createIcon('#3b82f6', 16, 'STAGING')}>
          <Popup><strong>Rio Verde FD — Station 1</strong><br />Demo-1 staging · Demo-2 standby</Popup>
        </Marker>

        {/* Primary fire */}
        <Marker position={fireCenter} icon={createIcon('#dc2626', 18, 'FIRE-PRIMARY')}>
          <Popup><strong>Wildfire — Primary</strong><br />Desert brush fire · AI analysis active<br />Est. 12 acres · Spreading NE</Popup>
        </Marker>

        {/* Secondary fire spot */}
        <Marker position={fireSpot2} icon={createIcon('#f97316', 14, 'SPOT FIRE')}>
          <Popup><strong>Spot Fire</strong><br />Secondary ignition detected by AI<br />0.4nm NE of primary</Popup>
        </Marker>

        {/* Fire perimeters */}
        <Circle center={fireCenter} radius={350}
          pathOptions={{ color: '#eab308', fillColor: '#dc2626', fillOpacity: 0.06, weight: 2, dashArray: '6, 4' }} />
        <Circle center={fireSpot2} radius={150}
          pathOptions={{ color: '#f97316', fillColor: '#f97316', fillOpacity: 0.04, weight: 1.5, dashArray: '4, 4' }} />

        {/* Full flight path */}
        <Polyline positions={flightPath} pathOptions={{ color: '#dc2626', weight: 2, opacity: 0.5 }} />
        {/* Survey legs highlighted */}
        <Polyline positions={[waypoints[3].pos, waypoints[4].pos, waypoints[5].pos, waypoints[6].pos]}
          pathOptions={{ color: '#eab308', weight: 2.5, opacity: 0.7, dashArray: '8, 4' }} />

        {/* Waypoint markers */}
        <WaypointMarkers />

        {/* Demo-1 */}
        <AnimatedDrone1 onPositionUpdate={setDronePos} />
        {/* Demo-2 */}
        <AnimatedDrone2 />
      </MapContainer>

      {/* Labels */}
      <div className="absolute top-2 left-2 z-[1000] bg-slate-900/90 backdrop-blur-sm px-2 py-1 rounded text-[8px] font-mono border border-slate-700/50 space-y-0.5">
        <div className="text-red-400">WILDFIRE — Rio Verde Desert · ~12 acres</div>
        <div className="text-yellow-400">FIRE PERIMETER — 350m primary · 150m spot</div>
      </div>

      {/* Legend */}
      <div className="absolute bottom-2 right-2 z-[1000] bg-slate-900/90 backdrop-blur-sm rounded px-2 py-1.5 text-[7px] font-mono space-y-0.5 border border-slate-700/50">
        <div className="flex items-center gap-1.5">
          <span className="w-0 h-0 border-l-[3px] border-r-[3px] border-b-[5px] border-l-transparent border-r-transparent border-b-green-500 inline-block" />
          <span className="text-slate-400">Demo-1 (active)</span>
        </div>
        <div className="flex items-center gap-1.5">
          <span className="w-0 h-0 border-l-[3px] border-r-[3px] border-b-[5px] border-l-transparent border-r-transparent border-b-blue-500 inline-block" />
          <span className="text-slate-400">Demo-2 (standby)</span>
        </div>
        <div className="flex items-center gap-1.5">
          <span className="w-4 h-px border-t-2 border-dashed border-yellow-500 inline-block" />
          <span className="text-slate-400">Survey legs</span>
        </div>
        <div className="flex items-center gap-1.5">
          <span className="w-3 h-px border-t border-dashed border-green-500/50 inline-block" />
          <span className="text-slate-400">Endurance range</span>
        </div>
      </div>
    </div>
  );
}
