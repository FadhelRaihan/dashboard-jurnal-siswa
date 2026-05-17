import React, { useState } from 'react';
import { Outlet, NavLink } from 'react-router-dom';
import { FaHome, FaCalendarDay, FaBookOpen, FaSchool, FaLock, FaBalanceScaleLeft, FaSignOutAlt } from "react-icons/fa";
import bgHero from '../assets/hero-guru.png';
import logoUpi from '../assets/logo-upi.png';

export default function MainLayout() {
    // Lazy initialize auth to avoid useEffect synchronization rendering cascades
    const [isAuthenticated, setIsAuthenticated] = useState(() => {
        try {
            const app = sessionStorage.getItem("app_session");
            if (app) {
                const data = JSON.parse(app);
                if (data.type === 'guru' && new Date().getTime() < data.expiry) return true;
            }
            const legacy = sessionStorage.getItem("auth_guru");
            if (legacy) {
                const data = JSON.parse(legacy);
                if (new Date().getTime() < data.expiry) return true;
            }
        } catch {
            //
        }
        return false;
    });

    const [role, setRole] = useState(() => {
        try {
            const app = sessionStorage.getItem("app_session");
            if (app) {
                const data = JSON.parse(app);
                if (data.type === 'guru' && new Date().getTime() < data.expiry) return data.role;
            }
            const legacy = sessionStorage.getItem("auth_guru");
            if (legacy) {
                const data = JSON.parse(legacy);
                if (new Date().getTime() < data.expiry) return data.role;
            }
        } catch {
            //
        }
        return null;
    });

    const [pinInput, setPinInput] = useState("");
    const [error, setError] = useState("");

    const PIN_GURU_UTAMA = "123456";
    const PIN_GURU_BIASA = "654321";

    const handleLogin = (e) => {
        e.preventDefault();
        let userRole = null;

        if (pinInput === PIN_GURU_UTAMA) userRole = "admin";
        else if (pinInput === PIN_GURU_BIASA) userRole = "user";

        if (userRole) {
            sessionStorage.clear();
            localStorage.clear();

            const authData = {
                role: userRole, 
                type: 'guru',   
                name: userRole === 'admin' ? 'Guru Utama' : 'Guru Biasa',
                expiry: new Date().getTime() + (2 * 60 * 60 * 1000)
            };

            sessionStorage.setItem("app_session", JSON.stringify(authData));
            setIsAuthenticated(true);
            setRole(userRole);
            setError("");
        } else {
            setError("Ups! PIN salah nih. Coba lagi yuk.");
        }
    };

    const menus = [
        {
            to: "/dashboard",
            label: "Dashboard",
            full: "Dashboard",
            icon: <FaHome />,
            colorClass: "btn-primary",
            public: true
        },
        {
            to: "/master-data",
            label: "Master Data",
            full: "Master Data Sekolah Dan Siswa",
            icon: <FaSchool />,
            colorClass: "btn-secondary",
            public: true
        },
        {
            to: "/panduan",
            label: "Panduan",
            full: "Panduan Pengisian",
            icon: <FaCalendarDay />,
            colorClass: "btn-accent",
            public: true
        },
        {
            to: "/teori",
            label: "Teori",
            full: "Teori",
            icon: <FaBookOpen />,
            colorClass: "btn-info",
            public: true
        },
        {
            to: "/jurnal",
            label: "Jurnal",
            full: "Rekap Jurnal Siswa",
            icon: <FaBookOpen />,
            colorClass: "btn-success",
            public: true
        },
        {
            to: "/angket",
            label: "Angket",
            full: "Rekap Angket Mingguan",
            icon: <FaBookOpen />,
            colorClass: "btn-warning",
            public: true
        },
        {
            to: "/bias",
            label: "Bias",
            full: "Rekap Bias ",
            icon: <FaBalanceScaleLeft />,
            colorClass: "btn-neutral",
            public: true
        },
    ].filter(menu => role === 'admin' || menu.public);

    if (!isAuthenticated) {
        return (
            <div className="min-h-screen w-screen flex items-center justify-center bg-base-200 bg-pattern-dots p-6">
                <div className="card w-full max-w-md bg-base-100 shadow-card border-t-8 border-primary rounded-3xl overflow-hidden relative">
                    <div className="h-2 w-full bg-gradient-to-r from-primary via-secondary to-accent absolute top-0 left-0" />
                    <div className="card-body p-8 items-center text-center">
                        <div className="avatar mb-4">
                            <div className="w-24 rounded-full ring ring-primary ring-offset-base-100 ring-offset-2 bg-white p-2 flex items-center justify-center">
                                <img src={logoUpi} alt="Logo" className="object-contain" />
                            </div>
                        </div>
                        <h2 className="card-title text-3xl font-black text-base-content mb-1">Halo, Guru Hebat! 👩‍🏫</h2>
                        <p className="text-base-content/70 mb-6 font-medium">Yuk, masukkan PIN keamanan untuk masuk ke dashboard.</p>

                        <form onSubmit={handleLogin} className="w-full space-y-6">
                            <div className="form-control w-full">
                                <div className="relative">
                                    <input
                                        type="password"
                                        placeholder="••••••"
                                        className={`input input-bordered border-2 input-lg w-full text-center tracking-[0.5em] font-black rounded-2xl focus:input-primary transition-all ${error ? 'input-error' : ''}`}
                                        value={pinInput}
                                        onChange={(e) => setPinInput(e.target.value)}
                                        autoFocus
                                    />
                                </div>
                                {error && (
                                    <label className="label py-2">
                                        <span className="label-text-alt text-error font-bold flex items-center gap-1 mx-auto text-sm">
                                            ⚠️ {error}
                                        </span>
                                    </label>
                                )}
                            </div>
                            
                            <button type="submit" className="btn btn-primary btn-lg w-full rounded-2xl font-black shadow-lg shadow-primary/30 hover:-translate-y-0.5 transition-all duration-200 gap-2">
                                🚀 Mulai Mengelola
                            </button>
                        </form>
                    </div>
                </div>
            </div>
        );
    }

    return (
        <div className="min-h-screen bg-base-200 bg-pattern-dots selection:bg-primary selection:text-white">
            <div className="w-full flex flex-col min-h-screen bg-base-100 shadow-lg">
                
                {/* Premium Vibrant Header Section */}
                <header className="relative overflow-hidden rounded-b-[3rem] md:rounded-b-[4rem] shadow-xl">
                    <div className="absolute inset-0 bg-[#78B664] opacity-75 z-10" />
                    <div 
                        className="absolute inset-0 bg-cover bg-center opacity-40 scale-105 transform transition-all duration-700"
                        style={{ backgroundImage: `url(${bgHero})` }}
                    />
                    
                    <div className="relative z-20 px-6 md:px-12 pt-12 pb-16 md:pt-16 md:pb-20 flex flex-col md:flex-row items-center justify-between gap-6">
                        <div className="text-center md:text-left flex flex-col md:flex-row items-center md:items-start gap-6">
                            <div className="bg-white/20 backdrop-blur-md p-4 rounded-[2rem] border border-white/40 shadow-2xl transform transition-transform hover:scale-105 duration-300">
                                <img src={logoUpi} alt="Logo UPI" className="h-16 md:h-20 object-contain drop-shadow-md" />
                            </div>
                            <div>
                                <span className="badge badge-accent font-extrabold tracking-widest mb-2 px-4 py-3 rounded-xl shadow-lg text-xs">MODE GURU</span>
                                <h1 className="text-4xl md:text-5xl font-black text-white mb-1 tracking-tight drop-shadow-xl">Digital Guru</h1>
                                <p className="text-white/90 font-bold text-lg max-w-xl drop-shadow-md leading-snug">Jurnal digital 7 Kebiasaan Anak Indonesia Hebat</p>
                            </div>
                        </div>
                        
                        <div className="hidden md:block transform transition-all hover:translate-x-1 duration-300">
                            <div className="bg-white/15 backdrop-blur-md px-6 py-5 rounded-[2rem] border border-white/25 text-white text-right shadow-2xl">
                                <p className="text-xs opacity-80 font-black uppercase tracking-wider mb-0.5">Selamat Bekerja,</p>
                                <p className="text-2xl font-black tracking-tight">{role === 'admin' ? 'Admin Guru' : 'Rekan Guru'} 👋</p>
                            </div>
                        </div>
                    </div>
                </header>

                {/* Modern Glassmorphism Overlapping Pill Navigation */}
                <nav className="sticky top-4 z-50 mx-4 lg:mx-auto max-w-6xl -mt-10 bg-base-100/90 backdrop-blur-xl border border-white shadow-2xl shadow-base-content/10 rounded-3xl md:rounded-[2.5rem] transition-all duration-300">
                    <div className="px-4 py-3 overflow-x-auto no-scrollbar">
                        <div className="flex items-center justify-start md:justify-center gap-1.5 md:gap-2 min-w-max md:min-w-full">
                            {menus.map((menu, index) => (
                                <NavLink
                                    key={index}
                                    to={menu.to}
                                    title={menu.full}
                                    className={({ isActive }) =>
                                        `btn btn-md rounded-2xl md:rounded-full font-extrabold flex items-center gap-2 transition-all duration-300 border-transparent
                                        ${isActive 
                                            ? `${menu.colorClass} shadow-lg shadow-${menu.colorClass}/20 text-white scale-[1.03]` 
                                            : `bg-transparent hover:bg-base-200 text-base-content/75 hover:text-base-content border border-transparent hover:scale-[1.02]`
                                        }`
                                    }
                                >
                                    <span className="text-lg">{menu.icon}</span>
                                    <span className="tracking-wide text-[13px]">{menu.label}</span>
                                </NavLink>
                            ))}
                            
                            <div className="divider divider-horizontal mx-0.5 opacity-30 h-8 self-center"></div>
                            
                            <button
                                onClick={() => { sessionStorage.clear(); window.location.reload(); }}
                                className="btn btn-ghost btn-md rounded-2xl md:rounded-full font-extrabold text-error flex gap-2 hover:bg-error/10 hover:scale-[1.02] transition-all duration-300"
                            >
                                <FaSignOutAlt />
                                <span className="hidden sm:inline tracking-wide text-[13px]">Keluar</span>
                            </button>
                        </div>
                    </div>
                </nav>

                {/* Main Content Area */}
                <main className="flex-1 bg-base-200/40 p-4 md:p-8 lg:p-10 relative">
                    <div className="w-full mx-auto px-2">
                        <Outlet context={{ role }} />
                    </div>
                </main>

                {/* Clean Modern Footer */}
                <footer className="bg-base-100 border-t border-base-300 py-6 px-8 flex flex-col sm:flex-row items-center justify-center gap-4 text-sm font-semibold text-base-content/60">
                    <div>&copy; 2026 Denisha Oktaviane Herawan</div>
                </footer>
            </div>
        </div>
    );
}