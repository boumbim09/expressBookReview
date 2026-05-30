const express = require('express');
const session = require('express-session');
const customer_routes = require('./router/auth_users.js').authenticated;
const genl_routes = require('./router/general.js').general;

const app = express();
app.use(express.json());

app.use("/customer", session({
  secret: "fingerprint_customer",
  resave: true,
  saveUninitialized: true
}));

app.post("/register", (req, res) => {
  const users = require('./users.js');
  const { username, password } = req.body;
  if (!username || !password) {
    return res.status(400).json({ message: "Unable to register user" });
  }
  if (users.some(u => u.username === username)) {
    return res.status(400).json({ message: "User already exists" });
  }
  users.push({ username, password });
  return res.status(200).json({ message: "User successfully registered. Now you can login" });
});

app.use("/customer/auth", function auth(req, res, next) {
  if (req.session.authorization) {
    let token = req.session.authorization['accessToken'];
    const jwt = require('jsonwebtoken');
    jwt.verify(token, "access", (err, user) => {
      if(!err) {
        req.user = user;
        next();
      } else {
        return res.status(403).json({ message: "User not authenticated" });
      }
    });
  } else {
    return res.status(403).json({ message: "User not logged in" });
  }
});

app.use("/customer", customer_routes);
app.use("/", genl_routes);

app.listen(5000, () => console.log("Server is running at port 5000"));