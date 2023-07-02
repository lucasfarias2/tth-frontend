import PageTitle from '@/shared/components/ui/page-title/PageTitle';

const Roadmap = () => {
  const devRoadmap = [
    {
      title: 'Cancelling & Finishing Habits',
      description: 'Users to be able to cancel and finish dates for habits with record of its progress.',
      status: 'On track',
    },
    {
      title: 'Email & notifications',
      description: 'Get notifications when its time to fill your efforts.',
      status: 'On track',
    },
    {
      title: 'Mobile iOS app',
      description: 'First release early access of the native iOS app',
      status: 'On track',
    },
    {
      title: 'Watch OS app',
      description: 'First release early access of the native Watch OS app',
      status: 'On track',
    },
    {
      title: 'Android app',
      description: 'First release early access of the native Android app',
      status: 'On track',
    },
  ];

  return (
    <div className="with-navbar-max-height-mobile p-6 md:px-16 2xl:px-48">
      <PageTitle
        title="Development roadmap"
        subtitle="Please fill out the form and we will reach back to you as soon as possible."
      />
      <div className="mt-4 max-w-lg rounded-lg border bg-white px-4 shadow-sm">
        {devRoadmap.map(item => {
          return (
            <div key={item.description} className="mb-1 flex items-center justify-between border-b py-4 last:border-0">
              <div className="flex-1">
                <div className="font-medium">{item.title}</div>
                <div className="text-sm text-gray-500">{item.description}</div>
              </div>
              <div
                className={`ml-4 rounded-lg border p-1 text-xs ${
                  item.status === 'On track' && 'border-sky-200 bg-sky-50 text-sky-500'
                }`}
              >
                {item.status}
              </div>
            </div>
          );
        })}
      </div>
    </div>
  );
};

export default Roadmap;
