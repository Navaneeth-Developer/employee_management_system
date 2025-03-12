const db = require("../config/db");

// Get all employees (excluding soft-deleted ones)
// const getAllEmployees = (callback) => {
//   const query = "SELECT * FROM employees WHERE isDeleted = FALSE";
//   db.query(query, callback);
// };
const getAllEmployees = (callback) => {
  const query =
    "SELECT * FROM employees WHERE isDeleted = FALSE ORDER BY lastModifiedDate DESC";
  db.query(query, callback);
};

const getEmployeeByEmail = (email, callback) => {
  const query = "SELECT * FROM employees WHERE email = ? AND isDeleted = FALSE";
  db.query(query, [email], callback);
};

// Add a new employee

// const addEmployee = (employee, callback) => {
//   const query =
//     "INSERT INTO employees (id, name, email, job_title, salary, isDeleted, joinedDate) VALUES (?, ?, ?, ?, ?, FALSE, ?)";
//   db.query(
//     query,
//     [
//       employee.id,
//       employee.name,
//       employee.email,
//       employee.job_title,
//       employee.salary,
//       employee.joinedDate || null, // Use the provided date or default to NULL
//     ],
//     callback
//   );
// };
const addEmployee = (employee, callback) => {
  const query = `
    INSERT INTO employees (id, name, email, job_title, salary, isDeleted, joinedDate, lastModifiedDate) 
    VALUES (?, ?, ?, ?, ?, FALSE, ?, NOW())
  `;
  db.query(
    query,
    [
      employee.id,
      employee.name,
      employee.email,
      employee.job_title,
      employee.salary,
      employee.joinedDate || null,
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

// Update employee details (only if not soft-deleted)

// const updateEmployee = (id, employee, callback) => {
//   let query = "UPDATE employees SET ";
//   const params = [];

//   if (employee.name) {
//     query += "name = ?, ";
//     params.push(employee.name);
//   }
//   if (employee.email) {
//     query += "email = ?, ";
//     params.push(employee.email);
//   }
//   if (employee.job_title) {
//     query += "job_title = ?, ";
//     params.push(employee.job_title);
//   }
//   if (employee.salary != null) {
//     query += "salary = ?, ";
//     params.push(employee.salary);
//   }
//   if (employee.joinedDate) {
//     query += "joinedDate = ?, ";
//     params.push(employee.joinedDate);
//   }

//   // Remove the trailing comma and space, and add the WHERE clause
//   query = query.slice(0, -2) + " WHERE id = ? AND isDeleted = FALSE";
//   params.push(id);

//   db.query(query, params, callback);
// };
const updateEmployee = (id, employee, callback) => {
  let query = "UPDATE employees SET ";
  const params = [];

  if (employee.name) {
    query += "name = ?, ";
    params.push(employee.name);
  }
  if (employee.email) {
    query += "email = ?, ";
    params.push(employee.email);
  }
  if (employee.job_title) {
    query += "job_title = ?, ";
    params.push(employee.job_title);
  }
  if (employee.salary != null) {
    query += "salary = ?, ";
    params.push(employee.salary);
  }
  if (employee.joinedDate) {
    // Format joinedDate for MySQL
    const formattedDate = new Date(employee.joinedDate)
      .toISOString()
      .slice(0, 19)
      .replace("T", " ");
    query += "joinedDate = ?, ";
    params.push(formattedDate);
  }

  // Update lastModifiedDate
  query += "lastModifiedDate = NOW(), ";

  // Remove trailing comma and add WHERE clause
  query = query.slice(0, -2) + " WHERE id = ? AND isDeleted = FALSE";
  params.push(id);

  db.query(query, params, callback);
};

// Soft delete employee (set isDeleted to TRUE)
const deleteEmployee = (id, callback) => {
  const query = "UPDATE employees SET isDeleted = TRUE WHERE id = ?";
  db.query(query, [id], callback);
};

module.exports = {
  getAllEmployees,
  addEmployee,
  getEmployeeById,
  updateEmployee,
  deleteEmployee,
  getEmployeeByEmail,
  generateEmployeeId,
};
