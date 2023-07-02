import { useQueryClient } from '@tanstack/react-query';
import Logo from '@/components/logo/Logo';
import EQueryKeys from '@/shared/queries/query-keys';
import FileIcon from '../ui/icons/FileIcon';
import HelpIcon from '../ui/icons/HelpIcon';
import LoginIcon from '../ui/icons/LoginIcon';
import LogoutIcon from '../ui/icons/LogoutIcon';
import RegisterIcon from '../ui/icons/RegisterIcon';
import UserIcon from '../ui/icons/UserIcon';
import NavbarLink from './NavbarLink';

const Navbar = () => {
  const queryClient = useQueryClient();
  const user = queryClient.getQueryData([EQueryKeys.User]) as TTHUser;

  return (
    <nav className="flex h-[70px] items-center justify-between border-b bg-white px-16 shadow-sm 2xl:px-48">
      <div className="flex items-center">
        <Logo className="border-r pr-8" />
        <NavbarLink to="/help" label="Contact us" Icon={HelpIcon} subLabel="Need help?" className="ml-4" />
        <NavbarLink
          to="/roadmap"
          label="Development roadmap"
          Icon={FileIcon}
          subLabel="What's next?"
          className="ml-4"
        />
      </div>
      <div className="flex">
        {user ? (
          <>
            <NavbarLink
              to="/account/"
              label="Your account"
              className="mr-2"
              Icon={UserIcon}
              subLabel={`Welcome, ${user.first_name}`}
            />

            <NavbarLink to="/api/logout" label="Logout" Icon={LogoutIcon} />
          </>
        ) : (
          <>
            <NavbarLink to="/login" label="Login" Icon={LoginIcon} subLabel="Have an account?" className="mr-2" />
            <NavbarLink to="/signup" label="Sign up" Icon={RegisterIcon} subLabel="Create a new account" />
          </>
        )}
      </div>
    </nav>
  );
};

export default Navbar;
