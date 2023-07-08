import LogoIcon from './LogoIcon';

const Logo = ({
  dark = false,
  className,
  hideTag = false,
}: {
  dark?: boolean;
  className?: string;
  hideTag?: boolean;
}) => {
  return (
    <a className={`logo flex items-center ${className} flex-wrap`} href="/">
      <div className={`mr-2 flex h-[32px] w-[32px] items-center justify-center rounded-full fill-rose-500 text-[40px]`}>
        <LogoIcon />
      </div>
      <span className={`text-[22px] ${dark ? 'text-white' : 'text-black'} mr-2`}>Track the Habit</span>
      {!hideTag && (
        <span className="logo rounded-lg border border-red-200 bg-red-50 p-0.5 px-1 text-xs text-rose-500">
          Early access
        </span>
      )}
    </a>
  );
};

export default Logo;
