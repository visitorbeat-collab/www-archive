/* WORLD WIDE WASTE — THE INDEX — V3 */

document.addEventListener("DOMContentLoaded", () => {
  const form = document.querySelector("[data-password-form]");
  if (!form) return;

  form.addEventListener("submit", (event) => {
    event.preventDefault();

    const input = form.querySelector("[data-password-input]");
    const status = document.querySelector("#password-status");

    // Placeholder only. Final puzzle authentication will be added later.
    if (status) status.textContent = "authentication unavailable";

    document.body.classList.add("threshold-entering");

    window.setTimeout(() => {
      document.body.classList.remove("threshold-entering");
      if (input) input.value = "";
    }, 250);
  });
});
