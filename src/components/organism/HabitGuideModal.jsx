import React, { useEffect } from 'react'
import CustomButton from '../atoms/CustomButton'
import {
    FaRegClock, FaPrayingHands, FaRunning,
    FaAppleAlt, FaBook, FaUsers, FaMoon, FaQuestionCircle
} from "react-icons/fa"

// Import Rich Text Editor
import ReactQuill from 'react-quill-new';
import 'react-quill-new/dist/quill.snow.css';

const ICON_OPTIONS = [
    { id: 'FaRegClock', icon: <FaRegClock />, label: 'Waktu/Jam' },
    { id: 'FaPrayingHands', icon: <FaPrayingHands />, label: 'Ibadah' },
    { id: 'FaRunning', icon: <FaRunning />, label: 'Olahraga' },
    { id: 'FaAppleAlt', icon: <FaAppleAlt />, label: 'Makanan' },
    { id: 'FaBook', icon: <FaBook />, label: 'Belajar' },
    { id: 'FaUsers', icon: <FaUsers />, label: 'Sosial' },
    { id: 'FaMoon', icon: <FaMoon />, label: 'Tidur' },
    { id: 'FaQuestionCircle', icon: <FaQuestionCircle />, label: 'Lainnya' },
];

export default function HabitGuideModal({
    isOpen,
    onClose,
    onSubmit,
    initialData = null,
    isTeori = false,
    loading = false,
    form,
    setForm,
}) {
    useEffect(() => {
        if (isOpen) {
            if (initialData) {
                setForm({
                    idTeori: initialData.idTeori,
                    idPanduan: initialData.idPanduan,
                    title: initialData.title || '',
                    desc: initialData.desc || '',
                    sumber: initialData.sumber || '',
                    icon: initialData.icon || 'FaQuestionCircle',
                })
            } else {
                setForm({ title: '', desc: '', sumber: '', icon: 'FaRegClock' })
            }
        }
    }, [initialData, isOpen, setForm])

    if (!isOpen) return null

    const handleChange = (e) => {
        const { name, value } = e.target;
        setForm(prev => ({ ...prev, [name]: value }))
    }

    const handleQuillChange = (content) => {
        setForm(prev => ({ ...prev, desc: content }))
    }

    const modules = {
        toolbar: [
            ['bold', 'italic', 'underline'],
            [{ 'list': 'ordered' }, { 'list': 'bullet' }],
            ['clean']
        ],
    };

    return (
        <div className="fixed inset-0 bg-black/50 flex justify-center items-center z-[9999] p-4">
            {/* Wrapper Utama Modal: h-auto dan max-h-full untuk membatasi layar */}
            <div className="bg-white w-full max-w-2xl rounded-xl shadow-lg animate-fade-in flex flex-col max-h-full">
                
                {/* Header: Tetap (Sticky) */}
                <div className="p-6 border-b border-base-200">
                    <h2 className="text-xl font-bold text-primary">
                        {isTeori ? (initialData ? "Edit Teori" : "Tambah Teori") : (initialData ? "Edit Panduan" : "Tambah Panduan")}
                    </h2>
                </div>

                {/* Body Form: Scrollable */}
                <div className="p-6 overflow-y-auto flex-1 custom-scrollbar">
                    <form id="modal-form" onSubmit={(e) => { e.preventDefault(); onSubmit(form); }} className="flex flex-col gap-5">
                        <div className="form-control">
                            <label className="label"><span className="label-text font-medium">Judul</span></label>
                            <input
                                type="text"
                                name="title"
                                value={form.title}
                                onChange={handleChange}
                                className="input input-bordered input-primary w-full"
                                required
                            />
                        </div>

                        {isTeori && (
                            <div className="form-control">
                                <label className="label"><span className="label-text font-medium">Sumber Materi</span></label>
                                <input
                                    type="text"
                                    name="sumber"
                                    value={form.sumber}
                                    onChange={handleChange}
                                    className="input input-bordered input-primary w-full"
                                    placeholder="Contoh: Buku Pendidikan Karakter Hal. 12"
                                />
                            </div>
                        )}

                        <div className="form-control">
                            <label className="label"><span className="label-text font-medium">Pilih Ikon Visual</span></label>
                            <div className="grid grid-cols-4 sm:grid-cols-8 gap-2">
                                {ICON_OPTIONS.map((opt) => (
                                    <button
                                        key={opt.id}
                                        type="button"
                                        onClick={() => setForm(prev => ({ ...prev, icon: opt.id }))}
                                        className={`flex flex-col items-center justify-center p-2 rounded-lg border-2 transition-all ${form.icon === opt.id
                                                ? "border-primary bg-primary/10 text-primary"
                                                : "border-gray-200 hover:border-primary/50"
                                            }`}
                                    >
                                        <span className="text-xl">{opt.icon}</span>
                                        <span className="text-[10px] mt-1 text-center leading-tight">{opt.label}</span>
                                    </button>
                                ))}
                            </div>
                        </div>

                        <div className="form-control">
                            <label className="label"><span className="label-text font-medium">Deskripsi (Rich Text)</span></label>
                            <div className="bg-white prose max-w-none">
                                <ReactQuill
                                    theme="snow"
                                    value={form.desc}
                                    onChange={handleQuillChange}
                                    modules={modules}
                                    className="mb-10" // Memberikan ruang di bawah agar toolbar tidak menutupi input
                                    placeholder="Tulis instruksi lengkap di sini..."
                                />
                            </div>
                        </div>
                    </form>
                </div>

                {/* Footer: Tetap (Sticky) */}
                <div className="p-6 border-t border-base-200 flex justify-end gap-2 bg-gray-50 rounded-b-xl">
                    <CustomButton type="accent" onClick={onClose} disabled={loading}>Batal</CustomButton>
                    <CustomButton 
                        loading={loading} 
                        type="primary" 
                        onClick={() => document.getElementById('modal-form').requestSubmit()}
                    >
                        Simpan
                    </CustomButton>
                </div>
            </div>
        </div>
    )
}