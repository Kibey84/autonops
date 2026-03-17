'use client';

import { useEffect, useRef } from 'react';
import { MapContainer, TileLayer, Marker, Popup, Polyline, useMap } from 'react-leaflet';
import L from 'leaflet';
import 'leaflet/dist/leaflet.css';

// Fix default marker icon issue with webpack/next.js
const createIcon = (color: string) => {
  const svgTemplate = `
    <svg xmlns="http://www.w3.org/2000/svg" viewBox="0 0 24 36" width="24" height="36">
      <path d="M12 0C5.4 0 0 5.4 0 12c0 9 12 24 12 24s12-15 12-24C24 5.4 18.6 0 12 0z" fill="${color}" stroke="#fff" stroke-width="1.5"/>
      <circle cx="12" cy="12" r="5" fill="#fff"/>
    </svg>
  `;
  return L.divIcon({
    html: svgTemplate,
    className: '',
    iconSize: [24, 36],
    iconAnchor: [12, 36],
    popupAnchor: [0, -36],
  });
};

const blueIcon = createIcon('#3b82f6');
const yellowIcon = createIcon('#eab308');
const redIcon = createIcon('#dc2626');

const stagingPos: [number, number] = [33.5350, -111.8550];
const stationPos: [number, number] = [33.5200, -111.8350];
const firePos: [number, number] = [33.5000, -111.8100];

function FitBounds() {
  const map = useMap();
  useEffect(() => {
    const bounds = L.latLngBounds([stagingPos, stationPos, firePos]);
    map.fitBounds(bounds, { padding: [40, 40] });
  }, [map]);
  return null;
}

export default function MissionMapClient() {
  return (
    <div className="relative rounded-xl overflow-hidden border border-slate-200 dark:border-slate-700">
      <MapContainer
        center={stagingPos}
        zoom={11}
        style={{ height: '420px', width: '100%' }}
        scrollWheelZoom={false}
      >
        <TileLayer
          attribution='&copy; <a href="https://www.openstreetmap.org/copyright">OpenStreetMap</a>'
          url="https://{s}.tile.openstreetmap.org/{z}/{x}/{y}.png"
        />
        <FitBounds />

        <Marker position={stagingPos} icon={blueIcon}>
          <Popup>
            <strong>Blackfly-01</strong><br />
            Staged &amp; Ready<br />
            Rio Verde Staging Area
          </Popup>
        </Marker>

        <Marker position={stationPos} icon={yellowIcon}>
          <Popup>
            <strong>Rio Verde Fire Dept</strong><br />
            Station 1
          </Popup>
        </Marker>

        <Marker position={firePos} icon={redIcon}>
          <Popup>
            <strong>⚠ Active Fire</strong><br />
            AI Analysis In Progress
          </Popup>
        </Marker>

        <Polyline
          positions={[stagingPos, stationPos, firePos]}
          pathOptions={{
            color: '#dc2626',
            dashArray: '8, 8',
            weight: 2,
          }}
        />
      </MapContainer>

      {/* Legend */}
      <div className="absolute bottom-4 right-4 z-[1000] bg-white/95 dark:bg-slate-800/95 backdrop-blur-sm rounded-lg px-4 py-3 text-xs space-y-1 border border-slate-200 dark:border-slate-700 shadow-lg">
        <div className="flex items-center gap-2">
          <span className="w-3 h-3 bg-blue-500 rounded-full inline-block" />
          <span className="text-slate-700 dark:text-slate-300">Aircraft Staging</span>
        </div>
        <div className="flex items-center gap-2">
          <span className="w-3 h-3 bg-yellow-500 rounded-full inline-block" />
          <span className="text-slate-700 dark:text-slate-300">Fire Station</span>
        </div>
        <div className="flex items-center gap-2">
          <span className="w-3 h-3 bg-red-500 rounded-full inline-block" />
          <span className="text-slate-700 dark:text-slate-300">Active Fire</span>
        </div>
        <div className="flex items-center gap-2">
          <span className="w-8 h-0 border-t-2 border-dashed border-red-500 inline-block" />
          <span className="text-slate-700 dark:text-slate-300">Flight Path</span>
        </div>
      </div>
    </div>
  );
}
