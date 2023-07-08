import { useQueryClient } from '@tanstack/react-query';
import Logo from '@/shared/components/logo/Logo';
import { ExternalLinkIcon, SupportIcon } from '@/shared/components/ui/icons';
import AnnouncementIcon from '@/shared/components/ui/icons/AnnouncementIcon';
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
    <div className="z-10 flex h-full w-[280px] flex-col justify-between border-r-2 bg-white p-4">
      <div>
        <div className="border-b-2 px-2 pb-4">
          <Logo hideTag />
        </div>
        <div className="py-4">
          <UserPanelLink to="/account/" Icon={HomeIcon} label="Dashboard" />
          <UserPanelLink to="/account/habits" Icon={FrequencyIcon} label="My habits" />
          <UserPanelLink to="/account/stats" end Icon={BarChartIcon} label="My statistics" />
          <UserPanelLink to="/account/settings" end Icon={ConfigurationIcon} label="My settings" />
          <UserPanelLink to="/account/support" end Icon={SupportIcon} label="Support" />
        </div>
      </div>

      <div className="flex flex-col">
        {user.is_staff && (
          <div className="mb-4 border-b-2 py-1">
            <UserPanelLink to="/backoffice/" Icon={ExternalLinkIcon} label="Backoffice" external />
          </div>
        )}

        <div className="mb-4 rounded-lg bg-green-100 p-4 text-[12px] text-green-700">
          <div className="mb-2 flex items-start font-semibold">
            <div className="flex items-center justify-center">
              <AnnouncementIcon className="mr-2 text-[14px]" /> Early access
            </div>
          </div>
          <span>
            {`The platform is in early Alpha stage. We're working hard to improve and we appreciate your understanding.
            Your feedback is invaluable during this time. Thanks for being an early user!`}
          </span>
        </div>

        {/* <div className="mb-4 rounded-lg bg-orange-100 p-4 text-[12px] text-orange-700">
          <div className="mb-2 flex items-start font-semibold">
            <div className="flex items-center justify-center">
              <AlertInfoIcon className="mr-2 text-[14px]" /> Scheduled server upgrade
            </div>
          </div>
          <span>July 6th at 23:00. Only APAC countries affected.</span>
        </div> */}

        <div className="flex items-center justify-between border-t-2 px-3 pt-2">
          {user && (
            <a href="/account/" className="mr-4 flex items-center py-2 text-sm">
              <UserIcon className="mr-3 text-2xl text-gray-500" />
              <div>
                <p className="font-medium">
                  {user.first_name} {user.last_name}
                </p>
                <p className="text-xs text-gray-500">{user.email}</p>
              </div>
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
