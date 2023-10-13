"use client";
import { FC, ReactNode } from "react";
import ActivityIndicator from "../loaders/ActivityIndicator";

interface ButtonProps {
  children: ReactNode;
  width?: "full" | "max";
  color?: "primary" | "secondary";
  isLoading?: boolean;
  isDisabled?: boolean;
  onClick?: () => void;
}

const Button: FC<ButtonProps> = ({
  children,
  width = "max",
  color = "primary",
  isLoading = false,
  isDisabled = false,
  onClick,
}) => {
  return (
    <button
      disabled={isDisabled}
      style={{
        width: width === "max" ? "max-content" : "100%",
      }}
      onClick={isLoading || isDisabled ? undefined : onClick}
      className={`bg-primary relative px-6 ${
        isDisabled || isLoading
          ? "cursor-not-allowed opacity-90"
          : "cursor-pointer hover:opacity-90 active:scale-[.99]"
      } duration-200 py-[10px] rounded-md mt-3`}
    >
      <div
        style={{
          visibility: isLoading ? "hidden" : "visible",
        }}
      >
        {children}
      </div>
      {isLoading && (
        <div className="absolute right-0 left-0 top-0 bottom-0 w-max h-max m-auto">
          <ActivityIndicator />
        </div>
      )}
    </button>
  );
};

export default Button;
