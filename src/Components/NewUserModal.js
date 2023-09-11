import React, { useEffect, useState, createRef } from "react";
import { Form, Image, ListGroup } from "react-bootstrap";
import Button from "react-bootstrap/Button";
import Modal from "react-bootstrap/Modal";
import Swal from "sweetalert2";
import moment from "moment";
import {
  FaAsterisk,
  FaCheck,
  FaEdit,
  FaImage,
  FaTimes,
  FaTrash,
} from "react-icons/fa";

import styles from "./NewUserModal.module.scss";
import AddNewAltEmails from "./AddNewAltEmails";
import AddNewLangs from "./languages/AddNewLangs";

var _ = require("lodash");

const NewUserModal = (props) => {
  const profilePicInput = createRef();
  const [list, setList] = useState([["No List"]]);
  const [firstName, setFirstName] = useState("");
  const [lastName, setLastName] = useState("");
  const [emailAddress, setEmailAddress] = useState("");
  const [password, setPassword] = useState("");
  const [number, setNumber] = useState("");
  const [address, setAddress] = useState("");
  const [city, setCity] = useState("");
  const [photoFile, setPhotoFile] = useState();
  const [updateAlt, setUpdateAlt] = useState(false);
  const [altEmails, setAltEmails] = useState("");
  const [userId, setUserId] = useState("");

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

  const clearForm = () => {
    setFirstName("");
    setLastName("");
    setEmailAddress("");
    setPassword("");
    setNumber("");
    setAddress("");
    setCity("");
    setUpdateAlt(false);
  };

  function containsWhitespace(str) {
    return /\s/.test(str);
  }

  const id =
    firstName.slice(0, 3) + lastName.slice(0, 3) + moment().format("x");

  const hasSpecialChars = (string) => {
    const specialChars = /[ `!@#$%^&*()_+\-=\[\]{};':"\\|,.<>\/?~]/;
    return specialChars.test(string);
  };

  const hasNumber = (myString) => {
    return /\d/.test(myString);
  };

  const validateEmail = (email) => {
    return String(email)
      .toLowerCase()
      .match(
        /^(([^<>()[\]\\.,;:\s@"]+(\.[^<>()[\]\\.,;:\s@"]+)*)|.(".+"))@((\[[0-9]{1,3}\.[0-9]{1,3}\.[0-9]{1,3}\.[0-9]{1,3}\])|(([a-zA-Z\-0-9]+\.)+[a-zA-Z]{2,}))$/
      );
  };

  function containsUppercase(str) {
    return /[A-Z]/.test(str);
  }

  const isPasswordValid = () => {
    if (
      containsUppercase(password) &&
      hasSpecialChars(password) &&
      password.length > 10
    ) {
      return true;
    } else {
      return false;
    }
  };

  const isNameValid = (x) => {
    if (x.length > 0 && !hasSpecialChars(x) && !hasNumber(x)) {
      return true;
    } else {
      return false;
    }
  };

  const isNewUserValid = () => {
    return (
      isNameValid(firstName) &&
      isNameValid(lastName) &&
      validateEmail(emailAddress) &&
      isPasswordValid() &&
      number.length === 10 &&
      address.length > 0 &&
      isNameValid(city) &&
      photoFile !== undefined &&
      !containsWhitespace(photoFile.name) &&
      photoFile.name.length > 0
    );
  };

  const getProfilepic = (event) => {
    const FileObject = event.target.files[0];
    setPhotoFile(FileObject);
  };

  const addUser = () => {
    setUserId(id);
    setUpdateAlt(true);
  };

  React.useEffect(() => {}, [userId]);

  useEffect(() => {
    const addUserData = () => {
      const formData = new FormData();

      const initSetup = () => {
        return new Promise(function (resolve) {
          formData.set("avatar", photoFile);

          resolve();
        });
      };

      const sendInput = () => {
        return new Promise(async function (resolve) {
          try {
            const response = await fetch("/profile", {
              method: "POST",
              body: formData,
            });

            const parseResponse = await response.json();
            if (response.ok) {
              const newData = await fetch(`/addUser`, {
                method: "POST",
                headers: {
                  "Content-Type": "application/json",
                  Accept: "application/json",
                },
                body: JSON.stringify({
                  id: userId,
                  lastName: lastName,
                  firstName: firstName,
                  address: address,
                  city: city,
                  emailAddress: emailAddress,
                  password: password,
                  number: number,
                  altEmails: altEmails,
                  photo: photoFile.name,
                }),
              }).then((res) => res.json());

              if (newData !== undefined) {
                Swal.fire({ icon: "success", title: "User Added" });
                clearForm();
                props.onHide();
              }
            } else {
              Swal.fire({ icon: "danger", title: "Error" });
            }
            resolve();
          } catch (e) {
            console.error(e.message);
          }
        });
      };

      async function AddUserSteps() {
        await initSetup();
        await sendInput();
      }

      AddUserSteps();
    };

    if (updateAlt) {
      if (altEmails.length > 0) {
        addUserData();
      }
    }
  }, [updateAlt, altEmails, photoFile]);

  React.useEffect(() => {
    // console.log("List", list);
  }, [list]);

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
          <div
            className={`${styles.Docs__PhotoPreview} bg-dark d-flex justify-content-center align-items-center rounded-circle overflow-hidden position-relative`}
          >
            {photoFile === undefined ? (
              <FaImage className="text-light fs-2" />
            ) : null}
            {photoFile !== undefined ? (
              <Image
                src={URL.createObjectURL(photoFile)}
                alt=""
                className={`position-absolute w-100 h-100 object-fit-cover`}
              />
            ) : null}
          </div>
          <Form.Group controlId="formFile" className="mb-3">
            <Form.Label>Insert profile picture</Form.Label>
            <Form.Control
              onChange={getProfilepic}
              type="file"
              ref={profilePicInput}
              name="avatar"
            />
            <Form.Text>
              {photoFile !== undefined && containsWhitespace(photoFile.name) ? (
                <span className="text-danger">
                  <FaTimes /> File name cant contain spaces
                </span>
              ) : photoFile !== undefined && photoFile.name.length > 0 ? (
                <span className="text-success">
                  <FaCheck /> Valid File Name
                </span>
              ) : null}
            </Form.Text>
          </Form.Group>

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
              {isNameValid(firstName) ? (
                <span className="text-success">
                  <FaCheck /> Name is valid
                </span>
              ) : null}
              {!isNameValid(firstName) ? (
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
              {isNameValid(lastName) ? (
                <span className="text-success">
                  <FaCheck /> Last Name is valid
                </span>
              ) : null}
              <span>
                {!isNameValid(lastName) ? (
                  <span>Name is not Valid: </span>
                ) : null}
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
                {lastName.length === 0 ? (
                  <span className="text-danger">Required</span>
                ) : null}
              </span>
            </Form.Text>
          </Form.Group>

          <AddNewLangs />

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
              {validateEmail(emailAddress) ? (
                <span className="text-success">
                  <FaCheck /> Email Address is valid{" "}
                </span>
              ) : null}
              {emailAddress.length === 0 ? (
                <span className="text-danger">
                  <FaAsterisk /> Required{" "}
                </span>
              ) : null}
              {emailAddress.length > 0 && !validateEmail(emailAddress) ? (
                <span className="text-danger">
                  <FaTimes /> Email Address is not valid
                </span>
              ) : null}
            </Form.Text>
          </Form.Group>

          <AddNewAltEmails
            handleUpdateAlt={handleUpdateAlt}
            updateAlt={updateAlt}
          />

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
              {isPasswordValid() ? (
                <span className="text-success">
                  <FaCheck /> Password is valid
                </span>
              ) : null}
              <span>
                {!isPasswordValid() ? <>Password needs: </> : null}
                {!containsUppercase(password) ? (
                  <span className="text-info">
                    <FaAsterisk /> Needs 1 Capital Letter{" "}
                  </span>
                ) : null}
                {!hasSpecialChars(password) ? (
                  <span className="text-info">
                    <FaAsterisk /> Needs 1 Symbol{" "}
                  </span>
                ) : null}
                {password.length < 10 ? (
                  <span className="text-info">
                    <FaAsterisk /> Password too short{" "}
                  </span>
                ) : null}
                {password.length === 0 ? (
                  <span className="text-danger">
                    <FaAsterisk /> Required
                  </span>
                ) : null}
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
            {address.length > 0 ? (
              <Form.Text className="text-success">
                <FaCheck /> Address field is Filled
              </Form.Text>
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
              {isNameValid(city) ? (
                <span className="text-success">
                  <FaCheck /> City is valid
                </span>
              ) : null}
              <span>
                {!isNameValid(city) ? <>City is not valid: </> : null}
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
                {city.length === 0 ? (
                  <span className="text-danger">
                    <FaAsterisk /> Required
                  </span>
                ) : null}
              </span>
            </Form.Text>
          </Form.Group>
          <Form.Group></Form.Group>
          {isNewUserValid() ? (
            <Button onClick={addUser}>Add New User</Button>
          ) : null}
          {!isNewUserValid() ? (
            <p className="m-0 text-primary fst-italic">
              Please fill all fields correctly to{" "}
              <span className="fw-bolder">Add New User</span>{" "}
            </p>
          ) : null}
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
