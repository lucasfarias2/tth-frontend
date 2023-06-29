import Page from '@/shared/components/page/Page';
import BarChartIcon from '../components/ui/icons/BarChartIcon';
import CalendarDateIcon from '../components/ui/icons/CalendarDateIcon';
import FrequencyIcon from '../components/ui/icons/FrequencyIcon';

const Home = (props: IViewProps) => {
  const { device, initialState } = props;

  return (
    <Page className="md:py-8 2xl:px-48" initialState={initialState} device={device} withNavbar>
      <div className="relative flex items-start justify-between overflow-hidden md:h-[470px]">
        <div className="p-8 text-left text-center md:max-w-3xl md:p-24 md:text-left">
          <h1 className="mb-4 text-4xl font-bold">Master your habits, achieve great results.</h1>
          {device.type === 'mobile' && (
            <div className="mt-6 md:mt-0">
              <img
                src="https://i.imgur.com/RI7AjRn.png"
                alt="App Screenshot"
                height={100}
                className="mb-6 max-h-64 rounded-lg border-2 border-white shadow-lg"
              />
            </div>
          )}
          <p className="mb-8 max-w-2xl text-lg">
            This app empowers you to track, measure, and improve your habits over the course of a year. Set your habits,
            track your efforts, and visualize your progress with our intuitive and engaging charts.
          </p>
          <a href="/signup" className="rounded-lg bg-rose-500 p-2 px-4 font-semibold text-white">
            Start now
          </a>
        </div>
        {device.type === 'desktop' && (
          <img
            src="https://i.imgur.com/RI7AjRn.png"
            alt="App Screenshot"
            className="absolute -right-1/3 w-[1200px] rounded-2xl border-8 border-neutral-800 shadow-lg"
          />
        )}
      </div>

      <div className="flex flex-row flex-wrap items-center border-t py-4 text-center md:flex-nowrap">
        <div className="flex w-full flex-col items-center p-4 text-center text-sm">
          <div className="flex flex-col items-center">
            <FrequencyIcon className="mb-2 text-4xl text-rose-400" />
            <h3 className="mb-1 text-xl font-semibold">Habit creation</h3>
          </div>
          <p>{`Kickstart your journey to self-improvement by creating habits for an entire year.`}</p>
        </div>
        <div className="flex w-full flex-col items-center p-4">
          <div className="flex flex-col items-center">
            <CalendarDateIcon className="mb-2 text-4xl text-rose-400" />
            <h3 className="mb-1 text-xl font-semibold">Effort tracking</h3>
          </div>
          <p className="text-sm">{`Each week, log the 'effort' you've put towards your habits. Understand the real effort you're investing and how it matches up with your expectations.`}</p>
        </div>
        <div className="flex w-full flex-col items-center p-4">
          <div className="flex flex-col items-center">
            <BarChartIcon className="mb-2 text-4xl text-rose-400" />
            <h3 className="mb-1 text-xl font-semibold">Progress visualization</h3>
          </div>
          <p className="text-sm">{`Bring your progress to life, showing you how much you're accomplishing, which habits are taking
            up most of your time, and how your effort evolves week by week.`}</p>
        </div>
      </div>

      <h3 className="border-t py-12 text-center text-2xl font-semibold">How does it work?</h3>
      <div className="flex flex-row flex-wrap items-start text-center md:flex-nowrap">
        <div className="flex w-full flex-col items-center p-2 text-center text-sm">
          <div className="flex flex-col items-center">
            <h3 className="text-xl font-semibold text-rose-600">1. Create your habits</h3>
            <img
              src="https://i.imgur.com/PmJIdGM.png"
              alt="App Screenshot"
              className="my-4 h-64 w-96 rounded-lg object-contain shadow-lg"
            />
          </div>
        </div>
        <div className="flex w-full flex-col items-center p-2">
          <div className="flex flex-col items-center">
            <h3 className="text-xl font-semibold text-rose-600">2. Manage your habits</h3>
            <img
              src="https://i.imgur.com/uxVd5jY.png"
              alt="App Screenshot"
              className="my-4 h-64 w-96 rounded-lg object-contain shadow-lg"
            />
          </div>
        </div>
        <div className="flex w-full flex-col items-center p-2">
          <div className="flex flex-col items-center">
            <h3 className="text-xl font-semibold text-rose-600">3. Add weekly effort</h3>
            <img
              src="https://i.imgur.com/sOEn0vQ.png"
              alt="App Screenshot"
              className="my-4 h-64 w-96 rounded-lg object-contain shadow-lg"
            />
          </div>
        </div>
        <div className="flex w-full flex-col items-center p-2">
          <div className="flex flex-col items-center">
            <h3 className="text-xl font-semibold text-rose-600">4. Visualize your data</h3>
            <img
              src="https://i.imgur.com/sCmcC7L.png"
              alt="App Screenshot"
              className="my-4 h-64 w-96 rounded-lg object-contain shadow-lg"
            />
          </div>
        </div>
      </div>
    </Page>
  );
};

export default Home;
