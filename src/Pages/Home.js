import React, { useEffect, useState } from "react";
import { Button, ButtonGroup, Col, Table } from "react-bootstrap";
import NewUserModal from "../Components/NewUserModal";
import Swal from "sweetalert2";
import EditUserModal from "../Components/EditUserModal";
const _ = require("lodash");

const Home = () => {
  const [returnedData, setReturnedData] = useState([`Hi There`]);
  const [modalShow, setModalShow] = React.useState(false);
  const [editModalShow, setEditModalShow] = React.useState(false);
  const [fetchedUser, setFetchedUser] = React.useState([
    {
      PersonID: 0,
      FirstName: "",
      LastName: "",
      EmailAddress: "",
      Password: "",
      Number: "",
      Address: "",
      City: "",
    },
  ]);

  const [editPersonID, setEditPersonID] = useState("");
  const [editFirstName, setEditFirstName] = useState("");
  const [editLastName, setEditLastName] = useState("");
  const [editEmailAddress, setEditEmailAddress] = useState("");
  const [editPassword, setEditPassword] = useState("");
  const [editNumber, setEditNumber] = useState("");
  const [editAddress, setEditAddress] = useState("");
  const [editCity, setEditCity] = useState("");

  const changeEditFirstName = (newValue) => {
    setEditFirstName(newValue);
  };

  function changeEditLastName(newValue) {
    setEditLastName(newValue);
  }

  function changeEditEmailAddress(newValue) {
    setEditEmailAddress(newValue);
  }

  function changeEditPassword(newValue) {
    setEditPassword(newValue);
  }

  function changeEditNumber(newValue) {
    setEditNumber(newValue);
  }

  function changeEditAddress(newValue) {
    setEditAddress(newValue);
  }

  function changeEditCity(newValue) {
    setEditCity(newValue);
  }

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

  const deleteUser = async (deleteID) => {
    const newData = await fetch("/deleteUser", {
      method: "POST",
      headers: {
        "Content-Type": "application/json",
        Accept: "application/json",
      },
      body: JSON.stringify({
        deleteID: deleteID,
      }),
    }).then((res) => {
      res.json().then(() => {
        if (newData === undefined) {
          fetchData();
        }
      });
    });
  };

  const confirmDelete = (event) => {
    const deleteID = event.target.value;

    Swal.fire({
      title: "Are you sure you want to delete this user?",
      showDenyButton: true,
      showCancelButton: true,
      confirmButtonText: "Delete",
      denyButtonText: `Don't delete`,
    }).then((result) => {
      /* Read more about isConfirmed, isDenied below */
      if (result.isConfirmed) {
        deleteUser(deleteID);
        Swal.fire("Uer Deleted!", "", "success");
      } else if (result.isDenied) {
        Swal.fire("User not deleted", "", "info");
      }
    });
  };

  const getUserInfo = (userID) => {
    const userInfo = _.filter(returnedData, ["PersonID", userID]);
    setFetchedUser((prevState) => {
      prevState = userInfo;
      return prevState;
    });
    console.log(fetchedUser[0]);
  };

  const applyUserInfo = () => {
    setEditPersonID(fetchedUser[0].PersonID);
    setEditFirstName(fetchedUser[0].FirstName);
    setEditLastName(fetchedUser[0].LastName);
    setEditEmailAddress(fetchedUser[0].EmailAddress);
    setEditPassword(fetchedUser[0].Password);
    setEditNumber(`0${fetchedUser[0].Number}`);
    setEditAddress(fetchedUser[0].Address);
    setEditCity(fetchedUser[0].City);
  };

  useEffect(() => {
    fetchData();
  }, []);

  useEffect(() => {}, [returnedData]);

  return (
    <main className="bg-dark vh-100 text-light">
      <Col md={10} className="mx-auto pt-5 pb-5">
        <section className="d-flex justify-content-between">
          <h1>Users</h1>
          <Button
            size="lg"
            variant="success"
            onClick={() => setModalShow(true)}
          >
            New User
          </Button>
        </section>
        <Table striped bordered hover className="rounded overflow-hidden mt-3">
          <thead>
            <tr>
              <th>#</th>
              <th>First Name</th>
              <th>Last Name</th>
              <th>Email Address</th>
              <th>Password</th>
              <th>Number</th>
              <th>Address</th>
              <th>City</th>
              <th></th>
            </tr>
          </thead>
          <tbody>
            {returnedData.map((data, index) => {
              return (
                <tr key={index}>
                  <td>{data.PersonID}</td>
                  <td>{data.FirstName}</td>
                  <td>{data.LastName}</td>
                  <td>{data.EmailAddress}</td>
                  <td>{data.Password}</td>
                  <td>0{data.Number}</td>
                  <td>{data.Address}</td>
                  <td>{data.City}</td>
                  <td>
                    <ButtonGroup>
                      <Button
                        variant="info"
                        onClick={() => {
                          getUserInfo(data.PersonID);
                          applyUserInfo();
                          setEditModalShow(true);
                        }}
                      >
                        Edit
                      </Button>
                      <Button
                        variant="danger"
                        name="deleteID"
                        value={data.PersonID}
                        onClick={confirmDelete}
                      >
                        Delete
                      </Button>
                    </ButtonGroup>
                  </td>
                </tr>
              );
            })}
          </tbody>
        </Table>
      </Col>
      <NewUserModal
        show={modalShow}
        onHide={() => setModalShow(false)}
        returneddata={returnedData}
        fetchdata={fetchData}
      />
      <EditUserModal
        show={editModalShow}
        onHide={() => setEditModalShow(false)}
        returneddata={returnedData}
        fetchdata={fetchData}
        fetched_user={fetchedUser}
        edit_person_id={editPersonID}
        edit_first_name={editFirstName}
        edit_last_name={editLastName}
        edit_email_address={editEmailAddress}
        edit_password={editPassword}
        edit_number={editNumber}
        edit_address={editAddress}
        edit_city={editCity}
        set__edit_first_name={changeEditFirstName}
        set__edit_last_name={changeEditLastName}
        set__edit_email_address={changeEditEmailAddress}
        set__edit_password={changeEditPassword}
        set__edit_number={changeEditNumber}
        set__edit_address={changeEditAddress}
        set__edit_city={changeEditCity}
      />
    </main>
  );
};

export default Home;
