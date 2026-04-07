'use client';

import dynamic from 'next/dynamic';
import DashboardPanel from './DashboardPanel';
import type { Feature, FeatureCollection, GeoJsonObject } from 'geojson';

const MapContent = dynamic(() => import('./MissionMapPanelClient'), {
  ssr: false,
  loading: () => (
    <div className="h-[320px] bg-slate-700 animate-pulse rounded-lg" />
  ),
});

interface MissionMapPanelProps {
  waypointGeoJSON?: Feature | FeatureCollection | GeoJsonObject | null;
  fireBoundaryGeoJSON?: Feature | FeatureCollection | GeoJsonObject | null;
  livePosition?: { lat: number; lng: number } | null;
  showLayerToggles?: boolean;
}

export default function MissionMapPanel({
  waypointGeoJSON = null,
  fireBoundaryGeoJSON = null,
  livePosition = null,
  showLayerToggles = false,
}: MissionMapPanelProps) {
  return (
    <DashboardPanel
      title="Mission Map"
      statusColor="green"
      headerRight={
        <span className="font-mono text-xs text-orange-400 animate-pulse">
          SIMULATION MODE
        </span>
      }
    >
      <MapContent
        waypointGeoJSON={waypointGeoJSON}
        fireBoundaryGeoJSON={fireBoundaryGeoJSON}
        livePosition={livePosition}
        showLayerToggles={showLayerToggles}
      />
    </DashboardPanel>
  );
}
