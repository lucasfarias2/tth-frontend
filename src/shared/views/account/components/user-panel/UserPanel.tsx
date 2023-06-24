import { useQueryClient } from '@tanstack/react-query';
import Logo from '@/shared/components/logo/Logo';
import BarChartIcon from '@/shared/components/ui/icons/BarChartIcon';
import ConfigurationIcon from '@/shared/components/ui/icons/ConfigurationIcon';
import FrequencyIcon from '@/shared/components/ui/icons/FrequencyIcon';
import HomeIcon from '@/shared/components/ui/icons/HomeIcon';
import LogoutIcon from '@/shared/components/ui/icons/LogoutIcon';
import UserIcon from '@/shared/components/ui/icons/UserIcon';
import EQueryKeys from '@/shared/queries/query-keys';
import UserPanelLink from './UserPanelLink';

const UserPanel = () => {
  const queryClient = useQueryClient();
  const user = queryClient.getQueryData([EQueryKeys.User]) as TTHUser;

  return (
    <div className="z-10 flex h-full w-72 flex-col justify-between border-r bg-white px-4 py-6">
      <div>
        <div className="border-b px-4 pb-4">
          <Logo />
        </div>
        <div className="py-4">
          <UserPanelLink to="/account/" Icon={HomeIcon} label="Home" />
          <UserPanelLink to="/account/habits" Icon={FrequencyIcon} label="My habits" />
          <UserPanelLink to="/account/stats" end Icon={BarChartIcon} label="My statistics" />
          <UserPanelLink to="/account/settings" end Icon={ConfigurationIcon} label="My settings" />
        </div>
      </div>

      <div className="flex flex-col text-sm font-medium">
        <div className="mt-2 flex items-center justify-between border-t px-3 pt-2">
          {user && (
            <a href="/account/" className="mr-4 flex items-center py-2 text-sm font-medium">
              <UserIcon className="mr-3 text-2xl text-gray-500" />
              {user.first_name || user.email || user.username} {user.last_name}
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
