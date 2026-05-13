import React from 'react'
import CustomButton from '../atoms/CustomButton'
import { FaCheckSquare, FaTimes } from 'react-icons/fa'
import { MdOutlineSick } from "react-icons/md";
import { IoMdMailOpen } from "react-icons/io";

export default function AttendanceCard() {
    return (
        <div className='card card-lg bg-white'>
            <div className="card-body">
                <div className="flex gap-4 items-center ">
                    <img src="" alt="" className='w-10 h-10 rounded-full bg-aksen-2' />
                    <div>
                        <h4>Mahesa Syawal Abdurahman</h4>
                        <p>NIS:12312313</p>
                    </div>
                </div>
                <div className='grid grid-cols-2 gap-2'>
                    <CustomButton type={'primary'}><FaCheckSquare/> Hadir</CustomButton>
                    <CustomButton type={'secondary'}><IoMdMailOpen /> Izin</CustomButton>
                    <CustomButton type={'accent'}><MdOutlineSick /> Sakit</CustomButton>
                    <CustomButton type={'neutral'}><FaTimes/> Alpa</CustomButton>
                </div>
                <center>
                    <div className="badge badge-primary px-3">Hadir</div>
                    {/* <div className="badge badge-secondary px-2">Izin</div>
                    <div className="badge badge-accent px-2">Sakit</div>
                    <div className="badge badge-neutral px-2">Alpa</div> */}
                </center>
            </div>
        </div>
    )
}
