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

const createDroneIcon = (heading: number) => {
  const svg = `<svg xmlns="http://www.w3.org/2000/svg" viewBox="0 0 32 32" width="24" height="24" style="transform:rotate(${heading}deg)">
    <polygon points="16,2 26,28 16,22 6,28" fill="#22c55e" stroke="#fff" stroke-width="1.5" opacity="0.9"/>
  </svg>`;
  return L.divIcon({
    html: svg, className: '', iconSize: [24, 24], iconAnchor: [12, 12], popupAnchor: [0, -12],
  });
};

// Springfield OH center
const basePos: [number, number] = [39.9242, -83.8088];
// Incident site NW of Springfield
const incidentPos: [number, number] = [39.9480, -83.8420];
// Flight path heading NW
const flightPath: [number, number][] = [
  basePos,
  [39.9290, -83.8150],
  [39.9340, -83.8230],
  [39.9390, -83.8300],
  [39.9430, -83.8360],
  incidentPos,
];

function FitBounds() {
  const map = useMap();
  useEffect(() => {
    const bounds = L.latLngBounds([
      [39.910, -83.860],
      [39.960, -83.790],
    ]);
    map.fitBounds(bounds, { padding: [20, 20] });
  }, [map]);
  return null;
}

function AnimatedDrone() {
  const [pos, setPos] = useState<[number, number]>(flightPath[2]);
  const [heading, setHeading] = useState(315);
  const [marker, setMarker] = useState<L.Marker | null>(null);

  useEffect(() => {
    let step = 0;
    const interval = setInterval(() => {
      step++;
      // Animate along the flight path segments
      const totalSteps = 300;
      const t = (step % totalSteps) / totalSteps;
      const pathLen = flightPath.length - 1;
      const segFloat = t * pathLen;
      const seg = Math.min(Math.floor(segFloat), pathLen - 1);
      const segT = segFloat - seg;

      const lat = flightPath[seg][0] + (flightPath[seg + 1][0] - flightPath[seg][0]) * segT;
      const lng = flightPath[seg][1] + (flightPath[seg + 1][1] - flightPath[seg][1]) * segT;

      // Calculate heading from segment direction
      const dlat = flightPath[seg + 1][0] - flightPath[seg][0];
      const dlng = flightPath[seg + 1][1] - flightPath[seg][1];
      const angle = (Math.atan2(dlng, dlat) * 180 / Math.PI + 360) % 360;

      setPos([lat, lng]);
      setHeading(angle);
    }, 100);
    return () => clearInterval(interval);
  }, []);

  useEffect(() => {
    if (marker) {
      marker.setLatLng(pos);
      marker.setIcon(createDroneIcon(heading));
    }
  }, [pos, heading, marker]);

  return (
    <Marker
      position={pos}
      icon={createDroneIcon(heading)}
      ref={(ref) => { if (ref) setMarker(ref); }}
    >
      <Popup>
        <strong>Demo-1</strong><br />
        ALT: 1,200ft · SPD: 68kts<br />
        PIC: J. Kibe · CTRL: M. Sunday
      </Popup>
    </Marker>
  );
}

export default function MissionControlMapClient() {
  return (
    <div className="h-full w-full">
      <MapContainer
        center={[39.936, -83.825]}
        zoom={14}
        style={{ height: '100%', width: '100%' }}
        scrollWheelZoom={true}
        zoomControl={false}
      >
        <TileLayer
          attribution='&copy; OpenStreetMap'
          url="https://{s}.tile.openstreetmap.org/{z}/{x}/{y}.png"
        />
        <FitBounds />

        {/* Base / staging */}
        <Marker position={basePos} icon={createIcon('#3b82f6')}>
          <Popup><strong>Staging</strong><br />Springfield ANGB</Popup>
        </Marker>

        {/* Incident site */}
        <Marker position={incidentPos} icon={createIcon('#dc2626')}>
          <Popup><strong>Incident Site</strong><br />Structure Fire — Active</Popup>
        </Marker>

        {/* Fire perimeter */}
        <Circle
          center={incidentPos}
          radius={500}
          pathOptions={{
            color: '#eab308',
            fillColor: '#eab308',
            fillOpacity: 0.08,
            weight: 2,
            dashArray: '6, 4',
          }}
        />

        {/* Flight path */}
        <Polyline
          positions={flightPath}
          pathOptions={{ color: '#dc2626', weight: 2.5, opacity: 0.7 }}
        />

        {/* Animated drone */}
        <AnimatedDrone />
      </MapContainer>

      {/* Fire perimeter label */}
      <div className="absolute top-2 left-2 z-[1000] bg-slate-900/90 backdrop-blur-sm px-2 py-1 rounded text-[8px] font-mono text-yellow-400 border border-yellow-500/30">
        FIRE PERIMETER — 500m radius
      </div>
    </div>
  );
}
