import React from "react";
import { Button, Form, InputGroup } from "react-bootstrap";
import { FaCheck } from "react-icons/fa";

const AddLang = ({ lang, onChange, onAdd }) => {
  const hasSpecialChars = (string) => {
    const specialChars = /[ `!@#$%^&*()_+\-=\[\]{};':"\\|,.<>\/?~]/;
    return specialChars.test(string);
  };

  const hasNumber = (myString) => {
    return /\d/.test(myString);
  };

  const validateLang = () => {
    if (lang.length > 3) {
      return hasNumber(lang) || hasSpecialChars(lang);
    } else {
      return true;
    }
  };

  const keyAdd = (event) => {
    if (event.key === "Enter" || event.key === " " || event.key === ",") {
      onAdd();
    }
  };

  return (
    <Form.Group className="mb-1 border rounded bg-dark bg-opacity-10 p-3">
      <InputGroup>
        <Form.Control
          type="text"
          value={lang}
          onChange={onChange}
          onKeyDown={keyAdd}
          placeholder="Add language here"
        />
        {validateLang() === false ? (
          <Button onClick={onAdd}>Add Language</Button>
        ) : null}
      </InputGroup>
      <Form.Text>
        {validateLang() === true ? (
          <span>Language cant contain special characters or numbers</span>
        ) : (
          <span>
            <span className="text-success">
              <FaCheck /> Valid Text
            </span>
            <span> - You can press "Enter" to add your language</span>
          </span>
        )}
      </Form.Text>
    </Form.Group>
  );
};

export default AddLang;
