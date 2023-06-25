import Page from '@/shared/components/page/Page';
import BarChartIcon from '../components/ui/icons/BarChartIcon';
import CalendarDateIcon from '../components/ui/icons/CalendarDateIcon';
import FrequencyIcon from '../components/ui/icons/FrequencyIcon';

const Home = (props: IViewProps) => {
  return (
    <Page className="py-4 px-48" initialState={props.initialState} withNavbar>
      <div className="mt-8 flex flex-row items-start justify-between">
        <div className="text-left">
          <h1 className="mb-4 text-4xl font-bold">Master your habits, achieve great results.</h1>
          <p className="mb-8 max-w-2xl text-lg">
            This app empowers you to track, measure, and improve your habits over the course of a year. Set your habits,
            track your efforts, and visualize your progress with our intuitive and engaging charts.
          </p>
          <a href="/signup" className="rounded-lg bg-rose-400 p-2 px-4 font-semibold text-white">
            Start now
          </a>
        </div>
        <div className="ml-8">
          <img src="/path-to-your-image" alt="App Screenshot" />
        </div>
      </div>

      <div className="mt-8 flex flex-row items-center border-t pt-4 text-center">
        <div className="flex h-36 w-full flex-col items-center p-4 text-center text-sm">
          <div className="flex flex-col items-center">
            <FrequencyIcon className="mb-2 text-4xl text-rose-400" />
            <h3 className="text-xl font-semibold">Habit creation</h3>
          </div>
          <p>{`Kickstart your journey to self-improvement by creating habits for an entire year.`}</p>
        </div>
        <div className="flex h-36 w-full flex-col items-center p-4">
          <div className="flex flex-col items-center">
            <CalendarDateIcon className="mb-2 text-4xl text-rose-400" />
            <h3 className="text-xl font-semibold">Effort tracking</h3>
          </div>
          <p className="text-sm">{`Each week, log the 'effort' you've put towards your habits. Understand the real effort you're investing and how it matches up with your expectations.`}</p>
        </div>
        <div className="flex h-36 w-full flex-col items-center p-4">
          <div className="flex flex-col items-center">
            <BarChartIcon className="mb-2 text-4xl text-rose-400" />
            <h3 className="text-xl font-semibold">Progress visualization</h3>
          </div>
          <p className="text-sm">{`Our charts bring your progress to life, showing you how much you're accomplishing, which habits are taking
            up most of your time, and how your effort evolves week by week.`}</p>
        </div>
      </div>
    </Page>
  );
};

export default Home;
