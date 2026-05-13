import React, { useState, useEffect } from "react";
import {
  FaClipboardList,
  FaSearch,
  FaEye,
  FaFilter,
  FaChartPie,
  FaCalendarCheck,
} from "react-icons/fa";
import CustomButton from "../../components/atoms/CustomButton";
import CustomTable from "../../components/organism/CustomTable";
import CustomModal from "../../components/organism/CustomModal";
import { monitoringAngketService, sekolahService } from "../../services";
import { useNotification } from "../../context/NotificationContext";
import { PERNYATAAN_OT, PERNYATAAN_SISWA } from "../../const/pertanyaan";
import { useOutletContext } from "react-router-dom";

export default function AngketPage() {
  const { showNotif } = useNotification();
  const { role } = useOutletContext();

  const [dataMonitoring, setDataMonitoring] = useState([]);
  const [loading, setLoading] = useState(false);
  const [optionsSekolah, setOptionsSekolah] = useState([]);
  const [availableClasses, setAvailableClasses] = useState([]);
  const [dateRange, setDateRange] = useState({
    start: `${new Date().getFullYear()}-${String(new Date().getMonth() + 1).padStart(2, "0")}`,
    end: `${new Date().getFullYear()}-${String(new Date().getMonth() + 1).padStart(2, "0")}`,
  });

  const [filter, setFilter] = useState({
    idSekolah: "",
    idKelas: "",
    startMonth: new Date().getMonth() + 1,
    endMonth: new Date().getMonth() + 1,
    year: new Date().getFullYear(),
  });

  const [isDetailOpen, setIsDetailOpen] = useState(false);
  const [selectedSiswa, setSelectedSiswa] = useState(null);
  const [activeTab, setActiveTab] = useState("siswa");

  useEffect(() => {
    const fetchInitial = async () => {
      const ress = await sekolahService.getDropdown();
      if (ress) setOptionsSekolah(ress);
    };
    fetchInitial();
  }, []);

  useEffect(() => {
    if (filter.idSekolah) {
      const selected = optionsSekolah.find(
        (s) => String(s.idSekolah) === String(filter.idSekolah),
      );
      setAvailableClasses(selected?.kelas || []);
    }
  }, [filter.idSekolah, optionsSekolah]);

  const handleFetchMonitoring = async () => {
    if (!filter.idSekolah || !filter.idKelas) {
      showNotif("info", "Harap tentukan instansi sekolah & kelas");
      return;
    }
    setLoading(true);
    try {
      const result = await monitoringAngketService.getByClass(filter);
      if (result?.status) {
        setDataMonitoring(result.data);
      }
    } catch {
      showNotif("error", "Terdapat kendala pengambilan data");
    } finally {
      setLoading(false);
    }
  };

  const columns = [
    {
      header: "Nama Siswa",
      render: (row) => (
        <div className="flex items-center gap-3">
          <div className="w-10 h-10 rounded-full bg-primary/10 border border-primary/20 text-primary flex items-center justify-center text-xs font-black uppercase">
            {row.namaSiswa?.charAt(0) || "-"}
          </div>
          <div className="flex flex-col">
            <span className="text-[13px] font-black text-base-content leading-tight uppercase">
              {row.namaSiswa}
            </span>
            {role === "admin" && (
              <span className="text-[10px] font-mono opacity-50 mt-0.5">
                {row.nisn}
              </span>
            )}
          </div>
        </div>
      ),
    },
    {
      header: "Status Siswa",
      render: (row) => (
        <div
          className={`badge font-black text-[10px] uppercase border-2 py-3 px-3 flex items-center gap-1.5 rounded-lg shadow-sm ${row.totalIsiSiswa > 0 ? "bg-primary/10 text-primary border-primary/20" : "bg-base-200 text-base-content/50 border-base-300"}`}
        >
          <span
            className={`w-1.5 h-1.5 rounded-full ${row.totalIsiSiswa > 0 ? "bg-primary animate-pulse" : "bg-base-content/30"}`}
          />
          {row.totalIsiSiswa} Kali Mengisi
        </div>
      ),
    },
    {
      header: "Status Orang Tua",
      render: (row) => (
        <div
          className={`badge font-black text-[10px] uppercase border-2 py-3 px-3 flex items-center gap-1.5 rounded-lg shadow-sm ${row.totalIsiOT > 0 ? "bg-secondary/10 text-secondary border-secondary/20" : "bg-base-200 text-base-content/50 border-base-300"}`}
        >
          <span
            className={`w-1.5 h-1.5 rounded-full ${row.totalIsiOT > 0 ? "bg-secondary animate-pulse" : "bg-base-content/30"}`}
          />
          {row.totalIsiOT} Kali Mengisi
        </div>
      ),
    },
    {
      header: "Aksi",
      render: (row) => (
        <button
          className="btn btn-sm btn-ghost text-primary font-black rounded-xl border border-base-300 bg-base-100 hover:bg-primary hover:text-white hover:border-primary transition-all"
          onClick={() => {
            setSelectedSiswa(row);
            setIsDetailOpen(true);
          }}
        >
          <FaEye className="text-xs" /> LIHAT DETAIL
        </button>
      ),
    },
  ];

  const handleDateChange = (e, type) => {
    const val = e.target.value;
    if (!val) return;
    const [year, month] = val.split("-").map(Number);
    setDateRange((prev) => ({ ...prev, [type]: e.target.value }));
    setFilter((prev) => ({
      ...prev,
      year: year,
      [type === "start" ? "startMonth" : "endMonth"]: month,
    }));
  };

  return (
    <div className="py-4 space-y-8 flex flex-col">
      {/* Standard Header Block */}
      <div className="flex flex-col gap-2">
        <div className="flex items-center gap-2 text-info font-black text-sm uppercase tracking-widest">
          <span className="w-6 h-0.5 bg-info rounded-full" />
          Rekapitulasi Evaluasi
        </div>
        <h1 className="text-3xl font-black text-base-content tracking-tight">
          Validasi Angket Mingguan
        </h1>
        <p className="text-sm font-bold text-base-content/50">
          Daftar frekuensi pengisian kuisioner penilaian oleh murid dan orang
          tua.
        </p>
      </div>

      {/* Modern Search Box */}
      <div
        className={`relative bg-base-100 rounded-[2rem] border-2 border-base-200 shadow-lg p-6 transition-opacity ${loading ? "opacity-60 pointer-events-none" : ""}`}
      >
        <div className="flex flex-col lg:flex-row gap-6 lg:items-end">
          <div className="grid grid-cols-1 sm:grid-cols-2 xl:grid-cols-4 flex-1 gap-4">
            <div className="flex flex-col gap-1.5">
              <label className="text-[10px] font-black text-base-content/50 uppercase tracking-widest ml-1 flex items-center gap-1.5">
                <FaFilter className="text-[8px] opacity-70" /> Instansi
              </label>
              <select
                className="select select-bordered border-2 border-base-300 focus:border-primary font-bold text-sm rounded-xl w-full bg-base-100"
                value={filter.idSekolah}
                disabled={loading || optionsSekolah.length === 0}
                onChange={(e) =>
                  setFilter({ ...filter, idSekolah: e.target.value })
                }
              >
                <option value="">
                  {optionsSekolah.length === 0 ? "Memuat.." : "Pilih Sekolah"}
                </option>
                {optionsSekolah.map((s) => (
                  <option key={s.idSekolah} value={s.idSekolah}>
                    {s.namaSekolah}
                  </option>
                ))}
              </select>
            </div>

            <div className="flex flex-col gap-1.5">
              <label className="text-[10px] font-black text-base-content/50 uppercase tracking-widest ml-1">
                Rombel
              </label>
              <select
                className="select select-bordered border-2 border-base-300 focus:border-primary font-bold text-sm rounded-xl w-full bg-base-100"
                value={filter.idKelas}
                disabled={
                  loading || !filter.idSekolah || availableClasses.length === 0
                }
                onChange={(e) =>
                  setFilter({ ...filter, idKelas: e.target.value })
                }
              >
                <option value="">
                  {!filter.idSekolah ? "Menunggu sekolah.." : "Pilih Kelas"}
                </option>
                {availableClasses.map((k) => (
                  <option key={k.idKelas} value={k.idKelas}>
                    {k.namaKelas}
                  </option>
                ))}
              </select>
            </div>

            <div className="flex flex-col gap-1.5">
              <label className="text-[10px] font-black text-base-content/50 uppercase tracking-widest ml-1">
                Dari Bulan
              </label>
              <input
                type="month"
                className="input input-bordered border-2 border-base-300 focus:border-primary font-bold text-sm rounded-xl w-full"
                disabled={loading}
                value={dateRange.start}
                onChange={(e) => handleDateChange(e, "start")}
              />
            </div>

            <div className="flex flex-col gap-1.5">
              <label className="text-[10px] font-black text-base-content/50 uppercase tracking-widest ml-1">
                Hingga Bulan
              </label>
              <input
                type="month"
                className="input input-bordered border-2 border-base-300 focus:border-primary font-bold text-sm rounded-xl w-full"
                disabled={loading}
                value={dateRange.end}
                onChange={(e) => handleDateChange(e, "end")}
              />
            </div>
          </div>

          <div className="shrink-0">
            <CustomButton
              className="w-full sm:w-auto px-8 shadow-md rounded-xl font-black"
              type="primary"
              onClick={handleFetchMonitoring}
              loading={loading}
              disabled={loading || !filter.idSekolah || !filter.idKelas}
            >
              <FaSearch className="text-xs" /> CARI MONITORING
            </CustomButton>
          </div>
        </div>
      </div>

      {/* Redesigned Data Table Area */}
      <div className="bg-base-100 rounded-[2rem] border-2 border-base-200 shadow-lg p-6 overflow-hidden">
        <div className="flex items-center gap-3 mb-5 border-b border-base-200 pb-4">
          <div className="w-10 h-10 rounded-xl bg-accent/10 text-accent flex items-center justify-center border border-accent/20">
            <FaClipboardList />
          </div>
          <p className="text-sm font-black uppercase text-base-content tracking-wide">
            Data Pencatatan Instrumen
          </p>
        </div>
        <CustomTable
          columns={columns}
          data={dataMonitoring}
          loading={loading}
        />
      </div>

      {/* Rich Content Details Modal */}
      <CustomModal
        isOpen={isDetailOpen}
        onClose={() => setIsDetailOpen(false)}
        onConfirm={() => setIsDetailOpen(false)}
        title="Daftar Instrumen 📑"
        confirmText="Selesai"
        type="primary"
      >
        <div className="flex flex-col sm:flex-row gap-4 items-center bg-base-200/50 p-4 rounded-2xl border-2 border-base-300/50 shadow-inner mb-6">
          <div className="w-12 h-12 rounded-2xl bg-white shadow flex items-center justify-center text-primary text-xl font-black border border-base-300">
            {selectedSiswa?.namaSiswa?.charAt(0)}
          </div>
          <div className="text-center sm:text-left">
            <h3 className="text-base font-black text-base-content uppercase leading-tight">
              {selectedSiswa?.namaSiswa}
            </h3>
            <p className="text-[10px] font-bold text-base-content/50 uppercase mt-1">
              Detail Riwayat Kuisioner Mingguan
            </p>
          </div>
        </div>

        {/* Custom Tabs Component */}
        <div className="flex bg-base-200/80 p-1.5 rounded-full shadow-inner border border-base-300 mb-6 gap-1">
          <button
            className={`flex-1 py-2.5 rounded-full text-xs font-black flex items-center justify-center gap-2 transition-all ${activeTab === "siswa" ? "bg-white text-primary shadow border border-base-200" : "text-base-content/50 hover:text-base-content/80"}`}
            onClick={() => setActiveTab("siswa")}
          >
            <FaChartPie className="text-xs opacity-70" /> Angket Murid
          </button>
          <button
            className={`flex-1 py-2.5 rounded-full text-xs font-black flex items-center justify-center gap-2 transition-all ${activeTab === "ot" ? "bg-white text-secondary shadow border border-base-200" : "text-base-content/50 hover:text-base-content/80"}`}
            onClick={() => setActiveTab("ot")}
          >
            <FaChartPie className="text-xs opacity-70" /> Angket Orang Tua
          </button>
        </div>

        <div className="space-y-4 max-h-[55vh] overflow-y-auto pr-2 no-scrollbar">
          {activeTab === "siswa" ? (
            <RenderLogs
              logs={selectedSiswa?.allLogsSiswa}
              pertanyaan={PERNYATAAN_SISWA}
            />
          ) : (
            <RenderLogs
              logs={selectedSiswa?.allLogsOT}
              pertanyaan={PERNYATAAN_OT}
            />
          )}
        </div>
      </CustomModal>
    </div>
  );
}

