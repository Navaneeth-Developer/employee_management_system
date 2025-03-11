require("dotenv").config();
const mysql = require("mysql2");

// Connect to MySQL server (no database specified yet)
const db = mysql.createConnection({
  host: process.env.DB_HOST,
  user: process.env.DB_USER,
  password: process.env.DB_PASSWORD,
});

// Connect to MySQL and check for errors
db.connect((err) => {
  if (err) {
    console.error("Database connection failed:", err);
    throw err;
  }
  console.log("Connected to MySQL server.");

  // Create the database if it doesn't exist
  const createDbQuery = `CREATE DATABASE IF NOT EXISTS ${process.env.DB_NAME}`;
  db.query(createDbQuery, (err) => {
    if (err) throw err;
    console.log(`Database "${process.env.DB_NAME}" is ready.`);

    // Switch to the new database
    db.changeUser({ database: process.env.DB_NAME }, (err) => {
      if (err) throw err;
      console.log(`Using database "${process.env.DB_NAME}".`);

      // Create the employees table if it doesn't exist
      const createTableQuery = `
        CREATE TABLE IF NOT EXISTS employees (
          id INT AUTO_INCREMENT PRIMARY KEY,
          name VARCHAR(255) NOT NULL,
          email VARCHAR(255) UNIQUE NOT NULL,
          job_title VARCHAR(255) NOT NULL,
          salary DECIMAL(10, 2) NOT NULL
        )
      `;
      db.query(createTableQuery, (err) => {
        if (err) throw err;
        console.log('Table "employees" is ready.');
      });
    });
  });
});

module.exports = db;
