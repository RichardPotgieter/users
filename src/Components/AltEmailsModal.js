import React from "react";
import { Button, Modal } from "react-bootstrap";
import FetchAltEmails from "./FetchAltEmails";
const _ = require("lodash");

const AltEmailsModal = (props) => {
  let personCode = props.user_alt_emails;
  let altdata = props.altdata;

  return (
    <Modal {...props} aria-labelledby="contained-modal-title-vcenter" centered>
      <Modal.Header closeButton>
        <Modal.Title id="contained-modal-title-vcenter">
          Alt emails for {props.user_alt_emails}
        </Modal.Title>
      </Modal.Header>
      <Modal.Body>
        <FetchAltEmails personCode={personCode} altdata={altdata} />
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
