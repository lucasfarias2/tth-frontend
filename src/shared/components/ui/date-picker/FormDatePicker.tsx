import { Control, Controller, FieldErrors, FieldValues, RegisterOptions } from 'react-hook-form';
import DatePicker from 'react-tailwindcss-datepicker';

const FormDatePicker = (props: IProps) => {
  const { label, name, control, required, rules, errors } = props;

  return (
    <>
      {label && <label className="mb-1 mt-4 text-sm font-semibold first:mt-0">{label}</label>}
      <Controller
        control={control}
        rules={{ required, ...rules }}
        name={name}
        render={({ field: { onChange, value } }) => (
          <DatePicker
            inputClassName="w-full rounded-md shadow-sm hover:shadow p-2 text-sm border"
            placeholder="Select a date"
            primaryColor="red"
            value={value}
            useRange={false}
            maxDate={new Date()}
            displayFormat="DD/MM/YYYY"
            onChange={date => onChange(date)}
            asSingle={true}
          />
        )}
      />

      {/* TODO: Make this field dynamic from props */}
      {errors[name] && <span className="my-1 text-sm font-semibold text-red-500">This field is required</span>}
    </>
  );
};

// eslint-disable-next-line @typescript-eslint/no-explicit-any
interface IProps<TFieldValues extends FieldValues = any> {
  name: string;
  full?: boolean;
  label?: string;
  errors: FieldErrors;
  control: Control<TFieldValues>;
  rules?: RegisterOptions<TFieldValues>;
  required?: boolean;
}

export default FormDatePicker;
