"use strict";

document.addEventListener("DOMContentLoaded", () => {

  const field = document.getElementById("gate-field");
  const centerElement = document.getElementById("gate-center");
  const causalLayer = document.getElementById("causal-layer");
  const dependentLayer = document.getElementById("dependent-layer");

  if (
    !field ||
    !centerElement ||
    !causalLayer ||
    !dependentLayer
  ) {
    return;
  }


  /* =========================================================
     CONFIG
     ========================================================= */

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

  const MIN_RADIUS_RATIO = 0.24;
  const MAX_RADIUS_RATIO = 0.44;

  const DRAG_MIN_RATIO = 0.08;
  const DRAG_MAX_RATIO = 0.88;

  let resolved = false;
  let cycleToken = 0;

  let assessmentChallenge = null;
  let accessAuthorized = false;


  /* =========================================================
     UTILITIES
     ========================================================= */

  function wait(ms) {
    return new Promise(resolve => {
      window.setTimeout(resolve, ms);
    });
  }

  function randomBetween(min, max) {
    return min + Math.random() * (max - min);
  }

  function shuffle(array) {
    const copy = [...array];

    for (let i = copy.length - 1; i > 0; i -= 1) {
      const j = Math.floor(Math.random() * (i + 1));

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

  function radians(degrees) {
    return degrees * Math.PI / 180;
  }


  /* =========================================================
     PRIMARY NODES
     ========================================================= */

  const profiles = Array.from(
    field.querySelectorAll(".gate-node")
  ).map(element => ({
    element,
    profile: element.dataset.profile,
    angle: 0,
    radiusRatio: 0,
    currentClass: null,
    isDragging: false
  }));

  function getNode(profileId) {
    return profiles.find(
      node => node.profile === profileId
    );
  }


  /* =========================================================
     GEOMETRY
     ========================================================= */

  function getFieldGeometry() {
    const rect = field.getBoundingClientRect();

    const size = Math.min(
      rect.width,
      rect.height
    );

    return {
      rect,
      centerX: rect.width / 2,
      centerY: rect.height / 2,
      usableRadius: size * 0.49
    };
  }

  function getElementCenter(element) {
    const fieldRect = field.getBoundingClientRect();
    const rect = element.getBoundingClientRect();

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

  function generateAngles(count) {
    const step = 360 / count;
    const rotation = Math.random() * 360;

    return Array.from(
      { length: count },
      (_, index) =>
        rotation +
        index * step +
        randomBetween(-8, 8)
    );
  }

  function assignGeometry() {
    const angles = generateAngles(
      profiles.length
    );

    const radii = shuffle([
      0.27,
      0.30,
      0.31,
      0.33,
      0.35,
      0.37,
      0.39,
      0.41,
      0.43
    ]);

    profiles.forEach((node, index) => {

      node.angle = angles[index];

      node.radiusRatio = Math.max(
        MIN_RADIUS_RATIO,
        Math.min(
          MAX_RADIUS_RATIO,
          radii[index] +
          randomBetween(-0.012, 0.012)
        )
      );

      node.currentClass = null;
    });
  }

  function positionNode(node) {
    const {
      centerX,
      centerY,
      usableRadius
    } = getFieldGeometry();

    const angle = radians(node.angle);

    const radius =
      usableRadius *
      node.radiusRatio;

    node.element.style.left =
      `${
        centerX +
        Math.cos(angle) *
        radius
      }px`;

    node.element.style.top =
      `${
        centerY +
        Math.sin(angle) *
        radius
      }px`;
  }

  function positionAllNodes() {
    profiles.forEach(positionNode);

    updateDynamicGeometry();
  }


  /* =========================================================
     RANDOM MARKERS
     ========================================================= */

  function assignMarkers() {
    const shuffled =
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
          marker => {
            mark.classList.remove(marker);
          }
        );

        mark.classList.add(
          shuffled[index]
        );
      }
    );
  }


  /* =========================================================
     SNAP
     ========================================================= */

  function getNearestClass(radiusRatio) {
    let nearest = 0;

    let distance =
      Math.abs(
        radiusRatio -
        RADIAL_CLASSES[0]
      );

    for (
      let i = 1;
      i < RADIAL_CLASSES.length;
      i += 1
    ) {
      const candidate =
        Math.abs(
          radiusRatio -
          RADIAL_CLASSES[i]
        );

      if (candidate < distance) {
        nearest = i;
        distance = candidate;
      }
    }

    return nearest;
  }

  function snapNode(node) {
    const radialClass =
      getNearestClass(
        node.radiusRatio
      );

    node.currentClass =
      radialClass;

    node.radiusRatio =
      RADIAL_CLASSES[
        radialClass
      ];

    positionNode(node);
    updateDynamicGeometry();
  }


  /* =========================================================
     DRAGGING
     ========================================================= */

  function pointerRadiusRatio(
    clientX,
    clientY
  ) {
    const geometry =
      getFieldGeometry();

    const x =
      clientX -
      geometry.rect.left;

    const y =
      clientY -
      geometry.rect.top;

    const dx =
      x -
      geometry.centerX;

    const dy =
      y -
      geometry.centerY;

    return (
      Math.sqrt(
        dx * dx +
        dy * dy
      ) /
      geometry.usableRadius
    );
  }

  function beginDrag(event, node) {
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

    updateDrag(event, node);
  }

  function updateDrag(event, node) {
    if (
      !node.isDragging ||
      resolved
    ) {
      return;
    }

    node.radiusRatio =
      Math.max(
        DRAG_MIN_RATIO,
        Math.min(
          DRAG_MAX_RATIO,
          pointerRadiusRatio(
            event.clientX,
            event.clientY
          )
        )
      );

    positionNode(node);
    updateDynamicGeometry();
  }

  function endDrag(event, node) {
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

    snapNode(node);
    evaluateWholeModel();
  }

  function attachDragHandlers(node) {

    node.element.addEventListener(
      "pointerdown",
      event =>
        beginDrag(event, node)
    );

    node.element.addEventListener(
      "pointermove",
      event =>
        updateDrag(event, node)
    );

    node.element.addEventListener(
      "pointerup",
      event =>
        endDrag(event, node)
    );

    node.element.addEventListener(
      "pointercancel",
      event =>
        endDrag(event, node)
    );
  }


  /* =========================================================
     VALIDATION
     ========================================================= */

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


  /* =========================================================
     DYNAMIC LINES / DEPENDENTS
     ========================================================= */

  const dynamicLines = new Map();
  const dependents = new Map();

  function createLine(id) {
    const line =
      document.createElementNS(
        "http://www.w3.org/2000/svg",
        "line"
      );

    line.classList.add(
      "causal-line"
    );

    line.dataset.lineId = id;

    causalLayer.appendChild(line);

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

  function showLine(line) {
    line.classList.add(
      "is-visible"
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
    return (
      dependents.get(id) ||
      createDependent(
        id,
        parentProfile,
        angleOffset,
        distance,
        options
      )
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

    const angle =
      radians(
        parent.angle +
        dependent.angleOffset
      );

    dependent.element.style.left =
      `${
        parentCenter.x +
        Math.cos(angle) *
        dependent.distance
      }px`;

    dependent.element.style.top =
      `${
        parentCenter.y +
        Math.sin(angle) *
        dependent.distance
      }px`;
  }

  function setLine(
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

  function updateCenterLine(profileId) {
    const node =
      getNode(profileId);

    const line =
      dynamicLines.get(
        `center-${profileId}`
      );

    if (!node || !line) {
      return;
    }

    setLine(
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
      dynamicLines.get(lineId);

    if (
      !node ||
      !dependent ||
      !line
    ) {
      return;
    }

    setLine(
      line,
      getElementCenter(
        node.element
      ),
      getElementCenter(
        dependent.element
      )
    );
  }

  function updateDependentChain(
    firstId,
    secondId,
    lineId
  ) {
    const first =
      dependents.get(firstId);

    const second =
      dependents.get(secondId);

    const line =
      dynamicLines.get(lineId);

    if (
      !first ||
      !second ||
      !line
    ) {
      return;
    }

    setLine(
      line,
      getElementCenter(
        first.element
      ),
      getElementCenter(
        second.element
      )
    );
  }

  function updateDynamicGeometry() {

    dependents.forEach(
      positionDependent
    );

    profiles.forEach(
      node =>
        updateCenterLine(
          node.profile
        )
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
      ([profile, dependent, line]) =>
        updateDependentLine(
          profile,
          dependent,
          line
        )
    );

    updateDependentChain(
      "H1",
      "H2",
      "H1-H2"
    );

    updateDependentChain(
      "H2",
      "H3",
      "H2-H3"
    );
  }


  /* =========================================================
     ACTIVE CASE
     ========================================================= */

  function focusCase(profileId) {

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


  /* =========================================================
     RESET BEHAVIOR
     ========================================================= */

  function clearCurrentCase() {

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
          "effect-small"
        );

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

    dynamicLines.forEach(
      line => {

        if (
          line.classList.contains(
            "is-cycle-residue"
          )
        ) {
          line.classList.add(
            "is-visible"
          );

          line.classList.remove(
            "is-hold",
            "is-faint"
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

  function clearEntireCycle() {

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


  /* =========================================================
     OBSERVATION A
     dramatic / reversible
     ========================================================= */

  async function runA() {

    if (resolved) return;

    const node = getNode("A");
    const line =
      getOrCreateLine("center-A");

    focusCase("A");
    updateDynamicGeometry();

    await wait(700);

    showLine(line);

    await wait(700);

    node.element.classList.add(
      "effect-strong"
    );

    await wait(1500);

    node.element.classList.remove(
      "effect-strong"
    );

    line.classList.add(
      "is-hold"
    );

    await wait(2400);
  }


  /* =========================================================
     OBSERVATION B
     weak local response / downstream degradation
     ========================================================= */

  async function runB() {

    if (resolved) return;

    const node = getNode("B");

    const centerLine =
      getOrCreateLine("center-B");

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
      getOrCreateLine("B-B1");

    const line2 =
      getOrCreateLine("B-B2");

    const line3 =
      getOrCreateLine("B-B3");

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

    markDependentAsResidue(B3);
    markLineAsResidue(centerLine);
    markLineAsResidue(line3);

    await wait(3000);
  }


  /* =========================================================
     OBSERVATION C
     three dependents / one lasting
     ========================================================= */

  async function runC() {

    if (resolved) return;

    const node = getNode("C");

    const centerLine =
      getOrCreateLine("center-C");

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
      getOrCreateLine("C-C1");

    const line2 =
      getOrCreateLine("C-C2");

    const line3 =
      getOrCreateLine("C-C3");

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

    markDependentAsResidue(C3);
    markLineAsResidue(centerLine);
    markLineAsResidue(line3);

    await wait(3000);
  }


  /* =========================================================
     OBSERVATION D
     dramatic collapse / reversible
     ========================================================= */

  async function runD() {

    if (resolved) return;

    const node = getNode("D");

    const line =
      getOrCreateLine("center-D");

    focusCase("D");
    updateDynamicGeometry();

    await wait(700);

    showLine(line);

    await wait(700);

    node.element.classList.add(
      "effect-collapse"
    );

    await wait(1600);

    node.element.classList.remove(
      "effect-collapse"
    );

    line.classList.add(
      "is-hold"
    );

    await wait(2400);
  }


  /* =========================================================
     OBSERVATION E
     small / contained / reversible
     ========================================================= */

  async function runE() {

    if (resolved) return;

    const node = getNode("E");

    const line =
      getOrCreateLine("center-E");

    focusCase("E");
    updateDynamicGeometry();

    await wait(700);

    showLine(line);

    await wait(700);

    node.element.classList.add(
      "effect-small"
    );

    await wait(1000);

    node.element.classList.remove(
      "effect-small"
    );

    line.classList.add(
      "is-hold"
    );

    await wait(2400);
  }


  /* =========================================================
     OBSERVATION F
     primary + dependent persist
     ========================================================= */

  async function runF() {

    if (resolved) return;

    const node = getNode("F");

    const centerLine =
      getOrCreateLine("center-F");

    const F1 =
      getOrCreateDependent(
        "F1",
        "F",
        30,
        67
      );

    const line =
      getOrCreateLine("F-F1");

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

    showLine(line);

    node.element.classList.add(
      "is-cycle-residue"
    );

    markDependentAsResidue(F1);
    markLineAsResidue(centerLine);
    markLineAsResidue(line);

    await wait(3000);
  }


  /* =========================================================
     OBSERVATION G
     two dependents / one lasting
     ========================================================= */

  async function runG() {

    if (resolved) return;

    const node = getNode("G");

    const centerLine =
      getOrCreateLine("center-G");

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
      getOrCreateLine("G-G1");

    const line2 =
      getOrCreateLine("G-G2");

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

    markDependentAsResidue(G2);
    markLineAsResidue(centerLine);
    markLineAsResidue(line2);

    await wait(3000);
  }


  /* =========================================================
     OBSERVATION H
     delayed remote chain
     ========================================================= */

  async function runH() {

    if (resolved) return;

    const node = getNode("H");

    const centerLine =
      getOrCreateLine("center-H");

    const H1 =
      getOrCreateDependent(
        "H1",
        "H",
        2,
        118,
        { remote: true }
      );

    const H2 =
      getOrCreateDependent(
        "H2",
        "H",
        2,
        188,
        { remote: true }
      );

    const H3 =
      getOrCreateDependent(
        "H3",
        "H",
        2,
        252,
        { remote: true }
      );

    const line1 =
      getOrCreateLine("H-H1");

    const line2 =
      getOrCreateLine("H1-H2");

    const line3 =
      getOrCreateLine("H2-H3");

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

    H1.element.classList.add(
      "is-gone"
    );

    H2.element.classList.add(
      "is-gone"
    );

    markDependentAsResidue(H3);

    markLineAsResidue(centerLine);
    markLineAsResidue(line1);
    markLineAsResidue(line2);
    markLineAsResidue(line3);

    await wait(3200);
  }


  /* =========================================================
     OBSERVATION I
     one dependent / complete recovery
     ========================================================= */

  async function runI() {

    if (resolved) return;

    const node = getNode("I");

    const centerLine =
      getOrCreateLine("center-I");

    const I1 =
      getOrCreateDependent(
        "I1",
        "I",
        25,
        62
      );

    const line =
      getOrCreateLine("I-I1");

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

    showLine(line);

    await wait(1000);

    node.element.classList.remove(
      "effect-moderate"
    );

    I1.element.classList.add(
      "is-weakened"
    );

    await wait(700);

    I1.element.classList.remove(
      "is-weakened"
    );

    I1.element.classList.add(
      "is-gone"
    );

    line.classList.remove(
      "is-visible"
    );

    await wait(700);

    centerLine.classList.add(
      "is-hold"
    );

    await wait(2400);
  }


  /* =========================================================
     OBSERVATION CYCLE
     ========================================================= */

  const observationCases = [
    runA,
    runB,
    runC,
    runD,
    runE,
    runF,
    runG,
    runH,
    runI
  ];

  async function runObservationCycle() {

    const myToken =
      ++cycleToken;

    while (
      !resolved &&
      myToken === cycleToken
    ) {

      clearEntireCycle();

      await wait(2600);

      const sequence =
        shuffle(
          observationCases
        );

      for (
        const runCase
        of sequence
      ) {

        if (
          resolved ||
          myToken !== cycleToken
        ) {
          return;
        }

        clearCurrentCase();

        await wait(900);

        await runCase();

        if (
          resolved ||
          myToken !== cycleToken
        ) {
          return;
        }

        clearCurrentCase();

        await wait(
          randomBetween(
            1300,
            1800
          )
        );
      }

      clearCurrentCase();

      await wait(5000);
    }
  }


  /* =========================================================
     SERVER CHALLENGE
     ========================================================= */

  async function requestAssessmentChallenge() {

    try {

      const response =
        await fetch(
          "/restricted/access",
          {
            method: "GET",
            cache: "no-store",

            headers: {
              "Accept":
                "application/json"
            }
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

    if (!assessmentChallenge) {
      await requestAssessmentChallenge();
    }

    if (!assessmentChallenge) {
      return false;
    }

    async function submit() {

      return fetch(
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
    }

    try {

      let response =
        await submit();

      let data =
        await response.json();

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
          await submit();

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


  /* =========================================================
     RESOLUTION
     ========================================================= */

  async function resolveAssessment(
    options = {}
  ) {

    if (resolved) {
      return;
    }

    const bypassAuthorization =
      options.bypassAuthorization === true;

    if (!bypassAuthorization) {

      const authorized =
        await authorizeInterpretation();

      if (!authorized) {
        return;
      }
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

    await wait(2200);

    /*
      Development mode deliberately stops on the
      resolved map.

      The real authorized gate enters the protected archive.
    */

    if (
      !bypassAuthorization &&
      accessAuthorized
    ) {
      window.location.href =
        "/restricted/archive/";
    }
  }


  /* =========================================================
     INITIALIZE
     ========================================================= */

  assignMarkers();
  assignGeometry();

  profiles.forEach(
    attachDragHandlers
  );

  positionAllNodes();

  field.classList.add(
    "is-ready"
  );


  /*
    IMPORTANT:

    Cloudflare Pages may canonicalize:

      /restricted/gate-test.html

    to:

      /restricted/gate-test

    Therefore both pathnames are intentionally accepted here.
  */

  const params =
    new URLSearchParams(
      window.location.search
    );

  const pathname =
    window.location.pathname
      .replace(/\/+$/, "");

  const isGateTestPage =
    pathname ===
      "/restricted/gate-test" ||
    pathname ===
      "/restricted/gate-test.html";

  const devBypass =
    isGateTestPage &&
    params.get("dev") === "1";


  /*
    Production requests its server challenge immediately.
    The development visualization does not need one.
  */

  if (!devBypass) {
    requestAssessmentChallenge();
  }


  window.requestAnimationFrame(
    () => {

      updateDynamicGeometry();


      if (devBypass) {

        /*
          Place every node into its canonical radial class.
        */

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

            positionNode(node);
          }
        );

        updateDynamicGeometry();


        /*
          Development bypass is visual-only.
        */

        resolveAssessment({
          bypassAuthorization: true
        });

        return;
      }


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