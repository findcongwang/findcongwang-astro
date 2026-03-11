#!/usr/bin/env node
/**
 * Sanitize = invisible/zero-width strip + NFKC + curly-quote normalization on raw file.
 * No parsing, no frontmatter. Em-dashes and en-dashes left unchanged.
 */

import { readdir, readFile, writeFile } from 'fs/promises';
import { existsSync } from 'fs';
import { join, dirname } from 'path';
import { fileURLToPath } from 'url';

const __filename = fileURLToPath(import.meta.url);
const __dirname = dirname(__filename);
const rootDir = join(__dirname, '..');
const contentDir = join(rootDir, 'src', 'content');

// Zero-width and invisible characters (strip). Use \u{XXXXX} for code points > U+FFFF.
const INVISIBLE_RE =
  /[\u200B-\u200D\u2060\uFEFF\u00AD\u034F\u061C\u115F-\u1160\u17B4-\u17B5\u180E\u3164\uFFA0\uFE00-\uFE0F\u{E0100}-\u{E01EF}]/gu;

// Curly/smart quotes -> straight (do not touch em-dash U+2014 or en-dash U+2013)
function normalizeCurlyQuotes(s) {
  return s
    .replace(/\u201C/g, '"')  // left double
    .replace(/\u201D/g, '"')  // right double
    .replace(/\u2018/g, "'")  // left single
    .replace(/\u2019/g, "'"); // right single
}

async function collectMarkdownFiles(dir) {
  const entries = [];
  const items = await readdir(dir, { withFileTypes: true });
  for (const item of items) {
    const fullPath = join(dir, item.name);
    if (item.isDirectory()) {
      entries.push(...(await collectMarkdownFiles(fullPath)));
    } else if (item.isFile() && item.name.endsWith('.md')) {
      entries.push(fullPath);
    }
  }
  return entries;
}

async function main() {
  const checkOnly = process.argv.includes('--check');
  const contentPaths = existsSync(contentDir) ? await collectMarkdownFiles(contentDir) : [];
  const readmePath = join(rootDir, 'README.md');
  const allPaths = existsSync(readmePath) ? [...contentPaths, readmePath] : contentPaths;

  if (allPaths.length === 0) {
    console.log('No markdown files found.');
    process.exit(0);
  }

  let anyChanged = false;
  for (const filePath of allPaths) {
    const raw = await readFile(filePath, 'utf-8');
    // NFKC -> strip invisible -> normalize curly quotes. Still no parse, no stringify.
    const out = normalizeCurlyQuotes(raw.normalize('NFKC').replace(INVISIBLE_RE, ''));

    if (out !== raw) {
      anyChanged = true;
      if (checkOnly) {
        console.log(`Would change: ${filePath}`);
      } else {
        await writeFile(filePath, out, 'utf-8');
        console.log(`Updated: ${filePath}`);
      }
    }
  }

  if (checkOnly && anyChanged) process.exit(1);
  if (!checkOnly && anyChanged) console.log('Done. Run `git diff` to review changes.');
}

main().catch((err) => {
  console.error(err);
  process.exit(1);
});
