"use strict";


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


  const nodeElements =
    Array.from(
      field.querySelectorAll(
        ".gate-node"
      )
    );


  /* -------------------------------------------------------
     CONFIG
     ------------------------------------------------------- */

  const MIN_ANGLE_GAP = 28;

  const MIN_RADIUS_RATIO = 0.24;
  const MAX_RADIUS_RATIO = 0.44;

  const DRAG_MIN_RATIO = 0.08;
  const DRAG_MAX_RATIO = 0.88;


  const TARGET_CLASS = {
    A: 2,
    B: 0,
    C: 1,
    D: 2,
    E: 3,
    F: 0,
    G: 1,
    H: 0,
    I: 2
  };


  const RADIAL_CLASSES = [
    0.155,
    0.350,
    0.570,
    0.795
  ];


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


let resolved = false;
let cycleToken = 0;

let assessmentChallenge = null;
let accessAuthorized = false;


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
      const j =
        Math.floor(
          Math.random() *
          (i + 1)
        );

      [
        copy[i],
        copy[j]
      ] = [
        copy[j],
        copy[i]
      ];
    }

    return copy;
  }


  function randomBetween(
    min,
    max
  ) {
    return (
      min +
      Math.random() *
      (max - min)
    );
  }


  function degreesToRadians(
    degrees
  ) {
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


  function angularDistance(
    a,
    b
  ) {
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
     GEOMETRY
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


  function getElementCenter(
    element
  ) {
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

    const rotation =
      Math.random() * 360;

    const angles = [];


    for (
      let i = 0;
      i < count;
      i += 1
    ) {
      angles.push(
        normalizeAngle(
          rotation +
          i * baseGap +
          randomBetween(
            -10,
            10
          )
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
     PRIMARY STATE
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

        currentClass: null,

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
     RANDOM MARKERS
     ------------------------------------------------------- */

  function assignMarkers() {
    const shuffledMarkers =
      shuffle(
        markerClasses
      );


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
     STARTING GEOMETRY
     ------------------------------------------------------- */

  function assignGeometry() {
    const angles =
      generateAngles(
        profiles.length
      );


    const startingRadii =
      shuffle([
        0.27,
        0.30,
        0.33,
        0.35,
        0.37,
        0.39,
        0.41,
        0.43,
        0.31
      ]);


    profiles.forEach(
      (node, index) => {

        node.angle =
          angles[index];


        node.radiusRatio =
          Math.max(
            MIN_RADIUS_RATIO,

            Math.min(
              MAX_RADIUS_RATIO,

              startingRadii[index] +
              randomBetween(
                -0.012,
                0.012
              )
            )
          );


        node.currentClass = null;
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


    node.element.style.left =
      `${
        centerX +
        Math.cos(radians) *
        radius
      }px`;


    node.element.style.top =
      `${
        centerY +
        Math.sin(radians) *
        radius
      }px`;
  }


  function positionAllNodes() {
    profiles.forEach(
      positionNode
    );

    updateDynamicGeometry();
  }


  /* -------------------------------------------------------
     SNAP
     ------------------------------------------------------- */

  function getNearestClass(
    radiusRatio
  ) {
    let nearestIndex = 0;

    let nearestDistance =
      Math.abs(
        radiusRatio -
        RADIAL_CLASSES[0]
      );


    for (
      let index = 1;
      index <
      RADIAL_CLASSES.length;
      index += 1
    ) {
      const distance =
        Math.abs(
          radiusRatio -
          RADIAL_CLASSES[index]
        );


      if (
        distance <
        nearestDistance
      ) {
        nearestDistance =
          distance;

        nearestIndex =
          index;
      }
    }


    return nearestIndex;
  }


  function snapNodeToNearestContour(
    node
  ) {
    const nearestClass =
      getNearestClass(
        node.radiusRatio
      );


    node.currentClass =
      nearestClass;


    node.radiusRatio =
      RADIAL_CLASSES[
        nearestClass
      ];


    positionNode(node);

    updateDynamicGeometry();
  }


  /* -------------------------------------------------------
     DRAGGING
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


  function clampRadiusRatio(value) {
    return Math.max(
      DRAG_MIN_RATIO,

      Math.min(
        DRAG_MAX_RATIO,
        value
      )
    );
  }


  function beginDrag(
    event,
    node
  ) {
    if (resolved) {
      return;
    }


    event.preventDefault();


    node.isDragging = true;


    node.element.classList.add(
      "is-dragging"
    );


    field.classList.add(
      "is-adjusting"
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
    if (
      !node.isDragging ||
      resolved
    ) {
      return;
    }


    node.radiusRatio =
      clampRadiusRatio(
        calculatePointerRadiusRatio(
          event.clientX,
          event.clientY
        )
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


    field.classList.remove(
      "is-adjusting"
    );


    try {
      node.element.releasePointerCapture(
        event.pointerId
      );
    } catch (error) {
      /* optional */
    }


    snapNodeToNearestContour(
      node
    );


    evaluateWholeModel();
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
     VALIDATION
     ------------------------------------------------------- */

  function evaluateWholeModel() {
    if (resolved) {
      return;
    }


    const allAssigned =
      profiles.every(
        node =>
          node.currentClass !== null
      );


    if (!allAssigned) {
      return;
    }


    const coherent =
      profiles.every(
        node =>
          node.currentClass ===
          TARGET_CLASS[
            node.profile
          ]
      );


    if (coherent) {
      resolveAssessment();
    }
  }


  /* -------------------------------------------------------
     DYNAMIC STRUCTURES
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
      "is-hold",
      "is-faint",
      "is-remote"
    );
  }


  function markLineAsResidue(line) {
    line.classList.add(
      "is-visible",
      "is-cycle-residue"
    );
  }


  function createDependent(
    id,
    parentProfile,
    angleOffset,
    distance,
    options = {}
  ) {
    const element =
      document.createElement(
        "div"
      );


    element.className =
      "dependent-node";


    if (options.remote) {
      element.classList.add(
        "is-remote"
      );
    }


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
    distance,
    options = {}
  ) {
    if (dependents.has(id)) {
      return dependents.get(id);
    }


    return createDependent(
      id,
      parentProfile,
      angleOffset,
      distance,
      options
    );
  }


  function markDependentAsResidue(
    dependent
  ) {
    dependent.element.classList.add(
      "is-visible",
      "is-persistent",
      "is-cycle-residue"
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


    dependent.element.style.left =
      `${
        parentCenter.x +
        Math.cos(radians) *
        dependent.distance
      }px`;


    dependent.element.style.top =
      `${
        parentCenter.y +
        Math.sin(radians) *
        dependent.distance
      }px`;
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


    setLineCoordinates(
      line,

      getElementCenter(
        centerElement
      ),

      getElementCenter(
        node.element
      )
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


  function updateDependentToDependentLine(
    startDependentId,
    endDependentId,
    lineId
  ) {
    const start =
      dependents.get(
        startDependentId
      );


    const end =
      dependents.get(
        endDependentId
      );


    const line =
      dynamicLines.get(
        lineId
      );


    if (
      !start ||
      !end ||
      !line
    ) {
      return;
    }


    setLineCoordinates(
      line,

      getElementCenter(
        start.element
      ),

      getElementCenter(
        end.element
      )
    );
  }


  function updateDynamicGeometry() {
    positionAllDependents();


    [
      "A",
      "B",
      "C",
      "D",
      "E",
      "F",
      "G",
      "H",
      "I"
    ].forEach(
      profile => {
        updateCenterLine(
          profile,
          `center-${profile}`
        );
      }
    );


    [
      ["B", "B1", "B-B1"],
      ["B", "B2", "B-B2"],
      ["B", "B3", "B-B3"],

      ["C", "C1", "C-C1"],
      ["C", "C2", "C-C2"],
      ["C", "C3", "C-C3"],

      ["F", "F1", "F-F1"],

      ["G", "G1", "G-G1"],
      ["G", "G2", "G-G2"],

      ["H", "H1", "H-H1"],

      ["I", "I1", "I-I1"]
    ].forEach(
      relation => {
        updateDependentLine(
          relation[0],
          relation[1],
          relation[2]
        );
      }
    );


    updateDependentToDependentLine(
      "H1",
      "H2",
      "H1-H2"
    );


    updateDependentToDependentLine(
      "H2",
      "H3",
      "H2-H3"
    );
  }


  /* -------------------------------------------------------
     CASE FOCUS
     ------------------------------------------------------- */

  function focusCase(
    profileId
  ) {
    field.classList.add(
      "has-active-case"
    );


    profiles.forEach(
      node => {
        node.element.classList.toggle(
          "is-active-case",
          node.profile === profileId
        );
      }
    );
  }


  function clearCaseFocus() {
    field.classList.remove(
      "has-active-case"
    );


    profiles.forEach(
      node => {
        node.element.classList.remove(
          "is-active-case"
        );
      }
    );
  }


  /* -------------------------------------------------------
     RESET LOGIC

     Two intentionally different resets now exist.

     clearCurrentCase()
       clears temporary information but preserves genuine
       consequences from earlier cases.

     clearEntireCycle()
       removes absolutely everything before a new nine-case
       observation cycle begins.
     ------------------------------------------------------- */

  function clearTemporaryPrimaryEffects() {
    profiles.forEach(
      node => {

        node.element.classList.remove(
          "effect-strong",
          "effect-collapse",
          "effect-subtle",
          "effect-moderate",
          "effect-substantial",
          "effect-small"
        );


        /*
          Only a primary explicitly marked as cycle residue
          is allowed to keep its persistent state.
        */

        if (
          !node.element.classList.contains(
            "is-cycle-residue"
          )
        ) {
          node.element.classList.remove(
            "effect-persistent"
          );
        }
      }
    );
  }


  function clearTemporaryLines() {
    dynamicLines.forEach(
      line => {

        if (
          line.classList.contains(
            "is-cycle-residue"
          )
        ) {
          line.classList.remove(
            "is-hold",
            "is-faint"
          );

          line.classList.add(
            "is-visible"
          );

          return;
        }


        line.classList.remove(
          "is-visible",
          "is-hold",
          "is-faint"
        );
      }
    );
  }


  function clearTemporaryDependents() {
    dependents.forEach(
      dependent => {

        const element =
          dependent.element;


        if (
          element.classList.contains(
            "is-cycle-residue"
          )
        ) {
          element.classList.remove(
            "is-weakened",
            "is-collapsed",
            "is-gone"
          );

          element.classList.add(
            "is-visible",
            "is-persistent"
          );

          return;
        }


        element.classList.remove(
          "is-visible",
          "is-weakened",
          "is-collapsed",
          "is-persistent",
          "is-gone"
        );
      }
    );
  }


  function clearCurrentCase() {
    if (resolved) {
      return;
    }


    clearTemporaryPrimaryEffects();

    clearTemporaryLines();

    clearTemporaryDependents();

    clearCaseFocus();
  }


  function clearEntireCycle() {
    if (resolved) {
      return;
    }


    clearCaseFocus();


    profiles.forEach(
      node => {
        node.element.classList.remove(
          "effect-strong",
          "effect-collapse",
          "effect-subtle",
          "effect-moderate",
          "effect-substantial",
          "effect-small",
          "effect-persistent",
          "is-cycle-residue"
        );
      }
    );


    dynamicLines.forEach(
      line => {
        line.classList.remove(
          "is-visible",
          "is-hold",
          "is-faint",
          "is-cycle-residue"
        );
      }
    );


    dependents.forEach(
      dependent => {
        dependent.element.classList.remove(
          "is-visible",
          "is-weakened",
          "is-collapsed",
          "is-persistent",
          "is-cycle-residue",
          "is-gone"
        );
      }
    );
  }


  /* -------------------------------------------------------
     CASE A

     Dramatic direct reaction.
     No dependents.
     Full recovery.
     Nothing survives.
     ------------------------------------------------------- */

  async function runProfileA() {
    if (resolved) return;


    const node =
      getNode("A");


    const centerLine =
      getOrCreateLine(
        "center-A"
      );


    focusCase("A");

    updateDynamicGeometry();


    await wait(700);


    showLine(centerLine);


    await wait(700);


    node.element.classList.add(
      "effect-strong"
    );


    await wait(1500);


    node.element.classList.remove(
      "effect-strong"
    );


    centerLine.classList.add(
      "is-hold"
    );


    await wait(2400);
  }


  /* -------------------------------------------------------
     CASE B

     Weak direct response.

     Three downstream dependents appear.

     B1 weakens.
     B2 collapses.
     B3 remains as lasting downstream residue.
     ------------------------------------------------------- */

  async function runProfileB() {
    if (resolved) return;


    const node =
      getNode("B");


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


    focusCase("B");

    updateDynamicGeometry();


    await wait(700);


    showLine(centerLine);


    await wait(700);


    node.element.classList.add(
      "effect-subtle"
    );


    await wait(850);


    node.element.classList.remove(
      "effect-subtle"
    );


    await wait(1100);


    B1.element.classList.add(
      "is-visible"
    );

    showLine(line1);


    await wait(500);


    B2.element.classList.add(
      "is-visible"
    );

    showLine(line2);


    await wait(500);


    B3.element.classList.add(
      "is-visible"
    );

    showLine(line3);


    await wait(850);


    B1.element.classList.add(
      "is-weakened"
    );


    await wait(500);


    B2.element.classList.add(
      "is-collapsed"
    );


    await wait(500);


    B3.element.classList.add(
      "is-persistent"
    );


    /*
      B3 is the lasting consequence.

      Preserve the route from the center through B to B3.
    */

    markDependentAsResidue(
      B3
    );


    markLineAsResidue(
      centerLine
    );


    markLineAsResidue(
      line3
    );


    await wait(3000);
  }


  /* -------------------------------------------------------
     CASE C

     Three downstream dependents.

     Most diminish.

     C3 survives as a residual consequence.
     ------------------------------------------------------- */

  async function runProfileC() {
    if (resolved) return;


    const node =
      getNode("C");


    const centerLine =
      getOrCreateLine(
        "center-C"
      );


    const C1 =
      getOrCreateDependent(
        "C1",
        "C",
        -34,
        68
      );


    const C2 =
      getOrCreateDependent(
        "C2",
        "C",
        8,
        86
      );


    const C3 =
      getOrCreateDependent(
        "C3",
        "C",
        43,
        76
      );


    const line1 =
      getOrCreateLine(
        "C-C1"
      );


    const line2 =
      getOrCreateLine(
        "C-C2"
      );


    const line3 =
      getOrCreateLine(
        "C-C3"
      );


    focusCase("C");

    updateDynamicGeometry();


    await wait(700);


    showLine(centerLine);


    await wait(700);


    node.element.classList.add(
      "effect-moderate"
    );


    await wait(900);


    C1.element.classList.add(
      "is-visible"
    );

    showLine(line1);


    await wait(450);


    C2.element.classList.add(
      "is-visible"
    );

    showLine(line2);


    await wait(450);


    C3.element.classList.add(
      "is-visible"
    );

    showLine(line3);


    await wait(900);


    node.element.classList.remove(
      "effect-moderate"
    );


    C1.element.classList.add(
      "is-weakened"
    );


    C2.element.classList.add(
      "is-weakened"
    );


    C3.element.classList.add(
      "is-persistent"
    );


    markDependentAsResidue(
      C3
    );


    markLineAsResidue(
      centerLine
    );


    markLineAsResidue(
      line3
    );


    await wait(3000);
  }


  /* -------------------------------------------------------
     CASE D

     Dramatic inward collapse.
     Full recovery.
     No lasting consequence.
     ------------------------------------------------------- */

  async function runProfileD() {
    if (resolved) return;


    const node =
      getNode("D");


    const centerLine =
      getOrCreateLine(
        "center-D"
      );


    focusCase("D");

    updateDynamicGeometry();


    await wait(700);


    showLine(centerLine);


    await wait(700);


    node.element.classList.add(
      "effect-collapse"
    );


    await wait(1600);


    node.element.classList.remove(
      "effect-collapse"
    );


    centerLine.classList.add(
      "is-hold"
    );


    await wait(2400);
  }


  /* -------------------------------------------------------
     CASE E

     Small contained response.
     Full recovery.
     Nothing survives.
     ------------------------------------------------------- */

  async function runProfileE() {
    if (resolved) return;


    const node =
      getNode("E");


    const centerLine =
      getOrCreateLine(
        "center-E"
      );


    focusCase("E");

    updateDynamicGeometry();


    await wait(700);


    showLine(centerLine);


    await wait(700);


    node.element.classList.add(
      "effect-small"
    );


    await wait(1000);


    node.element.classList.remove(
      "effect-small"
    );


    centerLine.classList.add(
      "is-hold"
    );


    await wait(2400);
  }


  /* -------------------------------------------------------
     CASE F

     Primary itself remains altered.

     One dependent appears later and also remains.

     Both persist through the rest of the cycle.
     ------------------------------------------------------- */

  async function runProfileF() {
    if (resolved) return;


    const node =
      getNode("F");


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


    focusCase("F");

    updateDynamicGeometry();


    await wait(700);


    showLine(centerLine);


    await wait(700);


    node.element.classList.add(
      "effect-moderate"
    );


    await wait(1200);


    node.element.classList.remove(
      "effect-moderate"
    );


    node.element.classList.add(
      "effect-persistent"
    );


    await wait(1200);


    F1.element.classList.add(
      "is-visible",
      "is-persistent"
    );


    showLine(
      dependentLine
    );


    /*
      Unlike other profiles, F itself remains altered.
    */

    node.element.classList.add(
      "is-cycle-residue"
    );


    markDependentAsResidue(
      F1
    );


    markLineAsResidue(
      centerLine
    );


    markLineAsResidue(
      dependentLine
    );


    await wait(3000);
  }


  /* -------------------------------------------------------
     CASE G

     Two downstream dependents.

     One diminishes.

     G2 remains.
     ------------------------------------------------------- */

  async function runProfileG() {
    if (resolved) return;


    const node =
      getNode("G");


    const centerLine =
      getOrCreateLine(
        "center-G"
      );


    const G1 =
      getOrCreateDependent(
        "G1",
        "G",
        -25,
        72
      );


    const G2 =
      getOrCreateDependent(
        "G2",
        "G",
        31,
        82
      );


    const line1 =
      getOrCreateLine(
        "G-G1"
      );


    const line2 =
      getOrCreateLine(
        "G-G2"
      );


    focusCase("G");

    updateDynamicGeometry();


    await wait(700);


    showLine(centerLine);


    await wait(700);


    node.element.classList.add(
      "effect-substantial"
    );


    await wait(900);


    G1.element.classList.add(
      "is-visible"
    );

    showLine(line1);


    await wait(500);


    G2.element.classList.add(
      "is-visible"
    );

    showLine(line2);


    await wait(900);


    node.element.classList.remove(
      "effect-substantial"
    );


    G1.element.classList.add(
      "is-weakened"
    );


    G2.element.classList.add(
      "is-persistent"
    );


    markDependentAsResidue(
      G2
    );


    markLineAsResidue(
      centerLine
    );


    markLineAsResidue(
      line2
    );


    await wait(3000);
  }


  /* -------------------------------------------------------
     CASE H

     Very small local response.

     After a delay, a causal chain propagates well beyond the
     original local field.

     Only the far consequence remains as an entity, but the
     faint causal path remains visible so its origin can still
     be reconstructed.
     ------------------------------------------------------- */

  async function runProfileH() {
    if (resolved) return;


    const node =
      getNode("H");


    const centerLine =
      getOrCreateLine(
        "center-H"
      );


    const H1 =
      getOrCreateDependent(
        "H1",
        "H",
        2,
        118,
        {
          remote: true
        }
      );


    const H2 =
      getOrCreateDependent(
        "H2",
        "H",
        2,
        188,
        {
          remote: true
        }
      );


    const H3 =
      getOrCreateDependent(
        "H3",
        "H",
        2,
        252,
        {
          remote: true
        }
      );


    const line1 =
      getOrCreateLine(
        "H-H1"
      );


    const line2 =
      getOrCreateLine(
        "H1-H2"
      );


    const line3 =
      getOrCreateLine(
        "H2-H3"
      );


    line1.classList.add(
      "is-remote"
    );

    line2.classList.add(
      "is-remote"
    );

    line3.classList.add(
      "is-remote"
    );


    focusCase("H");

    updateDynamicGeometry();


    await wait(700);


    showLine(centerLine);


    await wait(700);


    node.element.classList.add(
      "effect-subtle"
    );


    await wait(700);


    node.element.classList.remove(
      "effect-subtle"
    );


    /*
      Long delay before the remote consequence appears.
    */

    await wait(1800);


    H1.element.classList.add(
      "is-visible"
    );

    showLine(line1);


    await wait(700);


    H2.element.classList.add(
      "is-visible"
    );

    showLine(line2);


    await wait(700);


    H3.element.classList.add(
      "is-visible",
      "is-persistent"
    );

    showLine(line3);


    await wait(700);


    /*
      Intermediate states disappear.

      The distant terminal consequence survives.
    */

    H1.element.classList.add(
      "is-gone"
    );


    H2.element.classList.add(
      "is-gone"
    );


    markDependentAsResidue(
      H3
    );


    /*
      Preserve the causal trace even though H1 and H2
      themselves no longer remain.
    */

    markLineAsResidue(
      centerLine
    );


    markLineAsResidue(
      line1
    );


    markLineAsResidue(
      line2
    );


    markLineAsResidue(
      line3
    );


    await wait(3200);
  }


  /* -------------------------------------------------------
     CASE I

     One dependent appears.

     Both primary and dependent recover completely.

     The dependent explicitly fades all the way out before
     the observation hold begins.
     ------------------------------------------------------- */

  async function runProfileI() {
    if (resolved) return;


    const node =
      getNode("I");


    const centerLine =
      getOrCreateLine(
        "center-I"
      );


    const I1 =
      getOrCreateDependent(
        "I1",
        "I",
        25,
        62
      );


    const dependentLine =
      getOrCreateLine(
        "I-I1"
      );


    focusCase("I");

    updateDynamicGeometry();


    await wait(700);


    showLine(centerLine);


    await wait(700);


    node.element.classList.add(
      "effect-moderate"
    );


    await wait(900);


    I1.element.classList.add(
      "is-visible"
    );


    showLine(
      dependentLine
    );


    await wait(1000);


    node.element.classList.remove(
      "effect-moderate"
    );


    I1.element.classList.add(
      "is-weakened"
    );


    await wait(700);


    /*
      Explicit complete disappearance.
    */

    I1.element.classList.remove(
      "is-weakened"
    );


    I1.element.classList.add(
      "is-gone"
    );


    dependentLine.classList.remove(
      "is-visible"
    );


    await wait(700);


    centerLine.classList.add(
      "is-hold"
    );


    await wait(2400);
  }


  /* -------------------------------------------------------
     CASE TABLE
     ------------------------------------------------------- */

  const observationCases = [
    {
      id: "A",
      run: runProfileA
    },

    {
      id: "B",
      run: runProfileB
    },

    {
      id: "C",
      run: runProfileC
    },

    {
      id: "D",
      run: runProfileD
    },

    {
      id: "E",
      run: runProfileE
    },

    {
      id: "F",
      run: runProfileF
    },

    {
      id: "G",
      run: runProfileG
    },

    {
      id: "H",
      run: runProfileH
    },

    {
      id: "I",
      run: runProfileI
    }
  ];


  /* -------------------------------------------------------
     OBSERVATION CYCLE

     Persistent consequences now accumulate.

     They are cleared only when all nine observations have
     finished and a completely new cycle begins.
     ------------------------------------------------------- */

  async function runObservationCycle() {
    const myToken =
      ++cycleToken;


    while (
      !resolved &&
      myToken === cycleToken
    ) {

      /*
        Start a genuinely fresh observational cycle.
      */

      clearEntireCycle();


      await wait(2600);


      const sequence =
        shuffle(
          observationCases
        );


      for (
        const observationCase
        of sequence
      ) {

        if (
          resolved ||
          myToken !== cycleToken
        ) {
          return;
        }


        /*
          Remove only temporary information from the
          previous case.

          Existing residues remain.
        */

        clearCurrentCase();


        await wait(900);


        await observationCase.run();


        if (
          resolved ||
          myToken !== cycleToken
        ) {
          return;
        }


        /*
          Case ends.

          Temporary effects vanish, but persistent
          consequences remain in the field.
        */

        clearCurrentCase();


        await wait(
          randomBetween(
            1300,
            1800
          )
        );
      }


      /*
        Once all nine observations have occurred, hold the
        accumulated system state for a while.

        This lets the reader see how much consequence has
        survived the full observation cycle.
      */

      clearCurrentCase();


      await wait(5000);


      /*
        The next pass begins with an entirely clean field.
      */
    }
  }
/* -------------------------------------------------------
   SERVER ASSESSMENT HANDOFF
   ------------------------------------------------------- */

async function requestAssessmentChallenge() {
  try {
    const response =
      await fetch(
        "/restricted/access",
        {
          method: "GET",

          headers: {
            "Accept":
              "application/json"
          },

          cache:
            "no-store"
        }
      );


    if (!response.ok) {
      return null;
    }


    const data =
      await response.json();


    if (
      !data.ok ||
      !data.challenge
    ) {
      return null;
    }


    assessmentChallenge =
      data.challenge;


    return assessmentChallenge;

  } catch (error) {

    return null;
  }
}


function getInterpretation() {
  const interpretation = {};


  profiles.forEach(
    node => {
      interpretation[
        node.profile
      ] =
        node.currentClass;
    }
  );


  return interpretation;
}


async function authorizeInterpretation() {
  /*
    If the challenge has expired or was not acquired,
    obtain a fresh one.
  */

  if (!assessmentChallenge) {
    await requestAssessmentChallenge();
  }


  if (!assessmentChallenge) {
    return false;
  }


  try {
    let response =
      await fetch(
        "/restricted/access",
        {
          method: "POST",

          headers: {
            "Content-Type":
              "application/json",

            "Accept":
              "application/json"
          },

          body:
            JSON.stringify({
              challenge:
                assessmentChallenge,

              interpretation:
                getInterpretation()
            })
        }
      );


    let data =
      await response.json();


    /*
      If the challenge simply aged out while the reader was
      studying the field, quietly obtain a fresh one and retry.
    */

    if (
      !response.ok &&
      data.expired
    ) {
      assessmentChallenge =
        await requestAssessmentChallenge();


      if (!assessmentChallenge) {
        return false;
      }


      response =
        await fetch(
          "/restricted/access",
          {
            method: "POST",

            headers: {
              "Content-Type":
                "application/json",

              "Accept":
                "application/json"
            },

            body:
              JSON.stringify({
                challenge:
                  assessmentChallenge,

                interpretation:
                  getInterpretation()
              })
          }
        );


      data =
        await response.json();
    }


    if (
      !response.ok ||
      !data.ok
    ) {
      return false;
    }


    accessAuthorized = true;

    return true;

  } catch (error) {

    return false;
  }
}

  /* -------------------------------------------------------
     RESOLUTION
     ------------------------------------------------------- */

async function resolveAssessment() {
  if (resolved) {
    return;
  }


  /*
    First ask the server whether the complete relationship
    presented by the browser satisfies the protected
    condition.

    Nothing visible happens yet.
  */

  const authorized =
    await authorizeInterpretation();


  if (!authorized) {
    return;
  }


  resolved = true;

  cycleToken += 1;


  field.classList.remove(
    "is-adjusting"
  );


  clearCaseFocus();


  profiles.forEach(
    node => {

      node.isDragging = false;

      node.element.classList.remove(
        "is-dragging"
      );
    }
  );


  /*
    Final placement appears ordinary for a moment.
  */

  await wait(700);


  field.classList.add(
    "is-resolving"
  );


  await wait(1100);


  field.classList.add(
    "is-condensing"
  );


  await wait(1200);


  field.classList.add(
    "is-map-visible"
  );


  /*
    Let the revealed relational grammar exist on screen
    briefly before continuing into the protected system.
  */

  await wait(2200);


  if (accessAuthorized) {
    window.location.href =
      "/restricted/archive/";
  }
}


  /* -------------------------------------------------------
     INITIALIZE
     ------------------------------------------------------- */

  assignMarkers();

  assignGeometry();


  profiles.forEach(
    node => {
      attachDragHandlers(
        node
      );
    }
  );


  positionAllNodes();


  field.classList.add(
    "is-ready"
  );
const params =
  new URLSearchParams(
    window.location.search
  );

const devBypass =
  params.get("dev") === "1";
requestAssessmentChallenge();
window.requestAnimationFrame(
  () => {

if (devBypass) {

  profiles.forEach(
    node => {

      const targetClass =
        TARGET_CLASS[
          node.profile
        ];


      node.currentClass =
        targetClass;


      node.radiusRatio =
        RADIAL_CLASSES[
          targetClass
        ];


      positionNode(
        node
      );
    }
  );


  updateDynamicGeometry();

  resolveAssessment();

  return;
}


  window.addEventListener(
    "resize",
    () => {

      positionAllNodes();
    }
  );

});