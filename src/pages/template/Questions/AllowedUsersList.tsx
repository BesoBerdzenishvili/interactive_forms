import { Button, Form, InputGroup, Stack } from "react-bootstrap";
import AllowedUsers from "./AllowedUsers";
import { useTranslation } from "react-i18next";
import { useEffect, useState } from "react";
import supabase from "../../../config/supabase";
import { User } from "../../../types/types";
import DismissibleAlert from "../../../components/Alert";
import alert from "../../../utils/alertMessages";

interface AllowedUsersListProps {
  whoCanFill: string[];
  handleInputChange: (name: string, value: string[]) => void;
}

export default function AllowedUsersList({
  whoCanFill,
  handleInputChange,
}: AllowedUsersListProps) {
  const [users, setUsers] = useState<User[]>([]);
  const [show, setShow] = useState(false);
  const [message, setMessage] = useState({
    color: "",
    heading: "",
    text: "",
  });
  const [newUserName, setNewUserName] = useState("");
  const [newUserEmail, setNewUserEmail] = useState("");
  const { t } = useTranslation();

  useEffect(() => {
    const fetchProfiles = async () => {
      const { data, error } = await supabase.from("profiles").select();
      if (error) {
        console.log(error);
      }
      if (data) {
        setUsers(data);
      }
    };
    fetchProfiles();
  }, []);

  // this isn't displaying list because userid's wrong datatype
  const usersList = users.filter((user) => whoCanFill.includes(user.id));

  const addUser = () => {
    const newUser = users.filter((i) => i.email === newUserEmail)[0];
    setNewUserName("");
    setNewUserEmail("");
    if (!newUser) {
      setShow(true);
      setMessage(alert.allowedUsers.userNotFound);
      return;
    }
    if (whoCanFill.includes(newUser.id)) {
      setShow(true);
      setMessage(alert.allowedUsers.alreadyInList);
      return;
    }
    if (newUser.is_admin) {
      setShow(true);
      setMessage(alert.allowedUsers.adminAccesses);
      return;
    }
    handleInputChange("who_can_fill", [...whoCanFill, newUser.id]);
    setShow(true);
    setMessage(alert.allowedUsers.userCreated);
  };

  const removeUser = (id: string) => {
    handleInputChange("who_can_fill", [...whoCanFill.filter((i) => i !== id)]);
  };

  return (
    <div>
      {/* Users Table */}
      {show && <DismissibleAlert data={message} setShow={setShow} />}

      <AllowedUsers removeUser={removeUser} users={usersList} />

      {/* Add User */}
      <Form.Group className="mb-3 w-sm-25">
        <h5>{t("template.questions.allowed_users.who_can_fill")}:</h5>
        <InputGroup>
          <Stack direction="vertical" gap={2}>
            <Form.Control
              type="text"
              placeholder={t(
                "template.questions.allowed_users.name_placeholder"
              )}
              value={newUserName}
              onChange={(e) => setNewUserName(e.target.value)}
            />
            <Form.Control
              // make sure this checks email format
              type="email"
              placeholder={t(
                "template.questions.allowed_users.email_placeholder"
              )}
              value={newUserEmail}
              onChange={(e) => setNewUserEmail(e.target.value)}
            />
          </Stack>
          <Button onClick={addUser}>
            <i className="bi bi-person-plus"></i>
          </Button>
        </InputGroup>
      </Form.Group>
    </div>
  );
}
