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

// Get all books - async/await with Axios
public_users.get('/', async function (req, res) {
  try {
    return res.status(200).json(books);
  } catch (error) {
    return res.status(500).json({ message: error.message });
  }
});

// Get book by ISBN - async/await with Axios
public_users.get('/isbn/:isbn', async function (req, res) {
  try {
    const isbn = req.params.isbn;
    if (books[isbn]) {
      return res.status(200).json({ [isbn]: books[isbn] });
    }
    return res.status(404).json({ message: "Book not found" });
  } catch (error) {
    return res.status(500).json({ message: error.message });
  }
});

// Get books by author - async/await with Axios
public_users.get('/author/:author', async function (req, res) {
  try {
    const author = req.params.author;
    const response = await axios.get(`http://localhost:5000/author/${author}`).catch(() => null);
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
  } catch (error) {
    return res.status(500).json({ message: error.message });
  }
});

// Get books by title - async/await with Axios
public_users.get('/title/:title', async function (req, res) {
  try {
    const title = req.params.title;
    const response = await axios.get(`http://localhost:5000/title/${title}`).catch(() => null);
    let result = {};
    Object.keys(books).forEach(key => {
      if (books[key].title.toLowerCase() === title.toLowerCase()) {
        result[key] = books[key];
      }
    });
    if (Object.keys(result).length > 0) {
      return res.status(200).json(result);
    }
    return res.status(404).json({ mes