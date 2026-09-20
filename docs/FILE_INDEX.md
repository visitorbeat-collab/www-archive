# FILE INDEX

**Status:** Current archive architecture

**Scope:** Implemented site and access layer

**Site root:** `site/`

This document describes the architecture currently present in the repository. Canonical source documents remain in `docs/`; public and restricted representations live under `site/`; Cloudflare Pages Functions enforce the restricted boundary under `functions/`.

---

# 1. Public Reconstruction

The public archive is the Finder's reconstructed layer.

| Path | Function |
| --- | --- |
| `site/index.html` | Public entry, primary navigation, and root query instrument |
| `site/field-notes/` | Chronological Finder journal, entries 0001–0007 |
| `site/working-notes/` | Working-note directory and personal reconstruction notes |
| `site/recovered/` | Recovered documents, annotations, and unverified material |
| `site/cross-references/` | Six cross-reference files and contact-readiness synthesis |
| `site/testimony/` | Testimony records and associated notes |
| `site/environmental/` | Environmental observations |
| `site/timeline/` | Chronological reference layer, conditionally shown after reconstruction reassessment or restricted discovery |
| `site/search/` | Expanded conceptual retrieval view; not presented as an archive directory |
| `site/js/concept-search.js` | Search corpus, concept relationships, and root-query handoff |
| `site/js/index-state.js` | Restores conditional root navigation after boundary discovery |
| `site/style.css` | Shared public styling |
| `site/robots.txt` | Site-wide crawler exclusion request |
| `site/_headers` | Static-response crawler and privacy headers |

The public layer remains modest and evidentiary. It does not announce the archive's largest implications.

---

# 2. Recovered Material

`site/recovered/annotations/` contains annotation records attached to recovered material.

`site/recovered/unverified/` contains assessment and protocol documents whose status remains intentionally uncertain.

`authority_resistance_assessment_001.html` is a deliberate anomaly. It must remain absent from directory indexes and concept search. Its discoverability is narrative, not navigational.

---

# 3. Restricted Boundary

The restricted layer begins at `site/restricted/index.html`.

The root index does not initially list `restricted/`. When conceptual search resolves a query to
`responsibility`, the retrieval view exposes the restricted entrance and records the discovery in
local storage. Later visits restore the `restricted/` row under `SYSTEM / STATUS`. This controls
discoverability only: direct URLs remain available, and the relational gate remains the actual
access condition.

The entry interaction is a relational gate rather than a conventional password puzzle. Its solution establishes a signed `restricted_access` cookie and leads to `/restricted/archive/`.

| Path | Function |
| --- | --- |
| `site/restricted/index.html` | Restrained public entrance to the gate |
| `site/restricted/gate-test.html` | Development view for testing the relational gate |
| `site/restricted/gate-test.js` | Gate interaction logic |
| `site/restricted/gate-test.css` | Gate presentation |
| `site/restricted/restricted-map.js` | Restricted relational-map behavior |
| `site/restricted/restricted.css` | Restricted archive and local-map presentation |
| `functions/restricted/access.js` | Validates the relational sequence and issues the signed cookie |
| `functions/restricted/dev-entry.js` | Token-protected development entrance that issues the same cookie |
| `functions/restricted/archive/_middleware.js` | Verifies the cookie before serving restricted archive files |

Cloudflare secrets:

- `RESTRICTED_COOKIE_SECRET` signs and verifies access cookies.
- `RESTRICTED_DEV_TOKEN` protects the private development-entry route.

`RESTRICTED_PASSWORD` is obsolete and should not be restored.

---

# 4. Restricted Relational Archive

`site/restricted/archive/index.html` is the restricted hub. Its topology is relational rather than chronological.

| Concept | Representation |
| --- | --- |
| Condition | `restricted_threshold_interpretation_001.html` |
| Boundary | Restricted threshold and access context |
| Retention | `nontext_retention_fragment_001.html` |
| Exposure | `post_exposure_participation_fragment_001.html` |
| Participation | `participation_condition_fragment_001.html` |
| Effect | Expressed through relations among the retained fragments |
| Nontext | `nontext/index.html` and its retained objects |

Local navigation on restricted records reproduces this topology in miniature. The topology should remain sparse enough that relationships, not menu volume, carry the interface.

