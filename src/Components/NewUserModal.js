import React, { useEffect, useState } from "react";
import { Form } from "react-bootstrap";
import Button from "react-bootstrap/Button";
import Modal from "react-bootstrap/Modal";
import Swal from "sweetalert2";
import moment from "moment";
import { FaAsterisk, FaCheck, FaTimes } from "react-icons/fa";

const NewUserModal = (props) => {
  const [firstName, setFirstName] = useState("");
  const [lastName, setLastName] = useState("");
  const [emailAddress, setEmailAddress] = useState("");
  const [password, setPassword] = useState("");
  const [number, setNumber] = useState("");
  const [address, setAddress] = useState("");
  const [city, setCity] = useState("");

  const shortName = firstName.slice(0, 3);
  const shortSurname = lastName.slice(0, 3);
  const users = shortName + shortSurname + moment().format("x");

  const clearForm = () => {
    setFirstName("");
    setLastName("");
    setEmailAddress("");
    setPassword("");
    setNumber("");
    setAddress("");
    setCity("");
  };

  const addUser = async () => {
    const newData = await fetch(`/addUser`, {
      method: "POST",
      headers: {
        "Content-Type": "application/json",
        Accept: "application/json",
      },
      body: JSON.stringify({
        id: firstName.slice(0, 3) + lastName.slice(0, 3) + moment().format("x"),
        lastName: lastName,
        firstName: firstName,
        address: address,
        city: city,
        emailAddress: emailAddress,
        password: password,
        number: number,
      }),
    }).then((res) => res.json());

    if (newData.res[0]) {
      Swal.fire({ icon: "success", title: "User Added" });
      clearForm();
      props.onHide();
      props.fetchdata();
    }
  };

  const hasSpecialChars = (string) => {
    const specialChars = /[ `!@#$%^&*()_+\-=\[\]{};':"\\|,.<>\/?~]/;
    return specialChars.test(string);
  };

  const hasNumber = (myString) => {
    return /\d/.test(myString);
  };

  return (
    <Modal
      {...props}
      size="lg"
      aria-labelledby="contained-modal-title-vcenter"
      centered
    >
      <Modal.Header closeButton>
        <Modal.Title id="contained-modal-title-vcenter">New User</Modal.Title>
      </Modal.Header>
      <Modal.Body>
        <Form>
          <Form.Group className="mb-3">
            <Form.Label>First Name</Form.Label>
            <Form.Control
              type="text"
              placeholder="First Name"
              name="firstName"
              value={firstName}
              onChange={(e) => setFirstName(e.target.value)}
            />
            <Form.Text>
              {firstName.length > 0 &&
              !hasSpecialChars(firstName) &&
              !hasNumber(firstName) ? (
                <span className="text-success">
                  <FaCheck /> Name is valid
                </span>
              ) : null}
              {hasSpecialChars(firstName) ||
              hasNumber(firstName) ||
              firstName.length === 0 ? (
                <span>
                  <span>Name is not Valid: </span>
                  {firstName.length === 0 ? (
                    <span className="text-danger">Required</span>
                  ) : null}
                  {hasSpecialChars(firstName) ? (
                    <span className="text-danger">
                      <FaTimes /> No Special Characters{" "}
                    </span>
                  ) : null}
                  {hasNumber(firstName) ? (
                    <span className="text-danger">
                      <FaTimes /> No Numbers
                    </span>
                  ) : null}
                </span>
              ) : null}
            </Form.Text>
          </Form.Group>
          <Form.Group className="mb-3">
            <Form.Label>Last Name</Form.Label>
            <Form.Control
              type="text"
              placeholder="Last Name"
              name="lastName"
              value={lastName}
              onChange={(e) => setLastName(e.target.value)}
            />
            <Form.Text>
              <span className="text-success">
                <FaCheck /> Last Name is valid
              </span>
              <span>
                <span>Name is not Valid: </span>
                {hasSpecialChars(lastName) ? (
                  <span className="text-danger">
                    <FaTimes /> No Special Characters{" "}
                  </span>
                ) : null}
                {hasNumber(lastName) ? (
                  <span className="text-danger">
                    <FaTimes /> No Numbers
                  </span>
                ) : null}
              </span>
            </Form.Text>
          </Form.Group>
          <Form.Group className="mb-3">
            <Form.Label>Email address</Form.Label>
            <Form.Control
              type="email"
              placeholder="name@example.com"
              name="emailAddress"
              value={emailAddress}
              onChange={(e) => setEmailAddress(e.target.value)}
            />
            <Form.Text>
              <span className="text-success">
                <FaCheck /> Email Address is valid{" "}
              </span>
              <span className="text-danger">
                <FaTimes /> Email Address is not valid
              </span>
            </Form.Text>
          </Form.Group>
          <Form.Group className="mb-3">
            <Form.Label>Password</Form.Label>
            <Form.Control
              type="text"
              placeholder="Password"
              name="password"
              value={password}
              onChange={(e) => setPassword(e.target.value)}
            />
            <Form.Text>
              <span className="text-success">
                <FaCheck /> Password is valid
              </span>
              <span>
                Password needs:{" "}
                <span className="text-info">
                  <FaAsterisk /> 1 Capital Letter{" "}
                </span>
                <span className="text-info">
                  <FaAsterisk /> 1 Symbol{" "}
                </span>
                <span className="text-info">
                  <FaAsterisk /> 10 Characters long
                </span>
              </span>{" "}
            </Form.Text>
          </Form.Group>
          <Form.Group className="mb-3">
            <Form.Label>Number</Form.Label>
            <Form.Control
              type="number"
              placeholder="Number"
              name="number"
              value={number}
              onChange={(e) => setNumber(e.target.value)}
            />
            <Form.Text>
              {number.length === 10 ? (
                <span className="text-success">
                  <FaCheck /> Number is valid
                </span>
              ) : null}
              {number.length < 10 ? (
                <span>
                  Number is not valid:{" "}
                  <span className="text-info">
                    <FaAsterisk />
                    10 Characters long
                  </span>{" "}
                  <span className="text-danger">
                    <FaTimes /> No Letters & Symbols
                  </span>
                </span>
              ) : null}
            </Form.Text>
          </Form.Group>
          <Form.Group className="mb-3">
            <Form.Label>Address</Form.Label>
            <Form.Control
              type="text"
              placeholder="Address"
              name="address"
              value={address}
              onChange={(e) => setAddress(e.target.value)}
            />
            {address.length === 0 ? (
              <Form.Text className="text-danger">Address is Required</Form.Text>
            ) : null}
          </Form.Group>
          <Form.Group className="mb-3">
            <Form.Label>City</Form.Label>
            <Form.Control
              type="text"
              placeholder="City"
              name="city"
              value={city}
              onChange={(e) => setCity(e.target.value)}
            />
            <Form.Text>
              <span className="text-success">
                <FaCheck /> City is valid
              </span>
              <span>
                City is not valid:{" "}
                {hasSpecialChars(city) ? (
                  <span className="text-danger">
                    <FaTimes /> No Special Characters{" "}
                  </span>
                ) : null}
                {hasNumber(city) ? (
                  <span className="text-danger">
                    <FaTimes /> No Numbers{" "}
                  </span>
                ) : null}
              </span>
            </Form.Text>
          </Form.Group>
          <Button onClick={addUser}>Add New User</Button>
        </Form>
      </Modal.Body>
      <Modal.Footer>
        <Button variant="secondary" onClick={props.onHide}>
          Close
        </Button>
      </Modal.Footer>
    </Modal>
  );
};

export default NewUserModal;
