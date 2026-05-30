const express = require('express');
const jwt = require('jsonwebtoken');
const books = require('../books.js');

let authenticated = express.Router();

/**
 * Login endpoint
 * Body: { username, password }
 * Returns: JWT token stored in session
 */
authenticated.post('/customer/login', (req, res) => {
  try {
    const users = require('../users.js');
    const { username, password } = req.body;
    
    // Validate input
    if (!username || !password) {
      return res.status(400).json({ message: "Username and password are required" });
    }
    
    // Check if user exists and password matches
    const user = users.find(u => u.username === username && u.password === password);
    
    if (!user) {
      return res.status(401).json({ message: "Invalid username or password" });
    }
    
    // Create JWT token
    let accessToken = jwt.sign({
      data: username
    }, "access", { expiresIn: 60 * 60 });
    
    // Store token in session
    req.session.authorization = {
      accessToken: accessToken
    };
    
    return res.status(200).json({ message: "User logged in successfully", token: accessToken });
  } catch (error) {
    res.status(500).json({ message: "Error during login" });
  }
});

/**
 * Add or update a book review
 * Route params: isbn - Book ID
 * Body: { review } - The review text
 * Returns: Confirmation message
 */
authenticated.put('/auth/review/:isbn', (req, res) => {
  try {
    const isbn = req.params.isbn;
    const { review } = req.body;
    const username = req.user.data;
    
    // Validate book exists
    if (!books[isbn]) {
      return res.status(404).json({ message: "Book not found" });
    }
    
    // Validate review input
    if (!review) {
      return res.status(400).json({ message: "Review is required" });
    }
    
    // Add or update review
    books[isbn].reviews[username] = review;
    
    return res.status(200).json({ 
      message: "Review added/updated successfully",
      review: books[isbn].reviews[username]
    });
  } catch (error) {
    res.status(500).json({ message: "Error adding/updating review" });
  }
});

/**
 * Delete a book review
 * Route params: isbn - Book ID
 * Returns: Confirmation message
 */
authenticated.delete('/auth/review/:isbn', (req, res) => {
  try {
    const isbn = req.params.isbn;
    const username = req.user.data;
    
    // Validate book exists
    if (!books[isbn]) {
      return res.status(404).json({ message: "Book not found" });
    }
    
    // Check if review exists
    if (!books[isbn].reviews[username]) {
      return res.status(404).json({ message: "Review not found for this user" });
    }
    
    // Delete review
    delete books[isbn].reviews[username];
    
    return res.status(200).json({ message: "Review deleted successfully" });
  } catch (error) {
    res.status(500).json({ message: "Error deleting review" });
  }
});

module.exports.authenticated = authenticated;