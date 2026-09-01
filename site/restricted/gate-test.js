"use strict";


/*
  ---------------------------------------------------------
  RESTRICTED THRESHOLD — VISUAL PROTOTYPE
  ---------------------------------------------------------

  This first version deliberately does almost nothing.

  It establishes the field and gives us a stable foundation
  for the later assessment system.

  Future stages will add:

  - randomized angular positions
  - randomized radial positions
  - randomized visual identifiers
  - radial-only dragging
  - causal propagation
  - persistent consequence states
  - repeated observation cycles
  - radial classification
  - whole-model validation
  - successful-state transition

  None of those mechanics are enabled yet.
*/


document.addEventListener("DOMContentLoaded", () => {
  const field = document.getElementById("gate-field");

  if (!field) {
    return;
  }

  field.classList.add("is-ready");
});