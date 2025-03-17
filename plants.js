/* plants.js */

document.addEventListener("DOMContentLoaded", function () {
    fetch("./plants.json")  // Ensure the correct path
        .then(response => {
            if (!response.ok) {
                throw new Error("Failed to load plants.json");
            }
            return response.json();
        })
        .then(data => {
            console.log("Loaded plant data:", data); // Debugging log

            const plantsGrid = document.getElementById("plantsGrid");
            plantsGrid.innerHTML = "";  // Clear any existing content

            data.forEach(plant => {
                let plantCard = document.createElement("a");
                plantCard.href = `plant-details.html?id=${plant.id}`;
                plantCard.classList.add("plant-card");

                plantCard.innerHTML = `
                    <img src="${plant.image}" alt="${plant.name}">
                    <h3>${plant.name}</h3>
                `;

                plantsGrid.appendChild(plantCard);
            });
        })
        .catch(error => {
            console.error("Error loading plant data:", error);
            document.getElementById("plantsGrid").innerHTML = `<p style="color:red;">Failed to load plant data.</p>`;
        });
});