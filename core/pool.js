const util = require("util");
const mysql = require("mysql");
const { connect } = require("http2");

const pool = mysql.createPool({
  connectionLimit: 10,
  host: "sql6.freemysqlhosting.net",
  user: "sql6529248",
  password: "VFSFDA977U",
  database: "sql6529248",
  port: 3306,
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
