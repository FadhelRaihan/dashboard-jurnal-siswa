import React from 'react'
import AssessmentFilter from '../../components/organism/AssessmentFilter'
import AssessmentSummaryCard from '../../components/organism/AssessmentSummaryCard'
import CustomChart from '../../components/organism/CustomChart';
import { chartData, chartOptions } from './ChartSetup';
import TrendNilaiCard from '../../components/organism/TrendNilaiCard';
import CustomTable from '../../components/organism/CustomTable';
import { columns } from './AssessmentColumns';
import { FaHome, FaCalendarDay, FaCheckSquare, FaChartBar, FaClipboardList, FaBookOpen, FaFilePdf, FaFileExcel, FaPrint } from "react-icons/fa";
import CustomButton from '../../components/atoms/CustomButton';


export default function AssessmentPage() {
    const data = [
        { nama: "Andi", kelas: "XI RPL 1", nilai: 90 },
        { nama: "Budi", kelas: "XI RPL 2", nilai: 85 },
    ];
    return (
        <div className='mx-auto max-w-6xl px-10 py-5 gap-4 shadow-lg rounded-md my-2 '>
            <h2 className=' text-primary text-3xl font-bold mb-3 flex items-center gap-2'><FaChartBar/> Penilaian Siswa</h2>
            
            <AssessmentFilter />

            <div className='my-4'>
                <CustomTable columns={columns} data={data} />
            </div>

            <div className='grid grid-cols-4 gap-4 my-4'>
                <AssessmentSummaryCard type='primary' total='78.9' title='Rata-rata Kelas' />
                <AssessmentSummaryCard type='secondary' total='78.9' title='Nilai Tertinggi' />
                <AssessmentSummaryCard type='accent' total='78.9' title='Nilai Terendah' />
                <AssessmentSummaryCard total='78.9' title='Siswa Tuntas' />
            </div>

            <div className="grid grid-cols-2 gap-4">
                <div className='h-fit p-4 shadow-md rounded-2xl bg-base-100'>
                    <div className='flex justify-between py-3'>
                        <h4 className='text-primary font-bold text-lg flex items-center gap-2'><FaChartBar/> Distribusi Nilai</h4>
                        <select name="jenisChart" id="jenisChart" className='w-fit bg-white rounded-lg jenisChart select select-secondary'>
                            <option value="bar">Bar Chart</option>
                            <option value="donut">Donut Chart</option>
                            <option value="pie">Pie Chart</option>
                        </select>
                    </div>
                    <CustomChart
                        height={'350px'}
                        type="bar"
                        data={chartData}
                        options={chartOptions}
                    />
                </div>
                <TrendNilaiCard />
            </div>
            <div className='w-full flex justify-center mt-6 gap-3 items-center'>
            <CustomButton type={'accent'}><FaFilePdf/> Download PDF</CustomButton>
            <CustomButton type={'primary'}><FaFileExcel/> Download Excel</CustomButton>
            <CustomButton type={'secondary'}><FaPrint/> Print Rapor</CustomButton>
            </div>
        </div>
    )
}
