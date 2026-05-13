import React, { useEffect } from 'react';

const Notification = ({ type, message, onClose }) => {
  // Auto-close setelah 3 detik
  useEffect(() => {
    const timer = setTimeout(() => {
      onClose();
    }, 3000);
    return () => clearTimeout(timer);
  }, [onClose]);

  // Tentukan class berdasarkan status
  const alertClass = type === 'success' ? 'bg-primary' : 'bg-aksen-1';

  return (
    <div className=" toast toast-end toast-top z-[9999]">
      <div className={`alert ${alertClass} border-none shadow-lg text-white`}>
        <div className='flex gap-2 items-center'>
          {type === 'success' ? (
            <svg xmlns="http://www.w3.org/2000/svg" className="stroke-current flex-shrink-0 h-6 w-6" fill="none" viewBox="0 0 24 24"><path strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" d="M9 12l2 2 4-4m6 2a9 9 0 11-18 0 9 9 0 0118 0z" /></svg>
          ) : (
            <svg xmlns="http://www.w3.org/2000/svg" className="stroke-current flex-shrink-0 h-6 w-6" fill="none" viewBox="0 0 24 24"><path strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" d="M10 14l2-2m0 0l2-2m-2 2l-2-2m2 2l2 2m7-2a9 9 0 11-18 0 9 9 0 0118 0z" /></svg>
          )}
          <span>{message}</span>
        </div>
      </div>
    </div>
  );
};

export default Notification;