/* chatbot.js */
document.addEventListener("DOMContentLoaded", function () {
    console.log("Chatbot script loaded successfully.");
});

// Function to handle chatbot interaction
function sendMessage() {
    let userInput = document.getElementById("userInput");
    let chatMessages = document.getElementById("chatMessages");
    let message = userInput.value.trim();

    if (message !== "") {
        let userMessage = document.createElement("p");
        userMessage.innerHTML = `<strong>You:</strong> ${message}`;
        chatMessages.appendChild(userMessage);

        chatMessages.scrollTop = chatMessages.scrollHeight;

        fetchChatbotResponse(message);
        userInput.value = "";
    }
}

// Function to call the chatbot API
function fetchChatbotResponse(userMessage) {
    let chatMessages = document.getElementById("chatMessages");

    fetch("https://api.example.com/chatbot", { // Replace with your actual API URL
        method: "POST",
        headers: {
            "Content-Type": "application/json"
        },
        body: JSON.stringify({ message: userMessage })
    })
    .then(response => response.json())
    .then(data => {
        let botMessage = document.createElement("p");
        botMessage.innerHTML = `<strong>Bot:</strong> ${data.response}`;
        chatMessages.appendChild(botMessage);
        chatMessages.scrollTop = chatMessages.scrollHeight;
    })
    .catch(error => {
        console.error("Error fetching chatbot response:", error);
        let botMessage = document.createElement("p");
        botMessage.innerHTML = `<strong>Bot:</strong> Sorry, I encountered an issue. Please try again later.`;
        chatMessages.appendChild(botMessage);
    });
}

// Enable Enter key functionality in chatbot input
let userInputField = document.getElementById("userInput");
if (userInputField) {
    userInputField.addEventListener("keypress", function (event) {
        if (event.key === "Enter") {
            sendMessage();
        }
    });
}