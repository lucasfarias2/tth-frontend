import { ComponentType } from 'react';

const NavbarLinkExternalMobile = ({ className, to, label, subLabel, Icon }: IProps) => {
  const defaultClass = `flex items-center py-2 px-3 text-sm font-medium ${className}`;

  return (
    <a href={to} className={defaultClass}>
      {Icon && <Icon className="mr-3 flex items-center text-2xl text-gray-500" />}
      <div className="flex flex-col">
        <div className="max-w-[140px] overflow-hidden truncate overflow-ellipsis text-xs leading-none text-gray-400">
          {subLabel}
        </div>
        <div className="leading-2 text-sm font-medium">{label}</div>
      </div>
    </a>
  );
};

interface IProps extends IComponent {
  to: string;
  label: string;
  subLabel?: string;
  // eslint-disable-next-line @typescript-eslint/no-explicit-any
  Icon?: ComponentType<any>;
}

export default NavbarLinkExternalMobile;
