const employeeModel = require("../models/employeeModel");

// Get all employees
const getAllEmployees = (req, res) => {
  employeeModel.getAllEmployees((err, results) => {
    if (err) {
      console.error(err);
      res.status(500).send("Error fetching employees.");
    } else {
      res.status(200).json(results);
    }
  });
};

// Add a new employee

const addEmployee = (req, res) => {
  const employee = req.body;

  // Check if email already exists (including soft-deleted records)
  employeeModel.getEmployeeByEmail(employee.email, (err, results) => {
    if (err) {
      console.error(err);
      return res.status(500).send("Error checking for duplicate email.");
    }

    if (results.length > 0) {
      const existingEmployee = results[0];

      // If email exists and isDeleted is FALSE, prevent adding
      if (!existingEmployee.isDeleted) {
        return res.status(400).json({
          message:
            "Email already exists and is associated with an active employee.",
        });
      }
    }

    // Generate a unique ID for the new employee
    employeeModel.generateEmployeeId((err, employeeId) => {
      if (err) {
        console.error(err);
        return res.status(500).send("Error generating employee ID.");
      }

      employee.id = employeeId; // Assign the unique ID to the employee object

      employeeModel.addEmployee(employee, (err, results) => {
        if (err) {
          console.error(err);
          return res.status(500).send("Error adding employee.");
        }
        return res
          .status(201)
          .json({ message: "Employee added successfully.", employeeId });
      });
    });
  });
};

// Get employee by ID
const getEmployeeById = (req, res) => {
  const { id } = req.params;
  employeeModel.getEmployeeById(id, (err, results) => {
    if (err) {
      console.error(err);
      return res.status(500).send("Error fetching employee.");
    }
    if (!results || results.length === 0) {
      return res.status(404).send("Employee not found or has been deleted.");
    }
    return res.status(200).json(results[0]);
  });
};

// Update employee
const updateEmployee = (req, res) => {
  console.log("req==>>", req.body);

  const { id } = req.params;
  const employee = req.body;

  // Check if at least one field is provided
  if (
    !employee.name &&
    !employee.email &&
    !employee.job_title &&
    employee.salary == null
  ) {
    return res.status(400).send("At least one field is required to update.");
  }

  employeeModel.updateEmployee(id, employee, (err, results) => {
    if (err) {
      console.error(err);
      return res.status(500).send("Error updating employee.");
    }
    if (results.affectedRows === 0) {
      return res.status(404).send("Employee not found or has been deleted.");
    }
    return res.status(200).send("Employee updated successfully.");
  });
};

// Soft delete employee
const deleteEmployee = (req, res) => {
  const { id } = req.params;
  employeeModel.deleteEmployee(id, (err, results) => {
    if (err) {
      console.error(err);
      return res.status(500).send("Error deleting employee.");
    }
    if (results.affectedRows === 0) {
      return res.status(404).send("Employee not found or already deleted.");
    }
    return res.status(200).json({
      message: "Employee deleted successfully (soft delete).",
      employeeId: id,
    });
  });
};

module.exports = {
  getAllEmployees,
  addEmployee,
  getEmployeeById,
  updateEmployee,
  deleteEmployee,
};
