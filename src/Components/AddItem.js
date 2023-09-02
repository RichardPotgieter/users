import { Button, Form } from "react-bootstrap";
import { FaCheck } from "react-icons/fa";

const AddItem = ({ altEmail, onChange, onAdd }) => {
  const validateEmail = () => {
    return String(altEmail)
      .toLowerCase()
      .match(
        /^(([^<>()[\]\\.,;:\s@"]+(\.[^<>()[\]\\.,;:\s@"]+)*)|.(".+"))@((\[[0-9]{1,3}\.[0-9]{1,3}\.[0-9]{1,3}\.[0-9]{1,3}\])|(([a-zA-Z\-0-9]+\.)+[a-zA-Z]{2,}))$/
      );
  };

  return (
    <Form.Group className="mb-3 border rounded bg-dark bg-opacity-10 p-3">
      <Form.Label>Add Alternative Email</Form.Label>
      <Form.Control
        type="text"
        value={altEmail}
        onChange={onChange}
        placeholder="Add email here"
      />
      <Form.Text>
        {validateEmail() === null ? (
          <span>Enter a valid email</span>
        ) : (
          <span className="text-success">
            <FaCheck /> Valid Email
          </span>
        )}
      </Form.Text>
      {validateEmail() !== null ? (
        <div className="mt-2">
          <Button onClick={onAdd}>Add Email</Button>
        </div>
      ) : null}
    </Form.Group>
  );
};

export default AddItem;
