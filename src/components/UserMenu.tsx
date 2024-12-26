import { useContext } from "react";
import { CurrentUserContext } from "../contexts/user/UserContext";
import { Button, Dropdown } from "react-bootstrap";
import { Link } from "react-router-dom";
import { useTranslation } from "react-i18next";

export default function UserMenu() {
  const { currentUser, logout } = useContext(CurrentUserContext);
  const { t } = useTranslation();
  return currentUser.name ? (
    <Dropdown align={{ lg: "end" }}>
      <Dropdown.Toggle variant="danger">{currentUser.name}</Dropdown.Toggle>

      <Dropdown.Menu>
        <Dropdown.Item className="hoverable" href="/user-panel">
          {t("header.my_panel")}
        </Dropdown.Item>
        {currentUser.is_admin && (
          <Dropdown.Item className="hoverable" href="/admin-panel">
            {t("header.admin_panel")}
          </Dropdown.Item>
        )}
        <Dropdown.Item className="hoverable" onClick={logout}>
          {t("header.logout")}
        </Dropdown.Item>
      </Dropdown.Menu>
    </Dropdown>
  ) : (
    <>
      <Link to="/registration">
        <Button variant="warning" className="m-1">
          {t("header.register")}
        </Button>
      </Link>
      <Link to="/login">
        <Button variant="warning" className="m-1">
          {t("header.login")}
        </Button>
      </Link>
    </>
  );
}
