import { ComponentType } from 'react';

const NavbarLinkExternalDesktop = ({ className, to, label, Icon, subLabel }: IProps) => {
  return (
    <a href={to} className={`${className} flex items-center rounded-lg p-2 hover:bg-gray-50`}>
      {Icon && <Icon className="mr-2 flex items-center text-xl text-gray-400" />}
      <div className="flex flex-col">
        <div className="max-w-[140px] overflow-hidden truncate overflow-ellipsis text-xs leading-none text-gray-500">
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

export default NavbarLinkExternalDesktop;
