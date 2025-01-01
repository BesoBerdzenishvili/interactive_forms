import React, {
  useState,
  ChangeEvent,
  Dispatch,
  SetStateAction,
  useEffect,
  useContext,
  useRef,
} from "react";
import { Form, Dropdown } from "react-bootstrap";
import { DarkModeContext } from "../contexts/dark_mode/DarkModeContext";
import { useTranslation } from "react-i18next";

interface EditableAnswerProps {
  hasAccess: boolean;
  value: string;
  setValue: Dispatch<SetStateAction<string>>;
  check?: boolean;
  onSave: (text: string) => void;
}

const EditableAnswer: React.FC<EditableAnswerProps> = ({
  hasAccess,
  value,
  setValue,
  check,
  onSave,
}) => {
  const [isEditing, setIsEditing] = useState<boolean>(false);
  const [editableValue, setEditableValue] = useState<string>(value);
  const [dropdownOpen, setDropdownOpen] = useState<boolean>(false);
  const { darkMode } = useContext(DarkModeContext);
  const { t } = useTranslation();

  const dropdownRef = useRef<HTMLDivElement>(null);

  useEffect(() => {
    setEditableValue(value);
  }, [value]);

  const handleEdit = () => {
    if (hasAccess) {
      setIsEditing(true);
      setDropdownOpen(true);
    }
  };

  const handleSave = () => {
    onSave(value);
    setIsEditing(false);
    setDropdownOpen(false);
  };

  const handleInputChange = (e: ChangeEvent<HTMLInputElement>) => {
    setEditableValue(e.target.value);
    setValue(e.target.value);
  };

  const handleDropdownSelect = (selected: string | null) => {
    if (selected !== null) {
      const answer = selected === "true" ? "true" : "false";
      setValue(answer);
      onSave(answer);
    }
    setIsEditing(false);
    setDropdownOpen(false);
  };

  useEffect(() => {
    const handleClickOutside = (event: MouseEvent) => {
      if (
        dropdownOpen &&
        dropdownRef.current &&
        !dropdownRef.current.contains(event.target as Node)
      ) {
        setDropdownOpen(false);
        setIsEditing(false);
      }
    };

    document.addEventListener("mousedown", handleClickOutside);
    return () => {
      document.removeEventListener("mousedown", handleClickOutside);
    };
  }, [dropdownOpen]);

  const yes = t("user_form.answers.yes");
  const no = t("user_form.answers.no");

  if (isEditing) {
    if (check) {
      return (
        <Dropdown onSelect={handleDropdownSelect} ref={dropdownRef}>
          <Dropdown.Toggle variant={darkMode ? "dark" : "light"}>
            {value === "true" ? yes : no}
          </Dropdown.Toggle>
          <Dropdown.Menu>
            <Dropdown.Item eventKey="true">{yes}</Dropdown.Item>
            <Dropdown.Item eventKey="false">{no}</Dropdown.Item>
          </Dropdown.Menu>
        </Dropdown>
      );
    } else {
      return (
        <Form.Control
          type="text"
          value={editableValue}
          onChange={handleInputChange}
          onBlur={handleSave}
          autoFocus
        />
      );
    }
  } else {
    return (
      <i onDoubleClick={handleEdit}>
        {check ? (value === "true" ? yes : no) : value}
      </i>
    );
  }
};

export default EditableAnswer;
