import React, { useMemo, useState, useEffect } from "react"
import { Link } from "react-router-dom"
import { formatDate } from "../../../utils/helper"
import CustomButton from "../../../components/atoms/CustomButton"
import KaihPointCard from "../../../components/organism/KaihPointCard"
import KaihPointModal from "../../../components/organism/KaihPointModal"
import {
  FaArrowLeft,
  FaSave,
  FaRegClock,
  FaPrayingHands,
  FaRunning,
  FaAppleAlt,
  FaBook,
  FaUsers,
  FaMoon,
  FaExclamationTriangle,
  FaCheckDouble,
  FaTimes,
  FaCamera,
  FaRegCalendarAlt,
  FaLightbulb
} from "react-icons/fa"
import { jurnalKaihService } from "../../../services"
import CustomModal from "../../../components/organism/CustomModal"
import panduanJurnalImg from "../../../assets/panduan-jurnal-siswa.png"

const KAIH_ITEMS = [
  {
    id: "bangun_pagi",
    label: "Bangun Pagi",
    icon: <FaRegClock />,
    ui: { bg: "bg-secondary/10", border: "border-secondary/30", text: "text-secondary" },
    options: [
      { value: 4, label: "Bangun sebelum pukul 04.30." },
      { value: 3, label: "Bangun pukul 04.31–05.00." },
      { value: 2, label: "Bangun pukul 05.01–05.30." },
      { value: 1, label: "Bangun pukul 05.31–06.00." },
      { value: 0, label: "Bangun lebih dari pukul 06.00." },
    ],
  },
  {
    id: "beribadah",
    label: "Beribadah",
    icon: <FaPrayingHands />,
    ui: { bg: "bg-accent/10", border: "border-accent/30", text: "text-accent" },
  },
  {
    id: "berolahraga",
    label: "Berolahraga",
    icon: <FaRunning />,
    ui: { bg: "bg-info/10", border: "border-info/30", text: "text-info" },
    options: [
      { value: 4, label: "Berolahraga lebih dari 60 menit setiap hari (senam pagi, jalan kaki, berlari, bersepeda, atau bermain bola)." },
      { value: 3, label: "Berolahraga 30–59 menit setiap hari (senam pagi, jalan kaki, berlari, bersepeda, atau bermain bola)." },
      { value: 2, label: "Berolahraga 15–29 menit setiap hari (senam pagi, jalan kaki, berlari, bersepeda, atau bermain bola)." },
      { value: 1, label: "Berolahraga < 15 menit setiap hari (senam pagi, jalan kaki, berlari, bersepeda, atau bermain bola)." },
      { value: 0, label: "Tidak melakukan olahraga maupun aktivitas fisik." },
    ],
  },
  {
    id: "makan_sehat",
    label: "Makan Sehat dan Bergizi",
    icon: <FaAppleAlt />,
    ui: { bg: "bg-secondary/10", border: "border-secondary/30", text: "text-secondary" },
    options: [
      { value: 4, label: "Makan nasi, lauk, sayur, buah, minum susu, dan air putih." },
      { value: 3, label: "Makan nasi, lauk, sayur, buah, dan minum air putih (tidak minum susu)." },
      { value: 2, label: "Makan nasi, lauk, sayur, dan minum air putih (tidak makan buah)." },
      { value: 1, label: "Makan nasi dan lauk, dan minum air putih (tidak makan sayur dan buah)." },
      { value: 0, label: "Makan nasi, tetapi lauknya makanan instan (mie, gorengan)." },
    ],
  },
  {
    id: "gemar_belajar",
    label: "Gemar Belajar",
    icon: <FaBook />,
    ui: { bg: "bg-primary/10", border: "border-primary/30", text: "text-primary" },
    options: [
      { value: 4, label: "Belajar lebih dari 60 menit setiap hari (membaca, mengerjakan tugas, atau latihan soal)." },
      { value: 3, label: "Belajar 30–59 menit setiap hari (membaca, mengerjakan tugas, atau latihan soal)." },
      { value: 2, label: "Belajar 15–29 menit setiap hari (membaca, mengerjakan tugas, atau latihan soal)." },
      { value: 1, label: "Belajar kurang dari 15 menit setiap hari (membaca, mengerjakan tugas, atau latihan soal)." },
      { value: 0, label: "Tidak belajar di rumah. " },
    ],
  },
  {
    id: "bermasyarakat",
    label: "Bermasyarakat",
    icon: <FaUsers />,
    ui: { bg: "bg-accent/10", border: "border-accent/30", text: "text-accent" },
    options: [
      { value: 4, label: "Melakukan 4 kegiatan (membantu orang tua, piket di sekolah, bermain dengan teman, dan membantu teman)." },
      { value: 3, label: "Melakukan 3 kegiatan ( membantu orang tua, piket di sekolah, dan bermain dengan teman)." },
      { value: 2, label: "Melakukan 2 (membantu orang tua dan piket di sekolah)." },
      { value: 1, label: "Melakukan 1 kegiatan (hanya membantu orang tua atau piket di sekolah)." },
      { value: 0, label: "Tidak melakukan kegiatan bermasyarakat walaupun sudah diingatkan." },
    ],
  },
  {
    id: "tidur_cepat",
    label: "Tidur Cepat",
    icon: <FaMoon />,
    ui: { bg: "bg-primary/10", border: "border-primary/30", text: "text-primary" },
    fullWidth: true,
    options: [
      { value: 4, label: "Tidur sebelum pukul 20.30, sudah menyiapkan perlengkapan sekolah, dan tidak bermain HP." },
      { value: 3, label: "Tidur pukul 20.31–21.00, sudah menyiapkan perlengkapan sekolah, masih bermain HP sebentar." },
      { value: 2, label: "Tidur pukul 21.01–21.30, belum menyiapkan perlengkapan sekolah, dan masih bermain HP." },
      { value: 1, label: "Tidur pukul  21.31–22.00, belum menyiapkan perlengkapan sekolah, dan masih bermain HP cukup lama." },
      { value: 0, label: "Tidur di atas pukul 22.00 karena masih bermain HP sampai larut malam." },
    ],
  },
]

