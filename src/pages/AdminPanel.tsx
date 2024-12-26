import React, { useState, useEffect, useContext } from "react";
import { Table, Container, Row, Col, Form } from "react-bootstrap";
import Controllers from "../components/Controllers";
import UserPanel from "../components/User";
import { User } from "../types/types";
import { useTranslation } from "react-i18next";
import supabase from "../config/supabase";
import { CurrentUserContext } from "../contexts/user/UserContext";
import DismissibleAlert from "../components/Alert";
import alert from "../utils/alertMessages";

const AdminPanel = () => {
  const [users, setUsers] = useState<User[]>([]);
  const [selectedUsers, setSelectedUsers] = useState<number[]>([]);
  const [filter, setFilter] = useState("");
  const [refetchUsers, setRefetchUsers] = useState(false);
  const [show, setShow] = useState(false);

  const { currentUser, update } = useContext(CurrentUserContext);

  useEffect(() => {
    const fetchProfiles = async () => {
      try {
        const { data, error } = await supabase.from("profiles").select();
        if (data) {
          setUsers(data);
          const thisUser =
            data && data.filter((i) => i.email === currentUser.email);
          update(thisUser[0]);
        } else {
          console.log(error);
        }
      } catch (error) {
        console.error(error);
      }
    };
    fetchProfiles();
  }, [refetchUsers]);

  function fetchUsers() {
    setRefetchUsers(!refetchUsers);
  }

  const handleDelete = async () => {
    if (currentUser.is_admin) {
      await supabase.from("profiles").delete().in("id", selectedUsers);
      setShow(true);
      fetchUsers();
    }
  };

  const handleBlock = async () => {
    if (currentUser.is_admin) {
      const { error } = await supabase
        .from("profiles")
        .update({ is_blocked: true })
        .in("id", selectedUsers);
      fetchUsers();
      error && console.error(error);
    }
  };

  const handleUnblock = async () => {
    if (currentUser.is_admin) {
      const { error } = await supabase
        .from("profiles")
        .update({ is_blocked: false })
        .in("id", selectedUsers);
      fetchUsers();
      error && console.error(error);
    }
  };

  const handleMakeUser = async () => {
    if (currentUser.is_admin) {
      const { error } = await supabase
        .from("profiles")
        .update({ is_admin: false })
        .in("id", selectedUsers);
      fetchUsers();
      error && console.error(error);
    }
  };

  const handleMakeAdmin = async () => {
    if (currentUser.is_admin) {
      const { error } = await supabase
        .from("profiles")
        .update({ is_admin: true })
        .in("id", selectedUsers);
      fetchUsers();
      error && console.error(error);
    }
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
      {show && (
        <DismissibleAlert data={alert.adminPanel.deleted} setShow={setShow} />
      )}
      <Row className="pb-3">
        <Col>
          <Controllers
            onDelete={handleDelete}
            onBlock={handleBlock}
            onUnblock={handleUnblock}
            onFilterChange={handleFilterChange}
            handleMakeUser={handleMakeUser}
            handleMakeAdmin={handleMakeAdmin}
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
                <th className="bg-danger">{t("admin_panel.tab.created_at")}</th>
                <th className="bg-danger">{t("admin_panel.tab.is_admin")}</th>
              </tr>
            </thead>
            <tbody>
              {filteredUsers.map((user) => (
                <UserPanel
                  key={user.id}
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
