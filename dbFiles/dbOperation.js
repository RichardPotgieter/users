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

module.exports = {
  getAllUsers,
};
