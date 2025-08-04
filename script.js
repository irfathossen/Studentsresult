const scriptURL = "https://script.google.com/macros/s/AKfycbzugMgtUbOWIRwSK7ttD7j-oqGehuFxMCyWSUuMP0GqarZybZgzjZX7jT1L4CrfhQQLWA/exec";

document.getElementById("login-form").addEventListener("submit", function (e) {
  e.preventDefault();
  const roll = document.getElementById("roll").value;
  const studentClass = document.getElementById("class").value;

  fetch(`${scriptURL}?roll=${roll}&class=${studentClass}`)
    .then((res) => res.json())
    .then((data) => {
      if (data.success) {
        document.getElementById("login-container").style.display = "none";
        document.getElementById("result-container").style.display = "block";
        renderResult(data);
      } else {
        alert("Result not found. Please check your information.");
      }
    })
    .catch(() => alert("Error fetching result."));
});

function renderResult(data) {
  const result = data.result;
  const resultDiv = document.getElementById("result-card");
  resultDiv.innerHTML = `
    <h2 style="text-align:center;">Student Result</h2>
    <p><strong>Name:</strong> ${result.name}</p>
    <p><strong>Father Name:</strong> ${result.father}</p>
    <p><strong>Institute:</strong> ${result.institute}</p>
    <p><strong>Roll:</strong> ${result.roll}</p>
    <p><strong>Class:</strong> ${result.class}</p>
    <p><strong>Gender:</strong> ${result.gender}</p>
    <p><strong>Date:</strong> ${result.date}</p>
    <h3>Marks</h3>
    <table style="width:100%;border-collapse:collapse;" border="1">
      <tr><th>Subject</th><th>Marks</th></tr>
      ${result.subjects.map(sub => `<tr><td>${sub.name}</td><td>${sub.marks}</td></tr>`).join("")}
    </table>
    <p style="margin-top:30px;">Congratulations! We hope you are happy with your result. Wishing you a bright future.</p>
    <div style="display:flex;justify-content:space-between;margin-top:50px;">
      <span>Controller of Examination</span>
      <span>Institute Seal</span>
    </div>
  `;
}

function toggleMenu() {
  const menu = document.getElementById("dropdownMenu");
  menu.style.display = menu.style.display === "block" ? "none" : "block";
}

function backToLogin() {
  document.getElementById("result-container").style.display = "none";
  document.getElementById("login-container").style.display = "block";
  document.getElementById("login-form").reset();
}

function downloadResult() {
  const resultHTML = document.getElementById("result-card").outerHTML;
  const blob = new Blob([resultHTML], { type: "text/html" });
  const a = document.createElement("a");
  a.href = URL.createObjectURL(blob);
  a.download = "student-result.html";
  a.click();
}
