import React from 'react'

export function AvgBarRow({ icon, label, value, total, barClass }) {
  const pct = total === 0 ? 0 : Math.max(0, Math.min(100, (value / total) * 100))
  
  // Safe class conversion if legacy classes exist
  let appliedBarClass = barClass || 'bg-primary';
  if (appliedBarClass.includes('bg-aksen-1')) appliedBarClass = 'bg-accent';
  if (appliedBarClass.includes('bg-aksen-2')) appliedBarClass = 'bg-info';

  return (
    <div className="flex items-center gap-4 bg-base-100 p-3 rounded-2xl border border-base-300/30 shadow-sm hover:shadow-md transition-all">
      <div className="w-10 h-10 rounded-xl bg-base-200 flex items-center justify-center text-lg shadow-inner flex-shrink-0 text-base-content/70">
        {icon}
      </div>
      <div className="flex-1 min-w-0">
        <div className="flex justify-between items-end mb-1.5">
          <div className="text-sm font-black text-base-content leading-tight truncate">{label}</div>
          <div className="text-xs font-extrabold text-base-content/60 ml-2 whitespace-nowrap">
            {value.toFixed(1)} <span className="opacity-50">/ {total}</span>
          </div>
        </div>
        <div className="w-full h-3 bg-base-200 rounded-full overflow-hidden p-[1px] ring-1 ring-base-300/50">
          <div 
            className={`h-full rounded-full shadow-sm transition-all duration-500 ease-out ${appliedBarClass}`} 
            style={{ width: `${pct}%` }} 
          />
        </div>
      </div>
    </div>
  )
}