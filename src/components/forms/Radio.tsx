import React, {useState} from "react";
import {useFormContext} from "react-hook-form";

interface Option {
  id: string;
  label: string;
  value: string;
}

interface Props {
  registerName: string;
  label: string;
  defaultValue: string;
  options: Option[];
}

const isOption = (value: string, options: Option[]): boolean => {
  return options.some(option => option.value === value);
};

/**
 * Represents a radio input.
 * @constructor
 * @param {string} registerName - The name for state of RHF(React hook form).
 * @param {string} label - The label of input.
 * @param {string} defaultValue - The defaultValue must match with value 1 of options.
 * @param {[]} options - The options of the radio for select.
 */
export const Radio = ({registerName, defaultValue, label, options}: Props) => {
  if (!isOption(defaultValue, options)) {
    const validValues = options.map(option => `'${option.value}'`).join(", ");
    const errorMessage = `Invalid 'defaultValue': '${defaultValue}'. 
      It must be a string that exactly matches one of the following values: ${validValues}.`;

    console.error(errorMessage);
    throw new Error(errorMessage);
  }

  const [selected, setSelected] = useState<string>(defaultValue);
  const handleChange = (event: React.ChangeEvent<HTMLInputElement>) => {
    setSelected(event.target.value);
  };
  const {register} = useFormContext();
  return (
    <>
      <div className={`flex w-full flex-col gap-2`}>
        <label className="font-semibold capitalize">{label}</label>
        <div className={`flex w-full flex-row gap-4`}>
          {options.map((option, index: number) => (
            <label className="font-semibold cursor-pointer" htmlFor={option.id} key={index}>
              <input
                {...register(registerName)}
                type="radio"
                value={option.value}
                id={option.id}
                key={index}
                checked={option.value === selected}
                onChange={handleChange}
                className="mr-2 cursor-pointer"
              />
              {option.label}
            </label>
          ))}
        </div>
      </div>
    </>
  );
};
