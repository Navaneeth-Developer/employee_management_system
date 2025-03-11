const express = require("express");
const { body, validationResult } = require("express-validator");
const router = express.Router();
const employeeController = require("../controllers/employeeController");

// Validation middleware

// Validation middleware for creating an employee
const validateCreateEmployee = [
  body("name").isString().notEmpty().withMessage("Name is required."),
  body("email").isEmail().notEmpty().withMessage("Valid email is required."),
  body("job_title").isString().notEmpty().withMessage("Job title is required."),
  body("salary")
    .isFloat({ gt: 0 })
    .notEmpty()
    .withMessage("Salary must be a positive number."),
  body("joinedDate")
    .optional() // Allow optional joinedDate for create
    .isISO8601()
    .toDate()
    .withMessage(
      "Joined date must be a valid date in ISO 8601 format (YYYY-MM-DD)."
    ),
  (req, res, next) => {
    const errors = validationResult(req);
    if (!errors.isEmpty()) {
      return res.status(400).json({ errors: errors.array() });
    }
    next();
  },
];

// Validation middleware for updating an employee
const validateUpdateEmployee = [
  body("name")
    .optional()
    .isString()
    .notEmpty()
    .withMessage("Name must be a non-empty string."),
  body("email").optional().isEmail().withMessage("Valid email is required."),
  body("job_title")
    .optional()
    .isString()
    .notEmpty()
    .withMessage("Job title must be a non-empty string."),
  body("salary")
    .optional()
    .isFloat({ gt: 0 })
    .withMessage("Salary must be a positive number."),
  body("joinedDate")
    .optional()
    .isISO8601()
    .toDate()
    .withMessage(
      "Joined date must be a valid date in ISO 8601 format (YYYY-MM-DD)."
    ),
  (req, res, next) => {
    const errors = validationResult(req);
    if (!errors.isEmpty()) {
      return res.status(400).json({ errors: errors.array() });
    }
    next();
  },
];

router.get("/employees", employeeController.getAllEmployees);
router.post(
  "/employees",
  validateCreateEmployee,
  employeeController.addEmployee
);
router.get("/employees/:id", employeeController.getEmployeeById);
router.put(
  "/employees/:id",
  validateUpdateEmployee,
  employeeController.updateEmployee
);
router.delete("/employees/:id", employeeController.deleteEmployee);
module.exports = router;
