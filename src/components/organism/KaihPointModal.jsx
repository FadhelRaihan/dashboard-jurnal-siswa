import React, { useEffect } from "react"
import CustomButton from "../atoms/CustomButton"
import { FaCheckCircle, FaTimes } from "react-icons/fa"
// eslint-disable-next-line no-unused-vars
import { motion, AnimatePresence } from "framer-motion"

export default function KaihPointModal({ open, title, itemLabel, value, options, onClose, children, onSelect }) {
  
  // 🚫 BULLETPROOF SCROLL LOCK EFFECT
  useEffect(() => {
    if (open) {
      document.body.classList.add('modal-scroll-lock');
    } else {
      document.body.classList.remove('modal-scroll-lock');
    }
    
    // Cleanup on unmount
    return () => {
      document.body.classList.remove('modal-scroll-lock');
    };
  }, [open]);

  return (
    <AnimatePresence>
      {open && (
        // 🌑 BACKDROP OVERLAY WITH FADE TRANSITION
        <motion.div 
          className="fixed inset-0 bg-base-300/60 backdrop-blur-md flex justify-center items-center sm:items-center items-end z-[999] px-0 sm:px-4"
          initial={{ opacity: 0 }}
          animate={{ opacity: 1 }}
          exit={{ opacity: 0 }}
          transition={{ duration: 0.25 }}
          onClick={onClose}
        >
          {/* 📄 BOTTOM SHEET MODAL WITH SPRING TRANSITION */}
          <motion.div 
            className="bg-base-100 w-full max-w-md sm:rounded-3xl rounded-t-3xl p-6 shadow-2xl max-h-[85vh] flex flex-col border-x border-t sm:border-b border-base-200"
            initial={{ y: "100%" }}
            animate={{ y: 0 }}
            exit={{ y: "100%" }}
            transition={{ type: "spring", damping: 30, stiffness: 380 }}
            onClick={(e) => e.stopPropagation()} // Prevent click propagation out
          >
            
            {/* Header Sheet Handle (Mobile only) */}
            <div className="w-12 h-1.5 bg-base-300 rounded-full self-center mb-4 opacity-50 sm:hidden shrink-0" />
    
            <div className="flex items-start justify-between gap-4 shrink-0 pb-4 border-b border-base-200 mb-2">
              <div>
                <p className="text-xs font-black text-primary tracking-widest uppercase mb-0.5">Pilih Jurnal</p>
                <h2 className="text-2xl font-black text-base-content tracking-tight leading-tight">{itemLabel || title}</h2>
              </div>
              <button 
                className="btn btn-sm btn-circle bg-base-200 hover:bg-base-300 border-none text-base-content/70 transition-all" 
                onClick={onClose}
              >
                <FaTimes />
              </button>
            </div>
    
            <div className="py-4 overflow-y-auto no-scrollbar flex-1">
              {children ? children : (
                <div className="flex flex-col gap-3">
                  {options.map((opt) => {
                    const active = value === opt.value
                    return (
                      <button
                        key={`${opt.value}-${opt.label}`}
                        type="button"
                        onClick={() => onSelect(opt.value)}
                        className={
                          "w-full text-left rounded-2xl border-2 p-4 transition-all duration-200 active:scale-[0.98] relative flex items-center justify-between group " +
                          (active 
                            ? "border-primary bg-primary/5 shadow-md shadow-primary/5" 
                            : "border-base-300/70 hover:border-base-300 bg-base-100 hover:shadow-sm")
                        }
                      >
                        <span className={`font-bold text-sm leading-snug flex-1 pr-4 ${active ? "text-primary font-black" : "text-base-content/80"}`}>
                          {opt.label}
                        </span>
                        <div className={`w-6 h-6 rounded-full flex items-center justify-center shrink-0 border-2 transition-all duration-200 ${active ? 'bg-primary border-primary text-white' : 'border-base-300 group-hover:border-base-content/30'}`}>
                           {active && <FaCheckCircle className="text-lg" />}
                        </div>
                      </button>
                    )
                  })}
                </div>
              )}
            </div>
    
            <div className="pt-4 border-t border-base-200 shrink-0">
              <CustomButton 
                type="primary" 
                className="w-full h-12 font-black tracking-wide shadow-lg active:scale-[0.98] transition-all" 
                onClick={onClose}
              >
                Simpan Pilihan
              </CustomButton>
            </div>
          </motion.div>
        </motion.div>
      )}
    </AnimatePresence>
  )
}