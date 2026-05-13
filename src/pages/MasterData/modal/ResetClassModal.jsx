import React, { useState } from 'react';
import { FaTrashAlt, FaTimes } from 'react-icons/fa';
import CustomButton from '../../../components/atoms/CustomButton';

export default function ResetClassModal({ isOpen, onClose, onConfirm, schools }) {
    const [selectedSchool, setSelectedSchool] = useState('');
    const [selectedClass, setSelectedClass] = useState('');

    if (!isOpen) return null;

    const currentSchool = schools.find(s => String(s.idSekolah) === String(selectedSchool));
    const availableClasses = currentSchool?.kelas || [];

    const handleNextStep = () => {
        if (!selectedSchool || !selectedClass) {
            return;
        }
        
        const classObj = availableClasses.find(k => k.idKelas === selectedClass);
        
        // Mengirim data ke parent untuk dikonfirmasi melalui CustomModal
        onConfirm(selectedSchool, selectedClass, classObj?.namaKelas);
        
        // Reset state internal dan tutup pemilih
        setSelectedSchool('');
        setSelectedClass('');
        onClose();
    };

    return (
        <div className="modal modal-open">
            <div className="modal-box max-w-md border border-secondary shadow-2xl">
                <div className="flex justify-between items-center mb-6">
                    <h3 className="text-xl font-bold flex items-center gap-2 text-primary">
                        <FaTrashAlt /> Pilih Kelas untuk Direset
                    </h3>
                    <button onClick={onClose} className="btn btn-sm btn-circle btn-ghost">
                        <FaTimes />
                    </button>
                </div>

                <div className="space-y-5">
                    <div className="form-control">
                        <label className="label-text font-bold mb-2 text-secondary">Sekolah</label>
                        <select
                            className="select select-bordered border-secondary w-full focus:ring-2 focus:ring-primary"
                            value={selectedSchool}
                            onChange={(e) => {
                                setSelectedSchool(e.target.value);
                                setSelectedClass('');
                            }}
                        >
                            <option value="">-- Pilih Sekolah --</option>
                            {schools.map(s => (
                                <option key={s.idSekolah} value={s.idSekolah}>{s.namaSekolah}</option>
                            ))}
                        </select>
                    </div>

                    <div className="form-control">
                        <label className="label-text font-bold mb-2 text-secondary">Kelas</label>
                        <select
                            className="select select-bordered border-secondary w-full focus:ring-2 focus:ring-primary"
                            value={selectedClass}
                            onChange={(e) => setSelectedClass(e.target.value)}
                            disabled={!selectedSchool}
                        >
                            <option value="">-- Pilih Kelas --</option>
                            {availableClasses.map(k => (
                                <option key={k.idKelas} value={k.idKelas}>{k.namaKelas}</option>
                            ))}
                        </select>
                    </div>

                    <div className="modal-action gap-2">
                        <CustomButton type="ghost" onClick={onClose}>Batal</CustomButton>
                        <CustomButton 
                            type="primary" 
                            onClick={handleNextStep}
                            disabled={!selectedClass}
                        >
                            Lanjutkan ke Konfirmasi
                        </CustomButton>
                    </div>
                </div>
            </div>
            <div className="modal-backdrop bg-black/40" onClick={onClose}></div>
        </div>
    );
}