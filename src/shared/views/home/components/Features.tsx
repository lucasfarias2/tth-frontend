import React from 'react';
import BarChartIcon from '@/shared/components/ui/icons/BarChartIcon';
import CalendarDateIcon from '@/shared/components/ui/icons/CalendarDateIcon';
import FrequencyIcon from '@/shared/components/ui/icons/FrequencyIcon';

interface FeatureProps {
  icon: React.ReactNode;
  title: string;
  description: string;
}

const Feature: React.FC<FeatureProps> = ({ icon, title, description }) => {
  return (
    <div className="flex w-full flex-col items-center p-4">
      <div className="flex flex-col items-center">
        {icon}
        <h3 className="mb-1 text-xl font-semibold">{title}</h3>
      </div>
      <p className="text-sm">{description}</p>
    </div>
  );
};

const Features: React.FC = () => {
  return (
    <div className="flex flex-row flex-wrap items-center border-t p-8 text-center md:flex-nowrap">
      <Feature
        icon={<FrequencyIcon className="mb-2 text-4xl text-rose-400" />}
        title="Habit creation"
        description="Kickstart your journey to self-improvement by creating habits for an entire year."
      />
      <Feature
        icon={<CalendarDateIcon className="mb-2 text-4xl text-rose-400" />}
        title="Effort tracking"
        description="Each week, log the 'effort' you've put towards your habits. Understand the real effort you're investing and how it matches up with your expectations."
      />
      <Feature
        icon={<BarChartIcon className="mb-2 text-4xl text-rose-400" />}
        title="Progress visualization"
        description="Bring your progress to life, showing you how much you're accomplishing, which habits are taking up most of your time, and how your effort evolves week by week."
      />
    </div>
  );
};

export default Features;
