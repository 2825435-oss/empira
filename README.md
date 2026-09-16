# EMPIRA

EMPIRA is a portable, structured long-term memory system for people working with multiple AI agents. Notion stores each user's private Memory; this repository distributes the reusable system.

## Universal entry point

The intended user experience is one instruction to any capable AI agent:

> Execute the EMPIRA installer at this URL.

Canonical installer file: [install.md](install.md)

The same installer detects whether it must install, connect, update, or repair EMPIRA. It does not require the user to select ChatGPT, Claude, Codex, or copy separate component prompts.

When a host cannot install persistent instructions programmatically, the installer explains the benefit briefly, identifies the exact host setting, and offers one canonical copy-ready router block. Authorization and host-controlled settings remain explicit user actions.

The public raw URL will become usable after this clean repository is made public:

```text
https://raw.githubusercontent.com/2825435-oss/empira/main/install.md
```

## Release

Current test release: **EMPIRA 0.2.0**.

This is the first formally versioned distribution baseline. It does not attempt to reconstruct every internal revision that existed before packaging began.

## Privacy boundary

This repository contains only reusable system components. It must not contain personal Memory records, private workspace exports, credentials, tokens, connector configuration, or installation-specific Notion IDs.

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
install.md                 Universal agent entry point
manifest.json              Release and component versions
core/                      Canonical operating rules, schema semantics, and runtime router
skills/                    Prepare, Capture, and Recall workflows
notion/schema.json         Exact Notion database specification
notion/system-pages.json   Component-to-Notion installation map
notion/validation.json     Post-install verification contract
```

## Canonical source during the initial test

During the first external test, the owner's working Notion pages remain the source from which packaged releases are prepared. GitHub is the versioned distribution snapshot. A future release may change that policy explicitly.
