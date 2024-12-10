import React from "react";
import { Form } from "react-bootstrap";
import { User } from "../types";

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
  const disable = user.status === "blocked" ? "secondary" : "primary";
  return (
    <tr
      style={{
        textDecoration: user.status === "blocked" ? "line-through" : "none",
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
      <td className={`bg-${disable}`} title={user.lastSeen}>
        {user.lastSeen.split("T")[0]}
      </td>
    </tr>
  );
};

export default UserPanel;
