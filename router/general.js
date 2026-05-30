const express = require('express');
let books = require("../books.js");
let users = require("../users.js");
const axios = require('axios');
const public_users = express.Router();

// Register
public_users.post("/register", (req, res) => {
  const { username, password } = req.body;
  if (!username || !password) {
    return res.status(404).json({ message: "Unable to register user" });
  }
  if (users.some(u => u.username === username)) {
    return res.status(404).json({ message: "User already exists" });
  }
  users.push({ username, password });
  return res.status(200).json({ message: "User successfully registered. Now you can login" });
});

// Get all books
public_users.get('/', function (req, res) {
  return res.status(200).json(books);
});

// Get book by ISBN
public_users.get('/isbn/:isbn', function (req, res) {
  const isbn = req.params.isbn;
  if (books[isbn]) {
    return res.status(200).json({ [isbn]: books[isbn] });
  }
  return res.status(404).json({ message: "Book not found" });
});

// Get books by author
public_users.get('/author/:author', function (req, res) {
  const author = req.params.author;
  let result = {};
  Object.keys(books).forEach(key => {
    if (books[key].author.toLowerCase() === author.toLowerCase()) {
      result[key] = books[key];
    }
  });
  if (Object.keys(result).length > 0) {
    return res.status(200).json(result);
  }
  return res.status(404).json({ message: "No books found by this author" });
});

// Get books by title
public_users.get('/title/:title', function (req, res) {
  const title = req.params.title;
  let result = {};
  Object.keys(books).forEach(key => {
    if (books[key].title.toLowerCase() === title.toLowerCase()) {
      result[key] = books[key];
    }
  });
  if (Object.keys(result).length > 0) {
    return res.status(200).json(result);
  }
  return res.status(404).json({ message: "No books found with this title" });
});

// Get book review
public_users.get('/review/:isbn', function (req, res) {
  const isbn = req.params.isbn;
  if (books[isbn]) {
    return res.status(200).json(books[isbn].reviews);
  }
  return res.status(404).json({ message: "Book not found" });
});

// Task 11: Async/Await with Axios
// Route: Get all books using async/await
public_users.get('/books/async', async (req, res) => {
  try {
    const response = await axios.get('http://localhost:5000/');
    return res.status(200).json(response.data);
  } catch (error) {
    return res.status(500).json({ message: error.message });
  }
});

// Route: Get book by ISBN using async/await
public_users.get('/books/isbn/async/:isbn', async (req, res) => {
  try {
    const response = await axios.get(`http://localhost:5000/isbn/${req.params.isbn}`);
    return res.status(200).json(response.data);
  } catch (error) {
    return res.status(500).json({ message: error.message });
  }
});

// Route: Get books by author using async/await
public_users.get('/books/author/async/:author', async (req, res) => {
  try {
    const response = await axios.get(`http://localhost:5000/author/${req.params.author}`);
    return res.status(200).json(response.data);
  } catch (error) {
    return res.status(500).json({ message: error.message });
  }
});

// Route: Get books by title using async/await
public_users.get('/books/title/async/:title', async (req, res) => {
  try {
    const response = await axios.get(`http://localhost:5000/title/${req.params.title}`);
    return res.status(200).json(response.data);
  } catch (error) {
    return res.status(500).json({ message: error.message });
  }
});

module.exports.general = public_users;