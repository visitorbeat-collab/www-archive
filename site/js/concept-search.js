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
      ["what_are_they_measuring", "/working-notes/personal/what_are_they_measuring.html"],
      ["behavioral_reliability_assessment_001", "/recovered/unverified/behavioral_reliability_assessment_001.html"]
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
      ["what_are_they_measuring", "/working-notes/personal/what_are_they_measuring.html"],
      ["transition_criteria_fragment_001", "/recovered/unverified/transition_criteria_fragment_001.html"]
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
    "capability",
    "restraint",
    "revision",
    "stewardship",
    "reverence",
    "persistence",
    "behavioral reliability"
  ],
  documents: [
    ["developmental_maturity_assessment_001", "/recovered/unverified/developmental_maturity_assessment_001.html"],
    ["behavioral_reliability_assessment_001", "/recovered/unverified/behavioral_reliability_assessment_001.html"],
    ["this_is_not_stewardship", "/working-notes/personal/this_is_not_stewardship.html"],
    ["what_are_they_measuring", "/working-notes/personal/what_are_they_measuring.html"],
    ["technological_population_assessment_001", "/recovered/unverified/technological_population_assessment_001.html"],
    ["technological_population_assessment_002", "/recovered/unverified/technological_population_assessment_002.html"]
  ],
  note: "Recovered classification concerns integration of regulatory capacities under increasing influence."
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
      ["decision_threshold_assessment_001", "/recovered/unverified/decision_threshold_assessment_001.html"],
      ["system_dependency_assessment_001", "/recovered/unverified/system_dependency_assessment_001.html"]
    ],
    note: "No direct recovered classification found. Related assessment variables returned."
  },

stewardship: {
  related: [
    "system dependency",
    "maintenance",
    "existence value",
    "reverence",
    "responsibility"
  ],
  documents: [
    ["this_is_not_stewardship", "/working-notes/personal/this_is_not_stewardship.html"],
    ["system_dependency_assessment_001", "/recovered/unverified/system_dependency_assessment_001.html"],
    ["preservation_value_assessment_001", "/recovered/unverified/preservation_value_assessment_001.html"],
    ["what_are_they_measuring", "/working-notes/personal/what_are_they_measuring.html"]
  ],
  note: "No direct recovered classification found. Related maintenance and preservation variables returned."
},

  "system dependency": {
    related: [
      "influence",
      "maintenance",
      "persistence",
      "system boundary"
    ],
    documents: [
      ["system_dependency_assessment_001", "/recovered/unverified/system_dependency_assessment_001.html"],
      ["environmental_observation_001", "/recovered/unverified/environmental_observation_001.html"]
    ]
  },

  maintenance: {
    related: [
      "system dependency",
      "persistence",
      "influence",
      "consequence"
    ],
    documents: [
      ["system_dependency_assessment_001", "/recovered/unverified/system_dependency_assessment_001.html"],
      ["technological_population_assessment_001", "/recovered/unverified/technological_population_assessment_001.html"]
    ]
  },

trust: {
  related: [
    "trustworthiness",
    "behavioral reliability",
    "maturity",
    "persistence",
    "transition"
  ],
  documents: [
    ["maturity_is_not_trust", "/working-notes/personal/maturity_is_not_trust.html"],
    ["can_they_trust_us", "/working-notes/personal/can_they_trust_us.html"],
    ["behavioral_reliability_assessment_001", "/recovered/unverified/behavioral_reliability_assessment_001.html"],
    ["developmental_maturity_assessment_001", "/recovered/unverified/developmental_maturity_assessment_001.html"]
  ],
  note: "Human relational term. See trustworthiness and behavioral reliability."
},

  "behavioral reliability": {
    related: [
      "persistence",
      "restraint",
      "revision",
      "self-regulation",
      "generalization"
    ],
    documents: [
      ["behavioral_reliability_assessment_001", "/recovered/unverified/behavioral_reliability_assessment_001.html"],
      ["can_they_trust_us", "/working-notes/personal/can_they_trust_us.html"],
      ["technological_population_assessment_001", "/recovered/unverified/technological_population_assessment_001.html"],
      ["system_dependency_assessment_001", "/recovered/unverified/system_dependency_assessment_001.html"]
    ]
  },

  threshold: {
    related: [
      "behavioral reliability",
      "capability",
      "transition",
      "restraint",
      "persistence"
    ],
    documents: [
      ["transition_criteria_fragment_001", "/recovered/unverified/transition_criteria_fragment_001.html"],
      ["decision_threshold_assessment_001", "/recovered/unverified/decision_threshold_assessment_001.html"],
      ["behavioral_reliability_assessment_001", "/recovered/unverified/behavioral_reliability_assessment_001.html"]
    ]
  },

