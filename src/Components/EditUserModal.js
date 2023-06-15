import React, { useState } from "react";
import { Form } from "react-bootstrap";
import Button from "react-bootstrap/Button";
import Modal from "react-bootstrap/Modal";
import Swal from "sweetalert2";

const EditUserModal = (props) => {
  const [returnedData, setReturnedData] = useState([`Hi There`]);

  const [editFirstName, setEditFirstName] = useState("");
  const [editLastName, setEditLastName] = useState("");
  const [editEmailAddress, setEditEmailAddress] = useState("");
  const [editPassword, setEditPassword] = useState("");
  const [editNumber, setEditNumber] = useState("");
  const [editAddress, setEditAddress] = useState("");
  const [editCity, setEditCity] = useState("");

  const user = props.userinfo[0];

  const fetchData = async () => {
    const newData = await fetch("/get", {
      method: "GET",
      headers: {
        "Content-Type": "application/json",
        Accept: "application/json",
      },
    }).then((res) => res.json());

    setReturnedData(newData);
  };

  const updateUser = async (event) => {
    const updateID = event.target.value;
    const newData = await fetch(`/updateUser`, {
      method: "POST",
      headers: {
        "Content-Type": "application/json",
        Accept: "application/json",
      },
      body: JSON.stringify({
        id: updateID,
        lastName: editLastName,
        firstName: editFirstName,
        address: editAddress,
        city: editCity,
        emailAddress: editEmailAddress,
        password: editPassword,
        number: editNumber,
      }),
    }).then((res) => res.json());

    if (newData.res[0]) {
      Swal.fire({ icon: "success", title: "User Updated" });
      props.onHide();
      fetchData();
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
        <Modal.Title id="contained-modal-title-vcenter">Edit User</Modal.Title>
      </Modal.Header>
      <Modal.Body>
        <Form>
          <Form.Group className="mb-3">
            <Form.Label>First Name</Form.Label>
            <Form.Control
              type="text"
              placeholder="First Name"
              name="firstName"
              defaultValue={user ? user.FirstName : ""}
              onChange={(e) => setEditFirstName(e.target.value)}
            />
          </Form.Group>
          <Form.Group className="mb-3">
            <Form.Label>Last Name</Form.Label>
            <Form.Control
              type="text"
              placeholder="Last Name"
              name="lastName"
              defaultValue={user ? user.LastName : ""}
              onChange={(e) => setEditLastName(e.target.value)}
            />
          </Form.Group>
          <Form.Group className="mb-3">
            <Form.Label>Email address</Form.Label>
            <Form.Control
              type="email"
              placeholder="name@example.com"
              name="emailAddress"
              defaultValue={user ? user.EmailAddress : ""}
              onChange={(e) => setEditEmailAddress(e.target.value)}
            />
          </Form.Group>
          <Form.Group className="mb-3">
            <Form.Label>Password</Form.Label>
            <Form.Control
              type="text"
              placeholder="Password"
              name="password"
              defaultValue={user ? user.Password : ""}
              onChange={(e) => setEditPassword(e.target.value)}
            />
          </Form.Group>
          <Form.Group className="mb-3">
            <Form.Label>Number</Form.Label>
            <Form.Control
              type="number"
              placeholder="Number"
              name="number"
              defaultValue={user ? `0${user.Number}` : ""}
              onChange={(e) => setEditNumber(e.target.value)}
            />
          </Form.Group>
          <Form.Group className="mb-3">
            <Form.Label>Address</Form.Label>
            <Form.Control
              type="text"
              placeholder="Address"
              name="address"
              defaultValue={user ? user.Address : ""}
              onChange={(e) => setEditAddress(e.target.value)}
            />
          </Form.Group>
          <Form.Group className="mb-3">
            <Form.Label>City</Form.Label>
            <Form.Control
              type="text"
              placeholder="City"
              name="city"
              defaultValue={user ? user.City : ""}
              onChange={(e) => setEditCity(e.target.value)}
            />
          </Form.Group>
          <Button
            name="updateID"
            value={user ? user.PersonID : ""}
            onClick={updateUser}
          >
            Update User
          </Button>
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

export default EditUserModal;
