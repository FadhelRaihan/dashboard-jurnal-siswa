import React, { useState, useEffect, useCallback, useRef } from 'react';
import { FaSchool, FaPlus, FaUsers, FaDownload, FaUpload, FaTrashAlt, FaExclamationTriangle, FaSearch } from 'react-icons/fa';
import { columns } from './SchoolListColumns';
import { studentColumns } from './StudentListColumns';
import CreateUpdateSchoolModal from './modal/CreateUpdateSchoolModal';
import ClassModal from './modal/ClassModal';
import ImportStudentModal from './modal/ImportStudentModal';
import CustomButton from '../../components/atoms/CustomButton';
import CustomTable from '../../components/organism/CustomTable';
import { siswaService, sekolahService } from '../../services';
import { generateId } from '../../utils/helper';
import { useNotification } from '../../context/NotificationContext';
import CustomModal from '../../components/organism/CustomModal';
import ResetClassModal from './modal/ResetClassModal';
import { useOutletContext } from 'react-router-dom';

const initialFormData = {
    idSekolah: generateId('SKL'),
    namaSekolah: "",
    NPSN: "",
    NSS: "",
    alamatSekolah: "",
    desa: "",
    kecamatan: "",
    kabupaten: "",
    provinsi: "",
    kodePos: "",
    website: "",
    email: "",
    kepalaSekolah: "",
    NIPKepalaSekolah: "",
    kelas: []
};

