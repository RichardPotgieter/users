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

const addUser = async (
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
      .input("PersonID", Number(id))
      .input("LastName", String(lastName))
      .input("FirstName", String(firstName))
      .input("Address", String(address))
      .input("City", String(city))
      .input("EmailAddress", String(emailAddress))
      .input("Password", String(password))
      .input("Number", Number(number)).query(`
        INSERT INTO Users (PersonID, LastName, FirstName, Address, City, EmailAddress, Password, Number)
        VALUES (@PersonID, @LastName, @FirstName, @Address, @City, @EmailAddress, @Password, @Number)
      `);
    return user;
  } catch (error) {
    console.log(error);
  }
};

const deleteUser = async (id) => {
  try {
    let pool = await sql.connect(config);
    let user = await pool
      .request()
      .input("PersonID", Number(id))
      .query(`DELETE FROM Users WHERE PersonID = @PersonID`);
    return user;
  } catch (error) {
    console.log(error);
  }
};

module.exports = {
  getAllUsers,
  addUser,
  deleteUser,
};
