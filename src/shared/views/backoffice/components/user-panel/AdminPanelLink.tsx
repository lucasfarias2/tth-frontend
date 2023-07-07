import { ComponentType } from 'react';
import { NavLink, NavLinkProps } from 'react-router-dom';

const AdminPanelLink = ({ Icon, label, end, to, external }: IProps) => {
  const defaultClass = 'flex items-center py-2 px-3 text-sm font-medium text-white rounded-lg';

  const inner = (
    <>
      {Icon && <Icon className="mr-3 flex items-center text-2xl text-white/50" />}
      {label}
    </>
  );

  if (external) {
    return (
      <a href={to} className={defaultClass}>
        {inner}
      </a>
    );
  }

  return (
    <NavLink
      to={to as NavLinkProps['to']}
      className={({ isActive }) =>
        `${isActive ? 'bg-white/10 text-white' : 'text-white/70 hover:bg-white/5'} ${defaultClass}`
      }
      end={end}
    >
      {inner}
    </NavLink>
  );
};

type IProps = {
  // eslint-disable-next-line @typescript-eslint/no-explicit-any
  Icon?: ComponentType<any>;
  label: string;
  end?: boolean;
  to: string;
  external?: boolean;
};

export default AdminPanelLink;
