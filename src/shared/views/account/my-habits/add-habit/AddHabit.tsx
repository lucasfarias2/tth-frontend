import PageBack from '@/shared/components/ui/page-back/PageBack';
import PageTitle from '@/shared/components/ui/page-title/PageTitle';
import AddHabitForm from '../components/AddHabitForm';

const AddHabit = () => {
  return (
    <div className="p-8">
      <PageBack to="/account/habits" />
      <div className="flex items-center justify-between">
        {<PageTitle title="Add a new habit" subtitle="A new habit will be added to your list." className="mb-4" />}
      </div>

      <div className="mb-4 max-w-2xl">
        <AddHabitForm />
      </div>
    </div>
  );
};

export default AddHabit;
