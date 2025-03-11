const employeeModel = require("../models/employeeModel");

// Get all employees
const getAllEmployees = (req, res) => {
  employeeModel.getAllEmployees((err, results) => {
    if (err) {
      console.error(err);
      res.status(500).send("Error fetching employees.");
    } else {
      res.status(200).json(results); // Return only employees with isDeleted = FALSE
    }
  });
};

// Add a new employee
const addEmployee = (req, res) => {
  const employee = req.body;

  // Generate a unique ID for the new employee
  employeeModel.generateEmployeeId((err, employeeId) => {
    if (err) {
      console.error(err);
      res.status(500).send("Error generating employee ID.");
    } else {
      employee.id = employeeId; // Assign the unique ID to the employee object

      employeeModel.addEmployee(employee, (err, results) => {
        if (err) {
          console.error(err);
          res.status(500).send("Error adding employee.");
        } else {
          res
            .status(201)
            .json({ message: "Employee added successfully.", employeeId });
        }
      });
    }
  });
};

// Get employee by ID
const getEmployeeById = (req, res) => {
  const { id } = req.params;
  employeeModel.getEmployeeById(id, (err, results) => {
    if (err) {
      console.error(err);
      res.status(500).send("Error fetching employee.");
    } else if (!results || results.length === 0) {
      res.status(404).send("Employee not found or has been deleted.");
    } else {
      res.status(200).json(results[0]);
    }
  });
};

module.exports = {
  getAllEmployees,
  addEmployee,
  getEmployeeById,
};
