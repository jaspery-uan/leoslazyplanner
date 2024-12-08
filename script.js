document.addEventListener("DOMContentLoaded", () => {
    // Select the form element
    const form = document.getElementById("planning-form");
  
    // Add a submit event listener to the form
    form.addEventListener("submit", (event) => {
      event.preventDefault(); // Prevent default form submission (page reload)
  
      // Gather form data
      const formData = new FormData(form);
      const data = {
        effort: formData.get("effort"),
        price: formData.get("price"),
        duration: formData.get("duration"),
        location: formData.get("location"),
        riskFactors: formData.getAll("risk-factors"), // Collect all selected checkboxes
      };
  
      console.log("Form Data Submitted:", data); // Debugging log
  
      // Example: Sending data to a backend API to write into CSV
      sendToBackend(data);
    });
  });
  
  /**
   * Function to send data to a backend for CSV storage.
   * Replace the placeholder with actual API logic.
   * @param {Object} data - Form data to be sent.
   */
  async function sendToBackend(data) {
    try {
      const response = await fetch("/save-to-csv", {
        method: "POST",
        headers: {
          "Content-Type": "application/json",
        },
        body: JSON.stringify(data), // Convert data to JSON string
      });
  
      if (response.ok) {
        const result = await response.json();
        console.log("Successfully saved to CSV:", result);
        alert("Your hangout plan has been saved!");
      } else {
        console.error("Error saving to CSV:", response.statusText);
        alert("Failed to save your plan. Please try again.");
      }
    } catch (error) {
      console.error("Error:", error);
      alert("Error connecting to the server. Please check your network or API.");
    }
  }
  