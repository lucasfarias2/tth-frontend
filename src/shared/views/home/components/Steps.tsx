import React from 'react';

interface StepProps {
  title: string;
  imageSrc: string;
}

const Step: React.FC<StepProps> = ({ title, imageSrc }) => {
  return (
    <div className="my-4 flex w-full flex-col items-center">
      <div className="flex flex-col items-center">
        <h3 className="mb-4 text-xl">{title}</h3>

        <div className="max-h-48 overflow-hidden border-b px-8">
          <img
            src={imageSrc}
            alt="App Screenshot"
            className="mx-auto mb-6 w-56 rounded-3xl border-2 border-neutral-600 shadow-2xl"
          />
        </div>
      </div>
    </div>
  );
};

const Steps: React.FC = () => {
  return (
    <>
      <h3 className="mb-4 border-t pt-8 text-center text-2xl font-semibold">How does it work?</h3>
      <div className="mb-4 flex flex-row flex-wrap items-start text-center md:flex-nowrap md:px-8 2xl:px-48">
        <Step title="Create your habits" imageSrc="https://i.imgur.com/y6Tb9XQ.png" />
        <Step title="Manage your habits" imageSrc="https://i.imgur.com/DFjzwxK.png" />
        <Step title="Add weekly effort" imageSrc="https://i.imgur.com/CcMYyzJ.png" />
        <Step title="Visualize your data" imageSrc="https://i.imgur.com/65BQ1v5.png" />
      </div>
    </>
  );
};

export default Steps;
