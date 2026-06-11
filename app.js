const form = document.querySelector("#screening-form");
const regimenInput = document.querySelector("#regimen");
const runButton = document.querySelector("#run-button");
const statusMessage = document.querySelector("#status");
const reportOutput = document.querySelector("#report");

function setStatus(message, isError = false) {
  statusMessage.textContent = message;
  statusMessage.classList.toggle("error", isError);
}

form.addEventListener("submit", async (event) => {
  event.preventDefault();

  const regimen = regimenInput.value.trim();
  if (!regimen) {
    setStatus("Please enter a treatment regimen or active compounds to screen.", true);
    return;
  }

  runButton.disabled = true;
  runButton.textContent = "Screening pharmacology profile...";
  reportOutput.textContent = "";
  setStatus("Connecting to the secure AI screening endpoint...");

  try {
    const response = await fetch("/api/screen", {
      method: "POST",
      headers: {
        "Content-Type": "application/json"
      },
      body: JSON.stringify({ regimen })
    });

    const data = await response.json().catch(() => ({}));

    if (!response.ok) {
      throw new Error(data.error || "Unable to complete pharmacological screening.");
    }

    reportOutput.textContent = data.report;
    setStatus("Screening complete. Review the AI output with clinical judgment.");
  } catch (error) {
    setStatus(
      error.message ||
        "Network connection unavailable or AI service unreachable. Please try again later.",
      true
    );
  } finally {
    runButton.disabled = false;
    runButton.textContent = "⚡ Run Pharmacological Screening";
  }
});
