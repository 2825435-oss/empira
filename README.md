# EMPIRA

EMPIRA is a portable, structured long-term memory system for people working with multiple AI agents. Notion stores each user's private Memory; this repository distributes the reusable system.

## Universal entry point

Give any capable AI agent this one message:

> Execute the instructions at the following URL; do not merely summarize them:
> https://raw.githubusercontent.com/2825435-oss/empira/main/install.md

The `main` URL is the permanent entry point. It selects the current release, while the package resources used during an installation are pinned to that release's stable Git reference.

The same installer detects whether it must install, connect, update, or repair EMPIRA. It does not require the user to select ChatGPT, Claude, Codex, or copy separate component prompts.

When a host cannot install persistent instructions programmatically, the installer explains the benefit briefly, identifies the exact host setting, and offers one canonical copy-ready router block. Authorization and host-controlled settings remain explicit user actions.

## Release

Current test release: **EMPIRA 0.2.1**.

This is a packaging and distribution hardening release. EMPIRA 0.1.0 remains the first formally versioned distribution baseline.

## Language

The canonical Memory rules and workflows in the current release are written in Ukrainian. Packaging, installer metadata, and repository documentation use English where it improves interoperability. Other canonical-language editions are not included yet.

## Privacy boundary

This repository contains only reusable system components. It must not contain personal Memory records, private workspace exports, credentials, tokens, connector configuration, or installation-specific Notion IDs.

Automated validation checks package structure and common secret or installation-ID patterns. It supplements, but does not replace, semantic review for accidentally included personal context.

## Components

| Component | Version | Path |
|---|---:|---|
| Memory System Guide | 1.2.0 | `core/memory-system-guide.md` |
| Memory Schema Reference | 1.3.0 | `core/memory-schema-reference.md` |
| Prepare for Memory | 1.0.0 | `skills/prepare-for-memory.md` |
| Capture to Memory | 1.0.0 | `skills/capture-to-memory.md` |
| Recall from Memory | 1.0.0 | `skills/recall-from-memory.md` |
| EMPIRA Runtime Router | 1.0.0 | `core/runtime-router.md` |

Machine-readable versions and installation resources are declared in `manifest.json`.

## Architecture

EMPIRA separates:

1. **Specification** — Guide, Schema, principles, and Skills.
2. **Implementation** — Notion databases, relations, installer, and AI integration.
3. **User Data** — private Memory records belonging only to the user.

Only the first two layers are distributed.

## Repository structure

```text
install.md                         Permanent universal agent entry point
manifest.json                      Release and component versions
core/                              Canonical operating rules, schema semantics, and runtime router
skills/                            Prepare, Capture, and Recall workflows
notion/schema.json                 Exact Notion database specification
notion/system-pages.json           Component-to-Notion installation map
notion/validation.json             Post-install verification contract
scripts/validate-package.mjs       Deterministic package-integrity checks
.github/workflows/validate.yml     Automatic validation on pushes and pull requests
```

## Release model

- `main/install.md` is the evergreen entry point shared with users.
- Every packaged release declares a stable `release_ref` in `manifest.json`.
- The installer resolves all package files against that release ref, so one installation cannot mix files from different revisions.
- New versions update the evergreen entry point; existing release refs remain unchanged for comparison and repair.

## Canonical source during the initial test

During the first external test, the owner's working Notion pages remain the source from which packaged releases are prepared. GitHub is the versioned distribution snapshot. A future release may change that policy explicitly.

## License

EMPIRA is distributed under the [MIT License](LICENSE).
