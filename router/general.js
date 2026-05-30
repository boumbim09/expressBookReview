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
// Get all books using async/await
const getAllBooksAsync = async () => {
  try {
    const response = await axios.get('http://localhost:5000/');
    return response.data;
  } catch (error) {
    throw error;
  }
};

// Get book by ISBN using async/await
const getBookByISBNAsync = async (isbn) => {
  try {
    const response = await axios.get(`http://localhost:5000/isbn/${isbn}`);
    return response.data;
  } catch (error) {
    throw error;
  }
};

// Get books by author using async/await
const getBooksByAuthorAsync = async (author) => {
  try {
    const response = await axios.get(`http://localhost:5000/author/${author}`);
    return response.data;
  } catch (error) {
    throw error;
  }
};

// Get books by title using async/await
const getBooksByTitleAsync = async (title) => {
  try {
    const response = await axios.get(`http://localhost:5000/title/${title}`);
    return response.data;
  } catch (error) {
    throw error;
  }
};

module.exports.general = public_users;
