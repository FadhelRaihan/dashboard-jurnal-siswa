import React from 'react'
import { ProgressItem } from '../molecules/ProgressItem'
import { FaChartBar } from 'react-icons/fa'

export default function TrendNilaiCard() {
  const data = [
    {
      label: "Sangat Baik (90-100)",
      value: 8,
      color: "#8BAD73" // hijau
    },
    {
      label: "Baik (80-89)",
      value: 12,
      color: "#FF9249" // orange
    },
    {
      label: "Cukup (75-79)",
      value: 8,
      color: "#576A31" // hijau tua
    },
    {
      label: "Perlu Perbaikan (<75)",
      value: 2,
      color: "#D1495D" // merah
    }
  ]

  return (
    <div className="card w-full bg-base-100 shadow-md rounded-2xl">
      <div className="card-body gap-4">
        <h2 className="card-title text-primary font-bold flex items-center gap-2">
          <FaChartBar/> Tren Nilai per Kategori
        </h2>

        {data.map((item, index) => (
          <ProgressItem
            key={index}
            label={item.label}
            value={item.value}
            color={item.color}
            total={30} 
          />
        ))}
      </div>
    </div>
  )
}