import React, { useState, useEffect } from 'react';
import { FaSearch, FaUserShield, FaExclamationTriangle, FaCheckCircle, FaTimesCircle, FaEye, FaFilter, FaFileSignature } from 'react-icons/fa';
import CustomButton from '../../components/atoms/CustomButton';
import { sekolahService, monitoringAngketService, rekapBulananService } from '../../services';
import CustomModal from '../../components/organism/CustomModal';
import CustomTable from '../../components/organism/CustomTable';

const getDimensionPctAndLabel = (rawScore, maxPossible) => {
    if (!rawScore) return { pct: 0, label: 'Rendah', color: 'text-success', progressColor: 'progress-success' };
    let pct = rawScore;
    if (rawScore <= maxPossible) {
        pct = (rawScore / maxPossible) * 100;
    }
    pct = Math.round(pct);
    if (pct >= 70) return { pct, label: 'Tinggi', color: 'text-error', progressColor: 'progress-error bg-error' };
    if (pct >= 40) return { pct, label: 'Sedang', color: 'text-warning', progressColor: 'progress-warning bg-warning' };
    return { pct, label: 'Rendah', color: 'text-success', progressColor: 'progress-success bg-success' };
};

const getIndikatorDetail = (row) => {
    if (!row) return [];
    if (row.indikatorDetail && Array.isArray(row.indikatorDetail)) {
        return row.indikatorDetail;
    }
    return [];
};

const getWeekFromDate = (date) => {
    const day = date.getDate();
    if (day <= 7) return 1;
    if (day <= 14) return 2;
    if (day <= 21) return 3;
    return 4;
};


