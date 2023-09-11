import React from "react";
import { Button, Form } from "react-bootstrap";
import { FaCheck } from "react-icons/fa";
import { validate } from "uuid";

const AddLang = ({ lang, onChange, onAdd }) => {
  const hasSpecialChars = (string) => {
    const specialChars = /[ `!@#$%^&*()_+\-=\[\]{};':"\\|,.<>\/?~]/;
    return specialChars.test(string);
  };

  const hasNumber = (myString) => {
    return /\d/.test(myString);
  };

  const validateLang = () => {
    console.log("lang", lang.length);
    if (lang.length > 3) {
      return hasNumber(lang) || hasSpecialChars(lang);
    } else {
      return true;
    }
  };

  console.log("validateLang", validateLang());

  return (
    <Form.Group className="mb-1 border rounded bg-dark bg-opacity-10 p-3">
      <Form.Control
        type="text"
        value={lang}
        onChange={onChange}
        placeholder="Add language here"
      />
      <Form.Text>
        {validateLang() === true ? (
          <span>Language cant contain special characters or numbers</span>
        ) : (
          <span className="text-success">
            <FaCheck /> Valid Text
          </span>
        )}
      </Form.Text>
      {validateLang() === false ? (
        <div className="mt-2">
          <Button onClick={onAdd}>Add Email</Button>
        </div>
      ) : null}
    </Form.Group>
  );
};

export default AddLang;
