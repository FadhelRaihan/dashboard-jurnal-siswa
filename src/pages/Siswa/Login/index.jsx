import React, { useEffect, useState } from "react";
import {
  FaSignInAlt,
  FaUser,
  FaSchool,
  FaChalkboardTeacher,
  FaArrowRight,
} from "react-icons/fa";
import CustomButton from "../../../components/atoms/CustomButton";
import { useNavigate, Link } from "react-router-dom";
import authService from "../../../services/authService";
import { sekolahService } from "../../../services";
import mascotSiswa from "../../../assets/mascot-siswa.png";

export default function LoginSiswaPage() {
  const navigate = useNavigate();

  // State Baru
  const [namaLengkap, setNamaLengkap] = useState("");
  const [selectedSekolah, setSelectedSekolah] = useState("");
  const [selectedKelas, setSelectedKelas] = useState("");

  const [optionsSekolah, setOptionsSekolah] = useState([]);
  const [availableKelas, setAvailableKelas] = useState([]);

  const [error, setError] = useState("");
  const [loading, setLoading] = useState(false);

  const fetchDropDownData = async () => {
    setLoading(true);
    try {
      const ress = await sekolahService.getDropdown();
      if (ress) setOptionsSekolah(ress);
    } catch (err) {
      console.error("Dropdown Error:", err);
    } finally {
      setLoading(false);
    }
  };

  useEffect(() => {
    fetchDropDownData();
  }, []);

  const handleSekolahChange = (e) => {
    const idSekolah = e.target.value;
    setSelectedSekolah(idSekolah);
    setSelectedKelas("");

    const sekolahTerpilih = optionsSekolah.find(
      (s) => String(s.idSekolah) === String(idSekolah),
    );
    setAvailableKelas(sekolahTerpilih ? sekolahTerpilih.kelas : []);
  };

  const handleSubmit = async (e) => {
    e.preventDefault();
    setError("");
    setLoading(true);

    try {
      if (!namaLengkap || !selectedSekolah || !selectedKelas) {
        setError("Ups! Lengkapi semua data di atas dulu ya.");
        setLoading(false);
        return;
      }

      const response = await authService.loginSiswa({
        idSekolah: selectedSekolah,
        idKelas: selectedKelas,
        namaLengkap: namaLengkap,
      });

      if (response && response.status === true) {
        // Resolve labels for consistent layouts
        const curSekolah = optionsSekolah.find(
          (s) => String(s.idSekolah) === String(selectedSekolah),
        );
        const curKelas = availableKelas.find(
          (k) => String(k.idKelas) === String(selectedKelas),
        );

        const userData = {
          ...response.data,
          nama: response.data.nama || response.data.namaLengkap || namaLengkap,
          nisn: response.data.nisn || response.data.NISN || "",
          namaSekolah: curSekolah?.namaSekolah || "",
          detailKelas: curKelas?.namaKelas || "",
        };

        localStorage.setItem("user", JSON.stringify(userData));
        localStorage.setItem("isLoggedIn", "true");

        if (response.token) {
          localStorage.setItem("token", response.token);
        }
        sessionStorage.clear();

        const authData = {
          ...userData,
          type: "siswa",
          role: "user",
          expiry: new Date().getTime() + 2 * 60 * 60 * 1000,
        };

        sessionStorage.setItem("app_session", JSON.stringify(authData));
        navigate("/siswa/beranda");
      } else {
        setError(
          response?.message ||
            "Data belum cocok nih, coba cek lagi nama dan kelasnya ya.",
        );
      }
    } catch (err) {
      setError("Ada sedikit masalah koneksi, coba sebentar lagi ya.");
      console.error("Login error:", err);
    } finally {
      setLoading(false);
    }
  };

  return (
    <div className="w-full flex flex-col animate-in fade-in duration-500">
      {/* 📱 Sleek High-End Card */}
      <div className="card bg-base-100 shadow-[0_25px_60px_-15px_rgba(0,0,0,0.06)] rounded-[2.5rem] border border-base-300/50 overflow-hidden relative">
        {/* Top Decorative Gradient Bar */}
        <div className="h-2 w-full bg-gradient-to-r from-primary via-[#A3D982] to-secondary"></div>

        <div className="card-body p-6 sm:p-8 relative z-10">
          {/* Visual Feature: Neatly Framed Mascot */}
          <div className="flex flex-col items-center text-center mb-6 pb-4 border-b border-dashed border-base-200">
            <div className="relative mb-3.5">
              {/* Decorative Glow Behind Mascot */}
              <div className="absolute inset-0 bg-gradient-to-tr from-primary/20 to-sky-200/30 rounded-full blur-md animate-pulse" />

              <div className="w-24 h-24 rounded-full bg-gradient-to-b from-base-200/80 to-base-100 border-4 border-white shadow-md flex items-center justify-center overflow-hidden relative z-10 group hover:scale-105 transition duration-300">
                <img
                  src={mascotSiswa}
                  alt="Mascot"
                  className="w-20 h-20 object-contain transform translate-y-1.5 drop-shadow-[0_8px_8px_rgba(0,0,0,0.12)] group-hover:translate-y-0.5 transition duration-300"
                />
              </div>
            </div>

            <h2 className="text-xl font-black text-base-content tracking-tight leading-none">
              Halo, Anak Hebat! 👋
            </h2>
            <p className="text-[10px] font-black text-base-content/40 mt-1.5 uppercase tracking-[0.1em]">
              Ayo Catat Kebiasaan Baikmu Hari Ini
            </p>
          </div>

          {/* Clean Error Display */}
          {error && (
            <div className="animate-in slide-in-from-top-2 duration-200 mb-5 p-3.5 bg-error/5 text-error rounded-xl border border-error/20 flex items-center gap-3">
              <span className="text-base">⚠️</span>
              <span className="text-[11px] font-bold leading-tight">
                {error}
              </span>
            </div>
          )}

          {/* 📝 SLEEK FORM 📝 */}
          <form onSubmit={handleSubmit} className="space-y-4">
            {/* FORM CONTROL: SEKOLAH */}
            <div className="form-control">
              <label className="label pb-1 pl-1.5">
                <span className="label-text font-black text-base-content/60 text-[10px] uppercase tracking-widest flex items-center gap-2">
                  🏫 Asal Sekolah
                </span>
              </label>
              <select
                disabled={loading}
                value={selectedSekolah}
                onChange={handleSekolahChange}
                className="select select-bordered border border-base-300/70 bg-base-100 w-full font-extrabold text-[13px] text-base-content rounded-xl focus:border-primary focus:ring-4 focus:ring-primary/10 transition-all duration-300 select-md"
                required
              >
                <option value="" disabled>
                  -- Pilih Sekolahmu --
                </option>
                {optionsSekolah?.map((s) => (
                  <option key={s.idSekolah} value={s.idSekolah}>
                    {s.namaSekolah}
                  </option>
                ))}
              </select>
            </div>

            {/* FORM CONTROL: KELAS */}
            <div
              className={`form-control transition-all duration-300 ${!selectedSekolah ? "opacity-40 pointer-events-none" : "opacity-100"}`}
            >
              <label className="label pb-1 pl-1.5">
                <span className="label-text font-black text-base-content/60 text-[10px] uppercase tracking-widest flex items-center gap-2">
                  🎒 Kelas Saat Ini
                </span>
              </label>
              <select
                disabled={loading || !selectedSekolah}
                value={selectedKelas}
                onChange={(e) => setSelectedKelas(e.target.value)}
                className="select select-bordered border border-base-300/70 bg-base-100 w-full font-extrabold text-[13px] text-base-content rounded-xl focus:border-primary focus:ring-4 focus:ring-primary/10 transition-all duration-300 select-md"
                required
              >
                <option value="" disabled>
                  {selectedSekolah
                    ? "-- Pilih Kelas --"
                    : "Pilih Sekolah Dahulu"}
                </option>
                {availableKelas?.map((k) => (
                  <option key={k.idKelas} value={k.idKelas}>
                    {k.namaKelas}
                  </option>
                ))}
              </select>
            </div>

            {/* FORM CONTROL: NAMA LENGKAP */}
            <div className="form-control">
              <label className="label pb-1 pl-1.5">
                <span className="label-text font-black text-base-content/60 text-[10px] uppercase tracking-widest flex items-center gap-2">
                  👤 Nama Lengkap Siswa
                </span>
              </label>
              <input
                disabled={loading}
                type="text"
                placeholder="Masukkan nama lengkapmu..."
                value={namaLengkap}
                onChange={(e) => setNamaLengkap(e.target.value)}
                className="input input-bordered border border-base-300/70 bg-base-100 w-full font-extrabold text-[13px] text-base-content rounded-xl placeholder:text-base-content/20 placeholder:font-bold focus:border-primary focus:ring-4 focus:ring-primary/10 transition-all duration-300 input-md"
                required
              />
              <label className="label pt-1.5 pl-1.5">
                <span className="label-text-alt text-base-content/40 font-bold text-[9px] tracking-wide uppercase italic">
                  *Tulis sesuai dengan data absen sekolah
                </span>
              </label>
            </div>

            {/* 🚀 MODERN CTA BUTTON */}
            <div className="pt-3">
              <CustomButton
                type="primary"
                className="w-full h-12 text-[13px] font-black tracking-[0.08em] uppercase rounded-xl shadow-lg shadow-primary/15 group bg-primary text-white border-none hover:-translate-y-0.5 active:translate-y-0 transition-all duration-300 flex items-center justify-center gap-2"
                loading={loading}
              >
                <span>Mulai Mencatat Jurnal</span>
                <FaArrowRight className="group-hover:translate-x-0.5 transition-transform duration-300 text-xs" />
              </CustomButton>
            </div>
          </form>
        </div>
      </div>
    </div>
  );
}
