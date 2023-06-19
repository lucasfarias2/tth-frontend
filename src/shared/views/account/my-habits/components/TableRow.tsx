const TableRow = ({ children, className, onClick }: IProps) => {
  return (
    <td className={`py-4 text-sm ${className}`} onClick={onClick}>
      {children}
    </td>
  );
};

interface IProps extends IComponent {
  onClick?: React.MouseEventHandler<HTMLTableCellElement>;
}

export default TableRow;
