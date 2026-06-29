import React from 'react';
import { useNavigate } from 'react-router-dom';
import { 
    FaBookOpen, FaClock, FaMoon, FaPray, FaRunning, 
    FaUsers, FaUtensils, FaMobileAlt, FaGraduationCap, 
    FaHeart, FaChartLine 
} from "react-icons/fa";
import { IoIosFlash } from "react-icons/io";
import CustomButton from '../../components/atoms/CustomButton';
import logoUpi from '../../assets/logo-upi.png';

const KAIH_PILLARS = [
    { title: "Bangun Pagi", icon: <FaClock />, color: "bg-primary", desc: "Awali hari dengan segar pukul 04.30 - 06.00 WIB" },
    { title: "Beribadah", icon: <FaPray />, color: "bg-secondary", desc: "Kewajiban Shalat 5 Waktu & Mengaji" },
    { title: "Makan Sehat", icon: <FaUtensils />, color: "bg-info", desc: "Gizi seimbang 4 Sehat 5 Sempurna" },
    { title: "Gemar Belajar", icon: <FaBookOpen />, color: "bg-success", desc: "Membaca & literasi harian 30-60 Menit" },
    { title: "Berolahraga", icon: <FaRunning />, color: "bg-accent", desc: "Aktivitas fisik menjaga kebugaran tubuh" },
    { title: "Bermasyarakat", icon: <FaUsers />, color: "bg-warning", desc: "Sosialisasi baik di lingkungan rumah & sekolah" },
    { title: "Tidur Cepat", icon: <FaMoon />, color: "bg-neutral", desc: "Istirahat cukup pukul 20.30 - 22.00 WIB" },
];

