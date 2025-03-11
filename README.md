Employee Management System
A comprehensive backend application to manage employees, built using Node.js, Express.js, and MySQL. This system supports essential CRUD operations for employees, with features like soft deletion, date tracking (createdAt, joinedDate), and input validation.

Features
Add new employees with unique IDs.

Track employee creation and joining dates.

Soft delete employees (retain data but mark them as inactive).

Update employee details, including partial updates.

Retrieve employee details with filtering (exclude deleted records).

Prevent duplicate email entries during employee creation.

Input validation for all requests using express-validator.

Technologies Used
Backend: Node.js, Express.js

Database: MySQL

Middleware: Body-Parser, CORS, Express-Validator

Tooling: Nodemon for development

Table of Contents
Installation

Usage

API Endpoints

Database Schema

License

Installation
Prerequisites
Make sure you have the following installed on your machine:

Node.js (v14+)

MySQL

Steps
Clone the repository:

bash
git clone https://github.com/your-username/employee-management-system.git
Navigate to the project directory:

bash
cd employee-management-system
Install dependencies:

bash
npm install
Set up the .env file in the root directory:

plaintext
DB_HOST=localhost
DB_USER=root
DB_PASSWORD=your_password
DB_NAME=employee_management
PORT=5000
Start the server:

bash
npm start
The server will run on http://localhost:5000.

Usage
Testing the APIs
You can use Postman, Thunder Client, or curl to test the API endpoints. See the API Endpoints section for detailed instructions.

API Endpoints
Base URL
http://localhost:5000/api

1. Add a New Employee
   Endpoint: POST /employees

Payload:

json
{
"name": "John Doe",
"email": "john.doe@example.com",
"job_title": "Software Engineer",
"salary": 60000,
"joinedDate": "2023-04-01"
}
Response:

Success: 201 Created

Error: Duplicate email or validation errors.

2. Get All Employees
   Endpoint: GET /employees

Response:

json
[
{
"id": "EMP1741685317665",
"name": "John Doe",
"email": "john.doe@example.com",
"job_title": "Software Engineer",
"salary": 60000,
"createdAt": "2023-04-01T12:34:56.789Z",
"joinedDate": "2023-04-01"
}
] 3. Get Employee by ID
Endpoint: GET /employees/:id

Response:

Success: 200 OK (Employee details)

Error: 404 Not Found

4. Update Employee
   Endpoint: PUT /employees/:id

Payload:

json
{
"job_title": "Senior Engineer",
"salary": 80000
}
Response:

Success: 200 OK

Error: 404 Not Found (Employee not found or already deleted)

5. Soft Delete an Employee
   Endpoint: DELETE /employees/:id

Response:

Success: 200 OK (Soft deleted)

Error: 404 Not Found

Database Schema
Employees Table
Column Type Constraints
id VARCHAR(20) Primary Key
name VARCHAR(255) NOT NULL
email VARCHAR(255) UNIQUE, NOT NULL
job_title VARCHAR(255) NOT NULL
salary DECIMAL(10,2) NOT NULL
isDeleted BOOLEAN Default: FALSE
createdAt TIMESTAMP Default: CURRENT_TIMESTAMP
joinedDate DATE Default: NULL
