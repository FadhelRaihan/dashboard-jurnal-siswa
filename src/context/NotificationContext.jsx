import React, { createContext, useContext, useState, useCallback } from 'react';
import Notification from '../components/organism/NotificationComponent';

const NotificationContext = createContext();

export const NotificationProvider = ({ children }) => {
  const [notif, setNotif] = useState(null);

  const showNotif = useCallback((type, message) => {
    setNotif({ type, message });
  }, []);

  const closeNotif = useCallback(() => {
    setNotif(null);
  }, []);

  return (
    <NotificationContext.Provider value={{ showNotif }}>
      {children}
      {notif && (
        <Notification 
          type={notif.type} 
          message={notif.message} 
          onClose={closeNotif} 
        />
      )}
    </NotificationContext.Provider>
  );
};

// Custom hook agar pemanggilannya lebih bersih
export const useNotification = () => useContext(NotificationContext);