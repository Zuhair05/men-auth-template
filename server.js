const dns = require("node:dns");

dns.setServers(["8.8.8.8", "1.1.1.1"])

const dotenv = require("dotenv");
dotenv.config();
const express = require("express");
const app = express();
const path = require("path");
const session = require("express-session");

const mongoose = require("mongoose");
const methodOverride = require("method-override");
const morgan = require("morgan");

const authCtrl = require("./controllers/auth.js");

// Set the port from environment variable or default to 3000
const port = process.env.PORT ? process.env.PORT : "3000";

app.use(express.static(path.join(__dirname, "public")));


mongoose.connect(process.env.MONGODB_URI);

mongoose.connection.on("connected", () => {
  console.log(`Connected to MongoDB ${mongoose.connection.name}.`);
});

// Middleware to parse URL-encoded data from forms
app.use(express.urlencoded({ extended: false }));
// Middleware for using HTTP verbs such as PUT or DELETE
app.use(methodOverride("_method"));
// Morgan for logging HTTP requests
app.use(morgan('dev'));
app.use(session({
  secret: process.env.SESSION_SECRET,
  resave: false,
  saveUninitialized: true,
}));

app.get('/', async (req, res) => {
  res.render('home.ejs')
  user = req.session.user;
  });

  app.get ('/auth/home', authCtrl.home);

  app.get ('/auth/sign-up', authCtrl.showSignup);

  app.post ('/auth/sign-up', authCtrl.signUp);

  app.get ('/auth/sign-in', authCtrl.showSignInForm);

  app.post ('/auth/sign-in', authCtrl.signIn);

app.listen(port, () => {
  console.log(`The express app is ready on port ${port}!`);
});
