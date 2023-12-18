import React, {useState} from "react";

interface Props {
  text: string;
  children: React.JSX.Element | "";
}

export const Tooltip = ({text, children}: Props) => {
  const [showTooltip, setShowTooltip] = useState(false);

  const handleMouseEnter = () => {
    setShowTooltip(true);
  };

  const handleMouseLeave = () => {
    setShowTooltip(false);
  };

  return (
    <>
      <div
        className="relative"
        onMouseEnter={handleMouseEnter}
        onMouseLeave={handleMouseLeave}>
        <span className="z-40">{children}</span>
        {showTooltip && (
          <div className="absolute  -top-10 z-50 rounded-md bg-gray-800 p-2 text-sm text-white">
            {text}
          </div>
        )}
      </div>
    </>
  );
};
