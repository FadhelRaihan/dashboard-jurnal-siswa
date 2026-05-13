import React from 'react'
import CustomButton from '../atoms/CustomButton'
import { FaCalendarDay, FaCheckSquare, FaDownload, FaFileExport, FaHourglassHalf, FaRegEye, FaTimesCircle } from "react-icons/fa";

export default function AssignmentCard() {
    return (
        <div className='card bg-white'>
            <div className="card-body">
                <div className='flex flex-col'>
                    <div className='flex justify-between'>
                        <h3 className='text-xl font-semibold text-primary'>Proyek Website Porto</h3>
                        <div className='badge badge-primary px-2 font-semibold flex items-center gap-1'><FaCalendarDay/> 25 Nov 2026</div>
                    </div>
                    <p>X PST 1 • Koding & AI</p>
                </div>
                <div className="flex flex-col">
                    <p>Buatlah Sebuah Website untuk portofilo anda</p>
                    <div className="flex gap-2">
                        <div className='badge badge-primary px-2 rounded-lg flex items-center gap-1'><FaCheckSquare/> 20 Sudah</div>
                        <div className='badge badge-secondary px-2 rounded-lg items-center gap-1'><FaHourglassHalf /> 10 Belum</div>
                        <div className='badge badge-accent px-2 rounded-lg items-center gap-1'><FaTimesCircle /> 12 Terlambat</div>
                    </div>
                </div>
                <div className='flex flex-col gap-2'>
                    <div className='flex justify-between bg-secondary/15 p-2 rounded-lg'>
                        <p className='font-semibold'>Mahesa Syawal A</p>
                        <div className="flex gap-2 items-center text-lg">
                            <div className='badge badge-primary px-2'>Sudah Upload</div>
                            <FaRegEye />
                        </div>
                    </div>
                    <div className='flex justify-between bg-secondary/15 p-2 rounded-lg'>
                        <p className='font-semibold'>Mahesa Syawal A</p>
                        <div className="flex gap-2 items-center text-lg">
                            <div className='badge badge-secondary px-2'>Belum Upload</div>
                            <FaRegEye />
                        </div>
                    </div>
                    <div className='flex justify-between bg-secondary/15 p-2 rounded-lg'>
                        <p className='font-semibold'>Mahesa Syawal A</p>
                        <div className="flex gap-2 items-center text-lg">
                            <div className='badge badge-accent px-2'>Terlambat</div>
                            <FaRegEye />
                        </div>
                    </div>
                </div>
                <div className="grid grid-cols-2 gap-2">
                    <CustomButton type={'primary'}><FaDownload/> Download Semua</CustomButton>
                    <CustomButton type={'secondary'}><FaFileExport/> Export Laporan</CustomButton>
                </div>

            </div>
        </div>
    )
}
