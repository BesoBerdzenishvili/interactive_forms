import React from "react";
import { Button, InputGroup, FormControl } from "react-bootstrap";

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
      <div className="d-flex align-items-cente">
        <Button variant="outline-primary" onClick={onBlock}>
          <i className="bi bi-circle" /> Block
        </Button>
        <Button variant="outline-primary" onClick={onUnblock}>
          <i className="bi bi-circle" /> Unblock
        </Button>
        <Button variant="outline-danger" onClick={onDelete}>
          <i className="bi bi-circle" /> Delete
        </Button>
      </div>
      <InputGroup>
        <FormControl placeholder="Filter..." onChange={onFilterChange} />
      </InputGroup>
    </div>
  );
};

export default Controllers;