export default function MasterDataPage() {
    const { role } = useOutletContext();
    const { showNotif } = useNotification();

    const [deleteSiswaModalOpen, setDeleteSiswaModalOpen] = useState(false);
    const [selectedSiswaNisn, setSelectedSiswaNisn] = useState(null); 
    const [resetClassConfirmOpen, setResetClassConfirmOpen] = useState(false);
    const [resetPayload, setResetPayload] = useState({ idSekolah: '', idKelas: '', className: '' });
    const [isResetModalOpen, setIsResetModalOpen] = useState(false);

    const [dataSekolah, setDataSekolah] = useState([]);
    const [loadingSekolah, setLoadingSekolah] = useState(false);
    const [isEditing, setIsEditing] = useState(false);
    const [searchKeyword, setSearchKeyword] = useState(''); 
    const [searchInputValue, setSearchInputValue] = useState(''); 

    const [limit, setLimit] = useState(10);
    const [pagination, setPagination] = useState({
        totalData: 0,
        totalPages: 0,
        currentPage: 1,
        limit: 10,
        hasNext: false,
        hasPrev: false
    });

    const [isSchoolModalOpen, setIsSchoolModalOpen] = useState(false);
    const [isKelasModalOpen, setIsKelasModalOpen] = useState(false);
    const [deleteModalOpen, setDeleteModalOpen] = useState(false);
    const [loadingDelete, setLoadingDelete] = useState(false);
    const [loadingFormSekolah, setLoadingFormSekolah] = useState(false);

    const [form, setForm] = useState(initialFormData);
    const [selectedSchool, setSelectedSchool] = useState(null);
    const [selectedDeleteData, setSelectedDeleteData] = useState(null);

    const [dataSiswaState, setDataSiswaState] = useState([]);
    const [loadingSiswa, setLoadingSiswa] = useState(false);
    const [filterSchoolId, setFilterSchoolId] = useState('');
    const [filterClassId, setFilterClassId] = useState('');
    const [availableClasses, setAvailableClasses] = useState([]);
    const [studentSearchTerm, setStudentSearchTerm] = useState('');
    const [siswaPage, setSiswaPage] = useState(1);
    const [siswaLimit, setSiswaLimit] = useState(10);
    const [siswaPagination, setSiswaPagination] = useState({});

    const [isImportOpen, setIsImportOpen] = useState(false);

    const debounceTimeoutRef = useRef(null);
    const debounceSiswaRef = useRef(null);

    const [optionsSekolah, setOptionsSekolah] = useState([]);

    const fetchDataSekolah = useCallback(async (page = 1, currentLimit = limit, keyword = '') => {
        try {
            setLoadingSekolah(true);
            const result = await sekolahService.getAll(page, currentLimit, keyword);
            if (result && result.items) {
                setDataSekolah(result.items);
                setPagination(result.pagination);
            } else {
                setDataSekolah([]);
                setPagination({ totalData: 0, totalPages: 0, currentPage: 1, limit: currentLimit, hasNext: false, hasPrev: false });
            }
        } catch {
            showNotif("error", "Gagal mengambil data sekolah");
            setDataSekolah([]);
        } finally {
            setLoadingSekolah(false);
        }
    }, [limit, showNotif]);

    const fetchDropDownSekolah = useCallback(async () => {
        try {
            const ress = await sekolahService.getDropdown();
            if (ress) setOptionsSekolah(ress);
        } catch {
            //
        }
    }, []);

    const handleSearchChange = (e) => {
        const value = e.target.value;
        setSearchInputValue(value);
        if (debounceTimeoutRef.current) clearTimeout(debounceTimeoutRef.current);
        debounceTimeoutRef.current = setTimeout(() => {
            setSearchKeyword(value);
            fetchDataSekolah(1, limit, value);
        }, 500);
    };

    const fetchSiswaData = useCallback(async (page = 1, currentLimit = 10, keyword = "", idSekolah = "", idKelas = "") => {
        setLoadingSiswa(true);
        try {
            const result = await siswaService.getAll(page, currentLimit, keyword, idSekolah, idKelas);
            if (result?.status && result.data) {
                setDataSiswaState(result.data.items || []);
                setSiswaPagination(result.data.pagination || {});
            } else {
                setDataSiswaState([]);
            }
        } catch {
            showNotif("error", "Gagal mengambil data siswa");
        } finally {
            setLoadingSiswa(false);
        }
    }, [showNotif]);

    // Fetch data triggered by filter changes
    useEffect(() => {
        fetchDataSekolah(1, limit, searchKeyword);
    }, [limit, searchKeyword, fetchDataSekolah]);

    useEffect(() => {
        fetchDropDownSekolah();
        return () => { if (debounceTimeoutRef.current) clearTimeout(debounceTimeoutRef.current); };
    }, [fetchDropDownSekolah]);

    useEffect(() => {
        if (filterSchoolId) {
            const selected = dataSekolah.find(s => s.idSekolah === filterSchoolId);
            setAvailableClasses(selected?.kelas || []);
            setFilterClassId('');
        } else {
            setAvailableClasses([]);
            setFilterClassId('');
        }
    }, [filterSchoolId, dataSekolah]);

    useEffect(() => {
        if (debounceSiswaRef.current) clearTimeout(debounceSiswaRef.current);
        debounceSiswaRef.current = setTimeout(() => {
            fetchSiswaData(siswaPage, siswaLimit, studentSearchTerm, filterSchoolId, filterClassId);
        }, 500);
        return () => clearTimeout(debounceSiswaRef.current);
    }, [studentSearchTerm, filterSchoolId, filterClassId, siswaPage, siswaLimit, fetchSiswaData]);

    useEffect(() => {
        if (filterSchoolId) {
            const selected = optionsSekolah.find(s => s.idSekolah === filterSchoolId);
            setAvailableClasses(selected?.kelas || []);
        } else {
            setAvailableClasses([]);
        }
        setSiswaPage(1);
    }, [filterSchoolId, optionsSekolah]);

    const handlePageChange = (newPage) => fetchDataSekolah(newPage, limit, searchKeyword);
    const handleLimitChange = (newLimit) => {
        setLimit(newLimit);
        fetchDataSekolah(1, newLimit, searchKeyword);
    };

    const handleAddNew = () => {
        setIsEditing(false);
        setForm({ ...initialFormData, idSekolah: generateId('SKL') });
        setIsSchoolModalOpen(true);
    };

    const handleEdit = (row) => {
        setIsEditing(true);
        setForm(row);
        setIsSchoolModalOpen(true);
    };

    const handleManageKelas = (row) => {
        setSelectedSchool(row);
        setIsKelasModalOpen(true);
    };

    const handleOpenDeleteModal = (row) => {
        setSelectedDeleteData(row);
        setDeleteModalOpen(true);
    };

    const handleSiswaPageChange = (page) => setSiswaPage(page);
    const handleSiswaLimitChange = (limit) => {
        setSiswaLimit(limit);
        setSiswaPage(1);
    };

    const handleDelete = async () => {
        try {
            setLoadingDelete(true);
            const ress = await sekolahService.delete(selectedDeleteData?.idSekolah);
            if (ress?.success) {
                showNotif("success", ress?.message);
                fetchDataSekolah(pagination.currentPage, limit, searchKeyword);
            } else {
                showNotif("error", ress?.message || "Gagal menghapus data sekolah");
            }
        } catch (err) {
            showNotif("error", err?.message || "Terjadi kesalahan saat menghapus");
        } finally {
            setDeleteModalOpen(false);
            setLoadingDelete(false);
        }
    };

    const handleSaveSchool = async (formData) => {
        try {
            setLoadingFormSekolah(true);
            const action = isEditing ? sekolahService.update(form.idSekolah, formData) : sekolahService.add(formData);
            const ress = await action;
            if (ress?.success) {
                showNotif("success", ress?.message);
                setIsSchoolModalOpen(false);
                isEditing ? fetchDataSekolah(pagination.currentPage, limit, searchKeyword) : fetchDataSekolah(1, limit, searchKeyword);
            } else {
                showNotif("error", ress?.message || "Gagal menyimpan data sekolah");
            }
        } catch (err) {
            showNotif("error", err?.message || "Terjadi kesalahan saat menyimpan");
        } finally {
            setLoadingFormSekolah(false);
        }
    };

    const handleResetSearch = () => {
        setSearchInputValue('');
        setSearchKeyword('');
        fetchDataSekolah(1, limit, '');
    };

    const handleProcessImport = async (payload) => {
        setLoadingSiswa(true);
        try {
            const res = await siswaService.importBulk(payload);
            if (res.success) {
                showNotif("success", res.message);
                setIsImportOpen(false);
                fetchSiswaData(1, siswaLimit, studentSearchTerm, filterSchoolId, filterClassId);
            } else {
                showNotif("error", res.message || "Gagal mengimport beberapa data");
            }
        } catch {
            showNotif("error", "Gagal menghubungi server");
        } finally {
            setLoadingSiswa(false);
        }
    };

    const handleDownloadTemplate = () => {
        const headers = ['namaLengkap', 'jenisKelamin', 'NISN'];
        const exampleData = [
            ['Ahmad Fathurrahman', 'L', "'00123456"],
            ['Siti Aminah', 'P', "'08765432"]
        ];
        const csvContent = [ headers.join(','), ...exampleData.map(row => row.join(',')) ].join('\n');
        const blob = new Blob([csvContent], { type: 'text/csv;charset=utf-8;' });
        const url = URL.createObjectURL(blob);
        const link = document.createElement('a');
        link.setAttribute('href', url);
        link.setAttribute('download', 'template_import_siswa.csv');
        link.style.visibility = 'hidden';
        document.body.appendChild(link);
        link.click();
        document.body.removeChild(link);
    };

    const handleSiswaDeleteClick = (nisn) => {
        setSelectedSiswaNisn(nisn);
        setDeleteSiswaModalOpen(true);
    };

    const confirmSiswaDelete = async () => {
        setLoadingSiswa(true);
        try {
            const res = await siswaService.delete(selectedSiswaNisn);
            if (res.success) {
                showNotif("success", "Siswa berhasil dihapus");
                fetchSiswaData(siswaPage, siswaLimit, studentSearchTerm, filterSchoolId, filterClassId);
            } else {
                showNotif("error", res.message);
            }
        } catch {
            showNotif("error", "Gagal menghapus siswa");
        } finally {
            setDeleteSiswaModalOpen(false);
            setLoadingSiswa(false);
        }
    };

    const handleResetClassRequest = (idSekolah, idKelas, className) => {
        setResetPayload({ idSekolah, idKelas, className });
        setResetClassConfirmOpen(true);
    };

    const confirmResetClass = async () => {
        setLoadingSiswa(true);
        try {
            const res = await siswaService.deleteByClass(resetPayload.idSekolah, resetPayload.idKelas);
            if (res.success) {
                showNotif("success", res.message);
                fetchSiswaData(1, siswaLimit, studentSearchTerm, filterSchoolId, filterClassId);
            } else {
                showNotif("error", res.message);
            }
        } catch {
            showNotif("error", "Terjadi kesalahan sistem");
        } finally {
            setResetClassConfirmOpen(false);
            setLoadingSiswa(false);
        }
    };

    return (
        <div className="mx-auto w-full space-y-8 pt-4 pb-10">
            {/* Header Page */}
            <div className="flex flex-col gap-2 mb-2">
                <div className="flex items-center gap-2 text-primary font-black text-sm uppercase tracking-widest">
                    <span className="w-6 h-0.5 bg-primary rounded-full" />
                    Administrasi Database
                </div>
                <h1 className="text-3xl font-black text-base-content tracking-tight">Master Data</h1>
                <p className="text-sm font-bold text-base-content/50">Kelola entitas sekolah, kelas, dan data otentifikasi siswa.</p>
            </div>

            {/* Section: Tabel Sekolah */}
            <div className="bg-base-100 rounded-[2.5rem] shadow-lg shadow-base-200/50 border-2 border-base-200 overflow-hidden">
                <div className="px-6 py-6 border-b-2 border-base-200 bg-gradient-to-r from-base-100 to-base-200/30 flex flex-col lg:flex-row justify-between lg:items-center gap-6">
                    <div className="flex items-center gap-4">
                        <div className="w-14 h-14 rounded-2xl bg-primary/10 flex items-center justify-center text-2xl text-primary shadow-inner border border-primary/20 shrink-0">
                            <FaSchool />
                        </div>
                        <div>
                           <h2 className="text-xl font-black text-base-content">Daftar Sekolah</h2>
                           <p className="text-xs font-bold text-base-content/50 uppercase tracking-wider">Pangkalan Data Institusi</p>
                        </div>
                    </div>

                    <div className="flex flex-wrap items-center gap-3">
                        <div className="relative">
                            <div className="absolute inset-y-0 left-0 flex items-center pl-3.5 pointer-events-none text-base-content/40">
                                <FaSearch className="text-sm"/>
                            </div>
                            <input
                                type="text"
                                placeholder="Cari nama sekolah..."
                                className="input input-bordered bg-white/70 backdrop-blur-md border-2 border-base-300 focus:border-primary font-bold pl-10 rounded-2xl w-full text-sm transition-all"
                                value={searchInputValue}
                                onChange={handleSearchChange}
                            />
                            {searchInputValue && (
                                <button
                                    onClick={handleResetSearch}
                                    className="absolute right-3 top-1/2 -translate-y-1/2 w-5 h-5 rounded-full bg-base-300 flex items-center justify-center text-xs font-black hover:bg-error hover:text-white transition-colors"
                                >
                                    ✕
                                </button>
                            )}
                        </div>
                        <CustomButton type="primary" onClick={handleAddNew} className="font-black shadow-md shadow-primary/30 pl-5 pr-6 rounded-2xl h-12 w-full sm:w-auto">
                            <FaPlus className="text-sm" /> Tambah Sekolah
                        </CustomButton>
                    </div>
                </div>

                <div className="p-6 lg:p-8 bg-base-100">
                    <CustomTable
                        loading={loadingSekolah}
                        columns={columns(handleEdit, handleOpenDeleteModal, handleManageKelas, role)}
                        data={dataSekolah}
                        pagination={pagination}
                        onPageChange={handlePageChange}
                        onLimitChange={handleLimitChange}
                    />
                </div>
            </div>

            {/* Section: Bagian Siswa */}
            <div className="bg-base-100 rounded-[2.5rem] shadow-lg shadow-base-200/50 border-2 border-base-200 overflow-hidden">
                <div className="px-6 py-6 border-b-2 border-base-200 bg-gradient-to-r from-base-100 to-base-200/30 flex flex-col lg:flex-row justify-between lg:items-center gap-6">
                    <div className="flex items-center gap-4">
                        <div className="w-14 h-14 rounded-2xl bg-info/10 flex items-center justify-center text-2xl text-info shadow-inner border border-info/20 shrink-0">
                            <FaUsers />
                        </div>
                        <div>
                           <h2 className="text-xl font-black text-base-content">Bank Data Siswa</h2>
                           <p className="text-xs font-bold text-base-content/50 uppercase tracking-wider">Manajemen Peserta Didik</p>
                        </div>
                    </div>

                    <div className="flex flex-col sm:flex-row flex-wrap items-center gap-2 w-full lg:w-auto">
                        <CustomButton type="accent" outline onClick={() => setIsResetModalOpen(true)} className="font-bold rounded-xl text-xs px-4 py-3 w-full sm:w-auto">
                            <FaTrashAlt /> Reset Kelas
                        </CustomButton>
                        <div className="w-[1px] h-8 bg-base-300 mx-1 hidden sm:block" />
                        <CustomButton type="info" onClick={handleDownloadTemplate} className="font-black rounded-xl shadow-sm pl-5 pr-6 h-12 w-full sm:w-auto">
                            <FaDownload className="text-sm" /> Template CSV
                        </CustomButton>
                        <CustomButton type="primary" onClick={() => setIsImportOpen(true)} className="font-black shadow-md shadow-primary/30 pl-5 pr-6 rounded-2xl h-12 w-full sm:w-auto">
                            <FaUpload className="text-sm" /> Import Masal
                        </CustomButton>
                    </div>
                </div>

                {/* Sticky-ish Filter Subbar Siswa */}
                <div className="px-6 py-5 bg-base-200/20 flex flex-col sm:flex-row flex-wrap gap-4 items-center border-b border-base-300/50">
                    <div className="flex items-center self-start sm:self-auto gap-2 text-xs font-black text-base-content/40 uppercase tracking-widest min-w-fit mr-2">
                        <span className="w-2 h-2 bg-info rounded-full animate-pulse"></span>
                        Filter Data:
                    </div>
                    <select
                        className="select select-bordered border-2 border-base-300 focus:border-info font-bold text-sm rounded-xl w-full sm:w-auto sm:min-w-[220px] bg-base-100 shadow-sm focus:outline-none"
                        value={filterSchoolId}
                        onChange={(e) => setFilterSchoolId(e.target.value)}
                    >
                        <option value="">🏢 Semua Sekolah</option>
                        {optionsSekolah.map(s => (
                            <option key={s.idSekolah} value={s.idSekolah}>{s.namaSekolah}</option>
                        ))}
                    </select>

                    <select
                        className="select select-bordered border-2 border-base-300 focus:border-info font-bold text-sm rounded-xl w-full sm:w-auto sm:min-w-[180px] bg-base-100 shadow-sm focus:outline-none disabled:bg-base-200/50 disabled:border-base-200"
                        disabled={!filterSchoolId}
                        value={filterClassId}
                        onChange={(e) => setFilterClassId(e.target.value)}
                    >
                        <option value="">🚪 Semua Kelas</option>
                        {availableClasses.map(k => (
                            <option key={k.idKelas} value={k.idKelas}>{k.namaKelas}</option>
                        ))}
                    </select>

                    <div className="relative w-full sm:flex-1 sm:min-w-[280px]">
                        <div className="absolute inset-y-0 left-0 flex items-center pl-3.5 pointer-events-none text-base-content/40">
                           <FaSearch className="text-sm"/>
                        </div>
                        <input
                            type="text"
                            placeholder="Cari NISN atau Nama Siswa..."
                            className="input input-bordered border-2 border-base-300 focus:border-info font-bold text-sm pl-10 rounded-xl w-full bg-base-100 shadow-sm focus:outline-none transition-all"
                            value={studentSearchTerm}
                            onChange={(e) => {
                                setStudentSearchTerm(e.target.value);
                                setSiswaPage(1);
                            }}
                        />
                    </div>
                </div>

                <div className="p-6 lg:p-8 bg-base-100">
                    <CustomTable
                        loading={loadingSiswa}
                        columns={studentColumns(optionsSekolah, handleSiswaDeleteClick, role)}
                        data={dataSiswaState}
                        pagination={siswaPagination}
                        onPageChange={handleSiswaPageChange}
                        onLimitChange={handleSiswaLimitChange}
                    />
                </div>
            </div>

            {/* Modals Definition remain Functional */}
            <CreateUpdateSchoolModal
                loading={loadingFormSekolah}
                isOpen={isSchoolModalOpen}
                onClose={() => setIsSchoolModalOpen(false)}
                onSave={handleSaveSchool}
                isEditing={isEditing}
                form={form}
                setForm={setForm}
                role={role}
            />

            <ClassModal
                fetchDataSekolah={() => fetchDataSekolah(pagination.currentPage, limit, searchKeyword)}
                showNotif={showNotif}
                isOpen={isKelasModalOpen}
                onClose={() => setIsKelasModalOpen(false)}
                onSave={() => setIsKelasModalOpen(false)}
                kelasList={dataSekolah.find(s => s.idSekolah === selectedSchool?.idSekolah)?.kelas || []}
                sekolahId={selectedSchool?.idSekolah}
            />

            <ImportStudentModal
                isOpen={isImportOpen}
                onClose={() => setIsImportOpen(false)}
                onImport={handleProcessImport}
                schools={optionsSekolah}
            />

            <CustomModal
                isOpen={deleteSiswaModalOpen}
                onClose={() => setDeleteSiswaModalOpen(false)}
                onConfirm={confirmSiswaDelete}
                title="Hapus Siswa 🗑️"
                confirmText="Hapus Data"
                cancelText="Batal"
                type="accent"
                isLoading={loadingSiswa}
            >
                <p className="font-bold text-base-content/80 text-center py-2">Apakah anda yakin ingin menghapus siswa dengan NISN <strong className="text-accent text-lg">{selectedSiswaNisn}</strong> secara permanen?</p>
            </CustomModal>

            <CustomModal
                isOpen={resetClassConfirmOpen}
                onClose={() => setResetClassConfirmOpen(false)}
                onConfirm={confirmResetClass}
                title="Konfirmasi Reset Kelas ⚠️"
                confirmText="Hapus Semua"
                cancelText="Batalkan"
                type="accent"
                isLoading={loadingSiswa}
            >
                <div className="flex flex-col gap-4 text-center items-center py-2">
                    <div className="w-16 h-16 rounded-full bg-error/10 flex items-center justify-center text-3xl text-error animate-pulse">
                        <FaExclamationTriangle />
                    </div>
                    <div>
                        <p className="font-black text-lg text-base-content mb-1">Tindakan Fatal Dideteksi!</p>
                        <p className="text-sm font-medium text-base-content/60 leading-relaxed">
                            Anda akan menghapus <strong className="text-error">SELURUH</strong> siswa di kelas <strong className="text-base-content font-black">{resetPayload.className}</strong>. Data ini TIDAK dapat dipulihkan!
                        </p>
                    </div>
                </div>
            </CustomModal>

            <ResetClassModal
                isOpen={isResetModalOpen}
                onClose={() => setIsResetModalOpen(false)}
                onConfirm={handleResetClassRequest}
                schools={optionsSekolah}
            />

            <CustomModal
                isOpen={deleteModalOpen}
                onClose={() => setDeleteModalOpen(false)}
                onConfirm={handleDelete}
                title="Hapus Institusi 🏫"
                confirmText="Ya, Hapus Sekolah"
                cancelText="Kembali"
                type="accent"
                isLoading={loadingDelete}
            >
                <div className="text-center py-2 flex flex-col gap-2">
                    <p className="font-bold text-base-content">Yakin ingin menghapus profil <span className="text-accent font-black">{selectedDeleteData?.namaSekolah}</span>?</p>
                    <p className="text-xs font-semibold text-base-content/50 bg-base-200 p-2 rounded-lg border border-base-300">Semua relasi kelas di dalamnya juga akan diputus secara sistemik.</p>
                </div>
            </CustomModal>
        </div>
    );
}