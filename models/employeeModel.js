const db = require("../config/db");

// Get all employees (excluding soft-deleted ones)
const getAllEmployees = (callback) => {
  const query = "SELECT * FROM employees WHERE isDeleted = FALSE";
  db.query(query, callback);
};

// Add a new employee
const addEmployee = (employee, callback) => {
  const query =
    "INSERT INTO employees (id, name, email, job_title, salary, isDeleted) VALUES (?, ?, ?, ?, ?, FALSE)";
  db.query(
    query,
    [
      employee.id,
      employee.name,
      employee.email,
      employee.job_title,
      employee.salary,
    ],
    callback
  );
};

// Get employee by ID (only if not soft-deleted)
const getEmployeeById = (id, callback) => {
  const query = "SELECT * FROM employees WHERE id = ? AND isDeleted = FALSE";
  db.query(query, [id], callback);
};

// Generate unique employee ID
const generateEmployeeId = (callback) => {
  const timestamp = Date.now(); // Current timestamp
  const uniqueId = `EMP${timestamp}`;
  callback(null, uniqueId);
};

module.exports = {
  getAllEmployees,
  addEmployee,
  getEmployeeById,
  generateEmployeeId,
};
