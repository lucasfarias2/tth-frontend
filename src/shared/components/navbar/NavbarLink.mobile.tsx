import { ComponentType, MouseEvent, SyntheticEvent } from 'react';
import { NavLink, NavLinkProps, useNavigate } from 'react-router-dom';

const NavbarLinkMobile = ({ className, to, label, subLabel, Icon, end, closeMenu }: IProps) => {
  const navigate = useNavigate();
  const defaultClass = `flex items-center py-2 px-3 text-sm font-medium ${className}`;

  const handleClick = (event: MouseEvent<HTMLAnchorElement, MouseEvent> | SyntheticEvent) => {
    event.preventDefault();
    if (closeMenu) {
      closeMenu();
    }
    navigate(to as NavLinkProps['to']);
  };

  return (
    <NavLink
      to={to as NavLinkProps['to']}
      className={({ isActive }) =>
        `${isActive ? 'rounded-lg border-rose-400 bg-gray-100 text-black' : ''} ${defaultClass}`
      }
      onClick={handleClick}
      end={end}
    >
      {Icon && <Icon className="mr-3 flex items-center text-2xl text-gray-500" />}
      <div className="flex flex-col">
        <div className="max-w-[140px] overflow-hidden truncate overflow-ellipsis text-xs leading-none text-gray-400">
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
