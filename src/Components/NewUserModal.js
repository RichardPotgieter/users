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
import { v4 as uuidv4 } from "uuid";
import AddItem from "./AddItem";
import EditItem from "./EditItem";
import styles from "./NewUserModal.module.scss";

var _ = require("lodash");

const NewUserModal = (props) => {
  const fileInput = createRef();
  const profilePicInput = createRef();

  const [firstName, setFirstName] = useState("");
  const [lastName, setLastName] = useState("");
  const [emailAddress, setEmailAddress] = useState("");
  const [password, setPassword] = useState("");
  const [number, setNumber] = useState("");
  const [address, setAddress] = useState("");
  const [city, setCity] = useState("");
  const [listIndex, setListIndex] = useState("");
  const [currentAltEmail, setCurrentAltEmail] = useState("");
  const [profilePicName, setProfilePicName] = useState("");
  const [photoFile, setPhotoFile] = useState();

  const clearForm = () => {
    setFirstName("");
    setLastName("");
    setEmailAddress("");
    setPassword("");
    setNumber("");
    setAddress("");
    setCity("");
  };

  function containsWhitespace(str) {
    return /\s/.test(str);
  }

  const id =
    firstName.slice(0, 3) + lastName.slice(0, 3) + moment().format("x");

  const addUser = async (e) => {
    e.preventDefault();
    let altEmails = [];

    const formData = new FormData();
    formData.set("avatar", photoFile);
    // console.log("photoFile", photoFile.name);

    try {
      const response = await fetch("/profile", {
        method: "POST",
        body: formData,
      });

      const parseResponse = await response.json();
      if (response.ok) {
        list.forEach(function (item, index) {
          const EmailIdNo = id + (index + 1);
          altEmails.push({
            id: id,
            email: item.altEmail,
            emailId: EmailIdNo,
          });
        });

        const newData = await fetch(`/addUser`, {
          method: "POST",
          headers: {
            "Content-Type": "application/json",
            Accept: "application/json",
          },
          body: JSON.stringify({
            id: id,
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
    } catch (e) {
      console.error(e.message);
    }
  };

  const addAltEmail = async (id, currentAltEmail, emailId) => {
    const newData = await fetch(`/addAltEmail`, {
      method: "POST",
      headers: {
        "Content-Type": "application/json",
        Accept: "application/json",
      },
      body: JSON.stringify({
        id: id,
        email: currentAltEmail,
        emailId: emailId,
      }),
    }).then((res) => res.json());

    if (newData.res[0]) {
      console.log("Alt Email Added");
    }
  };

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

  const altEmailList = new Set([]);
  const [list, setList] = React.useState(altEmailList);
  const [altEmail, setAltEmail] = React.useState("");
  const [updateState, setUpdateState] = useState(-1);

  function handleChange(event) {
    setAltEmail(event.target.value);
  }

  function handleAdd() {
    const newAltEmailList = Array.from(list).concat({ altEmail, id: uuidv4() });
    setList(newAltEmailList);
    setAltEmail("");
  }

  const handleEdit = (id) => {
    setUpdateState(id);
  };

  const deleteAltEmail = (id) => {
    const newList = list.filter((li) => li.id !== id);
    setList(newList);
  };

  const handleUpdate = () => {
    setUpdateState(-1);
  };

  useEffect(() => {}, [list]);
  useEffect(() => {}, [photoFile]);

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
            <Image
              src={
                photoFile !== undefined ? URL.createObjectURL(photoFile) : ""
              }
              alt=""
              className={`position-absolute w-100 h-100 object-fit-cover`}
            />
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

          <AddItem
            altEmail={altEmail}
            onChange={handleChange}
            onAdd={handleAdd}
          />

          <Form.Group className="p-3 border rounded mb-3 border-2">
            <Form.Label>
              <h2 className="fs-6">Added Alternative Emails</h2>
            </Form.Label>
            <ListGroup variant="flush">
              {Array.from(list).map((item, index) =>
                updateState === item.id ? (
                  <EditItem
                    key={index}
                    list={list}
                    setList={setList}
                    item={item}
                    handleUpdate={handleUpdate}
                    component="NewUserModal"
                  />
                ) : (
                  <ListGroup.Item key={index}>
                    <span className="d-flex justify-content-between align-items-center">
                      {item.altEmail}
                      <span className="d-flex gap-2">
                        <Button
                          className="d-flex align-items-center"
                          onClick={() => handleEdit(item.id)}
                        >
                          <FaEdit />
                        </Button>
                        <Button
                          className="d-flex align-items-center"
                          variant="danger"
                          onClick={() => deleteAltEmail(item.id)}
                        >
                          <FaTrash />
                        </Button>
                      </span>
                    </span>
                  </ListGroup.Item>
                )
              )}
              {list.size === 0 ? (
                <span className="fst-italic opacity-50">
                  No Alternative numbers added
                </span>
              ) : null}
            </ListGroup>
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
