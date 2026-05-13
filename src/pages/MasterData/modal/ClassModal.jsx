import React, { useState, useEffect } from 'react';
import { FaPlus, FaEdit, FaTrash, FaTimes } from 'react-icons/fa';
import CreateUpdateClassModal from './CreateUpdateClassModal';
import CustomButton from '../../../components/atoms/CustomButton';
import { formatDate, generateId } from '../../../utils/helper';
import CustomModal from '../../../components/organism/CustomModal';
import kelasService from '../../../services/kelasService';

// Fungsi helper untuk struktur data awal
const createEmptyForm = (sekolahId) => ({
    idSekolah: sekolahId,
    idKelas: generateId('KLS'),
    namaWaliKelas: "",
    nipWaliKelas: "",
    kelas: "",
    subKelas: "",
    semester: "",
    tahunAjaran: "",
    tempat: "",
    tanggalRapor: ""
});

export default function ClassModal({
    isOpen,
    onClose,
    onSave,
    kelasList,
    sekolahId,
    showNotif,
    fetchDataSekolah
}) {
    const [kelasData, setKelasData] = useState([]);
    const [isFormOpen, setIsFormOpen] = useState(false);
    const [editingKelas, setEditingKelas] = useState(null);
    const [formData, setFormData] = useState(null);
    const [loading, setLoading] = useState(false);

    // Delete state
    const [deleteModalOpen, setDeleteModalOpen] = useState(false);
    const [loadingDelete, setLoadingDelete] = useState(false);
    const [selectedKelasToDelete, setSelectedKelasToDelete] = useState(null);

    // 1. Sinkronisasi data list dari props
    useEffect(() => {
        setKelasData(Array.isArray(kelasList) ? kelasList : []);
    }, [kelasList]);

    // 2. Inisialisasi form data saat modal dibuka atau sekolahId berubah
    useEffect(() => {
        if (isOpen) {
            setFormData(createEmptyForm(sekolahId));
        }
    }, [isOpen, sekolahId]);

    if (!isOpen) return null;

    // HANDLE: Buka form untuk data baru (CREATE)
    const handleAddKelas = () => {
        setEditingKelas(null);
        setFormData(createEmptyForm(sekolahId)); // Reset ke kosong dengan ID Sekolah yang benar
        setIsFormOpen(true);
    };

    // HANDLE: Buka form untuk data lama (UPDATE)
    const handleEditKelas = (kelas) => {
        setEditingKelas(kelas);
        setFormData({ ...kelas }); // Copy data kelas yang dipilih ke form
        setIsFormOpen(true);
    };

    const handleDeleteKelas = async () => {
        if (!selectedKelasToDelete) return;
        try {
            setLoadingDelete(true);
            const ress = await kelasService.delete(selectedKelasToDelete?.idKelas);
            if (ress?.success) {
                showNotif("success", ress?.message);
                await fetchDataSekolah();
                setSelectedKelasToDelete(null);
            } else {
                showNotif("error", ress?.message);
            }
        } catch (err) {
            showNotif("error", err?.message);
        } finally {
            setDeleteModalOpen(false);
            setLoadingDelete(false);
        }
    };

    // HANDLE: Aksi setelah simpan berhasil dari CreateUpdateClassModal
    const handleSaveSuccess = async (data) => {
        try {
            setLoading(true)
            let ress;
            if (editingKelas) {
                // Jika sedang edit, panggil service update
                ress = await kelasService.update(data.idKelas, data);
            } else {
                // Jika data baru, panggil service add
                ress = await kelasService.add(data);
            }
            if (ress?.success) {
                showNotif("success", ress?.message);
                await fetchDataSekolah(); // Refresh list kelas
                setIsFormOpen(false); // Tutup modal input
                setEditingKelas(null);
            } else {
                showNotif("error", ress?.message);
            }
        } catch (err) {
            showNotif("error", "Terjadi kesalahan pada server");
        } finally {
            setLoading(false)
        }

    };

    const handleCancelKelas = () => {
        setIsFormOpen(false);
        setEditingKelas(null);
        setFormData(createEmptyForm(sekolahId));
    };

    return (
        <>
            <div className="modal modal-open">
                <div className="modal-box max-w-5xl bg-white p-0 rounded-2xl">
                    <div className="sticky top-0 bg-white border-b border-gray-200 px-6 py-4 flex justify-between items-center z-10">
                        <h2 className="font-bold text-xl">Kelola Kelas</h2>
                        <button onClick={onClose} className="btn btn-sm btn-ghost">
                            <FaTimes />
                        </button>
                    </div>

                    <div className="px-6 py-4 max-h-[calc(80vh-140px)] overflow-y-auto">
                        <div className="mb-4 flex justify-end">
                            <CustomButton type="primary" onClick={handleAddKelas}>
                                <FaPlus /> Tambah Kelas
                            </CustomButton>
                        </div>

                        {kelasData.length === 0 ? (
                            <div className="text-center py-8 text-gray-500">
                                Belum ada kelas tersedia.
                            </div>
                        ) : (
                            <div className="space-y-4">
                                {kelasData.map((kelas, index) => (
                                    <div key={kelas.idKelas || index} className="card border-primary border shadow-sm p-4">
                                        <div className="flex justify-between items-start mb-3">
                                            <h3 className="font-semibold text-lg text-primary">
                                                Kelas {kelas.kelas} - {kelas.subKelas}
                                            </h3>
                                            <div className="flex gap-2">
                                                <CustomButton type="secondary" onClick={() => handleEditKelas(kelas)}>
                                                    <FaEdit />
                                                </CustomButton>
                                                <CustomButton type="accent" onClick={() => {
                                                    setSelectedKelasToDelete(kelas);
                                                    setDeleteModalOpen(true);
                                                }}>
                                                    <FaTrash />
                                                </CustomButton>
                                            </div>
                                        </div>
                                        <div className="grid grid-cols-2 md:grid-cols-3 gap-3 text-sm">
                                            <div>
                                                <span className="font-medium text-gray-600">Wali Kelas:</span>
                                                <div>{kelas.namaWaliKelas} (NIP: {kelas.nipWaliKelas})</div>
                                            </div>
                                            <div>
                                                <span className="font-medium text-gray-600">Semester/TA:</span>
                                                <div>{kelas.semester} / {kelas.tahunAjaran}</div>
                                            </div>
                                            <div>
                                                <span className="font-medium text-gray-600">Tempat, Tgl Rapor:</span>
                                                <div>{kelas.tempat}, {formatDate(kelas.tanggalRapor)}</div>
                                            </div>
                                        </div>
                                    </div>
                                ))}
                            </div>
                        )}
                    </div>

                    <div className="sticky bottom-0 bg-white border-t border-gray-200 px-6 py-4 flex justify-end gap-3">
                        <CustomButton type='accent' onClick={onClose}>Tutup</CustomButton>
                    </div>
                </div>
            </div>

            {/* Modal Input/Edit */}
            <CreateUpdateClassModal
                isOpen={isFormOpen}
                onClose={handleCancelKelas}
                onSave={handleSaveSuccess}
                formData={formData}
                setFormData={setFormData}
                editingKelas={editingKelas}
                loading={loading}
            />

            {/* Modal Delete */}
            <CustomModal
                isOpen={deleteModalOpen}
                onClose={() => {
                    setDeleteModalOpen(false);
                    setSelectedKelasToDelete(null);
                }}
                onConfirm={handleDeleteKelas}
                title="Hapus Data Kelas"
                confirmText="Ya, Hapus"
                cancelText="Batal"
                type="accent"
                isLoading={loadingDelete}
            >
                Apakah anda yakin ingin menghapus data kelas <b>{selectedKelasToDelete?.kelas} {selectedKelasToDelete?.subKelas}</b>?
            </CustomModal>
        </>
    );
}