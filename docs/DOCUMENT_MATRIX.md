# WORLD WIDE WASTE
## DOCUMENT / CONCEPT MATRIX
### Version 1.0

**Status:** Internal Design Document

---

# Purpose

This document tracks the conceptual function of every significant document within the Index.

It exists to prevent the archive from becoming a collection of unrelated lore.

Every document should participate in a larger network of ideas.

The matrix is also the conceptual foundation for:

- future search functionality
- cross-references
- puzzle design
- the restricted-access pathway
- narrative pacing
- detection of overused concepts
- detection of conceptual gaps

This document is never presented to the audience.

---

# Relationship Strength

Each relationship between a document and a concept is classified as:

**P — Primary**

The document substantially develops or demonstrates the concept.

**S — Secondary**

The concept meaningfully supports the document but is not its principal function.

**H — Hint**

The concept is present only subtly.

Its significance may become apparent only after reading other material.

A document should generally contain only one Primary concept.

---

# Core Concept Set

## Epistemic Concepts

OBS — Observation  
INT — Interpretation  
UNC — Uncertainty  
REV — Revision / Self-Correction  
MOD — Model Building  
CON — Contradiction  
PRD — Prediction  
SCL — Scale  
SYS — Systems Thinking  

## Developmental Concepts

CAP — Capability  
CSQ — Consequence  
RSP — Responsibility  
STW — Stewardship  
REVN — Reverence  
PER — Persistence  
MAT — Maturity  
RST — Restraint  

## System Concepts

ADP — Adaptation  
EMG — Emergence  
STB — Stability  
VAR — Variance  
THR — Threshold  
FDB — Feedback  
HIE — Hierarchy  

## Civilizational Concepts

ANT — Anthropocentrism  
ECO — Ecological Integration  
COO — Cooperation  
EXT — Extraction  
INF — Information Saturation  
LHO — Long-Horizon Thinking  
TP — Technological Population  
CNT — Contact  

---

# Existing Document Matrix

| Document | P | S | H | Narrative Function |
|---|---|---|---|---|
| README_FIRST | INT | OBS, UNC | REV, SYS | Teaches the audience to distinguish observation from interpretation before entering the archive. |
| Field Note 0001 — Why This Exists | OBS | INT, UNC | SYS | Establishes the Finder's skepticism and methodological restraint. |
| Field Note 0002 — The Pattern Problem | INT | OBS, REV | CON, MOD | Establishes the danger of confusing genuine patterns with imposed patterns. |
| Field Note 0003 — Coincidence | UNC | INT, CON | MOD | Refuses both automatic dismissal and automatic acceptance of anomalous relationships. |
| Field Note 0004 — Classification | SYS | INT, HIE | EMG | Marks the Finder's transition from subject-based organization toward relational organization. |
| Field Note 0005 — The Road | MOD | INT, SYS | THR | Introduces reconstruction as a model-building process and suggests the Index may lead somewhere. |
| Field Note 0006 — First Inconsistency | CON | OBS, UNC | THR | Introduces evidence that cannot be comfortably explained by the Finder's existing model. |
| Field Note 0007 — Audit | REV | OBS, CON, UNC | INT, MOD | Demonstrates disciplined elimination of explanations rather than belief-seeking. |
| why_i_kept_going | PER | UNC, INT | MOD, THR | Explains why unresolved uncertainty motivates continued investigation rather than certainty. |
| classification_schema_v1 | SYS | HIE, STB, TP | ANT, INT, RSP | First strong exposure to Observer systems-level classification and non-anthropocentric thinking. |

---

# Current Concept Distribution

The archive currently has strong representation of:

- Observation
- Interpretation
- Uncertainty
- Systems Thinking
- Contradiction
- Model Building
- Revision

This is intentional.

The existing archive primarily teaches the audience **how to investigate**.

It does not yet substantially reveal **what the investigation ultimately concerns**.

---

# Current Conceptual Gaps

The following concepts are currently underrepresented or absent:

## Stewardship

This is the ultimate moral center of the project but should not yet be stated directly.

Early appearances should occur through consequences rather than philosophy.

---

## Reverence

Currently absent.

This should initially be demonstrated rather than named.

The audience should encounter examples of the Observers assigning intrinsic significance to non-human systems before understanding why.

---

## Consequence

Underrepresented.

This should become one of the major bridges between epistemology and environmental material.

---

## Persistence

Introduced through the Finder but not yet established as an Observer concept.

Future documents should gradually reveal that persistence is a major developmental metric.

---

## Scale

Present implicitly in `classification_schema_v1`.

Needs explicit demonstration.

This will be particularly important in environmental documents.

---

## Restraint

Currently absent.

Should eventually become important to understanding both Observer intervention policy and contact.

---

## Contact

Intentionally absent.

Direct discussion of contact should remain rare until the archive is considerably deeper.

---

# Narrative Phases

