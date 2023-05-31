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

app.listen(API_PORT, () => console.log(`Listening on port ${API_PORT}`));
