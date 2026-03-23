'use client';

import { useEffect, useState } from 'react';
import { MapContainer, TileLayer, Marker, Popup, Polyline, Circle, useMap } from 'react-leaflet';
import L from 'leaflet';
import 'leaflet/dist/leaflet.css';

const createIcon = (color: string, size = 20) => {
  const svg = `
    <svg xmlns="http://www.w3.org/2000/svg" viewBox="0 0 24 36" width="${size}" height="${Math.round(size * 1.5)}">
      <path d="M12 0C5.4 0 0 5.4 0 12c0 9 12 24 12 24s12-15 12-24C24 5.4 18.6 0 12 0z" fill="${color}" stroke="#fff" stroke-width="1.5"/>
      <circle cx="12" cy="12" r="5" fill="#fff"/>
    </svg>`;
  return L.divIcon({
    html: svg, className: '', iconSize: [size, Math.round(size * 1.5)],
    iconAnchor: [size / 2, Math.round(size * 1.5)], popupAnchor: [0, -Math.round(size * 1.5)],
  });
};

// Aircraft icon — triangle pointing in heading direction
const createAircraftIcon = (heading: number) => {
  const svg = `
    <svg xmlns="http://www.w3.org/2000/svg" viewBox="0 0 32 32" width="28" height="28" style="transform: rotate(${heading}deg)">
      <polygon points="16,2 26,28 16,22 6,28" fill="#22c55e" stroke="#fff" stroke-width="1.5" opacity="0.9"/>
    </svg>`;
  return L.divIcon({
    html: `<div style="transform: rotate(0deg)">${svg}</div>`,
    className: '', iconSize: [28, 28], iconAnchor: [14, 14], popupAnchor: [0, -14],
  });
};

const basePos: [number, number] = [33.5350, -111.8550];
const stationPos: [number, number] = [33.5200, -111.8350];
const firePos: [number, number] = [33.5000, -111.8100];

// Simulated aircraft position along the flight path
const flightPath: [number, number][] = [
  basePos, [33.5280, -111.8450], stationPos, [33.5100, -111.8200], firePos,
];

function FitBounds() {
  const map = useMap();
  useEffect(() => {
    const bounds = L.latLngBounds([basePos, firePos, [33.545, -111.860], [33.490, -111.800]]);
    map.fitBounds(bounds, { padding: [30, 30] });
  }, [map]);
  return null;
}

function AnimatedAircraft() {
  const map = useMap();
  const [pos, setPos] = useState<[number, number]>([33.5200, -111.8350]);
  const [heading, setHeading] = useState(220);
  const [marker, setMarker] = useState<L.Marker | null>(null);

  useEffect(() => {
    // Simulate aircraft moving between waypoints
    let step = 0;
    const interval = setInterval(() => {
      step++;
      const t = (step % 200) / 200; // 0 to 1 cycle
      // Lerp between station and fire
      const lat = stationPos[0] + (firePos[0] - stationPos[0]) * t;
      const lng = stationPos[1] + (firePos[1] - stationPos[1]) * t;
      const newHeading = 220 + Math.sin(step * 0.05) * 5;
      setPos([lat, lng]);
      setHeading(newHeading);
    }, 500);
    return () => clearInterval(interval);
  }, []);

  useEffect(() => {
    if (marker) {
      marker.setLatLng(pos);
      marker.setIcon(createAircraftIcon(heading));
    }
  }, [pos, heading, marker]);

  return (
    <Marker
      position={pos}
      icon={createAircraftIcon(heading)}
      ref={(ref) => { if (ref) setMarker(ref); }}
    >
      <Popup>
        <strong>Blackfly-01</strong><br />
        ALT: 1,200ft · SPD: 68kts<br />
        HDG: {Math.round(heading)}° · BAT: 74%
      </Popup>
    </Marker>
  );
}

export default function FlightMapClient() {
  return (
    <div className="rounded-lg overflow-hidden h-full">
      <MapContainer
        center={[33.515, -111.830]}
        zoom={13}
        style={{ height: '100%', width: '100%' }}
        scrollWheelZoom={true}
        zoomControl={true}
      >
        <TileLayer
          attribution='&copy; OpenStreetMap'
          url="https://{s}.tile.openstreetmap.org/{z}/{x}/{y}.png"
        />
        <FitBounds />

        {/* Base / staging */}
        <Marker position={basePos} icon={createIcon('#3b82f6')}>
          <Popup><strong>Staging</strong><br />Rio Verde · RTB Point</Popup>
        </Marker>

        {/* Fire station */}
        <Marker position={stationPos} icon={createIcon('#eab308')}>
          <Popup><strong>Rio Verde FD</strong><br />Station 1</Popup>
        </Marker>

        {/* Fire */}
        <Marker position={firePos} icon={createIcon('#dc2626')}>
          <Popup><strong>Active Fire</strong><br />AI Analysis In Progress</Popup>
        </Marker>

        {/* Fire radius */}
        <Circle
          center={firePos}
          radius={400}
          pathOptions={{ color: '#dc2626', fillColor: '#dc2626', fillOpacity: 0.1, weight: 1, dashArray: '4, 4' }}
        />

        {/* Flight path */}
        <Polyline
          positions={flightPath}
          pathOptions={{ color: '#22c55e', weight: 2, opacity: 0.6 }}
        />

        {/* Planned path (dashed) */}
        <Polyline
          positions={[[33.5100, -111.8200], firePos, [33.5100, -111.8200], basePos]}
          pathOptions={{ color: '#22c55e', weight: 1.5, opacity: 0.3, dashArray: '6, 6' }}
        />

        {/* Animated aircraft */}
        <AnimatedAircraft />
      </MapContainer>

      {/* Legend */}
      <div className="absolute bottom-2 right-2 z-[1000] bg-slate-800/95 backdrop-blur-sm rounded-lg px-3 py-2 text-[9px] space-y-0.5 border border-slate-700">
        <div className="flex items-center gap-1.5"><span className="w-0 h-0 border-l-[4px] border-r-[4px] border-b-[7px] border-l-transparent border-r-transparent border-b-green-500 inline-block" /><span className="text-slate-300">Aircraft</span></div>
        <div className="flex items-center gap-1.5"><span className="w-2.5 h-2.5 bg-blue-500 rounded-full inline-block" /><span className="text-slate-300">Staging / RTB</span></div>
        <div className="flex items-center gap-1.5"><span className="w-2.5 h-2.5 bg-yellow-500 rounded-full inline-block" /><span className="text-slate-300">Fire Station</span></div>
        <div className="flex items-center gap-1.5"><span className="w-2.5 h-2.5 bg-red-500 rounded-full inline-block" /><span className="text-slate-300">Active Fire</span></div>
      </div>
    </div>
  );
}
