import { Table } from "react-bootstrap";
import { useNavigate } from "react-router-dom";

const list = [
  {
    id: 1,
    user: "Alice yjtjtkuy",
    name: "14/04/2024",
  },
  {
    id: 2,
    user: "Bob ftymtumyu",
    name: "24/04/2024",
  },
  {
    id: 3,
    user: "Charlie rjryjtyjt",
    name: "07/04/2024",
  },
];

export default function Results() {
  const navigate = useNavigate();
  return (
    <div className="text-center">
      {/* add translate here */}
      <h3>Filled Forms</h3>
      <Table
        bordered
        responsive
        hover
        variant="dark"
        className="mt-3 text-center"
      >
        <thead>
          <tr>
            <th>Index</th>
            <th>User</th>
            <th>Filled at</th>
          </tr>
        </thead>
        <tbody>
          {list.map((template) => (
            <tr key={template.id} onClick={() => navigate("/user-form/rhtj")}>
              <td>{template.id}</td>
              <td>{template.user}</td>
              <td>{template.name}</td>
            </tr>
          ))}
        </tbody>
      </Table>
    </div>
  );
}
