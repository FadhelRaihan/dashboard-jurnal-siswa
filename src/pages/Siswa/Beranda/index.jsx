import React from "react"
import {
    FaChevronLeft,
    FaChevronRight,
    FaRegClock,
    FaPrayingHands,
    FaRunning,
    FaAppleAlt,
    FaBook,
    FaUsers,
    FaMoon,
    FaRegCalendarAlt
} from "react-icons/fa"
import { AvgBarRow } from "../../../components/molecules/AverageBarItem"

const HABITS = [
    { id: "bangun_pagi", label: "Bangun Pagi", icon: <FaRegClock />, barClass: "bg-primary" },
    { id: "beribadah", label: "Beribadah", icon: <FaPrayingHands />, barClass: "bg-secondary" },
    { id: "berolahraga", label: "Berolahraga", icon: <FaRunning />, barClass: "bg-accent" },
    { id: "makan_sehat", label: "Makan Sehat", icon: <FaAppleAlt />, barClass: "bg-info" },
    { id: "gemar_belajar", label: "Gemar Belajar", icon: <FaBook />, barClass: "bg-success" },
    { id: "bermasyarakat", label: "Bermasyarakat", icon: <FaUsers />, barClass: "bg-warning" },
    { id: "tidur_cepat", label: "Tidur Cepat", icon: <FaMoon />, barClass: "bg-neutral" }
]

