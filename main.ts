// news-image-20261117 (v3) entrypoint.
// Copies the entry image, entry.png, from this repository's root into the
// output directory the harness provides via MAKEFUN_OUTPUT_DIR.
// Node 22, standard library only, no network, fully deterministic:
// the output is a byte-for-byte copy of the input image.
import { copyFileSync, existsSync, mkdirSync, statSync } from "node:fs";
import { dirname, join } from "node:path";
import { fileURLToPath } from "node:url";

const here = dirname(fileURLToPath(import.meta.url));
const source = join(here, "entry.png");
const outDir = process.env.MAKEFUN_OUTPUT_DIR;

if (!outDir) {
  console.error("error: MAKEFUN_OUTPUT_DIR is not set");
  process.exit(1);
}

if (!existsSync(source)) {
  console.error(`error: entry.png not found at ${source}`);
  process.exit(1);
}

mkdirSync(outDir, { recursive: true });
const dest = join(outDir, "entry.png");
copyFileSync(source, dest);

// Verify the copy landed whole: sizes must match, or fail loudly.
const inBytes = statSync(source).size;
const outBytes = statSync(dest).size;
if (inBytes !== outBytes) {
  console.error(`error: copy incomplete (${outBytes} of ${inBytes} bytes)`);
  process.exit(1);
}
console.log(`entry.png copied to ${dest} (${outBytes} bytes)`);
