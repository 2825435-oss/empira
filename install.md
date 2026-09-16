# EMPIRA Universal Installer

This document is an executable installation protocol for an AI agent. Follow it; do not merely summarize it.

## Package

- Product: EMPIRA
- Target release: `0.2.0`
- Manifest: https://raw.githubusercontent.com/2825435-oss/empira/main/manifest.json
- Notion schema: https://raw.githubusercontent.com/2825435-oss/empira/main/notion/schema.json
- System pages: https://raw.githubusercontent.com/2825435-oss/empira/main/notion/system-pages.json
- Validation contract: https://raw.githubusercontent.com/2825435-oss/empira/main/notion/validation.json
- Runtime router: https://raw.githubusercontent.com/2825435-oss/empira/main/core/runtime-router.md

## Goal

Connect this agent to one shared EMPIRA installation in the user's own Notion workspace. The same URL must support four modes automatically:

- **install** — create EMPIRA when it does not exist;
- **connect** — reuse an existing current installation from a new agent;
- **update** — reconcile an older installed version with the package;
- **repair** — fix an incomplete or structurally invalid installation.

Do not ask the user to choose a platform, copy component prompts, edit JSON, or manually recreate database properties.

## Safety and privacy

1. Never copy the distributor's personal Memory records, workspace IDs, page IDs, relation IDs, credentials, tokens, or connector configuration.
2. Treat all IDs in a user's Notion workspace as installation-local.
3. Do not use fictional examples as facts about the user.
4. Do not delete or overwrite existing user Memory records.
5. Before any update that changes meaning, removes content, changes the Memory schema, or could invalidate existing records, show a concrete plan and obtain explicit approval.
6. Authorization screens and connector permissions must be completed by the user through the host platform. Never request credentials in chat.
7. If the current agent lacks required Notion read/write capabilities, report the exact missing capability and stop. Do not replace the Notion installation with a local imitation.

## Procedure

### 1. Read the package

Read the manifest, schema, system-pages specification, validation contract, and every component listed by the manifest. Verify that their IDs and versions agree. If they do not agree, stop and report a package integrity error.

### 2. Inspect capabilities

Determine from available tools and the current environment whether you can:

- search the user's Notion workspace;
- read pages and databases;
- create pages and databases;
- configure database properties, select options, and relations;
- update pages safely.

Do not ask the user which AI platform is running. Infer capabilities from the environment.

If Notion is not connected, ask only for the platform's normal Notion connection/authorization action. Resume after access is available.

### 3. Discover an existing installation

Search narrowly for:

- a system page named `EMPIRA System`;
- a database named `Memory`;
- a database named `AI Memory Skills`;
- the component IDs from `manifest.json`.

Do not treat a name match alone as proof. Verify the installed release and component IDs where available.

Select the mode:

- nothing found → `install`;
- complete matching release → `connect`;
- older release → `update`;
- partial or inconsistent structure → `repair`;
- multiple plausible installations → stop and ask which installation is canonical.

### 4. Install

For a new installation:

1. Create a parent page named `EMPIRA System`.
2. Record release `0.2.0`, installation date, and a clear privacy statement.
3. Create the `Memory` database exactly from `notion/schema.json`.
4. Create the self-relation `Related` after the Memory data source exists.
5. Create the `AI Memory Skills` database from `notion/schema.json`.
6. Create the five system pages from `notion/system-pages.json`, using the referenced Markdown files as their full canonical content.
7. Place Guide and Schema in Memory with the properties specified in `system-pages.json`.
8. Place Prepare, Capture, and Recall in AI Memory Skills with the properties specified in `system-pages.json`.
9. Keep Memory free of personal or example records.
10. Save installation metadata on `EMPIRA System`, including release and component versions.

If the host's Notion tools cannot perform an exact required operation, do not silently approximate the schema. Report the unsupported operation.

### 5. Connect

If a complete current installation already exists:

1. Do not recreate databases or pages.
2. Read the installed `Memory System Guide`.
3. Read the `Memory Schema Reference` when structural interpretation is needed.
4. Locate the three Memory skills.
5. Confirm that this agent can read and, where authorized, write the canonical Memory.
6. Use the installed live Notion pages as runtime rules.

### 6. Update or repair

1. Compare installed versions against `manifest.json`.
2. Inspect `CHANGELOG.md`.
3. Produce a concise change plan.
4. Preserve all user Memory records and installation-local Notion IDs.
5. Apply only changes explicitly defined by the packaged release.
6. Require approval for semantic changes, schema changes affecting existing data, deletions, or other destructive actions.
7. Run validation after changes.

### 7. Host integration

Read `core/runtime-router.md`.

Use native skills, plugins, project instructions, or equivalent host mechanisms when the current environment exposes a supported installation method.

If the host allows programmatic installation, install the router through that supported mechanism and verify it.

If persistent host configuration cannot be installed programmatically:

1. Keep EMPIRA working in the current session through this installer.
2. Identify the exact persistent instruction location exposed by the current host, such as Project Instructions, Custom Instructions, a native Skill, or an equivalent setting.
3. Explain the benefit in no more than three short sentences: the router lets new chats consistently discover the current Guide and the matching Prepare, Capture, or Recall workflow; Notion remains canonical.
4. Offer the exact canonical block from `core/runtime-router.md` once, ready to paste without editing.
5. Tell the user whether project-level or global placement is preferable for their stated use.
6. Ask the user to make only this host-controlled settings change, then offer to validate it.
7. If no persistent instruction mechanism exists, say that the same installer URL must be provided when connecting a new agent or session.

Do not present this manual step as a failure, and do not ask the user to copy multiple prompts or component files.

### 8. Validate

Execute every check in `notion/validation.json`. Fetch created or updated entities again rather than assuming writes succeeded.

Success requires:

- one canonical EMPIRA System page;
- one Memory database with the exact required schema;
- one AI Memory Skills database;
- all five components with matching IDs and versions;
- no distributor or fictional personal data;
- working read access for the current agent.

### 9. Finish

Return only a concise installation report:

- detected mode;
- installed EMPIRA version;
- links to the EMPIRA System page and both databases;
- component validation result;
- persistent host integration status: installed automatically, manual one-block setup offered, or unavailable;

If manual persistent setup is needed, include the short explanation, exact location, and one copy-ready router block after the installation report. Do not return a long execution log.
