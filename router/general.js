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

// Get all books - Task 11 async/await
public_users.get('/', async function (req, res) {
  try {
    const getBooks = new Promise((resolve) => {
      resolve(books);
    });
    const result = await getBooks;
    return res.status(200).json(result);
  } catch (error) {
    return res.status(500).json({ message: error.message });
  }
});

// Get book by ISBN - Task 11 async/await
public_users.get('/isbn/:isbn', async function (req, res) {
  try {
    const isbn = req.params.isbn;
    const getBook = new Promise((resolve, reject) => {
      if (books[isbn]) {
        resolve({ [isbn]: books[isbn] });
      } else {
        reject({ message: "Book not found" });
      }
    });
    const result = await getBook;
    return res.status(200).json(result);
  } catch (error) {
    return res.status(404).json(error);
  }
});

// Get books by author - Task 11 async/await
public_users.get('/author/:author', async function (req, res) {
  try {
    const author = req.params.author;
    const getBooks = new Promise((resolve, reject) => {
      let result = {};
      Object.keys(books).forEach(key => {
        if (books[key].author.toLowerCase() === author.toLowerCase()) {
          result[key] = books[key];
        }
      });
      if (Object.keys(result).length > 0) {
        resolve(result);
      } else {
        reject({ message: "No books found by this author" });
      }
    });
    const result = await getBooks;
    return res.status(200).json(result);
  } catch (error) {
    return res.status(404).json(error);
  }
});

// Get books by title - Task 11 async/await
public_users.get('/title/:title', async function (req, res) {
  try {
    const title = req.params.title;
    const getBooks = new Promise((resolve, reject) => {
      let result = {};
      Object.keys(books).forEach(key => {
        if (books[key].title.toLowerCase() === title.toLowerCase()) {
          result[key] = books[key];
        }
      });
      if (Object.keys(result).length > 0) {
        resolve(result);
      } else {
        reject({ message: "No books found with this title" });
      }
    });
    const result = await getBooks;
    return res.status(200).json(result);
  } catch (error) {
    return res.status(404).json(error);
  }
});

// Get book review
public_users.get('/review/:isbn', function (req, res) {
  const isbn = req.params.isbn;
  if (books[isbn]) {
    return res.status(200).json(books[isbn].reviews);
  }
  return res.status(404).json({ message: "Book not found" });
});

module.exports.general = public_users;