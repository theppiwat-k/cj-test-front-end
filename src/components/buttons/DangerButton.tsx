import React, {MouseEvent} from "react";

interface Props {
  text: string;
  type: "button" | "submit";
  id: string;
  className?: string;
  onClick?: (event: MouseEvent<HTMLButtonElement>) => void;
}

export function DangerButton({text, type, id, className, onClick}: Props) {
  const buttonStyle = className
    ? `${className}  rounded bg-red-600 px-4 py-2 font-bold text-white`
    : ` rounded bg-red-600 px-4 py-2 font-bold text-white`;

  return (
    <>
      <button
        type={type}
        id={id}
        className={`${buttonStyle} hover:bg-red-500`}
        onClick={onClick}>
        {text}
      </button>
    </>
  );
}
