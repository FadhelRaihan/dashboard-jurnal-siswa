import React from 'react'
import { FaPencilAlt, FaTrash, FaRegClock, FaPrayingHands, FaRunning, FaAppleAlt, FaBook, FaUsers, FaMoon, FaQuestionCircle } from 'react-icons/fa'

const IconMap = {
    FaRegClock: <FaRegClock />,
    FaPrayingHands: <FaPrayingHands />,
    FaRunning: <FaRunning />,
    FaAppleAlt: <FaAppleAlt />,
    FaBook: <FaBook />,
    FaUsers: <FaUsers />,
    FaMoon: <FaMoon />,
    FaQuestionCircle: <FaQuestionCircle />,
};

export default function HabitGuideCard({ title, desc, sumber, icon, onClick, onClickDelete }) {
    const SelectedIcon = IconMap[icon] || <FaQuestionCircle />;

    return (
        <div className='group relative card bg-base-100 border-2 border-base-200 shadow-md hover:shadow-xl shadow-base-200/50 rounded-[2rem] h-[280px] overflow-hidden transition-all duration-300 hover:-translate-y-1 flex flex-col'>
            <div className="p-6 flex flex-col h-full bg-gradient-to-b from-white to-base-200/20">
                
                {/* Header Content Block */}
                <div className='flex items-start justify-between gap-3 mb-4'>
                    <div className='flex gap-3 items-center flex-1'>
                        <div className='w-12 h-12 shrink-0 rounded-2xl bg-primary/10 text-primary flex items-center justify-center text-xl shadow-inner transition-all duration-500 group-hover:scale-110 group-hover:rotate-3 border border-primary/20'>
                            {SelectedIcon}
                        </div>
                        <h5 className='text-base font-black text-base-content leading-tight tracking-tight line-clamp-2'>
                            {title}
                        </h5>
                    </div>

                    {/* High visibility action block */}
                    <div className='flex flex-col gap-1.5 shrink-0'>
                        <button 
                            onClick={onClick}
                            className='w-8 h-8 rounded-full bg-secondary/10 flex items-center justify-center text-secondary hover:bg-secondary hover:text-white transition-all duration-200 active:scale-90 shadow-sm'
                            title="Edit Panduan"
                        >
                            <FaPencilAlt className='text-xs' />
                        </button>
                        <button 
                            onClick={onClickDelete}
                            className='w-8 h-8 rounded-full bg-accent/10 flex items-center justify-center text-accent hover:bg-accent hover:text-white transition-all duration-200 active:scale-90 shadow-sm'
                            title="Hapus Panduan"
                        >
                            <FaTrash className='text-xs' />
                        </button>
                    </div>
                </div>

                {/* Body: Rich Content */}
                <div className="flex-1 overflow-y-auto pr-2 border-t border-base-300/50 pt-4 mb-1 custom-scrollbar">
                    <div
                        className="prose prose-sm max-w-none text-base-content/70 font-bold text-[13px] leading-relaxed
                        [&_ol]:list-decimal [&_ol]:pl-5 [&_ol]:text-base-content/80
                        [&_ul]:list-disc [&_ul]:pl-5 [&_ul]:text-base-content/80
                        [&_li]:mb-1"
                        dangerouslySetInnerHTML={{ 
                            __html: (desc || "").replaceAll("&nbsp;", " ") 
                        }}
                    />
                </div>

                {/* Conditionally rendering Footer metadata */}
                {sumber && (
                    <div className="mt-2 pt-2 border-t border-dashed border-base-300">
                        <p className="text-[9px] font-black text-base-content/40 uppercase tracking-wider">
                            📚 Sumber: {sumber}
                        </p>
                    </div>
                )}
            </div>
        </div>
    )
}