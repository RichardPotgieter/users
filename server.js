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

app.listen(API_PORT, () => console.log(`Listening on port ${API_PORT}`));
