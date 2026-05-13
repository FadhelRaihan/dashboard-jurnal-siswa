import React from "react";
import { FaCheckCircle } from "react-icons/fa";

export default function KaihPointCard({ item, selectedLabel, onClick }) {
  const isSelected = !!selectedLabel;

  // 🎨 DESIGN SYSTEM: EXPLICIT VIBRANT COLORS FOR ALL 7 ITEMS TO MAXIMIZE ENGAGEMENT
  const cardStyleMap = {
    bangun_pagi: {
      bgActive: "bg-amber-50/90 border-amber-400/60 shadow-amber-200/30",
      bgDefault:
        "bg-base-100 border-base-300/50 hover:border-amber-300/50 hover:shadow-md",
      text: "text-amber-600",
      iconBg: isSelected
        ? "bg-amber-100 text-amber-600"
        : "bg-base-200 text-base-content/40",
      labelBg: "text-amber-700 border-amber-200 bg-amber-50/30",
    },
    beribadah: {
      bgActive: "bg-indigo-50/90 border-indigo-400/60 shadow-indigo-200/30",
      bgDefault:
        "bg-base-100 border-base-300/50 hover:border-indigo-300/50 hover:shadow-md",
      text: "text-indigo-600",
      iconBg: isSelected
        ? "bg-indigo-100 text-indigo-600"
        : "bg-base-200 text-base-content/40",
      labelBg: "text-indigo-700 border-indigo-200 bg-indigo-50/30",
    },
    berolahraga: {
      bgActive: "bg-emerald-50/90 border-emerald-400/60 shadow-emerald-200/30",
      bgDefault:
        "bg-base-100 border-base-300/50 hover:border-emerald-300/50 hover:shadow-md",
      text: "text-emerald-600",
      iconBg: isSelected
        ? "bg-emerald-100 text-emerald-600"
        : "bg-base-200 text-base-content/40",
      labelBg: "text-emerald-700 border-emerald-200 bg-emerald-50/30",
    },
    makan_sehat: {
      bgActive: "bg-rose-50/90 border-rose-400/60 shadow-rose-200/30",
      bgDefault:
        "bg-base-100 border-base-300/50 hover:border-rose-300/50 hover:shadow-md",
      text: "text-rose-600",
      iconBg: isSelected
        ? "bg-rose-100 text-rose-600"
        : "bg-base-200 text-base-content/40",
      labelBg: "text-rose-700 border-rose-200 bg-rose-50/30",
    },
    gemar_belajar: {
      bgActive: "bg-sky-50/90 border-sky-400/60 shadow-sky-200/30",
      bgDefault:
        "bg-base-100 border-base-300/50 hover:border-sky-300/50 hover:shadow-md",
      text: "text-sky-600",
      iconBg: isSelected
        ? "bg-sky-100 text-sky-600"
        : "bg-base-200 text-base-content/40",
      labelBg: "text-sky-700 border-sky-200 bg-sky-50/30",
    },
    bermasyarakat: {
      bgActive: "bg-violet-50/90 border-violet-400/60 shadow-violet-200/30",
      bgDefault:
        "bg-base-100 border-base-300/50 hover:border-violet-300/50 hover:shadow-md",
      text: "text-violet-600",
      iconBg: isSelected
        ? "bg-violet-100 text-violet-600"
        : "bg-base-200 text-base-content/40",
      labelBg: "text-violet-700 border-violet-200 bg-violet-50/30",
    },
    tidur_cepat: {
      bgActive: "bg-fuchsia-50/90 border-fuchsia-400/60 shadow-fuchsia-200/30",
      bgDefault:
        "bg-base-100 border-base-300/50 hover:border-fuchsia-300/50 hover:shadow-md",
      text: "text-fuchsia-600",
      iconBg: isSelected
        ? "bg-fuchsia-100 text-fuchsia-600"
        : "bg-base-200 text-base-content/40",
      labelBg: "text-fuchsia-700 border-fuchsia-200 bg-fuchsia-50/30",
    },
  };

  const style = cardStyleMap[item.id] || {
    bgActive: "bg-primary/10 border-primary/40 shadow-primary/10",
    bgDefault: "bg-base-100 border-base-300/50",
    text: "text-primary",
    iconBg: "bg-base-200",
    labelBg: "text-primary bg-white",
  };

  return (
    <div
      onClick={onClick}
      className={`card relative cursor-pointer border-2 transition-all duration-500 active:scale-[0.97] rounded-[2.2rem] shadow-sm overflow-hidden flex flex-col
        ${isSelected ? `${style.bgActive} shadow-lg scale-[1.02]` : style.bgDefault}
        ${item.fullWidth ? "col-span-2" : "col-span-1"}
      `}
    >
      {isSelected && (
        <div
          className={`absolute top-3.5 right-3.5 text-xl ${style.text} animate-in zoom-in duration-300`}
        >
          <FaCheckCircle className="filter drop-shadow-sm" />
        </div>
      )}

      <div className="card-body p-4 flex flex-col items-center text-center justify-between h-full">
        <div className="flex flex-col items-center w-full">
          {/* Bubble Icon Container */}
          <div
            className={`w-14 h-14 rounded-[1.5rem] flex items-center justify-center shadow-inner mb-2.5 transition-all duration-500 ${isSelected ? "scale-110 shadow-md rotate-3" : ""} ${style.iconBg}`}
          >
            <span className="text-2xl">{item.icon}</span>
          </div>

          {/* Label Heading */}
          <h3
            className={`text-[11px] font-black uppercase tracking-wider transition-colors leading-none ${isSelected ? "text-base-content" : "text-base-content/70"}`}
          >
            {item.label}
          </h3>
        </div>

        {/* Selection Indicator - ✂️ STRICT 2-LINE OVERSPILL PROTECTOR */}
        {isSelected ? (
          <div
            className={`w-full h-10 flex items-center justify-center px-2.5 rounded-2xl bg-white shadow-sm border animate-in slide-in-from-bottom-2 duration-300 ${style.labelBg}`}
          >
            <span 
              className="text-[10px] font-black leading-[1.25] text-center w-full line-clamp-2 overflow-hidden text-ellipsis"
              style={{
                display: "-webkit-box",
                WebkitLineClamp: "2",
                WebkitBoxOrient: "vertical",
                overflow: "hidden"
              }}
            >
              {selectedLabel}
            </span>
          </div>
        ) : (
          <div className="w-full mt-2.5 text-[9px] font-black tracking-widest uppercase text-base-content/30 bg-base-200/50 border border-base-300/10 py-2 rounded-2xl">
            Pilih
          </div>
        )}
      </div>
    </div>
  );
}
