import React, { useEffect, useState } from 'react'
import { FaCheckSquare, FaPlus, FaBookOpen, FaInfoCircle } from 'react-icons/fa'
import CustomButton from '../../components/atoms/CustomButton'
import HabitGuideCard from '../../components/organism/HabitGuideCard'
import HabitGuideModal from '../../components/organism/HabitGuideModal'
import { teoriService } from '../../services'
import { useNotification } from '../../context/NotificationContext'
import CustomModal from '../../components/organism/CustomModal'
import { generateId } from '../../utils/helper'

const initialDataForm = () => ({
    idTeori: generateId('TR'),
    title: '',
    desc: '',
    sumber: '',
    icon: 'FaBook'
});

export default function TeoriPage() {
    const { showNotif } = useNotification();

    const [isOpen, setIsOpen] = useState(false);
    const [isEdit, setIsEdit] = useState(false);
    const [loading, setLoading] = useState(false);
    const [form, setForm] = useState(initialDataForm());
    const [selectedData, setSelectedData] = useState(null);

    const [dataTeori, setDataTeori] = useState([]);

    const [deleteModalOpen, setDeleteModalOpen] = useState(false);
    const [loadingDelete, setLoadingDelete] = useState(false);
    const [selectedIdToDelete, setSelectedIdToDelete] = useState(null);

    const fetchDataTeori = async () => {
        setLoading(true);
        try {
            const ress = await teoriService.getAll();
            if (ress?.status) {
                setDataTeori(ress?.data?.items || []);
            }
        } catch (err) {
            showNotif("error", err?.message || "Gagal mengambil data teori");
        } finally {
            setLoading(false);
        }
    }

    useEffect(() => {
        fetchDataTeori();
    }, [])

    const handleAdd = async () => {
        setLoading(true);
        try {
            const ress = await teoriService.add(form);
            if (ress?.success) {
                showNotif("success", "Teori berhasil ditambahkan");
                setIsOpen(false);
                await fetchDataTeori();
            } else {
                showNotif("error", ress?.message);
            }
        } catch {
            showNotif("error", "Gagal menambahkan data");
        } finally {
            setLoading(false);
        }
    }

    const handleEdit = async (formData) => {
        setLoading(true);
        try {
            const id = selectedData?.idTeori;
            const ress = await teoriService.update(id, formData);
            if (ress?.success) {
                showNotif("success", "Teori berhasil diperbarui");
                setIsOpen(false);
                await fetchDataTeori();
            } else {
                showNotif("error", ress?.message);
            }
        } catch {
            showNotif("error", "Gagal memperbarui data");
        } finally {
            setLoading(false);
        }
    }

    const handleDelete = async () => {
        if (!selectedIdToDelete) return;
        setLoadingDelete(true);
        try {
            const ress = await teoriService.delete(selectedIdToDelete);
            if (ress?.success) {
                showNotif("success", "Teori berhasil dihapus");
                setDeleteModalOpen(false);
                await fetchDataTeori();
            } else {
                showNotif("error", ress?.message);
            }
        } catch {
            showNotif("error", "Gagal menghapus data");
        } finally {
            setLoadingDelete(false);
            setSelectedIdToDelete(null);
        }
    }

    return (
        <div className="py-4 flex flex-col gap-6">
            {/* Rich Header Wrapper */}
            <div className="flex flex-col sm:flex-row justify-between items-start sm:items-center gap-4 bg-base-100 border-2 border-base-200 p-6 rounded-[2rem] shadow-lg shadow-base-200/40">
                <div className="flex items-center gap-4">
                   <div className="w-14 h-14 rounded-2xl bg-primary/10 border border-primary/20 flex items-center justify-center text-2xl text-primary shadow-inner">
                      <FaBookOpen />
                   </div>
                   <div>
                      <h2 className="text-2xl font-black text-base-content">Pustaka Teori 7 KAIH</h2>
                      <p className="text-xs font-bold text-base-content/50 uppercase tracking-widest mt-0.5">Manajemen Rujukan Dasar Materi Pendidikan</p>
                   </div>
                </div>
                <CustomButton
                    type={'primary'}
                    disabled={loading}
                    className="font-black shadow-md rounded-xl"
                    onClick={() => {
                        setIsEdit(false);
                        const newForm = initialDataForm();
                        setSelectedData(newForm);
                        setForm(newForm);
                        setIsOpen(true);
                    }}
                >
                    <FaPlus className="text-xs" /> Tambah Referensi
                </CustomButton>
            </div>

            {/* Main Rendering Grid Container */}
            <div className="min-h-[300px]">
                {loading ? (
                    <div className="flex flex-col items-center justify-center py-24 gap-3 bg-base-100 rounded-[2rem] border-2 border-base-200 border-dashed">
                        <span className="loading loading-infinity loading-lg text-primary"></span>
                        <span className="text-xs font-black text-base-content/40 uppercase tracking-widest">Memuat Database...</span>
                    </div>
                ) : dataTeori.length === 0 ? (
                    <div className="flex flex-col items-center justify-center py-24 bg-base-100 rounded-[2rem] border-2 border-base-200 border-dashed text-center">
                        <div className="text-5xl mb-3 opacity-50">📑</div>
                        <p className="text-sm font-black text-base-content/50 uppercase tracking-wider">Belum Ada Rujukan Teori</p>
                        <p className="text-xs text-base-content/40 mt-1">Gunakan tombol 'Tambah Referensi' untuk mengisi pangkalan data.</p>
                    </div>
                ) : (
                    <div className="grid grid-cols-1 md:grid-cols-2 xl:grid-cols-3 gap-6">
                        {dataTeori.map((item) => (
                            <HabitGuideCard
                                key={item.idTeori}
                                title={item.title}
                                sumber={item.sumber}
                                desc={item.desc}
                                icon={item.icon || 'FaBook'}
                                onClick={() => {
                                    setIsEdit(true);
                                    setSelectedData(item);
                                    setForm(item);
                                    setIsOpen(true);
                                }}
                                onClickDelete={(e) => {
                                    e.stopPropagation();
                                    setSelectedIdToDelete(item.idTeori);
                                    setDeleteModalOpen(true);
                                }}
                            />
                        ))}
                    </div>
                )}
            </div>

            {/* Form Modal for Creation & Update */}
            <HabitGuideModal
                isTeori={true}
                isOpen={isOpen}
                onClose={() => !loading && setIsOpen(false)}
                initialData={selectedData}
                onSubmit={isEdit ? handleEdit : handleAdd}
                loading={loading}
                form={form}
                setForm={setForm}
            />

            {/* Standard Delete confirmation */}
            <CustomModal
                isOpen={deleteModalOpen}
                onClose={() => !loadingDelete && setDeleteModalOpen(false)}
                onConfirm={handleDelete}
                title="Hapus Rujukan Teori? 🗑️"
                confirmText="Ya, Hapus Permanen"
                cancelText="Batal"
                type="accent"
                isLoading={loadingDelete}
            >
                <div className="flex flex-col items-center text-center gap-3 py-2">
                    <div className="w-14 h-14 rounded-full bg-accent/10 text-accent flex items-center justify-center text-xl animate-bounce">
                        <FaInfoCircle />
                    </div>
                    <p className="text-base font-black text-base-content">Konfirmasi Penghapusan Rujukan</p>
                    <p className="text-sm font-medium text-base-content/60 leading-relaxed">
                       Apakah anda yakin ingin menghapus data teori ini? Aksi ini tidak dapat dibatalkan, dan data referensi akan hilang dari modul pemahaman materi.
                    </p>
                </div>
            </CustomModal>
        </div>
    )
}