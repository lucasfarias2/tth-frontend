import { Link } from 'react-router-dom';
import ArrowLeftIcon from '@/shared/components/ui/icons/ArrowLeft';

const PageBack = ({ to }: IProps) => {
  return (
    <Link className="mb-4 flex cursor-pointer items-center text-sm font-semibold text-rose-600" to={to}>
      <ArrowLeftIcon className="mr-2 text-lg" /> Back
    </Link>
  );
};

interface IProps extends IComponent {
  to: string;
}

export default PageBack;
