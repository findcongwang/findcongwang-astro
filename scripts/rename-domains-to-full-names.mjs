#!/usr/bin/env node
/**
 * Rename domain files from slug-based names to full names for SEO
 */

import { readFile, readdir, rename } from 'fs/promises';
import { join, dirname } from 'path';
import { fileURLToPath } from 'url';
import yaml from 'js-yaml';

const __filename = fileURLToPath(import.meta.url);
const __dirname = dirname(__filename);
const rootDir = join(__dirname, '..');
const yamlPath = join(rootDir, 'src', 'data', 'domains.yaml');
const domainsDir = join(rootDir, 'src', 'content', 'domains');

/**
 * Convert PascalCase or ID to kebab-case slug
 */
function idToSlug(id) {
  return id
    .replace(/([a-z])([A-Z])/g, '$1-$2') // Insert dash between lowercase and uppercase
    .toLowerCase();
}

/**
 * Convert domain name to SEO-friendly filename
 * Keeps spaces, removes special symbols
 */
function nameToFilename(name) {
  return name
    .replace(/[^\w\s\-',&]/g, ' ') // Replace special symbols with space
    .replace(/\s+/g, ' ') // Collapse multiple spaces into one
    .trim(); // Remove leading/trailing whitespace
}

async function main() {
  console.log('🔄 Renaming domain files to use full names...\n');
  
  // Read YAML file to get ID to name mapping
  const yamlContent = await readFile(yamlPath, 'utf-8');
  const domains = yaml.load(yamlContent);
  
  if (!Array.isArray(domains)) {
    throw new Error('domains.yaml should contain an array of domains');
  }
  
  // Create mapping from old slug to new filename
  const idToName = new Map();
  const idToOldSlug = new Map();
  const oldSlugToNewFilename = new Map();
  
  for (const domain of domains) {
    if (!domain.id || !domain.name) continue;
    
    const oldSlug = idToSlug(domain.id);
    const newFilename = nameToFilename(domain.name);
    
    idToName.set(domain.id, domain.name);
    idToOldSlug.set(domain.id, oldSlug);
    oldSlugToNewFilename.set(oldSlug, newFilename);
  }
  
  // Get all existing domain files
  const existingFiles = await readdir(domainsDir);
  const mdFiles = existingFiles.filter(f => f.endsWith('.md'));
  
  console.log(`Found ${mdFiles.length} domain files to process\n`);
  
  let renamedCount = 0;
  let skippedCount = 0;
  let errorCount = 0;
  
  for (const oldFile of mdFiles) {
    const oldSlug = oldFile.replace('.md', '');
    const newFilename = oldSlugToNewFilename.get(oldSlug);
    
    if (!newFilename) {
      // Try to find by reading the file and checking the ID
      try {
        const filePath = join(domainsDir, oldFile);
        const content = await readFile(filePath, 'utf-8');
        const frontmatterMatch = content.match(/^---\n([\s\S]*?)\n---/);
        
        if (frontmatterMatch) {
          const frontmatter = frontmatterMatch[1];
          const idMatch = frontmatter.match(/^id:\s*["']?([^"'\n]+)["']?/m);
          
          if (idMatch) {
            const id = idMatch[1].trim();
            const name = idToName.get(id);
            
            if (name) {
              const calculatedNewFilename = nameToFilename(name);
              const newFile = `${calculatedNewFilename}.md`;
              
              if (oldFile !== newFile) {
                const oldPath = join(domainsDir, oldFile);
                const newPath = join(domainsDir, newFile);
                
                // Check if target file already exists
                try {
                  await readFile(newPath, 'utf-8');
                  console.log(`  ⊘ Skipped: ${oldFile} → ${newFile} (target already exists)`);
                  skippedCount++;
                } catch {
                  await rename(oldPath, newPath);
                  console.log(`  ✓ Renamed: ${oldFile} → ${newFile}`);
                  renamedCount++;
                }
              } else {
                console.log(`  ⊘ Skipped: ${oldFile} (already has correct name)`);
                skippedCount++;
              }
              continue;
            }
          }
        }
      } catch (error) {
        console.error(`  ✗ Error processing ${oldFile}: ${error.message}`);
        errorCount++;
        continue;
      }
      
      console.log(`  ⊘ Skipped: ${oldFile} (no matching domain in YAML)`);
      skippedCount++;
      continue;
    }
    
    const newFile = `${newFilename}.md`;
    
    if (oldFile === newFile) {
      console.log(`  ⊘ Skipped: ${oldFile} (already has correct name)`);
      skippedCount++;
      continue;
    }
    
    const oldPath = join(domainsDir, oldFile);
    const newPath = join(domainsDir, newFile);
    
    // Check if target file already exists
    try {
      await readFile(newPath, 'utf-8');
      console.log(`  ⊘ Skipped: ${oldFile} → ${newFile} (target already exists)`);
      skippedCount++;
    } catch {
      await rename(oldPath, newPath);
      console.log(`  ✓ Renamed: ${oldFile} → ${newFile}`);
      renamedCount++;
    }
  }
  
  console.log(`\n✅ Summary:`);
  console.log(`   Renamed: ${renamedCount} files`);
  console.log(`   Skipped: ${skippedCount} files`);
  if (errorCount > 0) {
    console.log(`   Errors: ${errorCount} files`);
  }
}

main().catch(console.error);

