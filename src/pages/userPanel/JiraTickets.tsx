import { useContext, useEffect, useState } from "react";
import Button from "react-bootstrap/Button";
import Offcanvas from "react-bootstrap/Offcanvas";
import { DarkModeContext } from "../../contexts/dark_mode/DarkModeContext";
import JiraTicket from "../../components/JiraTicket";
import { AtlassianIssue } from "../../types/jira";
import { Pagination } from "react-bootstrap";
import Loading from "../../components/Loading";
import { useTranslation } from "react-i18next";
import { CurrentUserContext } from "../../contexts/user/UserContext";

export default function JiraTickets() {
  const [tickets, setTickets] = useState<AtlassianIssue[] | null>(null);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState<string | null>(null);

  const [page, setPage] = useState(0);
  const [total, setTotal] = useState(0);
  const pageSize = 3;

  const [show, setShow] = useState(false);

  const handleClose = () => {
    setPage(0);
    setShow(false);
  };
  const handleShow = () => setShow(true);

  const { darkMode } = useContext(DarkModeContext);
  const { t } = useTranslation();
  const { currentUser } = useContext(CurrentUserContext);
  const name = encodeURIComponent(currentUser.email.split("@")[0]);

  useEffect(() => {
    console.log(
      `${import.meta.env.VITE_BE_URL}/get-tickets/${name}?startAt=${
        page * pageSize
      }&pageSize=${pageSize}`,
      "testzz"
    );
    const FetchJiraTickets = async () => {
      try {
        const response = await fetch(
          `${import.meta.env.VITE_BE_URL}/get-tickets/${name}?startAt=${
            page * pageSize
          }&pageSize=${pageSize}`
        );
        if (!response.ok) {
          throw new Error(`HTTP error: Status ${response.status}`);
        }
        let ticketsData = await response.json();
        setTickets(ticketsData.issues);
        setError(null);
        setTotal(ticketsData.total);
      } catch (err) {
        const error = err as Error;
        setError(error.message);
        setTickets(null);
      } finally {
        setLoading(false);
      }
    };

    FetchJiraTickets();
  }, [show, page]);

  const center = "position-absolute top-50 start-50 translate-middle";

  let items = [];
  for (let number = 1; number <= Math.ceil(total / pageSize); number++) {
    items.push(
      <Pagination.Item
        key={number}
        active={number === page + 1}
        onClick={() => setPage(number - 1)}
      >
        {number}
      </Pagination.Item>
    );
  }

  return (
    <>
      <Button variant="primary" onClick={handleShow} className="mb-3 ms-3">
        Jira
      </Button>

      <Offcanvas
        show={show}
        onHide={handleClose}
        placement="end"
        className={`${darkMode && "bg-dark text-light"}`}
      >
        <Offcanvas.Header closeButton>
          <Offcanvas.Title>{t("user_panel.jira.title")}</Offcanvas.Title>
        </Offcanvas.Header>
        {loading ? (
          <div className={center}>
            <Loading />
          </div>
        ) : error ? (
          <p className={center}>{error}</p>
        ) : tickets?.length === 0 ? (
          <p className={center}>{t("user_panel.jira.no_tickets")}</p>
        ) : (
          <>
            <Offcanvas.Body>
              {tickets?.map((i) => (
                <JiraTicket key={i.id} ticket={i} />
              ))}
            </Offcanvas.Body>
            <div className="mt-2 d-flex justify-content-center">
              <Pagination>{items}</Pagination>
            </div>
          </>
        )}
      </Offcanvas>
    </>
  );
}
