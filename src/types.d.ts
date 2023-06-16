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
    name: string;
    username?: string;
    email: string;
    type: string;
  }

  export interface TTHGoal {
    id: string;
    name: string;
    year: number;
    color: string;
    user: TTHUser;
  }

  export interface TTHObjective {
    id: string;
    name: string;
    goal: TTHGoal;
    user: TTHUser;
    quarter: number;
  }

  export interface TTHTask {
    id: string;
    name: string;
    objective: TTHObjective;
    user: TTHUser;
    effort: number;
  }

  export interface TTHHome {
    // TODO: remove this after implementing the backend
    // eslint-disable-next-line @typescript-eslint/no-explicit-any
    weekEfforts: any;
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
