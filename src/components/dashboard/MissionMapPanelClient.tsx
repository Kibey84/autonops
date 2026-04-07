'use client';

import { useEffect, useState } from 'react';
import { MapContainer, TileLayer, Marker, Popup, Polyline, Polygon, useMap, GeoJSON } from 'react-leaflet';
import L from 'leaflet';
import 'leaflet/dist/leaflet.css';
import type { Feature, FeatureCollection, GeoJsonObject } from 'geojson';

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
    html: wrapper, className: '', iconSize: [20, 30], iconAnchor: [10, 30], popupAnchor: [0, -30],
  });
};

const aircraftDotIcon = L.divIcon({
  html: `<div style="position:relative;width:18px;height:18px;">
    <div style="position:absolute;inset:0;border-radius:50%;background:#22c55e;opacity:0.3;animation:mapPulse 2s ease-in-out infinite;"></div>
    <div style="position:absolute;inset:4px;border-radius:50%;background:#22c55e;border:2px solid #fff;"></div>
  </div>
  <style>@keyframes mapPulse{0%,100%{transform:scale(1);opacity:.3}50%{transform:scale(2);opacity:0}}</style>`,
  className: '', iconSize: [18, 18], iconAnchor: [9, 9],
});

const blueIcon = createIcon('#3b82f6');
const yellowIcon = createIcon('#eab308');
const redIcon = createIcon('#dc2626', true);

const stagingPos: [number, number] = [33.5350, -111.8550];
const stationPos: [number, number] = [33.5200, -111.8350];
const firePos: [number, number] = [33.5000, -111.8100];

function FitBounds({ bounds }: { bounds: L.LatLngBoundsExpression }) {
  const map = useMap();
  useEffect(() => {
    map.fitBounds(bounds, { padding: [30, 30] });
  }, [map, bounds]);
  return null;
}

interface MissionMapPanelClientProps {
  waypointGeoJSON?: Feature | FeatureCollection | GeoJsonObject | null;
  fireBoundaryGeoJSON?: Feature | FeatureCollection | GeoJsonObject | null;
  livePosition?: { lat: number; lng: number } | null;
  showLayerToggles?: boolean;
}

export default function MissionMapPanelClient({
  waypointGeoJSON = null,
  fireBoundaryGeoJSON = null,
  livePosition = null,
  showLayerToggles = false,
}: MissionMapPanelClientProps) {
  const [showWaypoints, setShowWaypoints] = useState(true);
  const [showFireBoundary, setShowFireBoundary] = useState(true);
  const [showAircraft, setShowAircraft] = useState(true);

  const bounds = L.latLngBounds([stagingPos, stationPos, firePos]);

  return (
    <div className="relative rounded-lg overflow-hidden h-[320px]">
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
        <FitBounds bounds={bounds} />

        {/* Static markers */}
        <Marker position={stagingPos} icon={blueIcon}>
          <Popup><strong>Blackfly-01</strong><br />Staged &amp; Ready<br />Rio Verde Staging Area</Popup>
        </Marker>
        <Marker position={stationPos} icon={yellowIcon}>
          <Popup><strong>Rio Verde Fire Dept</strong><br />Station 1</Popup>
        </Marker>
        <Marker position={firePos} icon={redIcon}>
          <Popup><strong>⚠ Active Fire</strong><br />AI Analysis In Progress</Popup>
        </Marker>

        {/* Default flight path (fallback when no GeoJSON provided) */}
        {!waypointGeoJSON && showWaypoints && (
          <Polyline
            positions={[stagingPos, stationPos, firePos]}
            pathOptions={{ color: '#dc2626', dashArray: '8, 8', weight: 2 }}
          />
        )}

        {/* Waypoint GeoJSON overlay */}
        {waypointGeoJSON && showWaypoints && (
          <GeoJSON
            key={`waypoints-${JSON.stringify(waypointGeoJSON).slice(0, 50)}`}
            data={waypointGeoJSON as GeoJsonObject}
            style={{ color: '#dc2626', weight: 2.5, opacity: 0.8, dashArray: '8, 6' }}
          />
        )}

        {/* Fire boundary GeoJSON overlay */}
        {fireBoundaryGeoJSON && showFireBoundary && (
          <GeoJSON
            key={`fire-${JSON.stringify(fireBoundaryGeoJSON).slice(0, 50)}`}
            data={fireBoundaryGeoJSON as GeoJsonObject}
            style={{
              color: '#eab308',
              fillColor: '#dc2626',
              fillOpacity: 0.12,
              weight: 2,
              dashArray: '6, 4',
            }}
          />
        )}

        {/* Live aircraft position */}
        {livePosition && showAircraft && (
          <Marker position={[livePosition.lat, livePosition.lng]} icon={aircraftDotIcon}>
            <Popup><strong>Blackfly-01 (Live)</strong><br />Lat: {livePosition.lat.toFixed(4)}<br />Lng: {livePosition.lng.toFixed(4)}</Popup>
          </Marker>
        )}
      </MapContainer>

      {/* Layer toggle controls */}
      {showLayerToggles && (
        <div className="absolute top-2 right-2 z-[1000] bg-slate-900/90 backdrop-blur-sm rounded-lg p-2 border border-slate-700/50 space-y-1">
          <label className="flex items-center gap-1.5 cursor-pointer">
            <input
              type="checkbox"
              checked={showWaypoints}
              onChange={(e) => setShowWaypoints(e.target.checked)}
              className="w-3 h-3 accent-red-600"
            />
            <span className="font-mono text-[9px] text-slate-300">Waypoints</span>
          </label>
          <label className="flex items-center gap-1.5 cursor-pointer">
            <input
              type="checkbox"
              checked={showFireBoundary}
              onChange={(e) => setShowFireBoundary(e.target.checked)}
              className="w-3 h-3 accent-yellow-500"
            />
            <span className="font-mono text-[9px] text-slate-300">Fire Boundary</span>
          </label>
          <label className="flex items-center gap-1.5 cursor-pointer">
            <input
              type="checkbox"
              checked={showAircraft}
              onChange={(e) => setShowAircraft(e.target.checked)}
              className="w-3 h-3 accent-green-500"
            />
            <span className="font-mono text-[9px] text-slate-300">Aircraft</span>
          </label>
        </div>
      )}
    </div>
  );
}
