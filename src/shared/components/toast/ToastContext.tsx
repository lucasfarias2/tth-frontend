import React, { createContext, useContext, useEffect, useState } from 'react';
import Toast from './Toast';

type ToastContextData = {
  showToast: (title: string, type: 'error' | 'success', subtitle?: string) => void;
};

const ToastContext = createContext<ToastContextData | undefined>(undefined);

export const useToast = () => {
  const toastContext = useContext(ToastContext);

  if (!toastContext) {
    throw new Error('useToast must be used within a ToastProvider');
  }

  return toastContext;
};

type ToastItem = {
  id: string;
  title: string;
  type: 'error' | 'success';
  subtitle?: string;
};

type ToastProviderProps = {
  children: React.ReactNode;
};

export const ToastProvider: React.FC<ToastProviderProps> = ({ children }) => {
  const [toastQueue, setToastQueue] = useState<ToastItem[]>([]);

  const showToast = (title: string, type: 'error' | 'success', subtitle?: string) => {
    const id = String(Date.now());
    const toast: ToastItem = {
      id,
      title,
      type,
      subtitle,
    };

    setToastQueue([toast]);
  };

  const handleCloseToast = () => {
    setToastQueue([]);
  };

  useEffect(() => {
    if (toastQueue.length > 0) {
      const timer = setTimeout(handleCloseToast, 8000);
      return () => clearTimeout(timer);
    }
  }, [toastQueue]);

  return (
    <ToastContext.Provider value={{ showToast }}>
      {children}
      {toastQueue.map(toast => (
        <Toast
          key={toast.id}
          id={toast.id}
          title={toast.title}
          type={toast.type}
          subtitle={toast.subtitle}
          onClose={handleCloseToast}
        />
      ))}
    </ToastContext.Provider>
  );
};
