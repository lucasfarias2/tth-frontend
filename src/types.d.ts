import '';

declare global {
  export interface IDevice {
    type?: TDeviceType;
  }

  type TDeviceType = 'mobile' | 'desktop';

  export interface IComponent {
    children?: React.ReactNode;
    className?: string;
    device?: IDevice;
  }

  export interface IInitialState {
    title: string;
  }

  export interface IViewProps {
    initialState: IInitialState;
    device: IDevice;
  }
}
