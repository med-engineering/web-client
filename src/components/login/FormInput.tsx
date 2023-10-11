"use client";
import {
  Dispatch,
  FC,
  SetStateAction,
  InputHTMLAttributes,
  KeyboardEvent,
} from "react";

interface FormInputProps extends InputHTMLAttributes<HTMLInputElement> {
  placeholder: string;
  value: string | undefined;
  setValue: Dispatch<SetStateAction<string>>;
  onEnterPressed?: () => any;
  type?: string;
  error?: string | null;
  disabled?: boolean;
}

const FormInput: FC<FormInputProps> = ({
  placeholder,
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
          className={`bg-transparent w-full peer border-[1px] border-solid border-gray-4 duration-200 px-3 py-3 rounded-md ${
            error
              ? "border-red-600"
              : `hover:border-primary focus:border-primary ${
                  value?.trim().length ? "border-primary" : ""
                }`
          }`}
          {...rest}
        />
        <div
          className={`absolute h-max top-0 bottom-0 peer-focus:bottom-12 peer-focus:text-[13px] peer-focus:px-1 ${
            error ? "peer-focus:text-red-500" : "peer-focus:text-primary"
          } peer-focus:bg-dark-2 my-auto left-3 pointer-events-none capitalize duration-200 ${
            value?.trim().length
              ? `bottom-12 text-[13px] px-1 bg-dark-2 ${
                  error ? "text-red-500" : "text-primary"
                }`
              : `${error ? "text-red-500" : "text-gray-100"}`
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

export default FormInput;
