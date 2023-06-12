import React from "react";
import { Form } from "react-bootstrap";
import Button from "react-bootstrap/Button";
import Modal from "react-bootstrap/Modal";
import Swal from "sweetalert2";

const EditUserModal = (props) => {
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
        lastName: props.edit_last_name,
        firstName: props.edit_first_name,
        address: props.edit_address,
        city: props.edit_city,
        emailAddress: props.edit_email_address,
        password: props.edit_password,
        number: props.edit_number,
      }),
    }).then((res) => res.json());

    if (newData.res[0]) {
      Swal.fire({ icon: "success", title: "User Updated" });
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
              value={props.edit_first_name}
              onChange={(e) => props.set__edit_first_name(e.target.value)}
            />
          </Form.Group>
          <Form.Group className="mb-3">
            <Form.Label>Last Name</Form.Label>
            <Form.Control
              type="text"
              placeholder="Last Name"
              name="lastName"
              value={props.edit_last_name}
              onChange={(e) => props.set__edit_last_name(e.target.value)}
            />
          </Form.Group>
          <Form.Group className="mb-3">
            <Form.Label>Email address</Form.Label>
            <Form.Control
              type="email"
              placeholder="name@example.com"
              name="emailAddress"
              value={props.edit_email_address}
              onChange={(e) => props.set__edit_email_address(e.target.value)}
            />
          </Form.Group>
          <Form.Group className="mb-3">
            <Form.Label>Password</Form.Label>
            <Form.Control
              type="text"
              placeholder="Password"
              name="password"
              value={props.edit_password}
              onChange={(e) => props.set__edit_password(e.target.value)}
            />
          </Form.Group>
          <Form.Group className="mb-3">
            <Form.Label>Number</Form.Label>
            <Form.Control
              type="number"
              placeholder="Number"
              name="number"
              value={props.edit_number}
              onChange={(e) => props.set__edit_number(e.target.value)}
            />
          </Form.Group>
          <Form.Group className="mb-3">
            <Form.Label>Address</Form.Label>
            <Form.Control
              type="text"
              placeholder="Address"
              name="address"
              value={props.edit_address}
              onChange={(e) => props.set__edit_address(e.target.value)}
            />
          </Form.Group>
          <Form.Group className="mb-3">
            <Form.Label>City</Form.Label>
            <Form.Control
              type="text"
              placeholder="City"
              name="city"
              value={props.edit_city}
              onChange={(e) => props.set__edit_city(e.target.value)}
            />
          </Form.Group>
          <Button
            name="updateID"
            value={props.edit_person_id}
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
