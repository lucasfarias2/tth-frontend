import { useQuery } from '@tanstack/react-query';
import { useEffect, useState } from 'react';
import EditIcon from '@/shared/components/ui/icons/EditIcon';
import PageTitle from '@/shared/components/ui/page-title/PageTitle';
import fetchUser from '@/shared/queries/fetch-user';
import EQueryKeys from '@/shared/queries/query-keys';
import trackEvent from '@/shared/utils/ga-tracking';
import UserProfileForm from './UserProfileForm';

interface IUserInfoItemProps {
  label?: string;
  value?: string;
}

const UserInfoItem = ({ label, value }: IUserInfoItemProps) => {
  return (
    <div className="mb-4 flex flex-col items-start justify-between border-b px-2 pb-6 last:border-0  last:pb-0 md:flex-row">
      <p className="text-xs text-gray-500">{label}</p>
      <span className="mt-1 w-1/2 font-medium md:mt-0">{value}</span>
    </div>
  );
};

const MySettings = () => {
  const [editMode, setEditMode] = useState(false);
  const { data: user } = useQuery([EQueryKeys.User], fetchUser);

  useEffect(() => {
    trackEvent('page_view', { title: 'account_settings' });
  }, []);

  return (
    <div className="max-w-2xl p-6">
      <div className="flex items-center justify-between">
        <PageTitle title="My settings" subtitle="Here manage your user profile." className="mb-4" />
        {!editMode && (
          <button
            type="button"
            onClick={() => {
              setEditMode(true);
            }}
            className="flex cursor-pointer items-center rounded-lg border bg-white py-2 px-3 text-sm font-medium shadow-sm hover:bg-gray-50"
          >
            <EditIcon className="mr-2" />
            Edit profile
          </button>
        )}
      </div>
      {!editMode && user ? (
        <div className="rounded-lg border bg-white p-4 text-sm shadow-sm">
          <UserInfoItem label="First name" value={user.first_name} />
          <UserInfoItem label="Last name" value={user.last_name} />
          <UserInfoItem label="Email" value={user.email} />
          <UserInfoItem label="Profile picture" value="N/A" />
        </div>
      ) : (
        <div>
          <UserProfileForm setEditMode={setEditMode} />
        </div>
      )}
    </div>
  );
};

export default MySettings;
