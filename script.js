/* script.js */

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