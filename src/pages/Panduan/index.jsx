import React, { useState } from 'react'
import { FaCheckSquare, FaDownload, FaExpand, FaTimes } from 'react-icons/fa'
import panduanGuruImg from '../../assets/panduan-guru.png'
import panduanSiswaImg from '../../assets/panduan-jurnal-siswa.png'
import panduanOrangTuaImg from '../../assets/panduan-angket-orangtua.png'

export default function KaihPanduanPage() {
    const [activeTab, setActiveTab] = useState('guru')
    const [isZoomed, setIsZoomed] = useState(false)

    const guides = {
        guru: {
            title: "Panduan Guru & Admin",
            subtitle: "Cara mengelola kelas, memantau absensi, dan melihat rekapitulasi jurnal/angket siswa.",
            image: panduanGuruImg,
            filename: "panduan-guru-admin.png"
        },
        siswa: {
            title: "Panduan Jurnal Siswa",
            subtitle: "Petunjuk pengisian aktivitas harian 7 KAIH dan angket mingguan untuk siswa.",
            image: panduanSiswaImg,
            filename: "panduan-jurnal-siswa.png"
        },
        orangtua: {
            title: "Panduan Angket Orang Tua",
            subtitle: "Petunjuk observasi wali murid dalam memantau kebiasaan baik anak di rumah.",
            image: panduanOrangTuaImg,
            filename: "panduan-angket-orangtua.png"
        }
    }

    const currentGuide = guides[activeTab]

    const handleDownload = () => {
        const link = document.createElement('a');
        link.href = currentGuide.image;
        link.download = currentGuide.filename;
        document.body.appendChild(link);
        link.click();
        document.body.removeChild(link);
    }

    return (
        <div className="py-4 flex flex-col gap-6">
            {/* Rich Header */}
            <div className="flex flex-col sm:flex-row justify-between items-start sm:items-center gap-4 bg-base-100 border-2 border-base-200 p-6 rounded-[2rem] shadow-lg shadow-base-200/40">
                <div className="flex items-center gap-4">
                   <div className="w-14 h-14 rounded-2xl bg-primary/10 border border-primary/20 flex items-center justify-center text-2xl text-primary shadow-inner">
                      <FaCheckSquare />
                   </div>
                   <div>
                      <h2 className="text-2xl font-black text-base-content">Panduan Sistem</h2>
                      <p className="text-xs font-bold text-base-content/50 uppercase tracking-widest mt-0.5">Petunjuk Penggunaan 7 Kebiasaan Anak Indonesia Hebat</p>
                   </div>
                </div>
            </div>

            {/* Tabs Selector */}
            <div className="grid grid-cols-3 gap-3 bg-base-200/50 p-2 rounded-2xl border border-base-300">
                <button
                    onClick={() => setActiveTab('guru')}
                    className={`py-3 px-4 rounded-xl font-black text-xs sm:text-sm transition-all duration-300 flex items-center justify-center gap-2 hover:scale-[1.02] active:scale-95 cursor-pointer
                        ${activeTab === 'guru' 
                            ? 'bg-primary text-white shadow-md' 
                            : 'text-base-content/60 hover:text-base-content hover:bg-base-200'}`}
                >
                    👨‍🏫 <span className="hidden sm:inline">Panduan</span> Guru
                </button>
                <button
                    onClick={() => setActiveTab('siswa')}
                    className={`py-3 px-4 rounded-xl font-black text-xs sm:text-sm transition-all duration-300 flex items-center justify-center gap-2 hover:scale-[1.02] active:scale-95 cursor-pointer
                        ${activeTab === 'siswa' 
                            ? 'bg-primary text-white shadow-md' 
                            : 'text-base-content/60 hover:text-base-content hover:bg-base-200'}`}
                >
                    🎒 <span className="hidden sm:inline">Panduan</span> Siswa
                </button>
                <button
                    onClick={() => setActiveTab('orangtua')}
                    className={`py-3 px-4 rounded-xl font-black text-xs sm:text-sm transition-all duration-300 flex items-center justify-center gap-2 hover:scale-[1.02] active:scale-95 cursor-pointer
                        ${activeTab === 'orangtua' 
                            ? 'bg-primary text-white shadow-md' 
                            : 'text-base-content/60 hover:text-base-content hover:bg-base-200'}`}
                >
                    👨‍👩‍👧 <span className="hidden sm:inline">Panduan</span> Wali Murid
                </button>
            </div>

            {/* Display Area */}
            <div className="bg-base-100 border-2 border-base-200 p-6 rounded-[2rem] shadow-xl flex flex-col gap-6 animate-in fade-in duration-300">
                <div className="flex flex-col sm:flex-row justify-between items-start sm:items-center gap-4">
                    <div>
                        <h3 className="text-xl font-black text-base-content tracking-tight">{currentGuide.title}</h3>
                        <p className="text-sm font-bold text-base-content/50 mt-1">{currentGuide.subtitle}</p>
                    </div>
                    
                    <div className="flex items-center gap-2 w-full sm:w-auto">
                        <button
                            onClick={() => setIsZoomed(true)}
                            className="btn btn-neutral flex-1 sm:flex-none font-black text-xs rounded-xl shadow-md flex items-center justify-center gap-2 border-none"
                        >
                            <FaExpand /> Perbesar Gambar
                        </button>
                        <button
                            onClick={handleDownload}
                            className="btn btn-primary flex-1 sm:flex-none font-black text-xs text-white rounded-xl shadow-md flex items-center justify-center gap-2 border-none"
                        >
                            <FaDownload /> Unduh Gambar
                        </button>
                    </div>
                </div>

                {/* Image Card Container */}
                <div className="relative w-full overflow-hidden border border-base-200 rounded-3xl bg-base-200/50 shadow-inner group">
                    <div className="aspect-[16/10] w-full flex items-center justify-center overflow-auto max-h-[600px]">
                        <img 
                            src={currentGuide.image} 
                            alt={currentGuide.title} 
                            className="w-full h-auto max-w-full object-contain cursor-pointer transition-transform duration-300 hover:scale-[1.01]"
                            onClick={() => setIsZoomed(true)}
                        />
                    </div>
                </div>
            </div>

            {/* Lightbox / Zoomed View Modal */}
            {isZoomed && (
                <div className="fixed inset-0 z-[9999] flex flex-col bg-black/90 backdrop-blur-md animate-in fade-in duration-300">
                    {/* Modal Header Controls */}
                    <div className="p-4 flex items-center justify-between border-b border-white/10 z-10 bg-black/40">
                        <div className="text-white">
                            <h4 className="font-black text-lg leading-tight">{currentGuide.title}</h4>
                            <p className="text-xs text-white/60 mt-0.5">Membaca dalam mode layar penuh</p>
                        </div>
                        <div className="flex items-center gap-3">
                            <button
                                onClick={handleDownload}
                                className="btn btn-primary btn-sm text-white font-black text-xs rounded-xl shadow-md flex items-center justify-center gap-2 border-none"
                            >
                                <FaDownload /> Unduh
                            </button>
                            <button
                                onClick={() => setIsZoomed(false)}
                                className="btn btn-circle btn-sm bg-white/10 hover:bg-white/20 border-none text-white flex items-center justify-center"
                            >
                                <FaTimes />
                            </button>
                        </div>
                    </div>

                    {/* Image Viewer Container */}
                    <div className="flex-1 overflow-auto p-4 flex items-center justify-center">
                        <img 
                            src={currentGuide.image} 
                            alt={currentGuide.title} 
                            className="max-w-full h-auto max-h-[85vh] object-contain select-none shadow-2xl"
                        />
                    </div>
                </div>
            )}
        </div>
    )
}