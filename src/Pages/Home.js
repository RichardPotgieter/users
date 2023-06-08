import React, { useEffect, useState } from "react";
import { Button, ButtonGroup, Col, Table } from "react-bootstrap";
import NewUserModal from "../Components/NewUserModal";

const Home = () => {
  const [returnedData, setReturnedData] = useState([`Hi There`]);
  const [modalShow, setModalShow] = React.useState(false);

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

  useEffect(() => {
    fetchData();
  }, []);

  useEffect(() => {}, [returnedData]);

  console.log(returnedData);

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
                      <Button variant="info" value={data.PersonID}>
                        Edit
                      </Button>
                      <Button variant="danger" value={data.PersonID}>
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
    </main>
  );
};

export default Home;
