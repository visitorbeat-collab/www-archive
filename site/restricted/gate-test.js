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


  const nodeElements = Array.from(
    field.querySelectorAll(".gate-node")
  );


  /* -------------------------------------------------------
     CONFIGURATION
     ------------------------------------------------------- */

  const MIN_ANGLE_GAP = 28;

  const MIN_RADIUS_RATIO = 0.24;
  const MAX_RADIUS_RATIO = 0.44;

  const DRAG_MIN_RATIO = 0.08;
  const DRAG_MAX_RATIO = 0.88;


  /*
    Hidden required relational classes.

    0 = innermost
    1 = second
    2 = third
    3 = outermost
  */

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


  /*
    The exact four radial contour centerlines.

    Every released node snaps to whichever of these
    four radii is physically closest.
  */

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
     ANGLE GENERATION
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
     SNAP TO NEAREST CONTOUR
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
      index < RADIAL_CLASSES.length;
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


    /*
      Every release now snaps exactly to one of the
      four visible radial contours.
    */

    snapNodeToNearestContour(
      node
    );


    /*
      Validation happens only after the snap.
    */

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
     WHOLE-MODEL VALIDATION
     ------------------------------------------------------- */

  function evaluateWholeModel() {
    if (resolved) {
      return;
    }


    /*
      Every primary node must first have been deliberately
      assigned to a contour.

      This avoids treating a random starting position as an
      intentional interpretation.
    */

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
        node => {
          return (
            node.currentClass ===
            TARGET_CLASS[
              node.profile
            ]
          );
        }
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
      "is-faint",
      "is-residual",
      "is-remote"
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
     RESET
     ------------------------------------------------------- */

  function clearPrimaryEffects() {
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
          "effect-residual"
        );
      }
    );
  }


  function hideAllLines() {
    dynamicLines.forEach(
      hideLine
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
    if (resolved) {
      return;
    }


    clearPrimaryEffects();

    hideAllLines();

    hideAllDependents();
  }


  /* -------------------------------------------------------
     A — dramatic / reversible
     ------------------------------------------------------- */

  async function runProfileA() {
    if (resolved) return;


    const node =
      getNode("A");


    const line =
      getOrCreateLine(
        "center-A"
      );


    updateDynamicGeometry();

    showLine(line);

    await wait(400);


    if (resolved) return;


    node.element.classList.add(
      "effect-strong"
    );


    await wait(1300);


    node.element.classList.remove(
      "effect-strong"
    );


    await wait(700);


    hideLine(line);


    await wait(500);
  }


  /* -------------------------------------------------------
     B — silent dependency hub
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


    updateDynamicGeometry();

    showLine(centerLine);


    node.element.classList.add(
      "effect-subtle"
    );


    await wait(800);


    node.element.classList.remove(
      "effect-subtle"
    );


    await wait(1100);


    if (resolved) return;


    B1.element.classList.add(
      "is-visible"
    );

    showLine(line1);


    await wait(400);


    B2.element.classList.add(
      "is-visible"
    );

    showLine(line2);


    await wait(400);


    B3.element.classList.add(
      "is-visible"
    );

    showLine(line3);


    await wait(850);


    B1.element.classList.add(
      "is-weakened"
    );


    await wait(450);


    B2.element.classList.add(
      "is-collapsed"
    );


    await wait(450);


    B3.element.classList.add(
      "is-weakened",
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


    await wait(1300);
  }


  /* -------------------------------------------------------
     C — broad propagation
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


    updateDynamicGeometry();

    showLine(centerLine);


    await wait(350);


    node.element.classList.add(
      "effect-moderate"
    );


    await wait(900);


    if (resolved) return;


    C1.element.classList.add(
      "is-visible"
    );

    showLine(line1);


    await wait(350);


    C2.element.classList.add(
      "is-visible"
    );

    showLine(line2);


    await wait(350);


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


    await wait(1200);
  }


  /* -------------------------------------------------------
     D — severe / reversible
     ------------------------------------------------------- */

  async function runProfileD() {
    if (resolved) return;


    const node =
      getNode("D");


    const line =
      getOrCreateLine(
        "center-D"
      );


    updateDynamicGeometry();

    showLine(line);


    await wait(350);


    node.element.classList.add(
      "effect-collapse"
    );


    await wait(1500);


    node.element.classList.remove(
      "effect-collapse"
    );


    await wait(900);


    hideLine(line);


    await wait(450);
  }


  /* -------------------------------------------------------
     E — contained
     ------------------------------------------------------- */

  async function runProfileE() {
    if (resolved) return;


    const node =
      getNode("E");


    const line =
      getOrCreateLine(
        "center-E"
      );


    updateDynamicGeometry();

    showLine(line);


    await wait(350);


    node.element.classList.add(
      "effect-small"
    );


    await wait(800);


    node.element.classList.remove(
      "effect-small"
    );


    await wait(500);


    hideLine(line);


    await wait(450);
  }


  /* -------------------------------------------------------
     F — persistent
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


    updateDynamicGeometry();

    showLine(centerLine);


    await wait(400);


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


    centerLine.classList.add(
      "is-faint"
    );


    await wait(1200);


    if (resolved) return;


    F1.element.classList.add(
      "is-visible",
      "is-persistent"
    );


    dependentLine.classList.add(
      "is-visible",
      "is-residual"
    );


    await wait(1300);
  }


  /* -------------------------------------------------------
     G — substantial propagation
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


    updateDynamicGeometry();

    showLine(centerLine);


    await wait(350);


    node.element.classList.add(
      "effect-substantial"
    );


    await wait(850);


    if (resolved) return;


    G1.element.classList.add(
      "is-visible"
    );

    showLine(line1);


    await wait(450);


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


    centerLine.classList.add(
      "is-faint"
    );


    line1.classList.add(
      "is-faint"
    );


    line2.classList.add(
      "is-residual"
    );


    await wait(1100);
  }


  /* -------------------------------------------------------
     H — delayed boundary-crossing consequence
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


    updateDynamicGeometry();

    showLine(centerLine);


    node.element.classList.add(
      "effect-subtle"
    );


    await wait(650);


    node.element.classList.remove(
      "effect-subtle"
    );


    centerLine.classList.add(
      "is-faint"
    );


    await wait(2100);


    if (resolved) return;


    H1.element.classList.add(
      "is-visible"
    );

    showLine(line1);


    await wait(650);


    H2.element.classList.add(
      "is-visible"
    );

    showLine(line2);


    await wait(650);


    H3.element.classList.add(
      "is-visible",
      "is-persistent"
    );

    showLine(line3);


    line1.classList.add(
      "is-residual"
    );


    line2.classList.add(
      "is-residual"
    );


    line3.classList.add(
      "is-residual"
    );


    await wait(1500);
  }


  /* -------------------------------------------------------
     I — contained dependency
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


    const line =
      getOrCreateLine(
        "I-I1"
      );


    updateDynamicGeometry();

    showLine(centerLine);


    node.element.classList.add(
      "effect-moderate"
    );


    await wait(750);


    if (resolved) return;


    I1.element.classList.add(
      "is-visible"
    );

    showLine(line);


    await wait(850);


    node.element.classList.remove(
      "effect-moderate"
    );


    I1.element.classList.add(
      "is-weakened"
    );


    await wait(650);


    I1.element.classList.remove(
      "is-visible",
      "is-weakened"
    );


    hideLine(line);

    hideLine(centerLine);


    await wait(400);
  }


  /* -------------------------------------------------------
     COMPARISON GROUPS
     ------------------------------------------------------- */

  async function runADPair() {
    await Promise.all([
      runProfileA(),
      runProfileD()
    ]);
  }


  async function runGIPair() {
    await Promise.all([
      runProfileG(),
      runProfileI()
    ]);
  }


  /* -------------------------------------------------------
     RANDOMIZED OBSERVATION ORDER
     ------------------------------------------------------- */

  const eventGroups = [
    {
      id: "AD",
      run: runADPair
    },

    {
      id: "C",
      run: runProfileC
    },

    {
      id: "B",
      run: runProfileB
    },

    {
      id: "GI",
      run: runGIPair
    },

    {
      id: "F",
      run: runProfileF
    },

    {
      id: "H",
      run: runProfileH
    },

    {
      id: "E",
      run: runProfileE
    }
  ];


  async function runObservationCycle() {
    const myToken =
      ++cycleToken;


    while (
      !resolved &&
      myToken === cycleToken
    ) {
      fullReset();

      updateDynamicGeometry();


      await wait(3200);


      const sequence =
        shuffle(
          eventGroups
        );


      for (
        const eventGroup of sequence
      ) {
        if (
          resolved ||
          myToken !== cycleToken
        ) {
          return;
        }


        await eventGroup.run();


        if (
          resolved ||
          myToken !== cycleToken
        ) {
          return;
        }


        await wait(
          randomBetween(
            850,
            1350
          )
        );
      }


      if (
        resolved ||
        myToken !== cycleToken
      ) {
        return;
      }


      await wait(6000);
    }
  }


  /* -------------------------------------------------------
     RESOLUTION
     ------------------------------------------------------- */

  async function resolveAssessment() {
    if (resolved) {
      return;
    }


    resolved = true;


    cycleToken += 1;


    field.classList.remove(
      "is-adjusting"
    );


    profiles.forEach(
      node => {
        node.isDragging = false;


        node.element.classList.remove(
          "is-dragging"
        );
      }
    );


    await wait(700);


    field.classList.add(
      "is-resolved"
    );


    await wait(1800);
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


  window.requestAnimationFrame(
    () => {
      updateDynamicGeometry();

      runObservationCycle();
    }
  );


  window.addEventListener(
    "resize",
    () => {
      positionAllNodes();
    }
  );
});