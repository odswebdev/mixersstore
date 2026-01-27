import { useState } from "react";

const CustomCheckboxSvg = ({ label, onChange, defaultChecked = false }) => {
  const [checked, setChecked] = useState(defaultChecked);

  const handleClick = () => {
    const newChecked = !checked;
    setChecked(newChecked);
    if (onChange) onChange(newChecked);
  };

  return (
    <label className="flex items-center gap-2 cursor-pointer select-none text-[12px] text-[rgba(255,_255,_255,_0.7)] mt-[23px] mb-[23px]">
      <div
        onClick={handleClick}
        className="w-[14px] h-[14px] mr-[15px] relative flex items-center justify-center"
      >
        <svg
          width="14"
          height="14"
          viewBox="0 0 14 14"
          fill="none"
          xmlns="http://www.w3.org/2000/svg"
        >
          <rect
            x="0.5"
            y="0.5"
            width="13"
            height="13"
            rx="1.5"
            stroke="white"
          />
          {checked && (
            <path
              d="M3 7.23077L6.33905 9.87265C6.42726 9.94245 6.55565 9.92579 6.62314 9.83581L11 4"
              stroke="white"
              strokeLinecap="round"
            />
          )}
        </svg>
      </div>
      <span>{label}</span>
    </label>
  );
};

export default CustomCheckboxSvg;
