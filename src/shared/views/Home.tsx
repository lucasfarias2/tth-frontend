import Page from '@/shared/components/page/Page';

const Home = (props: IViewProps) => {
  return (
    <Page className="p-8" initialState={props.initialState} withNavbar>
      <div className="mt-8 text-center">
        <h1 className="mb-4 text-5xl font-bold">Start tracking your habits</h1>
        <p className="mb-8 text-xl">Engage with your habits by getting insights on your progress.</p>
        <a href="/signup" className="rounded-lg bg-orange-400 p-2 px-4 font-semibold text-white">
          Start now
        </a>

        <div className="mt-16 flex justify-between px-16">
          <div className="h-36 w-full p-4">
            <h3 className="text-xl font-semibold">Create goals, objectives and tasks.</h3>
            Set up your goals, objectives and tasks to track your progress.
          </div>
          <div className="h-36 w-full p-4">
            <h3 className="text-xl font-semibold">Analyze your weekly progress</h3>
            Get insights on how much are you achieving each week, month and year.
          </div>
          <div className="h-36 w-full p-4">
            <h3 className="text-xl font-semibold">Earn achievements</h3>
            Get achievements for completing your tasks, objectives and your goals throughout the years.
          </div>
        </div>
      </div>
    </Page>
  );
};

export default Home;
