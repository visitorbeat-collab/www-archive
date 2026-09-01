"use strict";


/*
  ---------------------------------------------------------
  RESTRICTED THRESHOLD — CONSEQUENCE PROTOTYPE
  ---------------------------------------------------------

  CURRENTLY IMPLEMENTED:

  - randomized angular placement
  - randomized starting radii
  - randomized visual markers
  - radial-only dragging
  - expanded movement range
  - dynamic causal lines
  - temporary dependent structures

  CURRENT TEST PROFILES:

  A
    dramatic direct effect
    complete recovery

  B
    very weak direct response
    delayed dependent degradation

  F
    moderate direct effect
    persistent alteration

  NOT YET IMPLEMENTED:

  - C / D / E / G / H / I behaviors
  - randomized event order
  - hidden radial classes
  - validation
  - completion state
*/


document.addEventListener("DOMContentLoaded", () => {
  const field =
    document.getElementById("gate-field");

  const centerElement =
    document.getElementById("gate-center");

  const causalLayer =
    document.getElementById("causal-layer");

  const dependentLayer =
    document.getElementById("dependent-layer");

  if (
    !field ||
    !centerElement ||
    !causalLayer ||
    !dependentLayer
  ) {
    return;
  }


  const nodeElements = Array.from(
    field.querySelectorAll(".gate-node")
  );


  /* -------------------------------------------------------
     SESSION CONFIGURATION
     ------------------------------------------------------- */

  const MIN_ANGLE_GAP = 28;

  const MIN_RADIUS_RATIO = 0.24;
  const MAX_RADIUS_RATIO = 0.44;

  const DRAG_MIN_RATIO = 0.08;
  const DRAG_MAX_RATIO = 0.88;

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

  function wait(milliseconds) {
    return new Promise(
      resolve => {
        window.setTimeout(
          resolve,
          milliseconds
        );
      }
    );
  }


  function shuffle(array) {
    const copy = [...array];

    for (
      let i = copy.length - 1;
      i > 0;
      i -= 1
    ) {
      const j = Math.floor(
        Math.random() *
        (i + 1)
      );

      [copy[i], copy[j]] = [
        copy[j],
        copy[i]
      ];
    }

    return copy;
  }


  function randomBetween(min, max) {
    return (
      min +
      Math.random() *
      (max - min)
    );
  }


  function degreesToRadians(degrees) {
    return (
      degrees *
      Math.PI /
      180
    );
  }


  function normalizeAngle(angle) {
    let normalized =
      angle % 360;

    if (normalized < 0) {
      normalized += 360;
    }

    return normalized;
  }


  function angularDistance(a, b) {
    const difference =
      Math.abs(
        normalizeAngle(a) -
        normalizeAngle(b)
      );

    return Math.min(
      difference,
      360 - difference
    );
  }


  /* -------------------------------------------------------
     FIELD GEOMETRY
     ------------------------------------------------------- */

  function getFieldGeometry() {
    const rect =
      field.getBoundingClientRect();

    const size =
      Math.min(
        rect.width,
        rect.height
      );

    return {
      rect,
      centerX:
        rect.width / 2,

      centerY:
        rect.height / 2,

      usableRadius:
        size * 0.49
    };
  }


  function getElementCenter(element) {
    const fieldRect =
      field.getBoundingClientRect();

    const rect =
      element.getBoundingClientRect();

    return {
      x:
        rect.left -
        fieldRect.left +
        rect.width / 2,

      y:
        rect.top -
        fieldRect.top +
        rect.height / 2
    };
  }


  /* -------------------------------------------------------
     RANDOM ANGLES
     ------------------------------------------------------- */

  function generateAngles(count) {
    const baseGap =
      360 / count;

    const globalRotation =
      Math.random() * 360;

    const angles = [];

    for (
      let i = 0;
      i < count;
      i += 1
    ) {
      const base =
        globalRotation +
        i * baseGap;

      const jitter =
        randomBetween(
          -10,
          10
        );

      angles.push(
        normalizeAngle(
          base + jitter
        )
      );
    }

    for (
      let i = 0;
      i < angles.length;
      i += 1
    ) {
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
          return generateAngles(
            count
          );
        }
      }
    }

    return angles;
  }


  /* -------------------------------------------------------
     PRIMARY NODE STATE
     ------------------------------------------------------- */

  const profiles =
    nodeElements.map(
      (element, index) => ({
        element,

        profile:
          element.dataset.profile ||
          String.fromCharCode(
            65 + index
          ),

        angle: 0,

        radiusRatio: 0,

        markerClass: null,

        isDragging: false
      })
    );


  function getNode(profileId) {
    return profiles.find(
      node =>
        node.profile === profileId
    );
  }


  /* -------------------------------------------------------
     MARKER RANDOMIZATION
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
     RANDOMIZED GEOMETRY
     ------------------------------------------------------- */

  function assignGeometry() {
    const angles =
      generateAngles(
        profiles.length
      );

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
      shuffle(
        startingRadiusGroups
      );

    profiles.forEach(
      (node, index) => {
        node.angle =
          angles[index];

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
     PRIMARY NODE POSITIONING
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

    updateDynamicGeometry();
  }


  /* -------------------------------------------------------
     RADIAL DRAGGING
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
      clientX -
      rect.left;

    const pointerY =
      clientY -
      rect.top;

    const dx =
      pointerX -
      centerX;

    const dy =
      pointerY -
      centerY;

    const distance =
      Math.sqrt(
        dx * dx +
        dy * dy
      );

    return (
      distance /
      usableRadius
    );
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
      /* optional */
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

    updateDynamicGeometry();
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
      /* optional */
    }
  }


  function attachDragHandlers(node) {
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
     DYNAMIC CAUSAL STRUCTURES
     ------------------------------------------------------- */

  const dynamicLines =
    new Map();

  const dependents =
    new Map();


  function createLine(id) {
    const namespace =
      "http://www.w3.org/2000/svg";

    const line =
      document.createElementNS(
        namespace,
        "line"
      );

    line.classList.add(
      "causal-line"
    );

    line.dataset.lineId =
      id;

    causalLayer.appendChild(
      line
    );

    dynamicLines.set(
      id,
      line
    );

    return line;
  }


  function getOrCreateLine(id) {
    return (
      dynamicLines.get(id) ||
      createLine(id)
    );
  }


  function setLineCoordinates(
    line,
    start,
    end
  ) {
    line.setAttribute(
      "x1",
      start.x
    );

    line.setAttribute(
      "y1",
      start.y
    );

    line.setAttribute(
      "x2",
      end.x
    );

    line.setAttribute(
      "y2",
      end.y
    );
  }


  function showLine(line) {
    line.classList.add(
      "is-visible"
    );
  }


  function hideLine(line) {
    line.classList.remove(
      "is-visible",
      "is-faint",
      "is-residual"
    );
  }


  function createDependent(
    id,
    parentProfile,
    angleOffset,
    distance
  ) {
    const element =
      document.createElement(
        "div"
      );

    element.className =
      "dependent-node";

    dependentLayer.appendChild(
      element
    );

    const dependent = {
      id,
      parentProfile,
      angleOffset,
      distance,
      element
    };

    dependents.set(
      id,
      dependent
    );

    return dependent;
  }


  function getOrCreateDependent(
    id,
    parentProfile,
    angleOffset,
    distance
  ) {
    if (dependents.has(id)) {
      return dependents.get(id);
    }

    return createDependent(
      id,
      parentProfile,
      angleOffset,
      distance
    );
  }


  function positionDependent(
    dependent
  ) {
    const parent =
      getNode(
        dependent.parentProfile
      );

    if (!parent) {
      return;
    }

    const parentCenter =
      getElementCenter(
        parent.element
      );

    const radians =
      degreesToRadians(
        parent.angle +
        dependent.angleOffset
      );

    const x =
      parentCenter.x +
      Math.cos(radians) *
      dependent.distance;

    const y =
      parentCenter.y +
      Math.sin(radians) *
      dependent.distance;

    dependent.element.style.left =
      `${x}px`;

    dependent.element.style.top =
      `${y}px`;
  }


  function positionAllDependents() {
    dependents.forEach(
      positionDependent
    );
  }


  function updateCenterLine(
    profileId,
    lineId
  ) {
    const node =
      getNode(profileId);

    const line =
      dynamicLines.get(
        lineId
      );

    if (
      !node ||
      !line
    ) {
      return;
    }

    const center =
      getElementCenter(
        centerElement
      );

    const target =
      getElementCenter(
        node.element
      );

    setLineCoordinates(
      line,
      center,
      target
    );
  }


  function updateDependentLine(
    profileId,
    dependentId,
    lineId
  ) {
    const node =
      getNode(profileId);

    const dependent =
      dependents.get(
        dependentId
      );

    const line =
      dynamicLines.get(
        lineId
      );

    if (
      !node ||
      !dependent ||
      !line
    ) {
      return;
    }

    setLineCoordinates(
      line,
      getElementCenter(
        node.element
      ),
      getElementCenter(
        dependent.element
      )
    );
  }


  function updateDynamicGeometry() {
    positionAllDependents();

    updateCenterLine(
      "A",
      "center-A"
    );

    updateCenterLine(
      "B",
      "center-B"
    );

    updateCenterLine(
      "F",
      "center-F"
    );

    updateDependentLine(
      "B",
      "B1",
      "B-B1"
    );

    updateDependentLine(
      "B",
      "B2",
      "B-B2"
    );

    updateDependentLine(
      "B",
      "B3",
      "B-B3"
    );

    updateDependentLine(
      "F",
      "F1",
      "F-F1"
    );
  }


  /* -------------------------------------------------------
     EFFECT RESET
     ------------------------------------------------------- */

  function clearPrimaryEffects() {
    profiles.forEach(
      node => {
        node.element.classList.remove(
          "effect-strong",
          "effect-subtle",
          "effect-moderate",
          "effect-persistent"
        );
      }
    );
  }


  function hideAllLines() {
    dynamicLines.forEach(
      line => {
        hideLine(line);
      }
    );
  }


  function hideAllDependents() {
    dependents.forEach(
      dependent => {
        dependent.element.classList.remove(
          "is-visible",
          "is-weakened",
          "is-collapsed",
          "is-persistent"
        );
      }
    );
  }


  function fullReset() {
    clearPrimaryEffects();
    hideAllLines();
    hideAllDependents();
  }


  /* -------------------------------------------------------
     PROFILE A
     -------------------------------------------------------

     Strong immediate visual response.
     Complete recovery.
     No downstream structure.
  ------------------------------------------------------- */

  async function runProfileA() {
    const node =
      getNode("A");

    if (!node) {
      return;
    }

    const line =
      getOrCreateLine(
        "center-A"
      );

    updateDynamicGeometry();

    showLine(line);

    await wait(450);

    node.element.classList.add(
      "effect-strong"
    );

    await wait(1300);

    node.element.classList.remove(
      "effect-strong"
    );

    await wait(700);

    hideLine(line);

    await wait(600);
  }


  /* -------------------------------------------------------
     PROFILE B
     -------------------------------------------------------

     Very weak direct response.
     Delayed dependency cascade.
     Partial residual damage.
  ------------------------------------------------------- */

  async function runProfileB() {
    const node =
      getNode("B");

    if (!node) {
      return;
    }

    const centerLine =
      getOrCreateLine(
        "center-B"
      );


    const B1 =
      getOrCreateDependent(
        "B1",
        "B",
        -38,
        72
      );

    const B2 =
      getOrCreateDependent(
        "B2",
        "B",
        0,
        88
      );

    const B3 =
      getOrCreateDependent(
        "B3",
        "B",
        42,
        70
      );


    const line1 =
      getOrCreateLine(
        "B-B1"
      );

    const line2 =
      getOrCreateLine(
        "B-B2"
      );

    const line3 =
      getOrCreateLine(
        "B-B3"
      );


    updateDynamicGeometry();

    showLine(
      centerLine
    );

    node.element.classList.add(
      "effect-subtle"
    );

    await wait(850);

    node.element.classList.remove(
      "effect-subtle"
    );

    /*
      Deliberate pause.

      The direct event appears almost inconsequential.
    */

    await wait(1200);


    B1.element.classList.add(
      "is-visible"
    );

    line1.classList.add(
      "is-visible"
    );

    await wait(450);


    B2.element.classList.add(
      "is-visible"
    );

    line2.classList.add(
      "is-visible"
    );

    await wait(450);


    B3.element.classList.add(
      "is-visible"
    );

    line3.classList.add(
      "is-visible"
    );

    await wait(900);


    /*
      The dependent structures degrade differently.
    */

    B1.element.classList.add(
      "is-weakened"
    );

    await wait(500);


    B2.element.classList.add(
      "is-collapsed"
    );

    await wait(500);


    B3.element.classList.add(
      "is-weakened"
    );

    B3.element.classList.add(
      "is-persistent"
    );


    line1.classList.add(
      "is-faint"
    );

    line2.classList.add(
      "is-faint"
    );

    line3.classList.add(
      "is-residual"
    );


    centerLine.classList.add(
      "is-faint"
    );

    await wait(1600);
  }


  /* -------------------------------------------------------
     PROFILE F
     -------------------------------------------------------

     Moderate direct alteration.
     No dramatic cascade.
     State persists.
  ------------------------------------------------------- */

  async function runProfileF() {
    const node =
      getNode("F");

    if (!node) {
      return;
    }

    const centerLine =
      getOrCreateLine(
        "center-F"
      );


    const F1 =
      getOrCreateDependent(
        "F1",
        "F",
        30,
        67
      );


    const dependentLine =
      getOrCreateLine(
        "F-F1"
      );


    updateDynamicGeometry();

    showLine(
      centerLine
    );

    await wait(450);


    node.element.classList.add(
      "effect-moderate"
    );

    await wait(1300);


    node.element.classList.remove(
      "effect-moderate"
    );

    node.element.classList.add(
      "effect-persistent"
    );


    centerLine.classList.add(
      "is-faint"
    );


    /*
      The persistent state later propagates very slightly.
    */

    await wait(1300);


    F1.element.classList.add(
      "is-visible",
      "is-persistent"
    );

    dependentLine.classList.add(
      "is-visible",
      "is-residual"
    );


    await wait(1800);
  }


  /* -------------------------------------------------------
     OBSERVATION CYCLE
     ------------------------------------------------------- */

  async function runObservationCycle() {
    while (true) {

      /*
        Restore neutral state before the next cycle.
      */

      fullReset();

      updateDynamicGeometry();

      await wait(3500);


      /*
        A:
        high visual intensity,
        low persistence.
      */

      await runProfileA();

      await wait(1200);


      /*
        B:
        almost invisible direct response,
        substantial downstream consequence.
      */

      await runProfileB();

      await wait(1500);


      /*
        F:
        modest direct response,
        persistent alteration.
      */

      await runProfileF();


      /*
        Hold the end state long enough for comparison.

        A has completely recovered.

        B retains damaged dependents.

        F remains altered.
      */

      await wait(5500);
    }
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


  /*
    Give the browser one frame to fully establish geometry
    before beginning the observation sequence.
  */

  window.requestAnimationFrame(
    () => {
      updateDynamicGeometry();

      runObservationCycle();
    }
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