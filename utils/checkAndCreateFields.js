const db = require("../config/db");

const checkAndCreateFields = () => {
  // Ensure the correct database is selected
  db.changeUser({ database: process.env.DB_NAME }, (err) => {
    if (err) {
      console.error("Error selecting database:", err);
      throw err;
    }
    console.log(`Using database "${process.env.DB_NAME}"`);

    // Array of required fields
    const requiredFields = [
      { name: "id", definition: "VARCHAR(20) PRIMARY KEY" },
      { name: "name", definition: "VARCHAR(255) NOT NULL" },
      { name: "email", definition: "VARCHAR(255) UNIQUE NOT NULL" },
      { name: "job_title", definition: "VARCHAR(255) NOT NULL" },
      { name: "salary", definition: "DECIMAL(10, 2) NOT NULL" },
      { name: "isDeleted", definition: "BOOLEAN DEFAULT FALSE" },
      { name: "createdAt", definition: "TIMESTAMP DEFAULT CURRENT_TIMESTAMP" },
      {
        name: "lastModifiedDate",
        definition:
          "DATETIME DEFAULT CURRENT_TIMESTAMP ON UPDATE CURRENT_TIMESTAMP",
      },
      { name: "joinedDate", definition: "DATE DEFAULT NULL" },
    ];

    // Query to get existing fields
    const query = `SHOW COLUMNS FROM employees`;

    db.query(query, (err, results) => {
      if (err) {
        console.error("Error fetching table schema:", err);
        throw err;
      }

      const existingFields = results.map((row) => row.Field);

      requiredFields.forEach((field) => {
        if (!existingFields.includes(field.name)) {
          const alterQuery = `ALTER TABLE employees ADD COLUMN ${field.name} ${field.definition}`;
          db.query(alterQuery, (err) => {
            if (err) {
              console.error(`Error adding column "${field.name}":`, err);
            } else {
              console.log(`Field "${field.name}" added successfully.`);
            }
          });
        }
      });
    });
  });
};

module.exports = checkAndCreateFields;
