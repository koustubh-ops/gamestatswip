export function SkeletonCard() {
  return (
    <div className="glass rounded-2xl overflow-hidden animate-pulse">
      <div className="h-36 bg-secondary/40" />
      <div className="p-4 space-y-3">
        <div className="h-3 bg-secondary/60 rounded w-2/3" />
        <div className="grid grid-cols-2 gap-2">
          <div className="h-12 bg-secondary/40 rounded-lg" />
          <div className="h-12 bg-secondary/40 rounded-lg" />
        </div>
      </div>
    </div>
  );
}
