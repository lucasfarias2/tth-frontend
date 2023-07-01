import { Hydrate, QueryClient, QueryClientProvider } from '@tanstack/react-query';
import Navbar from '@/components/navbar/Navbar';
import { ToastProvider } from '@/components/toast/ToastContext';
import NavbarMobile from '@/shared/components/navbar/Navbar.mobile';
import { DeviceContext } from '@/shared/contexts/DeviceContext';

const Page = ({ children, className, initialState, device, withNavbar = false, inRouter = false }: IProps) => {
  const queryClient = new QueryClient();
  return (
    <DeviceContext.Provider value={{ type: device?.type }}>
      <QueryClientProvider client={queryClient}>
        <Hydrate state={initialState}>
          <ToastProvider>
            {withNavbar && (device?.type === 'mobile' ? <NavbarMobile inRouter={inRouter} /> : <Navbar />)}
            <header></header>
            <main className={`${className} ${withNavbar ? 'with-navbar' : 'without-navbar'}`}>{children}</main>
            {withNavbar && (
              <footer className="h-100 border-t bg-white p-6 text-center text-xs text-gray-400 shadow-sm">
                <div>
                  {' '}
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
  user?: TTHUser;
  withNavbar?: boolean;
  initialState?: IInitialState;
  inRouter?: boolean;
}

export default Page;
