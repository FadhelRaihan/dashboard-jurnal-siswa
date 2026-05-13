import React from 'react'

export default function ClickableCard({ icon, title, desk }) {
    return (
        <div className="card bg-base-100 shadow-md rounded-3xl border border-base-300/30 hover:shadow-xl hover:-translate-y-1 transition-all duration-300 overflow-hidden group relative">
            <div className="h-2 w-full bg-gradient-to-r from-primary via-secondary to-accent absolute top-0 opacity-70 group-hover:opacity-100 transition-opacity"></div>
            <div className="card-body p-6 items-center text-center mt-2">
                <div className="w-16 h-16 rounded-2xl bg-base-200 text-primary text-3xl flex items-center justify-center mb-3 shadow-inner group-hover:bg-primary group-hover:text-white group-hover:scale-110 group-hover:rotate-3 transition-all duration-300">
                    {icon}
                </div>
                <h3 className="card-title font-black text-lg text-base-content group-hover:text-primary transition-colors">{title}</h3>
                <p className="text-xs font-bold text-base-content/50 leading-relaxed">
                    {desk}
                </p>
            </div>
        </div>
    )
}