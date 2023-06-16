import { Switch } from '@headlessui/react';
import { Controller } from 'react-hook-form';
import { Control, FieldValues } from 'react-hook-form';

// eslint-disable-next-line @typescript-eslint/no-explicit-any
interface IProps<TFieldValues extends FieldValues = any> {
  name: string;
  label?: string;
  control: Control<TFieldValues>;
  defaultValue?: boolean;
}

const FormSwitch = ({ name, label, control, defaultValue, ...props }: IProps) => {
  return (
    <>
      {label && <label className="mb-1 mt-4 text-sm font-semibold first:mt-0">{label}</label>}
      <Controller
        name={name}
        control={control}
        defaultValue={defaultValue}
        render={({ field: { onChange, value } }) => (
          <Switch
            checked={value}
            onChange={onChange}
            className={`${value ? 'bg-orange-400' : 'bg-gray-300'}
            relative inline-flex h-6 w-11 items-center rounded-full shadow-inner`}
            {...props}
          >
            <span
              className={`${
                value ? 'translate-x-6' : 'translate-x-1'
              } inline-block h-4 w-4 transform rounded-full bg-white transition duration-200 ease-in-out`}
            />
          </Switch>
        )}
      />
    </>
  );
};

export default FormSwitch;
