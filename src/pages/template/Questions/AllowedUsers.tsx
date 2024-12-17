import { useContext, useState } from "react";
import { Table } from "react-bootstrap";
import { useTranslation } from "react-i18next";
import { DarkModeContext } from "../../../contexts/dark_mode/DarkModeContext";

interface User {
  id: number;
  name: string;
  email: string;
}

const AllowedUsers: React.FC<{ users: User[] }> = ({ users }) => {
  const [sortField, setSortField] = useState<"name" | "email">("name");
  const sortedUsers = [...users].sort((a, b) =>
    a[sortField].localeCompare(b[sortField])
  );
  const { t } = useTranslation();
  const { darkMode } = useContext(DarkModeContext);

  return (
    <div className="my-4">
      <h4> {t("template.questions.allowed_users.title")}</h4>
      <Table striped bordered hover className={darkMode ? "table-dark" : ""}>
        <thead>
          <tr>
            <th onClick={() => setSortField("name")}>
              {t("template.questions.allowed_users.name")}
            </th>
            <th onClick={() => setSortField("email")}>
              {t("template.questions.allowed_users.email")}
            </th>
          </tr>
        </thead>
        <tbody>
          {sortedUsers.map((user) => (
            <tr key={user.id}>
              <td>{user.name}</td>
              <td>{user.email}</td>
            </tr>
          ))}
        </tbody>
      </Table>
    </div>
  );
};

export default AllowedUsers;
