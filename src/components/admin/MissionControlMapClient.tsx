'use client';

import { useEffect, useState } from 'react';
import { MapContainer, TileLayer, Marker, Popup, Polyline, Circle, useMap } from 'react-leaflet';
import L from 'leaflet';
import 'leaflet/dist/leaflet.css';

const createIcon = (color: string, size = 16) => {
  const svg = `<svg xmlns="http://www.w3.org/2000/svg" viewBox="0 0 24 36" width="${size}" height="${Math.round(size * 1.5)}">
    <path d="M12 0C5.4 0 0 5.4 0 12c0 9 12 24 12 24s12-15 12-24C24 5.4 18.6 0 12 0z" fill="${color}" stroke="#fff" stroke-width="1.5"/>
    <circle cx="12" cy="12" r="5" fill="#fff"/>
  </svg>`;
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

const basePos: [number, number] = [39.9242, -83.8088];
const incidentPos: [number, number] = [39.9480, -83.8420];
const flightPath: [number, number][] = [
  basePos, [39.9290, -83.8150], [39.9340, -83.8230], [39.9390, -83.8300], [39.9430, -83.8360], incidentPos,
];

function FitBounds() {
  const map = useMap();
  useEffect(() => {
    map.fitBounds(L.latLngBounds([[39.905, -83.865], [39.960, -83.785]]), { padding: [20, 20] });
  }, [map]);
  return null;
}

// ─── ANIMATED DRONE-1 (primary, on mission) ─────────────────
function AnimatedDrone1({ onPositionUpdate }: { onPositionUpdate: (pos: [number, number]) => void }) {
  const [pos, setPos] = useState<[number, number]>(flightPath[2]);
  const [heading, setHeading] = useState(315);
  const [marker, setMarker] = useState<L.Marker | null>(null);

  useEffect(() => {
    let step = 0;
    const interval = setInterval(() => {
      step++;
      const t = (step % 300) / 300;
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
      <Popup><strong>Demo-1</strong><br />ALT: 1,200ft · SPD: 68kts<br />PIC: J. Kibe · STATUS: ON MISSION</Popup>
    </Marker>
  );
}

// ─── ANIMATED DRONE-2 (standby → launches after 60s) ────────
function AnimatedDrone2() {
  const [launched, setLaunched] = useState(false);
  const [pos, setPos] = useState<[number, number]>(basePos);
  const [heading, setHeading] = useState(315);
  const [marker, setMarker] = useState<L.Marker | null>(null);

  // Launch after 60 seconds
  useEffect(() => {
    const timeout = setTimeout(() => setLaunched(true), 60000);
    return () => clearTimeout(timeout);
  }, []);

  useEffect(() => {
    if (!launched) return;
    let step = 0;
    const interval = setInterval(() => {
      step++;
      // Slower — only along first 3 waypoints
      const t = Math.min((step % 400) / 400, 0.4);
      const pathLen = 3;
      const segFloat = t * pathLen;
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
    // Show as standby at base
    return (
      <Marker position={basePos} icon={createDroneIcon(0, '#3b82f6')}>
        <Popup><strong>Demo-2</strong><br />STATUS: STANDBY<br />Ready for launch</Popup>
      </Marker>
    );
  }

  return (
    <Marker position={pos} icon={createDroneIcon(heading, '#3b82f6')}
      ref={(ref) => { if (ref) setMarker(ref); }}>
      <Popup><strong>Demo-2</strong><br />ALT: 800ft · SPD: 55kts<br />STATUS: EN ROUTE</Popup>
    </Marker>
  );
}

// ─── BATTERY ENDURANCE RING ─────────────────────────────────
function EnduranceRing({ dronePos }: { dronePos: [number, number] }) {
  // 74% battery ≈ 12.4nm range ≈ ~23km
  const rangeMeters = 23000;
  return (
    <Circle
      center={dronePos}
      radius={rangeMeters}
      pathOptions={{
        color: '#22c55e',
        fillColor: '#22c55e',
        fillOpacity: 0.02,
        weight: 1,
        dashArray: '10, 6',
        opacity: 0.3,
      }}
    />
  );
}

export default function MissionControlMapClient() {
  const [dronePos, setDronePos] = useState<[number, number]>(flightPath[2]);

  return (
    <div className="h-full w-full relative">
      <MapContainer
        center={[39.936, -83.825]}
        zoom={14}
        style={{ height: '100%', width: '100%' }}
        scrollWheelZoom={true}
        zoomControl={false}
      >
        {/* Terrain-aware base map (OpenTopoMap for elevation shading) */}
        <TileLayer
          attribution='&copy; OpenTopoMap'
          url="https://{s}.tile.opentopomap.org/{z}/{x}/{y}.png"
        />
        <FitBounds />

        {/* Battery endurance ring */}
        <EnduranceRing dronePos={dronePos} />

        {/* Base / staging */}
        <Marker position={basePos} icon={createIcon('#3b82f6')}>
          <Popup><strong>Staging</strong><br />Springfield ANGB<br />Demo-2: STANDBY</Popup>
        </Marker>

        {/* Incident site */}
        <Marker position={incidentPos} icon={createIcon('#dc2626', 18)}>
          <Popup><strong>Incident Site</strong><br />Structure Fire — Active</Popup>
        </Marker>

        {/* Fire perimeter — 500m */}
        <Circle
          center={incidentPos}
          radius={500}
          pathOptions={{ color: '#eab308', fillColor: '#eab308', fillOpacity: 0.08, weight: 2, dashArray: '6, 4' }}
        />

        {/* Flight path */}
        <Polyline positions={flightPath} pathOptions={{ color: '#dc2626', weight: 2.5, opacity: 0.7 }} />

        {/* Demo-1: primary aircraft */}
        <AnimatedDrone1 onPositionUpdate={setDronePos} />

        {/* Demo-2: standby then launches */}
        <AnimatedDrone2 />
      </MapContainer>

      {/* Fire perimeter label */}
      <div className="absolute top-2 left-2 z-[1000] bg-slate-900/90 backdrop-blur-sm px-2 py-1 rounded text-[8px] font-mono text-yellow-400 border border-yellow-500/30">
        FIRE PERIMETER — 500m
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
          <span className="w-3 h-px border-t border-dashed border-green-500/50 inline-block" />
          <span className="text-slate-400">Endurance ring</span>
        </div>
        <div className="flex items-center gap-1.5">
          <span className="text-[8px]">🏔</span>
          <span className="text-slate-400">Terrain elevation</span>
        </div>
      </div>
    </div>
  );
}
