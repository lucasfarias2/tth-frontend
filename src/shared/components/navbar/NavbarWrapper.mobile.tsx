import { useQueryClient } from '@tanstack/react-query';
import { ReactNode } from 'react';
import { createPortal } from 'react-dom';
import Logo from '@/components/logo/Logo';
import { CloseIcon, LogoutIcon, MenuIcon, UserIcon } from '@/shared/components/ui/icons';
import EQueryKeys from '@/shared/queries/query-keys';

interface IProps {
  accountLinks: ReactNode;
  guestLinks: ReactNode;
  openMobileMenu: boolean;
  setOpenMobileMenu: (open: boolean) => void;
}

const NavbarWrapperMobile = ({ guestLinks, accountLinks, setOpenMobileMenu, openMobileMenu }: IProps) => {
  const queryClient = useQueryClient();
  const user = queryClient.getQueryData([EQueryKeys.User]) as TTHUser;

  const handleCloseMenu = () => {
    setOpenMobileMenu(false);
  };

  return (
    <>
      <nav className="relative flex h-[60px] items-center justify-between border-b-2 bg-white px-6">
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
            <div className="fixed top-0 left-0 z-10 flex h-full w-5/6 max-w-xs flex-col justify-between overflow-y-auto bg-white shadow-2xl">
              <div>
                <div className="border-b-2 p-4">
                  {user ? <div className="px-2 text-lg font-semibold">Welcome, {user.first_name}</div> : <Logo />}
                </div>
                {accountLinks}
              </div>
              <div>
                <div className="border-t-2">{guestLinks}</div>
                {user && (
                  <div className="flex items-center justify-between border-t-2 bg-gray-100 py-2 px-4">
                    <a href="/account/" className="mr-4 flex items-center py-2 text-sm">
                      <UserIcon className="mr-3 text-2xl text-gray-500" />
                      <div>
                        <p className="font-semibold">
                          {user.first_name} {user.last_name}
                        </p>
                        <p className="text-xs text-gray-500">{user.email}</p>
                      </div>
                    </a>

                    <a href="/api/logout" className="my-2 flex items-center">
                      <LogoutIcon className="mr-3 text-2xl text-gray-400" />
                    </a>
                  </div>
                )}
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

export default NavbarWrapperMobile;
