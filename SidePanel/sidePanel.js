const GEMINI_API_KEY = ""; //Insert API key here
const GEMINI_API_URL = `https://generativelanguage.googleapis.com/v1beta/models/gemini-pro:generateContent?key=${GEMINI_API_KEY}`;

let history = ""; 

document.getElementById("input-box").addEventListener("keydown", (event) => {
  
  if (event.key === "Enter") {
    event.preventDefault();

    let input = document.getElementById("input-box").value; //extract input
    console.log(input); //this is the user input

    history += (input + "\n");
    let questionContainer = document.createElement("div");
    let body = document.getElementById("body");
    questionContainer.textContent = input;
    questionContainer.setAttribute("id", "input-for-chatbox");
    body.appendChild(questionContainer);
    body.scrollTop = body.scrollHeight;
    
    console.log(body.textContent + " " + input);

    fetch(GEMINI_API_URL, {
      method: "POST",
      body: JSON.stringify({
        contents: [
          {
            parts: [
              {
                text: history,
              },
            ],
          },
        ],
      }),
    })
      .then((response) => {
        return response.json();
      })
      .then((result) => {
        let response = result["candidates"][0]["content"]["parts"][0]["text"];
        console.log(response);
        history += (response + "\n");
        let responseContainer = document.createElement("div");
        responseContainer.setAttribute("id", "output-for-chatbox");
        responseContainer.textContent = response;
        body.appendChild(responseContainer);
        body.scrollTop = body.scrollHeight; //scroll to bottom when the question 
      })
      .catch((error) => {
        console.log("Error: " + error);
      });

    document.getElementById("input-box").value = "";
  }

document.addEventListener('mouseup', function() {
  let selectedText = getSelectedText();
  if (selectedText.length > 0) { // Check if there's any selected text
    document.getElementById('input-box').value = selectedText; // Set the input box value to the selected text
  }
});

function getSelectedText() {
  if (window.getSelection) {
    return window.getSelection().toString();
  } else if (document.selection && document.selection.type !== "Control") {
    return document.selection.createRange().text;
  }
  return "";
}

document.addEventListener('mousedown', function() {
  window.getSelection().removeAllRanges();
});



});
