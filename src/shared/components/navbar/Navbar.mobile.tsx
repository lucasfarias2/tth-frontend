import { useQueryClient } from '@tanstack/react-query';
import { useEffect, useState } from 'react';
import { createPortal } from 'react-dom';
import Logo from '@/components/logo/Logo';
import EQueryKeys from '@/shared/queries/query-keys';
import BarChartIcon from '../ui/icons/BarChartIcon';
import CloseIcon from '../ui/icons/CloseIcon';
import ConfigurationIcon from '../ui/icons/ConfigurationIcon';
import FileIcon from '../ui/icons/FileIcon';
import FrequencyIcon from '../ui/icons/FrequencyIcon';
import HelpIcon from '../ui/icons/HelpIcon';
import HomeIcon from '../ui/icons/HomeIcon';
import LoginIcon from '../ui/icons/LoginIcon';
import LogoutIcon from '../ui/icons/LogoutIcon';
import MenuIcon from '../ui/icons/MenuIcon';
import RegisterIcon from '../ui/icons/RegisterIcon';
import UserIcon from '../ui/icons/UserIcon';
// Please replace this import with your actual CloseIcon
import NavbarLinkMobile from './NavbarLink.mobile';
import NavbarLinkExternalMobile from './NavbarLinkExternal.mobile';

const NavbarMobile = ({ inRouter = false }: { inRouter?: boolean }) => {
  const queryClient = useQueryClient();
  const user = queryClient.getQueryData([EQueryKeys.User]) as TTHUser;
  const [openMobileMenu, setOpenMobileMenu] = useState(false);

  const DynamicNavLink = !inRouter ? NavbarLinkExternalMobile : NavbarLinkMobile;

  const handleCloseMenu = () => {
    setOpenMobileMenu(false);
  };

  useEffect(() => {
    if (openMobileMenu) {
      document.body.style.overflowY = 'hidden'; // Prevent scrolling
    } else {
      document.body.style.overflowY = ''; // Restore scrolling
    }

    return () => {
      document.body.style.overflowY = ''; // Restore scrolling when unmounting
    };
  }, [openMobileMenu]);

  return (
    <>
      <nav className="relative flex h-[60px] items-center justify-between bg-white px-6 shadow">
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
            <div className="fixed top-0 left-0 z-10 flex h-full w-5/6 max-w-xs flex-col justify-between overflow-y-auto bg-white p-4 shadow-2xl">
              <div>
                <div className="border-b px-4 pb-4">
                  <Logo />
                </div>
                {user ? (
                  <div className="py-4">
                    <DynamicNavLink
                      to="/account/"
                      Icon={HomeIcon}
                      label="Dashboard"
                      closeMenu={() => {
                        setOpenMobileMenu(false);
                      }}
                    />
                    <DynamicNavLink
                      to="/account/habits"
                      Icon={FrequencyIcon}
                      label="My habits"
                      closeMenu={() => {
                        setOpenMobileMenu(false);
                      }}
                    />
                    <DynamicNavLink
                      to="/account/stats"
                      Icon={BarChartIcon}
                      label="My statistics"
                      closeMenu={() => {
                        setOpenMobileMenu(false);
                      }}
                      end
                    />
                    <DynamicNavLink
                      to="/account/settings"
                      Icon={ConfigurationIcon}
                      label="My settings"
                      closeMenu={() => {
                        setOpenMobileMenu(false);
                      }}
                      end
                    />
                  </div>
                ) : (
                  <div className="py-4">
                    <NavbarLinkExternalMobile to="/login" Icon={LoginIcon} label="Login" />
                    <NavbarLinkExternalMobile to="/signup" Icon={RegisterIcon} label="Sign up" />
                  </div>
                )}
              </div>
              <div>
                <div className="mb-4">
                  <NavbarLinkExternalMobile
                    to="/roadmap"
                    Icon={FileIcon}
                    label="Development roadmap"
                    subLabel="What's next?"
                  />
                  <NavbarLinkExternalMobile to="/contact" Icon={HelpIcon} label="Contact us" subLabel="Need help?" />
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
              </div>
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
