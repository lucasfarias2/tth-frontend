const Container = ({ children, className }: IComponent) => {
  return <div className={`mb-4 rounded border-b bg-white ${className}`}>{children}</div>;
};

export default Container;