transition: {
  related: [
    "transition risk",
    "threshold",
    "trustworthiness",
    "behavioral reliability",
    "capability",
    "transfer"
  ],
  documents: [
    ["transition_risk_assessment_001", "/recovered/unverified/transition_risk_assessment_001.html"],
    ["transition_criteria_fragment_001", "/recovered/unverified/transition_criteria_fragment_001.html"],
    ["maturity_is_not_trust", "/working-notes/personal/maturity_is_not_trust.html"],
    ["transfer_of_what", "/working-notes/personal/transfer_of_what.html"],
    ["behavioral_reliability_assessment_001", "/recovered/unverified/behavioral_reliability_assessment_001.html"]
  ]
},

transfer: {
  related: [
    "transition",
    "threshold",
    "behavioral reliability",
    "capability"
  ],
  documents: [
    ["transition_criteria_fragment_001", "/recovered/unverified/transition_criteria_fragment_001.html"],
    ["transfer_of_what", "/working-notes/personal/transfer_of_what.html"]
  ],
  note: "Meaning unresolved."
},
encounter: {
  related: [
    "interpretation",
    "uncertainty",
    "systems",
    "transition"
  ],
  documents: [
    ["encounter_reconstruction_001", "/working-notes/personal/encounter_reconstruction_001.html"],
    ["testimony_001", "/testimony/testimony_001.html"],
    ["testimony_002", "/testimony/testimony_002.html"],
    ["transfer_of_what", "/working-notes/personal/transfer_of_what.html"]
  ],
  note: "Origin unresolved."
},
"cognitive assessment": {
  related: [
    "interpretation",
    "systems",
    "structural retention",
    "uncertainty"
  ],
  documents: [
    ["cognitive_assessment_protocol_fragment_001", "/recovered/unverified/cognitive_assessment_protocol_fragment_001.html"],
    ["encounter_reconstruction_001", "/working-notes/personal/encounter_reconstruction_001.html"],
    ["testimony_002", "/testimony/testimony_002.html"],
    ["cross_reference_003", "/cross-references/cross_reference_003.html"]
  ]
},

"structural retention": {
  related: [
    "reassessment",
    "post-exposure observation",
    "cognitive assessment",
    "systems",
    "interpretation",
    "persistence"
  ],
  documents: [
    ["reassessment_status_fragment_001", "/recovered/unverified/reassessment_status_fragment_001.html"],
    ["post_exposure_observation_fragment_001", "/recovered/unverified/post_exposure_observation_fragment_001.html"],
    ["cognitive_assessment_protocol_fragment_001", "/recovered/unverified/cognitive_assessment_protocol_fragment_001.html"],
    ["what_have_i_been_doing", "/working-notes/personal/what_have_i_been_doing.html"],
    ["encounter_reconstruction_001", "/working-notes/personal/encounter_reconstruction_001.html"]
  ],
  note: "Retention of relational structure without confirmed factual recall."
},


