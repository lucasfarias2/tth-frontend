import { useQuery } from '@tanstack/react-query';
import { useState } from 'react';
import EditIcon from '@/shared/components/ui/icons/EditIcon';
import PageTitle from '@/shared/components/ui/page-title/PageTitle';
import fetchUser from '@/shared/queries/fetch-user';
import EQueryKeys from '@/shared/queries/query-keys';
import UserProfileForm from './UserProfileForm';

const MySettings = () => {
  const [editMode, setEditMode] = useState(false);
  const { data: user } = useQuery([EQueryKeys.User], fetchUser);

  return (
    <div className="max-w-2xl p-8">
      <div className="flex items-center justify-between">
        <PageTitle title="My settings" subtitle="Here manage your user profile." className="mb-4" />
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
      </div>
      {!editMode && user ? (
        <div className="rounded-lg border bg-white p-4 text-sm shadow-sm">
          <div className="mb-4 flex items-start justify-between border-b px-2 pb-6">
            <p className="text-xs text-gray-500">First name</p>
            <span className="w-1/2 font-medium">{user.first_name}</span>
          </div>
          <div className="mb-4 flex items-start justify-between border-b px-2 pb-6">
            <p className="text-xs text-gray-500">Last name</p>
            <span className="w-1/2 font-medium">{user.last_name}</span>
          </div>
          <div className="mb-4 flex items-start justify-between border-b px-2 pb-6">
            <p className="text-xs text-gray-500">Email</p>
            <span className="w-1/2 font-medium">{user.email}</span>
          </div>
          <div className="flex items-start justify-between px-2 pb-6">
            <p className="text-xs text-gray-500">Profile picture</p>
            <span className="w-1/2 font-medium text-gray-400">N/A</span>
          </div>
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
