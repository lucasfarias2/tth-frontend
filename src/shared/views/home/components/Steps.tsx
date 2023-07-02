import React from 'react';

interface StepProps {
  title: string;
  imageSrc: string;
}

const Step: React.FC<StepProps> = ({ title, imageSrc }) => {
  return (
    <div className="my-4 flex w-full flex-col items-center px-6">
      <div className="flex flex-col items-center">
        <h3 className="text-xl">{title}</h3>
        <img
          src={imageSrc}
          alt="App Screenshot"
          className="my-4 h-56 w-96 rounded-2xl border-4 border-white object-cover shadow-lg"
        />
      </div>
    </div>
  );
};

const Steps: React.FC = () => {
  return (
    <>
      <h3 className="mb-4 border-t pt-8 text-center text-2xl font-semibold">How does it work?</h3>
      <div className="mb-4 flex flex-row flex-wrap items-start text-center md:flex-nowrap">
        <Step title="1. Create your habits" imageSrc="https://i.imgur.com/PmJIdGM.png" />
        <Step title="2. Manage your habits" imageSrc="https://i.imgur.com/uxVd5jY.png" />
        <Step title="3. Add weekly effort" imageSrc="https://i.imgur.com/sOEn0vQ.png" />
        <Step title="4. Visualize your data" imageSrc="https://i.imgur.com/sCmcC7L.png" />
      </div>
    </>
  );
};

export default Steps;
