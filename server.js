const express = require("express");
const dbOperation = require("./dbFiles/dbOperation");
const cors = require("cors");
const _ = require("lodash");

const profile = require("./profile");

const API_PORT = process.env.PORT || 8000;
const app = express();

let client;
let session;

app.use(express.json());
app.use(express.urlencoded());
app.use(cors());
app.use("/profile", profile);

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

app.post("/addAltEmailModal", async (req, res) => {
  let id = req.body.id;
  let email = req.body.email;
  let emailId = req.body.emailId;
  let formID = req.body.formID;

  console.log("body", req.body);

  const result = await dbOperation.addAltEmailModal(id, email, emailId, formID);

  if (result) {
    console.log("Modal: Alt Email Added");
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
  let formID = req.body.formID;
  let altEmails = req.body.altEmails;
  let photo = req.body.photo;

  const result = await dbOperation
    .addUser(
      id,
      lastName,
      firstName,
      address,
      city,
      emailAddress,
      password,
      number,
      formID,
      photo
    )
    .then(async (res) => {
      let resultData = res.recordset;
      if (resultData !== undefined && resultData.length > 0) {
        let user = resultData[0];
        let userFormID = user.formID;

        if (altEmails !== undefined && altEmails.length > 0) {
          console.log("altEmails", altEmails);

          _.map(altEmails, async (email) => {
            email.formID = userFormID;

            const data = await dbOperation
              .addAltEmail(email)
              .then(async (res) => {
                let affectedRows = res.rowsAffected;
                if (affectedRows !== undefined && affectedRows.length > 0) {
                  console.log("affectedRows[0]", affectedRows[0]);
                  return affectedRows[0];
                } else {
                  return 0;
                }
              });

            if (data > 0) {
              // Row inserted
            }
          });
        }
        return user;
      } else {
        return [];
      }
    });

  res.set("Access-Control-Allow-Origin", "*");
  res.send({
    result: {
      formID: result.formID,
    },
  });
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
  let altEmailsCount = req.body.altEmailsCount;
  let altEmails = req.body.altEmails;

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

  console.log("altEmailsCount", altEmailsCount);
  console.log("altEmails", altEmails);

  if (altEmailsCount > 0) {
    console.log("altEmails", altEmails);

    _.map(altEmails, async (email) => {
      email.formID = id;

      const data = await dbOperation.addAltEmail(email).then(async (res) => {
        let affectedRows = res.rowsAffected;
        if (affectedRows !== undefined && affectedRows.length > 0) {
          console.log("affectedRows[0]", affectedRows[0]);
          return affectedRows[0];
        } else {
          return 0;
        }
      });

      if (data > 0) {
        // Row inserted
      }
    });
  }
});

app.post("/changeAltEmail", async (req, res) => {
  let id = req.body.id;
  let email = req.body.email;

  const result = await dbOperation.changeAltEmail(id, email);

  if (result) {
    console.log("Alt email changed");
    res.send({ res: result.rowsAffected });
  }
});

app.post("/deleteAltEmail", async (req, res) => {
  let id = req.body.id;

  const result = await dbOperation.deleteAltEmail(id);

  if (result) {
    console.log("Alt email removed");
    res.send({ res: result.rowsAffected });
  }
});

app.listen(API_PORT, () => console.log(`Listening on port ${API_PORT}`));
