import { useContext, useState } from "react";
import { Button, Table } from "react-bootstrap";
import { useTranslation } from "react-i18next";
import { DarkModeContext } from "../../../contexts/dark_mode/DarkModeContext";

interface AllowedUsersProps {
  users: User[];
  removeUser: (id: string) => void;
}
interface User {
  id: string;
  name: string;
  email: string;
}

const AllowedUsers: React.FC<AllowedUsersProps> = ({ users, removeUser }) => {
  const [sortField, setSortField] = useState<"name" | "email">("name");
  const sortedUsers = [...users].sort((a, b) =>
    a[sortField].localeCompare(b[sortField])
  );
  const { t } = useTranslation();
  const { darkMode } = useContext(DarkModeContext);

  return (
    <div className="my-4">
      <h4> {t("template.questions.allowed_users.title")}</h4>
      {users.length === 0 ? (
        <p>{t("template.questions.allowed_users.everyone")}</p>
      ) : (
        <Table striped bordered hover className={darkMode ? "table-dark" : ""}>
          <thead>
            <tr>
              <th onClick={() => setSortField("name")}>
                {t("template.questions.allowed_users.name")}
              </th>
              <th onClick={() => setSortField("email")}>
                {t("template.questions.allowed_users.email")}
              </th>
              <th className="text-center">
                {t("template.questions.allowed_users.remove")}
              </th>
            </tr>
          </thead>
          <tbody>
            {sortedUsers.map((user) => (
              <tr key={user.id}>
                <td>{user.name}</td>
                <td>{user.email}</td>
                <td>
                  <Button
                    onClick={() => removeUser(user.id)}
                    variant="danger"
                    className="self-center"
                  >
                    X
                  </Button>
                </td>
              </tr>
            ))}
          </tbody>
        </Table>
      )}
    </div>
  );
};

export default AllowedUsers;
