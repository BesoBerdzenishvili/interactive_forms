import { useContext } from "react";
import { Stack, Button, FormControl } from "react-bootstrap";
import { useTranslation } from "react-i18next";
import { DarkModeContext } from "../contexts/dark_mode/DarkModeContext";

interface ControllersProps {
  onDelete: () => void;
  onBlock: () => void;
  onUnblock: () => void;
  onFilterChange: (event: React.ChangeEvent<HTMLInputElement>) => void;
  handleMakeUser: () => void;
  handleMakeAdmin: () => void;
}

const Controllers = ({
  onDelete,
  onBlock,
  onUnblock,
  onFilterChange,
  handleMakeUser,
  handleMakeAdmin,
}: ControllersProps) => {
  const { t } = useTranslation();
  const { darkMode } = useContext(DarkModeContext);
  return (
    <Stack direction="vertical">
      <Stack direction="horizontal" gap={3}>
        <Button variant="outline-primary" onClick={onBlock}>
          <i className="bi bi-lock-fill"></i> {t("admin_panel.buttons.block")}
        </Button>
        <Button variant="outline-primary" onClick={onUnblock}>
          <i className="bi-unlock-fill" /> {t("admin_panel.buttons.unblock")}
        </Button>
        <Button variant="outline-danger" onClick={onDelete}>
          <i className="bi bi-trash-fill"></i> {t("admin_panel.buttons.delete")}
        </Button>
        <Button variant="outline-success" onClick={handleMakeUser}>
          <i className="bi bi-person-fill"></i> {t("admin_panel.buttons.user")}
        </Button>
        <Button variant="outline-success" onClick={handleMakeAdmin}>
          <i className="bi bi-person-fill-add"></i>{" "}
          {t("admin_panel.buttons.admin")}
        </Button>
      </Stack>
      <FormControl
        className={`gray-placeholder border-primary mt-3 ${
          darkMode && "bg-black text-white"
        }`}
        placeholder={t("admin_panel.filter")}
        onChange={onFilterChange}
      />
    </Stack>
  );
};

export default Controllers;
