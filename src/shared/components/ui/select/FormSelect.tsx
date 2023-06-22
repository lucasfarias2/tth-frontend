import { Listbox, Transition } from '@headlessui/react';
import { forwardRef, Fragment } from 'react';
import { Control, Controller, FieldErrors, FieldValues, RegisterOptions } from 'react-hook-form';
import ChevronDownIcon from '../icons/ChevronDownIcon';

const FormSelect = forwardRef<HTMLSelectElement, IProps>((props, ref) => {
  const {
    label,
    name,
    options,
    control,
    defaultValue,
    required,
    rules,
    errors,
    inputProps,
    full = true,
    placeholder,
  } = props;

  return (
    <>
      {label && <label className="mb-1 mt-4 text-sm font-semibold first:mt-0">{label}</label>}
      <Controller
        name={name}
        control={control}
        rules={{ required, ...rules }}
        defaultValue={defaultValue}
        render={({ field }) => (
          <Listbox value={field.value} onChange={value => field.onChange(value.id)} ref={ref}>
            <div className={`relative ${full ? 'w-full' : ''}`}>
              <Listbox.Button className="relative w-full cursor-pointer rounded-lg border bg-white py-2 pl-3 pr-10 text-left text-sm font-normal shadow-sm hover:bg-gray-50">
                {field.value ? (
                  <span className="truncate">{options?.find(option => option.id === field.value)?.name}</span>
                ) : (
                  <span className="text-gray-400">{placeholder}</span>
                )}
                <span className="pointer-events-none absolute inset-y-0 right-0 flex items-center pr-2">
                  <ChevronDownIcon className="h-5 w-5 text-gray-400" aria-hidden="true" />
                </span>
              </Listbox.Button>
              <Transition
                as={Fragment}
                leave="transition ease-in duration-100"
                leaveFrom="opacity-100"
                leaveTo="opacity-0"
              >
                <Listbox.Options className="absolute mt-1 max-h-60 w-full overflow-auto rounded-lg border bg-white py-1 shadow-lg">
                  {options?.map(option => (
                    <Listbox.Option
                      key={option.id}
                      value={option}
                      className={({ active }) => {
                        const selected = field.value === option.id;

                        return `${active ? 'bg-gray-100' : 'text-gray-600'} cursor-pointer p-3 pr-4 text-sm ${
                          selected ? 'bg-gray-100 font-medium' : 'font-normal'
                        }`;
                      }}
                      {...inputProps}
                    >
                      {option.name}
                    </Listbox.Option>
                  ))}
                </Listbox.Options>
              </Transition>
            </div>
          </Listbox>
        )}
      />

      {/* TODO: Make this field dynamic from props */}
      {errors[name] && <span className="my-1 text-sm font-semibold text-red-500">This field is required</span>}
    </>
  );
});

FormSelect.displayName = 'FormSelect';

type Option = {
  id: string;
  name: string;
};

// eslint-disable-next-line @typescript-eslint/no-explicit-any
interface IProps<TFieldValues extends FieldValues = any> {
  options?: Option[];
  defaultValue?: Option;
  name: string;
  full?: boolean;
  label?: string;
  errors: FieldErrors;
  control: Control<TFieldValues>;
  // eslint-disable-next-line @typescript-eslint/no-explicit-any
  inputProps?: any;
  rules?: RegisterOptions<TFieldValues>;
  required?: boolean;
  placeholder: string;
}

export default FormSelect;
