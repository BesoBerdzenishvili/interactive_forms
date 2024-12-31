import { Dispatch, SetStateAction, useContext } from "react";
import { Button, Table } from "react-bootstrap";
import { useTranslation } from "react-i18next";
import { DarkModeContext } from "../../../contexts/dark_mode/DarkModeContext";
import SortArrow from "../../../components/SortArrow";
import { User } from "../../../types/types";

interface AllowedUsersListProps {
  users: User[];
  removeUser: (id: number) => void;
  asc: boolean;
  setAsc: Dispatch<SetStateAction<boolean>>;
  orderBy: string;
  setOrderBy: Dispatch<SetStateAction<string>>;
}

const AllowedUsersList: React.FC<AllowedUsersListProps> = ({
  users,
  removeUser,
  asc,
  setAsc,
  orderBy,
  setOrderBy,
}) => {
  const { t } = useTranslation();
  const { darkMode } = useContext(DarkModeContext);

  const sortFields = (field: string) => {
    setOrderBy(field);
    setAsc(!asc);
  };

  return (
    <div className="my-4">
      <h4> {t("template.questions.allowed_users.title")}</h4>
      {users.length === 0 ? (
        <p>{t("template.questions.allowed_users.everyone")}</p>
      ) : (
        <Table striped bordered hover className={darkMode ? "table-dark" : ""}>
          <thead>
            <tr>
              <th onClick={() => sortFields("name")}>
                {t("template.questions.allowed_users.name")}
                <SortArrow orderBy={orderBy} fieldName="name" asc={asc} />
              </th>
              <th onClick={() => sortFields("email")}>
                {t("template.questions.allowed_users.email")}
                <SortArrow orderBy={orderBy} fieldName="email" asc={asc} />
              </th>

              <th className="text-center">
                {t("template.questions.allowed_users.remove")}
              </th>
            </tr>
          </thead>
          <tbody>
            {users?.map((user) => (
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

export default AllowedUsersList;
