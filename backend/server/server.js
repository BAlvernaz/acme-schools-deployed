const express = require("express");
const app = express();
const port = process.env.PORT || 3000;
const path = require("path");
const seed = require("../db/seed");
const session = require("express-session");
const { Student } = require('../db/index')
const cookieParser = require('cookie-parser')

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
  if(email && password) {
    const loginUser = await Student.findOne({
      where: {
        email
      }
    })
    if (loginUser) {
      if(loginUser.password === password) {
       req.session.email = email
      res.status(200).send(req.session.email)
      } else {
        console.log("Wrong Password")
      }
    } else {
      console.log( "create an account")
    }
  } else {
    console.log('Enter Creditials')
  }

})

app.delete("/api/session", (req, res, next) => {
  console.log(req.session.email)
  if (req.session.email) {
    delete req.session.email;
  }
  res.status(204).send("logged out");
});

app.listen(port, () => console.log(`listening on port ${port}`));

module.exports = app;
