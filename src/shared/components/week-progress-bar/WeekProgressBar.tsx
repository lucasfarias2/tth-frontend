import React, { useEffect, useRef } from 'react';

const WeekProgressBar = ({ progress }: IProps) => {
  const progressRef = useRef<HTMLDivElement>(null);

  useEffect(() => {
    if (progressRef.current) {
      const adjustedProgress = Math.min(progress, 100);
      progressRef.current.style.width = `${adjustedProgress}%`;
    }
  }, [progress]);

  return (
    <div className="h-1.5 w-full border-b bg-gray-100 shadow-sm">
      <div
        ref={progressRef}
        className={`h-full transition-all duration-300 ease-in-out ${
          progress >= 100 ? 'bg-green-400' : 'bg-neutral-400'
        }`}
      ></div>
    </div>
  );
};

interface IProps {
  progress: number;
}

export default WeekProgressBar;