evidence: {
  related: [
    "epistemic restraint",
    "uncertainty",
    "interpretation",
    "revision",
    "cognitive assessment"
  ],
  documents: [
    ["that_is_not_enough", "/working-notes/personal/that_is_not_enough.html"],
    ["encounter_protocol_comparison_001", "/working-notes/personal/encounter_protocol_comparison_001.html"],
    ["reassessment_status_fragment_001", "/recovered/unverified/reassessment_status_fragment_001.html"],
    ["encounter_reconstruction_001", "/working-notes/personal/encounter_reconstruction_001.html"],
    ["Field Note 0003", "/field-notes/0003.html"],
    ["Field Note 0007", "/field-notes/0007.html"]
  ]
},
"post-exposure observation": {
  related: [
    "structural retention",
    "persistence",
    "cognitive assessment",
    "uncertainty"
  ],
  documents: [
    ["post_exposure_observation_fragment_001", "/recovered/unverified/post_exposure_observation_fragment_001.html"],
    ["cognitive_assessment_protocol_fragment_001", "/recovered/unverified/cognitive_assessment_protocol_fragment_001.html"],
    ["encounter_protocol_comparison_001", "/working-notes/personal/encounter_protocol_comparison_001.html"],
    ["encounter_reconstruction_001", "/working-notes/personal/encounter_reconstruction_001.html"]
  ]
},
reconstruction: {
  related: [
    "structural retention",
    "post-exposure observation",
    "revision",
    "uncertainty"
  ],
  documents: [
    ["what_have_i_been_doing", "/working-notes/personal/what_have_i_been_doing.html"],
    ["post_exposure_observation_fragment_001", "/recovered/unverified/post_exposure_observation_fragment_001.html"],
    ["encounter_reconstruction_001", "/working-notes/personal/encounter_reconstruction_001.html"],
    ["Field Note 0005", "/field-notes/0005.html"],
    ["Field Note 0006", "/field-notes/0006.html"]
  ]
},
reassessment: {
  related: [
    "structural retention",
    "post-exposure observation",
    "uncertainty",
    "persistence"
  ],
  documents: [
    ["reassessment_status_fragment_001", "/recovered/unverified/reassessment_status_fragment_001.html"],
    ["post_exposure_observation_fragment_001", "/recovered/unverified/post_exposure_observation_fragment_001.html"],
    ["what_have_i_been_doing", "/working-notes/personal/what_have_i_been_doing.html"],
    ["encounter_protocol_comparison_001", "/working-notes/personal/encounter_protocol_comparison_001.html"]
  ]
},
"epistemic restraint": {
  related: [
    "uncertainty",
    "evidence",
    "prediction",
    "revision",
    "restraint"
  ],
  documents: [
    ["that_is_not_enough", "/working-notes/personal/that_is_not_enough.html"],
    ["reassessment_status_fragment_001", "/recovered/unverified/reassessment_status_fragment_001.html"],
    ["encounter_protocol_comparison_001", "/working-notes/personal/encounter_protocol_comparison_001.html"],
    ["Field Note 0003", "/field-notes/0003.html"],
    ["Field Note 0007", "/field-notes/0007.html"]
  ],
  note: "Finder terminology. Evidentiary restraint under increasing apparent confirmation."
},
"reassessment response": {
  related: [
    "prediction",
    "anomaly",
    "uncertainty",
    "reassessment",
    "evidence"
  ],
  documents: [
    ["reassessment_response_protocol_fragment_001", "/recovered/unverified/reassessment_response_protocol_fragment_001.html"],
    ["that_is_not_enough", "/working-notes/personal/that_is_not_enough.html"],
    ["reassessment_status_fragment_001", "/recovered/unverified/reassessment_status_fragment_001.html"],
    ["Field Note 0006", "/field-notes/0006.html"]
  ]
},

