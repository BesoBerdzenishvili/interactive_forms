import { Stack, Button, InputGroup, FormControl } from "react-bootstrap";
import { useTranslation } from "react-i18next";

interface ControllersProps {
  onDelete: () => void;
  onBlock: () => void;
  onUnblock: () => void;
  onFilterChange: (event: React.ChangeEvent<HTMLInputElement>) => void;
}

const Controllers = ({
  onDelete,
  onBlock,
  onUnblock,
  onFilterChange,
}: ControllersProps) => {
  const { t } = useTranslation();
  return (
    <div className="d-flex">
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
      </Stack>
      <InputGroup>
        <FormControl
          className="border-primary ms-3"
          placeholder={t("admin_panel.filter")}
          onChange={onFilterChange}
        />
      </InputGroup>
    </div>
  );
};

export default Controllers;
