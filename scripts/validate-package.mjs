import fs from "node:fs";
import path from "node:path";
import { fileURLToPath } from "node:url";

const root = path.resolve(path.dirname(fileURLToPath(import.meta.url)), "..");
const errors = [];

function fail(message) {
  errors.push(message);
}

function read(relativePath) {
  const absolutePath = path.resolve(root, relativePath);
  if (!absolutePath.startsWith(root + path.sep)) {
    throw new Error(`Path escapes repository root: ${relativePath}`);
  }
  if (!fs.existsSync(absolutePath)) {
    fail(`Missing file: ${relativePath}`);
    return "";
  }
  return fs.readFileSync(absolutePath, "utf8");
}

function json(relativePath) {
  const source = read(relativePath);
  if (!source) return {};
  try {
    return JSON.parse(source);
  } catch (error) {
    fail(`Invalid JSON in ${relativePath}: ${error.message}`);
    return {};
  }
}

function expect(condition, message) {
  if (!condition) fail(message);
}

const manifest = json("manifest.json");
const schema = json(manifest.installation?.notion_schema ?? "notion/schema.json");
const systemPages = json(manifest.installation?.system_pages ?? "notion/system-pages.json");
const validation = json(manifest.installation?.validation ?? "notion/validation.json");

expect(/^\d+\.\d+\.\d+$/.test(manifest.version ?? ""), "manifest.version must use x.y.z");
expect(manifest.release_ref === `release-${manifest.version}`, "release_ref must match release-<version>");
expect(
  manifest.release_base_url ===
    `https://raw.githubusercontent.com/2825435-oss/empira/${manifest.release_ref}/`,
  "release_base_url must match release_ref"
);
expect(
  manifest.public_entrypoint ===
    "https://raw.githubusercontent.com/2825435-oss/empira/main/install.md",
  "public_entrypoint must remain the evergreen main/install.md URL"
);
expect(systemPages.release === manifest.version, "system-pages release must match manifest.version");
expect(
  schema.schema_version === manifest.installation?.notion_schema_version,
  "schema_version must match manifest installation metadata"
);
expect(
  systemPages.spec_version === manifest.installation?.system_pages_spec_version,
  "system-pages spec_version must match manifest installation metadata"
);
expect(
  validation.validation_version === manifest.installation?.validation_version,
  "validation_version must match manifest installation metadata"
);

for (const requiredPath of [
  manifest.entrypoint,
  manifest.installation?.notion_schema,
  manifest.installation?.system_pages,
  manifest.installation?.validation,
  manifest.installation?.runtime_router,
  manifest.integrity?.validator,
  manifest.integrity?.workflow,
  "README.md",
  "CHANGELOG.md",
  "LICENSE"
]) {
  if (typeof requiredPath !== "string" || !requiredPath) {
    fail("Manifest contains an empty required path");
  } else {
    read(requiredPath);
  }
}

const components = Array.isArray(manifest.components) ? manifest.components : [];
expect(components.length > 0, "manifest.components must not be empty");

const componentIds = new Set();
const componentPaths = new Set();

for (const component of components) {
  expect(!componentIds.has(component.id), `Duplicate component id: ${component.id}`);
  expect(!componentPaths.has(component.path), `Duplicate component path: ${component.path}`);
  componentIds.add(component.id);
  componentPaths.add(component.path);

  expect(["notion", "host"].includes(component.deployment), `Invalid deployment for ${component.id}`);
  expect(/^\d+\.\d+\.\d+$/.test(component.version ?? ""), `Invalid version for ${component.id}`);

  const source = read(component.path);
  if (!source) continue;

  const escapedId = component.id.replace(/[.*+?^$()|[\]\\]/g, "\\$&");
  const escapedVersion = component.version.replace(/[.*+?^$()|[\]\\]/g, "\\$&");
  expect(
    new RegExp(`Component ID:\\s*\\\\?`?${escapedId}\\\\?`?`).test(source),
    `Component ID header mismatch in ${component.path}`
  );
  expect(
    new RegExp(`Version:\\s*\\\\?`?${escapedVersion}\\\\?`?`).test(source),
    `Component version header mismatch in ${component.path}`
  );
}

const notionComponents = components.filter((component) => component.deployment === "notion");
const mappedPages = Array.isArray(systemPages.pages) ? systemPages.pages : [];

expect(mappedPages.length === notionComponents.length, "Every Notion component must have exactly one system-page mapping");

for (const component of notionComponents) {
  const matches = mappedPages.filter((page) => page.component_id === component.id);
  expect(matches.length === 1, `Expected one system-page mapping for ${component.id}`);
  if (matches.length === 1) {
    expect(matches[0].version === component.version, `Mapped version mismatch for ${component.id}`);
    expect(matches[0].source === component.path, `Mapped source mismatch for ${component.id}`);
  }
}

for (const page of mappedPages) {
  const component = components.find((item) => item.id === page.component_id);
  expect(Boolean(component), `Unknown mapped component: ${page.component_id}`);
  expect(component?.deployment === "notion", `Host component must not be mapped into Notion: ${page.component_id}`);
}

const installer = read("install.md");
const readme = read("README.md");
expect(installer.includes(`Target release: \\`${manifest.version}\\``), "Installer target release mismatch");
expect(installer.includes(manifest.release_base_url), "Installer does not use manifest.release_base_url");
expect(readme.includes(manifest.public_entrypoint), "README does not contain the public entrypoint");
expect(readme.includes(`EMPIRA ${manifest.version}`), "README release version mismatch");

const privacyPatterns = [
  ["GitHub personal access token", /\b(?:ghp|github_pat)_[A-Za-z0-9_]{20,}\b/g],
  ["OpenAI-style secret key", /\bsk-[A-Za-z0-9_-]{20,}\b/g],
  ["Notion integration secret", /\bsecret_[A-Za-z0-9]{20,}\b/g],
  ["Private key", /-----BEGIN (?:RSA |EC |OPENSSH )?PRIVATE KEY-----/g],
  ["Notion page or workspace UUID", /\b[0-9a-f]{8}-[0-9a-f]{4}-[1-5][0-9a-f]{3}-[89ab][0-9a-f]{3}-[0-9a-f]{12}\b/gi]
];

const privacyFiles = new Set([
  "README.md",
  "CHANGELOG.md",
  "install.md",
  "manifest.json",
  manifest.installation?.notion_schema,
  manifest.installation?.system_pages,
  manifest.installation?.validation,
  ...components.map((component) => component.path)
]);

for (const relativePath of privacyFiles) {
  if (typeof relativePath !== "string") continue;
  const source = read(relativePath);
  for (const [label, pattern] of privacyPatterns) {
    pattern.lastIndex = 0;
    if (pattern.test(source)) {
      fail(`${label} pattern found in ${relativePath}`);
    }
  }
}

if (errors.length > 0) {
  console.error("EMPIRA package validation failed:");
  for (const error of errors) console.error(`- ${error}`);
  process.exit(1);
}

console.log(
  `EMPIRA ${manifest.version} package validation passed: ${components.length} components, ${mappedPages.length} Notion mappings.`
);
