import React from "react";
import AddItem from "./AddItem";
import EditItem from "./EditItem";
import { Button, Form, ListGroup } from "react-bootstrap";
import { FaEdit, FaTrash } from "react-icons/fa";
import { v4 as uuidv4 } from "uuid";

const AddNewAltEmails = ({ handleUpdateAlt, updateAlt }) => {
  const altEmailList = new Set([]);
  const [list, setList] = React.useState(altEmailList);

  const [altEmail, setAltEmail] = React.useState("");
  const [updateState, setUpdateState] = React.useState(-1);

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

  React.useEffect(() => {
    if (updateAlt) {
      handleUpdateAlt(list);
    }
    // console.log("updateAlt addNewAltEmails", updateAlt);
  }, [updateAlt]);

  React.useEffect(() => {}, [list]);

  return (
    <>
      <AddItem altEmail={altEmail} onChange={handleChange} onAdd={handleAdd} />

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
    </>
  );
};

export default AddNewAltEmails;
