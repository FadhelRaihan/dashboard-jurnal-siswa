import React, { useEffect, useState } from 'react'
import { FaCheckSquare, FaPlus, FaInfoCircle } from 'react-icons/fa'
import CustomButton from '../../components/atoms/CustomButton'
import HabitGuideCard from '../../components/organism/HabitGuideCard'
import HabitGuideModal from '../../components/organism/HabitGuideModal'
import { panduanService } from '../../services'
import { useNotification } from '../../context/NotificationContext'
import CustomModal from '../../components/organism/CustomModal'
import { generateId } from '../../utils/helper'

const initialDataForm = () => ({
    idPanduan: generateId('PDN'),
    title: '',
    desc: '',
    icon: 'FaRegClock'
});

export default function KaihPanduanPage() {
    const { showNotif } = useNotification();
    const [isOpen, setIsOpen] = useState(false);
    const [isEdit, setIsEdit] = useState(false)
    const [selectedData, setSelectedData] = useState(null);
    const [form, setForm] = useState(initialDataForm())

    const [loading, setLoading] = useState(false);
    const [dataPanduan, setDataPanduan] = useState([]);

    const [deleteModalOpen, setDeleteModalOpen] = useState(false);
    const [loadingDelete, setLoadingDelete] = useState(false);
    const [selectedIdToDelete, setSelectedIdToDelete] = useState(null);

    const fetchDataPanduan = async () => {
        setLoading(true);
        try {
            const ress = await panduanService.getAll();
            console.log("DEBUG PANDUAN RESS:", ress);
            if (ress?.status) {
                console.log("DEBUG PANDUAN ITEMS:", ress?.data?.items);
                setDataPanduan(ress?.data?.items || []);
            }
        } catch (err) {
            showNotif("error", err?.message || "Gagal mengambil data");
        } finally {
            setLoading(false);
        }
    }

    useEffect(() => {
        fetchDataPanduan();
    }, [])

    const handleAdd = async () => {
        setLoading(true);
        try {
            const ress = await panduanService.add(form);
            if (ress?.success) {
                showNotif("success", "Panduan berhasil ditambahkan");
                setIsOpen(false);
                await fetchDataPanduan();
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
            const id = selectedData?.idPanduan || selectedData?.id;
            const ress = await panduanService.update(id, formData);
            if (ress?.success) {
                showNotif("success", "Panduan berhasil diperbarui");
                setIsOpen(false);
                await fetchDataPanduan();
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
            const ress = await panduanService.delete(selectedIdToDelete);
            if (ress?.success) {
                showNotif("success", "Panduan berhasil dihapus");
                setDeleteModalOpen(false);
                await fetchDataPanduan();
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
            {/* Rich Header */}
            <div className="flex flex-col sm:flex-row justify-between items-start sm:items-center gap-4 bg-base-100 border-2 border-base-200 p-6 rounded-[2rem] shadow-lg shadow-base-200/40">
                <div className="flex items-center gap-4">
                   <div className="w-14 h-14 rounded-2xl bg-primary/10 border border-primary/20 flex items-center justify-center text-2xl text-primary shadow-inner">
                      <FaCheckSquare />
                   </div>
                   <div>
                      <h2 className="text-2xl font-black text-base-content">Panduan Pengisian</h2>
                      <p className="text-xs font-bold text-base-content/50 uppercase tracking-widest mt-0.5">Manajemen Konten Petunjuk 7 KAIH</p>
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
                    <FaPlus className="text-xs" /> Tambah Petunjuk
                </CustomButton>
            </div>

            {/* Main Rendering Grid */}
            <div className="min-h-[300px]">
                {loading ? (
                    <div className="flex flex-col items-center justify-center py-24 gap-3 bg-base-100 rounded-[2rem] border-2 border-base-200 border-dashed">
                        <span className="loading loading-infinity loading-lg text-primary"></span>
                        <span className="text-xs font-black text-base-content/40 uppercase tracking-widest">Memproses Katalog...</span>
                    </div>
                ) : dataPanduan?.length === 0 ? (
                    <div className="flex flex-col items-center justify-center py-24 bg-base-100 rounded-[2rem] border-2 border-base-200 border-dashed text-center">
                        <div className="text-5xl mb-3 opacity-50">📂</div>
                        <p className="text-sm font-black text-base-content/50 uppercase tracking-wider">Belum Ada Petunjuk</p>
                        <p className="text-xs text-base-content/40 mt-1">Mulai isi katalog instruksi dengan menekan tombol Tambah.</p>
                    </div>
                ) : (
                    <div className="grid grid-cols-1 md:grid-cols-2 xl:grid-cols-3 gap-6">
                        {Array.isArray(dataPanduan) && dataPanduan.map((item) => (
                            <HabitGuideCard
                                icon={item.icon}
                                key={item.idPanduan}
                                title={item.title}
                                desc={item.desc}
                                onClick={() => {
                                    setIsEdit(true);
                                    setSelectedData(item);
                                    setForm(item);
                                    setIsOpen(true);
                                }}
                                onClickDelete={(e) => {
                                    e.stopPropagation();
                                    setSelectedIdToDelete(item.idPanduan);
                                    setDeleteModalOpen(true);
                                }}
                            />
                        ))}
                    </div>
                )}
            </div>

            {/* Management Modal */}
            <HabitGuideModal
                isOpen={isOpen}
                onClose={() => !loading && setIsOpen(false)}
                initialData={selectedData}
                onSubmit={isEdit ? handleEdit : handleAdd}
                loading={loading}
                form={form}
                setForm={setForm}
            />

            {/* Dynamic confirmation Dialog */}
            <CustomModal
                isOpen={deleteModalOpen}
                onClose={() => !loadingDelete && setDeleteModalOpen(false)}
                onConfirm={handleDelete}
                title="Hapus Petunjuk? 🗑️"
                confirmText="Ya, Hapus Permanen"
                cancelText="Batal"
                type="accent"
                isLoading={loadingDelete}
            >
                <div className="flex flex-col items-center text-center gap-3 py-2">
                    <div className="w-14 h-14 rounded-full bg-accent/10 text-accent flex items-center justify-center text-xl animate-bounce">
                        <FaInfoCircle />
                    </div>
                    <p className="text-base font-black text-base-content">Konfirmasi Penghapusan Data</p>
                    <p className="text-sm font-medium text-base-content/60 leading-relaxed">
                       Apakah anda yakin ingin menghapus data panduan yang dipilih? Data ini tidak akan lagi tampil pada dasbor siswa.
                    </p>
                </div>
            </CustomModal>
        </div>
    )
}