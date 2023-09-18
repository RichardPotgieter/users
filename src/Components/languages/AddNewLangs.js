import React from "react";
import { Badge, Card, Form } from "react-bootstrap";
import { v4 as uuidv4, validate } from "uuid";
import AddLang from "./AddLang";
import { FaTimes } from "react-icons/fa";
const _ = require("lodash");

const AddNewLangs = ({ handleUpdateLang, validateLangs }) => {
  const langsList = new Set([]);
  const [listo, setListo] = React.useState(langsList);
  const [lang, setLang] = React.useState("");

  const handleChange = (event) => {
    setLang(event.target.value);
  };

  const changeList = (x) => {
    setListo(x);
    validateLangs(x);
    handleUpdateLang(x);
  };

  const handleAdd = () => {
    const newLangList = Array.from(listo).concat({ lang, id: uuidv4() });
    changeList(newLangList);
    setLang("");
  };

  const deleteLang = (id) => {
    const newList = listo.filter((li) => li.id !== id);
    changeList(newList);
  };

  React.useEffect(() => {}, [listo]);

  return (
    <section className="mb-3">
      <Card className="shadow p-3 pb-2">
        <h2 className="fs-4">Languages</h2>
        <AddLang lang={lang} onChange={handleChange} onAdd={handleAdd} />
        <Form.Group className="mt-2 p-3 border rounded mb-3 border-2">
          {listo.size === 0 || listo.length === 0 ? (
            <>
              <span className="fst-italic opacity-50">No Languages Added</span>
              <span className="text-danger"> - 1 Language Required</span>
            </>
          ) : null}
          {listo.length > 0 ? (
            <>
              <h3 className="fs-5">Your Languages</h3>
              <div className="d-flex flex-wrap gap-2">
                {_.map(listo, (item, index) => {
                  return (
                    <Badge
                      key={index}
                      className="p-0 rounded-5 overflow-hidden"
                    >
                      <span className="fw-1 fs-6 d-flex align-items-center">
                        <div className="px-2">{item.lang}</div>
                        <div
                          className="px-2 bg-danger py-1 cursor-pointer"
                          onClick={() => deleteLang(item.id)}
                        >
                          <FaTimes />
                        </div>
                      </span>
                    </Badge>
                  );
                })}
              </div>
            </>
          ) : null}
        </Form.Group>
      </Card>
    </section>
  );
};

export default AddNewLangs;
