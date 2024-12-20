import { Nav } from "react-bootstrap";
import { useTranslation } from "react-i18next";

interface NavBarProps {
  handleTabClick: (tabName: string) => void;
}
export default function NavBar({ handleTabClick }: NavBarProps) {
  const { t } = useTranslation();
  return (
    <Nav justify variant="tabs" defaultActiveKey="/">
      <Nav.Item>
        <Nav.Link
          onClick={(e) => {
            e.preventDefault();
            handleTabClick("Questions");
          }}
          href="/"
        >
          {t("template.nav.questions")}
        </Nav.Link>
      </Nav.Item>
      <Nav.Item>
        <Nav.Link
          onClick={() => handleTabClick("Aggregation")}
          eventKey="link-1"
        >
          {t("template.nav.aggregation")}
        </Nav.Link>
      </Nav.Item>
      <Nav.Item>
        <Nav.Link onClick={() => handleTabClick("Results")} eventKey="link-2">
          {t("template.nav.results")}
        </Nav.Link>
      </Nav.Item>
    </Nav>
  );
}
