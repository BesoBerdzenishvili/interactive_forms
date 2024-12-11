import { Stack, Button, InputGroup, FormControl } from "react-bootstrap";

interface ControllersProps {
  onDelete: () => void;
  onBlock: () => void;
  onUnblock: () => void;
  onFilterChange: (event: React.ChangeEvent<HTMLInputElement>) => void;
}

const Controllers = ({
  onDelete,
  onBlock,
  onUnblock,
  onFilterChange,
}: ControllersProps) => {
  return (
    <div className="d-flex">
      <Stack direction="horizontal" gap={3}>
        <Button variant="outline-primary" onClick={onBlock}>
          <i className="bi bi-lock-fill"></i> Block
        </Button>
        <Button variant="outline-primary" onClick={onUnblock}>
          <i className="bi-unlock-fill" /> Unblock
        </Button>
        <Button variant="outline-danger" onClick={onDelete}>
          <i className="bi bi-trash-fill"></i> Delete
        </Button>
      </Stack>
      <InputGroup>
        <FormControl
          className="border-primary ms-3"
          placeholder="Filter..."
          onChange={onFilterChange}
        />
      </InputGroup>
    </div>
  );
};

export default Controllers;