anomaly: {
  related: [
    "reassessment response",
    "uncertainty",
    "prediction",
    "evidence"
  ],
  documents: [
    ["reassessment_response_protocol_fragment_001", "/recovered/unverified/reassessment_response_protocol_fragment_001.html"],
    ["Field Note 0006", "/field-notes/0006.html"],
    ["what_have_i_been_doing", "/working-notes/personal/what_have_i_been_doing.html"]
  ],
  note: "Classification depends on response and later correspondence."
},
prediction: {
  related: [
    "falsifiability",
    "evidence",
    "anomaly",
    "epistemic restraint",
    "reassessment response"
  ],
  documents: [
    ["the_condition_occurred", "/working-notes/personal/the_condition_occurred.html"],
    ["a_test_that_can_fail", "/working-notes/personal/a_test_that_can_fail.html"],
    ["reassessment_response_protocol_fragment_001", "/recovered/unverified/reassessment_response_protocol_fragment_001.html"],
    ["that_is_not_enough", "/working-notes/personal/that_is_not_enough.html"],
    ["decision_threshold_assessment_001", "/recovered/unverified/decision_threshold_assessment_001.html"]
  ]
},
"existence value": {
  related: [
    "preservation",
    "uncertainty",
    "system dependency",
    "stewardship",
    "maturity"
  ],
  documents: [
    ["preservation_value_assessment_001", "/recovered/unverified/preservation_value_assessment_001.html"],
    ["system_dependency_assessment_001", "/recovered/unverified/system_dependency_assessment_001.html"],
    ["environmental_observation_001", "/recovered/unverified/environmental_observation_001.html"]
  ],
  note: "Significance independent of demonstrated immediate utility."
},

preservation: {
  related: [
    "existence value",
    "system dependency",
    "uncertainty",
    "irreversibility",
    "maintenance"
  ],
  documents: [
    ["preservation_value_assessment_001", "/recovered/unverified/preservation_value_assessment_001.html"],
    ["system_dependency_assessment_001", "/recovered/unverified/system_dependency_assessment_001.html"],
    ["environmental_observation_001", "/recovered/unverified/environmental_observation_001.html"]
  ]
},
reverence: {
  related: [
    "existence value",
    "stewardship",
    "non-ownership",
    "responsibility",
    "maturity"
  ],
  documents: [
    ["this_is_not_stewardship", "/working-notes/personal/this_is_not_stewardship.html"],
    ["preservation_value_assessment_001", "/recovered/unverified/preservation_value_assessment_001.html"],
    ["system_dependency_assessment_001", "/recovered/unverified/system_dependency_assessment_001.html"],
    ["what_are_they_measuring", "/working-notes/personal/what_are_they_measuring.html"]
  ],
  note: "Finder terminology. Closest recovered concept: significance independent of immediate utility."
},
intelligence: {
  related: [
    "interpretation",
    "revision",
    "capability",
    "maturity"
  ],
  documents: [
    ["developmental_maturity_assessment_001", "/recovered/unverified/developmental_maturity_assessment_001.html"],
    ["what_are_they_measuring", "/working-notes/personal/what_are_they_measuring.html"],
    ["technological_population_assessment_001", "/recovered/unverified/technological_population_assessment_001.html"]
  ],
  note: "Technological or cognitive capability does not independently establish developmental maturity."
},
trustworthiness: {
  related: [
    "maturity",
    "behavioral reliability",
    "persistence",
    "decision threshold",
    "transition"
  ],
  documents: [
    ["reciprocal_trust_assessment_001", "/recovered/unverified/reciprocal_trust_assessment_001.html"],
    ["maturity_is_not_trust", "/working-notes/personal/maturity_is_not_trust.html"],
    ["developmental_maturity_assessment_001", "/recovered/unverified/developmental_maturity_assessment_001.html"],
    ["behavioral_reliability_assessment_001", "/recovered/unverified/behavioral_reliability_assessment_001.html"],
    ["can_they_trust_us", "/working-notes/personal/can_they_trust_us.html"],
    ["transition_criteria_fragment_001", "/recovered/unverified/transition_criteria_fragment_001.html"]
  ],
  note: "Finder terminology. Predictive confidence that regulatory behavior will persist under increased consequence."
},
"transition risk": {
  related: [
    "trustworthiness",
    "transition",
    "capability",
    "behavioral reliability",
    "decision threshold",
    "consequence"
  ],
  documents: [
    ["transition_risk_assessment_001", "/recovered/unverified/transition_risk_assessment_001.html"],
    ["maturity_is_not_trust", "/working-notes/personal/maturity_is_not_trust.html"],
    ["transition_criteria_fragment_001", "/recovered/unverified/transition_criteria_fragment_001.html"],
    ["developmental_maturity_assessment_001", "/recovered/unverified/developmental_maturity_assessment_001.html"],
    ["behavioral_reliability_assessment_001", "/recovered/unverified/behavioral_reliability_assessment_001.html"]
  ],
  note: "Risk introduced when transition expands population capability."
},
contact: {
  related: [
    "incremental contact",
    "transition risk",
    "diagnostic exposure",
    "interpretation",
    "trustworthiness"
  ],
  documents: [
    ["incremental_contact_assessment_001", "/recovered/unverified/incremental_contact_assessment_001.html"],
    ["transition_risk_assessment_001", "/recovered/unverified/transition_risk_assessment_001.html"],
    ["encounter_reconstruction_001", "/working-notes/personal/encounter_reconstruction_001.html"],
    ["testimony_001", "/testimony/testimony_001.html"],
    ["testimony_002", "/testimony/testimony_002.html"]
  ],
  note: "Interaction does not independently imply transition or capability transfer."
},

