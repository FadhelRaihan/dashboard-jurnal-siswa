import React from 'react'
import CustomButton from '../../components/atoms/CustomButton'
import AttendanceCard from '../../components/organism/AttendanceCard'
import AttendanceFilter from '../../components/organism/AttendanceFilter'
import { FaCheckSquare, FaSyncAlt, FaFileExcel } from "react-icons/fa";

export default function AttendancePage() {
    return (
        <div className='mx-auto max-w-6xl p-4 shadow-lg rounded-md mt-2'>
            <h2 className='text-primary text-3xl font-bold mb-3 flex items-center'><FaCheckSquare/> Absensi Siswa Online</h2>
            <AttendanceFilter/>
            <div className='w-full flex gap-2 my-4'>
                <select id='kelas' defaultValue="Pilih Kelas" className="w-fit rounded-xl bg-white select select-secondary">
                    <option disabled={true}>Pilih Kelas</option>
                    <option>X PST 1</option>
                    <option>X PST 2</option>
                    <option>X PST 3</option>
                </select>
                <CustomButton type={'primary'}><FaSyncAlt /> Refresh Data</CustomButton>
                <CustomButton type={'accent'}><FaFileExcel /> Export Excel</CustomButton>
            </div>
            <div className='grid grid-cols-3 gap-4'>
                <AttendanceCard />
                <AttendanceCard />
                <AttendanceCard />
                <AttendanceCard />
                <AttendanceCard />
                <AttendanceCard />
            </div>
        </div>
    )
}
