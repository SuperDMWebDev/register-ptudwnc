const pool = require("./pool");
const bcrypt = require("bcrypt");

function User() {}

//define prototype for User
User.prototype = {
  find: function (user = null, callback) {
    console.log("find", user);
    if (user) {
      // check if client pass id or username
      var field = Number.isInteger(user) ? "id" : "username";
      var sql = `SELECT * FROM users WHERE ${field} = ?`;
      pool.query(sql, user, function (err, result) {
        if (err) {
          console.error("find err", err);
        }
        // check if exist user then return
        // result else return null
        if (result.length) {
          callback(result[0]);
        } else {
          callback(null);
        }
      });
    }
  },

  create: function (body, callback) {
    console.log("go to create", body);
    // get pwd recerive from form
    try {
      var pwd = body.password;
      body.password = bcrypt.hashSync(pwd, 10);

      //auto generate salt and hash pwd upon saltrounds
      // arr for contain value in body
      var arr = [];

      // loop in the attributes of the object and
      // push the value of body into the arr
      for (ele in body) {
        arr.push(body[ele]);
      }
      console.log("value body receive", arr);
      // prepare the sql query
      let sql = `INSERT INTO users(username,fullname,password) VALUES(?,?,?)`;
      pool.query(sql, arr, function (err, result) {
        if (err) throw err;
        //insertId ?
        console.log("insert id ", result.insertId);
        callback(result.insertId);
      });
    } catch (e) {
      console.log("Exception", e);
    }
  },
  login: function (username, password, callback) {
    console.log("goto login ", username, " ", password);
    this.find(username, function (user) {
      //if exist user
      console.log("exist user", user, bcrypt.compareSync(user), user.password);
      // if (user) {
      //   if (bcrypt.compareSync(password, user.password)) {
      //     callback(user);
      //     return;
      //   }
      // }

      //if user not exist or wrong password
      callback(null);
    });
  },
};

module.exports = User;
