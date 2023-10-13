"use client";
import {
  Dispatch,
  FC,
  SetStateAction,
  InputHTMLAttributes,
  KeyboardEvent,
} from "react";

interface LabeledInputProps extends InputHTMLAttributes<HTMLInputElement> {
  placeholder: string;
  value: string | undefined;
  setValue: Dispatch<SetStateAction<string>>;
  className?: string;
  onEnterPressed?: () => any;
  type?: string;
  error?: string | null;
  disabled?: boolean;
}

const LabeledInput: FC<LabeledInputProps> = ({
  placeholder,
  className,
  value,
  setValue,
  type = "text",
  error = null,
  disabled,
  onEnterPressed,
  ...rest
}) => {
  const handleKeyPress = (e: KeyboardEvent<HTMLInputElement>) => {
    if (e.key === "Enter" && onEnterPressed) {
      onEnterPressed();
    }
  };

  return (
    <div>
      <div className="relative">
        <input
          disabled={disabled}
          onChange={(e) => setValue(e.target.value)}
          onKeyDown={handleKeyPress}
          type={type}
          style={{
            borderBottomStyle: "solid",
            borderBottomWidth: "1px",
          }}
          className={`bg-transparent w-full peer border-gray-4 text-[15px] duration-200 px-1 pb-2 pt-3 ${
            error
              ? "border-red-600"
              : `hover:border-primary focus:border-primary ${
                  value?.trim().length ? "border-primary" : ""
                }`
          } ${className}`}
          {...rest}
        />
        <div
          className={`absolute h-max top-0 bottom-0 peer-focus:bottom-12 peer-focus:text-[13px] peer-focus:px-1 ${
            error ? "peer-focus:text-red-500" : "peer-focus:text-primary"
          }  my-auto pointer-events-none capitalize duration-200 ${
            value?.trim().length
              ? `bottom-12 text-[13px] px-1 ${
                  error ? "text-red-500" : "text-primary"
                }`
              : `${error ? "text-red-500" : "text-gray-400"}`
          }`}
        >
          {placeholder}
        </div>
      </div>
      <div
        className={`mt-1 mb-1 ${
          error ? "text-red-500" : "text-gray-2"
        } text-[13px] font-semibold`}
      >
        {error && <span>ERROR - {error}</span>}
      </div>
    </div>
  );
};

export default LabeledInput;
