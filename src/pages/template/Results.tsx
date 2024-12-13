import { Table } from "react-bootstrap";

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
  return (
    <div className="text-center">
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
            <tr key={template.id}>
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
