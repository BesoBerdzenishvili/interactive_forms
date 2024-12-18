import { Dispatch, SetStateAction } from "react";
import Alert from "react-bootstrap/Alert";

interface AlertProps {
  color?: string;
  heading: string;
  text: string;
  setShow: Dispatch<SetStateAction<boolean>>;
}

const DismissibleAlert: React.FC<AlertProps> = ({
  color,
  heading,
  text,
  setShow,
}) => {
  return (
    <Alert
      variant="black"
      onClose={() => setShow(false)}
      dismissible
      className={`position-absolute top-50 start-50 translate-middle bg-${
        color ? color : "warning"
      }`}
    >
      <Alert.Heading>{heading}</Alert.Heading>
      <p>{text}</p>
    </Alert>
  );
};

export default DismissibleAlert;
