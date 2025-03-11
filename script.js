document.addEventListener("DOMContentLoaded", function () {
    console.log("PlantMama script loaded successfully.");
});

// Function to simulate plant identification (mock AI response)
function identifyPlant() {
    let fileInput = document.getElementById("fileInput");
    let plantResult = document.getElementById("plantResult");

    if (fileInput.files.length > 0) {
        plantResult.innerText = "Analyzing image...";
        setTimeout(() => {
            plantResult.innerText = "Identified Plant: Aloe Vera - Requires bright, indirect sunlight and minimal watering.";
        }, 2000);
    } else {
        plantResult.innerText = "Please upload an image first.";
    }
}

// Function to handle chatbot interaction
function sendMessage() {
    let userInput = document.getElementById("userInput");
    let chatMessages = document.getElementById("chatMessages");
    let message = userInput.value.trim();

    if (message !== "") {
        let userMessage = document.createElement("p");
        userMessage.innerHTML = `<strong>You:</strong> ${message}`;
        chatMessages.appendChild(userMessage);

        setTimeout(() => {
            let botMessage = document.createElement("p");
            botMessage.innerHTML = `<strong>Bot:</strong> ${getBotResponse(message)}`;
            chatMessages.appendChild(botMessage);

            chatMessages.scrollTop = chatMessages.scrollHeight;
        }, 1000);

        userInput.value = "";
    }
}

// Function to generate chatbot responses
function getBotResponse(message) {
    message = message.toLowerCase();
    if (message.includes("watering")) {
        return "Most plants need watering once a week. Check specific plant needs.";
    } else if (message.includes("sunlight")) {
        return "Plants like succulents need bright light, while ferns prefer shade.";
    } else if (message.includes("fertilizer")) {
        return "Use a balanced fertilizer once a month for healthy growth.";
    } else {
        return "I'm still learning! Check our plant guide for more details.";
    }
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
