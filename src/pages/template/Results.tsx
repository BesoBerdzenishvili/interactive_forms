import { useContext } from "react";
import { Table } from "react-bootstrap";
import { useTranslation } from "react-i18next";
import { useNavigate } from "react-router-dom";
import { DarkModeContext } from "../../contexts/dark_mode/DarkModeContext";

const list = [
  {
    id: 1,
    user: "Alice yjtjtkuy",
    name: "14/04/2024",
  },
  {
    id: 2,
    user: "Bob ftymtumyu",
    name: "24/04/2024",
  },
  {
    id: 3,
    user: "Charlie rjryjtyjt",
    name: "07/04/2024",
  },
];

export default function Results() {
  const navigate = useNavigate();
  const { t } = useTranslation();
  const { darkMode } = useContext(DarkModeContext);
  return (
    <div className="text-center">
      <h3>{t("template.results.title")}</h3>
      <Table
        bordered
        responsive
        hover
        variant={darkMode ? "dark" : ""}
        className="mt-3 text-center"
      >
        <thead>
          <tr>
            <th>{t("template.results.tab.index")}</th>
            <th>{t("template.results.tab.user")}</th>
            <th>{t("template.results.tab.filled_at")}</th>
          </tr>
        </thead>
        <tbody>
          {list.map((template) => (
            <tr key={template.id} onClick={() => navigate("/user-form/rhtj")}>
              <td>{template.id}</td>
              <td>{template.user}</td>
              <td>{template.name}</td>
            </tr>
          ))}
        </tbody>
      </Table>
    </div>
  );
}
