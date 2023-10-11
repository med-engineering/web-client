import { FC, ReactNode, useEffect } from "react";

interface OnChildrenMountProps {
  children: ReactNode;
  onMount: () => void;
}

const OnChildrenMount: FC<OnChildrenMountProps> = ({
  children,
  onMount,
}) => {
  useEffect(() => {
    onMount();
  }, []);
  return <>{children}</>;
};

export default OnChildrenMount;
