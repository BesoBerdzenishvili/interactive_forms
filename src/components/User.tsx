import React from "react";
import { Form } from "react-bootstrap";
import { User } from "../types/types";

interface UserPanel {
  user: User;
  selectedUsers: number[];
  handleCheckboxChange: (userId: number) => void;
}

const UserPanel: React.FC<UserPanel> = ({
  user,
  selectedUsers,
  handleCheckboxChange,
}) => {
  const disable = user.is_blocked ? "secondary" : "primary";
  return (
    <tr
      style={{
        textDecoration: user.is_blocked ? "line-through" : "none",
        color: disable,
      }}
    >
      <td className={`bg-${disable}`}>
        <Form.Check
          type="checkbox"
          checked={selectedUsers.includes(user.id)}
          onChange={() => handleCheckboxChange(user.id)}
        />
      </td>
      <td className={`bg-${disable}`}>{user.name}</td>
      <td className={`bg-${disable}`}>{user.email}</td>
      <td className={`bg-${disable}`} title={user.created_at}>
        {user.created_at.split("T")[0]}
      </td>
    </tr>
  );
};

export default UserPanel;
