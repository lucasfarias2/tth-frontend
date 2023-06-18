import { useNavigate } from 'react-router-dom';
import ArrowLeftIcon from '@/shared/components/ui/icons/ArrowLeft';

const PageBack = ({ to }: IProps) => {
  const navigate = useNavigate();

  return (
    <div
      className="mb-4 flex cursor-pointer items-center text-sm font-semibold text-rose-600"
      onClick={() => {
        navigate(to);
      }}
    >
      <ArrowLeftIcon className="mr-2 text-lg" /> Back
    </div>
  );
};

interface IProps extends IComponent {
  to: string;
}

export default PageBack;
