const PackDetailsRow = ({ title, subtitle, children, className }: IProps) => {
  return (
    <div className={`flex border-b px-3 pb-12 pt-4 last:border-b-0 ${className}`}>
      <div className="w-[400px] min-w-[400px] pr-4 text-gray-500">
        <div className="text-sm font-semibold">{title}</div>
        {subtitle && <div className="text-xs">{subtitle}</div>}
      </div>
      <div className="w-full break-all p-2 text-left text-sm font-medium">{children}</div>
    </div>
  );
};

interface IProps extends IComponent {
  title: string;
  subtitle?: string;
}

export default PackDetailsRow;
