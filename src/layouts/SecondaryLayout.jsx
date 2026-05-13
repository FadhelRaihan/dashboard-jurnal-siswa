import React from 'react'
import { Outlet, NavLink } from 'react-router-dom'
import {
  FaHome,
  FaCalendarDay,
  FaCheckSquare,
  FaChartBar,
  FaClipboardList,
  FaBookOpen
} from "react-icons/fa";

export default function SecondaryLayout() {

  const menus = [
    {
      to: "/dashboard",
      label: "Dashboard",
      full: "Dashboard",
      icon: <FaHome />,
      btnClass: "btn-secondary"
    },
    {
      to: "/kaih/panduan",
      label: "Panduan",
      full: "Panduan Pengisian",
      icon: <FaCalendarDay />,
      btnClass: "btn-primary"
    },
    {
      to: "#",
      label: "Teori",
      full: "Teori 7 KAIH",
      icon: <FaCheckSquare />,
      btnClass: "btn-accent"
    },
    {
      to: "#",
      label: "Jurnal",
      full: "Jurnal 7 KAIH",
      icon: <FaChartBar />,
      btnClass: "btn-info"
    },
    {
      to: "#",
      label: "Orang Tua",
      full: "Form Orang Tua",
      icon: <FaClipboardList />,
      btnClass: "btn-warning"
    },
    {
      to: "#",
      label: "Sejawat",
      full: "Form Teman Sejawat",
      icon: <FaBookOpen />,
      btnClass: "btn-neutral"
    }
  ];

  return (
    <div className='min-h-screen flex flex-col bg-base-200'>

      {/* Header */}
      <header className='flex flex-col p-8 bg-base-100 border-b border-base-300 shadow-sm'>
        <h1 className='text-4xl font-black text-primary drop-shadow-sm'>Aplikasi Digital Guru</h1>
        <p className='text-xl font-extrabold text-base-content/70'>SMK UPI CIBIRU</p>
      </header>

      {/* Navbar */}
      <nav className='sticky top-0 z-50 flex justify-center bg-base-100/95 backdrop-blur-md font-bold p-4 gap-3 border-b border-base-200 flex-wrap shadow-sm'>
        {menus.map((menu, index) => (
          <NavLink
            key={index}
            to={menu.to}
            title={menu.full}
            className={({ isActive }) =>
              `btn btn-md font-bold flex items-center gap-2 rounded-xl transition-all duration-200 border-transparent
              ${isActive ? `${menu.btnClass} shadow-md scale-105` : 'bg-transparent hover:bg-base-200 text-base-content/70'}`
            }
          >
            {menu.icon}
            <span>{menu.label}</span>
          </NavLink>
        ))}
      </nav>

      {/* Content */}
      <main className='flex-1 w-full mx-auto max-w-7xl p-6 bg-pattern-dots'>
        <Outlet />
      </main>

      {/* Footer */}
      <footer className='font-bold text-base-content/60 text-center py-6 px-4 bg-base-100 border-t border-base-300 text-sm'>
        &copy; 2026 Denisha Oktaviane Herawan
      </footer>

    </div>
  )
}