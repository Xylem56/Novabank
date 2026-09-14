# NovaBank API

NovaBank is a secure banking backend API built with Node.js, Express, MongoDB, JWT, and bcryptjs.

## Features
- User registration and login with hashed passwords
- JWT authentication on all protected routes
- Refactor routes to use JWT for user identity
- Deposit, withdrawal, and transfer between accounts
- Transaction history

## Tech Stack
- Node.js
- Express
- MongoDB + Mongoose
- JSON Web Tokens (JWT)
- bcryptjs

## How to Run
1. Clone the repo: `git clone <repo-url>`
2. Install dependencies: `npm install`
3. Create a `.env` file with: `JWT_SECRET=yoursecretkey`
4. Start MongoDB: `sudo mongod --dbpath /tmp/mongodb --fork --logpath /tmp/mongodb.log`
5. Start the server: `nodemon server.js`

## Docker Setup

This project is also fully containerized with Docker Compose, running both frontend and backend services.

### Prerequisites
- Docker & Docker Compose installed

### Running the app
```bash
docker compose up --build
```

This spins up:
- **backend** – Node/Express API with JWT auth
- **frontend** – static frontend served on its own port
- **db** – MongoDB instance

### Environment variables
Create a `.env` file inside `backend/` with your MongoDB URI, JWT secret, and any other required config.

### Stopping
```bash
docker compose down
```

## API Endpoints
| Method | Endpoint | Description | Auth Required |
|--------|----------|-------------|---------------|
| POST | /auth | Register | No |
| POST | /auth/login | Login | No |
| GET | /accounts/balance | Get balance | Yes |
| POST | /accounts/deposit | Deposit | Yes |
| POST | /accounts/withdraw | Withdraw | Yes |
| POST | /accounts/transfer | Transfer | Yes |
| GET | /accounts/transactions | Transaction history | Yes |
