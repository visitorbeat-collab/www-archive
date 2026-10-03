# WORLD WIDE WASTE — INDEX ARCHITECTURE

**Status:** Implemented / current
**Scope:** Public reconstruction, conditional discovery, restricted access, and retained media
**Deployment:** Cloudflare Pages with Pages Functions
**Static root:** `site/`

---

# 1. Architectural Principle

The Index is the Finder's human reconstruction of a deeper observation system. Its technical structure must preserve the same distinction as the narrative:

- public material is browsable evidence and interpretation
- recovered material has uncertain provenance
- restricted material requires conceptual qualification
- nontext material preserves properties that prose cannot replace

The complete public layer is Finder-controlled in presentation and custody. This does not mean the
Finder authored every underlying record. Public recovered pages distinguish source content from the
Finder's filenames, English reconstruction, section divisions, links, and directory placement.
Original authorship and the precise access mechanism remain unresolved.

The interface should feel like a modest archive, not a game dashboard. Conditional behavior must correspond to interpretation rather than arbitrary completion counts.

---

# 2. Deployment Layers

## Static site

`site/` contains all public HTML, CSS, JavaScript, images, and audio served by Cloudflare Pages.

## Pages Functions

`functions/` contains the server-side access layer:

- `functions/restricted/access.js` issues and verifies short-lived relational challenges and creates the signed access cookie.
- `functions/restricted/archive/_middleware.js` protects the restricted archive.
- `functions/restricted/dev-entry.js` provides a token-protected development entrance using the same cookie format.

No secret is present in public JavaScript. Production secrets are supplied through Cloudflare environment variables.

---

# 3. Public Reconstruction

`site/index.html` is the primary public entry. It presents the archive as grouped material rather than a strict reading sequence.

On a reader's first visit, the root displays a restrained entrance state before revealing the
directory. The entrance identifies only the public reconstruction boundary and its incomplete
source continuity; it does not imply that the visitor has reached the restricted system. Opening
the Index stores `observation-index-entry-seen=true` in local storage. Later visits proceed
directly to the root, while a quiet footer control can restore the entrance deliberately.

Public collections include:

- `field-notes/`
- `working-notes/`
- `recovered/`
- `cross-references/`
- `testimony/`
- `environmental/`
- `timeline/`

The root does not expose `timeline/` immediately. Visiting
`working-notes/personal/what_changed.html` records the chronology discovery state, and
prior restricted-boundary discovery also satisfies that condition. The timeline itself
remains directly reachable; the conditional state protects story order rather than access.

Search is not represented as a directory. The root query instrument submits to `site/search/index.html`, and `site/js/concept-search.js` maps human queries to conceptual classifications and related documents.

The query instrument exposes a progressive local concept network. Its initial state shows only
`interpretation` and the safe starting relations `observation`, `systems`, and `uncertainty`.
Selecting or entering a concept redraws the network around that classification and shows only its
immediate relations. This makes relational retrieval discoverable without exposing the complete
ontology or reducing the path to a checklist. Document matches remain below the network.

---

# 4. Conditional Restricted Discovery

The root Index does not initially display `restricted/`.

When conceptual search resolves a query to `responsibility`, it:

1. displays the restricted boundary in the retrieval response
2. stores `observation-index-restricted-discovered=true`
3. permits `site/js/index-state.js` to restore the `restricted/` row on later root visits

Aliases such as `duty`, `obligation`, and `accountability` may resolve to the same classification. This is a discovery condition, not access control. Direct URLs remain functional.

`responsibility` is not present in the initial network. It first becomes visible as an immediate
relation of `consequence`, which is itself reachable through the earlier public concepts. The route
therefore remains semantic rather than completion-based.

---

# 5. Relational Access Gate

`site/restricted/index.html` hosts the relational assessment implemented by `gate-test.js` and `gate-test.css`.

The browser requests a signed, five-minute challenge from `/restricted/access`. A successful interpretation is verified server-side. The response sets:

`restricted_access=<HMAC signature>`

Cookie properties:

- `Path=/restricted`
- `HttpOnly`
- `Secure`
- `SameSite=Lax`
- `Max-Age=86400`

The middleware independently recreates the expected signature using `RESTRICTED_COOKIE_SECRET`. Invalid or missing cookies redirect to `/restricted/`.

