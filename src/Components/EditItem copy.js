import React, { useEffect, useState } from "react";
import { Button, Form } from "react-bootstrap";
import { FaAsterisk, FaCheck, FaTimes } from "react-icons/fa";

const EditItem = ({ item, list, setList, handleUpdate }) => {
  const [alt, setAlt] = useState("");
  const validateEmail = (email) => {
    return String(email)
      .toLowerCase()
      .match(
        /^(([^<>()[\]\\.,;:\s@"]+(\.[^<>()[\]\\.,;:\s@"]+)*)|.(".+"))@((\[[0-9]{1,3}\.[0-9]{1,3}\.[0-9]{1,3}\.[0-9]{1,3}\])|(([a-zA-Z\-0-9]+\.)+[a-zA-Z]{2,}))$/
      );
  };

  const handleInput = (e) => {
    const newList = Array.from(list).map((li) =>
      li.id === item.id ? { ...li, [e.target.name]: e.target.value } : li
    );
    setList(newList);
  };

  useEffect(() => {
    console.log(alt);
  }, [alt]);

  return (
    <Form.Group className="mb-3 p-3 bg-primary bg-opacity-10">
      <Form.Control
        type="email"
        placeholder="name@example.com"
        name="altEmail"
        defaultValue={item.AltEmail}
        // onChange={handleInput}
        className="shadow-sm"
        onChange={(e) => setAlt(e.target.value)}
      />
      <div className="d-flex flex-wrap gap-2 mt-2">
        {validateEmail(item.AltEmail) ? (
          <Button variant="success" onClick={handleUpdate}>
            Update
          </Button>
        ) : null}
        <Form.Text>
          {validateEmail(item.AltEmail) ? (
            <span className="text-success">
              <FaCheck /> Email Address is valid{" "}
            </span>
          ) : null}
          {item.AltEmail.length === 0 ? (
            <span className="text-danger">
              <FaAsterisk /> Required{" "}
            </span>
          ) : null}
          {item.AltEmail.length > 0 && !validateEmail(item.AltEmail) ? (
            <span className="text-danger">
              <FaTimes /> Email Address is not valid
            </span>
          ) : null}
        </Form.Text>
      </div>
    </Form.Group>
  );
};

export default EditItem;
