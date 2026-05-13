import React from 'react'
import CustomButton from '../atoms/CustomButton'
import { FaPlus } from 'react-icons/fa'

export default function AssessmentFilter() {
    return (
        <div className='flex gap-3 px-2'>
            <select id='kelas' defaultValue="Pilih Kelas" className="select w-fit min-w-30 bg-white rounded-lg select-secondary">
                <option disabled={true}>Pilih Kelas</option>
                <option>X PST 1</option>
                <option>X PST 2</option>
                <option>X PST 3</option>
            </select>
            <select id='mapel' defaultValue="Pilih Mapel" className="select w-fit bg-white rounded-lg select-secondary">
                <option disabled={true}>Pilih Mapel</option>
                <option>Desain Grafis & Animasi</option>
                <option>Matdis</option>
                <option>PPKN</option>
            </select>
            <select id='jenisPenilaian' defaultValue="Pilih Jenis" className="select w-fit bg-white rounded-lg select-secondary">
                <option disabled={true}>Pilih Jenis</option>
                <option>Ulangan Harian</option>
                <option>Tugas</option>
                <option>UTS</option>
                <option>UAS</option>
                <option>Proyek</option>
            </select>
            <CustomButton type={'primary'}><FaPlus /> Input Nilai</CustomButton>
        </div>
    )
}
