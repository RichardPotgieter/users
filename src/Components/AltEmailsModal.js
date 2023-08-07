import React, { useEffect } from "react";
import { Button, Form, ListGroup, Modal } from "react-bootstrap";
import AddItem from "./AddItem";
import { v4 as uuidv4 } from "uuid";
import { FaEdit, FaTrash } from "react-icons/fa";
import EditItem from "./EditItem";
const _ = require("lodash");

const AltEmailsModal = (props) => {
  console.log("props.alt_Data", props.altdata);
  console.log("props.user_alt_emails", props.user_alt_emails);
  let AltEmailsList = _.filter(props.altdata, [
    "PersonID",
    props.user_alt_emails,
  ]);
  console.log("AltEmailsList", AltEmailsList);
  const [AltList, setAltList] = React.useState(AltEmailsList);
  const [altEmail, setAltEmail] = React.useState([]);
  const [updateState, setUpdateState] = React.useState(-1);

  function handleChange(event) {
    setAltEmail(event.target.value);
  }

  // function handleAdd() {
  //   const newAltEmailList = Array.from(list).concat({
  //     altEmail,
  //     id: uuidv4(),
  //   });
  //   setList(newAltEmailList);
  //   setAltEmail("");
  // }

  const handleEdit = (id) => {
    setUpdateState(id);
  };

  const handleUpdate = () => {
    setUpdateState(-1);
  };

  const deleteAltEmail = async (id) => {
    const newData = await fetch(`/deleteAltEmail`, {
      method: "POST",
      headers: {
        "Content-Type": "application/json",
        Accept: "application/json",
      },
      body: JSON.stringify({
        id: id,
      }),
    }).then((res) => res.json());

    let lessEmails = AltEmailsList.filter((li) => li.EmailID !== id);
    setAltList(lessEmails);
    console.log("list delete", AltEmailsList);
  };

  useEffect(() => {
    console.log("AltEmailsModal list", AltList);
  }, [AltList]);

  return (
    <Modal {...props} aria-labelledby="contained-modal-title-vcenter" centered>
      <Modal.Header closeButton>
        <Modal.Title id="contained-modal-title-vcenter">
          Alt emails for {props.user_alt_emails}
        </Modal.Title>
      </Modal.Header>
      <Modal.Body>
        <AddItem
          altEmail={altEmail}
          onChange={handleChange}
          // onAdd={handleAdd}
        />
        <Form.Group className="p-3 border rounded mb-3 border-2">
          <Form.Label className="w-100">
            <h2 className="fs-6">Alternative Emails</h2>
            <ListGroup variant="flush">
              {AltEmailsList !== undefined && AltEmailsList.length > 0
                ? AltEmailsList.map((item, index) =>
                    updateState === item.EmailID ? (
                      <EditItem
                        key={index}
                        list={AltEmailsList}
                        setList={setAltList}
                        item={item}
                        handleUpdate={handleUpdate}
                        component={AltEmailsModal}
                      />
                    ) : (
                      <ListGroup.Item key={index}>
                        <span className="d-flex justify-content-between align-items-center">
                          {item.AltEmail}
                          <span className="d-flex gap-2">
                            <Button
                              className="d-flex align-items-center"
                              onClick={() => {
                                handleEdit(item.EmailID);
                              }}
                            >
                              <FaEdit />
                            </Button>
                            <Button
                              className="d-flex align-items-center"
                              variant="danger"
                              onClick={() => deleteAltEmail(item.EmailID)}
                            >
                              <FaTrash />
                            </Button>
                          </span>
                        </span>
                      </ListGroup.Item>
                    )
                  )
                : null}
              {AltEmailsList.size === 0 || AltEmailsList.length === 0 ? (
                <span className="fst-italic opacity-50">
                  No Alternative emails
                </span>
              ) : null}
            </ListGroup>
          </Form.Label>
        </Form.Group>
      </Modal.Body>
      <Modal.Footer>
        <Button variant="secondary" onClick={props.onHide}>
          Close
        </Button>
      </Modal.Footer>
    </Modal>
  );
};

export default AltEmailsModal;
