import React from "react";
import { Form } from "react-bootstrap";
import { User } from "../types/types";
import { useTranslation } from "react-i18next";

interface UserPanelProps {
  user: User;
  selectedUsers: string[];
  handleCheckboxChange: (userId: string) => void;
}

const UserPanel: React.FC<UserPanelProps> = ({
  user,
  selectedUsers,
  handleCheckboxChange,
}) => {
  const { t } = useTranslation();
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
      <td className={`bg-${disable}`}>
        {user.is_admin
          ? t("admin_panel.buttons.admin")
          : t("admin_panel.buttons.user")}
      </td>
    </tr>
  );
};

export default UserPanel;
