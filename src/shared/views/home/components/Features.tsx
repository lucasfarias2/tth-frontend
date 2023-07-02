import React from 'react';
import BarChartIcon from '@/shared/components/ui/icons/BarChartIcon';
import CalendarDateIcon from '@/shared/components/ui/icons/CalendarDateIcon';
import FrequencyIcon from '@/shared/components/ui/icons/FrequencyIcon';

interface FeatureProps {
  icon: React.ReactNode;
  title: string;
  description: string;
}

const Feature = ({ icon, title, description }: FeatureProps) => {
  return (
    <div className="flex w-full flex-col items-center p-4">
      <div className="mb-1 flex flex-col items-center">
        <div className="mb-2 flex items-center justify-center rounded-full p-2">{icon}</div>
        <h3 className="mb-1 text-xl font-semibold">{title}</h3>
      </div>
      <p className="text-sm text-white/75">{description}</p>
    </div>
  );
};

const Features = () => {
  return (
    <div className="flex flex-row flex-wrap items-start border-y-2 border-rose-600 bg-gradient-to-b from-rose-500 to-rose-600 px-8 py-2 text-center text-white shadow-lg md:flex-nowrap md:py-8 2xl:px-48">
      <Feature
        icon={<FrequencyIcon className="text-5xl text-white/30" />}
        title="Habit creation"
        description="Kickstart your journey to self-improvement by creating habits for an entire year."
      />
      <Feature
        icon={<CalendarDateIcon className="text-5xl text-white/30" />}
        title="Effort tracking"
        description="Each week, log the 'effort' you've put towards your habits. Understand the real effort you're investing and how it matches up with your expectations."
      />
      <Feature
        icon={<BarChartIcon className="text-5xl text-white/30" />}
        title="Progress visualization"
        description="Bring your progress to life, showing you how much you're accomplishing, which habits are taking up most of your time, and how your effort evolves week by week."
      />
    </div>
  );
};

export default Features;
