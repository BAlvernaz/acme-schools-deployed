const express = require("express");
const app = express();
const port = process.env.PORT || 3000;
const path = require("path");
const seed = require("../db/seed");
const session = require("express-session");
const { Student } = require('../db/index')
const cookieParser = require('cookie-parser')
const saltHash = require('../db/utils')

if (process.env.SEED) {
  seed();
}

 app.use(cookieParser())

app.use(
  session({
    secret: "supersecret",
    resave: false,
    saveUninitialized: true
  })
);

app.use(express.static(path.join(__dirname, "../../dist")));
app.use(express.json());
app.use(express.urlencoded());

app.use("/api/students", require("./routes/students"));
app.use("/api/schools", require("./routes/schools"));

app.get("/", (req, res, next) => {
  res.sendFile(path.join(__dirname, "../../", "index.html"));
});

app.post('/api/session', async (req, res, next) => {
  const {email, password} = req.body
  try {
  if(email && password) {
    const loginUser = await Student.findOne({
      where: {
        email
      }
    })
    if (loginUser) {
      if(loginUser.password === saltHash(password)) {
       req.session.email = email
      res.status(200).send(req.session.email)
      } else {
        res.status(401).send("Unautorized, wrong password")
      }
    } else {
      res.status(401).send("Unautorized, Please Create An Account")
    }
  } else {
    res.status(401).send("Unautorized, Enter Credentials to Continue")
  }
  } catch (ex) {
    next(ex)
  }
})

app.delete("/api/session", (req, res, next) => {
  if (req.session.email) {
    delete req.session.email;
  }
  res.sendStatus(200);
});

app.listen(port, () => console.log(`listening on port ${port}`));

module.exports = app;
