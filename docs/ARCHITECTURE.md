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

---

# 4. Conditional Restricted Discovery

The root Index does not initially display `restricted/`.

When conceptual search resolves a query to `responsibility`, it:

1. displays the restricted boundary in the retrieval response
2. stores `observation-index-restricted-discovered=true`
3. permits `site/js/index-state.js` to restore the `restricted/` row on later root visits

Aliases such as `duty`, `obligation`, and `accountability` may resolve to the same classification. This is a discovery condition, not access control. Direct URLs remain functional.

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
- nontext

`restricted-map.js` records visits to navigable concepts in local storage under `restricted-map-visited`. Local navigation on individual records reproduces the topology without turning every retained document into a map node.

The Evidentiary Corpus at `archive/external_records/` is adjacent to this topology. It is prominent but excluded from the relational map so human historical evidence is not confused with recovered-source material.

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
- Audio Artifact 001 and Audio Artifact 002 remain canonically distinct.
- Audio Artifact 002 is a human-retained biospheric field record, not source-system audio.
- Available retained audio remains downloadable.
- Adding material must deepen interpretation rather than merely increase volume.