---

# 5. Nontext Collection

`site/restricted/archive/nontext/` contains retained objects whose evidentiary properties cannot be replaced by prose alone.

| Record | Media |
| --- | --- |
| `visual_record_001.html` | `media/visual_record_001.png` |
| `signal_capture_001.html` | `media/signal_capture_001.png` |
| `relational_diagram_001.html` | `media/relational_diagram_001.png` |
| `audio_artifact_001.html` | `media/audio_artifact_001.wav` |
| `audio/audio_artifact_002.html` | `media/audio_artifact_002.wav`, source OGG, and spectrogram |

Audio Artifact 001 is a documented sonification of CERN CMS Open
Data. Available audio objects include explicit download links so
retention is not limited to browser playback.

`nontext/audio/index.html` is the extensible retained-audio
registry. It becomes visible after the five navigable restricted
concepts and Comparative Convergence Assessment 001 have been
visited.

`nontext/audio/audio_artifact_002.html` is the first concealed
biospheric audio record. It preserves a documented National Park
Service humpback-whale hydrophone recording with a downloadable
WAV, source-preservation OGG, and derived spectrogram.

Future audio files remain in `nontext/media/` and use sequential
`audio_artifact_###` identifiers. Audio Artifact 002 and later
records remain canonically distinct from Audio Artifact 001.

---

# 6. Evidentiary Corpus

`site/restricted/archive/external_records/` is an adjacent comparative evidence layer. It is promoted from obscurity through a prominent entrance on the restricted hub, but it is intentionally excluded from the relational map.

The separation prevents historical examples from being mistaken for native records of the observation system while allowing them to test and complicate its claims.

## Band 01 — External Orientation

| Record | Subject |
| --- | --- |
| `self_representation_record_001.html` | Voyager Golden Record |
| `boundary_extension_event_001.html` | Voyager 1 |
| `perspective_revision_event_001.html` | Earthrise |
| `directed_presence_transmission_001.html` | Arecibo message |

## Band 02 — Anticipatory Protection

| Record | Subject |
| --- | --- |
| `protective_external_intervention_001.html` | DART planetary-defense test |
| `external_domain_constraint_001.html` | Outer Space Treaty |

## Band 03 — Collective Regulation

| Record | Subject |
| --- | --- |
| `distributed_regulation_event_001.html` | Montreal Protocol |
| `destructive_capacity_relinquishment_001.html` | South African nuclear dismantlement |
| `collective_threat_elimination_001.html` | Smallpox eradication |

Corpus media currently includes:

- `media/voyager_golden_record_cover.jpg`
- `media/earthrise_as08_14_2383.jpg`

The corpus count displayed in its index is **09**.

`comparative_convergence_assessment_001.html` is a derived
cross-domain synthesis displayed after the three evidence bands.
It is not a tenth retained event and is therefore excluded from
the corpus count.

---

# 7. Canonical Source and Design Documentation

`docs/` contains source text, canon, architecture, epistemology, ontology, vocabulary, storyboard, and individual record specifications. These documents govern the implemented representations but are not themselves public pages.

Key control documents include:

- `docs/CANON.md`
- `docs/ARCHITECTURE.md`
- `docs/EPISTEMOLOGY.md`
- `docs/ONTOLOGY.md`
- `docs/VOCABULARY.md`
- `docs/STORYBOARD.md`
- `docs/DOCUMENT_MATRIX.md`
- `docs/FILE_INDEX.md`
- `docs/PUZZLES.md`
- `docs/LAUNCH_CHECKLIST.md`

When an implementation and this index diverge, update this index only after confirming whether the implementation or the canon is authoritative.

---

# 8. Architecture Constraints

- Restricted records must remain inaccessible without a valid signed cookie.
- The development entrance must issue the same cookie format accepted by middleware.
- The Evidentiary Corpus remains adjacent to, not embedded within, the relational topology.
- Audio Artifact 001 and Audio Artifact 002 must remain canonically distinct.
- Available retained-audio objects must support local download.
- The authority-resistance anomaly remains unindexed and absent from search.
- Public pages must not expose Cloudflare secrets or development tokens.
- Nontext media must retain provenance, alt text or equivalent description, and its interpretive constraints.
- Search engines must not be invited to index or archive the experience.
