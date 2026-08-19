const conceptIndex = {

  observation: {
    related: [
      "interpretation",
      "uncertainty",
      "systems"
    ],
    documents: [
      ["Field Note 0001", "/field-notes/0001.html"],
      ["testimony_001", "/testimony/testimony_001.html"],
      ["classification_schema_v1", "/recovered/unverified/classification_schema_v1.html"]
    ]
  },

  interpretation: {
    related: [
      "observation",
      "uncertainty",
      "revision",
      "systems"
    ],
    documents: [
      ["testimony_001", "/testimony/testimony_001.html"],
      ["environmental_observation_001_notes", "/recovered/annotations/environmental_observation_001_notes.html"],
      ["cross_reference_002", "/cross-references/cross_reference_002.html"]
    ]
  },

  systems: {
    related: [
      "scale",
      "consequence",
      "system boundary",
      "feedback"
    ],
    documents: [
      ["classification_schema_v1", "/recovered/unverified/classification_schema_v1.html"],
      ["environmental_observation_001", "/recovered/unverified/environmental_observation_001.html"],
      ["environmental_observation_002", "/recovered/unverified/environmental_observation_002.html"],
      ["cross_reference_001", "/cross-references/cross_reference_001.html"]
    ]
  },

  uncertainty: {
    related: [
      "prediction",
      "restraint",
      "decision threshold",
      "reversibility"
    ],
    documents: [
      ["technological_population_assessment_002", "/recovered/unverified/technological_population_assessment_002.html"],
      ["decision_threshold_assessment_001", "/recovered/unverified/decision_threshold_assessment_001.html"],
      ["testimony_002", "/testimony/testimony_002.html"],
      ["cross_reference_003", "/cross-references/cross_reference_003.html"]
    ]
  },

  revision: {
    related: [
      "self-correction",
      "consequence",
      "persistence",
      "prediction"
    ],
    documents: [
      ["technological_population_assessment_001", "/recovered/unverified/technological_population_assessment_001.html"],
      ["what_are_they_measuring", "/working-notes/personal/what_are_they_measuring.html"]
    ]
  },

  persistence: {
    related: [
      "revision",
      "resilience",
      "long horizon",
      "maturity"
    ],
    documents: [
      ["technological_population_assessment_001", "/recovered/unverified/technological_population_assessment_001.html"],
      ["environmental_observation_002", "/recovered/unverified/environmental_observation_002.html"],
      ["what_are_they_measuring", "/working-notes/personal/what_are_they_measuring.html"]
    ]
  },

  restraint: {
    related: [
      "uncertainty",
      "decision threshold",
      "capability",
      "reversibility"
    ],
    documents: [
      ["technological_population_assessment_002", "/recovered/unverified/technological_population_assessment_002.html"],
      ["decision_threshold_assessment_001", "/recovered/unverified/decision_threshold_assessment_001.html"],
      ["testimony_002", "/testimony/testimony_002.html"],
      ["cross_reference_003", "/cross-references/cross_reference_003.html"]
    ]
  },

  capability: {
    related: [
      "consequence",
      "prediction",
      "restraint",
      "decision threshold"
    ],
    documents: [
      ["technological_population_assessment_002", "/recovered/unverified/technological_population_assessment_002.html"],
      ["decision_threshold_assessment_001", "/recovered/unverified/decision_threshold_assessment_001.html"],
      ["what_are_they_measuring", "/working-notes/personal/what_are_they_measuring.html"]
    ]
  },

  consequence: {
    related: [
      "capability",
      "revision",
      "decision threshold",
      "scale"
    ],
    documents: [
      ["environmental_observation_001", "/recovered/unverified/environmental_observation_001.html"],
      ["environmental_observation_002", "/recovered/unverified/environmental_observation_002.html"],
      ["technological_population_assessment_001", "/recovered/unverified/technological_population_assessment_001.html"],
      ["decision_threshold_assessment_001", "/recovered/unverified/decision_threshold_assessment_001.html"]
    ]
  },

  "decision threshold": {
    related: [
      "uncertainty",
      "consequence",
      "restraint",
      "reversibility"
    ],
    documents: [
      ["decision_threshold_assessment_001", "/recovered/unverified/decision_threshold_assessment_001.html"],
      ["technological_population_assessment_002", "/recovered/unverified/technological_population_assessment_002.html"],
      ["testimony_002", "/testimony/testimony_002.html"]
    ]
  },

  maturity: {
    related: [
      "revision",
      "persistence",
      "restraint",
      "capability"
    ],
    documents: [
      ["what_are_they_measuring", "/working-notes/personal/what_are_they_measuring.html"],
      ["technological_population_assessment_001", "/recovered/unverified/technological_population_assessment_001.html"],
      ["technological_population_assessment_002", "/recovered/unverified/technological_population_assessment_002.html"]
    ]
  },

  responsibility: {
    related: [
      "capability",
      "consequence",
      "restraint",
      "revision",
      "persistence"
    ],
    documents: [
      ["what_are_they_measuring", "/working-notes/personal/what_are_they_measuring.html"],
      ["technological_population_assessment_001", "/recovered/unverified/technological_population_assessment_001.html"],
      ["technological_population_assessment_002", "/recovered/unverified/technological_population_assessment_002.html"],
      ["decision_threshold_assessment_001", "/recovered/unverified/decision_threshold_assessment_001.html"]
    ],
    note: "No direct classification found. Related assessment variables returned."
  }
    trust: {
    related: [
      "maturity",
      "restraint",
      "revision",
      "persistence",
      "capability"
    ],
    documents: [
      ["can_they_trust_us", "/working-notes/personal/can_they_trust_us.html"],
      ["technological_population_assessment_001", "/recovered/unverified/technological_population_assessment_001.html"],
      ["technological_population_assessment_002", "/recovered/unverified/technological_population_assessment_002.html"],
      ["system_dependency_assessment_001", "/recovered/unverified/system_dependency_assessment_001.html"]
    ],
    note: "Finder terminology. No equivalent recovered classification confirmed."
  },
};


