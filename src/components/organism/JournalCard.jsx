import React from "react";
import { FaPen } from "react-icons/fa";

export default function JournalCard({
  tanggal,
  kelas,
  mapel,
  materi,
  aktivitas,
  refleksi,
  onEdit
}) {
  return (
    <div className="bg-white rounded-2xl shadow-md p-5 relative">
      
      <button
        onClick={onEdit}
        className="absolute top-4 right-4 text-orange-400 hover:text-orange-500 transition"
      >
        <FaPen />
      </button>

      <h2 className="text-primary font-bold text-lg">
        {tanggal}
      </h2>
      <p className="text-sm text-gray-500 mb-4">
        {kelas} • {mapel}
      </p>

      <div className="flex flex-col gap-3 text-sm">
        
        <div>
          <p className="font-semibold text-primary">Materi:</p>
          <p className="text-gray-600">{materi}</p>
        </div>

        <div>
          <p className="font-semibold text-primary">Aktivitas:</p>
          <p className="text-gray-600">{aktivitas}</p>
        </div>

        <div>
          <p className="font-semibold text-primary">Refleksi:</p>
          <p className="text-gray-600">{refleksi}</p>
        </div>

      </div>
    </div>
  );
}