import trackEvent from '@/shared/utils/ga-tracking';

const Header = ({ device }: { device: IDevice }) => {
  return (
    <div className="flex items-center justify-between bg-white py-2 md:h-[470px] md:py-0 md:pl-16 2xl:px-48">
      <div className="flex h-full max-w-2xl flex-col items-center justify-center text-center md:items-start md:text-left">
        <Announcements />
        <Title device={device} />
        <Actions />
      </div>
      {device.type === 'desktop' && (
        <div className="relative h-full w-3/4 overflow-hidden">
          <img
            src="https://i.imgur.com/RI7AjRn.png"
            alt="App Screenshot"
            className="max-h-none -right-3/2 absolute top-12 ml-4 w-[900px] max-w-none rounded-2xl border-8 border-neutral-800 shadow-lg"
          />
        </div>
      )}
    </div>
  );
};

const Announcements = () => {
  return (
    <div className="mb-4 mt-4 inline-block items-center rounded-full bg-rose-50 p-2 text-xs text-rose-600 md:mt-0">
      <span className="mr-2 rounded-full bg-white py-1 px-2">Latest feature</span>
      <span className="px-1 text-rose-600">Web-mobile experience released</span>
    </div>
  );
};

const Title = ({ device }: { device: IDevice }) => {
  return (
    <div className="px-6 md:px-0">
      <h1 className="mb-6 text-3xl font-semibold leading-tight md:mb-4 md:text-5xl">
        Master your habits, <p>achieve great results.</p>
      </h1>
      {device.type === 'mobile' && (
        <div className="mb-6 max-h-64 overflow-hidden border-b">
          <img
            src="https://i.imgur.com/65BQ1v5.png"
            alt="App Screenshot"
            className="mx-auto mb-6 w-64 rounded-3xl border-4 border-neutral-600 shadow-2xl"
          />
        </div>
      )}
      <div className="pb-8 text-gray-500">
        This app empowers you to track, measure, and improve your habits over the course of a year. Set your habits,
        track your efforts, and visualize your progress with our intuitive and engaging charts.
      </div>
    </div>
  );
};

const Actions = () => {
  return (
    <div className="mb-8">
      <a
        href="/#"
        className="mr-2 rounded-lg border bg-white p-3 px-4 text-sm font-semibold text-rose-500 shadow-sm"
        onClick={() => {
          trackEvent('home_header_click_more');
        }}
      >
        Learn more
      </a>
      <a
        href="/signup"
        className="rounded-lg bg-rose-500 p-3 px-4 text-sm font-semibold text-white"
        onClick={() => {
          trackEvent('home_header_click_start');
        }}
      >
        Start now
      </a>
    </div>
  );
};

export default Header;
