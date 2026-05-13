// App.jsx
import { lazy, Suspense } from "react";
import { Routes, Route, Navigate } from "react-router-dom";

// ─── Layouts (tidak di-lazy — selalu dibutuhkan, ukuran kecil) ───────────────
import MainLayout from "./layouts/MainLayout";
import SiswaLayout from "./layouts/SiswaLayout";
import SiswaGuestLayout from "./layouts/SiswaGuestLayout";
import SecondaryLayout from "./layouts/SecondaryLayout";
import OrangTuaGuestLayout from "./layouts/OrangTuaGuestLayout";
import OrangTuaLayout from "./layouts/OrangTuaLayout";

// ─── Admin/Guru Pages ─────────────────────────────────────────────────────────
const Dashboard = lazy(() => import("./pages/Dashboard"));
const MasterDataPage = lazy(() => import("./pages/MasterData"));
const KaihPanduanPage = lazy(() => import("./pages/Panduan"));
const TeoriPage = lazy(() => import("./pages/Teori"));
const JournalStudentPage = lazy(() => import("./pages/Jurnal"));
const AngketPage = lazy(() => import("./pages/Angket"));
const MonitoringBiasPage = lazy(() => import("./pages/Bias"));

// ─── Siswa Pages ──────────────────────────────────────────────────────────────
const LoginSiswaPage = lazy(() => import("./pages/Siswa/Login"));
const SiswaBerandaPage = lazy(() => import("./pages/Siswa/Beranda"));
const SiswaJurnalPage = lazy(() => import("./pages/Siswa/Jurnal"));
const SiswaPanduanPage = lazy(() => import("./pages/Siswa/Panduan"));
const AngketMingguanSiswaPage = lazy(() => import("./pages/Siswa/Jurnal/AnketSiswa"),
);
const TeoriPendukungPage = lazy(() => import("./pages/Siswa/Teori"));

// ─── Orang Tua Pages ──────────────────────────────────────────────────────────
const LoginOrangTuaPage = lazy(() => import("./pages/OrangTua/Login"));
const AngketMingguanOrangTuaPage = lazy(() => import("./pages/OrangTua/Angket"),
);

// ─── Fallback Loading ─────────────────────────────────────────────────────────
function PageLoader() {
  return (
    <div className="flex items-center justify-center min-h-screen bg-base-100">
      <div className="flex flex-col items-center gap-4">
        <span className="loading loading-ring loading-lg text-primary" />
        <p className="text-sm font-bold text-base-content/40 uppercase tracking-widest animate-pulse">
          Memuat Halaman...
        </p>
      </div>
    </div>
  );
}

export default function App() {
  return (
    <Suspense fallback={<PageLoader />}>
      <Routes>
        {/* ── Admin / Guru ───────────────────────────────────────────────── */}
        <Route element={<MainLayout />}>
          <Route index element={<Navigate to="/dashboard" replace />} />
          <Route path="/dashboard" element={<Dashboard />} />
          <Route path="/master-data" element={<MasterDataPage />} />
          <Route path="/panduan" element={<KaihPanduanPage />} />
          <Route path="/teori" element={<TeoriPage />} />
          <Route path="/jurnal" element={<JournalStudentPage />} />
          <Route path="/angket" element={<AngketPage />} />
          <Route path="/bias" element={<MonitoringBiasPage />} />
        </Route>

        {/* ── Siswa ──────────────────────────────────────────────────────── */}
        <Route path="/siswa">
          <Route index element={<Navigate to="login" replace />} />

          <Route element={<SiswaGuestLayout />}>
            <Route path="login" element={<LoginSiswaPage />} />
          </Route>

          <Route element={<SiswaLayout />}>
            <Route path="beranda" element={<SiswaBerandaPage />} />
            <Route path="jurnal" element={<SiswaJurnalPage />} />
            <Route path="panduan" element={<SiswaPanduanPage />} />
            <Route path="angket" element={<AngketMingguanSiswaPage />} />
            <Route path="teori" element={<TeoriPendukungPage />} />
          </Route>
        </Route>

        {/* ── Orang Tua ──────────────────────────────────────────────────── */}
        <Route path="/orang-tua">
          <Route index element={<Navigate to="login" replace />} />

          <Route element={<OrangTuaGuestLayout />}>
            <Route path="login" element={<LoginOrangTuaPage />} />
          </Route>

          <Route element={<OrangTuaLayout />}>
            <Route path="angket" element={<AngketMingguanOrangTuaPage />} />
            <Route path="teori" element={<TeoriPendukungPage />} />
          </Route>
        </Route>
      </Routes>
    </Suspense>
  );
}
