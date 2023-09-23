import {} from './';

declare global {
  export interface IDevice {
    type?: TDeviceType;
  }

  type TDeviceType = 'mobile' | 'desktop';

  export type IWindow = typeof window & {
    // eslint-disable-next-line @typescript-eslint/no-explicit-any
    __PRELOADED_STATE__: any;
  };

  export interface IComponent {
    children?: React.ReactNode;
    className?: string;
    device?: IDevice;
  }

  export interface IInitialState {

  } 

  export interface IViewProps {
    initialState: IInitialState;
    device: IDevice;
  }
}