const aliases = {
  power: "capability",
  influence: "capability",
  ability: "capability",

  mistake: "revision",
  error: "revision",
  learning: "revision",

  caution: "restraint",
  wait: "restraint",

  risk: "uncertainty",
  unknown: "uncertainty",

  warning: "interpretation",
  message: "interpretation",

  intelligence: "maturity",

  system: "systems",
  network: "systems",
  connected: "systems",

  threshold: "decision threshold",
  decision: "decision threshold",
  trustworthiness: "trust",
  trustworthy: "trust",
  worthy: "trust",
};


const form = document.getElementById("concept-search-form");
const input = document.getElementById("concept-search");
const response = document.getElementById("search-response");


function normalizeQuery(value) {
  return value
    .trim()
    .toLowerCase()
    .replace(/[_-]+/g, " ")
    .replace(/\s+/g, " ");
}


function renderResult(originalQuery, concept, result, mapped) {

  const related = result.related
    .map(item => `<button class="concept-link" type="button" data-concept="${item}">${item}</button>`)
    .join("");

  const documents = result.documents
    .map(([title, url]) => `
      <div class="search-document">
        <a href="${url}">${title}</a>
      </div>
    `)
    .join("");

  const mappingText = mapped
    ? `
      <p class="search-mapping">
        query approximation:
        <span class="mono">${originalQuery}</span>
        →
        <span class="mono">${concept}</span>
      </p>
    `
    : "";

  const note = result.note
    ? `<p class="search-note">${result.note}</p>`
    : "";

  response.innerHTML = `
    ${mappingText}

    <div class="search-result-section">
      <div class="search-heading">classification</div>
      <div class="search-primary">${concept}</div>
    </div>

    ${note}

    <div class="search-result-section">
      <div class="search-heading">related concepts</div>
      <div class="concept-links">
        ${related}
      </div>
    </div>

    <div class="search-result-section">
      <div class="search-heading">possible matches</div>
      ${documents}
    </div>
  `;

  attachConceptButtons();
}


function renderNoResult(query) {

  response.innerHTML = `
    <p class="search-note">
      No direct classification found for
      <span class="mono">${query}</span>.
    </p>

    <p class="muted">
      Try a broader process, relationship, or assessment variable.
    </p>
  `;
}


function performSearch(rawQuery) {

  const query = normalizeQuery(rawQuery);

  if (!query) {
    response.innerHTML = `<p class="muted">No query submitted.</p>`;
    return;
  }

  if (conceptIndex[query]) {
    renderResult(query, query, conceptIndex[query], false);
    return;
  }

  if (aliases[query]) {
    const mappedConcept = aliases[query];

    renderResult(
      query,
      mappedConcept,
      conceptIndex[mappedConcept],
      true
    );

    return;
  }

  renderNoResult(query);
}


function attachConceptButtons() {

  document.querySelectorAll(".concept-link").forEach(button => {

    button.addEventListener("click", () => {

      const concept = button.dataset.concept;

      input.value = concept;

      performSearch(concept);

      window.scrollTo({
        top: 0,
        behavior: "smooth"
      });

    });

  });

}


form.addEventListener("submit", event => {
  event.preventDefault();
  performSearch(input.value);
});