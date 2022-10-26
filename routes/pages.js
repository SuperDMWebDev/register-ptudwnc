const express = require("express");
const router = express.Router();

const User = require("../core/user");

//create user object
const user = new User();

//get index page ( login page)
router.get(["/", "/register", "/home"], (req, res, next) => {
  let user = req.session.user;
  console.log("user", user);
  if (user) {
    res.render("home", { username: user.username, fullname: user.fullname });
  }
  res.render("register");
});

router.get("/loggout", (req, res, next) => {
  if (req.session.user) {
    req.session.destroy(function () {
      // return to login home
      res.redirect("/");
    });
  }
});
router.post("/register", (req, res, next) => {
  const username = req.body.username;
  const fullname = req.body.fullname;
  let userInput = {
    username: req.body.username,
    fullname: req.body.fullname,
    password: req.body.password,
  };
  console.log("user", user);
  console.log("userInput", userInput);
  user.create(userInput, function (lastId) {
    if (lastId) {
      user.find(lastId, function (result) {
        req.session.user = result;
        req.session.opp = 0;
        console.log("req.session", req.session);
        res.render("home", { username: username, fullname: fullname });
      });
    } else {
      console.log("error create");
    }
  });
});

module.exports = router;
