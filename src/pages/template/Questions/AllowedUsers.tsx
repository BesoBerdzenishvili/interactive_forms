import { Button, Form, InputGroup, Stack } from "react-bootstrap";
import AllowedUsersList from "./AllowedUsersList";
import { useTranslation } from "react-i18next";
import { useEffect, useState } from "react";
import supabase from "../../../config/supabase";
import { User } from "../../../types/types";
import DismissibleAlert from "../../../components/Alert";
import alert from "../../../utils/alertMessages";
import Autocomplete from "../../../components/Autocomplete";

interface AllowedUsersProps {
  whoCanFill: number[];
  handleInputChange: (name: string, value: number[]) => void;
}

export default function AllowedUsers({
  whoCanFill,
  handleInputChange,
}: AllowedUsersProps) {
  const [users, setUsers] = useState<User[]>([]);
  const [show, setShow] = useState(false);
  const [orderBy, setOrderBy] = useState("name");
  const [asc, setAsc] = useState(false);
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
      const { data, error } = await supabase
        .from("profiles")
        .select()
        .order(orderBy, { ascending: asc });
      if (error) {
        console.log(error);
      }
      if (data) {
        setUsers(data);
      }
    };
    fetchProfiles();
  }, [orderBy, asc]);

  const usersList = users.filter((user) => whoCanFill.includes(user.id));

  useEffect(() => {
    const matchingUser = users.find((user) => user.name === newUserName);
    if (matchingUser) {
      setNewUserEmail(matchingUser.email);
    } else if (newUserName === "") {
      setNewUserEmail("");
    }
  }, [newUserName]);

  useEffect(() => {
    const matchingUser = users.find((user) => user.email === newUserEmail);
    if (matchingUser) {
      setNewUserName(matchingUser.name);
    } else if (newUserEmail === "") {
      setNewUserName("");
    }
  }, [newUserEmail]);

  const addUser = () => {
    const newUser = users.find((i) => i.email === newUserEmail);
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
    setNewUserName("");
    setNewUserEmail("");
    handleInputChange("who_can_fill", [...whoCanFill, newUser.id]);
    setShow(true);
    setMessage(alert.allowedUsers.userCreated);
  };

  const removeUser = (id: number) => {
    handleInputChange("who_can_fill", [...whoCanFill.filter((i) => i !== id)]);
  };

  const nameOptions = [...new Set(users.map((i) => i.name))];
  const emailOptions = [...new Set(users.map((i) => i.email))];

  return (
    <div>
      {show && <DismissibleAlert data={message} setShow={setShow} />}

      <AllowedUsersList
        asc={asc}
        setAsc={setAsc}
        orderBy={orderBy}
        setOrderBy={setOrderBy}
        removeUser={removeUser}
        users={usersList}
      />

      <Form.Group className="mb-3 w-sm-25">
        <h5>{t("template.questions.allowed_users.who_can_fill")}:</h5>
        <InputGroup>
          <Stack direction="vertical" gap={2}>
            <Autocomplete
              initialValue={newUserName}
              setInitialValue={setNewUserName}
              options={nameOptions}
              placeholder={t(
                "template.questions.allowed_users.name_placeholder"
              )}
            />
            <Autocomplete
              initialValue={newUserEmail}
              setInitialValue={setNewUserEmail}
              options={emailOptions}
              placeholder={t(
                "template.questions.allowed_users.email_placeholder"
              )}
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
