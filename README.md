# payment-gateway
Payment Gateway Service
This project is a scalable and secure payment gateway service built with Node.js and Express. The service handles different types of transactions (e.g., credit card, debit card, digital wallets) and includes endpoints for creating, processing, retrieving payment status, and handling refunds.

Features
Create a new payment
Process a payment
Retrieve payment status
Handle refunds
Authentication and authorization using JWT
Logging with Winston
API documentation with Swagger
Prerequisites
Node.js (v12 or higher)
npm (v6 or higher)
MongoDB (v4 or higher)

Installation
Clone the repository:
bash
Copy code
Install dependencies:
bash
Copy code
npm install
Configure environment variables:
Create a .env file in the root directory and add the following:

plaintext
Copy code
PORT=5000
DB_URI=mongodb://localhost:27017/payment-gateway
JWT_SECRET=your_jwt_secret
Start the server:
bash
Copy code
npm start
The server will start on http://localhost:5000.