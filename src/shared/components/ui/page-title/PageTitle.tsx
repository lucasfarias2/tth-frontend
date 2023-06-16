const PageTitle = ({ className, title, subtitle }: IProps) => {
  return (
    <div className={`${className}`}>
      <h1 className="text-2xl font-bold">{title}</h1>
      {subtitle && <p className="text-sm leading-tight text-gray-500">{subtitle}</p>}
    </div>
  );
};

interface IProps extends IComponent {
  title: string;
  subtitle?: string;
}

export default PageTitle;
