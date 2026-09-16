# Changelog

All notable packaged changes to EMPIRA are documented here.

## 0.2.1 — Distribution integrity hardening

### Added

- One copy-ready message containing the permanent installer URL.
- Stable release-ref metadata and release-pinned package resource URLs.
- Explicit Ukrainian canonical-content language declaration.
- MIT license.
- Deterministic package validator for paths, component metadata, schema versions, release consistency, and common secret or installation-ID patterns.
- GitHub Actions validation on pushes and pull requests.

### Changed

- The README now describes the evergreen-entrypoint and stable-release-ref model.
- The installer resolves all package components from one release ref and rejects mixed revisions.
- Automated privacy checks are explicitly described as a supplement to semantic review, not a complete guarantee.

### Compatibility

- Memory System Guide remains 1.2.0.
- Memory Schema Reference remains 1.3.0.
- Prepare, Capture, Recall, and Runtime Router remain 1.0.0.
- No Notion schema or user Memory migration is required.

## 0.2.0 — Universal runtime router and manual host fallback

### Added

- Canonical `EMPIRA Runtime Router 1.0.0`.
- Explicit routing to all three workflows: Prepare, Capture, and Recall.
- Safe treatment of agent memory, prior chats, cached IDs, local skills, and GitHub snapshots as non-canonical navigation aids.
- Installer fallback for hosts that cannot modify persistent settings programmatically.
- Short user-facing explanation, exact settings location, and one copy-ready router block instead of multiple manual prompts.
- Guidance for choosing project-level versus global/custom instructions.

### Compatibility

- Memory System Guide remains 1.2.0.
- Memory Schema Reference remains 1.3.0.
- Prepare, Capture, and Recall remain 1.0.0.
- No user Memory schema migration is required.

## 0.1.0 — Initial packaged baseline

First formally versioned distribution prepared for installation by another user.

### Included

- Universal agent entry point with automatic `install`, `connect`, `update`, and `repair` modes.
- Machine-readable Notion database schema.
- System-page installation map.
- Post-install validation contract.
- Memory System Guide 1.2.0.
- Memory Schema Reference 1.3.0.
- Prepare for Memory 1.0.0.
- Capture to Memory 1.0.0.
- Recall from Memory 1.0.0.
- Machine-readable release and component manifest.
- Privacy boundary separating reusable system components from personal Memory data.

### Historical note

EMPIRA evolved before formal release versioning began. Version 0.1.0 is an honest baseline of the current packaged system, not a reconstructed sequence of earlier releases.

Known architectural developments before this baseline include the Summary test, separation of Prepare and Capture, two-phase Capture, Recall retrieval workflow, semantic ownership, Promotion/Extract, Decision Boundary, and reference role. These are development history, not fabricated prior releases.

### Migration

None. This is the first packaged baseline.
