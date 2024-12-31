import { Answer } from "../types/types";

interface newAnswer extends Answer {
  created_at: string;
}

interface ResultProps {
  answer: newAnswer | undefined;
  onClick: () => void;
  index: number;
}

export default function Result({ answer, onClick, index }: ResultProps) {
  return (
    <tr onClick={onClick}>
      <td>{index + 1}</td>
      <td>{answer?.author_name}</td>
      <td>{answer?.created_at.split("T")[0]}</td>
    </tr>
  );
}
