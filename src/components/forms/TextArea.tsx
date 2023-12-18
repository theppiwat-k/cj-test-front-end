import React from "react";
import {FieldValues, RegisterOptions, useFormContext} from "react-hook-form";
import {findInputError} from "../../utils/findInputError";
import {isFormInvalid} from "../../utils/isFormInvalid";

interface Props {
  label: string;
  cols: number;
  rows: number;
  id: string;
  placeholder: string;
  validation?: RegisterOptions<FieldValues, string> | undefined;
}
export const TextArea = ({
  label,
  cols = 30,
  rows = 10,
  id,
  placeholder,
  validation,
}: Props) => {
  const {
    register,
    formState: {errors},
  } = useFormContext();

  const inputError = findInputError({errors: errors, id: id});
  const isInvalid = isFormInvalid(inputError);

  return (
    <div className="flex w-full flex-col gap-2">
      <div className="flex justify-between">
        <label htmlFor={id} className="font-semibold capitalize">
          {label}
        </label>
        {isInvalid && (
          <InputError message={inputError.error.message} key={id} />
        )}
      </div>
      <textarea
        className="w-full border p-2 font-medium placeholder:opacity-60"
        id={id}
        cols={cols}
        rows={rows}
        placeholder={placeholder}
        {...register(id, validation)}></textarea>
    </div>
  );
};

const InputError = ({message}: {message: string}) => {
  return (
    <p className="flex items-center gap-1 rounded-md bg-red-100 px-2 font-semibold text-red-500">
      {message}
    </p>
  );
};
