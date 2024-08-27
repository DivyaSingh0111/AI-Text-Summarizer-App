require('dotenv').config(); // Ensure this is at the top

const axios = require('axios');

// Function to summarize text using Hugging Face API
async function summarizeText(text) {
  const data = JSON.stringify({
    "inputs": text,
    "parameters": {
      "max_length": 100,
      "min_length": 30
    }
  });

  const config = {
    method: 'post',
    maxBodyLength: Infinity,
    url: 'https://api-inference.huggingface.co/models/facebook/bart-large-cnn',
    headers: { 
      'Content-Type': 'application/json',
      'Authorization': 'Bearer ' + process.env.HUGGING_FACE_API_KEY
    },
    data: data
  };

  try {
    const response = await axios.request(config);
    return response.data[0].summary_text;
  } catch (error) {
    console.error('Error in summarizeText:', error.message || error);
    throw new Error('Failed to summarize text');
  }
}

module.exports = summarizeText;