export default function LandingPage() {
    const navigate = useNavigate();

    return (
        <div className="min-h-screen bg-base-100 flex flex-col font-sans overflow-x-hidden relative selection:bg-primary/30 selection:text-primary">
            
            {/* Dekorasi Blobs Latar Belakang */}
            <div className="fixed top-0 left-0 w-full h-full overflow-hidden pointer-events-none z-0">
                <div className="absolute -top-[10%] -left-[10%] w-[500px] h-[500px] bg-primary/10 rounded-full blur-[100px] animate-pulse"></div>
                <div className="absolute top-[20%] -right-[10%] w-[400px] h-[400px] bg-secondary/10 rounded-full blur-[100px] animate-bounce-slow" style={{ animationDelay: '1s' }}></div>
                <div className="absolute -bottom-[20%] left-[20%] w-[600px] h-[600px] bg-accent/10 rounded-full blur-[120px] animate-bounce-slow" style={{ animationDelay: '2s' }}></div>
            </div>

            {/* Navbar */}
            <nav className="glass-nav px-4 md:px-8 lg:px-12 py-4 flex items-center justify-between relative z-50 transition-all duration-300">
                <div className="flex items-center gap-3">
                    <img src={logoUpi} alt="Logo UPI" className="h-10 md:h-12 object-contain" />
                    <div className="hidden md:block">
                        <h1 className="font-black text-xl text-base-content leading-tight">Jurnal KAIH</h1>
                        <p className="text-xs font-bold text-base-content/50 uppercase tracking-widest">Digital App</p>
                    </div>
                </div>
                <div>
                    <CustomButton 
                        type="neutral" 
                        onClick={() => navigate('/dashboard')}
                        className="px-6 rounded-2xl shadow-lg shadow-neutral/20 text-sm md:text-base font-black border-2 border-transparent hover:border-neutral/30 group"
                    >
                        Portal Guru <FaGraduationCap className="text-lg group-hover:rotate-12 transition-transform" />
                    </CustomButton>
                </div>
            </nav>

            {/* Hero Section */}
            <main className="flex-1 relative z-10 w-full max-w-7xl mx-auto px-4 md:px-8 lg:px-12 pt-12 md:pt-20 pb-20 flex flex-col lg:flex-row items-center gap-12 lg:gap-8">
                
                {/* Left Column: Teks & CTA */}
                <div className="flex-1 text-center lg:text-left space-y-8 max-w-3xl">
                    <div className="inline-flex items-center gap-2 px-4 py-2 rounded-full bg-base-200 border border-base-300/50 shadow-sm text-sm font-bold text-base-content/70 animate-bounce-slow">
                        <IoIosFlash className="text-accent text-lg" />
                        Aplikasi Pencatat Kebiasaan Baik
                    </div>
                    
                    <h2 className="text-4xl md:text-5xl lg:text-6xl font-black text-base-content leading-[1.1] tracking-tight text-balance-fix">
                        Membentuk Karakter Unggul Ananda Secara <span className="text-transparent bg-clip-text bg-gradient-brand animate-pulse">Menyenangkan!</span>
                    </h2>
                    
                    <p className="text-lg md:text-xl text-base-content/60 font-semibold leading-relaxed max-w-2xl mx-auto lg:mx-0">
                        Jurnal 7 Kebiasaan Anak Indonesia Hebat (KAIH) versi digital yang ramah anak. Mari pantau aktivitas positif harian dari mana saja, kapan saja.
                    </p>

                    <div className="flex flex-col sm:flex-row items-center gap-4 justify-center lg:justify-start pt-4">
                        <CustomButton 
                            type="primary" 
                            onClick={() => navigate('/siswa/login')}
                            className="w-full sm:w-auto px-8 h-14 text-lg font-black shadow-primary/30 rounded-2xl border-b-4 border-primary/40 active:border-b-0 active:translate-y-1 hover:-translate-y-1 group"
                        >
                            🎒 Masuk Siswa
                        </CustomButton>
                        <CustomButton 
                            type="secondary" 
                            onClick={() => navigate('/orang-tua/login')}
                            className="w-full sm:w-auto px-8 h-14 text-lg font-black shadow-secondary/30 rounded-2xl border-b-4 border-secondary/40 active:border-b-0 active:translate-y-1 hover:-translate-y-1 group"
                        >
                            👨‍👩‍👧 Masuk Orang Tua
                        </CustomButton>
                    </div>
                </div>

                {/* Right Column: Visual Mockup Smartphone CSS */}
                <div className="flex-1 flex justify-center w-full relative perspective-1000">
                    <div className="w-[280px] md:w-[320px] h-[580px] md:h-[640px] bg-base-100 rounded-[2.5rem] border-8 border-base-300 shadow-[0_20px_50px_-10px_rgba(0,0,0,0.2)] p-4 relative overflow-hidden flex flex-col transform rotate-y-[-5deg] rotate-x-[5deg] animate-bounce-slow">
                        
                        {/* Notch Mockup */}
                        <div className="absolute top-0 left-1/2 -translate-x-1/2 w-32 h-6 bg-base-300 rounded-b-2xl z-20"></div>
                        
                        {/* Mockup Screen Content (Siswa Dashboard Preview) */}
                        <div className="w-full h-full bg-base-200/50 rounded-[1.8rem] overflow-hidden flex flex-col relative">
                            {/* Mock Header */}
                            <div className="h-32 bg-primary relative pt-10 px-4">
                                <div className="text-white">
                                    <h3 className="font-black text-xl">Halo, Siswa! ✨</h3>
                                    <p className="text-xs font-bold opacity-80 mt-1 bg-black/20 inline-block px-2 py-1 rounded-full">Semangat belajarnya ya!</p>
                                </div>
                            </div>
                            
                            {/* Mock Cards */}
                            <div className="flex-1 px-3 pt-6 pb-20 overflow-hidden space-y-3 relative z-10 -mt-4">
                                <div className="bg-base-100 rounded-2xl p-3 shadow-sm border border-base-200 flex items-center gap-3">
                                    <div className="w-10 h-10 rounded-xl bg-info text-white flex items-center justify-center text-lg"><FaBookOpen/></div>
                                    <div className="flex-1">
                                        <div className="h-3 w-24 bg-base-300 rounded-full mb-2"></div>
                                        <div className="h-2 w-16 bg-base-200 rounded-full"></div>
                                    </div>
                                    <div className="w-6 h-6 rounded-full bg-success/20 flex items-center justify-center text-success text-xs">✓</div>
                                </div>
                                <div className="bg-base-100 rounded-2xl p-3 shadow-sm border border-base-200 flex items-center gap-3">
                                    <div className="w-10 h-10 rounded-xl bg-secondary text-white flex items-center justify-center text-lg"><FaPray/></div>
                                    <div className="flex-1">
                                        <div className="h-3 w-20 bg-base-300 rounded-full mb-2"></div>
                                        <div className="h-2 w-14 bg-base-200 rounded-full"></div>
                                    </div>
                                </div>
                                <div className="bg-base-100 rounded-2xl p-3 shadow-sm border border-base-200 flex items-center gap-3">
                                    <div className="w-10 h-10 rounded-xl bg-accent text-accent-content flex items-center justify-center text-lg"><FaRunning/></div>
                                    <div className="flex-1">
                                        <div className="h-3 w-28 bg-base-300 rounded-full mb-2"></div>
                                        <div className="h-2 w-20 bg-base-200 rounded-full"></div>
                                    </div>
                                </div>
                            </div>

                            {/* Mock Bottom Nav */}
                            <div className="absolute bottom-4 left-1/2 -translate-x-1/2 w-[90%] h-14 bg-base-100/90 backdrop-blur-md rounded-2xl shadow-lg border border-base-200 flex items-center justify-around px-2">
                                <div className="w-8 h-8 rounded-xl bg-primary/10 flex items-center justify-center"><div className="w-4 h-4 bg-primary rounded"></div></div>
                                <div className="w-8 h-8 rounded-xl bg-primary flex items-center justify-center shadow-md -translate-y-2"><div className="w-4 h-4 bg-white rounded-full"></div></div>
                                <div className="w-8 h-8 rounded-xl bg-base-200 flex items-center justify-center"><div className="w-4 h-4 bg-base-300 rounded"></div></div>
                            </div>
                        </div>
                    </div>
                </div>
            </main>

            {/* Mobile-First Info Section */}
            <section className="relative z-10 bg-base-200/50 py-20 px-4">
                <div className="max-w-6xl mx-auto">
                    <div className="text-center mb-16">
                        <h2 className="text-3xl md:text-4xl font-black text-base-content mb-4">Dirancang Khusus <span className="text-secondary">Mobile-First</span> 📱</h2>
                        <p className="text-base-content/60 font-semibold max-w-2xl mx-auto text-lg">
                            Pengalaman menggunakan Jurnal KAIH sangat mudah dan ramah anak. Cukup ketuk layar HP, tanpa ribet mengetik!
                        </p>
                    </div>

                    <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-8">
                        {/* Feature 1 */}
                        <div className="card-playful p-8 group">
                            <div className="w-16 h-16 rounded-2xl bg-info/10 text-info text-3xl flex items-center justify-center mb-6 group-hover:scale-110 transition-transform">
                                <FaMobileAlt />
                            </div>
                            <h3 className="text-xl font-black mb-3">Ketuk & Simpan</h3>
                            <p className="text-base-content/60 font-bold leading-relaxed">Antarmuka harian siswa menggunakan tombol emoji interaktif. Memasukkan data kebiasaan jadi seperti bermain game yang menyenangkan.</p>
                        </div>
                        {/* Feature 2 */}
                        <div className="card-playful p-8 group">
                            <div className="w-16 h-16 rounded-2xl bg-secondary/10 text-secondary text-3xl flex items-center justify-center mb-6 group-hover:scale-110 transition-transform">
                                <FaHeart />
                            </div>
                            <h3 className="text-xl font-black mb-3">Akses Orang Tua</h3>
                            <p className="text-base-content/60 font-bold leading-relaxed">Pantau perkembangan ananda langsung dari layar smartphone Ayah/Bunda. Isi angket mingguan dengan cepat tiap hari Senin.</p>
                        </div>
                        {/* Feature 3 */}
                        <div className="card-playful p-8 group">
                            <div className="w-16 h-16 rounded-2xl bg-primary/10 text-primary text-3xl flex items-center justify-center mb-6 group-hover:scale-110 transition-transform">
                                <FaChartLine />
                            </div>
                            <h3 className="text-xl font-black mb-3">Monitoring Cerdas</h3>
                            <p className="text-base-content/60 font-bold leading-relaxed">Bagi sekolah, fitur dashboard lengkap disediakan untuk mengukur capaian siswa secara otomatis beserta deteksi Bias Respon.</p>
                        </div>
                    </div>
                </div>
            </section>

            {/* 7 Pilar Section */}
            <section className="relative z-10 py-20 px-4">
                <div className="max-w-7xl mx-auto text-center">
                    <h2 className="text-3xl md:text-4xl font-black text-base-content mb-12">7 Pilar Kebiasaan Anak Hebat ⭐</h2>
                    
                    <div className="flex flex-wrap justify-center gap-4 md:gap-6">
                        {KAIH_PILLARS.map((pillar, idx) => (
                            <div key={idx} className="bg-base-100 rounded-3xl p-6 shadow-sm border border-base-200 hover:shadow-card-hover transition-all w-full sm:w-[calc(50%-12px)] lg:w-[calc(25%-18px)] flex flex-col items-center text-center group">
                                <div className={`w-14 h-14 rounded-2xl ${pillar.color} text-white flex items-center justify-center text-2xl mb-4 shadow-md group-hover:scale-110 group-hover:rotate-6 transition-transform`}>
                                    {pillar.icon}
                                </div>
                                <h3 className="font-black text-lg mb-2">{pillar.title}</h3>
                                <p className="text-sm font-bold text-base-content/50 leading-relaxed">{pillar.desc}</p>
                            </div>
                        ))}
                    </div>
                </div>
            </section>

            {/* Footer */}
            <footer className="relative z-10 bg-base-100 py-10 px-4 border-t border-base-200 mt-auto">
                <div className="max-w-7xl mx-auto flex flex-col md:flex-row items-center justify-between gap-4 text-center md:text-left">
                    <div className="flex items-center gap-3">
                        <img src={logoUpi} alt="Logo UPI" className="h-8 grayscale opacity-50" />
                        <div>
                            <p className="font-black text-base-content/50 text-sm">Jurnal 7 KAIH Digital</p>
                            <p className="text-xs font-bold text-base-content/40">&copy; 2026 Denisha Oktaviane</p>
                        </div>
                    </div>
                    <div>
                        <p className="text-xs font-bold text-base-content/40 bg-base-200 px-4 py-2 rounded-xl">Dioptimalkan untuk Google Chrome & Safari Mobile</p>
                    </div>
                </div>
            </footer>
        </div>
    );
}
