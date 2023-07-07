import React, { useEffect } from "react";
import { Button, Form, ListGroup, Modal } from "react-bootstrap";
import AddItem from "./AddItem";
import { v4 as uuidv4 } from "uuid";
import { FaEdit, FaTrash } from "react-icons/fa";
import EditItem from "./EditItem";

const AltEmailsModal = (props) => {
  let fetchEmails = props.alt_emails;

  const [list, setList] = React.useState(fetchEmails);
  const [altEmail, setAltEmail] = React.useState("");
  const [updateState, setUpdateState] = React.useState(-1);

  function handleChange(event) {
    setAltEmail(event.target.value);
  }

  function handleAdd() {
    const newAltEmailList = Array.from(fetchEmails).concat({
      altEmail,
      id: uuidv4(),
    });
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

  useEffect(() => {
    console.log(fetchEmails);
  }, [list, fetchEmails]);

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
          onAdd={handleAdd}
        />
        <Form.Group className="p-3 border rounded mb-3 border-2">
          <Form.Label>
            <h2 className="fs-6">Alternative Emails</h2>
          </Form.Label>
          <ListGroup variant="flush">
            {fetchEmails !== undefined && fetchEmails.length > 0
              ? fetchEmails.map((item, index) =>
                  updateState === item.EmailID ? (
                    <EditItem
                      key={index}
                      list={list}
                      setList={setList}
                      item={item}
                      handleUpdate={handleUpdate}
                    />
                  ) : (
                    <ListGroup.Item key={index}>
                      <span className="d-flex justify-content-between align-items-center">
                        {item.AltEmail}
                        <span className="d-flex gap-2">
                          <Button
                            className="d-flex align-items-center"
                            onClick={() => handleEdit(item.EmailID)}
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
            {fetchEmails.size === 0 ? (
              <span className="fst-italic opacity-50">
                No Alternative emails
              </span>
            ) : null}
          </ListGroup>
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
