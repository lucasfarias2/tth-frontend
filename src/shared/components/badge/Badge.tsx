import getColorClasses from '@/shared/utils/get-color-classes';

const Badge = ({ text, size = 'md', color = 'gray' }: IProps) => {
  const colorClasses = getColorClasses(color);
  const textColorClass = colorClasses.textColor;
  const bgColorClass = colorClasses.bgLightColor;
  const borderColorClass = colorClasses.borderColor;

  let sizeClass = '';

  if (size === 'xs') {
    sizeClass = 'text-xs';
  } else if (size === 'sm') {
    sizeClass = 'text-sm';
  } else {
    sizeClass = 'text-base';
  }

  return (
    <div className={`mb-1 rounded-lg border ${textColorClass} ${bgColorClass} p-1 ${sizeClass} ${borderColorClass}`}>
      {text}
    </div>
  );
};

export default Badge;

interface IProps {
  text: string;
  size?: 'xs' | 'sm' | 'md';
  color?: string;
}
