import React from 'react'
import CustomButton from '../../components/atoms/CustomButton'
import { FaArrowLeft, FaArrowRight, FaCalendarDay, FaPlus, FaSave, FaTimes  } from "react-icons/fa";

export default function SchedulePage() {
    return (
        <>
            <div className='mx-auto max-w-6xl px-10 py-5 gap-4 my-2 shadow-lg rounded-md'>
                <h2 className='text-primary text-3xl font-bold mb-3'>Jadwal Mengajar</h2>
                <div className='flex justify-between'>
                    <div className='flex gap-2'>
                        <CustomButton type='secondary'><FaArrowLeft/> Minggu Sebelumnya</CustomButton>
                        <CustomButton type='secondary'>Minggu Berikutnya <FaArrowRight/></CustomButton>
                        <CustomButton type='primary'><FaCalendarDay/> Minggu Ini</CustomButton>
                    </div>

                    <div className="flex items-center gap-2 text-primary font-semibold">
                        <p>28 Juli 2025 - 28 Juli 2025</p>
                        <CustomButton type={'primary'}><FaPlus/> Tambah Jadwal</CustomButton>
                    </div>

                </div>
                <div className='grid grid-cols-7 items-start gap-4 my-4'>
                    <div className="flex flex-col justify-center items-center">
                        <p className='font-bold text-primary p-2'>Senin</p>
                        <div className='card h-[120px] bg-white w-full flex flex-col p-2'>
                            <p className='font-semibold text-sm'>28 Jul</p>
                            <p className='text-xs font-semibold text-gray-400'>Tidak ada jadwal</p>
                        </div>
                    </div>
                    <div className="flex flex-col justify-center items-center">
                        <p className='font-bold text-primary p-2'>Selasa</p>
                        <div className='card h-[120px] bg-white w-full flex flex-col p-2'>
                            <p className='font-semibold text-sm'>28 Jul</p>
                            <p className='text-xs font-semibold text-gray-400'>Tidak ada jadwal</p>
                        </div>
                    </div>
                    <div className="flex flex-col justify-center items-center">
                        <p className='font-bold text-primary p-2'>Rabu</p>
                        <div className='card h-[120px] bg-white w-full flex flex-col p-2'>
                            <p className='font-semibold text-sm'>28 Jul</p>
                            <p className='text-xs font-semibold text-gray-400'>Tidak ada jadwal</p>
                        </div>
                    </div>
                    <div className="flex flex-col justify-center items-center">
                        <p className='font-bold text-primary p-2'>Kamis</p>
                        <div className='card h-[120px] bg-white w-full flex flex-col p-2'>
                            <p className='font-semibold text-sm'>28 Jul</p>
                            <p className='text-xs font-semibold text-gray-400'>Tidak ada jadwal</p>
                        </div>
                    </div>
                    <div className="flex flex-col justify-center items-center">
                        <p className='font-bold text-primary p-2'>Jum'at</p>
                        <div className='card h-[120px] bg-white w-full flex flex-col p-2'>
                            <p className='font-semibold text-sm'>28 Jul</p>
                            <div className='card rounded-md flex flex-col bg-secondary font-semibold text-white text-xs p-2'>
                                <p>Desain Grafis & ...</p>
                                <p>X PST 1</p>
                            </div>
                        </div>
                    </div>
                    <div className="flex flex-col justify-center items-center">
                        <p className='font-bold text-primary p-2'>Sabtu</p>
                        <div className='card h-[120px] bg-white w-full flex flex-col p-2'>
                            <p className='font-semibold text-sm'>28 Jul</p>
                            <p className='text-xs font-semibold text-gray-400'>Tidak ada jadwal</p>
                        </div>
                    </div>
                    <div className="flex flex-col justify-center items-center">
                        <p className='font-bold text-primary p-2'>Minggu</p>
                        <div className='card h-[120px] bg-white w-full flex flex-col p-2'>
                            <p className='font-semibold text-sm'>28 Jul</p>
                            <p className='text-xs font-semibold text-gray-400'>Tidak ada jadwal</p>
                        </div>
                    </div>
                </div>
            </div>
            <div className='mx-auto max-w-6xl px-10 py-5 gap-4 my-2 shadow-lg rounded-md'>
                <h2 className='text-primary text-3xl font-bold mb-3'>Tambah Jadwal Baru</h2>
                <p className='text-sm'><span className='font-bold'>Catatan:</span> Jadwal yang anda buat akan otomatis berulang setiap minggu, pastikan data sudah benar seblum menyimpan</p>
                <div className='my-2 grid grid-cols-2 gap-4'>
                    <div className='flex flex-col'>
                        <label htmlFor="hari">Hari</label>
                        <select id='hari' defaultValue="Pilih Hari" className="select bg-white select-secondary w-full">
                            <option disabled={true}>Pilih Hari</option>
                            <option>Senin</option>
                            <option>Selasa</option>
                            <option>Rabu</option>
                            <option>Kamis</option>
                            <option>Jumat</option>
                            <option>Sabtu</option>
                            <option>Minggu</option>
                        </select>
                    </div>
                    <div className='flex flex-col'>
                        <label htmlFor="jamMulai">Jam Mulai</label>
                        <input id="jamMulai" type="time" className='input bg-white input-secondary w-full' />
                    </div>
                    <div className='flex flex-col'>
                        <label htmlFor="jamAkhir">Jam Akhir</label>
                        <input id='jamAkhir' type="time" className='input bg-white input-secondary w-full' />
                    </div>
                    <div className='flex flex-col'>
                        <label htmlFor="kelas" className='block mb-2 font-semibold text-sm'>Kelas</label>
                        <select id='kelas' defaultValue="Pilih Kelas" className="select w-full select-secondary bg-white">
                            <option disabled={true}>Pilih Kelas</option>
                            <option>X PST 1</option>
                            <option>X PST 2</option>
                            <option>X PST 3</option>
                        </select>
                    </div>
                    <div className='flex flex-col'>
                        <label htmlFor="mapel" className='block mb-2 font-semibold text-sm'>Mapel</label>
                        <select id='mapel' defaultValue="Pilih Mapel" className="select w-full select-secondary bg-white">
                            <option disabled={true}>Pilih Mapel</option>
                            <option>X PST 1</option>
                            <option>X PST 2</option>
                            <option>X PST 3</option>
                        </select>
                    </div>
                    <div className='flex flex-col'>
                        <label htmlFor="ruangan" className='block mb-2 font-semibold text-sm'>Ruangan</label>
                        <input id='ruangan' placeholder="Pilih Ruangan" className="input w-full select-secondary bg-white"/>
                    </div>
                    <div className="flex gap-3">
                        <CustomButton type={'primary'}><FaSave/>Simpan Jadwal</CustomButton>
                        <CustomButton className='bg-gray-500 border-none'><FaTimes/> Batal</CustomButton>
                    </div>
                </div>
            </div>
        </>
    )
}
