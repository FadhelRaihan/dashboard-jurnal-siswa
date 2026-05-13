import React from 'react'

export default function CustomButton({ 
  className = '', 
  type = 'primary', 
  onClick, 
  children, 
  disabled = false,
  loading = false 
}) {
  const baseClasses = "btn font-black tracking-wide rounded-2xl border-none transition-all active:scale-95 duration-200 shadow-md hover:shadow-xl hover:-translate-y-0.5 flex justify-center items-center gap-2";
  
  const typeClasses = {
    primary: "btn-primary shadow-primary/30",
    secondary: "btn-secondary shadow-secondary/30",
    accent: "btn-accent shadow-accent/30",
    neutral: "btn-neutral shadow-neutral/30",
    ghost: "btn-ghost shadow-none hover:bg-base-200",
    error: "btn-error shadow-error/30",
    success: "btn-success shadow-success/30",
    warning: "btn-warning shadow-warning/30",
  };

  const currentType = typeClasses[type] || typeClasses.primary;

  return (
    <button 
      onClick={onClick}
      disabled={loading || disabled}
      className={`${baseClasses} ${currentType} ${className}`}
    >
      {loading ? (
        <>
          <span className="loading loading-spinner loading-sm"></span>
          <span className="font-bold">Memuat...</span>
        </>
      ) : (
        children
      )}
    </button>
  )
}