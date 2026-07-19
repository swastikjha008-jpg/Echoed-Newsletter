export default function SkeletonCard({ style }: { style?: React.CSSProperties }) {
  return (
    <div className="glass rounded-2xl p-5 flex flex-col h-full" style={style}>
      <div className="flex items-center justify-between mb-4">
        <div className="flex items-center gap-2.5">
          <span className="skeleton w-7 h-7 rounded-full" />
          <span className="skeleton h-3.5 w-16 rounded" />
        </div>
        <span className="skeleton h-6 w-16 rounded-lg" />
      </div>
      <div className="space-y-2.5 flex-1">
        <span className="skeleton block h-3 w-full rounded" />
        <span className="skeleton block h-3 w-[92%] rounded" />
        <span className="skeleton block h-3 w-full rounded" />
        <span className="skeleton block h-3 w-[70%] rounded" />
        <span className="skeleton block h-3 w-[85%] rounded" />
      </div>
      <div className="mt-4 pt-3 border-t border-[var(--border)]">
        <span className="skeleton block h-2.5 w-20 rounded" />
      </div>
    </div>
  );
}
