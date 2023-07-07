const PageTitle = ({ className, title, subtitle }: IProps) => {
  return (
    <div className={`${className}`}>
      <h1 className="text-xl font-bold dark:text-white md:text-2xl">{title}</h1>
      {subtitle && <p className="text-xs leading-tight text-white/50 md:text-sm">{subtitle}</p>}
    </div>
  );
};

interface IProps extends IComponent {
  title: string;
  subtitle?: string;
}

export default PageTitle;
