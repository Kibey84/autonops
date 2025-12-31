'use client';

interface AnimatedDroneProps {
  className?: string;
  size?: number;
  color?: string;
}

export default function AnimatedDrone({
  className = '',
  size = 120,
  color = '#dc2626',
}: AnimatedDroneProps) {
  return (
    <svg
      width={size}
      height={size}
      viewBox="0 0 120 120"
      className={`drone-body ${className}`}
      xmlns="http://www.w3.org/2000/svg"
    >
      {/* Main body */}
      <ellipse cx="60" cy="60" rx="20" ry="10" fill={color} opacity="0.9" />

      {/* Camera/sensor */}
      <circle cx="60" cy="65" r="5" fill="#1e293b" />
      <circle cx="60" cy="65" r="2" fill="#ef4444" className="animate-pulse" />

      {/* Arms */}
      <line x1="40" y1="55" x2="20" y2="40" stroke={color} strokeWidth="3" strokeLinecap="round" />
      <line x1="80" y1="55" x2="100" y2="40" stroke={color} strokeWidth="3" strokeLinecap="round" />
      <line x1="40" y1="65" x2="20" y2="80" stroke={color} strokeWidth="3" strokeLinecap="round" />
      <line x1="80" y1="65" x2="100" y2="80" stroke={color} strokeWidth="3" strokeLinecap="round" />

      {/* Propeller mounts */}
      <circle cx="20" cy="40" r="6" fill="#1e293b" />
      <circle cx="100" cy="40" r="6" fill="#1e293b" />
      <circle cx="20" cy="80" r="6" fill="#1e293b" />
      <circle cx="100" cy="80" r="6" fill="#1e293b" />

      {/* Spinning propellers */}
      <g className="propeller" style={{ transformOrigin: '20px 40px' }}>
        <ellipse cx="20" cy="40" rx="12" ry="2" fill="#64748b" opacity="0.6" />
        <ellipse cx="20" cy="40" rx="2" ry="12" fill="#64748b" opacity="0.6" />
      </g>
      <g className="propeller" style={{ transformOrigin: '100px 40px', animationDelay: '0.05s' }}>
        <ellipse cx="100" cy="40" rx="12" ry="2" fill="#64748b" opacity="0.6" />
        <ellipse cx="100" cy="40" rx="2" ry="12" fill="#64748b" opacity="0.6" />
      </g>
      <g className="propeller" style={{ transformOrigin: '20px 80px', animationDelay: '0.02s' }}>
        <ellipse cx="20" cy="80" rx="12" ry="2" fill="#64748b" opacity="0.6" />
        <ellipse cx="20" cy="80" rx="2" ry="12" fill="#64748b" opacity="0.6" />
      </g>
      <g className="propeller" style={{ transformOrigin: '100px 80px', animationDelay: '0.07s' }}>
        <ellipse cx="100" cy="80" rx="12" ry="2" fill="#64748b" opacity="0.6" />
        <ellipse cx="100" cy="80" rx="2" ry="12" fill="#64748b" opacity="0.6" />
      </g>

      {/* Signal waves */}
      <circle cx="60" cy="60" r="25" fill="none" stroke={color} strokeWidth="1" opacity="0.3" className="radar-ring" />
      <circle cx="60" cy="60" r="25" fill="none" stroke={color} strokeWidth="1" opacity="0.3" className="radar-ring" style={{ animationDelay: '0.7s' }} />
    </svg>
  );
}

// Radar pulse animation
export function RadarPulse({ className = '', size = 100, color = '#dc2626' }: AnimatedDroneProps) {
  return (
    <svg
      width={size}
      height={size}
      viewBox="0 0 100 100"
      className={className}
      xmlns="http://www.w3.org/2000/svg"
    >
      <circle cx="50" cy="50" r="5" fill={color} />
      <circle cx="50" cy="50" r="20" fill="none" stroke={color} strokeWidth="2" opacity="0.6" className="radar-ring" />
      <circle cx="50" cy="50" r="20" fill="none" stroke={color} strokeWidth="2" opacity="0.4" className="radar-ring" style={{ animationDelay: '0.5s' }} />
      <circle cx="50" cy="50" r="20" fill="none" stroke={color} strokeWidth="2" opacity="0.2" className="radar-ring" style={{ animationDelay: '1s' }} />
    </svg>
  );
}
