import { useQueryClient } from '@tanstack/react-query';
import { useState } from 'react';
import { createPortal } from 'react-dom';
import Logo from '@/components/logo/Logo';
import EQueryKeys from '@/shared/queries/query-keys';
import BarChartIcon from '../ui/icons/BarChartIcon';
import CloseIcon from '../ui/icons/CloseIcon';
import ConfigurationIcon from '../ui/icons/ConfigurationIcon';
import FrequencyIcon from '../ui/icons/FrequencyIcon';
import HomeIcon from '../ui/icons/HomeIcon';
import LogoutIcon from '../ui/icons/LogoutIcon';
import MenuIcon from '../ui/icons/MenuIcon';
import UserIcon from '../ui/icons/UserIcon';
// Please replace this import with your actual CloseIcon
import NavbarLinkMobile from './NavbarLink.mobile';

const NavbarMobile = () => {
  const queryClient = useQueryClient();
  const user = queryClient.getQueryData([EQueryKeys.User]) as TTHUser;
  const [openMobileMenu, setOpenMobileMenu] = useState(false);

  const handleCloseMenu = () => {
    setOpenMobileMenu(false);
  };

  return (
    <>
      <nav className="flex h-[60px] items-center justify-between bg-white px-6 shadow-sm">
        <Logo />
        <button
          type="button"
          onClick={() => {
            setOpenMobileMenu(true);
          }}
        >
          <MenuIcon className="text-2xl text-black" />
        </button>
      </nav>
      {openMobileMenu &&
        createPortal(
          <>
            <div className="fixed inset-0 bg-neutral-700 opacity-80" onClick={handleCloseMenu} />
            <div className="fixed top-0 left-0 z-10 h-screen w-5/6 max-w-xs overflow-y-auto bg-white p-4">
              <div className="border-b px-4 pb-4">
                <Logo />
              </div>
              {user ? (
                <div className="py-4">
                  <NavbarLinkMobile to="/account/" Icon={HomeIcon} label="Home" />
                  <NavbarLinkMobile to="/account/habits" Icon={FrequencyIcon} label="My habits" />
                  <NavbarLinkMobile to="/account/stats" Icon={BarChartIcon} label="My statistics" />
                  <NavbarLinkMobile to="/account/settings" Icon={ConfigurationIcon} label="My settings" />
                </div>
              ) : (
                <div className="py-4">
                  <NavbarLinkMobile to="/login" Icon={HomeIcon} label="Login" />
                  <NavbarLinkMobile to="/signup" Icon={HomeIcon} label="Sign up" />
                </div>
              )}
            </div>
            <div className="flex items-center justify-between border-t px-3 pt-2">
              {user && (
                <a href="/account/" className="mr-4 flex items-center py-2 text-sm">
                  <UserIcon className="mr-3 text-2xl text-gray-500" />
                  <div>
                    <p className="font-medium">
                      {user.first_name} {user.last_name}
                    </p>
                    <p className="text-xs text-gray-500">{user.email}</p>
                  </div>
                </a>
              )}
              {user && (
                <a href="/api/logout" className="my-2 flex items-center">
                  <LogoutIcon className="mr-3 text-2xl text-gray-400" />
                </a>
              )}
            </div>
            <button type="button" onClick={handleCloseMenu} className="absolute top-2 right-6 rounded-full p-1">
              <CloseIcon className="text-3xl text-white" />
            </button>
          </>,
          document.body
        )}
    </>
  );
};

export default NavbarMobile;
