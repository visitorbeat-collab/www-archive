# WORLD WIDE WASTE — INDEX LAUNCH CHECKLIST

**Status:** Repository checks passed / production verification required after deployment
**Last repository verification:** 2026-09-20

---

# Automated Repository Checks

- [x] HTML structure validated across all 97 pages
- [x] Local links, form actions, and fragment targets validated
- [x] Duplicate HTML identifiers checked
- [x] Public and restricted JavaScript syntax checked
- [x] Conditional Restricted discovery tested with exact and aliased concepts
- [x] Persisted root discovery state tested
- [x] Conditional Timeline discovery and persisted chronology state tested
- [x] Retained-audio state logic retained
- [x] CSS brace balance checked
- [x] Empty control documents resolved
- [x] Obsolete placeholder authentication code removed
- [x] Site-wide crawler directives added
- [x] Update archive extraction verified byte-for-byte

---

# Production Acceptance Test

Run in a fresh private window after Cloudflare Pages reports a successful deployment.

## Public entry

- [ ] Fresh root Index loads without `SYSTEM / STATUS`, `timeline/`, or `restricted/`
- [ ] Query instrument is visible above the directory structure
- [ ] An ordinary query returns conceptual results without revealing Restricted
- [ ] `responsibility`, `duty`, `obligation`, or `accountability` reveals the boundary
- [ ] Returning to the root restores `timeline/` and `restricted/` under `SYSTEM / STATUS`
- [ ] In a separate fresh private window, visiting `what_changed` and returning to root reveals `timeline/` without revealing `restricted/`

## Restricted boundary

- [ ] Direct `/restricted/archive/` access without a cookie redirects to `/restricted/`
- [ ] Relational assessment loads without console errors
- [ ] Incorrect arrangements do not grant access
- [ ] Correct arrangement issues the cookie and opens the restricted archive
- [ ] Restricted navigation survives page changes and refreshes

## Restricted archive

- [ ] Relational map works on desktop and narrow mobile width
- [ ] Evidentiary Corpus remains outside the topology
- [ ] Earthrise and Golden Record images load with correct orientation and captions
- [ ] Audio Artifact 001 plays
- [ ] Audio Artifact 001 downloads successfully
- [ ] Audio Artifact 002 remains visibly unavailable until media exists

## Retained audio

- [ ] Visiting the five required concepts records topology state
- [ ] Comparative Convergence Assessment records convergence state
- [ ] Retained-audio entry appears only when both conditions are satisfied
- [ ] Refreshing and reopening preserve the intended discovery state

## Deployment headers

- [ ] `/robots.txt` returns `User-agent: *` and `Disallow: /`
- [ ] A static page response contains `X-Robots-Tag: noindex, nofollow, noarchive, nosnippet`
- [ ] No production response exposes a secret or development token

---

# Completion Condition

The Index is launch-ready when every production acceptance item passes. Hidden-track media may remain on its separate production schedule.
