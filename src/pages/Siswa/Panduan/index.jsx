import React, { useEffect, useState } from "react"
import { Link } from "react-router-dom"
import { FaInfoCircle, FaEdit, FaCheckCircle, FaSave } from "react-icons/fa"
import * as Icons from "react-icons/fa" 
import KaihGuideCard from "../../../components/organism/KaihGuideCard"
import { panduanService } from "../../../services"
import { useNotification } from "../../../context/NotificationContext"
import CustomButton from "../../../components/atoms/CustomButton"

export default function SiswaPanduanPage() {
  const { showNotif } = useNotification();
  const [guides, setGuides] = useState([]);
  const [loading, setLoading] = useState(false);

  const fetchDataPanduan = async () => {
    setLoading(true);
    try {
      const ress = await panduanService.getAll();
      if (ress?.status) {
        const items = ress?.data?.items || [];
        const mappedData = Array.isArray(items) ? items.map((item, index) => {
          const uiConfigs = [
            { text: "text-secondary" },
            { text: "text-primary" },
            { text: "text-accent" },
            { text: "text-info" }
          ];
          
          const IconComponent = Icons[item.icon] || Icons.FaRegClock;

          return {
            id: item.idPanduan || item.id,
            label: item.title,
            icon: <IconComponent />, 
            desc: item.desc, 
            ui: uiConfigs[index % uiConfigs.length] 
          };
        }) : [];
        setGuides(mappedData);
      }
    } catch {
      showNotif("error", "Gagal memuat panduan");
    } finally {
      setLoading(false);
    }
  };

  useEffect(() => {
    fetchDataPanduan();
  }, []);

  return (
    <div className="flex flex-col gap-6 py-2 px-1 pb-10">
       <div className="flex flex-col">
          <div className="flex items-center gap-2 text-primary font-black text-sm uppercase tracking-widest mb-2">
             <span className="w-6 h-0.5 bg-primary rounded-full" />
             Petunjuk Penggunaan
          </div>
          <h1 className="text-2xl font-black text-base-content leading-tight flex items-center gap-2">
             <FaInfoCircle className="text-primary" /> Panduan Lengkap
          </h1>
          <p className="text-xs font-bold text-base-content/50 mt-1">Cara mengisi jurnal dan mengatur kebiasaanmu.</p>
      </div>

      {/* Quick Overview Card */}
      <div className="card bg-gradient-to-br from-primary via-primary to-secondary text-white shadow-lg rounded-3xl relative overflow-hidden">
        <div className="absolute -bottom-10 -right-10 w-32 h-32 bg-white/10 rounded-full blur-2xl"></div>
        <div className="p-5 relative z-10">
          <h2 className="text-lg font-black tracking-tight mb-3 flex items-center gap-2">
             📝 3 Langkah Mengisi Jurnal
          </h2>

          <div className="flex flex-col gap-2 text-sm font-bold">
             <div className="flex items-center gap-3 bg-white/10 p-3 rounded-2xl border border-white/10">
                <div className="w-7 h-7 rounded-full bg-white text-primary flex items-center justify-center font-black shadow-inner shrink-0">1</div>
                <span>Pilih Tanggal di kalender atas</span>
             </div>
             <div className="flex items-center gap-3 bg-white/10 p-3 rounded-2xl border border-white/10">
                <div className="w-7 h-7 rounded-full bg-white text-primary flex items-center justify-center font-black shadow-inner shrink-0">2</div>
                <span>Ketuk kartu dan pilih kondisi yang sesuai</span>
             </div>
             <div className="flex items-center gap-3 bg-white/10 p-3 rounded-2xl border border-white/10">
                <div className="w-7 h-7 rounded-full bg-white text-primary flex items-center justify-center font-black shadow-inner shrink-0">3</div>
                <span>Tekan Simpan di tombol bagian bawah</span>
             </div>
          </div>

          <Link to="/siswa/jurnal" className="mt-5 block">
             <CustomButton type="accent" className="w-full h-12 font-black text-accent-content shadow-md shadow-black/10 scale-100">
                MULAI ISI SEKARANG! 🚀
             </CustomButton>
          </Link>
        </div>
      </div>

      {/* Guides Grid */}
      <div className="flex flex-col gap-4 mt-2">
         <div className="px-1">
            <h3 className="text-lg font-black text-base-content/80">📚 Penjelasan Fitur</h3>
         </div>
         
         {loading ? (
            <div className="flex flex-col items-center justify-center py-10 gap-2">
              <span className="loading loading-spinner loading-md text-primary"></span>
              <span className="text-xs font-bold text-base-content/50">Mengambil Data...</span>
            </div>
         ) : guides.length > 0 ? (
            guides.map((item) => (
               <KaihGuideCard key={item.id} item={item} />
            ))
         ) : (
            <div className="card border-2 border-base-300 border-dashed p-8 rounded-3xl text-center items-center justify-center bg-base-200/30">
               <div className="text-3xl opacity-40 mb-2">🔍</div>
               <p className="font-black text-base-content/40 text-sm uppercase tracking-wider">Belum ada panduan tambahan</p>
            </div>
         )}
      </div>
    </div>
  )
}