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
  const [userinfo, setUserinfo] = useState([]);

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

  let info = "";

  const getUserInfo = (userID) => {
    info = _.filter(returnedData, ["PersonID", userID]);
    setUserinfo(info);
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
              <th>ID</th>
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
        onHide={() => {
          setModalShow(false);
          fetchData();
        }}
        returneddata={returnedData}
      />
      <EditUserModal
        show={editModalShow}
        onHide={() => setEditModalShow(false)}
        returneddata={returnedData}
        userinfo={userinfo}
        onClick={fetchData}
      />
    </main>
  );
};

export default Home;
