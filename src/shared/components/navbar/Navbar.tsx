import { useQueryClient } from '@tanstack/react-query';
import Logo from '@/components/logo/Logo';
import EQueryKeys from '@/shared/queries/query-keys';
import NavbarLink from './NavbarLink';

const Navbar = () => {
  const queryClient = useQueryClient();
  const user = queryClient.getQueryData([EQueryKeys.User]) as TTHUser;

  return (
    <nav className="flex h-[80px] items-center justify-between bg-white px-16 shadow-sm">
      <Logo />
      <div>
        {!user && <NavbarLink to="/login" label="Login" />}
        {!user && <NavbarLink to="/signup" label="Sign up" />}
        {user && <NavbarLink to="/api/logout" label="Logout" />}
        {user && <NavbarLink to="/account/" label={user.first_name || user.email} />}
      </div>
    </nav>
  );
};

export default Navbar;
