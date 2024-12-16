import { useState } from "react";
import { Dropdown } from "react-bootstrap";
import i18n from "i18next";

const LANGUAGE_OPTIONS = [
  { code: "en", label: "EN" },
  { code: "ka", label: "GEO" },
];

const LanguageSwitch: React.FC = () => {
  const [selectedLanguage, setSelectedLanguage] = useState<string>(
    localStorage.getItem("language") || "en"
  );

  const handleLanguageChange = (lang: string) => {
    localStorage.setItem("language", lang);
    setSelectedLanguage(lang);
    i18n.changeLanguage(lang);
  };

  return (
    <Dropdown>
      <Dropdown.Toggle variant="secondary">
        {LANGUAGE_OPTIONS.find((option) => option.code === selectedLanguage)
          ?.label || "Select Language"}
      </Dropdown.Toggle>

      <Dropdown.Menu>
        {LANGUAGE_OPTIONS.map((option) => (
          <Dropdown.Item
            key={option.code}
            onClick={() => handleLanguageChange(option.code)}
          >
            {option.label}
          </Dropdown.Item>
        ))}
      </Dropdown.Menu>
    </Dropdown>
  );
};

export default LanguageSwitch;
