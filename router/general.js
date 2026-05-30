const express = require('express');
const books = require('../books.js');

let general = express.Router();

/**
 * Get all books
 * Returns: JSON array of all books with their details
 */
general.get('/', (req, res) => {
  try {
    res.send(JSON.stringify({books}, null, 4));
  } catch (error) {
    res.status(500).json({ message: "Error retrieving books" });
  }
});

/**
 * Get book by ISBN (book ID)
 * Route params: isbn - The book ID number
 * Returns: Book details with reviews
 */
general.get('/isbn/:isbn', (req, res) => {
  try {
    const isbn = req.params.isbn;
    
    // Check if book exists
    if (!books[isbn]) {
      return res.status(404).json({ message: "Book not found" });
    }
    
    res.send(JSON.stringify({book: books[isbn]}, null, 4));
  } catch (error) {
    res.status(500).json({ message: "Error retrieving book by ISBN" });
  }
});

/**
 * Get books by author
 * Route params: author - Author name to search
 * Returns: Array of books by the specified author
 */
general.get('/author/:author', (req, res) => {
  try {
    const author = req.params.author;
    const booksByAuthor = [];
    
    // Search through all books
    for (let isbn in books) {
      if (books[isbn].author.toLowerCase() === author.toLowerCase()) {
        booksByAuthor.push({
          isbn: isbn,
          ...books[isbn]
        });
      }
    }
    
    // Return result
    if (booksByAuthor.length === 0) {
      return res.status(404).json({ message: `No books found by author: ${author}` });
    }
    
    res.send(JSON.stringify({booksByAuthor}, null, 4));
  } catch (error) {
    res.status(500).json({ message: "Error retrieving books by author" });
  }
});

/**
 * Get books by title
 * Route params: title - Book title to search
 * Returns: Array of books matching the title
 */
general.get('/title/:title', (req, res) => {
  try {
    const title = req.params.title;
    const booksByTitle = [];
    
    // Search through all books
    for (let isbn in books) {
      if (books[isbn].title.toLowerCase() === title.toLowerCase()) {
        booksByTitle.push({
          isbn: isbn,
          ...books[isbn]
        });
      }
    }
    
    // Return result
    if (booksByTitle.length === 0) {
      return res.status(404).json({ message: `No books found with title: ${title}` });
    }
    
    res.send(JSON.stringify({booksByTitle}, null, 4));
  } catch (error) {
    res.status(500).json({ message: "Error retrieving books by title" });
  }
});

/**
 * Get all reviews for a book
 * Route params: isbn - Book ID
 * Returns: All reviews for the book
 */
general.get('/review/:isbn', (req, res) => {
  try {
    const isbn = req.params.isbn;
    
    // Check if book exists
    if (!books[isbn]) {
      return res.status(404).json({ message: "Book not found" });
    }
    
    const reviews = books[isbn].reviews;
    res.send(JSON.stringify({reviews}, null, 4));
  } catch (error) {
    res.status(500).json({ message: "Error retrieving reviews" });
  }
});

module.exports.general = general;