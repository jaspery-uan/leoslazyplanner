const express = require("express");
const fs = require("fs");
const path = require("path");

const app = express();
const PORT = 3000;

// Middleware to parse JSON requests
app.use(express.json());

// Route to handle CSV saving
app.post("/save-to-csv", (req, res) => {
  const data = req.body;

  // Prepare data for CSV
  const csvData = [
    data.effort,
    data.price,
    data.duration,
    data.location,
    data.riskFactors.join(";"), // Combine multiple checkboxes into a semicolon-separated string
  ].join(",") + "\n";

  // Path to CSV file
  const csvFilePath = path.join(__dirname, "hangout-plans.csv");

  // Write data to CSV file (append mode)
  fs.appendFile(csvFilePath, csvData, (err) => {
    if (err) {
      console.error("Error writing to CSV:", err);
      return res.status(500).json({ error: "Failed to save data" });
    }
    console.log("Data successfully written to CSV");
    res.status(200).json({ message: "Data saved successfully" });
  });
});

// Start server
app.listen(PORT, () => {
  console.log(`Server running on http://localhost:${PORT}`);
});
