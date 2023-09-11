import React, { useEffect } from "react";
import { Button, ButtonGroup, Form, ListGroup, Modal } from "react-bootstrap";
import AddItem from "./AddItem";
import { FaEdit, FaTrash } from "react-icons/fa";
import EditItem from "./EditItem";
const _ = require("lodash");

const FetchAltEmails = (props) => {
  let personCode = props.personCode;
  let AltEmailsList = _.filter(props.altdata, ["PersonID", props.personCode]);

  const [AltList, setAltList] = React.useState(AltEmailsList);
  const [altEmail, setAltEmail] = React.useState([]);
  const [updateState, setUpdateState] = React.useState(-1);
  const [modalFormID, setModalFormID] = React.useState("");

  function handleChange(event) {
    setAltEmail(event.target.value);
  }

  const handleAdd = async () => {
    let maxEmailsId = _.max(_.map(AltEmailsList, "EmailID"));
    let maxEmailsIdText = maxEmailsId.slice(0, 6);
    let maxEmailsIdNum = Number(maxEmailsId.slice(6)) + 1;
    let newEmailId = maxEmailsIdText + maxEmailsIdNum;
    let newEmail = altEmail;
    let newFormID = AltEmailsList[0].formID;

    setAltEmail("");

    const newData = await fetch(`/addAltEmailModal`, {
      method: "POST",
      headers: {
        "Content-Type": "application/json",
        Accept: "application/json",
      },
      body: JSON.stringify({
        id: personCode,
        email: newEmail,
        emailId: newEmailId,
        formID: newFormID,
      }),
    }).then((res) => res.json());

    if (newData.res[0]) {
      console.log("Alt Email Added");
    }
  };

  const handleEdit = (id) => {
    setUpdateState(id);
    return () => setUpdateState([]);
  };

  const handleUpdate = async () => {
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
  };

  useEffect(() => {
    if (AltList !== undefined && AltList.length > 0) {
      setModalFormID(AltList[0].formID);
    }
  }, []);

  useEffect(() => {
    // console.log("AltEmailList", AltEmailsList);
  }, [AltList, AltEmailsList]);

  return (
    <>
      <AddItem altEmail={altEmail} onChange={handleChange} onAdd={handleAdd} />
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
                      component="AltEmailsModal"
                    />
                  ) : (
                    <ListGroup.Item key={index}>
                      <span className="d-flex justify-content-between align-items-center">
                        {item.AltEmail}
                        <ButtonGroup className="d-flex gap-2">
                          <Button
                            onClick={(event) => {
                              event.preventDefault();
                              handleEdit(event.target.value);
                            }}
                            value={item.EmailID !== undefined && item.EmailID}
                            className="d-flex align-items-center position-relative"
                          >
                            <FaEdit className="pe-none" />
                          </Button>

                          <Button
                            className="d-flex align-items-center"
                            variant="danger"
                            onClick={() => deleteAltEmail(item.EmailID)}
                          >
                            <FaTrash />
                          </Button>
                        </ButtonGroup>
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
    </>
  );
};

export default FetchAltEmails;
