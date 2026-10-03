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
      "systems",
      "evidence"
    ],
    documents: [
      ["testimony_001", "/testimony/testimony_001.html"],
      ["environmental_observation_001_notes", "/recovered/annotations/environmental_observation_001_notes.html"],
      ["cross_reference_002", "/cross-references/cross_reference_002.html"]
    ]
  },

  systems: {
    related: [
      "system boundary",
      "consequence",
      "system dependency",
      "recovery capacity"
    ],
    documents: [
      ["classification_schema_v1", "/recovered/unverified/classification_schema_v1.html"],
      ["environmental_observation_001", "/environmental/environmental_observation_001.html"],
      ["environmental_observation_002", "/environmental/environmental_observation_002.html"],
      ["cross_reference_001", "/cross-references/cross_reference_001.html"]
    ]
  },

  "system boundary": {
    related: [
      "systems",
      "consequence",
      "externalization",
      "wider system responsibility",
      "reconstruction uncertainty"
    ],
    documents: [
      ["classification_schema_v1", "/recovered/unverified/classification_schema_v1.html"],
      ["environmental_observation_001", "/environmental/environmental_observation_001.html"],
      ["technological_population_assessment_002", "/recovered/unverified/technological_population_assessment_002.html"],
      ["wider_system_responsibility_assessment_001", "/recovered/unverified/wider_system_responsibility_assessment_001.html"]
    ],
    note: "The scope used to decide which relationships and consequences belong inside an account of a system."
  },

  uncertainty: {
    related: [
      "prediction",
      "restraint",
      "decision threshold",
      "reversibility"
    ],
    documents: [
      ["that_is_not_enough", "/working-notes/personal/that_is_not_enough.html"],
      ["decision_threshold_assessment_001", "/recovered/unverified/decision_threshold_assessment_001.html"],
      ["testimony_002", "/testimony/testimony_002.html"],
      ["cross_reference_003", "/cross-references/cross_reference_003.html"]
    ]
  },

  revision: {
    related: [
      "consequence",
      "persistence",
      "prediction",
      "evidence"
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
      "maturity",
      "behavioral reliability"
    ],
    documents: [
      ["technological_population_assessment_001", "/recovered/unverified/technological_population_assessment_001.html"],
      ["environmental_observation_002", "/environmental/environmental_observation_002.html"],
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
      "decision threshold",
      "intelligence"
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
      "responsibility",
      "system boundary"
    ],
    documents: [
      ["environmental_observation_001", "/environmental/environmental_observation_001.html"],
      ["environmental_observation_002", "/environmental/environmental_observation_002.html"],
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

  reversibility: {
    related: [
      "uncertainty",
      "decision threshold",
      "restraint",
      "recovery capacity",
      "transition risk"
    ],
    documents: [
      ["decision_threshold_assessment_001", "/recovered/unverified/decision_threshold_assessment_001.html"],
      ["transition_risk_assessment_001", "/recovered/unverified/transition_risk_assessment_001.html"],
      ["environmental_observation_003", "/environmental/environmental_observation_003.html"]
    ],
    note: "Capacity to withdraw or repair an intervention while preserving viable alternatives."
  },

maturity: {
  related: [
    "capability",
    "restraint",
    "revision",
    "persistence",
    "behavioral reliability",
    "trustworthiness",
    "threshold"
  ],
  documents: [
    ["contact_readiness_synthesis_001", "/cross-references/contact_readiness_synthesis_001.html"],
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
      "consequence",
      "capability",
      "restraint",
      "persistence",
      "stewardship",
      "wider system responsibility"
    ],
    documents: [
      ["contact_readiness_synthesis_001", "/cross-references/contact_readiness_synthesis_001.html"],
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
      "capability",
      "maintenance",
      "persistence",
      "system boundary"
    ],
    documents: [
      ["system_dependency_assessment_001", "/recovered/unverified/system_dependency_assessment_001.html"],
      ["environmental_observation_001", "/environmental/environmental_observation_001.html"]
    ]
  },

  maintenance: {
    related: [
      "system dependency",
      "persistence",
      "capability",
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
      "maturity",
      "trustworthiness"
    ],
    documents: [
      ["behavioral_reliability_assessment_001", "/recovered/unverified/behavioral_reliability_assessment_001.html"],
      ["can_they_trust_us", "/working-notes/personal/can_they_trust_us.html"],
      ["technological_population_assessment_001", "/recovered/unverified/technological_population_assessment_001.html"],
      ["maturity_is_not_trust", "/working-notes/personal/maturity_is_not_trust.html"]
    ]
  },

  threshold: {
    related: [
      "maturity",
      "behavioral reliability",
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
    "transfer",
    "contact",
    "contact readiness"
  ],
  documents: [
    ["contact_readiness_synthesis_001", "/cross-references/contact_readiness_synthesis_001.html"],
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
    "structural retention",
    "uncertainty",
    "encounter",
    "diagnostic exposure"
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
    "interpretation",
    "persistence",
    "reconstruction"
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
    "restraint",
    "interpretive compression"
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
    ["the_reference_resolved", "/working-notes/personal/the_reference_resolved.html"]
  ],
  note: "Classification depends on response and later correspondence."
},
prediction: {
  related: [
    "evidence",
    "anomaly",
    "epistemic restraint",
    "reassessment response",
    "prospective evidence"
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
    ["this_is_not_stewardship", "/working-notes/personal/this_is_not_stewardship.html"]
  ],
  note: "Significance independent of demonstrated immediate utility."
},

preservation: {
  related: [
    "existence value",
    "system dependency",
    "uncertainty",
    "reversibility",
    "maintenance"
  ],
  documents: [
    ["preservation_value_assessment_001", "/recovered/unverified/preservation_value_assessment_001.html"],
    ["system_dependency_assessment_001", "/recovered/unverified/system_dependency_assessment_001.html"],
    ["environmental_observation_001", "/environmental/environmental_observation_001.html"]
  ]
},
reverence: {
  related: [
    "existence value",
    "stewardship",
    "preservation",
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
    ["classification_schema_v1", "/recovered/unverified/classification_schema_v1.html"]
  ],
  note: "Technological or cognitive capability does not independently establish developmental maturity."
},
trustworthiness: {
  related: [
    "trust",
    "maturity",
    "behavioral reliability",
    "persistence",
    "decision threshold",
    "transition"
  ],
  documents: [
    ["contact_readiness_synthesis_001", "/cross-references/contact_readiness_synthesis_001.html"],
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
    "cultural contamination",
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
    "structural retention",
    "withheld explanation"
  ],
  documents: [
    ["testimony_003", "/testimony/testimony_003.html"],
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
    "cultural contamination",
    "structural retention"
  ],
  documents: [
    ["cross_reference_005", "/cross-references/cross_reference_005.html"],
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
    "uncertainty",
    "epistemic dependency"
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
    "nudge",
    "refusal capacity"
  ],
  documents: [
    ["testimony_004", "/testimony/testimony_004.html"],
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
    "capability",
    "source skepticism"
  ],
  documents: [
    ["testimony_004", "/testimony/testimony_004.html"],
    ["reciprocal_trust_assessment_001_notes", "/recovered/annotations/reciprocal_trust_assessment_001_notes.html"],
    ["reciprocal_trust_assessment_001", "/recovered/unverified/reciprocal_trust_assessment_001.html"],
    ["epistemic_dependency_assessment_001", "/recovered/unverified/epistemic_dependency_assessment_001.html"],
    ["maturity_is_not_trust", "/working-notes/personal/maturity_is_not_trust.html"],
    ["transition_risk_assessment_001", "/recovered/unverified/transition_risk_assessment_001.html"]
  ],
  note: "Mutual predictive confidence without surrender of independent evaluation."
},
"wider system responsibility": {
  related: [
    "responsibility",
    "system boundary",
    "stewardship",
    "consequence",
    "reciprocal trust",
    "maturity",
    "externalization"
  ],
  documents: [
    ["wider_system_responsibility_assessment_001", "/recovered/unverified/wider_system_responsibility_assessment_001.html"],
    ["reciprocal_trust_assessment_001", "/recovered/unverified/reciprocal_trust_assessment_001.html"],
    ["system_dependency_assessment_001", "/recovered/unverified/system_dependency_assessment_001.html"],
    ["preservation_value_assessment_001", "/recovered/unverified/preservation_value_assessment_001.html"],
    ["developmental_maturity_assessment_001", "/recovered/unverified/developmental_maturity_assessment_001.html"]
  ],
  note: "Expansion of responsibility beyond native, familiar, or directly represented systems."
},

externalization: {
  related: [
    "wider system responsibility",
    "system boundary",
    "consequence",
    "stewardship"
  ],
  documents: [
    ["wider_system_responsibility_assessment_001", "/recovered/unverified/wider_system_responsibility_assessment_001.html"],
    ["system_dependency_assessment_001", "/recovered/unverified/system_dependency_assessment_001.html"]
  ],
  note: "Consequence excluded from a decision model because it lies outside the preferred accounting boundary."
},
"wider community": {
  related: [
    "wider system responsibility",
    "reciprocal trust",
    "transition",
    "maturity",
    "responsibility"
  ],
  documents: [
    ["contact_readiness_synthesis_001", "/cross-references/contact_readiness_synthesis_001.html"],
    ["wider_system_responsibility_assessment_001", "/recovered/unverified/wider_system_responsibility_assessment_001.html"],
    ["reciprocal_trust_assessment_001", "/recovered/unverified/reciprocal_trust_assessment_001.html"],
    ["transition_risk_assessment_001", "/recovered/unverified/transition_risk_assessment_001.html"]
  ],
  note: "Participation in a broader network of technological populations increases relational consequence and responsibility."
},
"source skepticism": {
  related: [
    "reciprocal trust",
    "source authority",
    "verification",
    "revision",
    "developmental autonomy",
    "anomaly authority"
  ],
  documents: [
    ["reciprocal_trust_assessment_001_notes", "/recovered/annotations/reciprocal_trust_assessment_001_notes.html"],
    ["reciprocal_trust_assessment_001", "/recovered/unverified/reciprocal_trust_assessment_001.html"],
    ["epistemic_dependency_assessment_001", "/recovered/unverified/epistemic_dependency_assessment_001.html"],
    ["cultural_contamination_assessment_001", "/recovered/unverified/cultural_contamination_assessment_001.html"]
  ],
  note: "Source capability or authenticity does not remove the requirement for independent evaluation."
},
"withheld explanation": {
  related: [
    "diagnostic exposure",
    "interpretation",
    "developmental autonomy",
    "source authority",
    "structural compatibility",
    "uncertainty"
  ],
  documents: [
    ["cross_reference_005", "/cross-references/cross_reference_005.html"],
    ["testimony_003", "/testimony/testimony_003.html"],
    ["incremental_contact_assessment_001", "/recovered/unverified/incremental_contact_assessment_001.html"],
    ["cultural_contamination_assessment_001", "/recovered/unverified/cultural_contamination_assessment_001.html"],
    ["epistemic_dependency_assessment_001", "/recovered/unverified/epistemic_dependency_assessment_001.html"]
  ],
  note: "Withholding preferred interpretation may preserve the behavior or reasoning being assessed."
},
"interpretive compression": {
  related: [
    "interpretation",
    "epistemic restraint",
    "structural compatibility",
    "uncertainty",
    "evidence"
  ],
  documents: [
    ["testimony_003_notes", "/testimony/testimony_003_notes.html"],
    ["cross_reference_005", "/cross-references/cross_reference_005.html"],
    ["testimony_003", "/testimony/testimony_003.html"],
    ["cultural_contamination_assessment_001", "/recovered/unverified/cultural_contamination_assessment_001.html"]
  ],
  note: "Reduction of several uncertain relationships into a compact explanation that may appear more certain than the evidence supports."
},
"recovery capacity": {
  related: [
    "redundancy",
    "resilience",
    "reversibility",
    "system dependency",
    "preservation"
  ],
  documents: [
    ["environmental_observation_003", "/environmental/environmental_observation_003.html"],
    ["environmental_observation_002", "/environmental/environmental_observation_002.html"],
    ["system_dependency_assessment_001", "/recovered/unverified/system_dependency_assessment_001.html"],
    ["preservation_value_assessment_001", "/recovered/unverified/preservation_value_assessment_001.html"]
  ],
  note: "Capacity of a system to return to viable function after disturbance without complete external reconstruction."
},

redundancy: {
  related: [
    "recovery capacity",
    "resilience",
    "uncertainty",
    "preservation",
    "system dependency"
  ],
  documents: [
    ["environmental_observation_003", "/environmental/environmental_observation_003.html"]
  ],
  note: "Multiple pathways or capacities that may appear inefficient but reduce dependence on single points of failure."
},

resilience: {
  related: [
    "recovery capacity",
    "redundancy",
    "system dependency",
    "maintenance",
    "preservation"
  ],
  documents: [
    ["environmental_observation_003", "/environmental/environmental_observation_003.html"],
    ["environmental_observation_002", "/environmental/environmental_observation_002.html"],
    ["system_dependency_assessment_001", "/recovered/unverified/system_dependency_assessment_001.html"]
  ]
},
"prospective evidence": {
  related: [
    "prediction",
    "evidence",
    "anomaly",
    "reassessment",
    "epistemic restraint",
    "reconstruction uncertainty"
  ],
  documents: [
    ["the_reference_resolved", "/working-notes/personal/the_reference_resolved.html"],
    ["the_condition_occurred", "/working-notes/personal/the_condition_occurred.html"],
    ["a_test_that_can_fail", "/working-notes/personal/a_test_that_can_fail.html"]
  ],
  note: "Evidence whose relevant condition was specified and recorded before the later event being evaluated."
},
"reconstruction uncertainty": {
  related: [
    "anomaly",
    "epistemic restraint",
    "reassessment",
    "evidence",
    "system boundary"
  ],
  documents: [
    ["what_changed", "/working-notes/personal/what_changed.html"],
    ["the_reference_resolved", "/working-notes/personal/the_reference_resolved.html"],
    ["the_condition_occurred", "/working-notes/personal/the_condition_occurred.html"],
    ["a_test_that_can_fail", "/working-notes/personal/a_test_that_can_fail.html"]
  ],
  note: "Uncertainty concerning whether the present state of the Index can be completely accounted for by its documented reconstruction history."
},
"anomaly authority": {
  related: [
    "source skepticism",
    "prospective evidence",
    "epistemic restraint",
    "reconstruction uncertainty",
    "source authority"
  ],
  documents: [
    ["cross_reference_006", "/cross-references/cross_reference_006.html"],
    ["the_reference_resolved", "/working-notes/personal/the_reference_resolved.html"],
    ["what_changed", "/working-notes/personal/what_changed.html"],
    ["reciprocal_trust_assessment_001_notes", "/recovered/annotations/reciprocal_trust_assessment_001_notes.html"]
  ],
  note: "Increased perceived authority produced by unusual or unexplained provenance rather than stronger evidence."
},
"refusal capacity": {
  related: [
    "developmental autonomy",
    "restraint",
    "reciprocal trust",
    "capability",
    "source authority"
  ],
  documents: [
    ["testimony_004", "/testimony/testimony_004.html"],
    ["reciprocal_trust_assessment_001", "/recovered/unverified/reciprocal_trust_assessment_001.html"],
    ["incremental_contact_assessment_001", "/recovered/unverified/incremental_contact_assessment_001.html"],
    ["reciprocal_trust_assessment_001_notes", "/recovered/annotations/reciprocal_trust_assessment_001_notes.html"]
  ],
  note: "Preservation of meaningful choice or refusal under conditions of substantial capability asymmetry."
},
"contact readiness": {
  related: [
    "maturity",
    "trustworthiness",
    "developmental autonomy",
    "reciprocal trust",
    "wider system responsibility",
    "transition",
    "wider community"
  ],
  documents: [
    ["contact_readiness_synthesis_001", "/cross-references/contact_readiness_synthesis_001.html"],
    ["transition_risk_assessment_001", "/recovered/unverified/transition_risk_assessment_001.html"],
    ["reciprocal_trust_assessment_001", "/recovered/unverified/reciprocal_trust_assessment_001.html"],
    ["wider_system_responsibility_assessment_001", "/recovered/unverified/wider_system_responsibility_assessment_001.html"],
    ["developmental_maturity_assessment_001", "/recovered/unverified/developmental_maturity_assessment_001.html"]
  ],
  note: "Capacity to enter consequential external relationships without loss of autonomy, regulatory stability, or wider-system responsibility."
},
};


const aliases = {

  power: "capability",
  influence: "capability",
  ability: "capability",

  duty: "responsibility",
  obligation: "responsibility",
  accountable: "responsibility",
  accountability: "responsibility",
  responsible: "responsibility",

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

  "long horizon": "persistence",

  decision: "decision threshold",

  environment: "system dependency",
  ecology: "system dependency",
  nature: "system dependency",

  protect: "maintenance",

trustworthy: "trustworthiness",
confidence: "trustworthiness",
  worthy: "trustworthiness",

  reliability: "behavioral reliability",
  reliable: "behavioral reliability",
  consistency: "behavioral reliability",
  "self regulation": "behavioral reliability",
  "self-regulation": "behavioral reliability",
  generalization: "behavioral reliability",

  ready: "contact readiness",

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
coincidence: "uncertainty",

followup: "post-exposure observation",
"follow-up": "post-exposure observation",
monitoring: "post-exposure observation",
watched: "post-exposure observation",
"being watched": "post-exposure observation",

index: "reconstruction",
archive: "reconstruction",
rebuild: "reconstruction",
road: "reconstruction",

reassess: "reassessment",
reevaluation: "reassessment",
"re-evaluation": "reassessment",
confirmation: "reassessment",

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
preserve: "preservation",
extinction: "preservation",
sacred: "reverence",
respect: "reverence",

advanced: "capability",
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
testimony: "evidence",

authority: "source authority",
obedience: "source authority",
doctrine: "cultural contamination",
contamination: "cultural contamination",
autonomy: "developmental autonomy",
"non interference": "developmental autonomy",
"non-interference": "developmental autonomy",

dependency: "epistemic dependency",
deference: "epistemic dependency",
"independent verification": "verification",

reciprocity: "reciprocal trust",
"mutual trust": "reciprocal trust",
submission: "epistemic dependency",
"capability asymmetry": "reciprocal trust",

community: "wider community",
"cosmic community": "wider community",
externalities: "externalization",
"third party": "wider system responsibility",
"future generations": "wider system responsibility",

"source scepticism": "source skepticism",
"question the source": "source skepticism",
fallibility: "source skepticism",

"no answer": "withheld explanation",
"no explanation": "withheld explanation",
"refused to answer": "withheld explanation",
"the answer changes the test": "withheld explanation",

compression: "interpretive compression",
"too neat": "interpretive compression",
"confirmation bias": "interpretive compression",

"prospective test": "prospective evidence",
"prospective anomaly": "prospective evidence",
"reference resolved": "prospective evidence",

"reconstruction error": "reconstruction uncertainty",
"index changes": "reconstruction uncertainty",
"who wrote this": "reconstruction uncertainty",
"external author": "reconstruction uncertainty",

"mysterious source": "anomaly authority",
"mystery authority": "anomaly authority",
"unexplained source": "anomaly authority",
"strange file": "anomaly authority",

refusal: "refusal capacity",
"say no": "refusal capacity",
"said no": "refusal capacity",
"choice under control": "refusal capacity",

"ready for contact": "contact readiness",
readiness: "contact readiness",
"integration readiness": "contact readiness",
"what are they waiting for": "contact readiness",
};


const form = document.getElementById("concept-search-form");
const input = document.getElementById("concept-search");
const response = document.getElementById("search-response");
const RESTRICTED_DISCOVERY_KEY = "observation-index-restricted-discovered";


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


function renderConceptNetwork(concept, relatedConcepts) {
  const branches = relatedConcepts
    .map(item => `
      <div class="concept-network-branch">
        <button
          class="concept-node concept-link"
          type="button"
          data-concept="${escapeHTML(item)}"
        >
          ${escapeHTML(item)}
        </button>
      </div>
    `)
    .join("");

  return `
    <div class="concept-network" aria-label="Relationships for ${escapeHTML(concept)}">
      <div class="concept-network-origin">
        <span class="concept-node concept-node-primary" aria-current="true">
          ${escapeHTML(concept)}
        </span>
      </div>

      <div class="concept-network-trunk" aria-hidden="true"></div>

      <div class="concept-network-related">
        ${branches}
      </div>
    </div>
  `;
}


function renderSeedState() {
  response.innerHTML = `
    <div class="search-heading">starting relations</div>

    ${renderConceptNetwork(
      "interpretation",
      ["observation", "systems", "uncertainty"]
    )}

    <p class="search-network-note">
      Select a visible relation or enter another concept. Only immediate relationships are shown.
    </p>
  `;

  attachConceptButtons();
}


function renderResult(originalQuery, concept, result, mapped) {

  const boundaryDiscovered = concept === "responsibility";

  if (boundaryDiscovered) {
    try {
      window.localStorage.setItem(RESTRICTED_DISCOVERY_KEY, "true");
    } catch (error) {
      // The current result can still expose the boundary when storage is unavailable.
    }
  }

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

  const boundaryResponse = boundaryDiscovered
    ? `
      <div class="search-boundary-response">
        <div class="search-heading">index state</div>
        <p class="mono">boundary condition recognized</p>
        <a href="/restricted/">restricted material available →</a>
      </div>
    `
    : "";

  response.innerHTML = `
    ${mappingText}

    <div class="search-result-section search-relation-section">
      <div class="search-heading">current relation</div>
      ${renderConceptNetwork(concept, result.related)}
      <p class="search-network-note">Only immediate relationships are shown.</p>
    </div>

    ${note}

    <div class="search-result-section">
      <div class="search-heading">possible matches</div>
      ${documents}
    </div>

    ${boundaryResponse}
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

    <div class="search-result-section">
      <div class="search-heading">starting relations</div>
      ${renderConceptNetwork(
        "interpretation",
        ["observation", "systems", "uncertainty"]
      )}
    </div>
  `;

  attachConceptButtons();
}


function performSearch(rawQuery) {

  const query = normalizeQuery(rawQuery);

  if (!query) {
    renderSeedState();
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

      const url = new URL(window.location.href);
      url.searchParams.set("q", concept);
      window.history.replaceState({}, "", url);

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

  const query = normalizeQuery(input.value);

  if (query) {
    const url = new URL(window.location.href);
    url.searchParams.set("q", query);
    window.history.replaceState({}, "", url);
  }

  performSearch(input.value);
});


const initialQuery = new URLSearchParams(window.location.search).get("q");

if (initialQuery) {
  input.value = initialQuery;
  performSearch(initialQuery);
} else {
  renderSeedState();
}
