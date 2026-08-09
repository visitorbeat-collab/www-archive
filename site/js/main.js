/* WORLD WIDE WASTE — shared site JavaScript */

document.addEventListener("DOMContentLoaded", () => {
  console.log("Recovered index initialized.");

  const form = document.querySelector("[data-password-form]");
  if (!form) return;

  form.addEventListener("submit", (event) => {
    event.preventDefault();

    const input = form.querySelector("[data-password-input]");
    const status = document.querySelector("#password-status");

    // Placeholder only.
    // The real password logic will be added after the puzzle is finalized.
    if (status) {
      status.textContent = "Authentication unavailable.";
    }

    if (input) {
      input.value = "";
    }
  });
});