The archive should reveal its ontology in stages.

## Phase I — Observation

Audience behavior:

> What happened?

Dominant concepts:

OBS  
UNC  
CON  
REV

Current Field Notes primarily occupy this phase.

---

## Phase II — Interpretation

Audience behavior:

> How are these things related?

Dominant concepts:

INT  
MOD  
SYS  
HIE  
SCL

`classification_schema_v1` begins this transition.

The conceptual search system will eventually accelerate it.

---

## Phase III — Consequence

Audience behavior:

> What does this model predict?

Dominant concepts:

CSQ  
FDB  
ADP  
STB  
PER

Environmental material should dominate this phase.

This is where the audience begins understanding that the archive concerns the health and persistence of systems rather than extraterrestrial visitation.

---

## Phase IV — Responsibility

Audience behavior:

> What obligation follows from understanding?

Dominant concepts:

RSP  
STW  
REVN  
RST  
LHO

This phase should emerge slowly.

The Observers' philosophy becomes increasingly apparent without being presented as doctrine.

---

## Phase V — Threshold

Audience behavior:

> What would demonstrate readiness?

Dominant concepts:

THR  
MAT  
TP  
CNT

Only here should the question of open contact become clearly visible.

---

# Restricted Path

The password pathway should move through the same conceptual progression.

It should never require arbitrary trivia.

The intended cognitive sequence is:

OBSERVATION

↓

INTERPRETATION

↓

SYSTEM

↓

CONSEQUENCE

↓

RESPONSIBILITY

↓

[FINAL CONCEPT]

↓

ACCESS

The final concept is intentionally undefined in Version 1.0.

Do not select the password until sufficient archive content exists to make one answer emerge naturally.

The likely semantic region includes:

- stewardship
- responsibility
- reverence
- persistence
- restraint

The correct answer should be selected based on the completed conceptual network rather than convenience.

---

# Search Architecture

Every document should eventually contain internal search metadata.

Example:

```yaml
document: field_note_0007
primary:
  - revision

secondary:
  - observation
  - contradiction
  - uncertainty

latent:
  - interpretation
  - model

relationships:
  - field_note_0002
  - field_note_0006
  - classification_schema_v1
```

This metadata does not need to appear in the public HTML.

It may eventually be stored in a dedicated search index.

---

# Conceptual Search Rule

Literal search answers:

> Where does this word appear?

Conceptual search answers:

> Which documents participate in this idea?

These functions should remain distinct.

A search for:

`humanity`

may eventually suggest:

`technological population`

A search for:

`environment`

may eventually surface documents classified under:

`system stability`

`ecological integration`

`stewardship`

The search engine thereby teaches the audience the archive's ontology.

---

# Cross-Reference Rule

Cross-references should not merely connect documents discussing the same subject.

They should preferentially connect documents that reveal the same **process operating at different scales**.

Example:

A document concerning collapse in a wetland ecosystem may connect conceptually to a document concerning instability within a technological civilization.

The subject differs.

The process is similar.

Recognizing that similarity is interpretation.

---

# Document Creation Protocol

Before writing a new document, record:

**Document ID**

**Document Type**

**Primary Concept**

**Secondary Concepts**

**Latent Concept(s)**

**Narrative Phase**

**Reason the Finder preserved it**

**Existing document it strengthens**

**Future document it prepares**

**What assumption it challenges**

Only then should the document be written.

---

# Density Rule

No foundational concept should become obvious merely through repetition.

Frequency and importance are not equivalent.

The most important concepts may initially appear less frequently than supporting concepts.

In particular:

**Stewardship should not become prominent too early.**

The audience should first learn:

Observation.

Then interpretation.

Then systems.

Then consequence.

Only after understanding consequence should responsibility become meaningful.

---

# False Path Rule

The archive may support reasonable interpretations that ultimately prove incomplete.

False paths must never depend on deception by the author.

They should arise because incomplete evidence genuinely supports multiple models.

Later evidence should explain why the earlier interpretation was reasonable but insufficient.

This mirrors Observer epistemology.

---

# Contradiction Rule

Not every contradiction should eventually be resolved.

Some should remain open permanently.

The existence of unresolved material reinforces the principle that the archive does not contain final truth.

---

# Observer Density Rule

Observer material should remain a minority of the total archive.

The audience should reconstruct the Observer worldview from fragments rather than receive a complete textbook.

Human material, environmental observations, testimony, Finder notes, and cross-references provide contextual mass around those fragments.

---

# Success Condition

The conceptual architecture succeeds when the audience gradually changes the questions it asks.

Early:

> Are the Observers real?

Later:

> What are they observing?

Later:

> Why do they classify these things together?

Later:

> What pattern are they measuring?

Eventually:

> What does humanity's behavior indicate about its capacity for responsibility?

At that point, the archive has accomplished its primary narrative function.

The question of extraterrestrial existence has become less important than the model of humanity revealed by considering it.