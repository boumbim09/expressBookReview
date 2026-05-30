# expressBookReview

A REST API for managing book reviews, built with Node.js and Express.

## About

I built this project while learning backend development with IBM Coursera. It covers the fundamentals of building a REST API with user authentication, session management, and CRUD operations for book reviews.

## Features

- User registration and JWT authentication
- Book search by ISBN, author, or title
- Add, edit, and delete book reviews
- Session management with express-session
- Error handling and validation
- RESTful API design

## Tech Stack

- **Node.js** - JavaScript runtime
- **Express.js** - Web framework
- **JWT** - User authentication
- **express-session** - Session management
- **Axios** - HTTP client

## Installation

```bash
# Clone repository
git clone https://github.com/boumbim09/expressBookReview.git
cd expressBookReview

# Install dependencies
npm install

# Create .env file (optional)
cp .env.example .env

# Start the server
node index.js
# or
npm start
```

Server will run at `http://localhost:5000`

## API Endpoints

### Public Endpoints (No authentication required)

| Method | Route | Description |
|--------|-------|-------------|
| GET | `/` | Get all books |
| GET | `/isbn/:isbn` | Get book by ISBN |
| GET | `/author/:author` | Get books by author |
| GET | `/title/:title` | Get books by title |
| GET | `/review/:isbn` | Get all reviews for a book |
| POST | `/register` | Register new user |
| POST | `/customer/login` | Login user |

### Protected Endpoints (Authentication required)

| Method | Route | Description |
|--------|-------|-------------|
| PUT | `/customer/auth/review/:isbn` | Add or edit a review |
| DELETE | `/customer/auth/review/:isbn` | Delete a review |

## Usage Examples

### Register a User
```bash
curl -X POST http://localhost:5000/register \
  -H "Content-Type: application/json" \
  -d '{"username":"john","password":"pass123"}'
```

### Login
```bash
curl -X POST http://localhost:5000/customer/login \
  -H "Content-Type: application/json" \
  -d '{"username":"john","password":"pass123"}'
```

### Get All Books
```bash
curl http://localhost:5000/
```

### Search by Author
```bash
curl http://localhost:5000/author/Jane%20Austen
```

### Add a Review (Authenticated)
```bash
curl -X PUT http://localhost:5000/customer/auth/review/8 \
  -H "Content-Type: application/json" \
  -H "Cookie: connect.sid=YOUR_SESSION_ID" \
  -d '{"review":"Great book! Highly recommended."}'
```

## Project Structure

```
expressBookReview/
├── index.js              # Main server file
├── books.js              # Book data
├── users.js              # User data (in-memory)
├── package.json          # Dependencies
├── .env.example          # Environment variables example
├── .gitignore            # Git ignore file
├── README.md             # This file
└── router/
    ├── general.js        # Public routes
    └── auth_users.js     # Protected routes
```

## Learning Outcomes

- Understanding REST API concepts
- Implementing JWT authentication
- Session management with express-session
- Error handling and input validation
- RESTful routing patterns
- Node.js and Express fundamentals

## Certificate

IBM - Developing Back-End Apps with Node.js and Express (Coursera)

## Future Improvements

- Database integration (MongoDB/PostgreSQL)
- Password encryption (bcrypt)
- Rate limiting
- API documentation with Swagger
- Unit tests
- Refresh token implementation

## License

This project is open source and available under the MIT License.

## Author

Phoutdavanh - [GitHub](https://github.com/boumbim09)
