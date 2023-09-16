import classnames from 'classnames';
import { DeviceContext } from '@/shared/contexts/device';

const Page = ({ children, className, initialState, device, darkMode = false }: IProps) => {
  console.log('Server side initial state', initialState);
  return (
    <DeviceContext.Provider value={{ type: device?.type }}>
      <main className={classnames(className, { dark: darkMode })}>{children}</main>
    </DeviceContext.Provider>
  );
};

interface IProps extends IComponent {
  initialState: {
    title: string;
  };
  device: IDevice;
  darkMode?: boolean;
}

export default Page;
