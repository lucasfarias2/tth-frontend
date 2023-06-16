import LogoIcon from './LogoIcon';

const Logo = ({ dark = false }: { dark?: boolean }) => {
  return (
    <a className="logo flex items-center" href="/">
      <div
        className={`mr-2 flex h-[32px] w-[32px] items-center justify-center rounded-full text-[32px] ${
          dark ? 'bg-transparent fill-orange-500' : 'bg-transparent fill-orange-500'
        }`}
      >
        <LogoIcon />
      </div>
      <span className={`text-[22px] ${dark ? 'text-white' : 'text-black'}`}>Track the Habit</span>
    </a>
  );
};

export default Logo;
