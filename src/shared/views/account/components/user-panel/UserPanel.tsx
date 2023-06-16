import { useQueryClient } from '@tanstack/react-query';
import Logo from '@/shared/components/logo/Logo';
import AchievementIcon from '@/shared/components/ui/icons/AchievementIcon';
import HomeIcon from '@/shared/components/ui/icons/HomeIcon';
import LogoutIcon from '@/shared/components/ui/icons/LogoutIcon';
import SettingsIcon from '@/shared/components/ui/icons/SettingsIcon';
import UserIcon from '@/shared/components/ui/icons/UserIcon';
import EQueryKeys from '@/shared/queries/query-keys';
import UserPanelLink from './UserPanelLink';

const UserPanel = () => {
  const queryClient = useQueryClient();
  const user = queryClient.getQueryData([EQueryKeys.User]) as TTHUser;

  return (
    <div className="z-10 flex h-full w-72 flex-col justify-between border-r px-4 py-6">
      <div>
        <div className="border-b px-4 pb-4">
          <Logo />
        </div>
        <div className="py-4">
          <UserPanelLink to="/account/" Icon={HomeIcon} label="Home" />
          <UserPanelLink to="/account/tasks" Icon={SettingsIcon} label="My tasks" />
          <UserPanelLink to="/account/objectives" Icon={SettingsIcon} label="My objectives" />
          <UserPanelLink to="/account/goals" end Icon={AchievementIcon} label="My goals" />
          <UserPanelLink to="/account/settings" end Icon={SettingsIcon} label="Settings" />
        </div>
      </div>

      <div className="flex flex-col text-sm font-medium">
        <div className="mt-2 flex items-center justify-between border-t px-3 pt-2">
          {user && (
            <a href="/account/" className="mr-4 flex items-center py-2 text-sm font-medium">
              <UserIcon className="mr-3 text-2xl text-gray-500" />
              {user.name || user.email || user.username}
            </a>
          )}
          {user && (
            <a href="/api/logout" className="my-2 flex items-center">
              <LogoutIcon className="mr-3 text-2xl text-gray-400" />
            </a>
          )}
        </div>
      </div>
    </div>
  );
};

export default UserPanel;
