import Badge from "react-bootstrap/Badge";
interface StatusBadgeProps {
  status: string;
}
export default function StatusBadge({ status }: StatusBadgeProps) {
  let color = "warning";
  switch (status) {
    case "To Do":
      color = "secondary";
      break;
    case "In Progress":
      color = "primary";
      break;
    case "Done":
      color = "success";
      break;
  }
  return <Badge bg={color}>{status}</Badge>;
}