const RenderLogs = ({ logs, pertanyaan }) => {
  if (!logs || logs.length === 0)
    return (
      <div className="flex flex-col items-center justify-center py-16 bg-base-200/40 rounded-[2rem] border-2 border-dashed border-base-300 text-center opacity-60">
        <div className="text-4xl mb-2">📁</div>
        <p className="text-xs font-black uppercase tracking-widest">
          Belum Ada Entri Pengisian
        </p>
      </div>
    );

  return logs.map((log, idx) => (
    <div
      key={idx}
      className="collapse collapse-arrow bg-base-100 border-2 border-base-200 shadow-sm rounded-2xl overflow-hidden group"
    >
      <input type="checkbox" className="peer" />
      <div className="collapse-title flex flex-col sm:flex-row justify-between sm:items-center pr-12 bg-gradient-to-r from-base-100 to-base-200/30 group-hover:from-base-200/20 transition-all">
        <div className="flex flex-col gap-0.5">
          <div className="flex items-center gap-2">
            <span className="w-2 h-2 rounded-full bg-primary shadow-sm" />
            <span className="text-[13px] font-black text-base-content uppercase">
              Entri Laporan #{idx + 1}
            </span>
          </div>
          <span className="text-[9px] font-mono text-base-content/50 tracking-tighter mt-0.5">
            ID RECORD: {log.idTrans || "UNSET"}
          </span>
        </div>
        <div className="flex items-center gap-2 mt-2 sm:mt-0 bg-white px-3 py-1.5 rounded-xl border border-base-200 shadow-sm shrink-0">
          <FaCalendarCheck className="text-xs text-base-content/40" />
          <span className="text-[10px] font-black uppercase text-base-content/70">
            {new Date(log.waktu_simpan).toLocaleDateString("id-ID", {
              day: "numeric",
              month: "short",
              year: "numeric",
            })}
          </span>
        </div>
      </div>

      <div className="collapse-content bg-base-100 p-0 peer-checked:border-t border-base-200">
        <div className="overflow-x-auto">
          <table className="table table-zebra w-full border-spacing-0 border-separate">
            <thead className="bg-base-200/50">
              <tr>
                <th className="w-12 text-center font-black text-[9px] uppercase tracking-widest border-r border-base-300/50">
                  No
                </th>
                <th className="font-black text-[9px] uppercase tracking-widest text-left">
                  Indikator Instrumen
                </th>
                <th className="w-20 text-center font-black text-[9px] uppercase tracking-widest">
                  Nilai
                </th>
              </tr>
            </thead>
            <tbody className="font-bold text-[12px]">
              {pertanyaan.map((p) => {
                const scoreVal = log[`p${p.id}`];
                let badgeColor = "bg-warning/10 text-warning border-warning/20";
                if (scoreVal >= 4)
                  badgeColor = "bg-success/10 text-success border-success/20";
                if (scoreVal <= 2)
                  badgeColor = "bg-error/10 text-error border-error/20";

                return (
                  <tr
                    key={p.id}
                    className="hover:bg-base-200/30 transition-colors"
                  >
                    <td className="text-center opacity-40 font-mono border-r border-base-200/50 text-[10px]">
                      {p.id}
                    </td>
                    <td className="whitespace-normal leading-relaxed text-base-content/80 font-medium py-3">
                      {p.text}
                    </td>
                    <td className="text-center py-3">
                      <div
                        className={`inline-flex items-center justify-center w-8 h-8 rounded-lg border-2 font-black text-xs shadow-inner ${badgeColor}`}
                      >
                        {scoreVal || "0"}
                      </div>
                    </td>
                  </tr>
                );
              })}
            </tbody>
          </table>
        </div>
      </div>
    </div>
  ));
};
