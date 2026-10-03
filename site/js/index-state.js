const RESTRICTED_DISCOVERY_KEY = "observation-index-restricted-discovered";
const TIMELINE_DISCOVERY_KEY = "observation-index-timeline-discovered";
const INDEX_ENTRY_SEEN_KEY = "observation-index-entry-seen";


const indexEntry = document.querySelector("[data-index-entry]");
const indexContent = document.querySelector("#index-content");
const indexEntryOpen = document.querySelector("[data-index-entry-open]");
const indexEntryReopen = document.querySelector("[data-index-entry-reopen]");

let entryReturnFocus = null;


function indexEntryHasBeenSeen() {
  try {
    return window.localStorage.getItem(INDEX_ENTRY_SEEN_KEY) === "true";
  } catch (error) {
    return false;
  }
}


function rememberIndexEntry() {
  try {
    window.localStorage.setItem(INDEX_ENTRY_SEEN_KEY, "true");
  } catch (error) {
    // The entrance remains functional when storage is unavailable.
  }
}


function showIndexEntry({ restoreFocus = false } = {}) {
  if (!indexEntry || !indexEntryOpen) {
    return;
  }

  entryReturnFocus = restoreFocus
    ? document.activeElement
    : null;

  indexEntry.classList.remove("is-closing");
  indexEntry.hidden = false;
  document.documentElement.classList.remove("index-entry-pending");
  document.body.classList.add("index-entry-active");

  if (indexContent) {
    indexContent.inert = true;
  }

  window.requestAnimationFrame(() => {
    indexEntryOpen.focus();
  });
}


function hideIndexEntry() {
  if (!indexEntry) {
    return;
  }

  rememberIndexEntry();
  indexEntry.classList.add("is-closing");

  if (indexContent) {
    indexContent.inert = false;
  }

  const reducedMotion = window.matchMedia(
    "(prefers-reduced-motion: reduce)"
  ).matches;

  window.setTimeout(() => {
    indexEntry.hidden = true;
    indexEntry.classList.remove("is-closing");
    document.documentElement.classList.remove("index-entry-pending");
    document.body.classList.remove("index-entry-active");

    if (entryReturnFocus instanceof HTMLElement) {
      entryReturnFocus.focus();
    }

    entryReturnFocus = null;
  }, reducedMotion ? 0 : 650);
}


if (indexEntryOpen) {
  indexEntryOpen.addEventListener("click", hideIndexEntry);
}


if (indexEntryReopen) {
  indexEntryReopen.addEventListener("click", () => {
    showIndexEntry({ restoreFocus: true });
  });
}


document.addEventListener("keydown", event => {
  if (
    event.key === "Escape" &&
    indexEntry &&
    !indexEntry.hidden
  ) {
    hideIndexEntry();
  }
});


if (!indexEntryHasBeenSeen()) {
  showIndexEntry();
}


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
