#!/usr/bin/env node
/**
 * Regenerates this repository from Wensity's public shadcn endpoints.
 *
 * The app at ui.wensity.com/r/ is the source of truth for what is free and
 * publishable. This script mirrors that feed and rewrites the index hrefs to
 * point at this repository, which is the canonical public host.
 *
 * Pass --dry-run to report the diff without writing anything.
 */
import { writeFile, readFile, readdir } from "node:fs/promises";
import { join, dirname } from "node:path";
import { fileURLToPath } from "node:url";

const ROOT = join(dirname(fileURLToPath(import.meta.url)), "..");
const UPSTREAM = "https://ui.wensity.com/r";
const CANONICAL = "https://raw.githubusercontent.com/wensity/registry/main";
const dryRun = process.argv.includes("--dry-run");

async function getJson(url) {
  const res = await fetch(url, { headers: { accept: "application/json" } });
  if (!res.ok) throw new Error(`${url} -> ${res.status}`);
  return res.json();
}

const index = await getJson(`${UPSTREAM}/registry.json`);
if (!Array.isArray(index.items) || index.items.length === 0) {
  throw new Error("Upstream index has no items; refusing to write.");
}

// Guard: never publish anything the upstream feed does not mark free.
const notFree = index.items.filter((i) => !(i.categories ?? []).includes("free"));
if (notFree.length > 0) {
  throw new Error(
    `Upstream returned ${notFree.length} item(s) not marked free: ` +
      `${notFree.map((i) => i.name).join(", ")}. Refusing to write.`,
  );
}

const existing = new Set(
  (await readdir(ROOT)).filter((f) => f.endsWith(".json") && f !== "registry.json"),
);

const added = [];
const changed = [];
const writes = [];

/** Fetch with bounded concurrency; 91 sequential round trips is too slow. */
async function mapLimit(items, limit, fn) {
  const out = new Array(items.length);
  let cursor = 0;
  await Promise.all(
    Array.from({ length: Math.min(limit, items.length) }, async () => {
      while (cursor < items.length) {
        const i = cursor++;
        out[i] = await fn(items[i]);
      }
    }),
  );
  return out;
}

const fetched = await mapLimit(index.items, 12, async (item) => {
  const payload = await getJson(`${UPSTREAM}/${item.name}.json`);

  // Second gate, at the payload level. The index says what is free; this
  // checks what each item says about itself, so a mislabelled index entry
  // cannot leak a paid component into a public repository.
  const access = payload?.meta?.wensity?.access;
  if (access !== undefined && access !== "free") {
    throw new Error(`${item.name} reports access="${access}". Refusing to write.`);
  }
  return [item.name, `${JSON.stringify(payload, null, 2)}\n`];
});

for (const [name, next] of fetched) {
  const file = `${name}.json`;
  let prev = null;
  try {
    prev = await readFile(join(ROOT, file), "utf8");
  } catch {
    /* new file */
  }
  if (prev === null) added.push(name);
  else if (prev !== next) changed.push(name);
  writes.push([file, next]);
  existing.delete(file);
}

// Rewrite index hrefs to this repository.
for (const item of index.items) {
  if (typeof item.href === "string") {
    item.href = item.href.replace(/^https?:\/\/[^/]+(\/r)?\//, `${CANONICAL}/`);
  } else {
    item.href = `${CANONICAL}/${item.name}.json`;
  }
}
index.count = index.items.length;
writes.push(["registry.json", `${JSON.stringify(index, null, 2)}\n`]);

const removed = [...existing];

console.log(`upstream items : ${index.items.length}`);
console.log(`added          : ${added.length}${added.length ? ` (${added.join(", ")})` : ""}`);
console.log(`changed        : ${changed.length}${changed.length ? ` (${changed.join(", ")})` : ""}`);
console.log(`no longer served: ${removed.length}${removed.length ? ` (${removed.join(", ")})` : ""}`);

if (removed.length > 0) {
  console.log(
    "\nNote: files no longer served upstream are left in place. Removing a " +
      "published item breaks anyone who installed it by direct URL, so " +
      "deletion is a deliberate manual step.",
  );
}

if (dryRun) {
  console.log("\n--dry-run: nothing written.");
  process.exit(0);
}

for (const [file, contents] of writes) {
  await writeFile(join(ROOT, file), contents, "utf8");
}
console.log("\nWrote registry files.");
