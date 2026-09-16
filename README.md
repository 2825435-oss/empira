# EMPIRA

EMPIRA is a portable, structured long-term memory system for people working with multiple AI agents. Notion stores the user's private Memory; this repository distributes the system rules, schema, reusable workflows, and installation adapters.

## Release

Current packaged baseline: **EMPIRA 0.1.0**.

This is the first formally versioned distribution baseline. It does not attempt to reconstruct every internal revision that existed before packaging began.

## Privacy boundary

This repository contains only reusable system components:

- Memory System Guide;
- Memory Schema Reference;
- Prepare, Capture, and Recall workflows;
- installation and host-adapter instructions;
- version manifest and changelog.

It must not contain a user's personal Memory records, private workspace exports, credentials, tokens, or connector configuration.

## Components

| Component | Version | Path |
|---|---:|---|
| Memory System Guide | 1.2.0 | `core/memory-system-guide.md` |
| Memory Schema Reference | 1.3.0 | `core/memory-schema-reference.md` |
| Prepare for Memory | 1.0.0 | `skills/prepare-for-memory.md` |
| Capture to Memory | 1.0.0 | `skills/capture-to-memory.md` |
| Recall from Memory | 1.0.0 | `skills/recall-from-memory.md` |

Machine-readable versions are stored in `manifest.json`.

## Architecture

EMPIRA separates three layers:

1. **Specification** — Guide, Schema, principles, and Skills.
2. **Implementation** — Notion databases, relations, bootstrap/router, and AI integration.
3. **User Data** — private Memory records belonging only to the user.

Only the first two layers are distributable. User Data stays in the user's own Notion workspace.

## Installation status

The reusable core is included in this baseline. The clean-install workflow and host adapters for ChatGPT, Claude, and Codex are being validated before the first external installation.

## Repository structure

```text
core/       Canonical operating rules and database schema
skills/     Reusable Memory workflows
adapters/   Host-specific bootstrap instructions
installer/  Clean-install instructions and prompts
examples/   Fictional examples only
```

## Canonical source during the initial test

During the first external test, the owner's working Notion pages remain the source from which packaged releases are prepared. This repository is the versioned distribution snapshot. A future release may change that policy explicitly.
