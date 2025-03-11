const express = require("express");
const { body, validationResult } = require("express-validator");
const router = express.Router();
const employeeController = require("../controllers/employeeController");

// Validation middleware
const validateEmployee = [
  body("name").isString().notEmpty().withMessage("Name is required"),
  body("email").isEmail().withMessage("Valid email is required"),
  body("job_title").isString().notEmpty().withMessage("Job title is required"),
  body("salary").isFloat({ gt: 0 }).withMessage("Salary must be positive"),
  (req, res, next) => {
    const errors = validationResult(req);
    if (!errors.isEmpty()) {
      return res.status(400).json({ errors: errors.array() });
    }
    next();
  },
];

router.get("/employees", employeeController.getAllEmployees);
router.post("/employees", validateEmployee, employeeController.addEmployee);
router.get("/employees/:id", employeeController.getEmployeeById);
module.exports = router;
