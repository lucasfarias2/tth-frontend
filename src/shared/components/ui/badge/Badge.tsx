const Badge = ({ children, className }: IComponent) => {
  return (
    <span
      className={`inline-flex items-center rounded-full border bg-gray-100 py-1 px-2 text-xs font-semibold text-gray-600 ${className}`}
    >
      {children}
    </span>
  );
};

export default Badge;
