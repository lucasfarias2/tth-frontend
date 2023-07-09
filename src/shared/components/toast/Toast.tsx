import React, { useContext, useEffect, useState } from 'react';
import CheckCircleIcon from '@/components/ui/icons/CheckCircleIcon';
import CloseIcon from '@/components/ui/icons/CloseIcon';
import ErrorCircleIcon from '@/components/ui/icons/ErrorCircleIcon';
import { DeviceContext } from '@/shared/contexts/DeviceContext';

const Toast: React.FC<ToastProps> = ({ id, title, subtitle, type, onClose }) => {
  const device = useContext(DeviceContext);

  const [showToast, setShowToast] = useState(true);
  const [animationClass, setAnimationClass] = useState('animate-slideInUp');

  const errorIcon = <ErrorCircleIcon className="mr-3 text-lg text-red-500" />;
  const successIcon = <CheckCircleIcon className="mr-3 text-lg text-green-500" />;

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

  const commonClasses = `fixed flex bg-neutral-800 p-3 border-l-4 text-sm text-white shadow-md transition duration-150 ${
    !subtitle ? 'items-center' : ''
  } ${type === 'success' ? 'border-green-500' : 'border-red-500'} ${animationClass}`;

  const desktopStyles = `bottom-4 right-8 rounded-lg ${commonClasses}`;

  const mobileStyles = `bottom-0 w-full ${commonClasses}`;

  return showToast ? (
    <div className={device.type === 'mobile' ? mobileStyles : desktopStyles}>
      {type === 'error' ? errorIcon : successIcon}
      <div className="flex-1">
        <div className="font-semibold leading-tight">{title}</div>
        {subtitle && <div className="mt-1 text-xs opacity-70">{subtitle}</div>}
      </div>
      <div onClick={handleCloseClick} className="cursor-pointer">
        <CloseIcon className="ml-2 text-lg opacity-70" />
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
