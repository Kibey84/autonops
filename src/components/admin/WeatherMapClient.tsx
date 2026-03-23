'use client';

import { useEffect, useState } from 'react';
import { MapContainer, TileLayer, Marker, Polyline, Circle, useMap } from 'react-leaflet';
import L from 'leaflet';
import 'leaflet/dist/leaflet.css';

const basePos: [number, number] = [33.5350, -111.8550];
const incidentPos: [number, number] = [33.5590, -111.8030];
const flightPath: [number, number][] = [
  basePos, [33.5400, -111.8480], [33.5520, -111.8300], [33.5680, -111.8100], [33.5600, -111.7950], incidentPos,
];

const droneIcon = L.divIcon({
  html: `<svg xmlns="http://www.w3.org/2000/svg" viewBox="0 0 16 16" width="12" height="12"><circle cx="8" cy="8" r="6" fill="#22c55e" stroke="#fff" stroke-width="1.5"/></svg>`,
  className: '', iconSize: [12, 12], iconAnchor: [6, 6],
});

function FitBounds() {
  const map = useMap();
  useEffect(() => {
    map.fitBounds(L.latLngBounds([[33.49, -111.90], [33.60, -111.76]]), { padding: [10, 10] });
  }, [map]);
  return null;
}

function AnimatedDot() {
  const [pos, setPos] = useState<[number, number]>(flightPath[2]);
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
      setPos([lat, lng]);
    }, 100);
    return () => clearInterval(interval);
  }, []);

  useEffect(() => {
    if (marker) marker.setLatLng(pos);
  }, [pos, marker]);

  return <Marker position={pos} icon={droneIcon} ref={(ref) => { if (ref) setMarker(ref); }} />;
}

export default function WeatherMapClient() {
  const [radarTimestamp, setRadarTimestamp] = useState('');

  // Fetch latest RainViewer radar timestamp
  useEffect(() => {
    async function fetchRadar() {
      try {
        const res = await fetch('https://api.rainviewer.com/public/weather-maps.json');
        const data = await res.json();
        if (data.radar?.past?.length > 0) {
          const latest = data.radar.past[data.radar.past.length - 1];
          setRadarTimestamp(latest.path);
        }
      } catch {
        // Fallback — no radar overlay
      }
    }
    fetchRadar();
    const interval = setInterval(fetchRadar, 300000); // refresh every 5 min
    return () => clearInterval(interval);
  }, []);

  return (
    <div className="h-full w-full rounded-lg overflow-hidden relative">
      <MapContainer
        center={[33.55, -111.83]}
        zoom={11}
        style={{ height: '100%', width: '100%' }}
        scrollWheelZoom={false}
        zoomControl={false}
      >
        {/* Dark base map */}
        <TileLayer
          attribution='&copy; OpenStreetMap'
          url="https://{s}.tile.openstreetmap.org/{z}/{x}/{y}.png"
        />
        <FitBounds />

        {/* RainViewer radar overlay */}
        {radarTimestamp && (
          <TileLayer
            url={`https://tilecache.rainviewer.com${radarTimestamp}/256/{z}/{x}/{y}/4/1_1.png`}
            opacity={0.6}
          />
        )}

        {/* Flight path */}
        <Polyline positions={flightPath} pathOptions={{ color: '#22c55e', weight: 2, opacity: 0.5 }} />

        {/* Fire perimeter */}
        <Circle center={incidentPos} radius={500} pathOptions={{ color: '#eab308', fillOpacity: 0.05, weight: 1, dashArray: '4,4' }} />

        {/* Aircraft dot */}
        <AnimatedDot />
      </MapContainer>

      {/* Labels */}
      <div className="absolute top-1.5 left-1.5 z-[1000] bg-slate-900/90 px-2 py-1 rounded text-[7px] font-mono text-slate-400 border border-slate-700/50">
        WEATHER RADAR · LIVE
      </div>
      <div className="absolute bottom-1.5 left-1.5 z-[1000] flex gap-2 text-[6px] font-mono text-slate-500">
        <span className="flex items-center gap-0.5"><span className="w-2 h-1.5 bg-green-500/60 inline-block rounded-sm" />Light</span>
        <span className="flex items-center gap-0.5"><span className="w-2 h-1.5 bg-yellow-500/60 inline-block rounded-sm" />Mod</span>
        <span className="flex items-center gap-0.5"><span className="w-2 h-1.5 bg-red-500/60 inline-block rounded-sm" />Heavy</span>
      </div>
    </div>
  );
}