"incremental contact": {
  related: [
    "contact",
    "diagnostic exposure",
    "transition risk",
    "contamination",
    "capability"
  ],
  documents: [
    ["incremental_contact_assessment_001", "/recovered/unverified/incremental_contact_assessment_001.html"],
    ["cognitive_assessment_protocol_fragment_001", "/recovered/unverified/cognitive_assessment_protocol_fragment_001.html"],
    ["testimony_002", "/testimony/testimony_002.html"],
    ["encounter_reconstruction_001", "/working-notes/personal/encounter_reconstruction_001.html"]
  ]
},

"diagnostic exposure": {
  related: [
    "incremental contact",
    "cognitive assessment",
    "interpretation",
    "structural retention"
  ],
  documents: [
    ["incremental_contact_assessment_001", "/recovered/unverified/incremental_contact_assessment_001.html"],
    ["cognitive_assessment_protocol_fragment_001", "/recovered/unverified/cognitive_assessment_protocol_fragment_001.html"],
    ["post_exposure_observation_fragment_001", "/recovered/unverified/post_exposure_observation_fragment_001.html"],
    ["encounter_protocol_comparison_001", "/working-notes/personal/encounter_protocol_comparison_001.html"]
  ]
},
"structural compatibility": {
  related: [
    "incremental contact",
    "diagnostic exposure",
    "interpretation",
    "contamination",
    "structural retention"
  ],
  documents: [
    ["cross_reference_004", "/cross-references/cross_reference_004.html"],
    ["incremental_contact_assessment_001", "/recovered/unverified/incremental_contact_assessment_001.html"],
    ["encounter_reconstruction_001", "/working-notes/personal/encounter_reconstruction_001.html"],
    ["testimony_001", "/testimony/testimony_001.html"],
    ["testimony_002", "/testimony/testimony_002.html"]
  ],
  note: "Similarity of relational features without confirmation of common origin."
},
"cultural contamination": {
  related: [
    "source authority",
    "developmental autonomy",
    "incremental contact",
    "interpretation",
    "nudge"
  ],
  documents: [
    ["cultural_contamination_assessment_001", "/recovered/unverified/cultural_contamination_assessment_001.html"],
    ["incremental_contact_assessment_001", "/recovered/unverified/incremental_contact_assessment_001.html"],
    ["cross_reference_004", "/cross-references/cross_reference_004.html"],
    ["testimony_001", "/testimony/testimony_001.html"]
  ],
  note: "Population effects produced by attributed external interaction beyond the informational content itself."
},

"source authority": {
  related: [
    "cultural contamination",
    "interpretation",
    "developmental autonomy",
    "uncertainty"
  ],
  documents: [
    ["cultural_contamination_assessment_001", "/recovered/unverified/cultural_contamination_assessment_001.html"],
    ["incremental_contact_assessment_001", "/recovered/unverified/incremental_contact_assessment_001.html"]
  ],
  note: "Acceptance produced by attributed origin rather than independent evaluation."
},

