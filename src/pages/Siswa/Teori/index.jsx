import React, { useState, useEffect } from "react";
import { FaBookOpen, FaLightbulb, FaInfoCircle, FaChevronDown } from "react-icons/fa";
import * as Icons from "react-icons/fa";
import { teoriService } from "../../../services";
import { useNotification } from "../../../context/NotificationContext";
// eslint-disable-next-line no-unused-vars
import { motion, AnimatePresence } from "framer-motion";

export default function TeoriPendukungPage() {
  const { showNotif } = useNotification();
  const [teoriList, setTeoriList] = useState([]);
  const [loading, setLoading] = useState(true);
  const [expandedId, setExpandedId] = useState(null);

  const fetchTeori = async () => {
    setLoading(true);
    try {
      const ress = await teoriService.getAll();
      if (ress?.status) {
        const extracted = ress?.data?.items || ress?.data || [];
        setTeoriList(Array.isArray(extracted) ? extracted : []);
      }
    } catch (error) {
      console.error("Error fetching teori:", error);
      showNotif("error", "Gagal memuat teori pendukung");
    } finally {
      setLoading(false);
    }
  };

  useEffect(() => {
    fetchTeori();
  }, []);

  const toggleExpand = (id) => {
    setExpandedId(expandedId === id ? null : id);
  };

  if (loading) {
    return (
      <div className="flex flex-col items-center justify-center py-20">
        <div className="loading loading-spinner loading-lg text-primary"></div>
        <p className="mt-4 font-bold text-base-content/50 text-sm">Menyiapkan Materi...</p>
      </div>
    );
  }

  return (
    <div className="flex flex-col gap-6 pt-2 pb-10 px-1">
      {/* Page Title Header */}
      <div className="flex flex-col">
          <div className="flex items-center gap-2 text-primary font-black text-sm uppercase tracking-widest mb-2">
             <span className="w-6 h-0.5 bg-primary rounded-full" />
             Wawasan Ilmu
          </div>
          <h1 className="text-2xl font-black text-base-content leading-tight flex items-center gap-2">
             <FaBookOpen className="text-primary" /> Teori Pendukung
          </h1>
          <p className="text-xs font-bold text-base-content/50 mt-1">7 Kebiasaan Anak Indonesia Hebat</p>
      </div>

      {/* Animated Info Banner */}
      <div className="card bg-gradient-to-br from-info/10 to-primary/5 border border-info/20 shadow-sm rounded-2xl overflow-hidden">
         <div className="p-4 flex items-start gap-4">
            <div className="w-12 h-12 rounded-2xl bg-white shadow-sm flex items-center justify-center text-2xl shrink-0 text-info">
               💡
            </div>
            <div className="flex-1">
               <h3 className="font-black text-info text-sm uppercase tracking-wide">Mengapa ini penting?</h3>
               <p className="text-xs font-bold text-base-content/70 leading-relaxed mt-0.5">
                  Membantu kamu memahami alasan setiap kebiasaan baik yang dilakukan agar karaktermu makin kuat! 🌟
               </p>
            </div>
         </div>
      </div>

      {/* The List */}
      <div className="flex flex-col gap-3">
        {teoriList.length === 0 ? (
          <div className="card bg-base-100 border-2 border-base-300 border-dashed rounded-3xl">
            <div className="card-body items-center justify-center text-center py-10">
              <div className="w-16 h-16 bg-base-200 rounded-full flex items-center justify-center text-3xl mb-3">
                 📚
              </div>
              <p className="font-black text-base-content/40">Belum ada teori yang dirilis.</p>
            </div>
          </div>
        ) : (
          teoriList.map((teori, idx) => {
            const IconComponent = Icons[teori.icon] || Icons.FaBook;
            const currentId = teori.idTeori || teori.id;
            const isOpen = expandedId === currentId;

            return (
              <motion.div 
                key={currentId} 
                initial={{ opacity: 0, y: 10 }}
                animate={{ opacity: 1, y: 0 }}
                transition={{ delay: idx * 0.1 }}
                className={`card bg-base-100 border-2 transition-all duration-300 shadow-sm rounded-3xl overflow-hidden hover:shadow-md hover:-translate-y-0.5
                  ${isOpen ? 'border-primary bg-gradient-to-b from-white to-primary/5 shadow-glow shadow-primary/5' : 'border-base-300/50'}
                `}
              >
                <div 
                  className="p-4 cursor-pointer flex flex-col"
                  onClick={() => toggleExpand(currentId)}
                >
                  <div className="flex items-center justify-between gap-3">
                    <div className="flex items-center gap-3 flex-1 min-w-0">
                       <div className={`w-12 h-12 rounded-2xl flex-shrink-0 flex items-center justify-center text-xl shadow-inner transition-all
                         ${isOpen ? 'bg-primary text-white rotate-6 scale-110' : 'bg-base-200 text-primary'}
                       `}>
                         <IconComponent />
                       </div>
                       <h3 className={`font-black text-base leading-tight transition-colors truncate
                         ${isOpen ? 'text-primary' : 'text-base-content/80'}
                       `}>
                          {teori.title}
                       </h3>
                    </div>
                    <div className={`w-8 h-8 rounded-full flex items-center justify-center text-xs transition-all duration-300 shrink-0
                       ${isOpen ? 'bg-primary/20 text-primary rotate-180' : 'bg-base-200 text-base-content/40'}
                    `}>
                       <FaChevronDown />
                    </div>
                  </div>

                  {!isOpen && (
                    <div className="pl-15 pr-2">
                        <p className="text-xs font-bold text-base-content/40 line-clamp-2 mt-1">
                          {(teori.desc || teori.description || "")
                            .replace(/<[^>]*>?/gm, "")
                            .replaceAll("&nbsp;", " ")
                            .replaceAll("&amp;", "&")
                            .replaceAll("&quot;", '"')
                            .replaceAll("&#39;", "'")
                            .trim()
                          }
                        </p>
                    </div>
                  )}

                  <AnimatePresence>
                    {isOpen && (
                      <motion.div 
                        initial={{ height: 0, opacity: 0 }}
                        animate={{ height: "auto", opacity: 1 }}
                        exit={{ height: 0, opacity: 0 }}
                        className="overflow-hidden"
                      >
                        <div className="pt-4 mt-4 border-t border-base-300/50 relative">
                          <div 
                            className="text-sm text-base-content/80 font-bold leading-relaxed prose prose-sm max-w-none prose-strong:text-primary prose-headings:text-base-content prose-headings:font-black"
                            dangerouslySetInnerHTML={{ 
                              __html: (teori.desc || teori.description || "").replaceAll("&nbsp;", " ") 
                            }}
                          />
                          
                          {teori.sumber && (
                            <div className="mt-5 bg-white/60 rounded-xl p-3 flex items-start gap-2.5 border border-base-300/40">
                               <span className="badge badge-xs badge-primary font-black px-1.5 py-2 text-[8px] tracking-wider uppercase shrink-0 mt-0.5">Sumber</span>
                               <span className="flex-1 text-[10px] font-bold text-base-content/60 leading-relaxed break-words">{teori.sumber}</span>
                            </div>
                          )}
                        </div>
                      </motion.div>
                    )}
                  </AnimatePresence>
                </div>
              </motion.div>
            );
          })
        )}
      </div>

      <div className="text-center mt-4 py-4 opacity-40 text-[10px] font-black uppercase tracking-widest">
          💡 Pengetahuan Adalah Kekuatan
      </div>
    </div>
  );
}