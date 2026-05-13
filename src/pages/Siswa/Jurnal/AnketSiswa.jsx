import React, { useState, useMemo } from "react";
import { Link, useNavigate } from "react-router-dom";
import { FaArrowLeft, FaCheckCircle, FaCheckDouble, FaExclamationTriangle, FaSave, FaTrophy } from "react-icons/fa";
import CustomButton from "../../../components/atoms/CustomButton";
// eslint-disable-next-line no-unused-vars
import { motion, AnimatePresence } from "framer-motion";
import { angketSiswaService } from "../../../services";
import CustomModal from "../../../components/organism/CustomModal";

const PERNYATAAN_LIST = [
  // Bagian 1: Pernyataan Perilaku (1-6)
  { id: 1, text: "Saya selalu bangun pagi tanpa pernah terlambat ke sekolah." },
  { id: 2, text: "Saya selalu melaksanakan ibadah tepat waktu setiap hari." },
  { id: 3, text: "Saya selalu berolahraga atau aktif bergerak setiap hari tanpa pernah malas." },
  { id: 4, text: "Saya tidak pernah menunda mengerjakan tugas sekolah." },
  { id: 5, text: "Saya selalu membantu orang lain tanpa diminta." },
  { id: 6, text: "Saya selalu menjaga kebersihan diri dan lingkungan sekolah." },

  // Bagian 2: Pernyataan Persepsi Diri (7-12)
  { id: 7, text: "Saya yakin saya sudah menjadi anak yang sangat disiplin setiap hari." },
  { id: 8, text: "Saya merasa tidak pernah melakukan kesalahan dalam belajar." },
  { id: 9, text: "Saya merasa sudah cukup rajin meskipun jarang belajar di rumah." },
  { id: 10, text: "Saya percaya diri bahwa saya selalu bersikap jujur dalam semua situasi." },
  { id: 11, text: "Saya merasa sudah sangat peduli terhadap teman-teman saya." },
  { id: 12, text: "Saya merasa kebiasaan saya sudah sangat baik dibanding teman lain." },

  // Bagian 3: Pernyataan Kepatuhan (13-18)
  { id: 13, text: "Saya selalu setuju dengan semua aturan sekolah tanpa berpikir panjang." },
  { id: 14, text: "Saya selalu mengikuti apa yang dikatakan guru tanpa memikirkan pendapat saya." },
  { id: 15, text: "Saya selalu setuju dengan teman saya meskipun saya tidak yakin." },
  { id: 16, text: "Saya selalu menjawab \"setuju\" dalam setiap pernyataan tanpa berpikir lama." },
  { id: 17, text: "Saya cenderung mengikuti jawaban teman saat mengisi jurnal 7 Kebiasaan Anak Indonesia Hebat." },
  { id: 18, text: "Saya selalu memilih jawaban yang terlihat paling baik." },

  // Bagian 4: Pernyataan Spesifik (19-27)
  { id: 19, text: "Saya biasanya langsung setuju dengan aturan bangun pagi tanpa banyak berpikir." },
  { id: 20, text: "Saya cenderung mengikuti saja kegiatan ibadah yang dianjurkan tanpa bertanya atau berpikir lebih lanjut." },
  { id: 21, text: "Saya biasanya setuju saja jika diminta berolahraga tanpa memikirkan kondisi saya." },
  { id: 22, text: "Saya sering langsung setuju bahwa belajar itu penting tanpa memikirkan alasannya." },
  { id: 23, text: "Saya biasanya mengikuti saja aturan mengerjakan tugas tanpa memikirkan alasannya." },
  { id: 24, text: "Saya cenderung setuju saja ketika diminta membantu teman, tanpa memikirkan keadaan saya." },
  { id: 25, text: "Saya biasanya mengikuti saja aturan hidup bersih tanpa berpikir alasan pentingnya." },
  { id: 26, text: "Saya sering menjawab setuju karena merasa itu jawaban yang paling baik." },
  { id: 27, text: "Saya cenderung mengikuti jawaban teman saat menjawab pertanyaan tentang kebiasaan baik dalam jurnal 7 Kebiasaan Anak Indonesia Hebat." },
];

