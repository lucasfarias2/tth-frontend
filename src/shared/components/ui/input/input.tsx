import classnames from 'classnames';

const Input = ({ className, disabled = false, ...rest }: IProps) => {
  return (
    <input
      className={classnames('rounded-lg border bg-white px-3 py-2 text-sm outline-none', className, {
        ['bg-gray-100']: disabled,
        ['w-full shadow-sm hover:bg-gray-50']: rest.type !== 'checkbox',
        ['my-2']: rest.type === 'checkbox',
      })}
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
  type?: string;
  placeholder?: string;
  autoComplete?: string;
  value?: string;
  onChange?: (e: TOnChangeInputEvent) => void;
  autoFocus?: boolean;
  defaultValue?: string;
  ghost?: boolean;
  accept?: string;
}

export default Input;
