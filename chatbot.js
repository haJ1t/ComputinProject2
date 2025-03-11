document.addEventListener("DOMContentLoaded", function () {
    console.log("Plant Care Chatbot Loaded.");
});

// Function to handle chatbot interaction
function sendMessage() {
    let userInput = document.getElementById("userInput");
    let chatMessages = document.getElementById("chatMessages");
    let message = userInput.value.trim();

    if (message !== "") {
        appendMessage("You", message);

        // Show "Bot is typing..." indicator
        let botTyping = document.createElement("p");
        botTyping.innerHTML = `<strong>Bot:</strong> <em>Typing...</em>`;
        botTyping.id = "botTyping";
        chatMessages.appendChild(botTyping);
        chatMessages.scrollTop = chatMessages.scrollHeight;

        fetchPlantCareInfo(message);
        userInput.value = "";
    }
}

// Function to append messages to the chat window
function appendMessage(sender, message) {
    let chatMessages = document.getElementById("chatMessages");
    let newMessage = document.createElement("p");
    newMessage.innerHTML = `<strong>${sender}:</strong> ${message}`;
    chatMessages.appendChild(newMessage);
    chatMessages.scrollTop = chatMessages.scrollHeight;
}

// Function to fetch plant care details from Perenual API
function fetchPlantCareInfo(userMessage) {
    let plantName = extractPlantName(userMessage);
    let apiKey = "sk-jWLV67cf9e4c88af88984";  // Make sure this is correct

    if (!plantName || plantName.length < 2) {
        document.getElementById("botTyping").remove();
        appendMessage("Bot", "I'm not sure which plant you're asking about. Try something like: 'How do I take care of a Monstera?'");
        return;
    }

    let apiUrl = `https://perenual.com/api/species-list?key=${apiKey}&q=${encodeURIComponent(plantName)}`;

    console.log(`Fetching API: ${apiUrl}`);

    fetch(apiUrl, { method: "GET", headers: { "Content-Type": "application/json" } })
    .then(response => response.json())
    .then(data => {
        console.log("API Response:", data);

        document.getElementById("botTyping").remove();

        if (data && data.data && data.data.length > 0) {
            let plant = data.data[0];

            if (plant.watering && plant.watering.includes("Upgrade Plans")) {
                appendMessage("Bot", `⚠️ Sorry, detailed care information for "${plantName}" requires a premium API subscription.`);
                return;
            }

            let responseMessage = `🌱 *${plant.common_name || plant.scientific_name}* Care Guide:\n- *Watering:* ${plant.watering || "Not available"}\n- *Sunlight:* ${Array.isArray(plant.sunlight) ? plant.sunlight.join(", ") : plant.sunlight || "Not available"}\n- *Other Info:* ${plant.care_level || "Not available"}`;

            appendMessage("Bot", responseMessage);
        } else {
            appendMessage("Bot", `I couldn't find care information for "${plantName}". Try another plant.`);
        }
    })
    .catch(error => {
        console.error("Error fetching plant care info:", error);
        document.getElementById("botTyping").remove();
        appendMessage("Bot", "Sorry, I couldn't retrieve plant care details. Please try again later.");
    });
}

// Function to extract plant name from user message
function extractPlantName(message) {
    let lowerMessage = message.toLowerCase();
    let removeWords = [
        "how do i take care of", "how often should i water", "what kind of sunlight does",
        "does", "need", "should i", "water", "care", "light", "?"
    ];
    removeWords.forEach(word => {
        lowerMessage = lowerMessage.replace(word, "").trim();
    });
    return lowerMessage;
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