import { useQueryClient } from '@tanstack/react-query';
import Logo from '@/components/logo/Logo';
import EQueryKeys from '@/shared/queries/query-keys';
import { ExternalLinkIcon } from '../ui/icons';
import FileIcon from '../ui/icons/FileIcon';
import HelpIcon from '../ui/icons/HelpIcon';
import LoginIcon from '../ui/icons/LoginIcon';
import RegisterIcon from '../ui/icons/RegisterIcon';
import UserIcon from '../ui/icons/UserIcon';
import NavbarLinkDesktop from './NavbarLink.desktop';
import NavbarLinkExternalDesktop from './NavbarLinkExternal.desktop';

const NavbarDesktop = () => {
  const queryClient = useQueryClient();
  const user = queryClient.getQueryData([EQueryKeys.User]) as TTHUser;

  return (
    <nav className="relative flex h-[70px] items-center justify-between border-b bg-white px-16 2xl:px-48">
      <div className="flex items-center">
        <Logo className="border-r pr-8" />
        <NavbarLinkDesktop to="/contact" label="Contact us" Icon={HelpIcon} subLabel="Need help?" className="ml-4" />
        <NavbarLinkDesktop
          to="/roadmap"
          label="Development roadmap"
          Icon={FileIcon}
          subLabel="What's next?"
          className="ml-2"
        />
      </div>
      <div className="flex">
        {user ? (
          <>
            {user.is_staff && <NavbarLinkExternalDesktop to="/backoffice" label="Backoffice" Icon={ExternalLinkIcon} />}
            <NavbarLinkExternalDesktop
              to="/account/"
              label="Your account"
              className="mr-2 text-rose-700"
              Icon={UserIcon}
              subLabel={`Welcome, ${user.first_name}`}
            />
          </>
        ) : (
          <>
            <NavbarLinkDesktop
              to="/login"
              label="Login"
              Icon={LoginIcon}
              subLabel="Have an account?"
              className="mr-2"
            />
            <NavbarLinkDesktop to="/signup" label="Sign up" Icon={RegisterIcon} subLabel="Create a new account" />
          </>
        )}
      </div>
    </nav>
  );
};

export default NavbarDesktop;
