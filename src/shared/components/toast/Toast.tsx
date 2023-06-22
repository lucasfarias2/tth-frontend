import React, { useEffect, useState } from 'react';
import CheckCircleIcon from '@/components/ui/icons/CheckCircleIcon';
import CloseIcon from '@/components/ui/icons/CloseIcon';
import ErrorCircleIcon from '@/components/ui/icons/ErrorCircleIcon';

const Toast: React.FC<ToastProps> = ({ id, title, subtitle, type, onClose }) => {
  const [showToast, setShowToast] = useState(true);
  const [animationClass, setAnimationClass] = useState('animate-slideInUp');

  const errorIcon = <ErrorCircleIcon className="mr-2 text-lg text-red-500" />;
  const successIcon = <CheckCircleIcon className="mr-2 text-lg text-green-500" />;

  useEffect(() => {
    const timeout = setTimeout(() => {
      setAnimationClass('animate-slideOutDown');
      setTimeout(() => setShowToast(false), 200);
    }, 4000);

    return () => {
      clearTimeout(timeout);
    };
  }, []);

  const handleCloseClick = () => {
    setShowToast(false);
    onClose(id);
  };

  return showToast ? (
    <div
      className={`fixed bottom-4 right-8 flex rounded-lg border-l-4 bg-neutral-800 p-3 text-sm text-white shadow-md transition duration-150 ${
        !subtitle ? 'items-center' : ''
      } ${type === 'success' ? 'border-green-500' : 'border-red-500'} ${animationClass}`}
    >
      {type === 'error' ? errorIcon : successIcon}
      <div>
        <div className="font-semibold leading-tight">{title}</div>
        {subtitle && <div className="mt-1 text-xs opacity-70">{subtitle}</div>}
      </div>
      <div onClick={handleCloseClick} className="cursor-pointer">
        <CloseIcon className="ml-2 opacity-70" />
      </div>
    </div>
  ) : null;
};

type ToastProps = {
  id: string;
  title: string;
  subtitle?: string;
  type: 'error' | 'success';
  onClose: (id: string) => void;
};

export default Toast;
