require("dotenv").config();
const express = require("express");
const bodyParser = require("body-parser");
const cors = require("cors");
const morgan = require("morgan");
const employeeRoutes = require("./routes/employeeRoutes");
const checkAndCreateFields = require("./utils/checkAndCreateFields");

const app = express();
const PORT = process.env.PORT || 3000;

// Middleware
app.use(cors());
app.use(bodyParser.json());
app.use(morgan("dev"));
// Ensure all required fields exist
checkAndCreateFields();
// Routes
app.use("/api", employeeRoutes);

// Error handling
app.use((err, req, res, next) => {
  console.error(err.stack);
  res.status(500).send("Something went wrong!");
});

app.listen(PORT, () => {
  console.log(`Server is running on http://localhost:${PORT}`);
});
