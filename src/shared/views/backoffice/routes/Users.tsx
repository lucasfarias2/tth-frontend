import { useQuery } from '@tanstack/react-query';
import PageTitle from '@/shared/components/ui/page-title/PageTitle';
import fetchUsers from '@/shared/queries/backoffice/fetch-users';
import EQueryKeys from '@/shared/queries/query-keys';
import { formatDate } from '@/shared/utils/date';

const Users = () => {
  const { data: users } = useQuery([EQueryKeys.Users], fetchUsers);

  return (
    <div className="p-6">
      <PageTitle title="Users" subtitle="Here is an overview of the users in the platform." />

      <div className="mt-4 max-w-2xl overflow-hidden rounded-lg border  bg-white shadow-sm dark:border-white/5 dark:bg-white/5">
        {users?.map((user, index) => (
          <div
            className={`flex items-center justify-between border-b py-3 px-4 last:mb-0 last:border-b-0 ${
              index % 2 === 0 ? 'bg-white' : 'bg-gray-50'
            }`}
            key={user.id}
          >
            <div className="flex items-center">
              <div
                className={`mr-4 flex h-5 w-5 items-center justify-center rounded-full ${
                  !user.is_staff ? 'bg-black/40' : 'bg-orange-500'
                } text-xs font-semibold uppercase text-white md:h-6 md:w-6`}
              >
                {user.first_name?.[0] || user.email[0]}
              </div>
              <div className="flex-1 leading-snug">
                <div className="flex items-center text-sm font-medium">
                  <div className="mr-2">{user.first_name ? user.first_name + ' ' + user.last_name : user.email}</div>
                  <span className="inline-block">
                    {user.is_staff && (
                      <div className="rounded-lg border border-orange-200 bg-orange-100 px-1 text-[10px] text-orange-500">
                        Staff
                      </div>
                    )}
                  </span>
                </div>
                <div className="text-xs text-black/50">{user.email}</div>
              </div>
            </div>
            <div className="flex items-center">
              <div className="ml-2 text-right text-[10px] text-gray-500">
                <div>Created at: {formatDate(user.date_joined)}</div>
                <div>Last login: {user.last_login ? formatDate(user.last_login) : 'N/A'}</div>
              </div>
            </div>
          </div>
        ))}
      </div>
    </div>
  );
};

export default Users;
