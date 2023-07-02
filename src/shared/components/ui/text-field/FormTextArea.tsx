/* eslint-disable @typescript-eslint/no-explicit-any */
import React from 'react';
import { Control, Controller, FieldErrors, FieldValues, RegisterOptions } from 'react-hook-form';
import TextArea from './TextArea';

const FormTextArea = React.forwardRef<HTMLTextAreaElement, IProps>((props, ref) => {
  const { name, label, errors, control, required, rules, inputProps } = props;
  return (
    <>
      {label && <label className="mb-1 mt-4 text-sm font-semibold first:mt-0">{label}</label>}
      <Controller
        name={name}
        control={control}
        rules={{ required, ...rules }}
        render={({ field }) => <TextArea {...inputProps} {...field} ref={ref} value={field.value || ''} />}
      />
      {/* TODO: Make this field dynamic from props */}
      {errors[name] && <span className="my-1 text-sm font-semibold text-red-500">This field is required</span>}
    </>
  );
});

FormTextArea.displayName = 'FormTextArea';

interface IProps<TFieldValues extends FieldValues = any> {
  label?: string;
  name: string;
  errors: FieldErrors;
  control: Control<TFieldValues>;
  inputProps?: any;
  rules?: RegisterOptions<TFieldValues>;
  required?: boolean;
}

export default FormTextArea;
