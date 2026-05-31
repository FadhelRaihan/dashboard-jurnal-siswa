import React from 'react';
import { FaTimes } from 'react-icons/fa';
import CustomButton from '../atoms/CustomButton';

const CustomModal = ({ 
    isOpen, 
    onClose, 
    onConfirm, 
    title = "Konfirmasi", 
    confirmText = "Simpan", 
    cancelText = "Batal", 
    isLoading = false,
    type = "primary", // Bisa 'primary', 'secondary', 'accent', 'error'
    children,
    hiddenCancel = false,
    widthClass = "max-w-lg",
}) => {
    if (!isOpen) return null;

    return (
        <div className="fixed inset-0 z-[999] flex items-center justify-center">
            {/* Backdrop / Overlay */}
            <div 
                className="fixed inset-0 bg-black/30 transition-opacity" 
                onClick={!isLoading ? onClose : null} // Disable close saat loading
            ></div>

            {/* Modal Container */}
            <div className={`relative bg-base-100 rounded-lg shadow-2xl w-full ${widthClass} mx-4 overflow-hidden border border-base-300`}>
                
                {/* HEADER */}
                <div className="flex justify-between items-center border-b border-base-200 px-6 py-4 bg-base-100">
                    <h3 className="font-bold text-lg text-base-content">
                        {title}
                    </h3>
                    <button 
                        onClick={onClose} 
                        className="btn btn-sm btn-ghost btn-circle"
                        disabled={isLoading}
                    >
                        <FaTimes />
                    </button>
                </div>

                {/* CONTENT */}
                <div className="px-6 py-6 max-h-[60vh] overflow-y-auto text-base-content no-scrollbar">
                    {children}
                </div>

                {/* FOOTER */}
                <div className="bg-base-200/50 px-6 py-4 flex justify-end gap-3 border-t border-base-200">
                    {!hiddenCancel ? (
                        <CustomButton 
                        type={type !== "accent" ? 'accent' : 'primary'} 
                        onClick={onClose}
                        disabled={isLoading}
                        >
                        {cancelText}
                    </CustomButton>
                    ):''}
                    
                    <CustomButton 
                        loading ={isLoading}
                        type={type} 
                        onClick={onConfirm}
                    >
                        {confirmText}
                    </CustomButton>
                </div>
            </div>
        </div>
    );
};

export default CustomModal;