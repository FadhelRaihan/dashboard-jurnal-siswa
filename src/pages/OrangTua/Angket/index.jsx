import React, { useState, useMemo, useEffect } from "react";
import { Link } from "react-router-dom";
import { FaArrowLeft, FaCheckCircle, FaCheckDouble, FaExclamationTriangle, FaSave, FaTimes, FaLightbulb } from "react-icons/fa";
import CustomButton from "../../../components/atoms/CustomButton";
import panduanAngketOrangTuaImg from "../../../assets/panduan-angket-orangtua.png";
// eslint-disable-next-line no-unused-vars
import { motion, AnimatePresence } from "framer-motion";
import { angketOrangTuaService } from "../../../services";
import CustomModal from "../../../components/organism/CustomModal";

const PERNYATAAN_LIST = [
  // Bagian 1: Pernyataan Perilaku / IM-7K (1-7)
  { id: 1, text: "Saya selalu membangunkan anak saya setiap pagi." },
  { id: 2, text: "Saya selalu mengingatkan anak saya untuk melaksanakan ibadah tepat waktu setiap hari." },
  { id: 3, text: "Saya selalu mengajak atau mengingatkan anak saya berolahraga." },
  { id: 4, text: "Saya selalu membiasakan anak saya mengonsumsi makanan sehat dan bergizi." },
  { id: 5, text: "Saya selalu mengingatkan anak saya belajar di rumah." },
  { id: 6, text: "Saya selalu membiasakan anak saya membantu di rumah atau membantu temannya." },
  { id: 7, text: "Saya selalu membiasakan anak saya tidur lebih awal pada malam hari." },

  // Bagian 2: Pernyataan Persepsi Diri / SDE-7K (8-14)
  { id: 8, text: "Saya merasa anak saya selalu mengikuti aturan di rumah." },
  { id: 9, text: "Saya merasa anak saya selalu benar saat belajar di rumah." },
  { id: 10, text: "Saya merasa anak saya belajar setiap hari di rumah." },
  { id: 11, text: "Saya merasa anak saya selalu berkata jujur kepada orang lain." },
  { id: 12, text: "Saya merasa anak saya selalu membantu dan peduli kepada temannya." },
  { id: 13, text: "Saya merasa kebiasaan tidur anak saya lebih baik dibandingkan anak seusianya." },
  { id: 14, text: "Saya merasa kebiasaan anak saya di rumah sudah baik." },

  // Bagian 3: Pernyataan Kepatuhan Umum / ACQ (15-20)
  { id: 15, text: "Anak saya selalu langsung menuruti semua aturan di rumah tanpa bertanya alasannya." },
  { id: 16, text: "Anak saya selalu mengikuti semua perkataan gurunya meskipun memiliki keinginan sendiri." },
  { id: 17, text: "Anak saya sering ikut-ikutan menyetujui ajakan temannya." },
  { id: 18, text: "Anak saya terbiasa cepat memilih jawaban \"setuju\" saat mengisi kuesioner." },
  { id: 19, text: "Anak saya suka meniru pilihan jawaban temannya saat mengisi tugas bersama." },
  { id: 20, text: "Anak saya sengaja memilih jawaban yang paling bagus." },

  // Bagian 4: Pernyataan Spesifik Per Indikator / ACQ (21-30)
  { id: 21, text: "Anak saya menerima aturan bangun pagi tanpa memahami manfaatnya." },
  { id: 22, text: "Anak saya beribadah karena sekadar mengikuti orang lain." },
  { id: 23, text: "Anak saya langsung ikut berolahraga saat diminta." },
  { id: 24, text: "Anak saya makan makanan sehat karena disuruh orang tua." },
  { id: 25, text: "Anak saya hanya mengiyakan bahwa belajar itu penting tanpa memahami manfaatnya." },
  { id: 26, text: "Anak saya mengerjakan tugas sekolah agar tidak dimarahi guru." },
  { id: 27, text: "Anak saya selalu menolong temannya tanpa memikirkan alasannya." },
  { id: 28, text: "Anak saya tidur lebih awal karena disuruh orang tua, bukan karena kesadarannya sendiri." },
  { id: 29, text: "Anak saya cenderung memilih jawaban \"setuju\" karena tahu itu jawaban yang ingin didengar guru atau orang tua." },
  { id: 30, text: "Anak saya mengikuti jawaban temannya saat mengisi jurnal 7 Kebiasaan." },
];

