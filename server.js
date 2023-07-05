const express = require("express");
const dbOperation = require("./dbFiles/dbOperation");
const cors = require("cors");

const API_PORT = process.env.PORT || 8000;
const app = express();

let client;
let session;
app.use(express.json());
app.use(express.urlencoded());
app.use(cors());

app.get("/get", async (req, res) => {
  await dbOperation.getAllUsers(req.body);
  const result = await dbOperation.getAllUsers(req.body.status);
  console.log("Users Fetched");
  res.send(result.recordset);
});

app.get("/getAltEmails", async (req, res) => {
  await dbOperation.getAltEmails(req.body);
  const result = await dbOperation.getAltEmails(req.body.status);
  console.log("Alt Emails Fetched");
  res.send(result.recordset);
});

app.post("/addAltEmail", async (req, res) => {
  let id = req.body.id;
  let email = req.body.email;
  let emailId = req.body.emailId;

  const result = await dbOperation.addAltEmail(id, email, emailId);

  if (result) {
    console.log("Alt Email Added");
    res.send({ res: result.rowsAffected });
  }
});

app.post("/addUser", async (req, res) => {
  let id = req.body.id;
  let firstName = req.body.firstName;
  let lastName = req.body.lastName;
  let emailAddress = req.body.emailAddress;
  let password = req.body.password;
  let number = req.body.number;
  let address = req.body.address;
  let city = req.body.city;

  const result = await dbOperation.addUser(
    id,
    lastName,
    firstName,
    address,
    city,
    emailAddress,
    password,
    number
  );

  if (result) {
    console.log("User Added");
    res.send({ res: result.rowsAffected });
  }
});

app.post("/deleteUser", async (req, res) => {
  let deleteID = req.body.deleteID;
  const result = await dbOperation.deleteUser(deleteID);
  console.log("User Deleted");
  res.send({ res: result.rowsAffected });
});

app.post("/updateUser", async (req, res) => {
  let id = req.body.id;
  let firstName = req.body.firstName;
  let lastName = req.body.lastName;
  let emailAddress = req.body.emailAddress;
  let password = req.body.password;
  let number = req.body.number;
  let address = req.body.address;
  let city = req.body.city;

  const result = await dbOperation.updateUser(
    id,
    lastName,
    firstName,
    address,
    city,
    emailAddress,
    password,
    number
  );

  if (result) {
    console.log("User Updated");
    res.send({ res: result.rowsAffected });
  }
});

app.listen(API_PORT, () => console.log(`Listening on port ${API_PORT}`));
