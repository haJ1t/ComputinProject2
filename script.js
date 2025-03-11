document.addEventListener("DOMContentLoaded", function() {
    console.log("PlantMama script loaded");
});

function identifyPlant() {
    let fileInput = document.getElementById("fileInput");
    let plantResult = document.getElementById("plantResult");

    if (fileInput.files.length > 0) {
        plantResult.innerText = "Processing image... (Mock AI Response: Tomato Plant)";
        setTimeout(() => {
            plantResult.innerText = "Identified Plant: Tomato Plant - Requires moderate sunlight and weekly watering.";
        }, 2000);
    } else {
        plantResult.innerText = "Please upload an image first.";
    }
}

function sendMessage() {
    let userInput = document.getElementById("userInput");
    let chatMessages = document.getElementById("chatMessages");

    if (userInput.value.trim() !== "") {
        let userMessage = `<p><strong>You:</strong> ${userInput.value}</p>`;
        chatMessages.innerHTML += userMessage;

        setTimeout(() => {
            let botMessage = `<p><strong>Bot:</strong> Here's some care advice for your plant!</p>`;
            chatMessages.innerHTML += botMessage;
        }, 1000);

        userInput.value = "";
    }
}
