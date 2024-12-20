import { Dispatch, SetStateAction } from "react";
import Alert from "react-bootstrap/Alert";

interface Data {
  color: string;
  heading: string;
  text: string;
}

interface AlertProps {
  data: Data;
  setShow: Dispatch<SetStateAction<boolean>>;
}

const DismissibleAlert: React.FC<AlertProps> = ({ data, setShow }) => {
  return (
    <Alert
      variant="black"
      onClose={() => setShow(false)}
      dismissible
      className={`z-3 text-dark position-fixed top-50 start-50 translate-middle bg-${data.color}`}
    >
      <Alert.Heading>{data.heading}</Alert.Heading>
      <p>{data.text}</p>
    </Alert>
  );
};

export default DismissibleAlert;