export default function AngketMingguanSiswaPage() {
  const navigate = useNavigate();
  const [responses, setResponses] = useState({});
  const [loading, setLoading] = useState(false);

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
      title: "Simpan Angket? 🤔",
      type: "primary",
      confirmText: "Ya, Sudah Jujur!",
      cancelText: "Periksa Lagi",
      onConfirm: executeSubmit,
      showCancel: true,
      message: (
        <div className="py-2 text-center">
            <p className="font-bold text-lg leading-snug">Apakah kamu sudah mengisi dengan jujur? ✨</p>
            <p className="text-sm font-medium opacity-70 mt-2">Jawabanmu akan membantumu menjadi pribadi yang lebih hebat lagi.</p>
        </div>
      )
    });
  };

  const executeSubmit = async () => {
    // 🛡️ MIDDLEWARE GUARD: VALIDASI IDENTITAS SEBELUM SUBMIT ANGKET
    const validNisn = userProfile.nisn || userProfile.NISN
    const validNama = userProfile.nama || userProfile.namaLengkap || userProfile.namaSiswa

    const isCorrupt = (val) => {
      if (!val) return true
      const strVal = String(val).toLowerCase().trim()
      return strVal === "" || strVal === "undefined" || strVal === "null"
    }

    if (isCorrupt(validNisn) || isCorrupt(validNama)) {
      setModalConfig({
        isOpen: true,
        title: "Sesi Kedaluwarsa! ⚠️",
        type: "error",
        confirmText: "Login Ulang",
        onConfirm: () => {
          setModalConfig((p) => ({ ...p, isOpen: false }))
          localStorage.clear()
          sessionStorage.clear()
          window.location.href = "/siswa/login"
        },
        showCancel: false,
        message: (
          <div className="text-center flex flex-col items-center py-3">
            <p className="font-bold text-base text-base-content leading-tight mb-1">Identitas Tidak Terbaca</p>
            <p className="text-xs text-base-content/60 max-w-xs leading-relaxed">
              Sistem mendeteksi nama atau NISN kamu kosong. Silakan Login kembali secara bersih untuk sinkronisasi akun.
            </p>
          </div>
        ),
      })
      return
    }

    setLoading(true);
    const formattedResponses = {};
    Object.keys(responses).forEach((key) => { formattedResponses[`p${key}`] = responses[key]; });

    const payload = {
      idSekolah: userProfile.idSekolah,
      idKelas: userProfile.idKelas,
      nisn: validNisn,
      namaSiswa: validNama,
      ...formattedResponses
    };

    try {
      const result = await angketSiswaService.submit(payload);
      if (result.success) {
        setModalConfig({
          isOpen: true,
          title: "Bagus Sekali! 🏆",
          type: "success",
          confirmText: "Lanjut",
          onConfirm: () => navigate("/siswa/jurnal"),
          showCancel: false,
          message: (
            <div className="text-center flex flex-col items-center gap-3 py-2">
              <div className="w-16 h-16 bg-success/10 rounded-full flex items-center justify-center text-3xl text-success">
                 <FaCheckDouble />
              </div>
              <div>
                 <p className="font-black text-lg">Angket Tersimpan!</p>
                 <p className="text-xs font-bold opacity-60">Keren! Terus semangat berbuat baik ya! 🚀</p>
              </div>
            </div>
          )
        });
      } else {
        throw new Error(result.message);
      }
    } catch (err) {
      setModalConfig({
        isOpen: true,
        title: "Ada Kendala 😅",
        type: "error",
        confirmText: "Tutup",
        onConfirm: closeModal,
        showCancel: false,
        message: (
          <div className="text-center">
            <FaExclamationTriangle className="text-4xl text-error mx-auto mb-3" />
            <p className="font-bold">{err.message || "Gagal tersambung server."}</p>
          </div>
        )
      });
    } finally {
      setLoading(false);
    }
  };

  const getVisualConfig = (val) => {
    const map = {
      1: { emoji: "😡", label: "Sangat Tidak Setuju", class: "peer-checked:bg-error peer-checked:text-white" },
      2: { emoji: "🙁", label: "Tidak Setuju", class: "peer-checked:bg-warning peer-checked:text-white" },
      3: { emoji: "😐", label: "Netral", class: "peer-checked:bg-neutral peer-checked:text-white" },
      4: { emoji: "🙂", label: "Setuju", class: "peer-checked:bg-info peer-checked:text-white" },
      5: { emoji: "😄", label: "Sangat Setuju", class: "peer-checked:bg-success peer-checked:text-white" },
    };
    return map[val] || {};
  };

  return (
    <div className="flex flex-col gap-6 pt-2 pb-32">
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

      {/* Subpage Header */}
      <div className="px-1">
          <div className="flex items-center gap-2 text-primary font-black text-sm uppercase mb-2 tracking-widest">
             <span className="w-6 h-0.5 bg-primary rounded-full" />
             Angket Mingguan
          </div>
          <h1 className="text-2xl font-black text-base-content leading-tight">
             Yuk Kenali Dirimu! 🧐
          </h1>
          <p className="text-xs font-bold text-base-content/50 leading-relaxed">Isi angket ini sesuai apa yang benar-benar kamu rasakan, ya!</p>
      </div>

      {/* Persistent Progress Stikler Bubble */}
      <div className="sticky top-2 z-[30] transition-all duration-300 px-1">
        <div className="card bg-white/90 backdrop-blur-md shadow-glow border border-primary/20 rounded-2xl overflow-hidden p-3">
          <div className="flex justify-between items-center mb-2">
             <div className="flex items-center gap-2">
                <div className={`w-8 h-8 rounded-full flex items-center justify-center text-white shadow-sm transition-colors duration-500 ${progress === 100 ? 'bg-success' : 'bg-primary'}`}>
                    {progress === 100 ? <FaCheckCircle className="animate-pulse" /> : <span className="text-xs font-black">{Object.keys(responses).length}</span>}
                </div>
                <div className="flex flex-col">
                   <span className="text-[10px] font-black text-base-content/40 uppercase leading-none">Progress</span>
                   <span className="text-sm font-black text-base-content leading-tight">Sudah Terisi</span>
                </div>
             </div>
             <div className="text-right font-black text-2xl text-primary font-mono leading-none flex items-baseline tracking-tighter">
                 {progress}<span className="text-xs opacity-50">%</span>
             </div>
          </div>
          
          <div className="relative w-full bg-base-300 rounded-full h-3 overflow-hidden p-[2px]">
             <motion.div 
                className="h-full rounded-full bg-gradient-to-r from-primary to-primary shadow-sm shadow-primary/30"
                initial={{ width: 0 }}
                animate={{ width: `${progress}%` }}
                transition={{ type: "spring", stiffness: 40, damping: 12 }}
             />
          </div>
        </div>
      </div>

      {/* List Forms */}
      <div className="flex flex-col gap-4">
        {PERNYATAAN_LIST.map((item, index) => {
          const isAnswered = !!responses[item.id];
          const currentSection = (index === 0 && "💡 Bagian 1: Perilakuku") || 
                                 (index === 6 && "👤 Bagian 2: Tentang Diriku") ||
                                 (index === 12 && "🧠 Bagian 3: Apa yang Kupikirkan") ||
                                 (index === 18 && "💫 Bagian 4: Kebiasaanku");

          return (
            <React.Fragment key={item.id}>
              {currentSection && (
                 <div className="mt-4 mb-1 px-1 flex items-center gap-2">
                    <h3 className="text-sm font-black tracking-wide text-base-content/70 uppercase">{currentSection}</h3>
                    <div className="flex-1 h-[1px] bg-base-300" />
                 </div>
              )}

              <motion.div
                initial={{ opacity: 0, y: 15 }}
                whileInView={{ opacity: 1, y: 0 }}
                viewport={{ once: true, margin: "-20px" }}
                className={`card bg-base-100 border-2 transition-all duration-300 rounded-3xl overflow-hidden
                  ${isAnswered ? 'border-primary/30 shadow-md shadow-primary/5 bg-gradient-to-br from-white to-primary/5' : 'border-base-300/60 shadow-sm'}
                `}
              >
                <div className="p-5 flex flex-col gap-4">
                   <div className="flex gap-3">
                      <div className={`w-7 h-7 rounded-xl flex-shrink-0 flex items-center justify-center text-xs font-black transition-colors shadow-sm
                        ${isAnswered ? 'bg-primary text-white' : 'bg-base-200 text-base-content/40'}
                      `}>
                        {item.id}
                      </div>
                      <p className="text-sm font-bold leading-snug text-base-content/80">
                        {item.text}
                      </p>
                   </div>

                   <div className="pt-2 border-t border-base-200 border-dashed">
                      <div className="grid grid-cols-5 gap-1.5 sm:gap-2 relative">
                         {/* Option Radio Items */}
                         {[1, 2, 3, 4, 5].map(val => {
                            const config = getVisualConfig(val);
                            return (
                               <label key={val} className="flex flex-col items-center group cursor-pointer relative">
                                  <input 
                                     type="radio" 
                                     name={`ans-${item.id}`}
                                     checked={responses[item.id] === val}
                                     onChange={() => handleRadioChange(item.id, val)}
                                     className="peer sr-only"
                                  />
                                  <div className={`w-full aspect-square flex flex-col items-center justify-center rounded-2xl border-2 border-base-300 bg-base-100 text-base-content/40 font-black transition-all duration-300 active:scale-90 hover:border-primary/40 hover:bg-base-200/50 ${config.class}`}>
                                      <span className="text-lg leading-none group-hover:scale-110 transition-transform">{config.emoji}</span>
                                      <span className="text-[9px] mt-0.5">{val}</span>
                                  </div>
                               </label>
                            )
                         })}
                      </div>

                      {/* Semantic status below pills */}
                      <div className="h-5 mt-2 relative flex items-center justify-center">
                        <AnimatePresence mode="wait">
                           {isAnswered ? (
                              <motion.div 
                                initial={{ opacity: 0, y: 5 }}
                                animate={{ opacity: 1, y: 0 }}
                                exit={{ opacity: 0 }}
                                className="text-[10px] font-black text-primary uppercase tracking-widest px-3 py-1 bg-primary/10 rounded-full flex items-center gap-1"
                              >
                                 <FaCheckCircle className="text-[8px]" /> {getVisualConfig(responses[item.id]).label}
                              </motion.div>
                           ) : (
                              <span className="text-[9px] font-black text-base-content/30 uppercase tracking-widest">Belum dipilih</span>
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

      {/* ✨ PRESTIGE INLINE ACTION PANEL ✨ */}
      <div className="mt-8 w-full max-w-md mx-auto px-1 animate-in slide-in-from-bottom-6 duration-500">
         <div className="bg-white rounded-3xl border border-base-300/60 p-5 shadow-xl flex flex-col gap-3 hover:shadow-2xl transition-all duration-300">
            {progress < 100 && (
               <div className="text-center text-[11px] font-black text-secondary tracking-widest uppercase animate-pulse">
                   🔥 SEDIKIT LAGI! KURANG {PERNYATAAN_LIST.length - Object.keys(responses).length} PERNYATAAN
               </div>
            )}
            
            <CustomButton
               type="primary"
               onClick={handleSaveClick}
               disabled={progress < 100 || loading}
               className={`w-full h-14 font-black rounded-2xl shadow-xl flex items-center justify-center gap-2 border-none transition-all hover:scale-[1.02] active:scale-95 ${progress < 100 ? 'grayscale contrast-50 bg-base-300 text-base-content/40 shadow-none' : 'shadow-primary/25'}`}
            >
               {loading ? (
                  <span className="loading loading-spinner loading-sm" />
               ) : (
                  <>
                     {progress === 100 ? <FaCheckCircle className="text-lg" /> : <FaSave className="opacity-50 text-lg" />}
                     <span>{progress === 100 ? "SIMPAN ANGKET SEKARANG" : "LENGKAPI JAWABAN DULU"}</span>
                  </>
               )}
            </CustomButton>
         </div>
      </div>
    </div>
  );
}