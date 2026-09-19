(() => {
  const mapStorageKey =
    "restricted-map-visited";

  const convergenceStorageKey =
    "restricted-audio-convergence";

  const requiredNodes = [
    "threshold",
    "retention",
    "exposure",
    "participation",
    "nontext"
  ];


  function getVisitedNodes() {
    try {
      const stored =
        localStorage.getItem(
          mapStorageKey
        );

      if (!stored) {
        return [];
      }

      const parsed =
        JSON.parse(stored);

      return Array.isArray(parsed)
        ? parsed
        : [];
    } catch {
      return [];
    }
  }


  function hasObservedConvergence() {
    try {
      return localStorage.getItem(
        convergenceStorageKey
      ) === "observed";
    } catch {
      return false;
    }
  }


  function markConvergenceObserved() {
    try {
      localStorage.setItem(
        convergenceStorageKey,
        "observed"
      );
    } catch {
      /* localStorage unavailable */
    }
  }


  function isUnlocked() {
    const visited =
      getVisitedNodes();

    const requiredConceptsVisited =
      requiredNodes.every(
        (nodeId) =>
          visited.includes(nodeId)
      );

    return (
      requiredConceptsVisited &&
      hasObservedConvergence()
    );
  }


  function applyState() {
    const unlocked =
      isUnlocked();

    document.body.classList.toggle(
      "retained-audio-unlocked",
      unlocked
    );

    document
      .querySelectorAll(
        "[data-retained-audio-unlocked]"
      )
      .forEach((element) => {
        element.hidden = !unlocked;
      });

    document
      .querySelectorAll(
        "[data-retained-audio-locked]"
      )
      .forEach((element) => {
        element.hidden = unlocked;
      });

    window.dispatchEvent(
      new CustomEvent(
        "retainedaudiochange",
        {
          detail: {
            unlocked
          }
        }
      )
    );
  }


  window.RestrictedAudioState = {
    applyState,
    getVisitedNodes,
    hasObservedConvergence,
    isUnlocked,
    markConvergenceObserved,
    requiredNodes: [
      ...requiredNodes
    ]
  };


  if (
    document.body.hasAttribute(
      "data-mark-audio-convergence"
    )
  ) {
    markConvergenceObserved();
  }


  applyState();


  window.addEventListener(
    "pageshow",
    applyState
  );


  window.addEventListener(
    "storage",
    applyState
  );
})();
