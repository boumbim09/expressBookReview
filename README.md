# expressBookReview

A RESTful Book Review API built with Node.js and Express. This project was built as part of my backend development learning journey.

## What it does

This API lets users browse books, register an account, log in, and leave reviews. Think of it as a lightweight backend for a book review app.

## Features

- Browse all books or search by ISBN, author, or title
- User registration and login with JWT authentication
- Add, update, or delete your own book reviews
- Async/await implementation using Axios

## Tech Stack

- Node.js
- Express.js
- JSON Web Token (JWT)
- Axios
- express-session

## Getting Started

**1. Clone the repo**
```bash
git clone https://github.com/boumbim09/expressBookReview.git
cd expressBookReview
```

**2. Install dependencies**
```bash
npm install
```

**3. Run the server**
```bash
node index.js
```

Server runs at `http://localhost:5000`

## API Endpoints

| Method | Endpoint | Description |
|--------|----------|-------------|
| GET | / | Get all books |
| GET | /isbn/:isbn | Get book by ISBN |
| GET | /author/:author | Get books by author |
| GET | /title/:title | Get books by title |
| GET | /review/:isbn | Get book reviews |
| POST | /register | Register new user |
| POST | /customer/login | Login |
| PUT | /customer/auth/review/:isbn | Add or update review |
| DELETE | /customer/auth/review/:isbn | Delete review |

## Example Usage

```bash
# Get all books
curl -s http://localhost:5000/

# Register
curl -s -X POST http://localhost:5000/register \
  -H "Content-Type: application/json" \
  -d '{"username":"john","password":"pass123"}'

# Login
curl -s -X POST http://localhost:5000/customer/login \
  -H "Content-Type: application/json" \
  -d '{"username":"john","password":"pass123"}' \
  -c cookies.txt

# Add a review
curl -s -X PUT "http://localhost:5000/customer/auth/review/1?review=Great book" \
  -b cookies.txt
```

## What I learned

- How to structure a REST API with Express
- JWT authentication and session handling
- Async/await pattern with Axios
- Git and GitHub workflow

## Certificate

Completed as part of [Developing Back-End Apps with Node.js and Express](https://coursera.org/verify/9JOTG5EFBFRG) — IBM on Coursera
