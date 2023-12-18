import React from "react";
import {useFormContext} from "react-hook-form";

interface Props {
  label: string;
  id: string;
  options: string[];
  className?: string;
}

export const Select = ({label, id, options, className}: Props) => {
  const {register} = useFormContext();

  return (
    <div className={`flex w-full flex-col gap-2 ${className}`}>
      <label className="font-semibold capitalize">{label}</label>
      <select className="w-full border p-2 font-medium" {...register(id)}>
        {options.map((option: string, index: number) => (
          <option value={option} key={index}>
            {option}
          </option>
        ))}
      </select>
    </div>
  );
};
