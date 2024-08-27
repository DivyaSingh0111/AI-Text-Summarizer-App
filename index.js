const express = require('express');
const cors = require('cors'); // Include CORS middleware
const app = express();
const port = process.env.PORT || 3000; // Use environment variable for port
const summarizeText = require('./summarize.js');
require('dotenv').config(); // Load environment variables from .env file

app.use(express.json());
app.use(express.static('public'));
app.use(cors()); // Enable CORS if needed

app.post('/summarize', async (req, res) => {
  const text = req.body.text_to_summarize;
  try {
    const summary = await summarizeText(text); // Await the result of summarizeText
    res.send(summary); // Send the summary text to the client
  } catch (error) {
    console.error('Error summarizing text:', error.message || error);
    res.status(500).send("An error occurred while summarizing the text.");
  }
});

app.listen(port, () => {
  console.log(`Server running at http://localhost:${port}/`);
});
