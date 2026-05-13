import React from 'react'
import CustomButton from '../../components/atoms/CustomButton'
import AssignmentCard from '../../components/organism/AssignmentCard'
import { FaClipboardList, FaPlus } from 'react-icons/fa'

export default function AssignmentsPage() {
    return (
        <div className='mx-auto max-w-6xl px-10 py-5 gap-4 shadow-lg rounded-md my-2 '>
            <h2 className='block text-primary text-3xl font-bold mb-3 flex items-center gap-2'><FaClipboardList /> Daftar Upload Tugas Siswa</h2>

            {/* filter */}
            <div className="flex gap-4 my-4">
                <select id='kelas' defaultValue="Pilih Kelas" className="w-fit rounded-xl bg-white select select-secondary">
                    <option disabled={true}>Pilih Kelas</option>
                    <option>Semua Kelas</option>
                    <option>X PST 1</option>
                    <option>X PST 2</option>
                    <option>X PST 3</option>
                </select>

                <select id='status' defaultValue="Semua Status" className="w-fit rounded-xl bg-white select select-secondary">
                    <option disabled={true}>Semua Status</option>
                    <option>X PST 1</option>
                    <option>X PST 2</option>
                    <option>X PST 3</option>
                </select>

                <CustomButton type={'primary'}><FaPlus/> Tambah Tugas</CustomButton>
            </div>

            {/* Card tugas */}
            <div className='grid grid-cols-2 gap-4'>
                <AssignmentCard/>
                <AssignmentCard/>
            </div>
        </div>
    )
}
