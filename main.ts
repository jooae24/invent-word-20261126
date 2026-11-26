// Invent a Word We Need — make.fun bounty entry.
// Writes the entry line to $MAKEFUN_OUTPUT_DIR/entry.txt (default /output).
import { mkdirSync, readFileSync, writeFileSync } from "node:fs";
import { join } from "node:path";

const ENTRY =
  "Tabalanche (n.): the moment your forty-seven open browser tabs collapse into one frozen screen, taking your train of thought with them.";
const MIN_CHARS = 1;
const MAX_CHARS = 140;

function checkEntry(text: string): void {
  if (text.trim().length === 0) {
    throw new Error("entry must not be blank");
  }
  if (text.length < MIN_CHARS || text.length > MAX_CHARS) {
    throw new Error(
      `entry must be ${MIN_CHARS} to ${MAX_CHARS} characters, got ${text.length}`,
    );
  }
  if (text.includes("\n") || text.includes("\r")) {
    throw new Error("entry must be a single line");
  }
}

function main(): void {
  checkEntry(ENTRY);
  const outDir = process.env.MAKEFUN_OUTPUT_DIR ?? "/output";
  mkdirSync(outDir, { recursive: true });
  const outFile = join(outDir, "entry.txt");
  writeFileSync(outFile, ENTRY, "utf8");
  if (readFileSync(outFile, "utf8") !== ENTRY) {
    throw new Error("entry.txt did not round-trip");
  }
}

main();
