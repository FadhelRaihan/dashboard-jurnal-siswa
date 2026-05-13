import React from 'react'
import { Outlet } from 'react-router-dom'
import logoUpi from '../assets/logo-upi.png';

export default function SiswaGuestLayout() {
    return (
        <div className='bg-base-200 min-h-screen w-screen max-w-md mx-auto flex flex-col shadow-2xl relative border-x border-base-300/60 overflow-hidden font-sans'>
            
            {/* 🪐 Subtle Premium Background Glows (Non-intrusive) */}
            <div className="absolute top-[-10%] left-[-20%] w-[300px] h-[300px] rounded-full bg-primary/10 blur-[80px] pointer-events-none" />
            <div className="absolute bottom-[10%] right-[-20%] w-[250px] h-[250px] rounded-full bg-secondary/10 blur-[70px] pointer-events-none" />
            
            {/* 🏢 Clean Minimalist Header (Ultra Premium) */}
            <header className='relative z-20 py-6 px-8 flex flex-col items-center gap-3 flex-shrink-0'>
                <div className="bg-white/80 px-5 py-2.5 rounded-2xl shadow-sm border border-white/60 backdrop-blur-md flex items-center justify-center hover:scale-[1.02] transition duration-300">
                    <img src={logoUpi} alt="Logo UPI" className="h-6 object-contain" />
                </div>
                
                <div className="text-center mt-2">
                    <h1 className="text-[22px] font-black text-base-content tracking-tight leading-tight uppercase">
                        Jurnal Harian Siswa
                    </h1>
                    <p className="text-[10px] font-black text-primary tracking-[0.15em] uppercase mt-0.5 opacity-90">
                        Track Daily Activities
                    </p>
                </div>
            </header>

            {/* 📊 Main Content Wrapper */}
            <main className="flex-1 relative z-10 px-6 pb-6 flex flex-col justify-center overflow-y-auto no-scrollbar">
                <div className="w-full">
                    <Outlet />
                </div>
            </main>

            {/* Elegant Minimalist Footer */}
            <footer className='font-black text-base-content/30 text-[9px] text-center py-4 bg-transparent border-t border-base-300/30 uppercase tracking-wider flex-shrink-0'>
                &copy; 2026 Denisha Oktaviane Herawan
            </footer>
        </div>
    )
}