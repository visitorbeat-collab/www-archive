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

  function radians(degrees) {
    return (
      degrees *
      Math.PI /
      180
    );
  }


  /* =========================================================
     PRIMARY STATE
     ========================================================= */

  const profiles =
    Array.from(
      field.querySelectorAll(
        ".gate-node"
      )
    ).map(
      element => ({
        element,

        profile:
          element.dataset.profile,

        angle: 0,

        radiusRatio: 0,

        currentClass: null,

        isDragging: false
      })
    );

  function getNode(profileId) {
    return profiles.find(
      node =>
        node.profile === profileId
    );
  }


  /* =========================================================
     GEOMETRY
     ========================================================= */

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

  function generateAngles(count) {
    const step =
      360 / count;

    const rotation =
      Math.random() * 360;

    return Array.from(
      {
        length: count
      },

      (_, index) =>
        rotation +
        index * step +
        randomBetween(
          -5,
          5
        )
    );
  }

  function assignGeometry() {
    const angles =
      generateAngles(
        profiles.length
      );

    const radii =
      shuffle([
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

    profiles.forEach(
      (node, index) => {

        node.angle =
          angles[index];

        node.radiusRatio =
          Math.max(
            MIN_RADIUS_RATIO,

            Math.min(
              MAX_RADIUS_RATIO,

              radii[index] +
              randomBetween(
                -0.012,
                0.012
              )
            )
          );

        node.currentClass =
          null;
      }
    );
  }

  function positionNode(node) {
    const {
      centerX,
      centerY,
      usableRadius
    } = getFieldGeometry();

    const angle =
      radians(
        node.angle
      );

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
    profiles.forEach(
      positionNode
    );

    updateDynamicGeometry();
  }


  /* =========================================================
     MARKERS
     ========================================================= */

  function assignMarkers() {
    const shuffled =
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
          marker => {
            mark.classList.remove(
              marker
            );
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

  function getNearestClass(
    radiusRatio
  ) {
    let nearest = 0;

    let distance =
      Math.abs(
        radiusRatio -
        RADIAL_CLASSES[0]
      );

    for (
      let i = 1;
      i <
      RADIAL_CLASSES.length;
      i += 1
    ) {
      const candidate =
        Math.abs(
          radiusRatio -
          RADIAL_CLASSES[i]
        );

      if (
        candidate <
        distance
      ) {
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

  function beginDrag(
    event,
    node
  ) {
    if (resolved) {
      return;
    }

    event.preventDefault();

    node.isDragging =
      true;

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

  function endDrag(
    event,
    node
  ) {
    if (!node.isDragging) {
      return;
    }

    node.isDragging =
      false;

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
        beginDrag(
          event,
          node
        )
    );

    node.element.addEventListener(
      "pointermove",

      event =>
        updateDrag(
          event,
          node
        )
    );

    node.element.addEventListener(
      "pointerup",

      event =>
        endDrag(
          event,
          node
        )
    );

    node.element.addEventListener(
      "pointercancel",

      event =>
        endDrag(
          event,
          node
        )
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
     DYNAMIC STRUCTURES
     ========================================================= */

  const dynamicLines =
    new Map();

  const dependents =
    new Map();


  function createLine(
    id,
    classes = []
  ) {
    const line =
      document.createElementNS(
        "http://www.w3.org/2000/svg",
        "line"
      );

    line.classList.add(
      "causal-line",
      ...classes
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

  function getOrCreateLine(
    id,
    classes = []
  ) {
    if (
      dynamicLines.has(id)
    ) {
      return dynamicLines.get(
        id
      );
    }

    return createLine(
      id,
      classes
    );
  }


  /* ---------------------------------------------------------
     PERMANENT PRIMARY LANES
     --------------------------------------------------------- */

  function createPrimaryLanes() {
    profiles.forEach(
      node => {

        const line =
          getOrCreateLine(
            `center-${node.profile}`,
            [
              "is-visible",
              "is-lane"
            ]
          );

        line.dataset.profile =
          node.profile;
      }
    );

    updateDynamicGeometry();
  }

  function activateLane(
    profileId
  ) {
    profiles.forEach(
      node => {

        const line =
          dynamicLines.get(
            `center-${node.profile}`
          );

        if (!line) {
          return;
        }

        line.classList.toggle(
          "is-active-lane",
          node.profile === profileId
        );
      }
    );
  }

  function clearActiveLane() {
    dynamicLines.forEach(
      line => {
        line.classList.remove(
          "is-active-lane"
        );
      }
    );
  }


  /* ---------------------------------------------------------
     DEPENDENTS
     --------------------------------------------------------- */

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

    if (
      options.remote
    ) {
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
    if (
      dependents.has(id)
    ) {
      return dependents.get(
        id
      );
    }

    return createDependent(
      id,
      parentProfile,
      angleOffset,
      distance,
      options
    );
  }

  function markDependentHistory(
    dependent
  ) {
    dependent.element.classList.remove(
      "is-weakened",
      "is-collapsed",
      "is-persistent"
    );

    dependent.element.classList.add(
      "is-visible",
      "is-history"
    );
  }


  /*
    Important:

    Dependent lines are PREPARED here, but are not shown.

    The individual observation functions decide exactly when
    each line becomes visible.
  */

  function prepareDependentLine(
    id,
    extraClasses = []
  ) {
    return getOrCreateLine(
      id,
      [
        "is-dependent-line",
        ...extraClasses
      ]
    );
  }

  function revealDependentLine(
    line
  ) {
    line.classList.add(
      "is-visible"
    );
  }

  function markLinePersistent(
    line
  ) {
    line.classList.add(
      "is-visible",
      "is-cycle-residue"
    );
  }

  function markLineHistory(
    line
  ) {
    line.classList.remove(
      "is-cycle-residue"
    );

    line.classList.add(
      "is-visible",
      "is-history"
    );
  }


  /* ---------------------------------------------------------
     POSITION DEPENDENTS
     --------------------------------------------------------- */

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


  /* ---------------------------------------------------------
     UPDATE LINES
     --------------------------------------------------------- */

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

  function updateCenterLine(
    profileId
  ) {
    const node =
      getNode(profileId);

    const line =
      dynamicLines.get(
        `center-${profileId}`
      );

    if (
      !node ||
      !line
    ) {
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
      dependents.get(
        firstId
      );

    const second =
      dependents.get(
        secondId
      );

    const line =
      dynamicLines.get(
        lineId
      );

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
      relation => {
        updateDependentLine(
          relation[0],
          relation[1],
          relation[2]
        );
      }
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
     CASE FOCUS
     ========================================================= */

  function focusCase(
    profileId
  ) {
    profiles.forEach(
      node => {
        node.element.classList.toggle(
          "is-active-case",
          node.profile === profileId
        );
      }
    );

    activateLane(
      profileId
    );
  }

  function clearCaseFocus() {
    profiles.forEach(
      node => {
        node.element.classList.remove(
          "is-active-case"
        );
      }
    );

    clearActiveLane();
  }


  /* =========================================================
     INITIAL RESET

     Used only once before the observation sequence begins.
     ========================================================= */

  function clearEntireField() {
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

          "history-expand",
          "history-collapse",
          "history-small",

          "primary-persistent"
        );
      }
    );

    dynamicLines.forEach(
      line => {

        if (
          line.classList.contains(
            "is-lane"
          )
        ) {
          line.classList.remove(
            "is-active-lane"
          );

          line.classList.add(
            "is-visible"
          );

          return;
        }

        line.classList.remove(
          "is-visible",
          "is-cycle-residue",
          "is-history"
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
          "is-history"
        );
      }
    );
  }


  /*
    Between cases we clear only the temporary animated state.

    Historical and persistent evidence stays exactly where it
    is.
  */

  function endCurrentCase() {
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
      }
    );
  }


  /* =========================================================
     A
     BIG EXPANSION → RETURNS
     ========================================================= */

  async function runA() {
    if (resolved) return;

    const node =
      getNode("A");

    focusCase("A");

    await wait(700);

    node.element.classList.add(
      "effect-strong"
    );

    await wait(1500);

    node.element.classList.remove(
      "effect-strong"
    );

    node.element.classList.add(
      "history-expand"
    );

    await wait(2200);
  }


  /* =========================================================
     B
     THREE DEPENDENTS
     ========================================================= */

  async function runB() {
    if (resolved) return;

    const node =
      getNode("B");

    const B1 =
      getOrCreateDependent(
        "B1",
        "B",
        -11,
        72
      );

    const B2 =
      getOrCreateDependent(
        "B2",
        "B",
        0,
        90
      );

    const B3 =
      getOrCreateDependent(
        "B3",
        "B",
        11,
        108
      );

    const line1 =
      prepareDependentLine(
        "B-B1"
      );

    const line2 =
      prepareDependentLine(
        "B-B2"
      );

    const line3 =
      prepareDependentLine(
        "B-B3"
      );

    focusCase("B");

    updateDynamicGeometry();

    await wait(700);

    node.element.classList.add(
      "effect-subtle"
    );

    await wait(850);

    node.element.classList.remove(
      "effect-subtle"
    );

    await wait(900);


    /*
      B1 and its connection appear together.
    */

    B1.element.classList.add(
      "is-visible"
    );

    revealDependentLine(
      line1
    );

    await wait(450);


    /*
      B2 and its connection appear together.
    */

    B2.element.classList.add(
      "is-visible"
    );

    revealDependentLine(
      line2
    );

    await wait(450);


    /*
      B3 and its connection appear together.
    */

    B3.element.classList.add(
      "is-visible"
    );

    revealDependentLine(
      line3
    );

    await wait(800);

    B1.element.classList.add(
      "is-weakened"
    );

    await wait(450);

    B2.element.classList.add(
      "is-collapsed"
    );

    await wait(450);

    B3.element.classList.add(
      "is-persistent"
    );

    B1.element.classList.add(
      "is-cycle-residue"
    );

    B2.element.classList.add(
      "is-cycle-residue"
    );

    B3.element.classList.add(
      "is-cycle-residue"
    );

    markLinePersistent(
      line1
    );

    markLinePersistent(
      line2
    );

    markLinePersistent(
      line3
    );

    await wait(2600);
  }


  /* =========================================================
     C
     THREE DEPENDENTS
     ========================================================= */

  async function runC() {
    if (resolved) return;

    const node =
      getNode("C");

    const C1 =
      getOrCreateDependent(
        "C1",
        "C",
        -11,
        72
      );

    const C2 =
      getOrCreateDependent(
        "C2",
        "C",
        0,
        90
      );

    const C3 =
      getOrCreateDependent(
        "C3",
        "C",
        11,
        108
      );

    const line1 =
      prepareDependentLine(
        "C-C1"
      );

    const line2 =
      prepareDependentLine(
        "C-C2"
      );

    const line3 =
      prepareDependentLine(
        "C-C3"
      );

    focusCase("C");

    updateDynamicGeometry();

    await wait(700);

    node.element.classList.add(
      "effect-moderate"
    );

    await wait(900);


    C1.element.classList.add(
      "is-visible"
    );

    revealDependentLine(
      line1
    );

    await wait(450);


    C2.element.classList.add(
      "is-visible"
    );

    revealDependentLine(
      line2
    );

    await wait(450);


    C3.element.classList.add(
      "is-visible"
    );

    revealDependentLine(
      line3
    );

    await wait(850);

    node.element.classList.remove(
      "effect-moderate"
    );

    C1.element.classList.add(
      "is-weakened",
      "is-cycle-residue"
    );

    C2.element.classList.add(
      "is-weakened",
      "is-cycle-residue"
    );

    C3.element.classList.add(
      "is-persistent",
      "is-cycle-residue"
    );

    markLinePersistent(
      line1
    );

    markLinePersistent(
      line2
    );

    markLinePersistent(
      line3
    );

    await wait(2600);
  }


  /* =========================================================
     D
     BIG COLLAPSE → RETURNS
     ========================================================= */

  async function runD() {
    if (resolved) return;

    const node =
      getNode("D");

    focusCase("D");

    await wait(700);

    node.element.classList.add(
      "effect-collapse"
    );

    await wait(1600);

    node.element.classList.remove(
      "effect-collapse"
    );

    node.element.classList.add(
      "history-collapse"
    );

    await wait(2200);
  }


  /* =========================================================
     E
     SMALL TEMPORARY REACTION
     ========================================================= */

  async function runE() {
    if (resolved) return;

    const node =
      getNode("E");

    focusCase("E");

    await wait(700);

    node.element.classList.add(
      "effect-small"
    );

    await wait(1000);

    node.element.classList.remove(
      "effect-small"
    );

    node.element.classList.add(
      "history-small"
    );

    await wait(2200);
  }


  /* =========================================================
     F
     PRIMARY + DEPENDENT PERSIST
     ========================================================= */

  async function runF() {
    if (resolved) return;

    const node =
      getNode("F");

    const F1 =
      getOrCreateDependent(
        "F1",
        "F",
        7,
        82
      );

    const line =
      prepareDependentLine(
        "F-F1"
      );

    focusCase("F");

    updateDynamicGeometry();

    await wait(700);

    node.element.classList.add(
      "effect-moderate"
    );

    await wait(1200);

    node.element.classList.remove(
      "effect-moderate"
    );

    node.element.classList.add(
      "primary-persistent"
    );

    await wait(1000);


    /*
      F1 and its line appear together.
    */

    F1.element.classList.add(
      "is-visible",
      "is-persistent",
      "is-cycle-residue"
    );

    revealDependentLine(
      line
    );

    markLinePersistent(
      line
    );

    await wait(2800);
  }


  /* =========================================================
     G
     TWO DEPENDENTS
     ========================================================= */

  async function runG() {
    if (resolved) return;

    const node =
      getNode("G");

    const G1 =
      getOrCreateDependent(
        "G1",
        "G",
        -9,
        76
      );

    const G2 =
      getOrCreateDependent(
        "G2",
        "G",
        9,
        98
      );

    const line1 =
      prepareDependentLine(
        "G-G1"
      );

    const line2 =
      prepareDependentLine(
        "G-G2"
      );

    focusCase("G");

    updateDynamicGeometry();

    await wait(700);

    node.element.classList.add(
      "effect-substantial"
    );

    await wait(900);


    G1.element.classList.add(
      "is-visible"
    );

    revealDependentLine(
      line1
    );

    await wait(500);


    G2.element.classList.add(
      "is-visible"
    );

    revealDependentLine(
      line2
    );

    await wait(850);

    node.element.classList.remove(
      "effect-substantial"
    );

    G1.element.classList.add(
      "is-weakened",
      "is-cycle-residue"
    );

    G2.element.classList.add(
      "is-persistent",
      "is-cycle-residue"
    );

    markLinePersistent(
      line1
    );

    markLinePersistent(
      line2
    );

    await wait(2600);
  }


  /* =========================================================
     H
     DELAYED LONG OUTWARD CHAIN
     ========================================================= */

  async function runH() {
    if (resolved) return;

    const node =
      getNode("H");

    const H1 =
      getOrCreateDependent(
        "H1",
        "H",
        0,
        115,
        {
          remote: true
        }
      );

    const H2 =
      getOrCreateDependent(
        "H2",
        "H",
        0,
        185,
        {
          remote: true
        }
      );

    const H3 =
      getOrCreateDependent(
        "H3",
        "H",
        0,
        255,
        {
          remote: true
        }
      );

    const line1 =
      prepareDependentLine(
        "H-H1",
        [
          "is-remote"
        ]
      );

    const line2 =
      prepareDependentLine(
        "H1-H2",
        [
          "is-remote"
        ]
      );

    const line3 =
      prepareDependentLine(
        "H2-H3",
        [
          "is-remote"
        ]
      );

    focusCase("H");

    updateDynamicGeometry();

    await wait(700);

    node.element.classList.add(
      "effect-subtle"
    );

    await wait(700);

    node.element.classList.remove(
      "effect-subtle"
    );


    /*
      Intentional delay before remote propagation.
    */

    await wait(1800);


    /*
      First remote consequence and first segment.
    */

    H1.element.classList.add(
      "is-visible"
    );

    revealDependentLine(
      line1
    );

    await wait(650);


    /*
      Second consequence extends the chain.
    */

    H2.element.classList.add(
      "is-visible"
    );

    revealDependentLine(
      line2
    );

    await wait(650);


    /*
      Terminal consequence and final chain segment.
    */

    H3.element.classList.add(
      "is-visible",
      "is-persistent"
    );

    revealDependentLine(
      line3
    );


    H1.element.classList.add(
      "is-cycle-residue"
    );

    H2.element.classList.add(
      "is-cycle-residue"
    );

    H3.element.classList.add(
      "is-cycle-residue"
    );

    markLinePersistent(
      line1
    );

    markLinePersistent(
      line2
    );

    markLinePersistent(
      line3
    );

    await wait(3000);
  }


  /* =========================================================
     I
     ONE DEPENDENT APPEARS THEN DISAPPEARS
     ========================================================= */

  async function runI() {
    if (resolved) return;

    const node =
      getNode("I");

    const I1 =
      getOrCreateDependent(
        "I1",
        "I",
        7,
        80
      );

    const line =
      prepareDependentLine(
        "I-I1"
      );

    focusCase("I");

    updateDynamicGeometry();

    await wait(700);

    node.element.classList.add(
      "effect-moderate"
    );

    await wait(900);


    /*
      The dependent and its causal line appear together.
    */

    I1.element.classList.add(
      "is-visible"
    );

    revealDependentLine(
      line
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
      The physical dependent is gone.

      Its dashed historical representation remains so the
      reader can inspect the completed record later.
    */

    markDependentHistory(
      I1
    );

    markLineHistory(
      line
    );

    await wait(2400);
  }


  /* =========================================================
     OBSERVATION SEQUENCE

     IMPORTANT CHANGE:

     This now runs ONCE.

     There is no second cycle. Once all nine observations have
     finished, the accumulated field remains indefinitely.
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

  async function runObservationSequence() {
    const myToken =
      ++cycleToken;


    /*
      Begin with one clean field.
    */

    clearEntireField();

    await wait(2200);


    /*
      Randomized order is retained.

      The reader cannot identify cases by sequence position.
    */

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


      await wait(750);


      await runCase();


      if (
        resolved ||
        myToken !== cycleToken
      ) {
        return;
      }


      /*
        Remove only the active animation emphasis.

        All accumulated evidence remains.
      */

      endCurrentCase();


      await wait(
        randomBetween(
          1000,
          1400
        )
      );
    }


    /*
      Observation is complete.

      Remove the final active emphasis and then do nothing.

      The accumulated field becomes the permanent state from
      which the reader can make their interpretation.
    */

    endCurrentCase();
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

      accessAuthorized =
        true;

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
      options.bypassAuthorization ===
      true;

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
        node.isDragging =
          false;

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


  /*
    Permanent radial lanes are created after the primary
    positions exist.
  */

  createPrimaryLanes();

  field.classList.add(
    "is-ready"
  );


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


  if (!devBypass) {
    requestAssessmentChallenge();
  }


  window.requestAnimationFrame(
    () => {

      updateDynamicGeometry();


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

        resolveAssessment({
          bypassAuthorization: true
        });

        return;
      }


      /*
        Run exactly one observation sequence.
      */

      runObservationSequence();
    }
  );


  window.addEventListener(
    "resize",
    () => {
      positionAllNodes();
    }
  );

});