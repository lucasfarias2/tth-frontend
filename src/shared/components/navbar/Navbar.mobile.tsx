import { useQueryClient } from '@tanstack/react-query';
import { useState } from 'react';
import { createPortal } from 'react-dom';
import Logo from '@/components/logo/Logo';
import EQueryKeys from '@/shared/queries/query-keys';
import CloseIcon from '../ui/icons/CloseIcon';
import MenuIcon from '../ui/icons/MenuIcon';
// Please replace this import with your actual CloseIcon
import NavbarLink from './NavbarLink';

const NavbarMobile = () => {
  const queryClient = useQueryClient();
  const user = queryClient.getQueryData([EQueryKeys.User]) as TTHUser;
  const [openMobileMenu, setOpenMobileMenu] = useState(false);

  const handleCloseMenu = () => {
    setOpenMobileMenu(false);
  };

  return (
    <>
      <nav className="flex h-[60px] items-center justify-between bg-white px-4 shadow-sm">
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
            <div
              className="fixed inset-0 bg-black opacity-70 backdrop-blur-md backdrop-filter"
              onClick={handleCloseMenu}
            />
            <div className="fixed top-0 right-0 z-10 h-screen w-3/4 max-w-xs transform overflow-y-auto bg-white p-4 transition-transform duration-200 ease-in-out">
              <div>
                {!user && <NavbarLink to="/login" label="Login" />}
                {!user && <NavbarLink to="/signup" label="Sign up" />}
                {user && <NavbarLink to="/api/logout" label="Logout" />}
                {user && <NavbarLink to="/account/" label={user.first_name || user.email} />}
              </div>
            </div>
            <button
              type="button"
              onClick={handleCloseMenu}
              className="absolute top-2 left-12 rounded-full p-1"
            >
              <CloseIcon className="text-3xl text-white" />
            </button>
          </>,
          document.body
        )}
    </>
  );
};

export default NavbarMobile;