export default function MonitoringBiasPage() {
    const [filter, setFilter] = useState({
        idSekolah: '',
        idKelas: '',
        bulan: new Date().getMonth() + 1,
        tahun: new Date().getFullYear(),
        minggu: getWeekFromDate(new Date())
    });
    const [selectedPeriod, setSelectedPeriod] = useState(
        `${new Date().getFullYear()}-${String(new Date().getMonth() + 1).padStart(2, '0')}`
    );

    const [optionsSekolah, setOptionsSekolah] = useState([]);
    const [availableClasses, setAvailableClasses] = useState([]);
    const [loading, setLoading] = useState(false);

    const [searchTerm, setSearchTerm] = useState('');
    const [dataSiswa, setDataSiswa] = useState([]);

    const [selectedStudent, setSelectedStudent] = useState(null);
    const [isModalOpen, setIsModalOpen] = useState(false);

    const activeClassName = availableClasses.find(c => String(c.idKelas) === String(filter.idKelas))?.namaKelas || 'Kelas';
    const monthNames = [
        "", "Januari", "Februari", "Maret", "April", "Mei", "Juni",
        "Juli", "Agustus", "September", "Oktober", "November", "Desember"
    ];
    const periodLabel = `Minggu Ke-${filter.minggu}, ${monthNames[filter.bulan]} ${filter.tahun}`;

    useEffect(() => {
        const fetchInitial = async () => {
            setLoading(true);
            try {
                const ress = await sekolahService.getDropdown();
                if (ress) setOptionsSekolah(ress);
            } catch {
                //
            } finally {
                setLoading(false);
            }
        };
        fetchInitial();
    }, []);

    useEffect(() => {
        if (filter.idSekolah) {
            const selected = optionsSekolah.find(s => String(s.idSekolah) === String(filter.idSekolah));
            setAvailableClasses(selected?.kelas || []);
            setFilter(prev => ({ ...prev, idKelas: '' }));
        } else {
            setAvailableClasses([]);
        }
    }, [filter.idSekolah, optionsSekolah]);

    const handleFetchData = async () => {
        if (!filter.idSekolah || !filter.idKelas) {
            return;
        }
        setLoading(true);
        try {
            // Fetch monitoring data and weekly journal averages in parallel
            const [monitoringRes, rekapRes] = await Promise.all([
                monitoringAngketService.getByClass({
                    idSekolah: filter.idSekolah,
                    idKelas: filter.idKelas,
                    startMonth: filter.bulan,
                    endMonth: filter.bulan === 12 ? 12 : filter.bulan + 1,
                    year: filter.tahun
                }),
                rekapBulananService.getRekapMingguan(filter)
            ]);

            if (monitoringRes?.status && rekapRes?.status) {
                const monitoringData = monitoringRes.data || [];
                const rekapData = rekapRes.data || [];

                const habits = [
                    "Bangun Pagi",
                    "Beribadah",
                    "Berolahraga",
                    "Makan Sehat & Bergizi",
                    "Gemar Belajar",
                    "Bermasyarakat",
                    "Tidur Cepat"
                ];

                const habitKeyMap = {
                    "Bangun Pagi": "bangunPagi",
                    "Beribadah": "nilaiIbadah",
                    "Berolahraga": "berolahraga",
                    "Makan Sehat & Bergizi": "nilaiMakan",
                    "Gemar Belajar": "nilaiBelajar",
                    "Bermasyarakat": "nilaiSosial",
                    "Tidur Cepat": "nilaiTidur"
                };

                const getHabitAvgPct = (rekapObj, habitKey) => {
                    if (!rekapObj || !rekapObj[habitKey]) return 0;
                    const wKey = `w${filter.minggu}`;
                    const val = parseFloat(rekapObj[habitKey][wKey]);
                    if (isNaN(val) || val === null) return 0;
                    return Math.round((val / 5) * 100);
                };

                const getSum = (log, start, end) => {
                    let sum = 0;
                    for (let i = start; i <= end; i++) {
                        const val = parseInt(log[`p${i}`]);
                        if (!isNaN(val)) sum += val;
                    }
                    return sum;
                };

                const parsedStudents = monitoringData.map(mRow => {
                    const rRow = rekapData.find(r => String(r.nisn) === String(mRow.nisn));
                    
                    const siswaLogsInWeek = mRow.allLogsSiswa ? mRow.allLogsSiswa.filter(log => {
                        if (!log.waktu_simpan) return false;
                        const d = new Date(log.waktu_simpan);
                        const targetD = new Date(d.getTime() - 7 * 24 * 60 * 60 * 1000);
                        return targetD.getFullYear() === filter.tahun &&
                               (targetD.getMonth() + 1) === filter.bulan &&
                               getWeekFromDate(targetD) === filter.minggu;
                    }) : [];
                    const siswaLog = siswaLogsInWeek.length > 0 ? siswaLogsInWeek[siswaLogsInWeek.length - 1] : null;

                    const ortuLogsInWeek = mRow.allLogsOT ? mRow.allLogsOT.filter(log => {
                        if (!log.waktu_simpan) return false;
                        const d = new Date(log.waktu_simpan);
                        const targetD = new Date(d.getTime() - 7 * 24 * 60 * 60 * 1000);
                        return targetD.getFullYear() === filter.tahun &&
                               (targetD.getMonth() + 1) === filter.bulan &&
                               getWeekFromDate(targetD) === filter.minggu;
                    }) : [];
                    const ortuLog = ortuLogsInWeek.length > 0 ? ortuLogsInWeek[ortuLogsInWeek.length - 1] : null;

                    const isSubmitted = siswaLog ? 1 : 0;
                    const isParentSubmitted = ortuLog ? 1 : 0;

                    const skorSiswa = {
                        im: siswaLog ? getSum(siswaLog, 1, 7) : 0,
                        sde: siswaLog ? getSum(siswaLog, 8, 14) : 0,
                        acq: siswaLog ? getSum(siswaLog, 15, 30) : 0
                    };
                    skorSiswa.totalBias = skorSiswa.im + skorSiswa.sde + skorSiswa.acq;

                    const skorOrTu = {
                        im: ortuLog ? getSum(ortuLog, 1, 7) : 0,
                        sde: ortuLog ? getSum(ortuLog, 8, 14) : 0,
                        acq: ortuLog ? getSum(ortuLog, 15, 30) : 0
                    };
                    skorOrTu.totalBias = skorOrTu.im + skorOrTu.sde + skorOrTu.acq;

                    const habitPctList = habits.map(h => getHabitAvgPct(rRow?.rekap, habitKeyMap[h]));
                    const jurnalAvg = Math.round(habitPctList.reduce((a, b) => a + b, 0) / habits.length) || 0;

                    const indikatorDetail = habits.map((habit, idx) => {
                        const jVal = getHabitAvgPct(rRow?.rekap, habitKeyMap[habit]);
                        const sVal = siswaLog ? Math.round((parseInt(siswaLog[`p${idx + 1}`]) || 0) / 5 * 100) : 0;
                        const oVal = ortuLog ? Math.round((parseInt(ortuLog[`p${idx + 1}`]) || 0) / 5 * 100) : 0;
                        return {
                            nama: habit,
                            jurnal: jVal,
                            angketSiswa: sVal,
                            angketOrtu: oVal
                        };
                    });

                    let status = "Belum Dapat Diidentifikasi";
                    let keterangan = "Hasil belum bisa diidentifikasi karena salah satu pihak (orang tua/siswa) belum mengisi angket.";
                    let biasTotalVal = 0;

                    if (siswaLog && ortuLog) {
                        const sumIbsd = indikatorDetail.reduce((acc, curr) => {
                            const dSiswa = curr.angketSiswa - curr.jurnal;
                            const dOrtu = curr.angketOrtu - curr.jurnal;
                            const ibsd_i = (Math.abs(dSiswa) + Math.abs(dOrtu)) / 2;
                            return acc + ibsd_i;
                        }, 0);
                        biasTotalVal = Math.round(sumIbsd / indikatorDetail.length);

                        if (biasTotalVal >= 20) {
                            status = "Indikasi Bias Tinggi";
                            keterangan = "Terdapat perbedaan yang tinggi antara hasil jurnal harian dan hasil angket. Hasil angket social desirability menunjukkan kecenderungan memberikan jawaban yang lebih positif dibandingkan perilaku nyata yang tercatat di jurnal harian.";
                        } else if (biasTotalVal >= 10) {
                            status = "Perlu Perhatian";
                            keterangan = "Terdapat perbedaan moderat antara laporan harian siswa dan respon angket. Diperlukan konfirmasi lebih lanjut terutama pada indikator yang memiliki gap tinggi.";
                        } else {
                            status = "Data Valid (Aman)";
                            keterangan = "Data valid dan aman. Tidak ditemukan perbedaan yang signifikan antara laporan jurnal harian siswa dengan hasil pengisian angket.";
                        }
                    }

                    return {
                        nisn: String(mRow.nisn),
                        namaSiswa: mRow.namaSiswa,
                        jurnalAvg,
                        partisipasi: { siswa: isSubmitted, orangTua: isParentSubmitted },
                        skorSiswa,
                        skorOrTu,
                        analisisBias: { status, keterangan, biasTotalVal },
                        indikatorDetail
                    };
                });

                setDataSiswa(parsedStudents);
            } else {
                setDataSiswa([]);
            }
        } catch (error) {
            console.error('Error fetching social desirability details:', error);
            setDataSiswa([]);
        } finally {
            setLoading(false);
        }
    };

    const handleShowDetail = (student) => {
        setSelectedStudent(student);
        setIsModalOpen(true);
    };

    const handleCloseModal = () => {
        setIsModalOpen(false);
        setSelectedStudent(null);
    };

    const filteredData = dataSiswa.filter(siswa =>
        siswa.namaSiswa.toLowerCase().includes(searchTerm.toLowerCase()) ||
        siswa.nisn.includes(searchTerm)
    );

    const totalSiswa = dataSiswa.length;
    const indikasiBias = dataSiswa.filter(d => d.analisisBias.status === 'Indikasi Bias Tinggi' || d.analisisBias.status === 'Perlu Perhatian').length;
    const dataAman = dataSiswa.filter(d => d.analisisBias.status === 'Data Valid (Aman)').length;
    const belumMengisi = dataSiswa.filter(d => d.analisisBias.status === 'Belum Dapat Diidentifikasi').length;

    const getStatusBadge = (status) => {
        switch (status) {
            case 'Indikasi Bias Tinggi': return 'bg-accent/10 text-accent border-accent/20';
            case 'Perlu Perhatian': return 'bg-warning/10 text-warning border-warning/20';
            case 'Data Valid (Aman)': return 'bg-success/10 text-success border-success/20';
            case 'Inkonsistensi Respon': return 'bg-secondary/10 text-secondary border-secondary/20';
            case 'Belum Dapat Diidentifikasi': return 'bg-base-200 text-base-content/60 border-base-300';
            default: return 'bg-base-200 text-base-content/40 border-base-300';
        }
    };

    const handleMonthChange = (e) => {
        const val = e.target.value;
        setSelectedPeriod(val);
        if (val) {
            const [year, month] = val.split('-').map(Number);
            setFilter(prev => ({ ...prev, bulan: month, tahun: year }));
        }
    };

    const columns = [
        {
            header: 'Biodata Siswa',
            render: (row) => (
                <div className="flex flex-col text-left">
                    <span className="text-[13px] font-black text-base-content uppercase leading-tight">{row.namaSiswa}</span>
                    <span className="text-[10px] font-mono text-base-content/40">{row.nisn}</span>
                </div>
            )
        },
        {
            header: 'Jurnal Mingguan (Anak)',
            align: 'center',
            render: (row) => (
                <div className="flex items-center justify-center font-black font-mono text-xs">
                    {row.partisipasi.siswa > 0 ? (
                        <span className="text-primary font-bold">{row.jurnalAvg || 0}%</span>
                    ) : (
                        <span className="opacity-30">-</span>
                    )}
                </div>
            )
        },
        {
            header: 'Partisipasi (Anak / Wali)',
            align: 'center',
            render: (row) => (
                <div className="flex items-center justify-center font-black font-mono text-xs gap-1">
                    <span className={row.partisipasi.siswa > 0 ? 'text-primary' : 'opacity-30'}>{row.partisipasi.siswa}</span>
                    <span className="opacity-30">/</span>
                    <span className={row.partisipasi.orangTua > 0 ? 'text-secondary' : 'opacity-30'}>{row.partisipasi.orangTua}</span>
                </div>
            )
        },
        {
            header: 'Skor IM (Anak / Wali)',
            align: 'center',
            render: (row) => (
                <div className="flex items-center justify-center font-black font-mono text-xs gap-1">
                    <span className={row.skorSiswa.im > 25 ? 'text-accent' : ''}>{row.skorSiswa.im}</span>
                    <span className="opacity-30">/</span>
                    <span>{row.skorOrTu.im}</span>
                </div>
            )
        },
        {
            header: 'Skor SDE (Anak / Wali)',
            align: 'center',
            render: (row) => (
                <div className="flex items-center justify-center font-black font-mono text-xs gap-1">
                    <span className={row.skorSiswa.sde > 25 ? 'text-accent' : ''}>{row.skorSiswa.sde}</span>
                    <span className="opacity-30">/</span>
                    <span>{row.skorOrTu.sde}</span>
                </div>
            )
        },
        {
            header: 'Skor ACQ (Anak / Wali)',
            align: 'center',
            render: (row) => (
                <div className="flex items-center justify-center font-black font-mono text-xs gap-1">
                    <span className={row.skorSiswa.acq > 60 ? 'text-accent' : ''}>{row.skorSiswa.acq}</span>
                    <span className="opacity-30">/</span>
                    <span>{row.skorOrTu.acq}</span>
                </div>
            )
        },
        {
            header: 'Status Analitik',
            align: 'center',
            render: (row) => (
                <div className="flex flex-col items-center gap-1">
                    <div className={`badge font-black text-[9px] uppercase py-3 px-3 border-2 rounded-lg ${getStatusBadge(row.analisisBias.status)}`}>
                        {row.analisisBias.status}
                    </div>
                    {row.analisisBias.keterangan !== "Tidak ada data untuk dianalisis." && (
                        <span className="text-[9px] font-bold text-base-content/40 truncate max-w-[140px]" title={row.analisisBias.keterangan}>{row.analisisBias.keterangan}</span>
                    )}
                </div>
            )
        },
        {
            header: 'Audit',
            align: 'center',
            width: '120px',
            render: (row) => (
                <div className="whitespace-nowrap">
                    <button
                        className="btn btn-xs btn-ghost text-primary font-black rounded-lg border border-base-300 bg-base-100 hover:bg-primary hover:text-white"
                        onClick={() => handleShowDetail(row)}
                    >
                        <FaEye className="text-[10px]" /> ANALISA
                    </button>
                </div>
            )
        }
    ];

    return (
        <div className="py-4 space-y-8 flex flex-col">
            
            <div className="flex flex-col gap-2">
                <div className="flex items-center gap-2 text-accent font-black text-sm uppercase tracking-widest">
                    <span className="w-6 h-0.5 bg-accent rounded-full" />
                    Integritas Informasi
                </div>
                <h1 className="text-3xl font-black text-base-content tracking-tight flex items-center gap-3">
                   Monitoring Bias (IDRES) 🛡️
                </h1>
                <p className="text-sm font-bold text-base-content/50">Mengukur validitas instrumen (Social Desirability) dengan triangulasi data wali.</p>
            </div>

            {/* Modern Query Box */}
            <div className={`relative bg-base-100 rounded-[2rem] border-2 border-base-200 shadow-lg p-6 transition-opacity ${loading ? 'opacity-60 pointer-events-none' : ''}`}>
                <div className="flex flex-col md:flex-row gap-6 md:items-end">
                    <div className="grid grid-cols-1 sm:grid-cols-4 flex-1 gap-4">
                        <div className="flex flex-col gap-1.5">
                            <label className="text-[10px] font-black text-base-content/50 uppercase tracking-widest ml-1 flex items-center gap-1.5"><FaFilter className="text-[8px] opacity-70"/> Satuan Instansi</label>
                            <select
                                className="select select-bordered border-2 border-base-300 focus:border-accent font-bold text-sm rounded-xl w-full bg-base-100"
                                value={filter.idSekolah}
                                disabled={loading}
                                onChange={(e) => setFilter({ ...filter, idSekolah: e.target.value })}
                            >
                                <option value="">Pilih Sekolah...</option>
                                {optionsSekolah.map(s => <option key={s.idSekolah} value={s.idSekolah}>{s.namaSekolah}</option>)}
                            </select>
                        </div>

                        <div className="flex flex-col gap-1.5">
                            <label className="text-[10px] font-black text-base-content/50 uppercase tracking-widest ml-1">Kelas</label>
                            <select
                                className="select select-bordered border-2 border-base-300 focus:border-accent font-bold text-sm rounded-xl w-full bg-base-100"
                                value={filter.idKelas}
                                disabled={loading || !filter.idSekolah}
                                onChange={(e) => setFilter({ ...filter, idKelas: e.target.value })}
                            >
                                <option value="">Pilih Kelas...</option>
                                {availableClasses.map(k => <option key={k.idKelas} value={k.idKelas}>{k.namaKelas}</option>)}
                            </select>
                        </div>

                        <div className="flex flex-col gap-1.5">
                            <label className="text-[10px] font-black text-base-content/50 uppercase tracking-widest ml-1">Bulan Laporan</label>
                            <input
                                type="month"
                                className="input input-bordered border-2 border-base-300 focus:border-accent font-bold text-sm rounded-xl w-full"
                                disabled={loading}
                                value={selectedPeriod}
                                onChange={handleMonthChange}
                            />
                        </div>

                        <div className="flex flex-col gap-1.5">
                            <label className="text-[10px] font-black text-base-content/50 uppercase tracking-widest ml-1">Minggu Laporan</label>
                            <select
                                className="select select-bordered border-2 border-base-300 focus:border-accent font-bold text-sm rounded-xl w-full bg-base-100"
                                value={filter.minggu}
                                disabled={loading}
                                onChange={(e) => setFilter({ ...filter, minggu: Number(e.target.value) })}
                            >
                                <option value={1}>Minggu ke-1 (Tanggal 1 - 7)</option>
                                <option value={2}>Minggu ke-2 (Tanggal 8 - 14)</option>
                                <option value={3}>Minggu ke-3 (Tanggal 15 - 21)</option>
                                <option value={4}>Minggu ke-4 (Tanggal 22+)</option>
                            </select>
                        </div>
                    </div>

                    <div className="shrink-0">
                        <CustomButton type="accent" className="w-full sm:w-auto px-8 shadow-md shadow-accent/20 rounded-xl font-black" onClick={handleFetchData} loading={loading} disabled={!filter.idSekolah || !filter.idKelas}>
                            <FaSearch className="text-xs" /> MULAI ANALISIS
                        </CustomButton>
                    </div>
                </div>
            </div>

            {/* Vibrant Statistics Grid */}
            <div className="grid grid-cols-2 md:grid-cols-4 gap-4">
                {[
                    { label: 'Agregat Subjek', val: totalSiswa, ic: FaUserShield, cl: 'bg-base-content/10 text-base-content border-base-300' },
                    { label: 'Risiko Bias', val: indikasiBias, ic: FaExclamationTriangle, cl: 'bg-accent/10 text-accent border-accent/20' },
                    { label: 'Responden Valid', val: dataAman, ic: FaCheckCircle, cl: 'bg-success/10 text-success border-success/20' },
                    { label: 'Belum Diidentifikasi', val: belumMengisi, ic: FaTimesCircle, cl: 'bg-base-200 text-base-content/50 border-base-300' },
                ].map((stat, idx) => (
                    <div key={idx} className="bg-base-100 p-4 rounded-[1.5rem] border-2 border-base-200 shadow-md flex flex-col sm:flex-row items-center gap-3 transition-transform hover:-translate-y-1 duration-300">
                        <div className={`w-12 h-12 rounded-2xl border flex items-center justify-center text-lg ${stat.cl} shadow-inner`}>
                            <stat.ic />
                        </div>
                        <div className="text-center sm:text-left">
                            <p className="text-[10px] font-black text-base-content/50 uppercase tracking-wide">{stat.label}</p>
                            <h3 className="text-xl font-black text-base-content leading-tight">{stat.val} <span className="text-xs opacity-40">Jiwa</span></h3>
                        </div>
                    </div>
                ))}
            </div>

            {/* Redesigned Table Interface */}
            <div className="bg-base-100 rounded-[2.5rem] border-2 border-base-200 shadow-lg p-6 overflow-hidden">
                <div className="flex items-center justify-between gap-3 mb-6 border-b border-base-200 pb-4">
                   <div className="flex items-center gap-3">
                      <div className="w-10 h-10 rounded-xl bg-primary/10 text-primary flex items-center justify-center border border-primary/20 shadow-inner"><FaFileSignature /></div>
                      <p className="text-sm font-black uppercase text-base-content tracking-wide">Daftar Metrik Responden</p>
                   </div>
                   <div className="relative hidden sm:block">
                        <input
                            type="text"
                            placeholder="Cari murid..."
                            className="input input-sm input-bordered border-2 rounded-xl text-xs font-bold w-48 focus:border-primary focus:w-60 transition-all bg-base-200/50"
                            value={searchTerm}
                            onChange={(e) => setSearchTerm(e.target.value)}
                        />
                   </div>
                </div>
                
                <CustomTable columns={columns} data={filteredData} loading={loading} />
            </div>

            {/* Forensic Analysis Modal */}
            <CustomModal
                isOpen={isModalOpen}
                onClose={handleCloseModal}
                onConfirm={handleCloseModal}
                title={`Laporan Kredibilitas Data 🔍`}
                confirmText="Selesai Meninjau"
                type="primary"
                hiddenCancel={true}
                widthClass="max-w-3xl"
            >
                {selectedStudent && (() => {
                    const activeIndicators = getIndikatorDetail(selectedStudent);
                    const isIdentified = selectedStudent.analisisBias.status !== "Belum Dapat Diidentifikasi";
                    const isSubmitted = selectedStudent.partisipasi.siswa > 0;
                    
                    const sisIM = getDimensionPctAndLabel(selectedStudent.skorSiswa.im, 35);
                    const sisSDE = getDimensionPctAndLabel(selectedStudent.skorSiswa.sde, 35);
                    const sisACQ = getDimensionPctAndLabel(selectedStudent.skorSiswa.acq, 80);

                    const ortIM = getDimensionPctAndLabel(selectedStudent.skorOrTu.im, 35);
                    const ortSDE = getDimensionPctAndLabel(selectedStudent.skorOrTu.sde, 35);
                    const ortACQ = getDimensionPctAndLabel(selectedStudent.skorOrTu.acq, 80);

                    const studentAngketAvg = isIdentified ? Math.round(
                        activeIndicators.reduce((acc, curr) => acc + curr.angketSiswa, 0) / activeIndicators.length
                    ) : 0;
                    const parentAngketAvg = isIdentified ? Math.round(
                        activeIndicators.reduce((acc, curr) => acc + curr.angketOrtu, 0) / activeIndicators.length
                    ) : 0;
                    const studentJurnalAvg = selectedStudent.jurnalAvg || 0;
                    const biasTotalVal = selectedStudent.analisisBias.biasTotalVal;

                    // Gap Status thresholds
                    const getGapStatus = (gap) => {
                        if (gap >= 20) return { dot: '🔴', label: 'Tinggi', textClass: 'text-error font-black' };
                        if (gap >= 10) return { dot: '🟡', label: 'Sedang', textClass: 'text-warning font-black' };
                        return { dot: '🟢', label: 'Rendah', textClass: 'text-success font-black' };
                    };

                    const getOverallStatusBadge = (status, biasVal) => {
                        if (status === 'Belum Dapat Diidentifikasi') return 'bg-base-200 text-base-content/40 border-base-300';
                        if (biasVal >= 20) return 'bg-error/10 text-error border-error/20';
                        if (biasVal >= 10) return 'bg-warning/10 text-warning border-warning/20';
                        return 'bg-success/10 text-success border-success/20';
                    };

                    const getOverallStatusLabel = (status) => {
                        return status;
                    };

                    const habitsAttention = activeIndicators.filter(ind => Math.abs(ind.angketSiswa - ind.jurnal) >= 20);
                    const dominantBiases = [
                        { name: 'Impression Management (IM)', isDominant: sisIM.label === 'Tinggi', desc: 'Siswa cenderung memberikan jawaban yang membuat dirinya terlihat baik di mata guru atau orang tua.' },
                        { name: 'Self-Deceptive Enhancement (SDE)', isDominant: sisSDE.label === 'Tinggi', desc: 'Siswa cenderung membohongi diri sendiri secara tidak sadar agar terlihat lebih kompeten dari kondisi riil.' },
                        { name: 'Acquiescence (ACQ)', isDominant: sisACQ.label === 'Tinggi', desc: 'Siswa cenderung menyetujui semua pernyataan secara cepat tanpa membaca dengan teliti.' }
                    ].filter(b => b.isDominant);

                    return (
                        <div className="space-y-6 text-left">
                            {/* Student Profile Info */}
                            <div className="flex flex-col sm:flex-row justify-between items-start sm:items-center gap-4 p-4 bg-base-200/60 rounded-2xl border-2 border-base-300/50 shadow-inner">
                                <div className="flex items-center gap-3">
                                    <div className="w-12 h-12 rounded-full bg-primary text-white font-black text-xl flex items-center justify-center shadow">
                                        {selectedStudent.namaSiswa?.charAt(0)}
                                    </div>
                                    <div>
                                        <h4 className="font-black text-base-content uppercase text-sm leading-tight">{selectedStudent.namaSiswa}</h4>
                                        <p className="text-[10px] text-base-content/50 font-bold mt-0.5 uppercase tracking-wider">NISN: {selectedStudent.nisn} | {activeClassName}</p>
                                    </div>
                                </div>
                                <div className="text-right">
                                    <span className="text-[10px] font-black text-base-content/40 uppercase tracking-widest block mb-0.5">Periode Evaluasi</span>
                                    <span className="text-xs font-bold text-base-content bg-white px-3 py-1 rounded-lg border shadow-sm">{periodLabel}</span>
                                </div>
                            </div>

                            {isIdentified ? (
                                <>
                                    {/* Ringkasan Hasil Grid */}
                                    <div className="space-y-2">
                                        <h5 className="text-xs font-black uppercase text-base-content/60 tracking-wider">Ringkasan Hasil</h5>
                                        <div className="grid grid-cols-2 md:grid-cols-5 gap-3">
                                            <div className="bg-base-100 border border-base-200 rounded-xl p-3 flex flex-col justify-between shadow-sm">
                                                <span className="text-[9px] font-black text-base-content/40 uppercase">Jurnal Harian</span>
                                                <span className="text-lg font-black text-primary font-mono">{studentJurnalAvg}%</span>
                                            </div>
                                            <div className="bg-base-100 border border-base-200 rounded-xl p-3 flex flex-col justify-between shadow-sm">
                                                <span className="text-[9px] font-black text-base-content/40 uppercase">Angket Siswa</span>
                                                <span className="text-lg font-black text-secondary font-mono">{studentAngketAvg}%</span>
                                            </div>
                                            <div className="bg-base-100 border border-base-200 rounded-xl p-3 flex flex-col justify-between shadow-sm">
                                                <span className="text-[9px] font-black text-base-content/40 uppercase">Angket Ortu</span>
                                                <span className="text-lg font-black text-success font-mono">{parentAngketAvg}%</span>
                                            </div>
                                            <div className="bg-base-100 border border-base-200 rounded-xl p-3 flex flex-col justify-between shadow-sm">
                                                <span className="text-[9px] font-black text-base-content/40 uppercase">Bias Total</span>
                                                <span className="text-lg font-black text-accent font-mono">{biasTotalVal}%</span>
                                            </div>
                                            <div className={`border rounded-xl p-3 flex flex-col justify-between shadow-sm col-span-2 md:col-span-1 ${getOverallStatusBadge(selectedStudent.analisisBias.status, biasTotalVal)}`}>
                                                <span className="text-[9px] font-black opacity-60 uppercase">Status Bias</span>
                                                <span className="text-xs font-black uppercase tracking-tight">{getOverallStatusLabel(selectedStudent.analisisBias.status)}</span>
                                            </div>
                                        </div>
                                    </div>

                                    {/* Analisis Per Indikator Table */}
                                    <div className="space-y-2">
                                        <h5 className="text-xs font-black uppercase text-base-content/60 tracking-wider">Analisis Per Indikator</h5>
                                        <div className="overflow-x-auto border-2 border-base-200 rounded-2xl shadow-sm">
                                            <table className="table w-full text-sm">
                                                <thead className="bg-base-200/50">
                                                    <tr>
                                                        <th className="font-black">Indikator 7 KAIH</th>
                                                        <th className="text-center font-black">Jurnal (7 Hari)</th>
                                                        <th className="text-center font-black">Angket Siswa</th>
                                                        <th className="text-center font-black">Angket Ortu</th>
                                                        <th className="text-center font-black">Gap Bias</th>
                                                        <th className="text-center font-black">Status</th>
                                                    </tr>
                                                </thead>
                                                <tbody className="font-bold">
                                                    {activeIndicators.map((ind, i) => {
                                                        const gap = Math.abs(ind.angketSiswa - ind.jurnal);
                                                        const stat = getGapStatus(gap);
                                                        return (
                                                            <tr key={i} className="hover:bg-base-100 transition-colors border-b border-base-200">
                                                                <td className="font-bold text-base-content">{ind.nama}</td>
                                                                <td className="text-center font-mono text-base-content/70">{ind.jurnal}%</td>
                                                                <td className="text-center font-mono text-base-content/70">{ind.angketSiswa}%</td>
                                                                <td className="text-center font-mono text-base-content/70">{ind.angketOrtu}%</td>
                                                                <td className={`text-center font-mono ${stat.textClass}`}>{gap}%</td>
                                                                <td className="text-center text-lg leading-none" title={`Kategori: ${stat.label}`}>{stat.dot}</td>
                                                            </tr>
                                                        );
                                                    })}
                                                </tbody>
                                            </table>
                                        </div>
                                    </div>

                                    {/* Profil Social Desirability Bias Progress bars */}
                                    <div className="space-y-3">
                                        <h5 className="text-xs font-black uppercase text-base-content/60 tracking-wider">Profil Social Desirability Bias</h5>
                                        <div className="grid grid-cols-1 md:grid-cols-3 gap-4">
                                            {[
                                                { name: 'IM (Impression Management)', val: sisIM, raw: selectedStudent.skorSiswa.im, limit: 35 },
                                                { name: 'SDE (Self-Deceptive Enhancement)', val: sisSDE, raw: selectedStudent.skorSiswa.sde, limit: 35 },
                                                { name: 'ACQ (Acquiescence)', val: sisACQ, raw: selectedStudent.skorSiswa.acq, limit: 80 }
                                            ].map((item, i) => (
                                                <div key={i} className="bg-base-100 border border-base-200 rounded-2xl p-4 shadow-sm space-y-2.5">
                                                    <div className="flex justify-between items-start">
                                                        <span className="text-[10px] font-black text-base-content/50 uppercase leading-snug">{item.name}</span>
                                                        <span className={`badge badge-sm px-2 font-black text-[9px] uppercase ${item.val.label === 'Tinggi' ? 'bg-error/10 text-error border-error/20' : item.val.label === 'Sedang' ? 'bg-warning/10 text-warning border-warning/20' : 'bg-success/10 text-success border-success/20'}`}>
                                                            {item.val.label}
                                                        </span>
                                                    </div>
                                                    <div className="flex items-baseline gap-1.5">
                                                        <span className="text-2xl font-black font-mono leading-none">{item.val.pct}%</span>
                                                        <span className="text-[10px] font-bold text-base-content/40 font-mono">({item.raw}/{item.limit} pts)</span>
                                                    </div>
                                                    <div className="w-full bg-base-200 rounded-full h-2 overflow-hidden">
                                                        <div className={`h-full rounded-full ${item.val.label === 'Tinggi' ? 'bg-error' : item.val.label === 'Sedang' ? 'bg-warning' : 'bg-success'}`} style={{ width: `${item.val.pct}%` }} />
                                                    </div>
                                                </div>
                                            ))}
                                        </div>
                                    </div>

                                    {/* Interpretasi Otomatis & Kesimpulan */}
                                    <div className="bg-base-100 border border-base-200 rounded-2xl p-5 shadow-sm space-y-4">
                                        <div className="border-b border-base-200 pb-3">
                                            <h5 className="text-xs font-black uppercase text-base-content/80 tracking-wider">Interpretasi Otomatis</h5>
                                        </div>
                                        
                                        <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
                                            <div className="space-y-2">
                                                <span className="text-[10px] font-black text-base-content/40 uppercase tracking-widest block">Indikator yang Perlu Perhatian</span>
                                                {habitsAttention.length > 0 ? (
                                                    <ul className="space-y-1">
                                                        {habitsAttention.map((h, idx) => (
                                                            <li key={idx} className="text-xs font-bold text-base-content flex items-center gap-1.5">
                                                                <span className="text-error">🔴</span> {h.nama} <span className="text-[10px] text-error">(Gap: {Math.abs(h.angketSiswa - h.jurnal)}%)</span>
                                                            </li>
                                                        ))}
                                                    </ul>
                                                ) : (
                                                    <p className="text-xs text-success font-bold">🟢 Semua indikator konsisten.</p>
                                                )}
                                            </div>

                                            <div className="space-y-2">
                                                <span className="text-[10px] font-black text-base-content/40 uppercase tracking-widest block">Jenis Bias Dominan</span>
                                                {dominantBiases.length > 0 ? (
                                                    <ul className="space-y-2">
                                                        {dominantBiases.map((b, idx) => (
                                                            <li key={idx} className="text-xs leading-normal">
                                                                <div className="font-black text-base-content">{b.name}</div>
                                                                <div className="text-[10px] font-bold text-base-content/50 mt-0.5 leading-snug">{b.desc}</div>
                                                            </li>
                                                        ))}
                                                    </ul>
                                                ) : (
                                                    <p className="text-xs text-success font-bold">🟢 Tidak ada bias dominan terdeteksi.</p>
                                                )}
                                            </div>
                                        </div>

                                        <div className="bg-base-200/50 p-4 rounded-xl border border-base-300 space-y-1.5 mt-2">
                                            <span className="text-[10px] font-black text-base-content/40 uppercase tracking-widest block">Kesimpulan Sistem</span>
                                            <p className="text-xs font-bold text-base-content/75 leading-relaxed">
                                                {selectedStudent.analisisBias.keterangan || "Analisis selesai. Data terpantau konsisten."}
                                            </p>
                                        </div>
                                    </div>
                                </>
                            ) : (
                                <div className="p-8 text-center bg-base-200/40 border-2 border-dashed border-base-300 rounded-2xl text-base-content/40">
                                    <span className="text-3xl">⚠️</span>
                                    <p className="text-xs font-black uppercase mt-2">Hasil Belum Dapat Diidentifikasi</p>
                                    <p className="text-[10px] font-bold mt-1">Hasil belum bisa diidentifikasi karena salah satu pihak (orang tua/siswa) belum mengisi angket.</p>
                                </div>
                            )}
                        </div>
                    );
                })()}
            </CustomModal>
        </div>
    );
}