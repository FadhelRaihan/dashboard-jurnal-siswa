import React, { useState } from 'react'
import ClickableCard from '../../components/organism/ClickableCard'
import { cardData } from './cardData'
import CustomButton from '../../components/atoms/CustomButton'
import { FaChartLine, FaUserCheck, FaHeart, FaRunning, FaClock, FaPray, FaUtensils, FaUsers, FaMoon, FaBookOpen, FaBalanceScale, FaListUl, FaPaste, FaCopy, FaQrcode, FaFilePdf, FaExternalLinkAlt, FaVideo, FaLink, FaCheckSquare } from "react-icons/fa";
import { IoIosFlash, IoMdBook } from "react-icons/io";
import {
    Chart as ChartJS,
    CategoryScale,
    LinearScale,
    BarElement,
    Title,
    Tooltip,
    Legend
} from 'chart.js';
import { useNavigate } from 'react-router-dom';
import CustomModal from '../../components/organism/CustomModal';
import infografisPdf from '../../assets/pdf/infografis.pdf';

ChartJS.register(CategoryScale, LinearScale, BarElement, Title, Tooltip, Legend)

export default function DashboardPage() {
    const navigate = useNavigate();
    const [isModalOpen, setIsModalOpen] = useState(false);
    const [modalConfig, setModalConfig] = useState({ title: '', message: '', type: 'primary' });

    const handleCopy = async (path) => {
        const fullUrl = `${window.location.origin}${path}`;
        let success = false;

        if (navigator.clipboard && navigator.clipboard.writeText) {
            try {
                await navigator.clipboard.writeText(fullUrl);
                success = true;
            } catch { success = false; }
        } else {
            const textArea = document.createElement("textarea");
            textArea.value = fullUrl;
            document.body.appendChild(textArea);
            textArea.select();
            success = document.execCommand('copy');
            document.body.removeChild(textArea);
        }

        if (success) {
            setModalConfig({
                title: "Tersalin! ✨",
                message: `Tautan untuk "${path}" sudah disalin ke clipboard Anda.`,
                type: "success"
            });
            setIsModalOpen(true);
        }
    };

    const handleOpenPDF = () => {
        window.open(infografisPdf, '_blank');
    };

    return (
        <div className='space-y-8 py-2'>
            
            {/* Section Header Ringkasan */}
            <div className="flex items-center gap-3 mb-2">
                <div className="w-12 h-12 rounded-2xl bg-primary/20 text-primary flex items-center justify-center text-2xl shadow-inner font-black">
                    🚀
                </div>
                <div>
                    <h1 className="text-3xl font-black text-base-content tracking-tight">Ringkasan Dashboard</h1>
                    <p className="text-base-content/60 font-bold text-sm">Pantau ekosistem pembelajaran dalam satu layar.</p>
                </div>
            </div>

            {/* Top Panels Grid */}
            <div className='grid grid-cols-1 lg:grid-cols-3 gap-6'>

                {/* CARD 1: PANDUAN PENGGUNAAN VIDEO */}
                <div className="card w-full bg-base-100 shadow-card rounded-3xl border border-base-300/40 overflow-hidden group">
                    <div className="bg-gradient-to-r from-info/10 to-primary/10 p-5 border-b border-base-300/30 flex items-center gap-3">
                        <div className="w-10 h-10 rounded-xl bg-info text-white flex items-center justify-center text-lg shadow-md shadow-info/20 group-hover:rotate-6 transition-transform">
                            <FaVideo />
                        </div>
                        <h2 className="font-black text-lg text-base-content">Video Panduan</h2>
                    </div>
                    <div className="card-body p-5 items-center">
                        <div className="w-full rounded-2xl overflow-hidden border border-base-300 shadow-lg relative group-hover:shadow-xl transition-all">
                            <iframe
                                src="https://drive.google.com/file/d/1epjKjj1sbCz7IOEevdNAzv2YnoGLstgk/preview"
                                className="w-full aspect-video bg-black"
                                allow="autoplay"
                                allowFullScreen
                            />
                        </div>
                    </div>
                </div>

                {/* CARD 2: QUICK ACTIONS (Instrumen 7 KAIH) */}
                <div className="card w-full bg-base-100 shadow-card rounded-3xl border border-base-300/40 overflow-hidden group">
                    <div className="bg-gradient-to-r from-accent/10 to-warning/10 p-5 border-b border-base-300/30 flex items-center gap-3">
                        <div className="w-10 h-10 rounded-xl bg-accent text-accent-content flex items-center justify-center text-lg shadow-md shadow-accent/20 group-hover:scale-110 transition-transform">
                            <IoIosFlash />
                        </div>
                        <h2 className="font-black text-lg text-base-content">Pintasan Cepat</h2>
                    </div>
                    <div className="card-body p-6 flex flex-col gap-4">
                        
                        {/* Action Row 1 */}
                        <div className="flex gap-2">
                            <button 
                                onClick={() => navigate('/siswa/jurnal')}
                                className="flex-1 btn btn-md bg-primary/10 hover:bg-primary text-primary hover:text-white border-none font-bold rounded-xl transition-all shadow-sm gap-2 justify-start px-4"
                            >
                                <IoMdBook className="text-lg" /> Isi Jurnal
                            </button>
                            <button 
                                onClick={() => handleCopy('/siswa/jurnal')}
                                className="btn btn-md btn-square bg-base-200 hover:bg-primary hover:text-white border-none rounded-xl transition-all text-base-content/60 shadow-sm"
                                title="Salin Link"
                            >
                                <FaLink />
                            </button>
                        </div>

                        {/* Action Row 2 */}
                        <div className="flex gap-2">
                            <button 
                                onClick={() => navigate('/orang-tua/angket')}
                                className="flex-1 btn btn-md bg-secondary/10 hover:bg-secondary text-secondary hover:text-white border-none font-bold rounded-xl transition-all shadow-sm gap-2 justify-start px-4"
                            >
                                <FaUsers className="text-lg" /> Validasi Ortu
                            </button>
                            <button 
                                onClick={() => handleCopy('/orang-tua/angket')}
                                className="btn btn-md btn-square bg-base-200 hover:bg-secondary hover:text-white border-none rounded-xl transition-all text-base-content/60 shadow-sm"
                                title="Salin Link"
                            >
                                <FaLink />
                            </button>
                        </div>

                        <button 
                            onClick={() => handleCopy('/bias')}
                            className="w-full btn btn-md bg-accent/10 hover:bg-accent text-accent-content border-none font-bold rounded-xl shadow-sm gap-2"
                        >
                            <FaBalanceScale /> Cek Bias Respon (IDRES)
                        </button>
                    </div>
                </div>

                {/* CARD 3: INFOGRAFIS & PDF */}
                <div className="card w-full bg-base-100 shadow-card rounded-3xl border border-base-300/40 overflow-hidden group">
                    <div className="bg-gradient-to-r from-secondary/10 to-error/10 p-5 border-b border-base-300/30 flex items-center gap-3">
                        <div className="w-10 h-10 rounded-xl bg-secondary text-white flex items-center justify-center text-lg shadow-md shadow-secondary/20 group-hover:-rotate-6 transition-transform">
                            <FaFilePdf />
                        </div>
                        <h2 className="font-black text-lg text-base-content">Media Pendukung</h2>
                    </div>
                    <div className="card-body p-6 flex flex-col">
                        <p className="text-sm font-bold text-base-content/60 mb-6 leading-relaxed">
                            Ringkasan visual praktis mengenai indikator dan teknis pelaksanaan program 7 Kebiasaan.
                        </p>
                        
                        <div className="mt-auto border-t border-base-200/50 pt-4">
                            <CustomButton
                                type="secondary"
                                className="w-full h-12 text-sm font-black shadow-secondary/20 group"
                                onClick={handleOpenPDF}
                            >
                                <FaExternalLinkAlt className="text-xs group-hover:scale-110 transition-transform" />
                                Unduh Infografis Program
                            </CustomButton>
                        </div>
                    </div>
                </div>

            </div>

            {/* Bottom Section: Program 7 Kebiasaan Items */}
            <div className='mt-4 relative'>
                <div className="flex items-center justify-between mb-6 px-1">
                    <div>
                        <h3 className='text-xl font-black text-base-content flex items-center gap-2'>
                            <span className="text-2xl">⭐</span> Indikator Program 7 KAIH
                        </h3>
                        <p className="text-xs font-bold text-base-content/50 mt-0.5">Tujuh Pilar Kebiasaan Anak Indonesia Hebat</p>
                    </div>
                    <div className="h-px flex-1 bg-gradient-to-r from-base-300/50 to-transparent ml-4 hidden sm:block"></div>
                </div>
                
                <div className='grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 xl:grid-cols-4 gap-5'>
                    {cardData.map((item, i) => (
                        <ClickableCard
                            key={i}
                            to={item.to}
                            title={item.title}
                            desk={item.desk}
                            icon={item.icon}
                        />
                    ))}
                </div>
            </div>

            {/* MODAL NOTIFIKASI PREMIUM */}
            <CustomModal
                isOpen={isModalOpen}
                onClose={() => setIsModalOpen(false)}
                onConfirm={() => setIsModalOpen(false)}
                title={modalConfig.title}
                confirmText="Siap, Mengerti!"
                type={modalConfig.type}
            >
                <div className="flex flex-col items-center py-6 text-center px-4">
                    <div className="w-20 h-20 rounded-full bg-success/10 text-success flex items-center justify-center text-4xl mb-4 shadow-inner animate-pulse">
                        <FaCheckSquare />
                    </div>
                    <p className="font-bold text-base-content/80 text-lg leading-relaxed">{modalConfig.message}</p>
                </div>
            </CustomModal>
        </div>
    )
}