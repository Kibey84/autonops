'use client';

import { useEffect } from 'react';
import { MapContainer, TileLayer, Marker, Circle, Tooltip, useMap } from 'react-leaflet';
import L from 'leaflet';
import 'leaflet/dist/leaflet.css';

const aircraftPos: [number, number] = [39.9150, -83.7950];
const mapCenter: [number, number] = [39.9242, -83.8088];

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

function SetView() {
  const map = useMap();
  useEffect(() => {
    map.setView(mapCenter, 13);
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
      <SetView />

      {/* Operational area circle */}
      <Circle
        center={aircraftPos}
        radius={800}
        pathOptions={{
          color: '#dc2626',
          fillColor: '#dc2626',
          fillOpacity: 0.08,
          weight: 1.5,
          dashArray: '6, 4',
        }}
      />

      {/* Aircraft marker */}
      <Marker position={aircraftPos} icon={aircraftIcon}>
        <Tooltip permanent direction="top" offset={[0, -14]}
          className="!bg-white !text-slate-900 !text-[10px] !font-mono !px-2 !py-0.5 !rounded !shadow-lg !border-0">
          Blackfly
        </Tooltip>
      </Marker>
    </MapContainer>
  );
}
