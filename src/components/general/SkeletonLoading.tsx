import { CSSProperties, FC, ReactNode } from "react";

interface SkeletonLoadingProps {
  children: ReactNode;
  loadingCondition: boolean;
  shine?: boolean;
  isCircle?: boolean;
  width: string;
  height?: string;
  borderRadius?: string;
  marginTop?: string;
  marginBottom?: string;
  marginRight?: string;
  marginLeft?: string;
  className?: string;
  containerStyle?: CSSProperties;
}

const SkeletonLoading: FC<SkeletonLoadingProps> = ({
  children,
  loadingCondition = true,
  shine = true,
  width = 100,
  height = width,
  borderRadius = 2,
  isCircle = false,
  marginTop,
  marginBottom,
  marginRight,
  marginLeft,
  containerStyle,
  className,
}) => {
  return (
    <>
      {loadingCondition ? (
        <div
          role="status"
          className={`max-w-sm ${shine ? "animate-pulse" : ""}`}
          style={{
            marginTop,
            marginBottom,
            marginRight,
            marginLeft,
            ...containerStyle,
          }}
        >
          <div
            style={{
              borderRadius: isCircle ? "50%" : borderRadius,
              height,
              width,
            }}
            className={`bg-gray-200 dark:bg-gray-700 ${className}`}
          />
        </div>
      ) : (
        children
      )}
    </>
  );
};

export default SkeletonLoading;
