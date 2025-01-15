import { useContext, useState } from "react";
import { Button, Form, Modal } from "react-bootstrap";
import { CurrentUserContext } from "../contexts/user/UserContext";
import Loading from "./Loading";

export default function Example() {
  const [show, setShow] = useState(false);
  const [loading, setLoading] = useState(false);
  const [message, setMessage] = useState("");
  const [link, setLink] = useState("");

  const [priority, setPriority] = useState("Low");
  const [title, setTitle] = useState("");
  const [summary, setSummary] = useState("");

  const { currentUser } = useContext(CurrentUserContext);

  const handleClose = () => {
    setShow(false);

    setMessage("");
    setLink("");
    setPriority("Low");
    setSummary("");
    setTitle("");
  };
  const handleShow = () => setShow(true);
  const currentURL = window.location.pathname;
  const handleSubmit = async () => {
    try {
      setLoading(true);
      const response = await fetch(
        `${import.meta.env.VITE_BE_URL}/create-ticket`,
        {
          method: "POST",
          headers: {
            "Content-Type": "application/json",
          },
          body: JSON.stringify({
            summary: title,
            description: summary,
            template: "Template",
            link: currentURL,
            priority: priority,
            reporterEmail: currentUser.email,
            reporterDisplayName: currentUser.name,
          }),
        }
      );

      if (!response.ok) {
        setMessage("Something went Wrong!");
        throw new Error("Network response was not ok");
      }

      setMessage("Ticket is created successfully");
      const jsonResponse = await response.json();
      setLink(jsonResponse.issueKey);
    } catch (error) {
      const err = error as Error;
      setMessage(err.message);
      console.error("POST request failed:", error);
    } finally {
      setLoading(false);
    }
  };

  return (
    <>
      <Button
        className="position-fixed bottom-0 end-0 m-3"
        variant="primary"
        onClick={handleShow}
      >
        Help
      </Button>

      <Modal show={show} onHide={handleClose} backdrop="static">
        {loading ? (
          <Loading />
        ) : message ? (
          <>
            <Modal.Header closeButton>
              <Modal.Title>{message}</Modal.Title>
            </Modal.Header>
            <Modal.Body className="text-center mb-3">
              <a
                target="_blank"
                href={`${
                  import.meta.env.VITE_JIRA_URL
                }/jira/software/projects/IF2/boards/2?selectedIssue=${link}`}
              >
                {link}
              </a>
            </Modal.Body>
          </>
        ) : (
          <>
            <Modal.Header closeButton>
              <Modal.Title>Create New Jira Ticket</Modal.Title>
            </Modal.Header>
            <Modal.Body>
              <Form.Label>Priority</Form.Label>
              <Form.Select
                value={priority}
                onChange={(e) => setPriority(e.target.value)}
                className="mb-2"
              >
                <option value="Low">Low</option>
                <option value="Average">Average</option>
                <option value="High">High</option>
              </Form.Select>
              <Form.Label>Title</Form.Label>
              <Form.Control
                className="mb-2"
                type="text"
                placeholder={"Enter title here..."}
                value={title}
                onChange={(e) => setTitle(e.target.value)}
              />
              <Form.Label>Description</Form.Label>
              <Form.Control
                as="textarea"
                placeholder="Enter Summary..."
                value={summary}
                onChange={(e) => setSummary(e.target.value)}
              />
            </Modal.Body>
            <Modal.Footer className="d-flex justify-content-center">
              <Button variant="primary" onClick={handleSubmit}>
                Create
              </Button>
            </Modal.Footer>
          </>
        )}
      </Modal>
    </>
  );
}
