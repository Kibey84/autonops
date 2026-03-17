'use client';

import { useEffect } from 'react';
import { MapContainer, TileLayer, Marker, Popup, Polyline, useMap } from 'react-leaflet';
import L from 'leaflet';
import 'leaflet/dist/leaflet.css';

const createIcon = (color: string, pulse = false) => {
  const svgTemplate = `
    <svg xmlns="http://www.w3.org/2000/svg" viewBox="0 0 24 36" width="20" height="30">
      <path d="M12 0C5.4 0 0 5.4 0 12c0 9 12 24 12 24s12-15 12-24C24 5.4 18.6 0 12 0z" fill="${color}" stroke="#fff" stroke-width="1.5"/>
      <circle cx="12" cy="12" r="5" fill="#fff"/>
    </svg>
  `;
  const wrapper = pulse
    ? `<div style="animation: pulse 2s ease-in-out infinite;">${svgTemplate}</div>`
    : svgTemplate;
  return L.divIcon({
    html: wrapper,
    className: '',
    iconSize: [20, 30],
    iconAnchor: [10, 30],
    popupAnchor: [0, -30],
  });
};

const blueIcon = createIcon('#3b82f6');
const yellowIcon = createIcon('#eab308');
const redIcon = createIcon('#dc2626', true);

const stagingPos: [number, number] = [33.5350, -111.8550];
const stationPos: [number, number] = [33.5200, -111.8350];
const firePos: [number, number] = [33.5000, -111.8100];

function FitBounds() {
  const map = useMap();
  useEffect(() => {
    const bounds = L.latLngBounds([stagingPos, stationPos, firePos]);
    map.fitBounds(bounds, { padding: [30, 30] });
  }, [map]);
  return null;
}

export default function MissionMapPanelClient() {
  return (
    <div className="rounded-lg overflow-hidden h-[320px]">
      <MapContainer
        center={stagingPos}
        zoom={11}
        style={{ height: '100%', width: '100%' }}
        scrollWheelZoom={false}
        zoomControl={false}
      >
        <TileLayer
          attribution='&copy; OpenStreetMap'
          url="https://{s}.tile.openstreetmap.org/{z}/{x}/{y}.png"
        />
        <FitBounds />

        <Marker position={stagingPos} icon={blueIcon}>
          <Popup><strong>Blackfly-01</strong><br />Staged &amp; Ready<br />Rio Verde Staging Area</Popup>
        </Marker>
        <Marker position={stationPos} icon={yellowIcon}>
          <Popup><strong>Rio Verde Fire Dept</strong><br />Station 4</Popup>
        </Marker>
        <Marker position={firePos} icon={redIcon}>
          <Popup><strong>⚠ Active Fire</strong><br />AI Analysis In Progress</Popup>
        </Marker>

        <Polyline
          positions={[stagingPos, stationPos, firePos]}
          pathOptions={{ color: '#dc2626', dashArray: '8, 8', weight: 2 }}
        />
      </MapContainer>
    </div>
  );
}
