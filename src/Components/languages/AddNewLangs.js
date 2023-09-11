import React from "react";
import { Card, Form } from "react-bootstrap";
import { v4 as uuidv4 } from "uuid";
import AddLang from "./AddLang";

const AddNewLangs = ({ handleUpdateLang, updateLang }) => {
  const langsList = new Set([]);
  const [listo, setListo] = React.useState(langsList);

  const [lang, setLang] = React.useState("");
  const [updateState, setUpdateState] = React.useState(-1);

  function handleChange(event) {
    setLang(event.target.value);
  }

  function handleAdd() {
    const newLangList = Array.from(listo).concat({ lang, id: uuidv4() });
    setListo(newLangList);
    setLang("");
  }

  const handleEdit = (id) => {
    setUpdateState(id);
  };

  const deleteAltEmail = (id) => {
    const newList = listo.filter((li) => li.id !== id);
    setListo(newList);
  };

  const handleUpdate = () => {
    setUpdateState(-1);
  };

  React.useEffect(() => {
    if (updateLang) {
      handleUpdateLang(listo);
    }
    // console.log("updateLang addNewAltEmails", updateLang);
  }, [updateLang]);

  React.useEffect(() => {}, [listo]);

  return (
    <section className="mb-3">
      <Card className="shadow p-3 pb-2">
        <h2 className="fs-4">Languages</h2>
        <AddLang lang={lang} onChange={handleChange} onAdd={handleAdd} />
        <Form.Group className="mt-2 p-3 border rounded mb-3 border-2">
          {listo.size === 0 ? (
            <span className="fst-italic opacity-50">No Languages Added</span>
          ) : null}
        </Form.Group>
      </Card>
    </section>
  );
};

export default AddNewLangs;
