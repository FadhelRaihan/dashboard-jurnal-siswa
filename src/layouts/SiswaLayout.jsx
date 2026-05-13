import React, { useEffect, useState } from "react";
import { Outlet, NavLink, useNavigate } from "react-router-dom";
import {
  FaBook,
  FaBookOpen,
  FaUserGraduate,
  FaLightbulb,
  FaSignOutAlt,
  FaSmile,
  FaHome,
} from "react-icons/fa";
import bgHero from "../assets/hero-guru.png";
import CustomModal from "../components/organism/CustomModal";
import logoUpi from "../assets/logo-upi.png";

export default function SiswaLayout() {
  const navigate = useNavigate();
  const [isLogoutModalOpen, setIsLogoutModalOpen] = useState(false);

  const [session] = useState(() => {
    try {
      return JSON.parse(sessionStorage.getItem("app_session")) || null;
    } catch {
      return null;
    }
  });

  useEffect(() => {
    if (!session || session.type !== "siswa") {
      navigate("/siswa/login");
    }
  }, [session, navigate]);

  const confirmLogout = () => {
    sessionStorage.removeItem("app_session");
    setIsLogoutModalOpen(false);
    navigate("/siswa/login");
  };

  if (!session || session.type !== "siswa") return null;

  const user = session;

  return (
    <div className="min-h-screen w-full flex flex-col bg-base-100 relative overflow-hidden">
      {/* Soft Header Top */}
      <header className="sticky top-0 z-50 bg-base-100/95 backdrop-blur-md py-3 px-5 flex justify-between items-center border-b border-base-200 shadow-sm">
        <img src={logoUpi} alt="Logo UPI" className="h-7 object-contain" />
        <button
          onClick={() => setIsLogoutModalOpen(true)}
          className="flex items-center gap-1.5 text-[10px] font-black text-error bg-error/10 hover:bg-error hover:text-white transition-all duration-300 px-3 py-2 rounded-xl uppercase tracking-wider border border-error/10 cursor-pointer"
        >
          <FaSignOutAlt className="text-sm" />
          <span className="hidden xs:inline">Keluar</span>
        </button>
      </header>

      {/* Playful Header Area with Wave/Gradient style */}
      <div className="relative flex flex-col h-[180px] shrink-0">
        <div className="absolute inset-0 bg-[#78B664] opacity-75" />
        <div
          className="absolute inset-0 bg-cover bg-center opacity-40 scale-105 transform transition-all duration-700"
          style={{ backgroundImage: `url(${bgHero})` }}
        />

        <div className="relative z-10 flex flex-col items-center justify-center h-full pb-6 px-6 text-center text-white">
          <h1 className="text-2xl font-black drop-shadow-md tracking-tight">
            Halo, {user.nama?.split(" ")[0]}! ✨
          </h1>
          <p className="text-xs font-bold opacity-90 bg-white/20 px-3 py-1 rounded-full mt-1 backdrop-blur-sm">
            Semangat belajarnya ya!
          </p>
        </div>

        {/* Info Floating Card */}
        <div className="absolute -bottom-10 left-1/2 -translate-x-1/2 bg-base-100 shadow-card border border-base-200 rounded-2xl p-4 w-[90%] flex items-center gap-3 transition-transform hover:scale-[1.02]">
          <div className="w-12 h-12 rounded-xl bg-accent text-accent-content flex items-center justify-center text-2xl shadow-sm font-black">
            {user.nama?.charAt(0) || "S"}
          </div>
          <div className="flex-1 min-w-0">
            <h3 className="text-sm font-black text-base-content truncate leading-tight">
              {user.nama}
            </h3>
            <p className="text-xs text-base-content/60 font-bold mt-0.5 flex items-center gap-1">
              <span className="badge badge-xs badge-secondary"></span>
              {user.detailKelas || "Kelas Aktif"}
            </p>
          </div>
        </div>
      </div>

      {/* Spacing to clear the Info Floating Card */}
      <div className="h-14 flex-shrink-0"></div>

      {/* ✨ Premium Floating Island Bottom Navigation ✨ */}
      <div className="fixed bottom-6 left-1/2 -translate-x-1/2 w-[94%] max-w-[430px] bg-base-100/90 backdrop-blur-lg shadow-[0_20px_50px_-12px_rgba(0,0,0,0.18)] border border-white/60 rounded-[2.2rem] px-4 py-2.5 z-[100] flex justify-between items-center animate-in slide-in-from-bottom-10 duration-500">
        {/* 🏠 ITEM: BERANDA */}
        <NavLink
          to="/siswa/beranda"
          className={({ isActive }) =>
            `flex flex-col items-center gap-1 flex-1 py-1 transition-all duration-300 group relative cursor-pointer
                        ${isActive ? "scale-105" : "text-base-content/40 hover:text-base-content/75 hover:scale-102"}`
          }
        >
          {({ isActive }) => (
            <>
              <div
                className={`w-10 h-10 flex items-center justify-center rounded-2xl transition-all duration-500 ${isActive ? "bg-[#6366F1] text-white shadow-lg shadow-[#6366F1]/30 rotate-3" : "bg-transparent group-hover:bg-base-200"}`}
              >
                <FaHome className="text-lg" />
              </div>
              <span
                className={`text-[9px] font-black uppercase tracking-widest leading-none transition-all duration-300 ${isActive ? "opacity-100 text-[#6366F1] mt-0.5" : "opacity-60"}`}
              >
                Beranda
              </span>
            </>
          )}
        </NavLink>

        {/* 📝 ITEM: HARIAN (JURNAL) */}
        <NavLink
          to="/siswa/jurnal"
          className={({ isActive }) =>
            `flex flex-col items-center gap-1 flex-1 py-1 transition-all duration-300 group relative cursor-pointer
                        ${isActive ? "scale-105" : "text-base-content/40 hover:text-base-content/75 hover:scale-102"}`
          }
        >
          {({ isActive }) => (
            <>
              <div
                className={`w-10 h-10 flex items-center justify-center rounded-2xl transition-all duration-500 ${isActive ? "bg-primary text-white shadow-lg shadow-primary/30 rotate-3" : "bg-transparent group-hover:bg-base-200"}`}
              >
                <FaBook className="text-lg" />
              </div>
              <span
                className={`text-[9px] font-black uppercase tracking-widest leading-none transition-all duration-300 ${isActive ? "opacity-100 text-primary mt-0.5" : "opacity-60"}`}
              >
                Harian
              </span>
            </>
          )}
        </NavLink>

        {/* 🎓 ITEM: ANGKET */}
        <NavLink
          to="/siswa/angket"
          className={({ isActive }) =>
            `flex flex-col items-center gap-1 flex-1 py-1 transition-all duration-300 group relative cursor-pointer
                        ${isActive ? "scale-105" : "text-base-content/40 hover:text-base-content/75 hover:scale-102"}`
          }
        >
          {({ isActive }) => (
            <>
              <div
                className={`w-10 h-10 flex items-center justify-center rounded-2xl transition-all duration-500 ${isActive ? "bg-secondary text-white shadow-lg shadow-secondary/30 -rotate-3" : "bg-transparent group-hover:bg-base-200"}`}
              >
                <FaUserGraduate className="text-lg" />
              </div>
              <span
                className={`text-[9px] font-black uppercase tracking-widest leading-none transition-all duration-300 ${isActive ? "opacity-100 text-secondary mt-0.5" : "opacity-60"}`}
              >
                Angket
              </span>
            </>
          )}
        </NavLink>

        {/* 💡 ITEM: TEORI */}
        <NavLink
          to="/siswa/teori"
          className={({ isActive }) =>
            `flex flex-col items-center gap-1 flex-1 py-1 transition-all duration-300 group relative cursor-pointer
                        ${isActive ? "scale-105" : "text-base-content/40 hover:text-base-content/75 hover:scale-102"}`
          }
        >
          {({ isActive }) => (
            <>
              <div
                className={`w-10 h-10 flex items-center justify-center rounded-2xl transition-all duration-500 ${isActive ? "bg-accent text-accent-content shadow-lg shadow-accent/30 rotate-3" : "bg-transparent group-hover:bg-base-200"}`}
              >
                <FaLightbulb className="text-lg" />
              </div>
              <span
                className={`text-[9px] font-black uppercase tracking-widest leading-none transition-all duration-300 ${isActive ? "opacity-100 text-accent mt-0.5" : "opacity-60"}`}
              >
                Teori
              </span>
            </>
          )}
        </NavLink>

        {/* 📖 ITEM: PANDUAN */}
        <NavLink
          to="/siswa/panduan"
          className={({ isActive }) =>
            `flex flex-col items-center gap-1 flex-1 py-1 transition-all duration-300 group relative cursor-pointer
                        ${isActive ? "scale-105" : "text-base-content/40 hover:text-base-content/75 hover:scale-102"}`
          }
        >
          {({ isActive }) => (
            <>
              <div
                className={`w-10 h-10 flex items-center justify-center rounded-2xl transition-all duration-500 ${isActive ? "bg-info text-white shadow-lg shadow-info/30 -rotate-3" : "bg-transparent group-hover:bg-base-200"}`}
              >
                <FaBookOpen className="text-lg" />
              </div>
              <span
                className={`text-[9px] font-black uppercase tracking-widest leading-none transition-all duration-300 ${isActive ? "opacity-100 text-info mt-0.5" : "opacity-60"}`}
              >
                Panduan
              </span>
            </>
          )}
        </NavLink>
      </div>

      {/* Dynamic Main Content Area */}
      <main className="flex-1 bg-base-200 bg-pattern-dots overflow-y-auto p-4">
        <div className="max-w-4xl mx-auto w-full min-h-[calc(100%-40px)] flex flex-col justify-between">
          <div className="w-full">
            <Outlet />
          </div>

          {/* Simple & Playful Footer (Sits inside scroll container) */}
          <footer className="font-black text-base-content/30 text-[10px] uppercase tracking-widest text-center pb-32">
            &copy; 2026 Denisha Oktaviane
          </footer>
        </div>
      </main>

      {/* INTEGRASI CUSTOM MODAL */}
      <CustomModal
        isOpen={isLogoutModalOpen}
        onClose={() => setIsLogoutModalOpen(false)}
        onConfirm={confirmLogout}
        title="Sudah Selesai? 🎒"
        confirmText="Ya, Keluar"
        cancelText="Belum"
        type="error"
      >
        <div className="text-center py-2">
          <div className="bg-error/10 text-error w-20 h-20 rounded-3xl flex items-center justify-center mx-auto mb-4 rotate-3 hover:rotate-0 transition-transform duration-300">
            <FaSignOutAlt size={40} />
          </div>
          <h3 className="text-xl font-black text-base-content mb-2">
            Kamu yakin ingin keluar?
          </h3>
          <p className="text-base-content/60 font-bold text-sm leading-relaxed px-4">
            Sampai jumpa lagi ya,{" "}
            <span className="text-primary">{user.nama?.split(" ")[0]}</span>!
            Pastikan tugasmu sudah tuntas hari ini.
          </p>
        </div>
      </CustomModal>
    </div>
  );
}
