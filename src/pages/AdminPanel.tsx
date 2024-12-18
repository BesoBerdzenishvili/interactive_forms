import React, { useState, useEffect } from "react";
import { Table, Container, Row, Col, Form } from "react-bootstrap";
import Controllers from "../components/Controllers";
import UserPanel from "../components/User";
import { User } from "../types/types";
import { useTranslation } from "react-i18next";

const AdminPanel = () => {
  const [users, setUsers] = useState<User[]>([]);
  const [selectedUsers, setSelectedUsers] = useState<number[]>([]);
  const [filter, setFilter] = useState("");
  // replace last seen with created at
  useEffect(() => {
    const mockUsers: User[] = [
      // {
      //   id: 1,
      //   name: "John Doe",
      //   email: "johndoe@example.com",
      //   created_at: "2023-11-19",
      //   is_blocked: false,
      // },
      // {
      //   id: 2,
      //   name: "Jane Smith",
      //   email: "janesmith@example.com",
      //   created_at: "2023-11-18",
      //   is_blocked: true,
      // },
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
  const { t } = useTranslation();

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
                <th className="bg-danger">{t("admin_panel.tab.name")}</th>
                <th className="bg-danger">{t("admin_panel.tab.email")}</th>
                <th className="bg-danger">{t("admin_panel.tab.last_seen")}</th>
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
