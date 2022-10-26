const util = require("util");
const mysql = require("mysql");
const { connect } = require("http2");

const pool = mysql.createPool({
  connectionLimit: 10,
  host: "localhost",
  user: "root",
  password: "123456",
  database: "registerdb",
});

pool.getConnection((err, connection) => {
  if (err) {
    console.error("err", err);
  } else {
    console.log("success connect to db");
    connection.release();
  }
  return;
});
pool.query = util.promisify(pool.query);

module.exports = pool;
