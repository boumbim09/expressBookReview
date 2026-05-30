const express = require('express');
const session = require('express-session');
const customer_routes = require('./router/auth_users.js').authenticated;
const genl_routes = require('./router/general.js').general;

const app = express();
app.use(express.json());

/**
 * Session configuration for customer routes
 * Stores user session and JWT token
 */
app.use("/customer", session({
  secret: "fingerprint_customer",
  resave: true,
  saveUninitialized: true
}));

/**
 * User registration endpoint
 * Body: { username, password }
 * Validates input and prevents duplicate users
 */
app.post("/register", (req, res) => {
  try {
    const users = require('./users.js');
    const { username, password } = req.body;
    
    // Input validation
    if (!username || !password) {
      return res.status(400).json({ message: "Username and password are required" });
    }
    
    // Check for duplicate username
    if (users.some(u => u.username === username)) {
      return res.status(400).json({ message: "User already exists" });
    }
    
    // Add new user
    users.push({ username, password });
    return res.status(200).json({ message: "User successfully registered. Now you can login" });
  } catch (error) {
    res.status(500).json({ message: "Error during registration" });
  }
});

/**
 * JWT Authentication middleware
 * Verifies token from session for protected routes
 */
app.use("/customer/auth", function auth(req, res, next) {
  try {
    if (req.session.authorization) {
      let token = req.session.authorization['accessToken'];
      const jwt = require('jsonwebtoken');
      
      // Verify JWT token
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
  } catch (error) {
    res.status(500).json({ message: "Authentication error" });
  }
});

// Use routes
app.use("/customer", customer_routes);
app.use("/", genl_routes);

/**
 * Global error handler
 * Catches unhandled errors and returns proper response
 */
app.use((err, req, res, next) => {
  console.error(err.stack);
  res.status(500).json({ message: "Internal server error" });
});

// Start server
const PORT = process.env.PORT || 5000;
app.listen(PORT, () => {
  console.log(`Server is running at port ${PORT}`);
});
