export default function Loading() {
  return (
    <div className="min-h-screen flex items-center justify-center">
      <div className="flex flex-col items-center gap-4">
        <div className="relative w-16 h-16">
          <div className="absolute inset-0 border-4 border-slate-200 dark:border-slate-700 rounded-full" />
          <div className="absolute inset-0 border-4 border-transparent border-t-red-600 rounded-full animate-spin" />
        </div>
        <p className="text-slate-500 dark:text-slate-400 text-sm font-medium">Loading...</p>
      </div>
    </div>
  );
}
