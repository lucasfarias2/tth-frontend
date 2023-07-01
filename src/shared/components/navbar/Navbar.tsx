import { useQueryClient } from '@tanstack/react-query';
import Logo from '@/components/logo/Logo';
import EQueryKeys from '@/shared/queries/query-keys';
import NavbarLink from './NavbarLink';

const Navbar = () => {
  const queryClient = useQueryClient();
  const user = queryClient.getQueryData([EQueryKeys.User]) as TTHUser;

  return (
    <nav className="flex h-[70px] items-center justify-between bg-white px-16 shadow-sm 2xl:px-48">
      <div className="flex">
        <Logo />
        <p className="logo ml-2 rounded-lg text-sm text-red-500">Early access</p>
      </div>

      <div>
        {!user && <NavbarLink to="/login" label="Login" />}
        {!user && <NavbarLink to="/signup" label="Sign up" />}
        {user && <NavbarLink to="/account/" label="Your account" />}
        {user && <NavbarLink to="/api/logout" label="Logout" />}
      </div>
    </nav>
  );
};

export default Navbar;
