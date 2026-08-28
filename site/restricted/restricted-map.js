(() => {
  const storageKey = "restricted-map-visited";

  const clickableNodes =
    document.querySelectorAll("a.concept-node");

  const allNodes =
    document.querySelectorAll(".concept-node");

  const relationDisplay =
    document.querySelector(".relation-display");

  const relationText =
    document.querySelector(".relation-display-text");

  if (!allNodes.length) {
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

    clickableNodes.forEach((node) => {
      const nodeId = node.dataset.nodeId;
      const symbol = node.querySelector(".node-symbol");

      if (!symbol) {
        return;
      }

      const isVisited = visited.includes(nodeId);

      if (isVisited) {
        node.classList.add("is-visited");

        if (nodeId === "nontext") {
          symbol.textContent = "◆";
        } else if (nodeId === "threshold") {
          symbol.textContent = "◎";
        } else {
          symbol.textContent = "◉";
        }

      } else {
        node.classList.remove("is-visited");

        if (nodeId === "nontext") {
          symbol.textContent = "◇";
        } else if (nodeId === "threshold") {
          symbol.textContent = "◎";
        } else {
          symbol.textContent = "○";
        }
      }
    });
  }


  function revealSecondaryRelations() {
    const visited = getVisitedNodes();

    const exposureRetention =
      document.getElementById(
        "relation-exposure-retention"
      );

    if (exposureRetention) {
      const shouldReveal =
        visited.includes("exposure") &&
        visited.includes("retention");

      exposureRetention.classList.toggle(
        "is-revealed",
        shouldReveal
      );
    }
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


  allNodes.forEach((node) => {
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
  });


  clickableNodes.forEach((node) => {
    node.addEventListener("click", () => {
      saveVisitedNode(node.dataset.nodeId);
    });
  });


  refreshMap();


  window.addEventListener("pageshow", () => {
    refreshMap();
  });


  window.addEventListener("storage", () => {
    refreshMap();
  });
})();