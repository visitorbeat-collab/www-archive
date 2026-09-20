const RESTRICTED_DISCOVERY_KEY = "observation-index-restricted-discovered";
const TIMELINE_DISCOVERY_KEY = "observation-index-timeline-discovered";


function restrictedBoundaryIsDiscovered() {
  try {
    return window.localStorage.getItem(RESTRICTED_DISCOVERY_KEY) === "true";
  } catch (error) {
    return false;
  }
}


function timelineIsDiscovered() {
  try {
    return (
      window.localStorage.getItem(TIMELINE_DISCOVERY_KEY) === "true" ||
      window.localStorage.getItem(RESTRICTED_DISCOVERY_KEY) === "true"
    );
  } catch (error) {
    return false;
  }
}


if (document.querySelector("[data-timeline-discovery-trigger]")) {
  try {
    window.localStorage.setItem(TIMELINE_DISCOVERY_KEY, "true");
  } catch (error) {
    // The narrative remains readable when storage is unavailable.
  }
}


const restrictedDiscovered = restrictedBoundaryIsDiscovered();
const timelineDiscovered = timelineIsDiscovered();


if (restrictedDiscovered || timelineDiscovered) {
  document.querySelectorAll("[data-system-status]").forEach(section => {
    section.hidden = false;
  });
}


if (restrictedDiscovered) {
  document.querySelectorAll("[data-restricted-discovery]").forEach(entry => {
    entry.hidden = false;
  });
}


if (timelineDiscovered) {
  document.querySelectorAll("[data-timeline-discovery]").forEach(entry => {
    entry.hidden = false;
  });
}