"developmental autonomy": {
  related: [
    "maturity",
    "revision",
    "interpretation",
    "cultural contamination",
    "nudge"
  ],
  documents: [
    ["cultural_contamination_assessment_001", "/recovered/unverified/cultural_contamination_assessment_001.html"],
    ["developmental_maturity_assessment_001", "/recovered/unverified/developmental_maturity_assessment_001.html"],
    ["incremental_contact_assessment_001", "/recovered/unverified/incremental_contact_assessment_001.html"]
  ],
  note: "Capacity to construct, revise, and regulate internal models without continuous external instruction."
},
nudge: {
  related: [
    "developmental autonomy",
    "incremental contact",
    "interpretation",
    "cultural contamination",
    "restraint"
  ],
  documents: [
    ["cultural_contamination_assessment_001", "/recovered/unverified/cultural_contamination_assessment_001.html"],
    ["incremental_contact_assessment_001", "/recovered/unverified/incremental_contact_assessment_001.html"],
    ["cross_reference_004", "/cross-references/cross_reference_004.html"]
  ],
  note: "Low-scale influence intended to alter attention without supplying a required interpretation or action."
},
"epistemic dependency": {
  related: [
    "developmental autonomy",
    "source authority",
    "verification",
    "revision",
    "trustworthiness"
  ],
  documents: [
    ["epistemic_dependency_assessment_001", "/recovered/unverified/epistemic_dependency_assessment_001.html"],
    ["cultural_contamination_assessment_001", "/recovered/unverified/cultural_contamination_assessment_001.html"],
    ["developmental_maturity_assessment_001", "/recovered/unverified/developmental_maturity_assessment_001.html"]
  ],
  note: "Reliance on external information that begins to replace independent model evaluation."
},

verification: {
  related: [
    "evidence",
    "revision",
    "epistemic dependency",
    "uncertainty"
  ],
  documents: [
    ["epistemic_dependency_assessment_001", "/recovered/unverified/epistemic_dependency_assessment_001.html"],
    ["that_is_not_enough", "/working-notes/personal/that_is_not_enough.html"],
    ["a_test_that_can_fail", "/working-notes/personal/a_test_that_can_fail.html"]
  ]
},
"reciprocal trust": {
  related: [
    "trustworthiness",
    "developmental autonomy",
    "verification",
    "restraint",
    "capability"
  ],
  documents: [
    ["reciprocal_trust_assessment_001", "/recovered/unverified/reciprocal_trust_assessment_001.html"],
    ["epistemic_dependency_assessment_001", "/recovered/unverified/epistemic_dependency_assessment_001.html"],
    ["maturity_is_not_trust", "/working-notes/personal/maturity_is_not_trust.html"],
    ["transition_risk_assessment_001", "/recovered/unverified/transition_risk_assessment_001.html"]
  ],
  note: "Mutual predictive confidence without surrender of independent evaluation."
},
};


