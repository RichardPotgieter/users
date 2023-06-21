import React, { useState } from "react";
import { Form } from "react-bootstrap";
import Button from "react-bootstrap/Button";
import Modal from "react-bootstrap/Modal";
import Swal from "sweetalert2";
import moment from "moment";

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
