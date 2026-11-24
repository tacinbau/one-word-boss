// One Word for the Boss — entry program.
// Writes a single word describing the boss to the output file.
import { mkdirSync, writeFileSync } from "node:fs";

const WORD = "Delegator";

// The grader runs the program in a sandbox whose output directory is
// /output; a local run may point elsewhere with MAKEFUN_OUTPUT_DIR.
// If the first choice cannot be created, fall back to a local out/ dir
// so the entry is still produced instead of crashing.
function resolveOutDir(): string {
  const candidates = [process.env.MAKEFUN_OUTPUT_DIR, "/output", "out"].filter(
    (d): d is string => Boolean(d),
  );
  for (const dir of candidates) {
    try {
      mkdirSync(dir, { recursive: true });
      return dir;
    } catch {
      // Try the next candidate.
    }
  }
  throw new Error("no writable output directory");
}

const outDir = resolveOutDir();
writeFileSync(`${outDir}/entry.txt`, WORD, "utf8");
console.log(`Wrote ${WORD.length}-character entry to ${outDir}/entry.txt`);
