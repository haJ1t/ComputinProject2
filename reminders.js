document.addEventListener("DOMContentLoaded", function () {
    const form = document.getElementById("reminderForm");
    const reminderList = document.getElementById("reminderList");
  
    loadReminders();
  
    form.addEventListener("submit", function (e) {
      e.preventDefault();
  
      const plantName = document.getElementById("plantName").value;
      const frequency = parseInt(document.getElementById("frequency").value);
      const lastWatered = document.getElementById("lastWatered").value;
  
      const reminder = {
        plantName,
        frequency,
        lastWatered,
        nextWater: calculateNextDate(lastWatered, frequency)
      };
  
      saveReminder(reminder);
      form.reset();
      loadReminders();
    });
  
    function calculateNextDate(dateStr, freq) {
      const date = new Date(dateStr);
      date.setDate(date.getDate() + freq);
      return date.toISOString().split("T")[0];
    }
  
    function saveReminder(reminder) {
      let reminders = JSON.parse(localStorage.getItem("plantReminders")) || [];
      reminders.push(reminder);
      localStorage.setItem("plantReminders", JSON.stringify(reminders));
    }
  
    function loadReminders() {
      reminderList.innerHTML = "";
      const reminders = JSON.parse(localStorage.getItem("plantReminders")) || [];
  
      if (reminders.length === 0) {
        reminderList.innerHTML = "<p>No reminders set yet.</p>";
        return;
      }
  
      reminders.forEach(reminder => {
        const div = document.createElement("div");
        div.innerHTML = `
          <strong>${reminder.plantName}</strong><br>
          Next watering: <em>${reminder.nextWater}</em><br>
          Frequency: every ${reminder.frequency} day(s)<br>
          Last watered: ${reminder.lastWatered}
          <hr>
        `;
        reminderList.appendChild(div);
      });
    }
  });