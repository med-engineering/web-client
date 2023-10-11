import { FC } from "react";
import { faSpinner } from "@fortawesome/free-solid-svg-icons";
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";

interface ActivityIndicatorProps {
  size?: number;
}

const ActivityIndicator: FC<ActivityIndicatorProps> = ({ size = 23 }) => {
  return (
    <>
      <FontAwesomeIcon
        style={{
          fontSize: `${size}px`,
        }}
        icon={faSpinner}
        spin
      />
    </>
  );
};

export default ActivityIndicator;
