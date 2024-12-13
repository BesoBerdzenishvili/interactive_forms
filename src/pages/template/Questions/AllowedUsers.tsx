import { useState } from "react";
import { Table } from "react-bootstrap";

interface User {
  id: number;
  name: string;
  email: string;
}

const AllowedUsers: React.FC<{ users: User[] }> = ({ users }) => {
  const [sortField, setSortField] = useState<"name" | "email">("name");
  const sortedUsers = [...users].sort((a, b) =>
    a[sortField].localeCompare(b[sortField])
  );

  return (
    <div className="my-4">
      <h4>Allowed Users</h4>
      <Table striped bordered hover>
        <thead>
          <tr>
            <th onClick={() => setSortField("name")}>Name</th>
            <th onClick={() => setSortField("email")}>Email</th>
          </tr>
        </thead>
        <tbody>
          {sortedUsers.map((user) => (
            <tr key={user.id}>
              <td>{user.name}</td>
              <td>{user.email}</td>
            </tr>
          ))}
        </tbody>
      </Table>
    </div>
  );
};

export default AllowedUsers;
