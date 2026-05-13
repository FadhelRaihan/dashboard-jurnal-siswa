import React from 'react';
import { FaTimes } from 'react-icons/fa';
import CustomButton from '../../../components/atoms/CustomButton';

export default function CreateUpdateClassModal({ 
    isOpen, 
    onClose, 
    onSave, 
    formData, 
    setFormData, 
    editingKelas,
    loading
}) {
    if (!isOpen || !formData) return null;

    const handleInputChange = (e) => {
        const { name, value } = e.target;
        setFormData(prev => ({ ...prev, [name]: value }));
    };

    const handleSubmit = () => {
        // Validasi field wajib
        if (!formData.kelas || !formData.namaWaliKelas) {
            alert("Kelas dan Nama Wali Kelas wajib diisi");
            return;
        }
        onSave(formData);
    };

    return (
        <div className="fixed inset-0 z-[999] flex items-center justify-center">
            <div className="fixed inset-0 bg-black/40" onClick={onClose}></div>
            <div className="relative bg-white rounded-lg shadow-xl w-full max-w-2xl mx-4">
                {/* HEADER */}
                <div className="flex justify-between items-center border-b border-gray-200 px-6 py-4">
                    <h3 className="font-bold text-lg">
                        {editingKelas ? "Edit Kelas" : "Tambah Kelas"}
                    </h3>
                    <button onClick={onClose} className="btn btn-sm btn-ghost">
                        <FaTimes />
                    </button>
                </div>

                {/* CONTENT */}
                <div className="px-6 py-4 max-h-[70vh] overflow-y-auto">
                    <div className="space-y-4">
                        <div className="grid grid-cols-2 gap-3">
                            <div className="form-control">
                                <label className="label">
                                    <span className="label-text font-medium text-gray-700">Kelas *</span>
                                </label>
                                <input
                                    type="text"
                                    className="input input-bordered w-full focus:outline-primary"
                                    name="kelas"
                                    value={formData.kelas || ""}
                                    onChange={handleInputChange}
                                    placeholder="Contoh: 4"
                                />
                            </div>
                            
                            <div className="form-control">
                                <label className="label">
                                    <span className="label-text font-medium text-gray-700">Sub Kelas (Opsional)</span>
                                </label>
                                <input
                                    type="text"
                                    className="input input-bordered w-full focus:outline-primary"
                                    name="subKelas"
                                    value={formData.subKelas || ""}
                                    onChange={handleInputChange}
                                    placeholder="Contoh: A atau B"
                                />
                            </div>
                        </div>

                        <div className="grid grid-cols-2 gap-3">
                            <div className="form-control">
                                <label className="label">
                                    <span className="label-text font-medium text-gray-700">Nama Wali Kelas *</span>
                                </label>
                                <input
                                    type="text"
                                    className="input input-bordered w-full focus:outline-primary"
                                    name="namaWaliKelas"
                                    value={formData.namaWaliKelas || ""}
                                    onChange={handleInputChange}
                                    placeholder="Nama Lengkap"
                                />
                            </div>

                            <div className="form-control">
                                <label className="label">
                                    <span className="label-text font-medium text-gray-700">NIP Wali Kelas</span>
                                </label>
                                <input
                                    type="text"
                                    className="input input-bordered w-full focus:outline-primary"
                                    name="nipWaliKelas"
                                    value={formData.nipWaliKelas || ""}
                                    onChange={handleInputChange}
                                    placeholder="NIP"
                                />
                            </div>
                        </div>

                        <div className="grid grid-cols-2 gap-3">
                            <div className="form-control">
                                <label className="label">
                                    <span className="label-text font-medium text-gray-700">Semester</span>
                                </label>
                                <select 
                                    className="select select-bordered w-full focus:outline-primary"
                                    name="semester"
                                    value={formData.semester || ""}
                                    onChange={handleInputChange}
                                >
                                    <option value="">Pilih Semester</option>
                                    <option value="1 (Ganjil)">1 (Ganjil)</option>
                                    <option value="2 (Genap)">2 (Genap)</option>
                                </select>
                            </div>
                            
                            <div className="form-control">
                                <label className="label">
                                    <span className="label-text font-medium text-gray-700">Tahun Ajaran</span>
                                </label>
                                <input
                                    type="text"
                                    className="input input-bordered w-full focus:outline-primary"
                                    name="tahunAjaran"
                                    value={formData.tahunAjaran || ""}
                                    onChange={handleInputChange}
                                    placeholder="2025/2026"
                                />
                            </div>
                        </div>

                        <div className="grid grid-cols-2 gap-3">
                            <div className="form-control">
                                <label className="label">
                                    <span className="label-text font-medium text-gray-700">Tempat Rapor</span>
                                </label>
                                <input
                                    type="text"
                                    className="input input-bordered w-full focus:outline-primary"
                                    name="tempat"
                                    value={formData.tempat || ""}
                                    onChange={handleInputChange}
                                    placeholder="Contoh: Jakarta"
                                />
                            </div>
                            <div className="form-control">
                                <label className="label">
                                    <span className="label-text font-medium text-gray-700">Tanggal Rapor</span>
                                </label>
                                <input
                                    type="date"
                                    className="input input-bordered w-full focus:outline-primary"
                                    name="tanggalRapor"
                                    value={formData.tanggalRapor || ""}
                                    onChange={handleInputChange}
                                />
                            </div>
                        </div>
                    </div>
                </div>

                {/* FOOTER */}
                <div className="border-t border-gray-200 px-6 py-4 flex justify-end gap-3">
                    <CustomButton type={'accent'} onClick={onClose}>
                        Batal
                    </CustomButton>
                    <CustomButton type={'primary'} onClick={handleSubmit} loading={loading}>
                        {editingKelas ? "Simpan Perubahan" : "Simpan Kelas"}
                    </CustomButton>
                </div>
            </div>
        </div>
    );
}