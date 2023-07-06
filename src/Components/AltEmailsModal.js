import React from "react";
import { Button, Modal } from "react-bootstrap";

const AltEmailsModal = (props) => {
  let fetchEmails = props.alt_emails;

  //   useEffect(() => {}, [fetchEmails]);

  return (
    <Modal {...props} aria-labelledby="contained-modal-title-vcenter" centered>
      <Modal.Header closeButton>
        <Modal.Title id="contained-modal-title-vcenter">
          Alt emails for {props.user_alt_emails}
        </Modal.Title>
      </Modal.Header>
      <Modal.Body>
        {fetchEmails !== undefined && fetchEmails.length > 0
          ? fetchEmails.map((data, index) => {
              return (
                <div key={index}>
                  <div>{data.AltEmail}</div>
                </div>
              );
            })
          : null}
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