const aliases = {

  power: "capability",
  influence: "capability",
  ability: "capability",

  mistake: "revision",
  error: "revision",
  learning: "revision",
  "self correction": "revision",
  "self-correction": "revision",

  caution: "restraint",
  wait: "restraint",

  risk: "uncertainty",
  unknown: "uncertainty",

  warning: "interpretation",
  message: "interpretation",

  system: "systems",
  network: "systems",
  connected: "systems",
  scale: "systems",
  feedback: "systems",
  "system boundary": "systems",

  resilience: "persistence",
  "long horizon": "persistence",

  decision: "decision threshold",
  reversibility: "decision threshold",

  environment: "system dependency",
  ecology: "system dependency",
  nature: "system dependency",

  preservation: "maintenance",
  protect: "maintenance",

trustworthy: "trustworthiness",
reliable: "behavioral reliability",
confidence: "trustworthiness",
  worthy: "trust",

  reliability: "behavioral reliability",
  reliable: "behavioral reliability",
  consistency: "behavioral reliability",
  "self regulation": "behavioral reliability",
  "self-regulation": "behavioral reliability",
  generalization: "behavioral reliability",

  ready: "transition",
  readiness: "transition",

  transferable: "transfer",
  abduction: "encounter",
experience: "encounter",
memory: "encounter",

test: "cognitive assessment",
testing: "cognitive assessment",
assessment: "cognitive assessment",
"cognitive test": "cognitive assessment",
structure: "structural retention",
"relational structure": "structural retention",

proof: "evidence",
coincidence: "evidence",
comparison: "evidence",

followup: "post-exposure observation",
"follow-up": "post-exposure observation",
monitoring: "post-exposure observation",
watched: "post-exposure observation",
"being watched": "post-exposure observation",

index: "reconstruction",
archive: "reconstruction",
rebuild: "reconstruction",
road: "reconstruction",
anomaly: "reconstruction",

reassess: "reassessment",
reevaluation: "reassessment",
"re-evaluation": "reassessment",
confirmation: "reassessment",

falsifiable: "epistemic restraint",
falsifiability: "epistemic restraint",
skepticism: "epistemic restraint",
scepticism: "epistemic restraint",
certainty: "epistemic restraint",

discontinuity: "anomaly",
"broken reference": "anomaly",
"missing reference": "anomaly",
predict: "prediction",
forecast: "prediction",
falsifiable: "prediction",
falsifiability: "prediction",
fail: "prediction",

value: "existence value",
significance: "existence value",
intrinsic: "existence value",
"existence value": "existence value",
preserve: "preservation",
extinction: "preservation",
sacred: "reverence",
respect: "reverence",

advanced: "maturity",
development: "maturity",
developmental: "maturity",
wisdom: "maturity",

"capability shock": "transition risk",
"contact risk": "transition risk",
"transition safety": "transition risk",
"safe contact": "transition risk",

interaction: "incremental contact",
"first contact": "contact",
aliens: "contact",
extraterrestrial: "contact",

comparison: "structural compatibility",
similarity: "structural compatibility",
"common origin": "structural compatibility",
testimony: "structural compatibility",

authority: "source authority",
obedience: "source authority",
doctrine: "cultural contamination",
contamination: "cultural contamination",
autonomy: "developmental autonomy",
"non interference": "developmental autonomy",
"non-interference": "developmental autonomy",

dependency: "epistemic dependency",
deference: "epistemic dependency",
skepticism: "verification",
scepticism: "verification",
"independent verification": "verification",

reciprocity: "reciprocal trust",
"mutual trust": "reciprocal trust",
submission: "reciprocal trust",
"capability asymmetry": "reciprocal trust",
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


function escapeHTML(value) {
  return value
    .replace(/&/g, "&amp;")
    .replace(/</g, "&lt;")
    .replace(/>/g, "&gt;")
    .replace(/"/g, "&quot;")
    .replace(/'/g, "&#039;");
}


function renderResult(originalQuery, concept, result, mapped) {

  const related = result.related
    .map(item => `
      <button
        class="concept-link"
        type="button"
        data-concept="${escapeHTML(item)}"
      >
        ${escapeHTML(item)}
      </button>
    `)
    .join("");

  const documents = result.documents
    .map(([title, url]) => `
      <div class="search-document">
        <a href="${url}">${escapeHTML(title)}</a>
      </div>
    `)
    .join("");

  const mappingText = mapped
    ? `
      <p class="search-mapping">
        query approximation:
        <span class="mono">${escapeHTML(originalQuery)}</span>
        →
        <span class="mono">${escapeHTML(concept)}</span>
      </p>
    `
    : "";

  const note = result.note
    ? `<p class="search-note">${escapeHTML(result.note)}</p>`
    : "";

  response.innerHTML = `
    ${mappingText}

    <div class="search-result-section">
      <div class="search-heading">classification</div>
      <div class="search-primary">${escapeHTML(concept)}</div>
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
      <span class="mono">${escapeHTML(query)}</span>.
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
    renderResult(
      query,
      query,
      conceptIndex[query],
      false
    );
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