import React, { useState, useEffect } from "react";
import { Table, Container, Row, Col, Form } from "react-bootstrap";
import Controllers from "../common/Controllers";
import UserPanel from "../common/User";
import { User } from "../types";

const AdminPanel = () => {
  const [users, setUsers] = useState<User[]>([]);
  const [selectedUsers, setSelectedUsers] = useState<number[]>([]);
  const [filter, setFilter] = useState("");

  useEffect(() => {
    const mockUsers: User[] = [
      {
        id: 1,
        name: "John Doe",
        email: "johndoe@example.com",
        lastSeen: "2023-11-19",
        status: "active",
      },
      {
        id: 2,
        name: "Jane Smith",
        email: "janesmith@example.com",
        lastSeen: "2023-11-18",
        status: "blocked",
      },
    ];
    setUsers(mockUsers);
  }, []);

  const handleDelete = () => {
    // Implement deletion logic using selectedUsers
  };

  const handleBlock = () => {
    // Implement blocking logic using selectedUsers
  };

  const handleUnblock = () => {
    // Implement unblocking logic using selectedUsers
  };

  const handleFilterChange = (event: React.ChangeEvent<HTMLInputElement>) => {
    setFilter(event.target.value);
  };

  const handleCheckboxChange = (userId: number) => {
    if (selectedUsers.includes(userId)) {
      setSelectedUsers(selectedUsers.filter((id) => id !== userId));
    } else {
      setSelectedUsers([...selectedUsers, userId]);
    }
  };

  const handleSelectAll = (event: React.ChangeEvent<HTMLInputElement>) => {
    if (event.target.checked) {
      setSelectedUsers(users.map((user) => user.id));
    } else {
      setSelectedUsers([]);
    }
  };

  const filteredUsers = users.filter((user) =>
    user.name.toLowerCase().includes(filter.toLowerCase())
  );

  return (
    <Container className="position-absolute top-50 start-50 translate-middle p-3 rounded-3">
      <Row className="pb-3">
        <Col>
          <Controllers
            onDelete={handleDelete}
            onBlock={handleBlock}
            onUnblock={handleUnblock}
            onFilterChange={handleFilterChange}
          />
        </Col>
      </Row>
      <Row>
        <Col>
          <Table striped bordered hover>
            <thead>
              <tr>
                <th className="bg-danger">
                  <Form.Check
                    type="checkbox"
                    className="form-check-label-color-primary"
                    onChange={handleSelectAll}
                  />
                </th>
                <th className="bg-danger">Name</th>
                <th className="bg-danger">Email</th>
                <th className="bg-danger">Last Seen</th>
              </tr>
            </thead>
            <tbody>
              {filteredUsers.map((user) => (
                <UserPanel
                  user={user}
                  selectedUsers={selectedUsers}
                  handleCheckboxChange={handleCheckboxChange}
                />
              ))}
            </tbody>
          </Table>
        </Col>
      </Row>
    </Container>
  );
};

export default AdminPanel;
