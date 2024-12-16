import { Button, Form, InputGroup, Stack } from "react-bootstrap";
import AllowedUsers from "./AllowedUsers";
import { useTranslation } from "react-i18next";

interface User {
  id: number;
  name: string;
  email: string;
}

export default function AllowedUsersList({
  users,
  handleAddUser,
  newUserName,
  setNewUserName,
  newUserEmail,
  setNewUserEmail,
}: {
  users: User[];
  handleAddUser: () => void;
  newUserName: string;
  setNewUserName: (e: string) => void;
  newUserEmail: string;
  setNewUserEmail: (e: string) => void;
}) {
  const { t } = useTranslation();
  return (
    <div>
      {/* Users Table */}
      <AllowedUsers users={users} />

      {/* Add User */}
      <Form.Group className="mb-3 w-sm-25">
        <InputGroup>
          <Stack direction="vertical" gap={2}>
            <Form.Control
              type="text"
              placeholder={t(
                "template.questions.allowed_users.name_placeholder"
              )}
              value={newUserName}
              onChange={(e) => setNewUserName(e.target.value)}
            />
            <Form.Control
              type="email"
              placeholder={t(
                "template.questions.allowed_users.email_placeholder"
              )}
              value={newUserEmail}
              onChange={(e) => setNewUserEmail(e.target.value)}
            />
          </Stack>
          <Button onClick={handleAddUser}>
            <i className="bi bi-person-plus"></i>
          </Button>
        </InputGroup>
      </Form.Group>
    </div>
  );
}
