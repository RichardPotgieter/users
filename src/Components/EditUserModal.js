import React, { useEffect, useState } from "react";
import { Form } from "react-bootstrap";
import Button from "react-bootstrap/Button";
import Modal from "react-bootstrap/Modal";
import Swal from "sweetalert2";
import FetchAltEmails from "./FetchAltEmails";
import AddNewAltEmails from "./AddNewAltEmails";
const _ = require("lodash");

const EditUserModal = (props) => {
  const [editFirstName, setEditFirstName] = useState("");
  const [editLastName, setEditLastName] = useState("");
  const [editEmailAddress, setEditEmailAddress] = useState("");
  const [editPassword, setEditPassword] = useState("");
  const [editNumber, setEditNumber] = useState("");
  const [editAddress, setEditAddress] = useState("");
  const [editCity, setEditCity] = useState("");
  const [updateAlt, setUpdateAlt] = useState(false);
  const [list, setList] = useState([[]]);
  const [userId, setUserId] = useState("");
  const [altEmails, setAltEmails] = useState("");

  const handleUpdateAlt = (obj) => {
    let newAlt = [];
    obj.forEach(function (item, index) {
      const EmailIdNo = userId + (index + 1);
      newAlt.push({
        id: userId,
        email: item.altEmail,
        emailId: EmailIdNo,
      });
    });

    setAltEmails(newAlt);
  };

  const user = props.userinfo[0];

  useEffect(() => {
    if (user !== undefined) {
      setEditFirstName(user.FirstName);
      setEditLastName(user.LastName);
      setEditEmailAddress(user.EmailAddress);
      setEditPassword(user.Password);
      setEditNumber(user.Number);
      setEditAddress(user.Address);
      setEditCity(user.City);
    }
  }, [user]);

  let personCode = props.user_alt_emails;
  let altdata = props.altdata;
  let AltEmailsList = _.filter(altdata, ["PersonID", personCode]);

  useEffect(() => {
    const updateUserData = async () => {
      const updateID = personCode;
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
          altEmails:
            altEmails !== undefined && altEmails.length > 0 ? altEmails : "",
          altEmailsCount:
            altEmails !== undefined && altEmails.length > 0
              ? altEmails.length
              : 0,
        }),
      }).then((res) => res.json());

      if (newData.res[0]) {
        Swal.fire({ icon: "success", title: "User Updated" });
        props.onClick();
        props.onHide();
      }
    };
    if (updateAlt) {
      if (altEmails !== undefined || AltEmailsList !== undefined) {
        if (altEmails.length > 0 || AltEmailsList.length > 0) {
          updateUserData();
        }
      }
    }
  }, [personCode, altEmails, AltEmailsList]);

  const updateUser = () => {
    setUserId(personCode);
    setUpdateAlt(true);
  };

  React.useEffect(() => {
    // console.log("EditUserModal List", list);
    // console.log("user", user);
  }, [list]);

  React.useEffect(() => {
    // console.log("EditUserModal List", list);
    // console.log("user", user);
  }, []);

  return (
    <Modal
      {...props}
      size="lg"
      aria-labelledby="contained-modal-title-vcenter"
      centered
    >
      <Modal.Header closeButton>
        <Modal.Title id="contained-modal-title-vcenter">
          Edit User - {personCode}
        </Modal.Title>
      </Modal.Header>
      <Modal.Body>
        {user !== undefined ? (
          <>
            <Form className="mb-3">
              <Form.Group className="mb-3">
                <Form.Label>First Name</Form.Label>
                <Form.Control
                  type="text"
                  placeholder="First Name"
                  name="firstName"
                  defaultValue={user.FirstName}
                  onChange={(e) => setEditFirstName(e.target.value)}
                />
              </Form.Group>
              <Form.Group className="mb-3">
                <Form.Label>Last Name</Form.Label>
                <Form.Control
                  type="text"
                  placeholder="Last Name"
                  name="lastName"
                  defaultValue={user.LastName}
                  onChange={(e) => setEditLastName(e.target.value)}
                />
              </Form.Group>
              <Form.Group className="mb-3">
                <Form.Label>Email address</Form.Label>
                <Form.Control
                  type="email"
                  placeholder="name@example.com"
                  name="emailAddress"
                  defaultValue={user.EmailAddress}
                  onChange={(e) => setEditEmailAddress(e.target.value)}
                />
              </Form.Group>
              {AltEmailsList !== undefined ? (
                AltEmailsList.length > 0 ? (
                  <FetchAltEmails personCode={personCode} altdata={altdata} />
                ) : (
                  <AddNewAltEmails
                    handleUpdateAlt={handleUpdateAlt}
                    updateAlt={updateAlt}
                  />
                )
              ) : null}

              <Form.Group className="mb-3">
                <Form.Label>Password</Form.Label>
                <Form.Control
                  type="text"
                  placeholder="Password"
                  name="password"
                  defaultValue={user.Password}
                  onChange={(e) => setEditPassword(e.target.value)}
                />
              </Form.Group>
              <Form.Group className="mb-3">
                <Form.Label>Number</Form.Label>
                <Form.Control
                  type="number"
                  placeholder="Number"
                  name="number"
                  defaultValue={`0${user.Number}`}
                  onChange={(e) => setEditNumber(e.target.value)}
                />
              </Form.Group>
              <Form.Group className="mb-3">
                <Form.Label>Address</Form.Label>
                <Form.Control
                  type="text"
                  placeholder="Address"
                  name="address"
                  defaultValue={user.Address}
                  onChange={(e) => setEditAddress(e.target.value)}
                />
              </Form.Group>
              <Form.Group className="mb-3">
                <Form.Label>City</Form.Label>
                <Form.Control
                  type="text"
                  placeholder="City"
                  name="city"
                  defaultValue={user.City}
                  onChange={(e) => setEditCity(e.target.value)}
                />
              </Form.Group>
              <Button
                name="updateID"
                value={user.PersonID}
                type="submit"
                onClick={updateUser}
              >
                Update User
              </Button>
            </Form>
          </>
        ) : null}
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
