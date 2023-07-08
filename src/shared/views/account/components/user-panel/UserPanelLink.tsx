import { ComponentType } from 'react';
import { NavLink, NavLinkProps } from 'react-router-dom';

const UserPanelLink = ({ Icon, label, end, to, external }: UserPanelLinkProps) => {
  const defaultClass = 'flex items-center py-2 px-3 text-sm font-medium my-1 first:mt-0 rounded-lg';

  const inner = (
    <>
      {Icon && <Icon className="mr-3 flex items-center text-2xl text-gray-500" />}
      {label}
    </>
  );

  if (external) {
    return (
      <a href={to} className={`${defaultClass} hover:bg-gray-50`}>
        {inner}
      </a>
    );
  }

  return (
    <NavLink
      to={to as NavLinkProps['to']}
      className={({ isActive }) =>
        `${isActive ? 'border-rose-400 bg-gray-100 text-black' : 'hover:bg-gray-50'} ${defaultClass}`
      }
      end={end}
    >
      {inner}
    </NavLink>
  );
};

type UserPanelLinkProps = {
  // eslint-disable-next-line @typescript-eslint/no-explicit-any
  Icon?: ComponentType<any>;
  label: string;
  end?: boolean;
  to: string;
  external?: boolean;
};

export default UserPanelLink;
