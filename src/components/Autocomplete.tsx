import React, { useEffect, useState } from "react";
import { FormControl, InputGroup, Dropdown } from "react-bootstrap";

interface AutocompleteProps {
  options: string[];
  initialValue: string;
  setInitialValue: (value: string) => void;
  placeholder?: string;
}

const Autocomplete: React.FC<AutocompleteProps> = ({
  options,
  initialValue,
  setInitialValue,
  placeholder,
}) => {
  const [inputValue, setInputValue] = useState(initialValue);
  const [filteredOptions, setFilteredOptions] = useState<string[]>([]);
  const [isDropdownOpen, setIsDropdownOpen] = useState(false);

  useEffect(() => {
    setInputValue(initialValue);
  }, [initialValue]);

  const handleInputChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    const value = e.target.value;
    setInputValue(value);
    setInitialValue(value);

    if (value.trim() === "") {
      setFilteredOptions([]);
      setIsDropdownOpen(false);
    } else {
      const matches = options.filter((option) =>
        option.toLowerCase().includes(value.toLowerCase())
      );
      setFilteredOptions(matches);
      setIsDropdownOpen(matches.length > 0);
    }
  };

  const handleOptionSelect = (value: string) => {
    setInputValue(value);
    setInitialValue(value);
    setIsDropdownOpen(false);
  };

  const handleInputBlur = () => {
    setTimeout(() => setIsDropdownOpen(false), 100);
  };

  const handleInputFocus = () => {
    if (filteredOptions.length > 0) {
      setIsDropdownOpen(true);
    }
  };

  return (
    <InputGroup>
      <FormControl
        type="text"
        value={inputValue}
        onChange={handleInputChange}
        onBlur={handleInputBlur}
        onFocus={handleInputFocus}
        placeholder={placeholder ? placeholder : "Text here..."}
      />
      {isDropdownOpen && (
        <Dropdown.Menu show className="position-absolute top-100 w-100">
          {filteredOptions.map((option, index) => (
            <Dropdown.Item
              className="hoverable"
              key={index}
              onMouseDown={() => handleOptionSelect(option)}
            >
              {option}
            </Dropdown.Item>
          ))}
        </Dropdown.Menu>
      )}
    </InputGroup>
  );
};

export default Autocomplete;
