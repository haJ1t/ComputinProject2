document.addEventListener("DOMContentLoaded", function () {
    const form = document.getElementById("journalForm");
    const logList = document.getElementById("logList");
  
    loadLogs();
  
    form.addEventListener("submit", function (e) {
      e.preventDefault();
  
      const plant = document.getElementById("plantSelect").value;
      const date = document.getElementById("logDate").value;
      const notes = document.getElementById("notes").value;
      const photoInput = document.getElementById("photo");
  
      const reader = new FileReader();
  
      reader.onload = function (e) {
        const photo = photoInput.files.length > 0 ? e.target.result : null;
  
        const entry = {
          plant,
          date,
          notes,
          photo
        };
  
        saveEntry(entry);
        form.reset();
        loadLogs();
      };
  
      if (photoInput.files.length > 0) {
        reader.readAsDataURL(photoInput.files[0]);
      } else {
        reader.onload(); // still create entry if no image
      }
    });
  
    function saveEntry(entry) {
      let logs = JSON.parse(localStorage.getItem("plantLogs")) || [];
      logs.push(entry);
      localStorage.setItem("plantLogs", JSON.stringify(logs));
    }
  
    function loadLogs() {
      logList.innerHTML = "";
      let logs = JSON.parse(localStorage.getItem("plantLogs")) || [];
  
      if (logs.length === 0) {
        logList.innerHTML = "<p>No logs yet.</p>";
        return;
      }
  
      logs.reverse().forEach(entry => {
        const div = document.createElement("div");
        div.classList.add("log-entry");
  
        div.innerHTML = `
          <strong>${entry.plant}</strong> - <em>${entry.date}</em><br>
          <p>${entry.notes}</p>
          ${entry.photo ? `<img src="${entry.photo}" alt="Plant photo">` : ""}
          <hr>
        `;
  
        logList.appendChild(div);
      });
    }
  });