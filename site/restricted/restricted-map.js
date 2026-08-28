(() => {
  const nodes = document.querySelectorAll(".concept-node");
  const relationDisplay = document.querySelector(".relation-display");
  const relationText = document.querySelector(".relation-display-text");

  if (!nodes.length || !relationDisplay || !relationText) {
    return;
  }


  const storageKey = "restricted-map-visited";


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
      /* localStorage unavailable — fail silently */
    }
  }


  function applyVisitedState() {
    const visited = getVisitedNodes();

    nodes.forEach((node) => {
      const nodeId = node.dataset.nodeId;

      if (visited.includes(nodeId)) {
        node.classList.add("is-visited");

        const symbol = node.querySelector(".node-symbol");

        if (
          symbol &&
          symbol.textContent.trim() === "○"
        ) {
          symbol.textContent = "◉";
        }
      }
    });
  }


  function showRelation(node) {
    const relation = node.dataset.relation;

    if (!relation) {
      return;
    }

    relationText.textContent = relation;
    relationDisplay.classList.add("is-active");
  }


  function clearRelation() {
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

function revealSecondaryRelations() {
  const visited = getVisitedNodes();

  const exposureRetention =
    document.getElementById("relation-exposure-retention");

  if (
    exposureRetention &&
    visited.includes("exposure") &&
    visited.includes("retention")
  ) {
    exposureRetention.classList.add("is-revealed");
  }
}

applyVisitedState();
revealSecondaryRelations();