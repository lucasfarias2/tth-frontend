import { ComponentType } from 'react';

const NavbarLinkExternalMobile = ({ className, to, label, Icon }: IProps) => {
  const defaultClass = `flex items-center py-2 px-3 text-sm font-medium ${className}`;

  return (
    <a href={to} className={defaultClass}>
      {Icon && <Icon className="mr-3 flex items-center text-2xl text-gray-500" />}
      {label}
    </a>
  );
};

interface IProps extends IComponent {
  to: string;
  label: string;
  // eslint-disable-next-line @typescript-eslint/no-explicit-any
  Icon?: ComponentType<any>;
}

export default NavbarLinkExternalMobile;
