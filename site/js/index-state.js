const RESTRICTED_DISCOVERY_KEY = "observation-index-restricted-discovered";


function restrictedBoundaryIsDiscovered() {
  try {
    return window.localStorage.getItem(RESTRICTED_DISCOVERY_KEY) === "true";
  } catch (error) {
    return false;
  }
}


if (restrictedBoundaryIsDiscovered()) {
  document.querySelectorAll("[data-restricted-discovery]").forEach(entry => {
    entry.hidden = false;
  });
}
