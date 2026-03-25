'use client';

import { useEffect, useState } from 'react';
import { MapContainer, TileLayer, Marker, Circle, Polyline, Tooltip, useMap } from 'react-leaflet';
import L from 'leaflet';
import 'leaflet/dist/leaflet.css';

// Rio Verde staging → fire target
const stagingPos: [number, number] = [33.5350, -111.8550];
const fireTarget: [number, number] = [33.5590, -111.8030];

// Flight path waypoints
const flightPath: [number, number][] = [
  stagingPos,
  [33.5400, -111.8480],
  [33.5520, -111.8300],
  [33.5590, -111.8030],
];

const mapCenter: [number, number] = [33.5470, -111.8290];

// Pulsing red aircraft marker
const aircraftIcon = L.divIcon({
  html: `
    <div style="position:relative;width:20px;height:20px;">
      <div style="position:absolute;inset:0;border-radius:50%;background:#dc2626;opacity:0.3;animation:mapPulse 2s ease-in-out infinite;"></div>
      <div style="position:absolute;inset:4px;border-radius:50%;background:#dc2626;border:2px solid #fff;"></div>
    </div>
    <style>
      @keyframes mapPulse {
        0%,100% { transform:scale(1); opacity:0.3; }
        50% { transform:scale(2.2); opacity:0; }
      }
    </style>
  `,
  className: '',
  iconSize: [20, 20],
  iconAnchor: [10, 10],
});

// Fire target icon — orange
const fireIcon = L.divIcon({
  html: `
    <div style="position:relative;width:18px;height:18px;">
      <div style="position:absolute;inset:0;border-radius:50%;background:#f97316;opacity:0.25;animation:mapPulse 3s ease-in-out infinite;"></div>
      <div style="position:absolute;inset:3px;border-radius:50%;background:#f97316;border:2px solid #fff;"></div>
    </div>
  `,
  className: '',
  iconSize: [18, 18],
  iconAnchor: [9, 9],
});

// Staging icon — blue
const stagingIcon = L.divIcon({
  html: `<div style="width:12px;height:12px;border-radius:50%;background:#3b82f6;border:2px solid #fff;"></div>`,
  className: '',
  iconSize: [12, 12],
  iconAnchor: [6, 6],
});

// Animated aircraft position along flight path
function AnimatedAircraft() {
  const [pos, setPos] = useState<[number, number]>(flightPath[1]);
  const [marker, setMarker] = useState<L.Marker | null>(null);

  useEffect(() => {
    let step = 0;
    const interval = setInterval(() => {
      step++;
      const t = (step % 400) / 400;
      const pathLen = flightPath.length - 1;
      const segFloat = t * pathLen;
      const seg = Math.min(Math.floor(segFloat), pathLen - 1);
      const segT = segFloat - seg;
      const lat = flightPath[seg][0] + (flightPath[seg + 1][0] - flightPath[seg][0]) * segT;
      const lng = flightPath[seg][1] + (flightPath[seg + 1][1] - flightPath[seg][1]) * segT;
      setPos([lat, lng]);
    }, 100);
    return () => clearInterval(interval);
  }, []);

  useEffect(() => {
    if (marker) marker.setLatLng(pos);
  }, [pos, marker]);

  return (
    <Marker position={pos} icon={aircraftIcon}
      ref={(ref) => { if (ref) setMarker(ref); }}>
      <Tooltip permanent direction="top" offset={[0, -14]}
        className="!bg-white !text-slate-900 !text-[10px] !font-mono !px-2 !py-0.5 !rounded !shadow-lg !border-0">
        Blackfly
      </Tooltip>
    </Marker>
  );
}

function FitBounds() {
  const map = useMap();
  useEffect(() => {
    map.fitBounds(L.latLngBounds(
      [33.525, -111.870],
      [33.570, -111.790]
    ), { padding: [30, 30] });
  }, [map]);
  return null;
}

export default function LiveMapEmbed() {
  return (
    <MapContainer
      center={mapCenter}
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

      {/* Flight path */}
      <Polyline
        positions={flightPath}
        pathOptions={{ color: '#dc2626', weight: 2, opacity: 0.7, dashArray: '8, 6' }}
      />

      {/* Fire target zone */}
      <Circle
        center={fireTarget}
        radius={500}
        pathOptions={{
          color: '#f97316',
          fillColor: '#f97316',
          fillOpacity: 0.08,
          weight: 1.5,
          dashArray: '6, 4',
        }}
      />

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

      {/* Animated aircraft */}
      <AnimatedAircraft />
    </MapContainer>
  );
}