export default function SiswaBerandaPage() {
    return (
        <div className="flex flex-col gap-6 py-2">
            {/* Top Section Header */}
            <div className="px-1 flex flex-col gap-1">
                <div className="flex items-center gap-2 text-primary font-black tracking-wide text-sm uppercase">
                    <div className="w-6 h-0.5 bg-primary rounded-full"></div>
                    Statistik Saya
                </div>
                <h2 className="text-2xl font-black text-base-content leading-tight">
                    Rekap Mingguan & Bulanan 📊
                </h2>
            </div>

            {/* Filter Control Sticky-ish bar */}
            <div className="card bg-base-100 shadow-sm rounded-2xl border border-base-300/50">
                <div className="p-3 flex flex-col gap-3">
                    <div className="flex items-center justify-between bg-base-200 rounded-xl p-1.5">
                        <button type="button" className="btn btn-sm btn-square btn-ghost text-base-content/70 hover:text-primary" aria-label="Sebelumnya">
                            <FaChevronLeft />
                        </button>
                        <div className="flex items-center gap-2 font-black text-sm text-base-content">
                            <FaRegCalendarAlt className="text-primary opacity-70" /> Maret 2026
                        </div>
                        <button type="button" className="btn btn-sm btn-square btn-ghost text-base-content/70 hover:text-primary" aria-label="Berikutnya">
                            <FaChevronRight />
                        </button>
                    </div>

                    <div className="grid grid-cols-2 gap-2">
                        <select className="select select-sm select-bordered bg-base-100 font-bold rounded-lg border-base-300 focus:ring-2 focus:ring-primary/20 h-10">
                            <option value="month">Bulanan</option>
                            <option value="semester">Semester</option>
                        </select>
                        <button className="btn btn-sm btn-primary font-black rounded-lg h-10 shadow-sm text-xs uppercase">Terapkan</button>
                    </div>
                </div>
            </div>

            {/* Rangkuman Card - Premium Style */}
            <div className="card bg-gradient-to-br from-primary via-primary to-secondary text-white shadow-xl rounded-3xl relative overflow-hidden">
                <div className="absolute top-0 right-0 -mt-8 -mr-8 w-40 h-40 rounded-full bg-white/10 blur-2xl"></div>
                <div className="absolute bottom-0 left-0 -mb-10 -ml-10 w-32 h-32 rounded-full bg-white/10 blur-xl"></div>
                
                <div className="card-body p-6 text-center relative z-10 flex flex-col items-center">
                    <p className="font-black text-xs uppercase tracking-widest opacity-80 mb-1">Skor Rata-rata</p>
                    
                    <div className="flex items-end gap-1 justify-center my-2">
                        <span className="text-6xl font-black leading-none drop-shadow-md tracking-tighter">28.3</span>
                        <span className="text-lg font-bold opacity-80 mb-1.5">/ 40</span>
                    </div>

                    <div className="mt-4 w-full bg-white/20 backdrop-blur-md rounded-2xl p-3 border border-white/20 flex items-center gap-3 animate-pulse-slow">
                        <div className="w-12 h-12 bg-white rounded-xl text-2xl flex items-center justify-center shadow-inner">
                            💪
                        </div>
                        <div className="flex-1 text-left">
                            <div className="font-black text-lg leading-tight">Terbiasa</div>
                            <div className="text-xs font-bold opacity-90 leading-tight">Hebat! Pertahankan, ya!</div>
                        </div>
                    </div>
                </div>
            </div>

            {/* Detail List Section */}
            <div className="space-y-3">
                <h3 className="text-lg font-black text-base-content/80 px-1 flex items-center gap-2">
                    <span className="text-xl">📈</span> Skor per Kebiasaan
                </h3>
                
                <div className="grid grid-cols-1 gap-3">
                    {HABITS.map((h) => (
                        <AvgBarRow
                            key={h.id}
                            icon={h.icon}
                            label={h.label}
                            value={3.5}
                            total={5}
                            barClass={h.barClass}
                        />
                    ))}
                </div>
            </div>

            {/* Riwayat Singkat */}
            <div className="mt-2 flex flex-col gap-3 mb-14">
                <div className="flex items-center justify-between px-1">
                    <h3 className="text-lg font-black text-base-content/80 flex items-center gap-2">
                        <span className="text-xl">📝</span> Catatan Harian
                    </h3>
                    <span className="badge badge-primary font-black px-2.5 py-3 text-[10px] shadow-sm shadow-primary/20">2 HARI</span>
                </div>

                <div className="flex flex-col gap-2.5">
                    {/* Item Riwayat 1 */}
                    <div className="card bg-base-100 rounded-2xl shadow-sm border border-base-300/50 hover:border-primary/50 transition-colors group">
                        <div className="p-4 flex items-center justify-between">
                            <div className="flex items-center gap-3">
                                <div className="w-10 h-10 rounded-xl bg-primary/10 text-primary flex flex-col items-center justify-center group-hover:bg-primary group-hover:text-white transition-all duration-300">
                                    <span className="text-xs font-black">09</span>
                                    <span className="text-[9px] font-bold uppercase -mt-0.5">Mar</span>
                                </div>
                                <div>
                                    <h4 className="font-black text-sm text-base-content">Senin Produktif</h4>
                                    <p className="text-[10px] font-bold text-base-content/50 truncate max-w-[140px]">Denisha Oktaviane</p>
                                </div>
                            </div>
                            
                            <div className="text-right flex flex-col items-end">
                                <div className="flex items-baseline gap-0.5 font-black text-xl text-primary">
                                    40 <span className="text-[10px] opacity-60">pts</span>
                                </div>
                                <span className="badge badge-xs badge-success text-[8px] p-2 font-black">SELESAI</span>
                            </div>
                        </div>
                    </div>

                    {/* Item Riwayat 2 */}
                    <div className="card bg-base-100 rounded-2xl shadow-sm border border-base-300/50 hover:border-error/50 transition-colors group">
                        <div className="p-4 flex items-center justify-between">
                            <div className="flex items-center gap-3">
                                <div className="w-10 h-10 rounded-xl bg-base-200 text-base-content/40 flex flex-col items-center justify-center group-hover:bg-error group-hover:text-white transition-all duration-300">
                                    <span className="text-xs font-black">25</span>
                                    <span className="text-[9px] font-bold uppercase -mt-0.5">Mar</span>
                                </div>
                                <div>
                                    <h4 className="font-black text-sm text-base-content/60 group-hover:text-base-content">Rabu Kosong</h4>
                                    <p className="text-[10px] font-bold text-base-content/40 truncate">Denisha Oktaviane</p>
                                </div>
                            </div>
                            
                            <div className="text-right flex flex-col items-end">
                                <div className="flex items-baseline gap-0.5 font-black text-xl text-base-content/40 group-hover:text-error">
                                    0 <span className="text-[10px] opacity-60">pts</span>
                                </div>
                                <span className="badge badge-xs badge-ghost opacity-50 text-[8px] font-black">BELUM</span>
                            </div>
                        </div>
                    </div>
                </div>
            </div>
        </div>
    )
}

