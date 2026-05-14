import React, { useEffect, useState } from "react";
import { Outlet, NavLink, useNavigate } from "react-router-dom";
import { FaUsers, FaLightbulb, FaSignOutAlt, FaHeart } from "react-icons/fa";
import bgHero from "../assets/hero-guru.png";
import CustomModal from "../components/organism/CustomModal";
import logoUpi from "../assets/logo-upi.png";

export default function OrangTuaLayout() {
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
    if (!session || session.type !== "ortu") {
      navigate("/orang-tua/login");
    }
  }, [session, navigate]);

  const confirmLogout = () => {
    sessionStorage.removeItem("app_session");
    setIsLogoutModalOpen(false);
    navigate("/orang-tua/login");
  };

  if (!session || session.type !== "ortu") return null;

  const user = session;

  return (
    <div className="min-h-screen w-full flex flex-col bg-base-100 relative overflow-hidden">
      {/* Warm Header Top */}
      <header className="sticky top-0 z-50 bg-base-100/95 backdrop-blur-md py-3 px-5 flex justify-between items-center border-b border-base-200 shadow-sm">
        <img src={logoUpi} alt="Logo UPI" className="h-7 object-contain" />
        <div className="flex items-center gap-2 text-xs font-black text-secondary bg-secondary/10 px-3 py-1.5 rounded-full">
          <FaHeart /> ORANG TUA
        </div>
      </header>

      {/* Warm Gradients for Parents with Deeper Contrast */}
      <div className="relative flex flex-col h-[180px] shrink-0">
        <div className="absolute inset-0 bg-secondary opacity-85" />
        <div
          className="absolute inset-0 bg-cover bg-center opacity-40 scale-105 transform transition-all duration-700"
          style={{ backgroundImage: `url(${bgHero})` }}
        />

        <div className="relative z-10 flex flex-col items-center justify-center h-full pb-6 px-6 text-center text-white">
          <h1 className="text-2xl font-black drop-shadow-[0_2px_6px_rgba(0,0,0,0.45)] tracking-tight">
            Ayah / Bunda ❤️
          </h1>
          <p className="text-[11px] font-black bg-black/25 px-4 py-1.5 rounded-full mt-2 backdrop-blur-md text-white border border-white/10 shadow-sm tracking-wide">
            Dashboard Wali Murid
          </p>
        </div>

        {/* Floating Info Card */}
        <div className="absolute -bottom-10 left-1/2 -translate-x-1/2 bg-base-100 shadow-card border border-base-200 rounded-2xl p-4 w-[90%] flex items-center gap-3 transition-transform">
          <div className="w-14 h-12 rounded-xl bg-secondary text-white flex items-center justify-center text-xl shadow-md font-black">
            Ortu
          </div>
          <div className="flex-1 min-w-0">
            <p className="text-[10px] font-black text-base-content/40 uppercase tracking-widest">
              Memantau Ananda
            </p>
            <h3 className="text-base font-black text-base-content truncate leading-tight mt-0.5">
              {user.nama}
            </h3>
          </div>
        </div>
      </div>

      {/* Navigasi */}
      <nav className="mt-14 flex flex-nowrap justify-center gap-3 p-4 bg-base-200/50 border-b border-base-200">
        <NavLink
          className={({ isActive }) =>
            `px-6 py-3 text-sm rounded-2xl flex gap-2 items-center whitespace-nowrap shrink-0 font-extrabold transition-all duration-300 
                        ${
                          isActive
                            ? "bg-secondary text-white shadow-lg shadow-secondary/30 -translate-y-0.5 scale-105"
                            : "bg-base-100 text-base-content/70 hover:bg-white shadow-sm border border-base-300/50"
                        }`
          }
          to="/orang-tua/angket"
        >
          <FaUsers className="text-lg" />
          <span>Angket</span>
        </NavLink>

        <NavLink
          className={({ isActive }) =>
            `px-6 py-3 text-sm rounded-2xl flex gap-2 items-center whitespace-nowrap shrink-0 font-extrabold transition-all duration-300 
                        ${
                          isActive
                            ? "bg-accent text-accent-content shadow-lg shadow-accent/30 -translate-y-0.5 scale-105"
                            : "bg-base-100 text-base-content/70 hover:bg-white shadow-sm border border-base-300/50"
                        }`
          }
          to="/orang-tua/teori"
        >
          <FaLightbulb className="text-lg" />
          <span>Teori</span>
        </NavLink>

        <button
          onClick={() => setIsLogoutModalOpen(true)}
          className="px-4 py-3 text-sm rounded-2xl flex items-center justify-center transition-all duration-300 bg-error/10 text-error hover:bg-error hover:text-white border border-error/20 shadow-sm"
        >
          <FaSignOutAlt className="text-lg" />
        </button>
      </nav>

      <main className="flex-1 bg-base-200 bg-pattern-dots overflow-y-auto p-4">
        <div className="max-w-4xl mx-auto pb-10 w-full">
          <Outlet />
        </div>
      </main>

      <footer className="font-bold text-base-content/40 text-[10px] uppercase tracking-widest text-center py-4 bg-base-100 border-t border-base-200">
        &copy; 2026 Denisha Oktaviane
      </footer>

      {/* INTEGRASI CUSTOM MODAL */}
      <CustomModal
        isOpen={isLogoutModalOpen}
        onClose={() => setIsLogoutModalOpen(false)}
        onConfirm={confirmLogout}
        title="Konfirmasi Keluar"
        confirmText="Ya, Keluar"
        cancelText="Batal"
        type="error"
      >
        <div className="text-center py-2">
          <div className="bg-error/10 text-error w-16 h-16 rounded-full flex items-center justify-center mx-auto mb-4">
            <FaSignOutAlt size={30} />
          </div>
          <p className="font-bold text-base-content text-lg">
            Ingin mengakhiri sesi?
          </p>
          <p className="text-base-content/60 font-medium text-sm mt-1">
            Anda dapat masuk kembali sewaktu-waktu untuk memantau perkembangan{" "}
            {user.nama?.split(" ")[0]}.
          </p>
        </div>
      </CustomModal>
    </div>
  );
}
