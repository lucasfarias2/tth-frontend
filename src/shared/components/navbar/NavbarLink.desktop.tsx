import type { ComponentType, MouseEvent, SyntheticEvent } from 'react';
import { NavLink, NavLinkProps, useNavigate } from 'react-router-dom';

const NavbarLinkMobile = ({ className, to, label, Icon, end, closeMenu, subLabel }: IProps) => {
  const navigate = useNavigate();
  const defaultClass = `flex items-center py-2 px-3 text-sm font-medium ${className} hover:bg-gray-50 rounded-lg`;

  const handleClick = (event: MouseEvent<HTMLAnchorElement, MouseEvent> | SyntheticEvent) => {
    event.preventDefault();
    if (closeMenu) {
      closeMenu();
    }
    navigate(to as NavLinkProps['to']);
  };

  return (
    <NavLink
      to={to}
      className={({ isActive }) => `${isActive ? 'bg-gray-50' : ''} ${defaultClass}`}
      onClick={handleClick}
      end={end}
    >
      {Icon && <Icon className="mr-2 flex items-center text-xl text-gray-400" />}
      <div className="flex flex-col">
        <div className="max-w-[140px] overflow-hidden truncate overflow-ellipsis text-xs leading-none text-gray-500">
          {subLabel}
        </div>
        <div className="leading-2 text-sm font-medium">{label}</div>
      </div>
    </NavLink>
  );
};

interface IProps extends IComponent {
  to: string;
  label: string;
  subLabel?: string;
  // eslint-disable-next-line @typescript-eslint/no-explicit-any
  Icon?: ComponentType<any>;
  end?: boolean;
  closeMenu?: () => void;
}

export default NavbarLinkMobile;
