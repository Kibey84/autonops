export default function Loading() {
  return (
    <div className="min-h-screen flex items-center justify-center bg-slate-900">
      <div className="flex flex-col items-center gap-6">
        {/* Animated logo/drone */}
        <div className="relative">
          {/* Outer glow ring */}
          <div className="absolute inset-0 w-24 h-24 rounded-full bg-red-500/20 animate-ping" />

          {/* Main spinner */}
          <div className="relative w-24 h-24">
            <div className="absolute inset-0 border-4 border-slate-700 rounded-full" />
            <div className="absolute inset-0 border-4 border-transparent border-t-red-500 rounded-full animate-spin" />
            <div className="absolute inset-2 border-4 border-transparent border-b-red-400 rounded-full animate-spin" style={{ animationDirection: 'reverse', animationDuration: '0.8s' }} />

            {/* Center dot */}
            <div className="absolute inset-0 flex items-center justify-center">
              <div className="w-4 h-4 bg-red-500 rounded-full animate-pulse" />
            </div>
          </div>
        </div>

        {/* Loading text with animated dots */}
        <div className="flex items-center gap-1">
          <span className="text-slate-400 text-sm font-medium tracking-wide">LOADING</span>
          <span className="flex gap-1 ml-1">
            <span className="w-1.5 h-1.5 bg-red-500 rounded-full loading-dot" />
            <span className="w-1.5 h-1.5 bg-red-500 rounded-full loading-dot" />
            <span className="w-1.5 h-1.5 bg-red-500 rounded-full loading-dot" />
          </span>
        </div>

        {/* Subtle tagline */}
        <p className="text-slate-600 text-xs uppercase tracking-widest">Mission Ready</p>
      </div>
    </div>
  );
}
