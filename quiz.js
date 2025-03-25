document.addEventListener("DOMContentLoaded", function () {
    const form = document.getElementById("quizForm");
    const resultBox = document.getElementById("quizResult");
  
    form.addEventListener("submit", function (e) {
      e.preventDefault();
  
      const light = document.getElementById("light").value;
      const water = document.getElementById("water").value;
      const pets = document.getElementById("pets").value;
      const experience = document.getElementById("experience").value;
  
      const recommendation = getRecommendation(light, water, pets, experience);
  
      resultBox.innerHTML = `
        <h3>Your Recommended Plant:</h3>
        <p><strong>${recommendation.name}</strong></p>
        <img src="${recommendation.image}" alt="${recommendation.name}" style="width: 100%; max-width: 250px; border-radius: 12px;">
        <p>${recommendation.description}</p>
      `;
    });
  
    function getRecommendation(light, water, pets, experience) {
      // Simplified logic
      if (pets === "yes") {
        return {
          name: "Spider Plant",
          image: "images/spider-plant.jpg",
          description: "Pet-friendly and beginner-friendly. Tolerates low to medium light and infrequent watering."
        };
      }
  
      if (light === "low" && water === "rarely") {
        return {
          name: "Snake Plant",
          image: "images/snake-plant.jpg",
          description: "Perfect for low-light homes. Needs watering only once a month."
        };
      }
  
      if (light === "high" && water === "often" && experience !== "beginner") {
        return {
          name: "Fiddle Leaf Fig",
          image: "images/fiddle-leaf.jpg",
          description: "Loves sun and humidity. Great for experienced plant parents."
        };
      }
  
      return {
        name: "Pothos",
        image: "images/pothos.jpg",
        description: "Flexible with light and water, grows fast, and great for all skill levels."
      };
    }
  });