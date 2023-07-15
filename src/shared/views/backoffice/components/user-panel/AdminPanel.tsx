import { useQueryClient } from '@tanstack/react-query';
import Logo from '@/shared/components/logo/Logo';
import {
  AnnouncementIcon,
  DashboardIcon,
  ExternalLinkIcon,
  FileIcon,
  InboxIcon,
  LogoutIcon,
  UserIcon,
  UsersIcon,
} from '@/shared/components/ui/icons';
import EQueryKeys from '@/shared/queries/query-keys';
import AdminPanelLink from './AdminPanelLink';

const AdminPanel = () => {
  const queryClient = useQueryClient();
  const user = queryClient.getQueryData([EQueryKeys.User]) as TTHUser;

  return (
    <div className="z-10 flex h-full w-[280px] flex-col justify-between border-r-2 border-white/90  bg-black/80 px-4 pt-4 shadow">
      <div>
        <div className="border-b border-white/10 px-2 pb-4">
          <Logo dark hideTag />
        </div>
        <div className="py-4">
          <AdminPanelLink to="/backoffice/" Icon={DashboardIcon} label="Dashboard" />
          <AdminPanelLink to="/backoffice/users" Icon={UsersIcon} label="Users" />
          <AdminPanelLink to="/backoffice/announcements" end Icon={AnnouncementIcon} label="Announcements" />
          <AdminPanelLink to="/backoffice/tickets" end Icon={InboxIcon} label="Tickets" />
          <AdminPanelLink to="/backoffice/features" end Icon={FileIcon} label="Development features" />
        </div>
      </div>

      <div className="flex flex-col border-white/10">
        <div className="py-1">
          <AdminPanelLink to="/account" Icon={ExternalLinkIcon} label="Account" external />
        </div>

        <div className="flex items-center justify-between border-t border-white/10 px-3 py-2">
          {user && (
            <a href="/account/" className="mr-4 flex items-center py-2 text-sm">
              <UserIcon className="mr-3 text-2xl text-white/50" />
              <div>
                <p className="font-medium text-white">
                  {user.first_name} {user.last_name}
                </p>
                <p className="text-xs text-white/70">{user.email}</p>
              </div>
            </a>
          )}
          {user && (
            <a href="/api/logout" className="my-2 flex items-center">
              <LogoutIcon className="mr-3 text-2xl text-white/30" />
            </a>
          )}
        </div>
      </div>
    </div>
  );
};

export default AdminPanel;
