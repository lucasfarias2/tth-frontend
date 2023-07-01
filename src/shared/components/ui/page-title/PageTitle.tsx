const PageTitle = ({ className, title, subtitle }: IProps) => {
  return (
    <div className={`${className}`}>
      <h1 className="text-xl font-bold md:text-2xl">{title}</h1>
      {subtitle && <p className="text-xs leading-tight text-gray-500 md:text-sm">{subtitle}</p>}
    </div>
  );
};

interface IProps extends IComponent {
  title: string;
  subtitle?: string;
}

export default PageTitle;
