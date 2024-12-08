const express = require("express");
const fs = require("fs");
const path = require("path");
const bodyParser = require("body-parser");

const app = express();
const port = 3000;

// Middleware to parse incoming JSON requests
app.use(bodyParser.json());

// Endpoint to handle form submissions and save to CSV
app.post("/save-to-csv", (req, res) => {
  const { effort, price, duration, location, riskFactors } = req.body;

  // Format risk factors as a comma-separated string
  const riskFactorsFormatted = riskFactors.join(", ");

  // Format the data for CSV
  const csvData = `${effort}, ${price}, ${duration}, ${location}, ${riskFactorsFormatted}\n`;

  // Path to the CSV file
  const filePath = path.join(__dirname, "hangout_plans.csv");

  // Check if the file exists, if not, write the header
  if (!fs.existsSync(filePath)) {
    const header = "effort, price, duration, location, risk_factors\n";
    fs.writeFileSync(filePath, header); // Write header only once
  }

  // Append the data to the CSV file
  fs.appendFile(filePath, csvData, (err) => {
    if (err) {
      console.error("Error saving to CSV:", err);
      return res.status(500).json({ message: "Error saving to CSV." });
    }
    console.log("Data saved to CSV:", csvData);
    res.status(200).json({ message: "Data saved successfully!" });
  });
});

// Serve the form HTML (you can replace this with your actual HTML file serving)
app.use(express.static('public'));

// Start the server
app.listen(port, () => {
  console.log(`Server is running at http://localhost:${port}`);
});
