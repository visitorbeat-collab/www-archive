(() => {
  const storageKey = "restricted-map-visited";

  const nodes = document.querySelectorAll(".concept-node");
  const relationDisplay = document.querySelector(".relation-display");
  const relationText = document.querySelector(".relation-display-text");

  if (!nodes.length) {
    return;
  }

  function getVisitedNodes() {
    try {
      const stored = localStorage.getItem(storageKey);

      if (!stored) {
        return [];
      }

      const parsed = JSON.parse(stored);

      return Array.isArray(parsed) ? parsed : [];
    } catch {
      return [];
    }
  }

  function saveVisitedNode(nodeId) {
    if (!nodeId) {
      return;
    }

    const visited = getVisitedNodes();

    if (!visited.includes(nodeId)) {
      visited.push(nodeId);
    }

    try {
      localStorage.setItem(
        storageKey,
        JSON.stringify(visited)
      );
    } catch {
      /* localStorage unavailable */
    }
  }

  function applyVisitedState() {
    const visited = getVisitedNodes();

    nodes.forEach((node) => {
      const nodeId = node.dataset.nodeId;
      const symbol = node.querySelector(".node-symbol");

if (visited.includes(nodeId)) {
  node.classList.add("is-visited");

  if (symbol) {
    const current = symbol.textContent.trim();

    if (current === "○") {
      symbol.textContent = "◉";
    }

    if (current === "◇") {
      symbol.textContent = "◆";
    }
  }

} else {
  node.classList.remove("is-visited");

  if (symbol) {
    const current = symbol.textContent.trim();

    if (current === "◉") {
      symbol.textContent = "○";
    }

    if (current === "◆") {
      symbol.textContent = "◇";
    }
  }
};
  }

  function revealSecondaryRelations() {
    const visited = getVisitedNodes();

    const exposureRetention =
      document.getElementById("relation-exposure-retention");

    if (!exposureRetention) {
      return;
    }

    const shouldReveal =
      visited.includes("exposure") &&
      visited.includes("retention");

    exposureRetention.classList.toggle(
      "is-revealed",
      shouldReveal
    );
  }

  function refreshMap() {
    applyVisitedState();
    revealSecondaryRelations();
  }

  function showRelation(node) {
    if (!relationDisplay || !relationText) {
      return;
    }

    const relation = node.dataset.relation;

    if (!relation) {
      return;
    }

    relationText.textContent = relation;
    relationDisplay.classList.add("is-active");
  }

  function clearRelation() {
    if (!relationDisplay || !relationText) {
      return;
    }

    relationText.textContent = "relation unresolved";
    relationDisplay.classList.remove("is-active");
  }

  nodes.forEach((node) => {
    node.addEventListener("mouseenter", () => {
      showRelation(node);
    });

    node.addEventListener("mouseleave", () => {
      clearRelation();
    });

    node.addEventListener("focus", () => {
      showRelation(node);
    });

    node.addEventListener("blur", () => {
      clearRelation();
    });

    node.addEventListener("click", () => {
      saveVisitedNode(node.dataset.nodeId);
    });
  });

  /*
    Run normally on first load.
  */
  refreshMap();

  /*
    Also run whenever the browser restores this page from
    back/forward cache.
  */
  window.addEventListener("pageshow", () => {
    refreshMap();
  });

  /*
    Also react if storage changes in another tab.
  */
  window.addEventListener("storage", () => {
    refreshMap();
  });
})();