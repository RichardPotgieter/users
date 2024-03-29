const config = require("./dbConfig");
const sql = require("mssql");

const getAllUsers = async () => {
  try {
    let pool = await sql.connect(config);
    let users = await pool.request().query(`SELECT * from Users`);
    return users;
  } catch (error) {
    console.log(error);
    return [];
  }
};

const addAltEmail = async (Email) => {
  console.log("addAltEmail");
  console.log("Email", Email);
  console.log("Email", Email.id);
  console.log("Email", Email.email);
  console.log("Email", Email.emailId);
  console.log("Email", Email.formID);
  try {
    let pool = await sql.connect(config);
    let addAlt = await pool
      .request()
      .input("PersonID", String(Email.id))
      .input("AltEmail", String(Email.email))
      .input("EmailID", String(Email.emailId))
      .input("formID", Number(Email.formID))
      .query(
        `INSERT INTO AltEmails (PersonID, AltEmail, EmailID, formID) VALUES (@PersonID, @AltEmail, @EmailID, @formID)`
      );
    return addAlt;
  } catch (error) {
    console.log(error);
  }
};

const addAltEmailModal = async (PersonID, AltEmail, EmailID, formID) => {
  console.log("addAltEmailModal");
  console.log("PersonID", PersonID);
  try {
    let pool = await sql.connect(config);
    let addAlt = await pool
      .request()
      .input("PersonID", PersonID)
      .input("AltEmail", AltEmail)
      .input("EmailID", EmailID)
      .input("formID", formID)
      .query(
        `INSERT INTO AltEmails (PersonID, AltEmail, EmailID, formID) VALUES (@PersonID, @AltEmail, @EmailID, @formID)`
      );
    return addAlt;
  } catch (error) {
    console.log(error);
  }
};

const getAltEmails = async () => {
  try {
    let pool = await sql.connect(config);
    let alt = await pool.request().query(`SELECT * from AltEmails`);
    return alt;
  } catch (error) {
    console.log(error);
    return [];
  }
};

const deleteAltEmailsUser = async (id) => {
  try {
    let pool = await sql.connect(config);
    let alt = await pool
      .request()
      .input("PersonID", String(id))
      .query(`DELETE * from AltEmails WHERE PersonID = @PersonID`);
    return alt;
  } catch (error) {
    console.log(error);
    return [];
  }
};

const addUser = async (
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
) => {
  try {
    let pool = await sql.connect(config);
    let user = await pool
      .request()
      .input("PersonID", String(id))
      .input("LastName", String(lastName))
      .input("FirstName", String(firstName))
      .input("Address", String(address))
      .input("City", String(city))
      .input("EmailAddress", String(emailAddress))
      .input("Password", String(password))
      .input("Number", Number(number))
      .input("formID", Number(formID))
      .input("Photo", String(photo)).query(`
        INSERT INTO Users (PersonID, LastName, FirstName, Address, City, EmailAddress, Password, Number, Photo)
        VALUES (@PersonID, @LastName, @FirstName, @Address, @City, @EmailAddress, @Password, @Number, @Photo); SELECT SCOPE_IDENTITY() as formID
      `);
    return user;
  } catch (error) {
    console.log(error);
  }
};

const updateUser = async (
  id,
  lastName,
  firstName,
  address,
  city,
  emailAddress,
  password,
  number
) => {
  try {
    let pool = await sql.connect(config);
    let user = await pool
      .request()
      .input("PersonID", String(id))
      .input("LastName", String(lastName))
      .input("FirstName", String(firstName))
      .input("Address", String(address))
      .input("City", String(city))
      .input("EmailAddress", String(emailAddress))
      .input("Password", String(password))
      .input("Number", Number(number)).query(`
        UPDATE Users
        SET LastName = @LastName, FirstName = @FirstName, Address = @Address, City = @City, EmailAddress = @EmailAddress, Password = @Password, Number = @Number 
        WHERE PersonID = @PersonID
      `);
    return user;
  } catch (error) {
    console.log(error);
  }
};

const changeAltEmail = async (emailId, altEmail) => {
  try {
    console.log(emailId, altEmail);
    let pool = await sql.connect(config);
    let result = await pool
      .request()
      .input("EmailID", String(emailId))
      .input("AltEmail", String(altEmail)).query(`
      UPDATE AltEmails
      SET AltEmail = @AltEmail
      WHERE EmailID = @EmailID
      `);
    return result;
  } catch (error) {
    console.log(error);
  }
};

const deleteUser = async (id) => {
  try {
    let pool = await sql.connect(config);
    let user = await pool
      .request()
      .input("PersonID", String(id))
      .query(
        `DELETE FROM Users WHERE PersonID = @PersonID; DELETE from AltEmails WHERE PersonID = @PersonID`
      );
    return user;
  } catch (error) {
    console.log(error);
  }
};

const deleteAltEmail = async (id) => {
  try {
    let pool = await sql.connect(config);
    let result = await pool
      .request()
      .input("EmailID", String(id))
      .query(`DELETE FROM AltEmails WHERE EmailID = @EmailID`);
    return result;
  } catch (error) {
    console.log("deleteAltEmail error", error);
  }
};

module.exports = {
  getAllUsers,
  addUser,
  deleteUser,
  updateUser,
  addAltEmail,
  getAltEmails,
  changeAltEmail,
  deleteAltEmail,
  addAltEmailModal,
  deleteAltEmailsUser,
};