export default function AngketMingguanOrangTuaPage() {
  const [responses, setResponses] = useState({});
  const [loading, setLoading] = useState(false);
  const [checkingStatus, setCheckingStatus] = useState(true);
  const [alreadySubmitted, setAlreadySubmitted] = useState(false);
  const [showGuide, setShowGuide] = useState(true);
  const [currentWeekInfo, setCurrentWeekInfo] = useState({ week: 1, month: "", year: 2026 });

  const [modalConfig, setModalConfig] = useState({
    isOpen: false,
    title: "",
    message: "",
    type: "primary",
    confirmText: "Simpan",
    onConfirm: () => { },
    showCancel: true
  });

  const userProfile = JSON.parse(localStorage.getItem('user') || '{}');

  // Helper to get current week index 1-4
  const getWeekFromDate = (date) => {
    const day = date.getDate();
    if (day <= 7) return 1;
    if (day <= 14) return 2;
    if (day <= 21) return 3;
    return 4;
  };

  const getIndonesianMonthName = (monthIndex) => {
    const months = [
      "Januari", "Februari", "Maret", "April", "Mei", "Juni",
      "Juli", "Agustus", "September", "Oktober", "November", "Desember"
    ];
    return months[monthIndex];
  };

  useEffect(() => {
    const checkWeeklyStatus = async () => {
      const validNisn = userProfile.nisn || userProfile.NISN;
      if (!validNisn) {
        setCheckingStatus(false);
        return;
      }

      const now = new Date();
      const curWeek = getWeekFromDate(now);
      const curMonth = now.getMonth();
      const curYear = now.getFullYear();

      setCurrentWeekInfo({
        week: curWeek,
        month: getIndonesianMonthName(curMonth),
        year: curYear
      });

      try {
        // Tarik log penuh dan lakukan saringan client-side
        const res = await angketOrangTuaService.getHistory({ limit: 1000 });
        if (res && res.status && res.data && Array.isArray(res.data.items)) {
          const existing = res.data.items.find((item) => {
            const matchNisn = String(item.nisn) === String(validNisn);
            if (!item.waktu_simpan) return false;

            const itemDate = new Date(item.waktu_simpan);
            const itemWeek = getWeekFromDate(itemDate);
            const itemMonth = itemDate.getMonth();
            const itemYear = itemDate.getFullYear();

            // Blokir jika sudah diisi di minggu, bulan, dan tahun yang sama
            return matchNisn && itemWeek === curWeek && itemMonth === curMonth && itemYear === curYear;
          });

          if (existing) {
            setAlreadySubmitted(true);
          }
        }
      } catch (err) {
        console.error("Gagal memeriksa riwayat angket orang tua:", err);
      } finally {
        setCheckingStatus(false);
      }
    };

    checkWeeklyStatus();
  }, []);

  const handleRadioChange = (id, value) => {
    setResponses((prev) => ({ ...prev, [id]: value }));
  };

  const progress = useMemo(() => {
    const answered = Object.keys(responses).length;
    return Math.round((answered / PERNYATAAN_LIST.length) * 100);
  }, [responses]);

  const closeModal = () => setModalConfig(prev => ({ ...prev, isOpen: false }));

  const handleSaveClick = () => {
    setModalConfig({
      isOpen: true,
      title: "Simpan Observasi? 👨‍👩‍👧",
      type: "secondary",
      confirmText: "Ya, Simpan",
      cancelText: "Batal",
      onConfirm: executeSubmit,
      showCancel: true,
      message: (
        <div className="text-center py-1">
          <p className="font-black text-lg leading-snug mb-2">Lanjutkan Menyimpan?</p>
          <p className="text-sm font-bold text-base-content/60">Hasil pemantauan Anda sangat berharga bagi perkembangan karakter anak tercinta.</p>
        </div>
      )
    });
  };

  const executeSubmit = async () => {
    setLoading(true);
    const formattedResponses = {};
    Object.keys(responses).forEach((key) => { formattedResponses[`p${key}`] = responses[key]; });

    const payload = {
      idSekolah: userProfile.idSekolah,
      idKelas: userProfile.idKelas,
      nisn: userProfile.nisn,
      namaSiswa: userProfile.nama,
      ...formattedResponses
    };

    try {
      const result = await angketOrangTuaService.submit(payload);
      if (result.success) {
        setModalConfig({
          isOpen: true,
          title: "Berhasil! 🎉",
          type: "success",
          confirmText: "Selesai",
          onConfirm: () => {
            closeModal();
            setAlreadySubmitted(true);
          },
          showCancel: false,
          message: (
            <div className="text-center flex flex-col items-center py-2">
              <div className="w-16 h-16 bg-success/10 text-success rounded-full flex items-center justify-center text-3xl mb-4 shadow-inner animate-bounce">
                <FaCheckDouble />
              </div>
              <p className="font-black text-xl leading-tight text-base-content mb-1">Observasi Disimpan!</p>
              <p className="text-sm font-bold text-base-content/60 leading-relaxed">
                Terima kasih Ayah/Bunda telah meluangkan waktu memantau perkembangan ananda secara berkala. 💙
              </p>
            </div>
          )
        });
      } else {
        throw new Error(result.message);
      }
    } catch (err) {
      setModalConfig({
        isOpen: true,
        title: "Gagal Menyimpan 😅",
        type: "error",
        confirmText: "Tutup",
        onConfirm: closeModal,
        showCancel: false,
        message: (
          <div className="text-center flex flex-col items-center py-2">
            <FaExclamationTriangle className="text-4xl text-error mb-2" />
            <p className="font-bold text-base-content">{err.message || "Terdapat kendala koneksi server."}</p>
          </div>
        )
      });
    } finally {
      setLoading(false);
    }
  };

  const getVisualConfig = (val) => {
    const map = {
      1: { emoji: "❌", label: "Tidak Pernah", class: "peer-checked:bg-error peer-checked:text-white" },
      2: { emoji: "👎", label: "Jarang", class: "peer-checked:bg-warning peer-checked:text-white" },
      3: { emoji: "🤝", label: "Kadang-Kadang", class: "peer-checked:bg-neutral peer-checked:text-white" },
      4: { emoji: "👍", label: "Sering", class: "peer-checked:bg-secondary peer-checked:text-white" },
      5: { emoji: "✅", label: "Selalu", class: "peer-checked:bg-success peer-checked:text-white" },
    };
    return map[val] || {};
  };

  return (
    <div className="flex flex-col gap-6 pt-2 pb-32 px-1">
      <CustomModal
        isOpen={modalConfig.isOpen}
        onClose={!loading ? closeModal : null}
        onConfirm={modalConfig.onConfirm}
        title={modalConfig.title}
        type={modalConfig.type}
        confirmText={modalConfig.confirmText}
        cancelText={modalConfig.cancelText}
        isLoading={loading}
      >
        {modalConfig.message}
      </CustomModal>

      {checkingStatus ? (
        <div className="flex flex-col items-center justify-center min-h-[50vh] gap-3 animate-in fade-in duration-300 mt-10">
          <span className="loading loading-spinner loading-lg text-secondary scale-125"></span>
          <span className="text-xs font-black text-base-content/40 uppercase tracking-widest animate-pulse">Memeriksa Riwayat Observasi...</span>
        </div>
      ) : alreadySubmitted ? (
        <div className="flex flex-col gap-6 animate-in fade-in slide-in-from-bottom-6 duration-500 mt-4 px-1">
          <div className="flex flex-col">
            <div className="flex items-center gap-2 text-secondary font-black text-sm uppercase mb-2 tracking-widest">
              <span className="w-6 h-0.5 bg-secondary rounded-full" />
              Laporan Terkirim
            </div>
            <h1 className="text-2xl font-black text-base-content leading-tight">
              🔍 Observasi Wali Murid
            </h1>
          </div>

          <div className="bg-base-100 border border-base-300/60 shadow-xl rounded-[2.5rem] p-8 flex flex-col items-center text-center relative overflow-hidden mt-2 hover:shadow-2xl transition-shadow duration-300">
            <div className="absolute top-0 left-0 w-full h-2 bg-gradient-to-r from-secondary to-purple-400"></div>

            <div className="w-24 h-24 rounded-full bg-secondary/10 text-secondary flex items-center justify-center text-5xl shadow-inner border-4 border-secondary/5 mt-2">
              👨‍👩‍👧
            </div>

            <div className="mt-6 space-y-2">
              <h2 className="text-2xl font-black text-base-content tracking-tight leading-tight">Terima Kasih Ayah / Bunda!</h2>
              <p className="text-sm font-bold text-base-content/50 max-w-xs mx-auto leading-relaxed">
                Anda sudah berhasil mengisi jurnal observasi ananda untuk periode <span className="text-base-content/80 font-black">Minggu Ke-{currentWeekInfo.week} {currentWeekInfo.month} {currentWeekInfo.year}</span>.
              </p>
            </div>

            <div className="bg-secondary/5 border-2 border-secondary/10 rounded-3xl p-6 w-full mt-8 flex items-center justify-between gap-4 shadow-inner">
              <div className="text-left">
                <span className="text-[10px] font-black text-base-content/40 uppercase tracking-widest leading-none block mb-1">Status Input</span>
                <div className="text-2xl font-black text-secondary leading-none flex items-baseline gap-1">
                  Sudah Masuk
                </div>
              </div>
              <span className="badge badge-secondary font-black px-3 py-5 text-[10px] rounded-xl border-none tracking-wide shadow-sm shadow-secondary/20">1x SEMINGGU</span>
            </div>

            <p className="text-xs font-bold text-base-content/40 mt-6">
              Dukungan & pemantauan Ayah/Bunda sangat berharga bagi perkembangan karakter terbaik ananda. ✨
            </p>

            <div className="mt-6 w-full">
              <Link
                to="/orang-tua/teori"
                className="btn btn-secondary h-14 px-8 w-full font-black text-xs rounded-2xl shadow-xl shadow-secondary/20 flex items-center justify-center gap-2 hover:scale-[1.02] transition-all active:scale-95 border-none text-white uppercase tracking-wider"
              >
                BACA MATERI PENDUKUNG
              </Link>
            </div>
          </div>
        </div>
      ) : (
        <>
          {/* Page Header */}
          <div className="flex flex-col">
            <div className="flex items-center justify-between mb-2">
              <div className="flex items-center gap-2 text-secondary font-black text-sm uppercase tracking-widest">
                <span className="w-6 h-0.5 bg-secondary rounded-full" />
                Pemantauan Mingguan
              </div>
              <button
                type="button"
                onClick={() => setShowGuide(true)}
                className="btn btn-circle btn-xs bg-yellow-400 hover:bg-yellow-500 text-yellow-950 border-none shadow-sm flex items-center justify-center hover:scale-110 active:scale-95 transition-transform"
                title="Lihat Panduan Observasi"
              >
                <FaLightbulb className="text-[10px] animate-pulse" />
              </button>
            </div>
            <h1 className="text-2xl font-black text-base-content leading-tight">
              Jurnal Observasi Wali Murid 🔍
            </h1>
            <p className="text-xs font-bold text-base-content/50 leading-relaxed mt-1">Mohon isi kondisi riil yang Ayah/Bunda amati pada ananda.</p>
          </div>

          {/* Persistent Sticky Header Tracker */}
          <div className="sticky top-2 z-[30] transition-all duration-300">
            <div className="card bg-white/90 backdrop-blur-md shadow-glow shadow-secondary/20 border border-secondary/20 rounded-2xl p-3">
              <div className="flex justify-between items-center mb-2">
                <div className="flex items-center gap-2">
                  <div className={`w-8 h-8 rounded-full flex items-center justify-center text-white shadow-sm transition-colors duration-500 ${progress === 100 ? 'bg-success' : 'bg-secondary'}`}>
                    {progress === 100 ? <FaCheckCircle /> : <span className="text-xs font-black">{Object.keys(responses).length}</span>}
                  </div>
                  <div className="flex flex-col">
                    <span className="text-[10px] font-black text-base-content/40 uppercase leading-none">Progress</span>
                    <span className="text-sm font-black text-base-content leading-tight">Input Selesai</span>
                  </div>
                </div>
                <div className="text-right font-black text-2xl text-secondary leading-none font-mono tracking-tighter flex items-baseline">
                  {progress}<span className="text-xs opacity-50">%</span>
                </div>
              </div>

              <div className="relative w-full bg-base-300 rounded-full h-3 overflow-hidden p-[1px]">
                <motion.div
                  className="h-full rounded-full bg-gradient-to-r from-secondary to-secondary/80 shadow-sm shadow-secondary/30"
                  initial={{ width: 0 }}
                  animate={{ width: `${progress}%` }}
                  transition={{ type: "spring", stiffness: 40 }}
                />
              </div>
            </div>
          </div>

          {/* List Containers */}
          <div className="flex flex-col gap-4">
            {PERNYATAAN_LIST.map((item, index) => {
              const isAnswered = !!responses[item.id];
              const currentSection = (index === 0 && "📋 Bagian 1: Perilaku Keseharian (IM)") ||
                (index === 7 && "📊 Bagian 2: Persepsi Kondisi Diri (SDE)") ||
                (index === 14 && "💡 Bagian 3: Pola Pikir Anak (ACQ)") ||
                (index === 20 && "🔗 Bagian 4: Kepatuhan & Respons (ACQ)");

              return (
                <React.Fragment key={item.id}>
                  {currentSection && (
                    <div className="mt-4 mb-1 px-1 flex items-center gap-2">
                      <h3 className="text-sm font-black tracking-wide text-base-content/70 uppercase">{currentSection}</h3>
                      <div className="flex-1 h-[1px] bg-base-300" />
                    </div>
                  )}

                  <motion.div
                    initial={{ opacity: 0, y: 10 }}
                    whileInView={{ opacity: 1, y: 0 }}
                    viewport={{ once: true, margin: "-20px" }}
                    className={`card bg-base-100 border-2 transition-all duration-300 rounded-3xl overflow-hidden
                      ${isAnswered ? 'border-secondary/30 shadow-md shadow-secondary/5 bg-gradient-to-br from-white to-secondary/5' : 'border-base-300/60 shadow-sm'}
                    `}
                  >
                    <div className="p-5 flex flex-col gap-4">
                      <div className="flex gap-3">
                        <div className={`w-7 h-7 rounded-xl flex-shrink-0 flex items-center justify-center text-xs font-black transition-colors shadow-sm
                            ${isAnswered ? 'bg-secondary text-white' : 'bg-base-200 text-base-content/40'}
                          `}>
                          {item.id}
                        </div>
                        <p className="text-sm font-bold leading-snug text-base-content/80">
                          {item.text}
                        </p>
                      </div>

                      <div className="pt-2 border-t border-base-200 border-dashed">
                        <div className="grid grid-cols-5 gap-2 relative">
                          {[1, 2, 3, 4, 5].map(val => {
                            const config = getVisualConfig(val);
                            return (
                              <label key={val} className="flex flex-col items-center group cursor-pointer">
                                <input
                                  type="radio"
                                  name={`ans-${item.id}`}
                                  checked={responses[item.id] === val}
                                  onChange={() => handleRadioChange(item.id, val)}
                                  className="peer sr-only"
                                />
                                <div className={`w-full aspect-square flex flex-col items-center justify-center rounded-2xl border-2 border-base-300 bg-base-100 text-base-content/40 font-black transition-all duration-300 active:scale-90 hover:border-secondary/40 hover:bg-base-200/50 ${config.class}`}>
                                  <span className="text-xl leading-none group-hover:scale-110 transition-transform">{config.emoji}</span>
                                  <span className="text-[9px] mt-0.5">{val}</span>
                                </div>
                              </label>
                            )
                          })}
                        </div>

                        <div className="h-5 mt-2 relative flex items-center justify-center">
                          <AnimatePresence mode="wait">
                            {isAnswered ? (
                              <motion.div
                                initial={{ opacity: 0, scale: 0.9 }}
                                animate={{ opacity: 1, scale: 1 }}
                                exit={{ opacity: 0, scale: 0.9 }}
                                className="text-[10px] font-black text-secondary uppercase tracking-widest px-3 py-1 bg-secondary/10 rounded-full flex items-center gap-1"
                              >
                                {getVisualConfig(responses[item.id]).label}
                              </motion.div>
                            ) : (
                              <span className="text-[9px] font-black text-base-content/30 uppercase tracking-widest">Belum Dipilih</span>
                            )}
                          </AnimatePresence>
                        </div>
                      </div>
                    </div>
                  </motion.div>
                </React.Fragment>
              )
            })}
          </div>

          {/* Fixed Persistent Bottom Block */}
          <div className="fixed bottom-[76px] left-1/2 -translate-x-1/2 w-full max-w-md px-4 z-30 pointer-events-none">
            <div className="pointer-events-auto bg-base-100 border border-base-300 p-3 rounded-2xl shadow-glow shadow-secondary/20 flex flex-col gap-2 animate-in slide-in-from-bottom-5 duration-300">
              {progress < 100 && (
                <div className="text-center text-[10px] font-black text-error tracking-wide animate-pulse flex items-center justify-center gap-1">
                  ✍️ Tersisa {PERNYATAAN_LIST.length - Object.keys(responses).length} poin lagi
                </div>
              )}

              <CustomButton
                type="secondary"
                onClick={handleSaveClick}
                disabled={progress < 100 || loading}
                className={`w-full py-4 font-black rounded-xl shadow-lg flex items-center justify-center gap-2 shadow-secondary/20 transition-all active:scale-95 ${progress < 100 ? 'grayscale contrast-50' : ''}`}
              >
                {loading ? (
                  <span className="loading loading-spinner loading-sm" />
                ) : (
                  <>
                    {progress === 100 ? <FaCheckCircle /> : <FaSave className="opacity-50" />}
                    {progress === 100 ? "SIMPAN OBSERVASI SEKARANG" : "LENGKAPI DULU"}
                  </>
                )}
              </CustomButton>
            </div>
          </div>
        </>
      )}

      {/* Modal Panduan Pengisian Orang Tua */}
      {showGuide && (
        <div className="fixed inset-0 z-[9999] flex items-center justify-center bg-base-300/60 backdrop-blur-md p-4 animate-in fade-in duration-300">
          <div className="bg-base-100 max-w-md w-full rounded-[2.5rem] border-2 border-secondary/20 shadow-2xl p-6 flex flex-col items-center relative overflow-hidden animate-in zoom-in-95 duration-200">
            <div className="absolute top-0 left-0 w-full h-2 bg-gradient-to-r from-secondary to-purple-400"></div>
            
            <button
              type="button"
              onClick={() => setShowGuide(false)}
              className="absolute top-4 right-4 bg-base-200 hover:bg-base-300 text-base-content/60 hover:text-base-content rounded-full w-8 h-8 flex items-center justify-center transition-colors cursor-pointer"
            >
              <FaTimes />
            </button>

            <div className="w-12 h-12 rounded-2xl bg-secondary/10 text-secondary flex items-center justify-center text-2xl shadow-inner mt-2 mb-4">
              💡
            </div>

            <h3 className="text-xl font-black text-base-content tracking-tight mb-2 text-center">
              Panduan Observasi Wali Murid
            </h3>
            
            <p className="text-xs font-bold text-base-content/50 text-center mb-5 max-w-xs leading-relaxed">
              Pelajari panduan di bawah ini untuk memudahkan Ayah/Bunda memantau dan mengisi jurnal kebiasaan ananda!
            </p>

            <div className="w-full rounded-2xl overflow-hidden border border-base-200 shadow-md mb-6 aspect-[4/3] bg-base-200 flex items-center justify-center">
              <img 
                src={panduanAngketOrangTuaImg} 
                alt="Panduan Observasi Orang Tua" 
                className="w-full h-full object-cover"
              />
            </div>

            <button
              type="button"
              onClick={() => setShowGuide(false)}
              className="btn btn-secondary h-12 px-8 w-full font-black text-xs rounded-2xl shadow-lg shadow-secondary/20 flex items-center justify-center gap-2 hover:scale-[1.02] transition-all active:scale-95 border-none text-white uppercase tracking-wider"
            >
              Saya Mengerti, Mulai Isi! 🚀
            </button>
          </div>
        </div>
      )}
    </div>
  );
}