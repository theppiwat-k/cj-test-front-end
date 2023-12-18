import React, {useState} from "react";
import {FieldValues, RegisterOptions, useFormContext} from "react-hook-form";
import {findInputError} from "../../utils/findInputError";
import {isFormInvalid} from "../../utils/isFormInvalid";

interface Props {
  label: string;
  type: string;
  id: string;
  placeholder: string;
  autocomplete?: string;
  className?: string;
  validation?: RegisterOptions<FieldValues, string> | undefined;
}

export const Input = ({
  label,
  type,
  id,
  placeholder,
  autocomplete,
  className,
  validation,
}: Props) => {
  const {
    register,
    formState: {errors},
  } = useFormContext();

  const [showPassword, setShowPassword] = useState<boolean>(false);

  const inputError = findInputError({errors: errors, id: id});
  const isInvalid = isFormInvalid(inputError);

  const inputCss = className
    ? `w-full border p-2 font-medium placeholder:opacity-60 ${className}`
    : `w-full border p-2 font-medium placeholder:opacity-60`;
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
      {type !== "password" && (
        <input
          id={id}
          type={type}
          className={`${inputCss}`}
          placeholder={placeholder}
          autoComplete={autocomplete}
          {...register(id, validation)}
        />
      )}
      {type === "password" && (
        <div className="relative">
          <input
            id={id}
            type={showPassword ? "text" : type}
            className={`${inputCss}`}
            placeholder={placeholder}
            autoComplete={autocomplete}
            {...register(id, validation)}
          />
          <span
            className="absolute right-2 top-3 cursor-pointer text-xs font-bold"
            onClick={() => {
              setShowPassword(!showPassword);
            }}>
            show
          </span>
        </div>
      )}
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
