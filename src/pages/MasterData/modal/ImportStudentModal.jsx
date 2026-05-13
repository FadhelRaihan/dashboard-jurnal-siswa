import React, { useState, useEffect } from 'react';
import { FaUpload, FaTimes, FaFileExcel } from 'react-icons/fa';
import CustomButton from '../../../components/atoms/CustomButton';

export default function ImportStudentModal({ isOpen, onClose, onImport, schools }) {
    const [selectedSchool, setSelectedSchool] = useState('');
    const [selectedClass, setSelectedClass] = useState('');
    const [file, setFile] = useState(null);
    const [previewData, setPreviewData] = useState([]);
    const [step, setStep] = useState(1);

    if (!isOpen) return null;

    const handleFileChange = (e) => {
        const selectedFile = e.target.files[0];
        if (selectedFile) {
            setFile(selectedFile);
            const reader = new FileReader();
            reader.onload = (event) => {
                const text = event.target.result;
                const lines = text.split('\n');
                const headers = lines[0].split(',').map(h => h.trim());
                const data = [];
                
                for (let i = 1; i < lines.length; i++) {
                    if (lines[i].trim()) {
                        const values = lines[i].split(',').map(v => v.trim());
                        const row = {};
                        headers.forEach((header, index) => {
                            row[header] = values[index];
                        });

                        // Validasi sesuai kolom Spreadsheet: namaLengkap & NISN
                        if (row['namaLengkap'] && row['NISN']) {
                            data.push(row);
                        }
                    }
                }
                setPreviewData(data);
                setStep(3);
            };
            reader.readAsText(selectedFile, 'UTF-8');
        }
    };

    const handleImport = () => {
        if (!selectedSchool || !selectedClass) {
            alert('Pilih sekolah dan kelas terlebih dahulu');
            return;
        }

        // Mapping data untuk dikirim ke Google Apps Script
        const students = previewData.map(item => ({
            idSekolah: selectedSchool,
            idKelas: selectedClass,
            namaLengkap: item['namaLengkap'],
            jenisKelamin: item['jenisKelamin'] || 'L', // Default L jika kosong
            NISN: item['NISN']
        }));

        onImport(students);
        handleReset();
        onClose();
    };

    const handleReset = () => {
        setSelectedSchool('');
        setSelectedClass('');
        setFile(null);
        setPreviewData([]);
        setStep(1);
    };

    const handleClose = () => {
        handleReset();
        onClose();
    };

    // Sinkronisasi dengan struktur data sekolahService.getDropdown()
    // idSekolah & namaSekolah
    const currentSchool = schools.find(s => String(s.idSekolah) === String(selectedSchool));
    const availableClasses = currentSchool?.kelas || [];

    return (
        <>
            <input type="checkbox" id="import-student-modal" className="modal-toggle" checked={isOpen} readOnly />
            <div className="modal modal-open">
                <div className="modal-box max-w-lg border border-primary/20 shadow-2xl">
                    <div className="flex justify-between items-center mb-6">
                        <h3 className="text-xl font-bold flex items-center gap-2 text-primary">
                            <FaUpload /> Import Database Siswa
                        </h3>
                        <button onClick={handleClose} className="btn btn-sm btn-circle btn-ghost"><FaTimes /></button>
                    </div>

                    {step === 1 && (
                        <div className="space-y-4">
                            <div className="form-control">
                                <label className="label"><span className="label-text font-bold">Sekolah Tujuan</span></label>
                                <select
                                    className="select select-bordered border-secondary w-full"
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
                                <label className="label"><span className="label-text font-bold">Kelas Tujuan</span></label>
                                <select
                                    className="select select-bordered border-secondary w-full"
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

                            <div className="modal-action">
                                <CustomButton type={'accent'} onClick={handleClose}>Batal</CustomButton>
                                <CustomButton 
                                    type={'primary'}
                                    onClick={() => (selectedSchool && selectedClass) ? setStep(2) : alert('Lengkapi pilihan!')}
                                >
                                    Lanjutkan
                                </CustomButton>
                            </div>
                        </div>
                    )}

                    {step === 2 && (
                        <div className="space-y-4 text-center">
                            <div className="border-2 border-dashed border-primary/30 rounded-2xl p-10 bg-base-200/50">
                                <FaFileExcel className="mx-auto text-5xl text-primary/40 mb-4" />
                                <p className="text-sm font-medium mb-1">Upload CSV sesuai header Spreadsheet</p>
                                <p className="text-[10px] opacity-60 mb-6 font-mono bg-white p-2 rounded">namaLengkap, jenisKelamin, NISN</p>
                                <input
                                    type="file"
                                    accept=".csv"
                                    onChange={handleFileChange}
                                    className="file-input file-input-primary file-input-sm w-full max-w-xs"
                                />
                            </div>
                            <div className="modal-action">
                                <CustomButton type={'accent'} onClick={() => setStep(1)}>Kembali</CustomButton>
                            </div>
                        </div>
                    )}

                    {step === 3 && (
                        <div className="space-y-4">
                            <div className="bg-base-200 rounded-xl p-4 border border-base-300">
                                <h4 className="font-bold text-sm mb-3">Preview: {previewData.length} Calon Siswa</h4>
                                <div className="max-h-48 overflow-y-auto rounded-lg border border-base-300">
                                    <table className="table table-xs w-full bg-white">
                                        <thead className="bg-base-200">
                                            <tr>
                                                <th>Nama</th>
                                                <th>JK</th>
                                                <th>NISN</th>
                                            </tr>
                                        </thead>
                                        <tbody>
                                            {previewData.slice(0, 10).map((item, index) => (
                                                <tr key={index}>
                                                    <td className="font-medium">{item.namaLengkap}</td>
                                                    <td>{item.jenisKelamin}</td>
                                                    <td className="font-mono">{item.NISN}</td>
                                                </tr>
                                            ))}
                                        </tbody>
                                    </table>
                                </div>
                            </div>
                            <div className="modal-action">
                                <CustomButton type={'accent'} onClick={() => setStep(2)}>Ganti File</CustomButton>
                                <CustomButton type={'primary'} onClick={handleImport}>Konfirmasi & Simpan</CustomButton>
                            </div>
                        </div>
                    )}
                </div>
                <div className="modal-backdrop bg-black/40" onClick={handleClose}></div>
            </div>
        </>
    );
}