import React, { useEffect, useState } from "react";
import {
  FaSignInAlt,
  FaUser,
  FaSchool,
  FaChalkboardTeacher,
  FaHeart,
  FaArrowRight,
} from "react-icons/fa";
import CustomButton from "../../../components/atoms/CustomButton";
import { useNavigate, Link } from "react-router-dom";
import authService from "../../../services/authService";
import { sekolahService } from "../../../services";

export default function LoginOrangTuaPage() {
  const navigate = useNavigate();

  // State Input
  const [namaLengkap, setNamaLengkap] = useState("");
  const [selectedSekolah, setSelectedSekolah] = useState("");
  const [selectedKelas, setSelectedKelas] = useState("");

  // State Data
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

  // Filter kelas otomatis saat sekolah dipilih
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
        setError("Mohon lengkapi data Sekolah, Kelas, dan Nama Ananda.");
        setLoading(false);
        return;
      }

      // Menggunakan authService yang sama dengan parameter Sekolah, Kelas, Nama
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

        const parentData = { ...userData, role: "orang_tua" };

        localStorage.setItem("user", JSON.stringify(parentData));
        localStorage.setItem("isLoggedIn", "true");

        if (response.token) {
          localStorage.setItem("token", response.token);
        }

        sessionStorage.clear();

        const authData = {
          ...userData,
          type: "ortu",
          role: "user",
          expiry: new Date().getTime() + 2 * 60 * 60 * 1000,
        };

        sessionStorage.setItem("app_session", JSON.stringify(authData));
        navigate("/orang-tua/angket");
      } else {
        setError(
          response?.message ||
            "Data tidak ditemukan. Pastikan nama dan kelas Ananda sesuai.",
        );
      }
    } catch (err) {
      setError("Gagal terhubung ke sistem, silakan coba lagi.");
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
        <div className="h-2 w-full bg-gradient-to-r from-secondary via-accent to-error"></div>

        <div className="card-body p-6 sm:p-8 relative z-10">
          {/* Visual Feature: Neatly Framed Mascot/Heart */}
          <div className="flex flex-col items-center text-center mb-6 pb-4 border-b border-dashed border-base-200">
            <div className="relative mb-3.5">
              {/* Decorative Glow Behind Mascot */}
              <div className="absolute inset-0 bg-gradient-to-tr from-secondary/20 to-red-200/30 rounded-full blur-md animate-pulse" />

              <div className="w-24 h-24 rounded-full bg-gradient-to-b from-base-200/80 to-base-100 border-4 border-white shadow-md flex items-center justify-center overflow-hidden relative z-10 group hover:scale-105 transition duration-300">
                <FaHeart className="text-4xl text-secondary animate-pulse transform group-hover:scale-110 transition duration-300" />
              </div>
            </div>

            <h2 className="text-xl font-black text-base-content tracking-tight leading-none">
              Akses Wali Murid 👋
            </h2>
            <p className="text-[10px] font-black text-base-content/40 mt-1.5 uppercase tracking-[0.1em]">
              Isi angket untuk pantau Ananda
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
                  🏫 Sekolah Ananda
                </span>
              </label>
              <select
                disabled={loading}
                value={selectedSekolah}
                onChange={handleSekolahChange}
                className="select select-bordered border border-base-300/70 bg-base-100 w-full font-extrabold text-[13px] text-base-content rounded-xl focus:border-secondary focus:ring-4 focus:ring-secondary/10 transition-all duration-300 select-md"
                required
              >
                <option value="" disabled>
                  -- Pilih Sekolah --
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
                className="select select-bordered border border-base-300/70 bg-base-100 w-full font-extrabold text-[13px] text-base-content rounded-xl focus:border-secondary focus:ring-4 focus:ring-secondary/10 transition-all duration-300 select-md"
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

            {/* FORM CONTROL: NAMA LENGKAP ANANDA */}
            <div className="form-control">
              <label className="label pb-1 pl-1.5">
                <span className="label-text font-black text-base-content/60 text-[10px] uppercase tracking-widest flex items-center gap-2">
                  👤 Nama Lengkap Ananda
                </span>
              </label>
              <input
                disabled={loading}
                type="text"
                autoComplete="off"
                placeholder="Contoh: Ahmad Subagja"
                value={namaLengkap}
                onChange={(e) => setNamaLengkap(e.target.value)}
                className="input input-bordered border border-base-300/70 bg-base-100 w-full font-extrabold text-[13px] text-base-content rounded-xl placeholder:text-base-content/20 placeholder:font-bold focus:border-secondary focus:ring-4 focus:ring-secondary/10 transition-all duration-300 input-md"
                required
              />
            </div>

            {/* 🚀 MODERN CTA BUTTON */}
            <div className="pt-3">
              <CustomButton
                type="secondary"
                className="w-full h-12 text-[13px] font-black tracking-[0.08em] uppercase rounded-xl shadow-lg shadow-secondary/15 group bg-secondary text-white border-none hover:-translate-y-0.5 active:translate-y-0 transition-all duration-300 flex items-center justify-center gap-2"
                loading={loading}
              >
                <span>Masuk & Isi Angket</span>
                <FaArrowRight className="group-hover:translate-x-0.5 transition-transform duration-300 text-xs" />
              </CustomButton>
            </div>
          </form>
        </div>
      </div>
    </div>
  );
}