const BERIBADAH_MUSLIM_OPTIONS = [
  { value: 4, label: "Melaksanakan seluruh shalat wajib (Subuh, Dzuhur, Ashar, Magrib, Isya)." },
  { value: 3, label: "Melaksanakan 4 dari 5 shalat wajib." },
  { value: 2, label: "Melaksanakan 3 dari 5 shalat wajib." },
  { value: 1, label: "Melaksanakan 1–2 dari 5 shalat wajib." },
  { value: 0, label: "Tidak melaksanakan shalat wajib." },
]

const BERIBADAH_NON_MUSLIM_OPTIONS = [
  { value: 4, label: "Berdoa dan membaca kitab suci sendiri tanpa diingatkan." },
  { value: 3, label: "Berdoa dan membaca kitab suci setelah diingatkan." },
  { value: 2, label: "Berdoa tetapi tidak membaca kitab suci." },
  { value: 1, label: "Membaca kitab suci tetapi tidak berdoa." },
  { value: 0, label: "Tidak berdoa dan tidak membaca kitab suci." },
]

const photoKeys = {
  bangun_pagi: "fotoBangunPagi",
  berolahraga: "fotoOlahraga",
  beribadah: "fotoIbadah",
  makan_sehat: "fotoMakan",
  gemar_belajar: "fotoBelajar",
  bermasyarakat: "fotoSosial",
  tidur_cepat: "fotoTidur",
}

const getTodayDateString = () => {
  const today = new Date();
  const year = today.getFullYear();
  const month = String(today.getMonth() + 1).padStart(2, '0');
  const day = String(today.getDate()).padStart(2, '0');
  return `${year}-${month}-${day}`;
}

