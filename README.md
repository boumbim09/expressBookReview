# expressBookReview

A REST API for managing book reviews, built with Node.js and Express.

## About

I built this project while learning backend development. It covers the basics of building a REST API with user authentication and CRUD operations.

## Tech Used

- Node.js / Express.js
- JWT for authentication
- express-session
- Axios

## Setup

```bash
git clone https://github.com/boumbim09/expressBookReview.git
cd expressBookReview
npm install
node index.js
```

## Endpoints

| Method | Route | Description |
|--------|-------|-------------|
| GET | / | Get all books |
| GET | /isbn/:isbn | Get book by ISBN |
| GET | /author/:author | Get books by author |
| GET | /title/:title | Get books by title |
| GET | /review/:isbn | Get reviews |
| POST | /register | Register |
| POST | /customer/login | Login |
| PUT | /customer/auth/review/:isbn | Add or edit review |
| DELETE | /customer/auth/review/:isbn | Delete review |

## Related Certificate

IBM - Developing Back-End Apps with Node.js and Express (Coursera)
