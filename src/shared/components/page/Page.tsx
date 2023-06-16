import { Hydrate, QueryClient, QueryClientProvider } from '@tanstack/react-query';
import Navbar from '@/components/navbar/Navbar';
import { ToastProvider } from '@/components/toast/ToastContext';

const Page = ({ children, className, initialState, withNavbar = false }: IProps) => {
  const queryClient = new QueryClient();
  return (
    <QueryClientProvider client={queryClient}>
      <Hydrate state={initialState}>
        <ToastProvider>
          {withNavbar && <Navbar />}
          <header></header>
          <main className={`${className} ${withNavbar ? 'with-navbar' : 'without-navbar'}`}>{children}</main>
        </ToastProvider>
      </Hydrate>
    </QueryClientProvider>
  );
};

interface IProps extends IComponent {
  user?: TTHUser;
  withNavbar?: boolean;
  initialState?: IInitialState;
}

export default Page;
