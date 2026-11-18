import { copyFileSync, mkdirSync } from "node:fs";
import { dirname, join } from "node:path";
import { fileURLToPath } from "node:url";

// The entry image is rendered outside this program. This entrypoint
// only copies it into the output directory the judge reads from,
// so the result is byte-identical on every run.
function main(): void {
  const here = dirname(fileURLToPath(import.meta.url));
  const outDir = process.env.MAKEFUN_OUTPUT_DIR || "/output";

  const src = join(here, "entry.png");
  const dest = join(outDir, "entry.png");

  mkdirSync(outDir, { recursive: true });
  try {
    copyFileSync(src, dest);
  } catch (err) {
    throw new Error(`failed to copy ${src} to ${dest}: ${err}`);
  }
}

main();
