const NavbarLink = ({ className, to, label }: IProps) => {
  return (
    <a href={to} className={`mx-4 text-sm ${className} font-medium`}>
      {label}
    </a>
  );
};

interface IProps extends IComponent {
  to: string;
  label: string;
}

export default NavbarLink;
