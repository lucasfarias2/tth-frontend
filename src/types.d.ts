import type { ViteDevServer } from 'vite';

declare global {
  namespace Express {
    interface Request {
      device?: IDevice;
      user: TTHUser;
    }

    interface Response {
      renderView: (pageName: string, props?: unknown) => void;
      loadQueryKeys: (queryKeys: string[]) => Response;
      queries: Record<string, unknown>;
      isProd?: boolean;
      vite: ViteDevServer;
    }
  }

  export interface IDevice {
    type: TDeviceType;
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

  export interface TTHUser {
    id: string;
    first_name?: string;
    last_name?: string;
    username?: string;
    email: string;
    is_staff: boolean;
    is_superuser: boolean;
    date_joined: Date;
    last_login: Date;
  }

  export interface TTHHabit {
    id: string;
    name: string;
    user: TTHUser;
    starting_week: number;
    color: string;
    expected_effort: number;
  }

  export interface IInitialState {
    user: TTHUser;
  }

  export interface IViewProps {
    initialState: IInitialState;
  }

  export type TOnClick = React.MouseEvent<HTMLButtonElement>;
  export type TOnChangeInputEvent = React.ChangeEvent<HTMLInputElement>;
  export type TOnChangeSelectEvent = React.ChangeEvent<HTMLSelectElement>;
  export type TOnChangeTextAreaEvent = React.ChangeEvent<HTMLTextAreaElement>;
}
