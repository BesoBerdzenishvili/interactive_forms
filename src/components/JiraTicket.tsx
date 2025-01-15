import { Card, Image } from "react-bootstrap";
import { AtlassianIssue } from "../types/jira";
import StatusBadge from "./StatusBadge";
import { useTranslation } from "react-i18next";

interface JiraTicketProps {
  ticket: AtlassianIssue;
}

export default function JiraTicket({ ticket }: JiraTicketProps) {
  const fields = ticket.fields;
  const { t } = useTranslation();
  return (
    <Card className="mb-4">
      <Card.Body>
        <Card.Title>{fields.summary}</Card.Title>
        <Card.Subtitle className="mb-1 text-muted">
          {t("user_panel.jira.ticket.assignee")}:{" "}
          {fields.assignee ? (
            <span>
              <Image
                height={24}
                src={fields.assignee.avatarUrls["16x16"]}
                roundedCircle
              />{" "}
              {fields.assignee.displayName}
            </span>
          ) : (
            "Unassigned"
          )}
        </Card.Subtitle>
        <Card.Subtitle className="mb-2 text-muted">
          {t("user_panel.jira.ticket.type")}: {fields.issuetype.name}
        </Card.Subtitle>
        <Card.Subtitle className="mb-2 text-muted">
          {t("user_panel.jira.ticket.priority")}:{" "}
          {fields.customfield_10037.value}
        </Card.Subtitle>
        <Card.Subtitle className="mb-2 text-muted">
          {t("user_panel.jira.ticket.status")}:{" "}
          <h5 className="d-inline">
            <StatusBadge status={fields.status.name} />
          </h5>
        </Card.Subtitle>
        <Card.Text>{fields.description}</Card.Text>
      </Card.Body>
      <Card.Footer className="text-muted">
        <Card.Text>
          {t("user_panel.jira.ticket.reporter")}:{" "}
          <Image
            height={24}
            src={fields.reporter.avatarUrls["16x16"]}
            roundedCircle
          />{" "}
          {fields.reporter.displayName}
        </Card.Text>
      </Card.Footer>
    </Card>
  );
}
