import React, { useRef } from 'react'
import { FaCalendarDay, FaClipboard } from 'react-icons/fa';

export default function AttendanceFilter() {
    const datetimeInputRef = useRef(null);

    const handleInputClick = () => {
        if (datetimeInputRef.current) {
            datetimeInputRef.current.showPicker();
        }
    };

    return (
        <div className='card bg-white card-lg'>
            <div className="card-body">
                <h2 className='card-title text-primary font-bold'><FaCalendarDay/> Sesi Absensi Saat ini</h2>
                <div className='grid grid-cols-3 justify-between'>
                    <div className='w-full'>
                        <label htmlFor="datetime" className="block mb-2 font-semibold text-sm">Tanggal & Waktu</label>
                        <input
                            ref={datetimeInputRef}
                            type="datetime-local"
                            className="input input-secondary bg-gray/20 text-black"
                            id='datetime'
                            onClick={handleInputClick}
                        />
                    </div>
                    <div className='w-full'>
                        <label htmlFor="kelas" className='block mb-2 font-semibold text-sm'>Kelas</label>
                        <select id='kelas' defaultValue="Pilih Kelas" className="select select-secondary">
                            <option disabled={true}>Pilih Kelas</option>
                            <option>X PST 1</option>
                            <option>X PST 2</option>
                            <option>X PST 3</option>
                        </select>
                    </div>
                    <div className='w-full'>
                        <label htmlFor="mata-pelajaran" className='block mb-2 font-semibold text-sm'>Mata Pelajaran</label>
                        <select id='mata-pelajaran' defaultValue="Pilih Mata Pelajaran" className="select select-secondary">
                            <option disabled={true}>Pilih Mata Pelajaran</option>
                            <option>X PST 1</option>
                            <option>X PST 2</option>
                            <option>X PST 3</option>
                        </select>
                    </div>
                </div>
                <p className='text-sm flex items-center gap-1'><FaClipboard/> <b>Catatan:</b> Tanggal dan waktu absensi akan dicatat otomatis saat anda mengklik status kehadiran siswa</p>
            </div>
        </div>
    )
}