// dark mode start
const html = document.documentElement;
const btn = document.getElementById("toggleTheme");

// Set a default theme if none is saved
if (!localStorage.getItem("theme")) {
  localStorage.setItem("theme", "light");
}

html.setAttribute("data-bs-theme", localStorage.getItem("theme"));

btn.addEventListener("click", () => {
  const currentTheme = html.getAttribute("data-bs-theme");
  if (currentTheme === "light") {
    html.setAttribute("data-bs-theme", "dark");
    localStorage.setItem("theme", "dark");
  } else {
    html.setAttribute("data-bs-theme", "light");
    localStorage.setItem("theme", "light");
  }
});
// dark mode end

// logout start
let logOutButton = document.querySelector("#logBtn");
logOutButton.addEventListener("click", (e) => {
  window.location.href = "./index.html";
});
// logout end

document.addEventListener("DOMContentLoaded", () => {
  const form = document.getElementById("settingsForm");
  const weekdays = [
    "sunday",
    "monday",
    "tuesday",
    "wednesday",
    "thursday",
    "friday",
    "saturday",
  ];

  const savedSettings =
    JSON.parse(localStorage.getItem("setting system")) || {};

  if (Object.keys(savedSettings).length > 0) {
    document.getElementById("late").value = savedSettings.late || 10;
    document.getElementById("absent").value = savedSettings.absent || 100;
    document.getElementById("bonus").value = savedSettings.bonus || 5;
    document.getElementById("leave").value = savedSettings.leave || 50;

    weekdays.forEach((day) => {
      document.getElementById(day).checked =
        savedSettings.workweek?.includes(day) ?? false;
    });
  }

  form.addEventListener("submit", (e) => {
    e.preventDefault();

    const settings = {
      late: parseFloat(document.getElementById("late").value),
      absent: parseFloat(document.getElementById("absent").value),
      bonus: parseFloat(document.getElementById("bonus").value),
      leave: parseFloat(document.getElementById("leave").value),
      workweek: [],
    };

    weekdays.forEach((day) => {
      if (document.getElementById(day).checked) {
        settings.workweek.push(day);
      }
    });

    localStorage.setItem("setting system", JSON.stringify(settings));

    alert("Settings saved successfully!");
  });
});