export default function SiswaJurnalPage() {
  const [activeItemId, setActiveItemId] = useState(null)
  const activeItem = KAIH_ITEMS.find((x) => x.id === activeItemId) ?? null

  const [loading, setLoading] = useState(false)
  const [checkingStatus, setCheckingStatus] = useState(true)
  const [alreadySubmitted, setAlreadySubmitted] = useState(false)
  const [todayData, setTodayData] = useState(null)
  const [selectedDate] = useState(getTodayDateString())
  const [showGuide, setShowGuide] = useState(true)

  const [photos, setPhotos] = useState({
    fotoBangunPagi: null,
    fotoOlahraga: null,
    fotoIbadah: null,
    fotoMakan: null,
    fotoBelajar: null,
    fotoSosial: null,
    fotoTidur: null,
  })

  const userProfile = JSON.parse(localStorage.getItem("user") || "{}")

  useEffect(() => {
    const checkTodayStatus = async () => {
      const validNisn = userProfile.nisn || userProfile.NISN
      const validNama = userProfile.nama || userProfile.namaLengkap || userProfile.namaSiswa

      const isCorrupt = (val) => {
        if (!val) return true
        const strVal = String(val).toLowerCase().trim()
        return strVal === "" || strVal === "undefined" || strVal === "null"
      }

      if (isCorrupt(validNisn) || isCorrupt(validNama)) {
        setCheckingStatus(false)
        return
      }

      try {
        const today = getTodayDateString()
        // Mengambil data dengan limit tinggi dan memfilternya di sisi klien
        const res = await jurnalKaihService.getHistory({ limit: 1000 })
        
        if (res && res.status && res.data && Array.isArray(res.data.items)) {
          const existing = res.data.items.find((item) => {
            const matchNisn = String(item.nisn) === String(validNisn)
            
            if (!item.tanggal) return false
            // Konversi string tanggal ISO agar menyesuaikan waktu lokal pengguna (WIB)
            const itemDate = new Date(item.tanggal)
            const year = itemDate.getFullYear()
            const month = String(itemDate.getMonth() + 1).padStart(2, '0')
            const day = String(itemDate.getDate()).padStart(2, '0')
            const itemDateStr = `${year}-${month}-${day}`
            
            return matchNisn && itemDateStr === today
          })

          if (existing) {
            setAlreadySubmitted(true)
            setTodayData(existing)
          }
        }
      } catch (err) {
        console.error("Gagal memeriksa riwayat jurnal hari ini:", err)
      } finally {
        setCheckingStatus(false)
      }
    }

    checkTodayStatus()
  }, [])

  const [modalConfig, setModalConfig] = useState({
    isOpen: false,
    title: "",
    message: "",
    type: "primary",
    onConfirm: () => {},
  })

  const [journal, setJournal] = useState({
    bangun_pagi: null,
    berolahraga: null,
    beribadah: { mode: null, value: null },
    makan_sehat: null,
    gemar_belajar: null,
    bermasyarakat: null,
    tidur_cepat: null,
  })

  const points = useMemo(() => {
    const safe = (v) => (typeof v === "number" ? v : 0)
    return {
      bangun_pagi: safe(journal.bangun_pagi),
      beribadah: safe(journal.beribadah.value),
      berolahraga: safe(journal.berolahraga),
      makan_sehat: safe(journal.makan_sehat),
      gemar_belajar: safe(journal.gemar_belajar),
      bermasyarakat: safe(journal.bermasyarakat),
      tidur_cepat: safe(journal.tidur_cepat),
    }
  }, [journal])

  const total = useMemo(() => Object.values(points).reduce((a, b) => a + b, 0), [points])

  const handleFileChange = (e, key) => {
    if (e === null) {
      setPhotos((prev) => ({ ...prev, [key]: null }))
      return
    }
    const file = e.target.files[0]
    if (file) {
      const reader = new FileReader()
      reader.onloadend = () => {
        const base64Data = reader.result
        // ⚡ CLIENT-SIDE COMPRESSOR: Bypasses large file limits & speeds up submission!
        const img = new Image()
        img.src = base64Data
        img.onload = () => {
          const canvas = document.createElement("canvas")
          const MAX_WIDTH = 400 // High enough for proof, light enough for database
          let width = img.width
          let height = img.height

          if (width > MAX_WIDTH) {
            height = (MAX_WIDTH / width) * height
            width = MAX_WIDTH
          }

          canvas.width = width
          canvas.height = height
          const ctx = canvas.getContext("2d")
          ctx.drawImage(img, 0, 0, width, height)

          // Converts to lightweight JPEG base64 (~15kb - 25kb)
          const compressedBase64 = canvas.toDataURL("image/jpeg", 0.6)
          setPhotos((prev) => ({ ...prev, [key]: compressedBase64 }))
        }
      }
      reader.readAsDataURL(file)
    }
  }

  const resetForm = () => {
    setJournal({
      bangun_pagi: null,
      berolahraga: null,
      beribadah: { mode: null, value: null },
      makan_sehat: null,
      gemar_belajar: null,
      bermasyarakat: null,
      tidur_cepat: null,
    })
    setPhotos({
      fotoBangunPagi: null,
      fotoOlahraga: null,
      fotoIbadah: null,
      fotoMakan: null,
      fotoBelajar: null,
      fotoSosial: null,
      fotoTidur: null,
    })
  }

  const PhotoUploadInput = ({ id, currentPhoto, onChange }) => (
    <div className="mt-6 p-4 border-2 border-dashed border-base-300 rounded-2xl bg-base-200/50 relative transition-colors hover:border-primary/40 group">
      <div className="flex items-center gap-2 mb-3">
        <div className="w-8 h-8 rounded-lg bg-white flex items-center justify-center text-base-content/60 shadow-sm group-hover:text-primary transition-colors">
          <FaCamera />
        </div>
        <span className="text-xs font-black tracking-wide uppercase text-base-content/70">Bukti Foto (Opsional)</span>
      </div>
      
      {currentPhoto ? (
        <div className="relative w-full aspect-video bg-black rounded-xl overflow-hidden border border-base-200 shadow-md animate-in zoom-in duration-200">
          <img src={currentPhoto} alt="Preview Bukti" className="w-full h-full object-cover" />
          <button
            type="button"
            onClick={() => onChange(null, id)}
            className="absolute top-2 right-2 bg-red-500 hover:bg-red-600 text-white rounded-full w-8 h-8 flex items-center justify-center shadow-lg transition-transform active:scale-90 cursor-pointer"
          >
            <FaTimes />
          </button>
        </div>
      ) : (
        <div className="relative h-16 bg-white border border-base-300 rounded-xl shadow-inner flex items-center justify-center transition-colors group-hover:border-primary/30">
          <input
            type="file"
            accept="image/*"
            capture="environment"
            onChange={(e) => onChange(e, id)}
            className="absolute inset-0 w-full h-full opacity-0 cursor-pointer z-10"
          />
          <div className="flex flex-col items-center gap-0.5 text-base-content/40">
             <span className="text-xs font-extrabold tracking-wider group-hover:text-primary transition-colors">Klik untuk Mengambil Foto</span>
          </div>
        </div>
      )}
    </div>
  )

  const renderBeribadahBody = () => {
    const { mode, value } = journal.beribadah
    const options =
      mode === "muslim"
        ? BERIBADAH_MUSLIM_OPTIONS
        : mode === "nonMuslim"
        ? BERIBADAH_NON_MUSLIM_OPTIONS
        : []

    return (
      <div className="flex flex-col gap-6">
        <div className="space-y-3">
          <p className="text-sm font-black text-base-content/60 uppercase tracking-widest">Agama / Keyakinan</p>
          <div className="grid grid-cols-2 gap-3">
            <button 
              type="button" 
              onClick={() => setJournal((prev) => ({ ...prev, beribadah: { mode: "muslim", value: null } }))}
              className={`p-4 rounded-2xl border-2 flex flex-col items-center justify-center gap-2 font-black transition-all shadow-sm active:scale-95 
                ${mode === "muslim" ? 'border-accent bg-accent/10 text-accent' : 'border-base-300 hover:border-base-content/20 text-base-content/60'}`}
            >
              <span className="text-3xl">🕌</span>
              <span className="text-sm">Muslim</span>
            </button>
            <button 
              type="button" 
              onClick={() => setJournal((prev) => ({ ...prev, beribadah: { mode: "nonMuslim", value: null } }))}
              className={`p-4 rounded-2xl border-2 flex flex-col items-center justify-center gap-2 font-black transition-all shadow-sm active:scale-95 
                ${mode === "nonMuslim" ? 'border-accent bg-accent/10 text-accent' : 'border-base-300 hover:border-base-content/20 text-base-content/60'}`}
            >
              <span className="text-3xl">⛪</span>
              <span className="text-sm">Non-Muslim</span>
            </button>
          </div>
        </div>

        {mode && (
          <div className="space-y-3 border-t border-base-200 pt-4 animate-in slide-in-from-bottom-4 duration-300">
            <p className="text-sm font-black text-base-content/60 uppercase tracking-widest">Aktivitas Ibadah Hari Ini</p>
            <div className="flex flex-col gap-3">
              {options.map((opt) => (
                <button
                  key={opt.value}
                  type="button"
                  onClick={() =>
                    setJournal((prev) => ({
                      ...prev,
                      beribadah: { ...prev.beribadah, value: opt.value },
                    }))
                  }
                  className={`w-full text-left rounded-2xl border-2 p-4 transition-all flex items-center gap-3 active:scale-[0.98] shadow-sm 
                    ${value === opt.value ? 'border-primary bg-primary/5' : 'border-base-300 bg-base-100'}`}
                >
                  <div className={`w-5 h-5 rounded-full border-2 shrink-0 flex items-center justify-center ${value === opt.value ? 'border-primary' : 'border-base-300'}`}>
                    {value === opt.value && <div className="w-2.5 h-2.5 bg-primary rounded-full"></div>}
                  </div>
                  <span className={`text-sm font-bold leading-snug ${value === opt.value ? 'text-primary font-black' : 'text-base-content/80'}`}>{opt.label}</span>
                </button>
              ))}
            </div>
          </div>
        )}
      </div>
    )
  }

  const handleSimpleSelect = (val) => {
    if (!activeItemId || activeItemId === "beribadah") return
    setJournal((prev) => ({ ...prev, [activeItemId]: val }))
  }

  const simpleModalValue =
    activeItemId && activeItemId !== "beribadah" ? journal[activeItemId] : null

  const renderModalBody = () => {
    if (!activeItemId) return null
    const currentKey = photoKeys[activeItemId]

    return (
      <div className="flex flex-col gap-2">
        {activeItemId === "beribadah" && renderBeribadahBody()}

        {activeItemId !== "beribadah" && activeItem?.options && (
          <div className="flex flex-col gap-3">
            {activeItem.options.map((opt) => (
               <button
                 key={opt.value}
                 type="button"
                 onClick={() => handleSimpleSelect(opt.value)}
                 className={`w-full text-left rounded-2xl border-2 p-4 transition-all flex items-center gap-3 active:scale-[0.98] shadow-sm 
                   ${simpleModalValue === opt.value ? 'border-primary bg-primary/5' : 'border-base-300 bg-base-100'}`}
               >
                 <div className={`w-5 h-5 rounded-full border-2 shrink-0 flex items-center justify-center ${simpleModalValue === opt.value ? 'border-primary' : 'border-base-300'}`}>
                   {simpleModalValue === opt.value && <div className="w-2.5 h-2.5 bg-primary rounded-full"></div>}
                 </div>
                 <span className={`text-sm font-bold leading-snug ${simpleModalValue === opt.value ? 'text-primary font-black' : 'text-base-content/80'}`}>{opt.label}</span>
               </button>
            ))}
          </div>
        )}

        <PhotoUploadInput
          id={currentKey}
          currentPhoto={photos[currentKey]}
          onChange={handleFileChange}
        />
      </div>
    )
  }

  const modalBody = renderModalBody()

  const getSelectedLabel = (itemId) => {
    if (itemId === "beribadah") {
      const { mode, value } = journal.beribadah
      if (!mode || value === null) return null
      const opts = mode === "muslim" ? BERIBADAH_MUSLIM_OPTIONS : BERIBADAH_NON_MUSLIM_OPTIONS
      const found = opts.find((o) => o.value === value)
      return found ? found.label.split(",")[0] : null
    }
    const item = KAIH_ITEMS.find((i) => i.id === itemId)
    const val = journal[itemId]
    if (val === null || val === undefined) return null
    const found = item?.options?.find((o) => o.value === val)
    return found ? found.label.split(",")[0] : null
  }

  const handleSubmit = async () => {
    // 🛡️ MIDDLEWARE GUARD: CEK IDENTITAS VALID SEBELUM UPLOAD
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
        title: "Identitas Tidak Ditemukan! ⚠️",
        type: "error",
        onConfirm: () => {
          setModalConfig((p) => ({ ...p, isOpen: false }))
          // Paksa logout bersih agar siswa melakukan sinkronisasi ulang identitas saat login
          localStorage.clear()
          sessionStorage.clear()
          window.location.href = "/siswa/login"
        },
        message: (
          <div className="text-center flex flex-col items-center py-4">
            <div className="w-16 h-16 rounded-full bg-error/10 text-error flex items-center justify-center text-3xl mb-3">
              <FaExclamationTriangle />
            </div>
            <p className="font-black text-base-content leading-tight mb-1.5">Sesi Akun Tidak Valid</p>
            <p className="text-xs font-bold text-base-content/60 leading-relaxed max-w-xs mx-auto">
              Maaf, NISN atau Nama kamu terdeteksi kosong atau tidak valid. Klik OK untuk kembali Login ulang secara bersih agar datamu sinkron.
            </p>
          </div>
        ),
      })
      return
    }

    if (total === 0) {
      alert("Kamu belum mengisi poin apapun nih, ayo pilih dulu kegiatannya!")
      return
    }
    setLoading(true)

    const payload = {
      tanggal: selectedDate,
      nisn: validNisn,
      namaSiswa: validNama,
      bangunPagi: journal.bangun_pagi,
      berolahraga: journal.berolahraga,
      ibadahMode: journal.beribadah.mode,
      ibadahValue: journal.beribadah.value,
      makanSehat: journal.makan_sehat,
      gemarBelajar: journal.gemar_belajar,
      bermasyarakat: journal.bermasyarakat,
      tidurCepat: journal.tidur_cepat,
      totalPoin: total,
      fotoBangunPagi: photos.fotoBangunPagi,
      fotoOlahraga: photos.fotoOlahraga,
      fotoIbadah: photos.fotoIbadah,
      fotoMakan: photos.fotoMakan,
      fotoBelajar: photos.fotoBelajar,
      fotoSosial: photos.fotoSosial,
      fotoTidur: photos.fotoTidur,
    }

    try {
      const result = await jurnalKaihService.submit(payload)
      if (result.success) {
        resetForm() // ⚡ RESET FRONTEND STATE ON SUCCESS
        setModalConfig({
          isOpen: true,
          title: "Berhasil! 🎉",
          type: "success",
          onConfirm: () => {
            setModalConfig((p) => ({ ...p, isOpen: false }))
            setAlreadySubmitted(true)
            setTodayData({ totalPoin: total })
          },
          message: (
            <div className="text-center flex flex-col items-center py-4">
              <div className="w-20 h-20 rounded-full bg-success/10 text-success flex items-center justify-center text-4xl mb-4 shadow-inner animate-bounce">
                 <FaCheckDouble />
              </div>
              <p className="font-black text-lg text-base-content leading-tight mb-1">Jurnal Harian Tersimpan!</p>
              <p className="text-sm font-bold text-base-content/60 leading-relaxed max-w-xs mx-auto">
                Hebat! Kamu selangkah lebih dekat menjadi Anak Indonesia Hebat. ✨
              </p>
            </div>
          ),
        })
      } else {
        throw new Error(result.message)
      }
    } catch (err) {
      setModalConfig({
        isOpen: true,
        title: "Gagal Menyimpan 🥺",
        type: "error",
        onConfirm: () => setModalConfig((p) => ({ ...p, isOpen: false })),
        message: (
          <div className="text-center flex flex-col items-center py-4">
            <div className="w-16 h-16 rounded-full bg-error/10 text-error flex items-center justify-center text-3xl mb-3 shadow-inner">
              <FaExclamationTriangle />
            </div>
            <p className="font-bold text-base-content mb-1">Ups! Ada kendala teknis.</p>
            <p className="text-xs font-medium opacity-70">{err.message || "Periksa sambungan internetmu ya."}</p>
          </div>
        ),
      })
    } finally {
      setLoading(false)
    }
  }

  return (
    <div className="flex flex-col pb-24 px-1 relative">
      {loading && (
        <div className="fixed inset-0 z-[9999] flex flex-col items-center justify-center bg-base-300/50 backdrop-blur-md animate-in fade-in duration-300">
          <div className="bg-base-100 p-8 rounded-3xl shadow-2xl flex flex-col items-center border-2 border-primary/20 animate-in zoom-in-95 duration-200">
            <span className="loading loading-spinner loading-lg text-primary scale-125 mb-4"></span>
            <span className="font-black text-primary text-lg tracking-tight">Sedang Menyimpan...</span>
            <span className="text-xs font-bold text-base-content/50 mt-1">Tunggu sebentar ya 👋</span>
          </div>
        </div>
      )}

      <CustomModal
        isOpen={modalConfig.isOpen}
        onClose={() => !loading && setModalConfig((p) => ({ ...p, isOpen: false }))}
        onConfirm={modalConfig.onConfirm}
        title={modalConfig.title}
        type={modalConfig.type}
        confirmText="Siap, Mengerti!"
        showCancel={false}
      >
        {modalConfig.message}
      </CustomModal>

      {checkingStatus ? (
        <div className="flex flex-col items-center justify-center min-h-[50vh] gap-3 animate-in fade-in duration-300 mt-10">
          <span className="loading loading-spinner loading-lg text-primary scale-125"></span>
          <span className="text-xs font-black text-base-content/40 uppercase tracking-widest animate-pulse">Memeriksa Status Jurnal...</span>
        </div>
      ) : alreadySubmitted ? (
        <div className="flex flex-col gap-6 animate-in fade-in slide-in-from-bottom-6 duration-500 mt-4">
          <div className="px-1 mb-2">
              <div className="flex items-center gap-2 text-success font-black text-sm uppercase tracking-widest mb-2">
                 <span className="w-6 h-0.5 bg-success rounded-full" />
                 Laporan Terkirim
              </div>
              <h1 className="text-3xl font-black text-base-content tracking-tight leading-none mb-1 flex items-center gap-2">
                 📝 Jurnal 7 KAIH
              </h1>
          </div>

          <div className="bg-base-100 border border-base-300/60 shadow-xl rounded-[2.5rem] p-8 flex flex-col items-center text-center relative overflow-hidden mt-2 hover:shadow-2xl transition-shadow duration-300">
            <div className="absolute top-0 left-0 w-full h-2 bg-gradient-to-r from-success to-emerald-400"></div>
            
            <div className="w-24 h-24 rounded-full bg-success/10 text-success flex items-center justify-center text-5xl shadow-inner border-4 border-success/5 mt-2">
                🎉
            </div>
            
            <div className="mt-6 space-y-2">
                <h2 className="text-2xl font-black text-base-content tracking-tight leading-tight">Jurnal Kamu Sudah Terisi!</h2>
                <p className="text-sm font-bold text-base-content/50 max-w-xs mx-auto leading-relaxed">
                    Luar biasa! Kamu sudah mencatat seluruh aktivitas baikmu hari ini pada tanggal <span className="text-base-content/80 font-black">{formatDate(selectedDate)}</span>.
                </p>
            </div>

            <div className="bg-success/5 border-2 border-success/10 rounded-3xl p-6 w-full mt-8 flex items-center justify-between gap-4 shadow-inner">
                <div className="text-left">
                    <span className="text-[10px] font-black text-base-content/40 uppercase tracking-widest leading-none block mb-1">Total Skor Hari Ini</span>
                    <div className="text-3xl font-black text-success leading-none flex items-baseline gap-0.5">
                        {todayData?.totalPoin || total} <span className="text-xs font-black opacity-60 uppercase tracking-tighter">Poin</span>
                    </div>
                </div>
                <span className="badge badge-success font-black px-3 py-3 text-[10px] rounded-xl border-none tracking-wide shadow-sm shadow-success/20">SELESAI</span>
            </div>

            <div className="mt-8 w-full">
              <Link 
                to="/siswa" 
                className="btn btn-primary h-14 px-8 w-full font-black text-xs rounded-2xl shadow-xl shadow-primary/20 flex items-center justify-center gap-2 hover:scale-[1.02] transition-all active:scale-95 border-none text-white uppercase tracking-wider"
              >
                KEMBALI KE BERANDA
              </Link>
            </div>
          </div>
        </div>
      ) : (
        <>
          {/* Main Header Jurnal with Background Accent */}
          <div className="px-1 mb-6 animate-in fade-in duration-500">
              <div className="flex items-center justify-between mb-2">
                 <div className="flex items-center gap-2 text-primary font-black text-sm uppercase tracking-widest">
                    <span className="w-6 h-0.5 bg-primary rounded-full" />
                    Agenda Hari Ini
                 </div>
              </div>
              <h1 className="text-3xl font-black text-base-content tracking-tight leading-none mb-1 flex items-center gap-2">
                 📝 Isi Jurnal 7 KAIH
              </h1>
              <p className="text-sm font-bold text-base-content/50 tracking-tight">Catat semua kebiasaan baikmu hari ini!</p>
          </div>

          {/* Static Today's Date Panel */}
          <div className="card bg-base-100 shadow-md rounded-2xl border border-base-300/60 mb-6 overflow-hidden animate-in fade-in duration-500">
            <div className="bg-gradient-to-r from-primary/5 to-transparent h-1.5 w-full" />
            <div className="p-4 flex items-center gap-4">
               <div className="w-12 h-12 rounded-xl bg-primary/10 text-primary flex items-center justify-center text-xl flex-shrink-0 shadow-inner">
                  <FaRegCalendarAlt />
               </div>
               <div className="flex-1 space-y-0.5">
                  <label className="text-xs font-black text-base-content/40 uppercase tracking-wider block mb-0.5">Tanggal Catatan</label>
                  <div className="flex items-center gap-2">
                    <p className="text-base font-black text-base-content leading-tight">
                      {formatDate(selectedDate)}
                    </p>
                    <span className="badge badge-primary badge-xs font-black px-2 py-1.5 text-[9px] uppercase border-none shadow-sm shadow-primary/20 animate-pulse">Hari Ini</span>
                  </div>
               </div>
            </div>
          </div>

          <div className="px-1 mb-3 flex items-center justify-between animate-in fade-in duration-500">
             <h3 className="text-lg font-black text-base-content/80 tracking-tight">🎯 Aktivitas Harian</h3>
             <div className="flex items-center gap-2">
                <button
                   type="button"
                   onClick={() => setShowGuide(true)}
                   className="btn btn-circle btn-xs bg-yellow-400 hover:bg-yellow-500 text-yellow-950 border-none shadow-sm flex items-center justify-center hover:scale-110 active:scale-95 transition-transform"
                   title="Lihat Panduan Jurnal"
                >
                   <FaLightbulb className="text-[10px] animate-pulse" />
                </button>
                <span className="badge badge-neutral font-extrabold rounded-lg shadow-sm py-2.5 px-3 text-[10px] uppercase">KLIK KARTU</span>
             </div>
          </div>

          {/* Grid Grid Items for Inputs */}
          <div className="grid grid-cols-2 gap-4 animate-in fade-in duration-500">
            {KAIH_ITEMS.map((item) => (
              <KaihPointCard
                key={item.id}
                item={item}
                selectedLabel={getSelectedLabel(item.id)}
                onClick={() => setActiveItemId(item.id)}
              />
            ))}
          </div>

          {/* ✨ PRESTIGE INLINE ACTION PANEL ✨ */}
          <div className="mt-8 w-full max-w-md mx-auto px-1 animate-in slide-in-from-bottom-6 duration-500">
            <div className="bg-white rounded-3xl shadow-xl border border-base-300/60 p-4 flex items-center justify-between gap-5 hover:shadow-2xl transition-all duration-300">
              <div className="flex flex-col pl-3">
                 <span className="text-[10px] font-black text-base-content/40 uppercase tracking-widest leading-none mb-1.5">Total Skor</span>
                 <div className="font-black text-3xl leading-none text-primary flex items-baseline gap-0.5">
                     {total} <span className="text-xs opacity-50 font-black uppercase tracking-tighter">Poin</span>
                 </div>
              </div>
              
              <CustomButton
                type="primary"
                className="h-14 px-8 text-sm font-black rounded-2xl shadow-xl flex-1 shadow-primary/25 group border-none hover:scale-[1.02] active:scale-95 transition-all"
                onClick={handleSubmit}
                disabled={loading}
              >
                {loading ? (
                  <span className="loading loading-spinner loading-sm"></span>
                ) : (
                  <div className="flex items-center justify-center gap-2">
                    <FaSave className="text-base" /> <span>SIMPAN JURNAL</span>
                  </div>
                )}
              </CustomButton>
            </div>
          </div>
        </>
      )}

      <KaihPointModal
        open={Boolean(activeItem)}
        title="Pilih Kondisi Harianmu"
        itemLabel={activeItem?.label ?? ""}
        value={simpleModalValue}
        options={activeItem?.options ?? []}
        onClose={() => setActiveItemId(null)}
        onSelect={handleSimpleSelect}
      >
        {modalBody}
      </KaihPointModal>

      {/* Modal Panduan Pengisian */}
      {showGuide && (
        <div className="fixed inset-0 z-[9999] flex items-center justify-center bg-base-300/60 backdrop-blur-md p-4 animate-in fade-in duration-300">
          <div className="bg-base-100 max-w-md w-full rounded-[2.5rem] border-2 border-primary/20 shadow-2xl p-6 flex flex-col items-center relative overflow-hidden animate-in zoom-in-95 duration-200">
            <div className="absolute top-0 left-0 w-full h-2 bg-gradient-to-r from-primary to-secondary"></div>
            
            <button
              type="button"
              onClick={() => setShowGuide(false)}
              className="absolute top-4 right-4 bg-base-200 hover:bg-base-300 text-base-content/60 hover:text-base-content rounded-full w-8 h-8 flex items-center justify-center transition-colors cursor-pointer"
            >
              <FaTimes />
            </button>

            <div className="w-12 h-12 rounded-2xl bg-primary/10 text-primary flex items-center justify-center text-2xl shadow-inner mt-2 mb-4">
              💡
            </div>

            <h3 className="text-xl font-black text-base-content tracking-tight mb-2 text-center">
              Panduan Pengisian Jurnal
            </h3>
            
            <p className="text-xs font-bold text-base-content/50 text-center mb-5 max-w-xs leading-relaxed">
              Pelajari panduan di bawah ini untuk memudahkanmu mengisi jurnal kebiasaan baik hari ini!
            </p>

            <div className="w-full rounded-2xl overflow-hidden border border-base-200 shadow-md mb-6 aspect-[4/3] bg-base-200 flex items-center justify-center">
              <img 
                src={panduanJurnalImg} 
                alt="Panduan Jurnal" 
                className="w-full h-full object-cover"
              />
            </div>

            <button
              type="button"
              onClick={() => setShowGuide(false)}
              className="btn btn-primary h-12 px-8 w-full font-black text-xs rounded-2xl shadow-lg shadow-primary/20 flex items-center justify-center gap-2 hover:scale-[1.02] transition-all active:scale-95 border-none text-white uppercase tracking-wider"
            >
              Saya Mengerti, Mulai Isi! 🚀
            </button>
          </div>
        </div>
      )}
    </div>
  )
}