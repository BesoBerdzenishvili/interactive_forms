import useNameById from "../hooks/useNameById";
import { Answer } from "../types/types";

interface ResultProps {
  template: Answer;
  onClick: () => void;
}

export default function Result({ template, onClick }: ResultProps) {
  return (
    <tr key={template.id} onClick={onClick}>
      <td>{template.id}</td>
      <td>{useNameById(template.author_id)}</td>
      <td>{template.created_at.split("T")[0]}</td>
    </tr>
  );
}
