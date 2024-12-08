const express = require("express");
const axios = require("axios");
const path = require("path");
const app = express();

app.use(express.static(path.join(__dirname, "public")));
app.use(express.json());

// API Route for Chatbot
app.post("/api/chat", async (req, res) => {
  const { prompt } = req.body;

  if (!prompt) {
    return res.status(400).json({ error: "Prompt is required" });
  }

  try {
    // Fetch response from external API
    const apiResponse = await axios.get(
      `https://kaiz-apis.gleeze.com/api/claude-sonnet-3.5?q=${encodeURIComponent(prompt)}&uid=08062005`
    );

    if (apiResponse.data && apiResponse.data.response) {
      res.json({ response: apiResponse.data.response });
    } else {
      res.status(500).json({ error: "Invalid response from external API." });
    }
  } catch (error) {
    console.error("Error fetching API response:", error.message);
    res.status(500).json({ error: "Failed to fetch response from API." });
  }
});

// Serve HTML file
app.get("/", (req, res) => {
  res.sendFile(path.join(__dirname, "public", "index.html"));
});

// Start Server
const PORT = process.env.PORT || 3000;
app.listen(PORT, () => {
  console.log(`Server is running on http://localhost:${PORT}`);
});
