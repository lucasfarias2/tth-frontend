import { Hydrate, QueryClient, QueryClientProvider } from '@tanstack/react-query';
import NavbarDesktop from '@/components/navbar/Navbar.desktop';
import { ToastProvider } from '@/components/toast/ToastContext';
import NavbarAccountMobile from '@/shared/components/navbar/NavbarAccount.mobile';
import NavbarBackofficeMobile from '@/shared/components/navbar/NavbarBackoffice.mobile';
import NavbarGuestMobile from '@/shared/components/navbar/NavbarGuest.mobile';
import { DeviceContext } from '@/shared/contexts/DeviceContext';

const Page = ({ children, className, initialState, device, flow, withNavbar = false, darkMode = false }: IProps) => {
  const queryClient = new QueryClient();
  let NavbarComponent;

  if (device.type === 'desktop') {
    NavbarComponent = NavbarDesktop;
  } else {
    if (flow === 'account') {
      NavbarComponent = NavbarAccountMobile;
    } else if (flow === 'backoffice') {
      NavbarComponent = NavbarBackofficeMobile;
    } else {
      NavbarComponent = NavbarGuestMobile;
    }
  }

  return (
    <DeviceContext.Provider value={{ type: device?.type }}>
      <QueryClientProvider client={queryClient}>
        <Hydrate state={initialState}>
          <ToastProvider>
            <header className={`${darkMode ? 'dark' : ''}`}>{withNavbar && <NavbarComponent />}</header>
            <main className={`${className} ${withNavbar ? 'with-navbar' : 'without-navbar'} ${darkMode ? 'dark' : ''}`}>
              {children}
            </main>
            {withNavbar && (
              <footer
                className={`h-100 border-t bg-white p-6 text-center text-xs text-gray-400 shadow-sm ${
                  darkMode ? 'dark' : ''
                }`}
              >
                <div>
                  Copyright &copy; {new Date().getFullYear()} Lucas Farias. All rights reserved. <p>lucasfarias.com</p>
                </div>
              </footer>
            )}
          </ToastProvider>
        </Hydrate>
      </QueryClientProvider>
    </DeviceContext.Provider>
  );
};

interface IProps extends IComponent {
  withNavbar?: boolean;
  initialState?: IInitialState;
  device: IDevice;
  flow: 'guest' | 'account' | 'backoffice';
  darkMode?: boolean;
}

export default Page;
