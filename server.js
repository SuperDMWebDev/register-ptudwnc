const express = require("express");
const session = require("express-session");
const path = require("path");
const app = express();
const bodyParser = require("body-parser");
const pageRouter = require("./routes/pages");

// collect data which sent from client for body parser
// if false no nested object is allow
app.use(express.urlencoded({ extended: false }));
app.use(bodyParser.json());

//serve static files in public folder
app.use(express.static(path.join(__dirname, "public")));

// set views
app.set("views", path.join(__dirname, "views"));
app.set("view engine", "pug");

//session
//sesssion name serverSession , resave the session back to the store
//saveUninitialized the data to load between client don't need to
//recognized if no security provided
// maxAge in milliseconds
app.use(
  session({
    secret: "serverSession",
    resave: false,
    saveUninitialized: false,
    cookie: {
      maxAge: 1 * 60 * 60 * 1000,
    },
  })
);

//routers
app.use("/", pageRouter);
// ejs, pug , ...
//catch 404
app.use((req, res, next) => {
  var err = new Error("Page not found");
  err.status = 404;
  next(err);
});
// 500
app.use((err, req, res, next) => {
  res.status(err.status || 500);
  res.send(err);
});

app.listen(3000, () => {
  console.log(`
        Server is running at: http://localhost:3000
    `);
});
module.exports = app;
