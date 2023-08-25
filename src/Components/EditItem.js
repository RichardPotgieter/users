import React, { useEffect, useState } from "react";

import { Button, Form } from "react-bootstrap";
import { FaAsterisk, FaCheck, FaTimes } from "react-icons/fa";
import NewUserModal from "./NewUserModal";
import AltEmailsModal from "./AltEmailsModal";

const EditItem = ({ item, list, setList, handleUpdate, component }) => {
  const [emailInput, setEmailInput] = useState(item.AltEmail);
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

  const handleUpdateModal = async (id, email) => {
    const newData = await fetch(`changeAltEmail`, {
      method: "POST",
      headers: {
        "Content-Type": "application/json",
        Accept: "application/json",
      },
      body: JSON.stringify({
        id: id,
        email: email,
      }),
    }).then((res) => res.json());

    handleUpdate();
  };

  // useEffect(() => {}, [alt]);

  return (
    <Form.Group className="mb-3 p-3 bg-primary bg-opacity-10">
      <Form.Control
        type="email"
        placeholder="name@example.com"
        name="altEmail"
        defaultValue={component === "NewUserModal" ? item.altEmail : emailInput}
        onChange={
          component === "NewUserModal"
            ? handleInput
            : (e) => setEmailInput(e.target.value)
        }
        className="shadow-sm"
      />
      <div className="d-flex flex-wrap gap-2 mt-2">
        {validateEmail(
          component === "NewUserModal" ? item.altEmail : emailInput
        ) ? (
          <Button
            variant="success"
            onClick={
              component === "NewUserModal"
                ? handleUpdate
                : () => handleUpdateModal(item.EmailID, emailInput)
            }
          >
            Update
          </Button>
        ) : null}
        <Form.Text>
          {validateEmail(
            component === "NewUserModal" ? item.altEmail : emailInput
          ) ? (
            <span className="text-success">
              <FaCheck /> Email Address is valid{" "}
            </span>
          ) : null}

          {component === "NewUserModal" && item.altEmail.length === 0 ? (
            <span className="text-danger">
              <FaAsterisk /> Required{" "}
            </span>
          ) : null}

          {component === "AltEmailsModal" && emailInput.length === 0 ? (
            <span className="text-danger">
              <FaAsterisk /> Required{" "}
            </span>
          ) : null}

          {component === "NewUserModal" &&
          item.altEmail.length > 0 &&
          !validateEmail(item.altEmail) ? (
            <span className="text-danger">
              <FaTimes /> Email Address is not valid
            </span>
          ) : null}

          {component === "AltEmailsModal" &&
          item.AltEmail.length > 0 &&
          !validateEmail(emailInput) ? (
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
