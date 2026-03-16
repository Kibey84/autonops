'use client';

import MissionMapPanel from './MissionMapPanel';
import EOFeedPanel from './EOFeedPanel';
import ThermalFeedPanel from './ThermalFeedPanel';
import TelemetryPanel from './TelemetryPanel';
import MissionInfoPanel from './MissionInfoPanel';
import AIFeedPanel from './AIFeedPanel';
import CommsLogPanel from './CommsLogPanel';
import WaypointTable from './WaypointTable';

export default function ActiveMissionView() {
  return (
    <div className="space-y-4">
      {/* Row 1: Map + EO + Thermal */}
      <div className="grid grid-cols-12 gap-4" style={{ minHeight: '380px' }}>
        <div className="col-span-12 lg:col-span-5">
          <MissionMapPanel />
        </div>
        <div className="col-span-12 sm:col-span-6 lg:col-span-3">
          <EOFeedPanel />
        </div>
        <div className="col-span-12 sm:col-span-6 lg:col-span-4">
          <ThermalFeedPanel />
        </div>
      </div>

      {/* Row 2: Telemetry + Mission Info + AI */}
      <div className="grid grid-cols-12 gap-4" style={{ minHeight: '260px' }}>
        <div className="col-span-12 sm:col-span-6 lg:col-span-3">
          <TelemetryPanel />
        </div>
        <div className="col-span-12 sm:col-span-6 lg:col-span-5">
          <MissionInfoPanel />
        </div>
        <div className="col-span-12 lg:col-span-4">
          <AIFeedPanel />
        </div>
      </div>

      {/* Row 3: Comms + Waypoints */}
      <div className="grid grid-cols-12 gap-4" style={{ minHeight: '220px' }}>
        <div className="col-span-12 lg:col-span-5">
          <CommsLogPanel />
        </div>
        <div className="col-span-12 lg:col-span-7">
          <WaypointTable />
        </div>
      </div>
    </div>
  );
}