After the first server-verified solution, the browser stores
`restricted-gate-relation-retained=true`. A returning reader sees the resolved topology
and may renew access by selecting its center. The browser still requests a fresh signed
challenge and submits the canonical interpretation before the server issues a new access
cookie. Local recognition reduces repetition; it does not bypass server authorization.

---

# 6. Restricted Relational Archive

`site/restricted/archive/index.html` replaces folder hierarchy with a conceptual topology:

- condition
- boundary
- retention
- exposure
- participation
- effect

Nontext appears as a distinct collection branch attached to Retention. It
is not an additional conceptual claim: it is the operational result of the
rule to retain media before interpretation removes relevant structure.

`restricted-map.js` records visits to navigable concepts and the Nontext collection in local storage under `restricted-map-visited`. Local navigation on individual records reproduces the topology without turning every retained document into a map node.

The Evidentiary Corpus at `archive/external_records/` is adjacent to this topology. It is prominent but excluded from the relational map so interpreted population events are not confused with either recovered conceptual records or retained media objects.

The three restricted layers have separate functions:

| Layer | Primary object | Function |
| --- | --- | --- |
| Relational topology | Recovered conceptual record | States the observation model |
| Nontext | Documented terrestrial media | Preserves properties that prose cannot replace |
| Evidentiary Corpus | Population-originated event | Tests the model through comparative analysis |

Finder-created diagrams, photographs, and interpretive models remain in
`site/working-notes/personal/`, even when they refer to restricted
material.

The restricted archive contains no explicit Finder annotations or first-person Finder commentary.
It may describe an unnamed post-exposure subject whose behavior corresponds to the Finder, but the
restricted material does not confirm that identity. Emphasized recovered lines use neutral
presentation and must not inherit the public `.finder-annotation` label.

The Nontext index also contains a non-interactive continuity register.
This register implies a larger retained collection without creating dead
links or false puzzle states. Missing objects use varied continuity
conditions—absent payload, unresolved encoding, checksum conflict,
incomplete sequence, or unavailable dependency—rather than a universal
"corrupt" status.

Manifest counts respond to the existing retained-audio state: three
objects are initially accessible, and a fourth becomes accessible when
the concealed audio registry resolves. The total retained-reference count
remains constant.

---

# 7. Retained Audio State

`restricted/retained-audio.js` manages the deepest implemented discovery state.

The retained-audio registry becomes visible only when:

- threshold, retention, exposure, participation, and nontext have been visited
- Comparative Convergence Assessment 001 has recorded `restricted-audio-convergence=observed`

This state reveals the expandable audio registry. It does not merge individual artifacts or imply shared provenance.

Available audio artifacts must include explicit download links.

---

# 8. State and Security Boundaries

Local storage controls discoverability and reader continuity only. It must never be treated as authorization.

| Key | Purpose |
| --- | --- |
| `observation-index-entry-seen` | Bypasses the root entrance for returning readers |
| `observation-index-restricted-discovered` | Restores the root Restricted link |
| `restricted-map-visited` | Records restricted topology visits |
| `restricted-audio-convergence` | Records convergence-assessment observation |
| `restricted-gate-relation-retained` | Restores the shortened returning-reader gate |

The signed, `HttpOnly` cookie is the only client credential accepted by restricted middleware.

---

# 9. Crawler and Privacy Policy

The archive is intended to be discovered through the physical release rather than search engines.

- `site/robots.txt` requests that all crawlers avoid the site.
- `site/_headers` sends `X-Robots-Tag: noindex, nofollow, noarchive, nosnippet` across static responses.
- No sitemap is generated.
- Referrer information is suppressed with `Referrer-Policy: no-referrer`.

Crawler directives reduce accidental discovery but are not security controls.

---

# 10. Non-Negotiable Constraints

- The authority-resistance anomaly remains absent from directory indexes and conceptual search.
- Restricted authorization remains server-side.
- No public file contains Cloudflare secrets or development tokens.
- The Evidentiary Corpus remains outside the restricted topology.
- Nontext remains a collection branch of Retention, not a peer conceptual claim.
- Finder-created reconstructions remain outside the restricted archive.
- The restricted archive does not explicitly name the Finder or contain Finder-authored asides.
- Unresolved Nontext references remain non-interactive until a real object replaces them.
- Audio Artifact 001 and Audio Artifact 002 remain canonically distinct.
- Audio Artifact 002 is a population-originated biospheric field record, not Observer-produced audio.
- Available retained audio remains downloadable.
- Adding material must deepen interpretation rather than merely increase volume.
