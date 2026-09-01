"use strict";


/*
  ---------------------------------------------------------
  RESTRICTED THRESHOLD — GEOMETRY + RADIAL INTERACTION
  ---------------------------------------------------------

  This version adds:

  - randomized angular placement
  - randomized starting radii
  - randomized visual marker assignment
  - radial-only dragging
  - expanded radial movement range
  - responsive recalculation

  It does NOT yet include:

  - consequence animation
  - hidden relational classes
  - validation
  - successful completion
*/


document.addEventListener("DOMContentLoaded", () => {
  const field = document.getElementById("gate-field");

  if (!field) {
    return;
  }

  const nodeElements = Array.from(
    field.querySelectorAll(".gate-node")
  );

  if (nodeElements.length !== 9) {
    console.warn(
      "Restricted gate expected 9 primary nodes."
    );
  }


  /* -------------------------------------------------------
     SESSION CONFIGURATION
     ------------------------------------------------------- */

  const MIN_ANGLE_GAP = 28;

  /*
    Starting radius values are proportions of the usable
    field radius.

    These only control where nodes begin.
  */

  const MIN_RADIUS_RATIO = 0.24;
  const MAX_RADIUS_RATIO = 0.44;

  /*
    Expanded draggable range.

    Nodes can now approach much closer to the center and move
    much farther toward the outer field.

    0.08 = very close to the central actor
    0.88 = near the outer edge of the field
  */

  const DRAG_MIN_RATIO = 0.08;
  const DRAG_MAX_RATIO = 0.88;


  /* -------------------------------------------------------
     INTERNAL NODE MARK CLASSES
     ------------------------------------------------------- */

  const markerClasses = [
    "mark-dot",
    "mark-line",
    "mark-double",
    "mark-slash",
    "mark-cross",
    "mark-small-ring",
    "mark-vertical",
    "mark-two-dots",
    "mark-horizontal"
  ];


  /* -------------------------------------------------------
     UTILITIES
     ------------------------------------------------------- */

  function shuffle(array) {
    const copy = [...array];

    for (let i = copy.length - 1; i > 0; i -= 1) {
      const j = Math.floor(
        Math.random() * (i + 1)
      );

      [copy[i], copy[j]] = [
        copy[j],
        copy[i]
      ];
    }

    return copy;
  }


  function randomBetween(min, max) {
    return min + Math.random() * (max - min);
  }


  function degreesToRadians(degrees) {
    return degrees * Math.PI / 180;
  }


  function normalizeAngle(angle) {
    let normalized = angle % 360;

    if (normalized < 0) {
      normalized += 360;
    }

    return normalized;
  }


  function angularDistance(a, b) {
    const difference = Math.abs(
      normalizeAngle(a) - normalizeAngle(b)
    );

    return Math.min(
      difference,
      360 - difference
    );
  }


  function getFieldGeometry() {
    const rect = field.getBoundingClientRect();

    const size = Math.min(
      rect.width,
      rect.height
    );

    const centerX = rect.width / 2;
    const centerY = rect.height / 2;

    /*
      Slightly smaller than half the field so nodes remain
      comfortably inside the visible assessment area even at
      the largest allowed radius.
    */

    const usableRadius = size * 0.49;

    return {
      rect,
      centerX,
      centerY,
      usableRadius
    };
  }


  /* -------------------------------------------------------
     RANDOM ANGLE GENERATION
     ------------------------------------------------------- */

  function generateAngles(count) {
    /*
      Start from roughly even spacing, then perturb each angle.

      This gives us randomness without accidental crowding.
    */

    const baseGap = 360 / count;
    const globalRotation = Math.random() * 360;

    const angles = [];

    for (let i = 0; i < count; i += 1) {
      const base =
        globalRotation +
        i * baseGap;

      const jitter = randomBetween(
        -10,
        10
      );

      angles.push(
        normalizeAngle(base + jitter)
      );
    }

    /*
      Safety check.

      If the random jitter somehow produces two nodes that are
      too close, regenerate the set.
    */

    for (let i = 0; i < angles.length; i += 1) {
      for (
        let j = i + 1;
        j < angles.length;
        j += 1
      ) {
        if (
          angularDistance(
            angles[i],
            angles[j]
          ) < MIN_ANGLE_GAP
        ) {
          return generateAngles(count);
        }
      }
    }

    return angles;
  }


  /* -------------------------------------------------------
     NODE SESSION STATE
     ------------------------------------------------------- */

  const profiles = nodeElements.map(
    (element, index) => ({
      element,

      /*
        A–I remain internal only.

        The visual marker assigned to each profile changes
        every session.
      */

      profile:
        element.dataset.profile ||
        String.fromCharCode(65 + index),

      angle: 0,
      radiusRatio: 0,
      markerClass: null,

      isDragging: false
    })
  );


  /* -------------------------------------------------------
     RANDOMIZE VISUAL IDENTIFIERS
     ------------------------------------------------------- */

  function assignMarkers() {
    const shuffledMarkers =
      shuffle(markerClasses);

    profiles.forEach(
      (node, index) => {
        const mark =
          node.element.querySelector(
            ".node-mark"
          );

        if (!mark) {
          return;
        }

        markerClasses.forEach(
          markerClass => {
            mark.classList.remove(
              markerClass
            );
          }
        );

        const markerClass =
          shuffledMarkers[index];

        mark.classList.add(
          markerClass
        );

        node.markerClass =
          markerClass;
      }
    );
  }


  /* -------------------------------------------------------
     RANDOMIZE GEOMETRY
     ------------------------------------------------------- */

  function assignGeometry() {
    const angles =
      generateAngles(
        profiles.length
      );

    /*
      Use a spread of starting-radius neighborhoods.

      These are NOT the eventual answer bands.

      They only establish an irregular starting field.
    */

    const startingRadiusGroups = [
      0.27,
      0.30,
      0.33,
      0.35,
      0.37,
      0.39,
      0.41,
      0.43,
      0.31
    ];

    const shuffledRadii =
      shuffle(startingRadiusGroups);

    profiles.forEach(
      (node, index) => {
        node.angle = angles[index];

        node.radiusRatio =
          Math.max(
            MIN_RADIUS_RATIO,
            Math.min(
              MAX_RADIUS_RATIO,
              shuffledRadii[index] +
              randomBetween(
                -0.012,
                0.012
              )
            )
          );
      }
    );
  }


  /* -------------------------------------------------------
     POSITIONING
     ------------------------------------------------------- */

  function positionNode(node) {
    const {
      centerX,
      centerY,
      usableRadius
    } = getFieldGeometry();

    const radians =
      degreesToRadians(
        node.angle
      );

    const radius =
      usableRadius *
      node.radiusRatio;

    const x =
      centerX +
      Math.cos(radians) *
      radius;

    const y =
      centerY +
      Math.sin(radians) *
      radius;

    node.element.style.left =
      `${x}px`;

    node.element.style.top =
      `${y}px`;
  }


  function positionAllNodes() {
    profiles.forEach(
      positionNode
    );
  }


  /* -------------------------------------------------------
     POINTER → RADIAL DISTANCE
     ------------------------------------------------------- */

  function calculatePointerRadiusRatio(
    clientX,
    clientY
  ) {
    const {
      rect,
      centerX,
      centerY,
      usableRadius
    } = getFieldGeometry();

    const pointerX =
      clientX - rect.left;

    const pointerY =
      clientY - rect.top;

    const dx =
      pointerX - centerX;

    const dy =
      pointerY - centerY;

    const distance =
      Math.sqrt(
        dx * dx +
        dy * dy
      );

    return distance /
      usableRadius;
  }


  function clampRadiusRatio(
    radiusRatio
  ) {
    return Math.max(
      DRAG_MIN_RATIO,
      Math.min(
        DRAG_MAX_RATIO,
        radiusRatio
      )
    );
  }


  /* -------------------------------------------------------
     DRAGGING
     ------------------------------------------------------- */

  function beginDrag(
    event,
    node
  ) {
    event.preventDefault();

    node.isDragging = true;

    node.element.classList.add(
      "is-dragging"
    );

    try {
      node.element.setPointerCapture(
        event.pointerId
      );
    } catch (error) {
      /*
        Pointer capture is helpful but not required.
      */
    }

    updateDrag(
      event,
      node
    );
  }


  function updateDrag(
    event,
    node
  ) {
    if (!node.isDragging) {
      return;
    }

    const rawRatio =
      calculatePointerRadiusRatio(
        event.clientX,
        event.clientY
      );

    node.radiusRatio =
      clampRadiusRatio(
        rawRatio
      );

    positionNode(node);
  }


  function endDrag(
    event,
    node
  ) {
    if (!node.isDragging) {
      return;
    }

    node.isDragging = false;

    node.element.classList.remove(
      "is-dragging"
    );

    try {
      node.element.releasePointerCapture(
        event.pointerId
      );
    } catch (error) {
      /*
        Ignore if capture was not active.
      */
    }

    /*
      Future step:

      evaluate the complete relational model here.
    */
  }


  function attachDragHandlers(
    node
  ) {
    node.element.addEventListener(
      "pointerdown",
      event => {
        beginDrag(
          event,
          node
        );
      }
    );

    node.element.addEventListener(
      "pointermove",
      event => {
        updateDrag(
          event,
          node
        );
      }
    );

    node.element.addEventListener(
      "pointerup",
      event => {
        endDrag(
          event,
          node
        );
      }
    );

    node.element.addEventListener(
      "pointercancel",
      event => {
        endDrag(
          event,
          node
        );
      }
    );
  }


  /* -------------------------------------------------------
     INITIALIZE
     ------------------------------------------------------- */

  assignMarkers();
  assignGeometry();

  profiles.forEach(
    node => {
      attachDragHandlers(node);
    }
  );

  positionAllNodes();

  field.classList.add(
    "is-ready"
  );


  /* -------------------------------------------------------
     RESPONSIVE POSITIONING
     ------------------------------------------------------- */

  window.addEventListener(
    "resize",
    () => {
      positionAllNodes();
    }
  );
});