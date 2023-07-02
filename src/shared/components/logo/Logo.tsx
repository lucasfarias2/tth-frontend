import LogoIcon from './LogoIcon';

const Logo = ({ dark = false, className }: { dark?: boolean; className?: string }) => {
  return (
    <a className={`logo flex items-center ${className}`} href="/">
      <div className={`mr-2 flex h-[32px] w-[32px] items-center justify-center rounded-full fill-rose-500 text-[40px]`}>
        <LogoIcon />
      </div>
      <span className={`text-[22px] ${dark ? 'text-white' : 'text-black'}`}>Track the Habit</span>
      <span className="logo ml-2 text-xs text-rose-500">Early access</span>
    </a>
  );
};

export default Logo;
