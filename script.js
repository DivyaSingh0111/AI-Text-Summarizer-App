const textArea = document.getElementById("text_to_summarize");
const submitButton = document.getElementById("submit-button");
const summarizedTextArea = document.getElementById("summary");

textArea.addEventListener("input", verifyTextLength);
submitButton.addEventListener("click", submitData);

// Disable submit button by default when the user loads the website.
submitButton.disabled = true;

// Function to verify text length in the textarea
function verifyTextLength(e) {
  const textarea = e.target;
  if (textarea.value.length > 200 && textarea.value.length < 100000) {
    submitButton.disabled = false;
  } else {
    submitButton.disabled = true;
  }
}

function submitData(e) {
  // Add loading animation to the submit button
  submitButton.classList.add("submit-button--loading");

  const text_to_summarize = textArea.value;

  // Make a POST request to your backend route /summarize
  fetch('/summarize', {
    method: 'POST',
    headers: {
      'Content-Type': 'application/json',
    },
    body: JSON.stringify({ text_to_summarize: text_to_summarize }),
  })
  .then(response => response.text()) // Get summarized text from the response
  .then(summary => {
    // Update the output text area with the summary
    summarizedTextArea.value = summary;

    // Remove the loading animation from the button
    submitButton.classList.remove("submit-button--loading");
  })
  .catch(error => {
    console.log('Error:', error.message);
  });
}
