import classnames from 'classnames';

const TextArea = ({ className, disabled = false, ...rest }: IProps) => {
  return (
    <textarea
      className={classnames('rounded-lg border bg-white px-3 py-2 text-sm shadow-sm outline-none', className, {
        ['bg-gray-100']: disabled,
      })}
      rows={4}
      disabled={disabled}
      {...rest}
    />
  );
};

interface IProps extends IComponent {
  id?: string;
  required?: boolean;
  name?: string;
  disabled?: boolean;
  placeholder?: string;
  autoComplete?: string;
  value?: string;
  onChange?: (e: React.ChangeEvent<HTMLTextAreaElement>) => void;
  autoFocus?: boolean;
  defaultValue?: string;
  ghost?: boolean;
  accept?: string;
}

export default TextArea;
