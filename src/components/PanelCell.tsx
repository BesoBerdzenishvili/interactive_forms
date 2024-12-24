import { useNavigate } from "react-router-dom";
import { Answer } from "../types/types";

interface PanelProps {
  answer: Answer | undefined;
  formId: number;
  index: number;
}

export default function PanelCell({ answer, formId, index }: PanelProps) {
  const navigate = useNavigate();
  return (
    <tr onClick={() => navigate(`/user-form/${formId}/${answer?.author_id}`)}>
      <td>{index + 1}</td>
      <td>{answer?.template_title}</td>
      <td>{answer?.author_name}</td>
    </tr>
  );
}
