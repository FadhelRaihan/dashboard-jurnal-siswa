import React, { useState, useEffect, useMemo } from "react"
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
import { jurnalKaihService } from "../../../services"

const HABITS = [
    { id: "bangun_pagi", key: "bangunPagi", label: "Bangun Pagi", icon: <FaRegClock />, barClass: "bg-primary" },
    { id: "beribadah", key: "ibadahValue", label: "Beribadah", icon: <FaPrayingHands />, barClass: "bg-secondary" },
    { id: "berolahraga", key: "berolahraga", label: "Berolahraga", icon: <FaRunning />, barClass: "bg-accent" },
    { id: "makan_sehat", key: "makanSehat", label: "Makan Sehat", icon: <FaAppleAlt />, barClass: "bg-info" },
    { id: "gemar_belajar", key: "gemarBelajar", label: "Gemar Belajar", icon: <FaBook />, barClass: "bg-success" },
    { id: "bermasyarakat", key: "bermasyarakat", label: "Bermasyarakat", icon: <FaUsers />, barClass: "bg-warning" },
    { id: "tidur_cepat", key: "tidurCepat", label: "Tidur Cepat", icon: <FaMoon />, barClass: "bg-neutral" }
]

export default function SiswaBerandaPage() {
    const [loading, setLoading] = useState(true);
    const [allData, setAllData] = useState([]);
    const [viewDate, setViewDate] = useState(new Date());
    
    const userProfile = JSON.parse(localStorage.getItem("user") || "{}");
    const validNisn = userProfile.nisn || userProfile.NISN;

    useEffect(() => {
        const loadHistory = async () => {
            if (!validNisn) {
                setLoading(false);
                return;
            }
            try {
                const res = await jurnalKaihService.getHistory({ limit: 1000 });
                if (res && res.status && res.data && Array.isArray(res.data.items)) {
                    const list = res.data.items.filter(
                        (item) => String(item.nisn) === String(validNisn)
                    );
                    setAllData(list);
                }
            } catch (err) {
                console.error("Gagal memuat histori dashboard:", err);
            } finally {
                setLoading(false);
            }
        };
        loadHistory();
    }, [validNisn]);

    const handlePrevMonth = () => {
        setViewDate((p) => {
            const d = new Date(p);
            d.setMonth(d.getMonth() - 1);
            return d;
        });
    };

    const handleNextMonth = () => {
        setViewDate((p) => {
            const d = new Date(p);
            d.setMonth(d.getMonth() + 1);
            return d;
        });
    };

    const currentMonthLogs = useMemo(() => {
        const targetMonth = viewDate.getMonth();
        const targetYear = viewDate.getFullYear();

        return allData.filter((item) => {
            if (!item.tanggal) return false;
            const d = new Date(item.tanggal);
            return d.getMonth() === targetMonth && d.getFullYear() === targetYear;
        }).sort((a, b) => new Date(b.tanggal) - new Date(a.tanggal));
    }, [allData, viewDate]);

    const statistics = useMemo(() => {
        const totalFilled = currentMonthLogs.length;
        if (totalFilled === 0) {
            return {
                overallAvg: "0.0",
                habitAvgs: {
                    bangunPagi: 0,
                    ibadahValue: 0,
                    berolahraga: 0,
                    makanSehat: 0,
                    gemarBelajar: 0,
                    bermasyarakat: 0,
                    tidurCepat: 0
                }
            };
        }

        const sum = {
            bangunPagi: 0,
            ibadahValue: 0,
            berolahraga: 0,
            makanSehat: 0,
            gemarBelajar: 0,
            bermasyarakat: 0,
            tidurCepat: 0,
            totalPoin: 0
        };

        currentMonthLogs.forEach((item) => {
            sum.bangunPagi += Number(item.bangunPagi || 0);
            sum.ibadahValue += Number(item.ibadahValue || 0);
            sum.berolahraga += Number(item.berolahraga || 0);
            sum.makanSehat += Number(item.makanSehat || 0);
            sum.gemarBelajar += Number(item.gemarBelajar || 0);
            sum.bermasyarakat += Number(item.bermasyarakat || 0);
            sum.tidurCepat += Number(item.tidurCepat || 0);
            sum.totalPoin += Number(item.totalPoin || 0);
        });

        return {
            overallAvg: (sum.totalPoin / totalFilled).toFixed(1),
            habitAvgs: {
                bangunPagi: (sum.bangunPagi / totalFilled).toFixed(1),
                ibadahValue: (sum.ibadahValue / totalFilled).toFixed(1),
                berolahraga: (sum.berolahraga / totalFilled).toFixed(1),
                makanSehat: (sum.makanSehat / totalFilled).toFixed(1),
                gemarBelajar: (sum.gemarBelajar / totalFilled).toFixed(1),
                bermasyarakat: (sum.bermasyarakat / totalFilled).toFixed(1),
                tidurCepat: (sum.tidurCepat / totalFilled).toFixed(1)
            }
        };
    }, [currentMonthLogs]);

    const getStatusConfig = (score) => {
        const num = parseFloat(score);
        if (num === 0) return { emoji: "✏️", title: "Belum Ada Data", sub: "Yuk isi jurnal harianmu bulan ini!" };
        if (num >= 24) return { emoji: "🏆", title: "Sangat Terbiasa", sub: "Hebat! Konsistensi yang luar biasa!" };
        if (num >= 18) return { emoji: "💪", title: "Terbiasa", sub: "Bagus sekali! Pertahankan momentum ini!" };
        if (num >= 10) return { emoji: "🌱", title: "Mulai Terbiasa", sub: "Kerja bagus! Tingkatkan sedikit lagi, ya!" };
        return { emoji: "🚀", title: "Perlu Latihan", sub: "Terus berusaha membentuk kebiasaan baru!" };
    };

    const status = getStatusConfig(statistics.overallAvg);

    const getFormattedDay = (dateStr) => {
        const d = new Date(dateStr);
        return String(d.getDate()).padStart(2, '0');
    };

    const getFormattedMonth = (dateStr) => {
        const d = new Date(dateStr);
        const mons = ["Jan", "Feb", "Mar", "Apr", "Mei", "Jun", "Jul", "Agu", "Sep", "Okt", "Nov", "Des"];
        return mons[d.getMonth()];
    };

    const getDayName = (dateStr) => {
        const days = ["Minggu", "Senin", "Selasa", "Rabu", "Kamis", "Jumat", "Sabtu"];
        return days[new Date(dateStr).getDay()];
    };

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
                        <button type="button" onClick={handlePrevMonth} className="btn btn-sm btn-square btn-ghost text-base-content/70 hover:text-primary" aria-label="Sebelumnya">
                            <FaChevronLeft />
                        </button>
                        <div className="flex items-center gap-2 font-black text-sm text-base-content">
                            <FaRegCalendarAlt className="text-primary opacity-70" /> 
                            {viewDate.toLocaleDateString("id-ID", { month: "long", year: "numeric" })}
                        </div>
                        <button type="button" onClick={handleNextMonth} className="btn btn-sm btn-square btn-ghost text-base-content/70 hover:text-primary" aria-label="Berikutnya">
                            <FaChevronRight />
                        </button>
                    </div>

                    <div className="grid grid-cols-1">
                        <div className="text-center bg-primary/5 border border-primary/10 text-primary rounded-xl py-2.5 font-black text-xs uppercase tracking-wide">
                            📅 Mode Laporan Aktif: Bulanan
                        </div>
                    </div>
                </div>
            </div>

            {/* Rangkuman Card - Premium Style */}
            <div className="card bg-gradient-to-br from-primary via-primary to-secondary text-white shadow-xl rounded-3xl relative overflow-hidden">
                <div className="absolute top-0 right-0 -mt-8 -mr-8 w-40 h-40 rounded-full bg-white/10 blur-2xl"></div>
                <div className="absolute bottom-0 left-0 -mb-10 -ml-10 w-32 h-32 rounded-full bg-white/10 blur-xl"></div>
                
                <div className="card-body p-6 text-center relative z-10 flex flex-col items-center">
                    <p className="font-black text-xs uppercase tracking-widest opacity-80 mb-1">Rata-rata Total Skor</p>
                    
                    <div className="flex items-end gap-1 justify-center my-2">
                        <span className="text-6xl font-black leading-none drop-shadow-md tracking-tighter">
                            {statistics.overallAvg}
                        </span>
                        <span className="text-lg font-bold opacity-80 mb-1.5">/ 28</span>
                    </div>

                    <div className="mt-4 w-full bg-white/20 backdrop-blur-md rounded-2xl p-3 border border-white/20 flex items-center gap-3">
                        <div className="w-12 h-12 bg-white rounded-xl text-2xl flex items-center justify-center shadow-inner shadow-black/5">
                            {status.emoji}
                        </div>
                        <div className="flex-1 text-left">
                            <div className="font-black text-lg leading-tight">{status.title}</div>
                            <div className="text-xs font-bold opacity-90 leading-tight">{status.sub}</div>
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
                            value={parseFloat(statistics.habitAvgs[h.key])}
                            total={4}
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
                    <span className="badge badge-primary font-black px-2.5 py-3 text-[10px] shadow-sm shadow-primary/20 uppercase">
                        {currentMonthLogs.length} Catatan
                    </span>
                </div>

                <div className="flex flex-col gap-2.5">
                    {loading ? (
                        <div className="flex flex-col items-center justify-center py-10 gap-2 animate-pulse">
                            <span className="loading loading-spinner loading-md text-primary"></span>
                            <span className="text-[10px] font-black text-base-content/30 tracking-widest uppercase">Memuat Data...</span>
                        </div>
                    ) : currentMonthLogs.length === 0 ? (
                        <div className="card bg-base-100 rounded-3xl border-2 border-dashed border-base-300/60 p-8 text-center flex flex-col items-center justify-center min-h-[150px] text-base-content/30">
                            <span className="text-4xl mb-2 opacity-40">📭</span>
                            <h4 className="font-black text-sm text-base-content/50">Belum Ada Catatan</h4>
                            <p className="text-[10px] font-bold tracking-wide mt-1 opacity-80 max-w-[180px] mx-auto">
                                Kamu belum mengirimkan jurnal harian di periode bulan ini.
                            </p>
                        </div>
                    ) : (
                        currentMonthLogs.map((item, index) => (
                            <div key={index} className="card bg-base-100 rounded-2xl shadow-sm border border-base-300/50 hover:border-primary/50 transition-colors group animate-in fade-in slide-in-from-bottom-2 duration-300">
                                <div className="p-4 flex items-center justify-between">
                                    <div className="flex items-center gap-3">
                                        <div className="w-10 h-10 rounded-xl bg-primary/10 text-primary flex flex-col items-center justify-center group-hover:bg-primary group-hover:text-white transition-all duration-300">
                                            <span className="text-xs font-black">{getFormattedDay(item.tanggal)}</span>
                                            <span className="text-[9px] font-bold uppercase -mt-0.5">{getFormattedMonth(item.tanggal)}</span>
                                        </div>
                                        <div>
                                            <h4 className="font-black text-sm text-base-content">{getDayName(item.tanggal)} Ceria</h4>
                                            <p className="text-[10px] font-bold text-base-content/50 truncate max-w-[140px]">{item.namaSiswa || userProfile.nama}</p>
                                        </div>
                                    </div>
                                    
                                    <div className="text-right flex flex-col items-end">
                                        <div className="flex items-baseline gap-0.5 font-black text-xl text-primary">
                                            {item.totalPoin} <span className="text-[10px] opacity-60">pts</span>
                                        </div>
                                        <span className="badge badge-xs badge-success text-[8px] p-2 font-black">TERKIRIM</span>
                                    </div>
                                </div>
                            </div>
                        ))
                    )}
                </div>
            </div>
        </div>
    )
}

