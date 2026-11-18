// Entry program for the news-image-20261117 bounty on make.fun.
// Job: hand the prepared artwork (entry.png) over to the judging harness
// by copying it byte-for-byte into the output directory the harness
// provides through MAKEFUN_OUTPUT_DIR (falling back to /output).
//
// Only Node's standard library is used, nothing is fetched from the
// network, and the copy is a pure byte transfer, so every run produces
// an identical output file.

import { copyFileSync, existsSync, mkdirSync, statSync } from "node:fs";
import { dirname, join } from "node:path";
import { fileURLToPath } from "node:url";

const here = dirname(fileURLToPath(import.meta.url));
const source = join(here, "entry.png");

// Validate the artwork before doing anything: it must exist next to this
// program and contain at least one byte. Failing loudly here beats writing
// an empty or missing image into the output directory.
if (!existsSync(source)) {
  console.error(`error: source image not found: ${source}`);
  process.exit(1);
}
if (statSync(source).size === 0) {
  console.error(`error: source image is empty: ${source}`);
  process.exit(1);
}
const outDir = process.env.MAKEFUN_OUTPUT_DIR || "/output";
const target = join(outDir, "entry.png");

mkdirSync(outDir, { recursive: true });
copyFileSync(source, target);
console.log(`copied entry.png -> ${target}`);
