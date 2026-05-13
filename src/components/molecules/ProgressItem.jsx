import React from 'react'

export function ProgressItem({ label, value, color, total = 30 }) {
  const percentage = (value / total) * 100

  return (
    <div className="flex flex-col gap-1">
      <div className="flex justify-between text-sm">
        <span className="font-semibold">{label}</span>
        <span className="font-semibold" style={{color:color}}>{value} siswa</span>
      </div>

      <div className="w-full h-2 bg-gray-200 rounded-full overflow-hidden">
        <div
          className="h-full rounded-full transition-all duration-500"
          style={{
            width: `${percentage}%`,
            backgroundColor: color
          }}
        />
      </div>
    </div>
  )
}