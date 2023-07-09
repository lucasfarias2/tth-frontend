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

  export interface TTHUser {
    id: string;
    first_name?: string;
    last_name?: string;
    username?: string;
    email: string;
    is_staff: boolean;
    is_superuser: boolean;
    date_joined: string;
    last_login: string;
  }

  export interface TTHHabit {
    id: string;
    name: string;
    user: TTHUser;
    starting_week: number;
    color: string;
    expected_effort: number;
    ending_week: number;
    status: 'open' | 'finished';
  }

  export interface TTHEffort {
    id: string;
    habit: TTHHabit;
    week: number;
    level: number;
    user: TTHUser;
  }

  export interface TTHGlobalPerformance {
    habit: TTHHabit;
    performance_percentage: number;
    contribution_percentage: number;
  }

  export interface TTHHabitPerformance {
    performance_data: TTHPerformanceData[];
    average_performance_percentage: number;
  }

  export interface TTHWeekCompletion {
    completion_percentage: number;
  }

  export interface TTHRecentCompletion {
    week: number;
    completion_percentage: number;
    difference: number;
  }

  export type TTHPerformanceData = {
    week: number;
    performance_percentage: number;
  };

  export interface TTHSiteConfig {
    current_week: number;
  }

  export interface TTHTicket {
    id: string;
    title: string;
    content: string;
    status: 'open' | 'closed' | 'resolved';
    sender: string;
    type: 'email' | 'web';
    creation_date: string;
    updated_date: string;
  }

  export interface TTHAnnouncement {
    id: string;
    title: string;
    content: string;
    type: 'alert' | 'warning' | 'info';
    starting_date: string;
    end_date: string;
    status: 'ON' | 'OFF';
  }

  export interface TTHFeature {
    id: string;
    title: string;
    status: 'ontrack' | 'live';
    creation_date: string;
    updated_date: string;
  }

  export interface IInitialState {
    user: TTHUser;
  }

  export interface IViewProps {
    initialState: IInitialState;
    device: IDevice;
  }

  export type TOnClick = React.MouseEvent<HTMLButtonElement>;
  export type TOnChangeInputEvent = React.ChangeEvent<HTMLInputElement>;
  export type TOnChangeSelectEvent = React.ChangeEvent<HTMLSelectElement>;
  export type TOnChangeTextAreaEvent = React.ChangeEvent<HTMLTextAreaElement>;
}
