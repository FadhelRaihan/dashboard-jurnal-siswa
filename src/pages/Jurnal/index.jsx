import React, { useState, useEffect } from "react";
import {
  FaCalendarCheck,
  FaSearch,
  FaChartBar,
  FaCheckCircle,
  FaRegImage,
  FaFilter,
} from "react-icons/fa";
import CustomButton from "../../components/atoms/CustomButton";
import { sekolahService, rekapBulananService } from "../../services";
import { useNotification } from "../../context/NotificationContext";
import { useOutletContext } from "react-router-dom";
import CustomModal from "../../components/organism/CustomModal";
// eslint-disable-next-line no-unused-vars
import { motion, AnimatePresence } from "framer-motion";
import {
  FaChevronDown,
  FaTrophy,
  FaRegCalendarAlt,
  FaRegAddressCard,
  FaStar,
} from "react-icons/fa";

export default function RekapKebiasaanPage() {
  useOutletContext();
  const { showNotif } = useNotification();
  const [activeTab, setActiveTab] = useState("mingguan");
  const [dataMingguan, setDataMingguan] = useState([]);
  const [dataCapaian, setDataCapaian] = useState([]);
  const [loading, setLoading] = useState(false);
  const [optionsSekolah, setOptionsSekolah] = useState([]);
  const [availableClasses, setAvailableClasses] = useState([]);

  const [isModalOpen, setIsModalOpen] = useState(false);
  const [selectedSiswa, setSelectedSiswa] = useState(null);
  const [detailJurnal, setDetailJurnal] = useState([]);
  const [loadingDetail, setLoadingDetail] = useState(false);

  const [selectedMonth, setSelectedMonth] = useState(
    `${new Date().getFullYear()}-${String(new Date().getMonth() + 1).padStart(2, "0")}`,
  );

  const [filter, setFilter] = useState({
    idSekolah: "",
    idKelas: "",
    bulan: new Date().getMonth() + 1,
    tahun: new Date().getFullYear(),
  });

  // State for Expandable List
  const [expandedId, setExpandedId] = useState(null);

  const categories = [
    { key: "bangunPagi", label: "Bangun Pagi" },
    { key: "berolahraga", label: "Olahraga" },
    { key: "nilaiIbadah", label: "Ibadah" },
    { key: "nilaiMakan", label: "Makan" },
    { key: "nilaiBelajar", label: "Belajar" },
    { key: "nilaiSosial", label: "Sosial" },
    { key: "nilaiTidur", label: "Tidur" },
  ];

  useEffect(() => {
    const fetchInitial = async () => {
      setLoading(true);
      try {
        const ress = await sekolahService.getDropdown();
        if (ress) setOptionsSekolah(ress);
      } catch {
        //
      } finally {
        setLoading(false);
      }
    };
    fetchInitial();
  }, []);

  useEffect(() => {
    if (filter.idSekolah) {
      const selected = optionsSekolah.find(
        (s) => String(s.idSekolah) === String(filter.idSekolah),
      );
      setAvailableClasses(selected?.kelas || []);
    }
  }, [filter.idSekolah, optionsSekolah]);

  const handleFetchData = async () => {
    if (!filter.idSekolah || !filter.idKelas) {
      showNotif("info", "Harap pilih institusi sekolah dan kelas");
      return;
    }
    setLoading(true);
    try {
      const [resMingguan, resCapaian] = await Promise.all([
        rekapBulananService.getRekapMingguan(filter),
        rekapBulananService.getRekapKetercapaian(filter),
      ]);
      if (resMingguan?.status) setDataMingguan(resMingguan.data);
      if (resCapaian?.status) setDataCapaian(resCapaian.data);
      showNotif("success", "Rekapitulasi dimuat.");
    } catch {
      showNotif("error", "Terjadi kendala pengambilan rekap.");
    } finally {
      setLoading(false);
    }
  };

  const getScoreClass = (score) => {
    const val = parseFloat(score);
    if (isNaN(val)) return "text-base-content/30 font-medium";
    if (val >= 3.5) return "text-success font-black";
    if (val >= 2.5) return "text-info font-black";
    if (val >= 1.5) return "text-warning font-black";
    return "text-error font-black";
  };

  const getStatusBadge = (ket) => {
    switch (ket) {
      case "Terbiasa":
        return "bg-success/10 text-success border-success/20";
      case "Belum Terbiasa":
        return "bg-error/10 text-error border-error/20";
      default:
        return "bg-base-200 text-base-content/50 border-base-300";
    }
  };

  const handleShowDetail = async (siswa) => {
    setSelectedSiswa(siswa);
    setIsModalOpen(true);
    setLoadingDetail(true);
    try {
      const res = await rekapBulananService.getDetailJurnalSiswa({
        nisn: siswa.nisn,
        bulan: filter.bulan,
        tahun: filter.tahun,
      });
      if (res.status) setDetailJurnal(res.data);
    } catch {
      showNotif("error", "Gagal melampirkan berkas visual.");
    } finally {
      setLoadingDetail(false);
    }
  };

  const photoKeyMap = {
    bangunPagi: "fotoBangunPagi",
    berolahraga: "fotoOlahraga",
    nilaiIbadah: "fotoIbadah",
    nilaiMakan: "fotoMakan",
    nilaiBelajar: "fotoBelajar",
    nilaiSosial: "fotoSosial",
    nilaiTidur: "fotoTidur",
  };

  const getRawDriveUrl = (url) => {
    if (typeof url !== "string" || !url) return url;

    // Convert uc?export=view → thumbnail (format lama yang perlu dimigrasi)
    if (url.includes("drive.google.com/uc?export=view")) {
      const idMatch = url.match(/[?&]id=([-\w]{25,})/);
      if (idMatch)
        return `https://drive.google.com/thumbnail?id=${idMatch[1]}&sz=w800`;
    }

    // Sudah thumbnail — langsung pakai
    if (url.includes("drive.google.com/thumbnail?id=")) return url;

    // Format /file/d/ID
    const match = url.match(/\/d\/([-\w]{25,})/);
    if (match)
      return `https://drive.google.com/thumbnail?id=${match[1]}&sz=w800`;

    return url;
  };

  const handleMonthChange = (e) => {
    const val = e.target.value;
    setSelectedMonth(val);
    if (val) {
      const [year, month] = val.split("-");
      setFilter({ ...filter, bulan: parseInt(month), tahun: parseInt(year) });
    }
  };

  return (
    <div className="py-4 space-y-8 flex flex-col">
      {/* Simplified Header Page */}
      <div className="flex flex-col gap-2 mb-2">
        <div className="flex items-center gap-2 text-primary font-black text-sm uppercase tracking-widest">
          <span className="w-6 h-0.5 bg-primary rounded-full" />
          Monitoring Berkala
        </div>
        <h1 className="text-3xl font-black text-base-content tracking-tight">
          Jurnal Rekapitulasi
        </h1>
        <p className="text-sm font-bold text-base-content/50">
          Pantau intensitas kebiasaan siswa berdasarkan laporan harian
          terkumpul.
        </p>
      </div>

      {/* Advanced Filtering Area */}
      <div
        className={`relative bg-base-100 rounded-[2rem] shadow-lg shadow-base-200 border-2 border-base-200 p-6 transition-opacity ${loading ? "opacity-60 pointer-events-none" : ""}`}
      >
        <div className="flex flex-col md:flex-row gap-6 md:items-end">
          <div className="grid grid-cols-1 sm:grid-cols-3 flex-1 gap-4">
            <div className="flex flex-col gap-1.5">
              <label className="text-[10px] font-black text-base-content/50 uppercase tracking-widest ml-1 flex items-center gap-1.5">
                <FaFilter className="text-[8px] opacity-70" /> Satuan Pendidikan
              </label>
              <select
                className="select select-bordered border-2 border-base-300 focus:border-primary font-bold text-sm rounded-xl w-full shadow-sm bg-base-100"
                value={filter.idSekolah}
                disabled={loading}
                onChange={(e) =>
                  setFilter({ ...filter, idSekolah: e.target.value })
                }
              >
                <option value="">Pilih Sekolah...</option>
                {optionsSekolah.map((s) => (
                  <option key={s.idSekolah} value={s.idSekolah}>
                    {s.namaSekolah}
                  </option>
                ))}
              </select>
            </div>

            <div className="flex flex-col gap-1.5">
              <label className="text-[10px] font-black text-base-content/50 uppercase tracking-widest ml-1">
                Rombongan Belajar
              </label>
              <select
                className="select select-bordered border-2 border-base-300 focus:border-primary font-bold text-sm rounded-xl w-full shadow-sm bg-base-100 disabled:opacity-50"
                value={filter.idKelas}
                disabled={loading || !filter.idSekolah}
                onChange={(e) =>
                  setFilter({ ...filter, idKelas: e.target.value })
                }
              >
                <option value="">Pilih Kelas...</option>
                {availableClasses.map((k) => (
                  <option key={k.idKelas} value={k.idKelas}>
                    {k.namaKelas}
                  </option>
                ))}
              </select>
            </div>

            <div className="flex flex-col gap-1.5">
              <label className="text-[10px] font-black text-base-content/50 uppercase tracking-widest ml-1">
                Bulan Laporan
              </label>
              <input
                type="month"
                className="input input-bordered border-2 border-base-300 focus:border-primary font-bold text-sm rounded-xl w-full shadow-sm bg-base-100"
                disabled={loading}
                value={selectedMonth}
                onChange={handleMonthChange}
              />
            </div>
          </div>

          <div className="shrink-0">
            <CustomButton
              type="primary"
              className="h-12 px-8 shadow-md shadow-primary/20 rounded-xl font-black tracking-wide w-full sm:w-auto"
              onClick={handleFetchData}
              loading={loading}
            >
              <FaSearch className="text-xs" /> TAMPILKAN
            </CustomButton>
          </div>
        </div>
      </div>

      {/* Dual View Controller with Grid Layout Container */}
      <div className="flex flex-col gap-6 bg-base-100 border-2 border-base-200 rounded-[2.5rem] shadow-lg shadow-base-200 overflow-hidden">
        {/* Subheader Navigation */}
        <div className="px-6 py-6 border-b-2 border-base-200 bg-gradient-to-b from-base-200/30 to-transparent flex flex-col sm:flex-row justify-between gap-4 sm:items-center">
          <div className="flex items-center gap-3">
            <div className="w-12 h-12 rounded-xl bg-info/10 text-info flex items-center justify-center text-lg shadow-inner border border-info/20">
              <FaCalendarCheck />
            </div>
            <div>
              <p className="text-sm font-black text-base-content">
                Matriks Perkembangan
              </p>
              <p className="text-[10px] font-bold text-base-content/40 uppercase">
                Data Teragregasi per Individu
              </p>
            </div>
          </div>

          <div className="bg-base-200/80 p-1.5 rounded-full flex gap-1 w-full sm:w-auto border border-base-300/50 shadow-inner">
            <button
              className={`flex-1 sm:flex-none px-5 py-2.5 rounded-full text-xs font-black flex items-center justify-center gap-2 transition-all duration-300 ${activeTab === "mingguan" ? "bg-white text-primary shadow-md border border-base-100" : "text-base-content/50 hover:text-base-content/80"}`}
              onClick={() => !loading && setActiveTab("mingguan")}
            >
              <FaChartBar className="text-xs" /> Skor Mingguan
            </button>
            <button
              className={`flex-1 sm:flex-none px-5 py-2.5 rounded-full text-xs font-black flex items-center justify-center gap-2 transition-all duration-300 ${activeTab === "capaian" ? "bg-white text-primary shadow-md border border-base-100" : "text-base-content/50 hover:text-base-content/80"}`}
              onClick={() => !loading && setActiveTab("capaian")}
            >
              <FaCheckCircle className="text-xs" /> Capaian Akhir
            </button>
          </div>
        </div>
      </div>

      {/* 🌟 NEW PREMIUM EXPANDABLE LIST DESIGN 🌟 */}
      <div className="p-6 space-y-4 bg-base-200/30">
        {loading ? (
          <div className="flex flex-col items-center justify-center py-32 bg-base-100 rounded-[2rem] border-2 border-dashed border-base-300">
            <div className="relative">
              <span className="loading loading-ring loading-lg text-primary scale-150"></span>
              <span className="absolute inset-0 loading loading-infinity text-primary"></span>
            </div>
            <p className="mt-6 text-sm font-black text-base-content/40 uppercase tracking-[0.2em] animate-pulse">
              Menganalisa Algoritma Data...
            </p>
          </div>
        ) : (activeTab === "mingguan" ? dataMingguan : dataCapaian).length >
          0 ? (
          (activeTab === "mingguan" ? dataMingguan : dataCapaian).map(
            (siswa, idx) => {
              const isOpen = expandedId === siswa.nisn;
              const totalAvgScore =
                activeTab === "mingguan"
                  ? Object.values(siswa.rekap).reduce(
                      (acc, val) =>
                        acc +
                        (parseFloat(val.w1 || 0) +
                          parseFloat(val.w2 || 0) +
                          parseFloat(val.w3 || 0) +
                          parseFloat(val.w4 || 0)) /
                          4,
                      0,
                    ) / 7
                  : 0;

              return (
                <motion.div
                  key={siswa.nisn}
                  initial={{ opacity: 0, y: 15 }}
                  animate={{ opacity: 1, y: 0 }}
                  transition={{ delay: idx * 0.03 }}
                  className={`bg-base-100 rounded-[2rem] border-2 shadow-sm overflow-hidden transition-all duration-300 hover:shadow-md ${isOpen ? "border-primary ring-4 ring-primary/5 shadow-lg shadow-primary/5" : "border-base-200"}`}
                >
                  {/* 🟢 COLLAPSED HEADER BLOCK */}
                  <div
                    className="p-4 sm:p-5 flex flex-col sm:flex-row items-center gap-4 cursor-pointer select-none"
                    onClick={() => setExpandedId(isOpen ? null : siswa.nisn)}
                  >
                    {/* Profile Identity */}
                    <div className="flex items-center gap-4 flex-1 w-full">
                      <div
                        className={`w-12 sm:w-14 h-12 sm:h-14 rounded-2xl flex items-center justify-center text-xl font-black shadow-inner border transition-all duration-500 ${isOpen ? "bg-primary text-white rotate-6 scale-105 border-primary/20" : "bg-base-200 text-base-content border-base-300"}`}
                      >
                        {siswa.namaSiswa?.charAt(0)}
                      </div>
                      <div className="flex-1 min-w-0">
                        <h3
                          className={`text-base sm:text-lg font-black uppercase tracking-tight truncate transition-colors ${isOpen ? "text-primary" : "text-base-content"}`}
                        >
                          {siswa.namaSiswa}
                        </h3>
                        <div className="flex items-center gap-3 mt-0.5">
                          <span className="text-[10px] font-mono font-bold bg-base-200 text-base-content/60 px-2 py-0.5 rounded-md flex items-center gap-1">
                            <FaRegAddressCard className="text-[9px]" />{" "}
                            {siswa.nisn}
                          </span>
                        </div>
                      </div>
                    </div>

                    {/* Quick Glance Stats (Compact Summary) */}
                    {!isOpen && (
                      <motion.div
                        initial={{ opacity: 0 }}
                        animate={{ opacity: 1 }}
                        className="hidden lg:flex items-center gap-2 shrink-0 pr-4"
                      >
                        {categories.map((cat) => {
                          const val =
                            activeTab === "mingguan"
                              ? (parseFloat(siswa.rekap[cat.key].w1 || 0) +
                                  parseFloat(siswa.rekap[cat.key].w4 || 0)) /
                                2
                              : parseFloat(siswa.capaian[cat.key].total || 0);

                          return (
                            <div
                              key={cat.key}
                              title={cat.label}
                              className={`w-2.5 h-8 rounded-full ${activeTab === "mingguan" ? (val >= 3.5 ? "bg-success" : val >= 2.5 ? "bg-info" : val >= 1.5 ? "bg-warning" : val > 0 ? "bg-error" : "bg-base-300") : "bg-primary/20"} opacity-80 hover:opacity-100 transition-all hover:scale-y-110`}
                            />
                          );
                        })}
                      </motion.div>
                    )}

                    {/* Actions Bar */}
                    <div className="flex items-center gap-4 w-full sm:w-auto shrink-0">
                      {activeTab === "mingguan" && (
                        <div
                          className={`badge px-4 py-3.5 border-none font-black text-[10px] tracking-widest flex items-center gap-1.5 rounded-full shadow-inner ${totalAvgScore >= 3.5 ? "bg-success/10 text-success" : totalAvgScore >= 2 ? "bg-info/10 text-info" : "bg-base-200 text-base-content/40"}`}
                        >
                          <FaStar className="text-[9px]" /> AVG{" "}
                          {totalAvgScore.toFixed(1)}
                        </div>
                      )}

                      <button
                        className={`w-10 h-10 rounded-full border-2 flex items-center justify-center text-xs transition-all duration-300 ${isOpen ? "bg-primary text-white border-primary rotate-180 shadow-lg shadow-primary/20" : "bg-base-100 text-base-content/40 border-base-200"}`}
                      >
                        <FaChevronDown />
                      </button>
                    </div>
                  </div>

                  {/* 🔴 EXPANDED CONTENT BLOCK */}
                  <AnimatePresence>
                    {isOpen && (
                      <motion.div
                        initial={{ height: 0, opacity: 0 }}
                        animate={{ height: "auto", opacity: 1 }}
                        exit={{ height: 0, opacity: 0 }}
                        transition={{ duration: 0.3, ease: "easeInOut" }}
                        className="border-t-2 border-base-200 bg-gradient-to-b from-base-200/30 to-transparent overflow-hidden"
                      >
                        <div className="p-6 space-y-6">
                          {/* Dash Title Inside */}
                          <div className="flex justify-between items-center pb-2 border-b border-base-300/50 border-dashed">
                            <p className="text-xs font-black text-base-content/50 uppercase tracking-widest flex items-center gap-2">
                              <FaChartBar className="text-primary" />{" "}
                              {activeTab === "mingguan"
                                ? "Rincian Skor Mingguan"
                                : "Matriks Ketercapaian Akhir"}
                            </p>
                            <CustomButton
                              type="ghost"
                              className="btn-xs normal-case bg-white rounded-full shadow-sm border-2 font-black text-primary"
                              onClick={(e) => {
                                e.stopPropagation();
                                handleShowDetail(siswa);
                              }}
                            >
                              <FaRegImage className="text-xs" /> Lampiran
                              Dokumentasi
                            </CustomButton>
                          </div>

                          {/* Interactive Metric Grid */}
                          <div className="grid grid-cols-1 md:grid-cols-2 xl:grid-cols-3 gap-4">
                            {categories.map((cat) => {
                              if (activeTab === "mingguan") {
                                const weeks = [
                                  { l: "W1", v: siswa.rekap[cat.key].w1 },
                                  { l: "W2", v: siswa.rekap[cat.key].w2 },
                                  { l: "W3", v: siswa.rekap[cat.key].w3 },
                                  { l: "W4", v: siswa.rekap[cat.key].w4 },
                                ];
                                return (
                                  <div
                                    key={cat.key}
                                    className="bg-white p-4 rounded-2xl border border-base-300/70 shadow-sm hover:shadow-md transition-shadow flex flex-col"
                                  >
                                    <span className="text-[11px] font-black text-base-content/80 uppercase tracking-wider mb-3 flex items-center gap-2">
                                      <span className="w-1.5 h-1.5 rounded-full bg-primary" />{" "}
                                      {cat.label}
                                    </span>
                                    <div className="grid grid-cols-4 gap-2 items-end flex-1">
                                      {weeks.map((w, wi) => (
                                        <div
                                          key={wi}
                                          className="flex flex-col items-center group cursor-help relative"
                                        >
                                          <div className="w-full bg-base-200 rounded-lg h-16 relative overflow-hidden shadow-inner">
                                            <motion.div
                                              initial={{ height: 0 }}
                                              animate={{
                                                height: `${(parseFloat(w.v || 0) / 4) * 100}%`,
                                              }}
                                              transition={{
                                                delay: 0.2 + wi * 0.1,
                                                duration: 0.8,
                                                type: "spring",
                                              }}
                                              className={`absolute bottom-0 w-full transition-colors rounded-t-md ${w.v >= 3.5 ? "bg-success" : w.v >= 2.5 ? "bg-info" : w.v >= 1.5 ? "bg-warning" : "bg-error"}`}
                                            />
                                          </div>
                                          <span className="text-[9px] font-black text-base-content/40 mt-1.5">
                                            {w.l}
                                          </span>
                                          <span
                                            className={`absolute -top-6 bg-base-content text-white text-[9px] font-black px-1.5 py-0.5 rounded opacity-0 group-hover:opacity-100 transition-opacity pointer-events-none`}
                                          >
                                            {w.v || 0}
                                          </span>
                                        </div>
                                      ))}
                                    </div>
                                  </div>
                                );
                              } else {
                                // CAPAIAN MODE
                                const cap = siswa.capaian[cat.key];
                                return (
                                  <div
                                    key={cat.key}
                                    className="bg-white p-4 rounded-2xl border border-base-300/70 shadow-sm flex items-center justify-between hover:border-primary/30 transition-colors"
                                  >
                                    <div>
                                      <p className="text-[11px] font-black text-base-content/50 uppercase tracking-wider mb-0.5">
                                        {cat.label}
                                      </p>
                                      <p className="text-xl font-black font-mono text-base-content">
                                        {cap.total}{" "}
                                        <span className="text-[10px] text-base-content/30 font-sans uppercase">
                                          Poin
                                        </span>
                                      </p>
                                    </div>
                                    <div
                                      className={`px-3 py-1.5 border-2 rounded-xl text-[10px] font-black uppercase tracking-wider ${getStatusBadge(cap.keterangan)}`}
                                    >
                                      {cap.keterangan === "Terbiasa"
                                        ? "⭐ "
                                        : "🔥 "}
                                      {cap.keterangan}
                                    </div>
                                  </div>
                                );
                              }
                            })}
                          </div>
                        </div>
                      </motion.div>
                    )}
                  </AnimatePresence>
                </motion.div>
              );
            },
          )
        ) : (
          <div className="flex flex-col items-center py-24 bg-base-100 rounded-[3rem] border-2 border-dashed border-base-200 opacity-60">
            <div className="text-5xl mb-4">🔎</div>
            <h3 className="text-lg font-black text-base-content">
              Belum Ada Hasil Pencarian
            </h3>
            <p className="text-sm text-base-content/50 font-bold mt-1">
              Silakan pilih Sekolah dan Kelas pada filter di atas.
            </p>
          </div>
        )}
      </div>

      {/* Visual Proof Attachment Modal */}
      <CustomModal
        isOpen={isModalOpen}
        onClose={() => {
          setDetailJurnal([]);
          setIsModalOpen(false);
        }}
        title={`Rincian Jurnal Harian 📸`}
        confirmText="Selesai Memantau"
        onConfirm={() => setIsModalOpen(false)}
        isLoading={loadingDetail}
        type="primary"
        hiddenCancel={true}
      >
        <div className="flex items-center gap-3 mb-4 p-4 bg-base-200/50 rounded-2xl border border-base-200 shadow-inner">
          <div className="w-10 h-10 rounded-full bg-primary text-white flex items-center justify-center text-lg font-black">
            {selectedSiswa?.namaSiswa?.charAt(0)}
          </div>
          <div>
            <p className="text-sm font-black text-base-content uppercase tracking-wide">
              {selectedSiswa?.namaSiswa}
            </p>
            <p className="text-[10px] text-base-content/50 font-bold uppercase">
              Visual Audit Lampiran {selectedMonth}
            </p>
          </div>
        </div>

        <div className="space-y-6 max-h-[60vh] overflow-y-auto pr-2 no-scrollbar">
          {detailJurnal.length > 0
            ? detailJurnal.map((jurnal, idx) => (
                <div
                  key={idx}
                  className="border-2 border-base-200 bg-base-100 rounded-2xl p-4 shadow-sm last:border-b-2"
                >
                  <div className="flex justify-between items-center mb-4 pb-3 border-b border-base-200 border-dashed">
                    <div className="flex items-center gap-2 font-black text-xs text-primary">
                      <FaCalendarCheck className="text-base-content/30" />
                      {new Date(jurnal.tanggal).toLocaleDateString("id-ID", {
                        day: "numeric",
                        month: "long",
                        year: "numeric",
                      })}
                    </div>
                    <div className="badge bg-base-content text-base-100 font-black text-[9px] px-3 py-3 border-none tracking-widest">
                      POIN: {jurnal.totalPoin}
                    </div>
                  </div>

                  <div className="grid grid-cols-2 sm:grid-cols-3 md:grid-cols-4 gap-3">
                    {categories.map((cat) => {
                      const photoKey = photoKeyMap[cat.key];
                      const rawPhotoUrl = jurnal[photoKey];
                      const displayUrl = getRawDriveUrl(rawPhotoUrl);
                      const scoreMapping = {
                        bangunPagi: jurnal.bangunPagi,
                        berolahraga: jurnal.berolahraga,
                        nilaiIbadah: jurnal.ibadahValue,
                        nilaiMakan: jurnal.makanSehat,
                        nilaiBelajar: jurnal.gemarBelajar,
                        nilaiSosial: jurnal.bermasyarakat,
                        nilaiTidur: jurnal.tidurCepat,
                      };
                      const score = scoreMapping[cat.key];

                      return (
                        <div
                          key={cat.key}
                          className="flex flex-col items-center bg-base-200/50 p-2 rounded-xl border border-base-300/50 group transition-all hover:shadow-md relative overflow-hidden"
                        >
                          <span className="text-[8px] uppercase font-black opacity-60 mb-1 truncate w-full text-center tracking-tighter">
                            {cat.label}
                          </span>

                          <div className="absolute top-1 right-1 z-10 w-6 h-6 rounded-full bg-white border-2 border-base-300 shadow-sm flex items-center justify-center text-[10px] font-black font-mono">
                            <span className={getScoreClass(score)}>
                              {score !== undefined ? score : 0}
                            </span>
                          </div>

                          {typeof rawPhotoUrl === "string" &&
                          (rawPhotoUrl.startsWith("http") ||
                            rawPhotoUrl.startsWith("data:image")) ? (
                            <div className="relative w-full aspect-square overflow-hidden rounded-lg border-2 border-white shadow-sm">
                              <img
                                src={displayUrl}
                                alt={cat.label}
                                className="w-full h-full object-cover cursor-zoom-in group-hover:scale-110 hover:brightness-90 transition duration-500 bg-base-300"
                                onClick={() => {
                                  const idMatch =
                                    rawPhotoUrl?.match(/[?&]id=([-\w]{25,})/);
                                  const viewUrl = idMatch
                                    ? `https://drive.google.com/file/d/${idMatch[1]}/view`
                                    : rawPhotoUrl;
                                  window.open(viewUrl, "_blank");
                                }}
                                onError={(e) => {
                                  e.target.src =
                                    "https://placehold.co/200x200?text=Eror+Memuat";
                                }}
                              />
                            </div>
                          ) : (
                            <div className="w-full aspect-square bg-base-300/50 rounded-lg flex items-center justify-center text-[8px] text-base-content/30 font-bold italic text-center px-2 leading-tight uppercase border border-dashed border-base-300">
                              Nihil Foto
                            </div>
                          )}
                        </div>
                      );
                    })}
                  </div>
                </div>
              ))
            : !loadingDetail && (
                <div className="text-center py-16 bg-base-200/30 rounded-3xl border-2 border-dashed border-base-200 flex flex-col items-center opacity-50 gap-2">
                  <div className="text-3xl">📭</div>
                  <p className="text-xs font-black tracking-widest uppercase">
                    Log harian tidak tersedia.
                  </p>
                </div>
              )}
        </div>
      </CustomModal>
    </div>
  );
}
