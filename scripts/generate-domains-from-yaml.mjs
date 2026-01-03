#!/usr/bin/env node
/**
 * Generate domain markdown files from domains.yaml
 */

import { readFile, writeFile, readdir, access } from 'fs/promises';
import { constants } from 'fs';
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
 * Generate markdown frontmatter for a domain
 */
function generateDomainFrontmatter(domain, allDomains) {
  const slug = idToSlug(domain.id);
  const pubDate = new Date().toISOString().split('T')[0];
  
  const frontmatter = {
    pubDate,
    title: domain.name,
    description: 'Page under construction.',
    link: '#',
    id: domain.id,
    parents: domain.parents || [],
    tags: domain.tags || [],
    image: {
      url: '/src/images/projects/caf.png',
      alt: domain.name
    }
  };
  
  if (domain.code) {
    frontmatter.code = domain.code;
  }
  
  if (domain.alias && domain.alias.length > 0) {
    frontmatter.alias = domain.alias;
  }
  
  return frontmatter;
}

/**
 * Generate markdown content
 */
function generateDomainContent() {
  return `## Introduction

Page under construction.
`;
}

/**
 * Format frontmatter as YAML string
 */
function formatFrontmatter(obj) {
  const lines = ['---'];
  
  for (const [key, value] of Object.entries(obj)) {
    if (value === undefined || value === null) continue;
    
    if (key === 'image') {
      lines.push('image:');
      lines.push(`  url: "${value.url}"`);
      lines.push(`  alt: "${value.alt}"`);
    } else if (key === 'pubDate') {
      lines.push(`${key}: ${value}`);
    } else if (Array.isArray(value)) {
      if (value.length === 0) {
        lines.push(`${key}: []`);
      } else {
        lines.push(`${key}:`);
        value.forEach(item => {
          if (typeof item === 'string') {
            lines.push(`  - "${item}"`);
          } else {
            lines.push(`  - ${item}`);
          }
        });
      }
    } else if (typeof value === 'string') {
      // Escape quotes in strings
      const escaped = value.replace(/"/g, '\\"');
      lines.push(`${key}: "${escaped}"`);
    } else {
      lines.push(`${key}: ${value}`);
    }
  }
  
  lines.push('---');
  return lines.join('\n');
}

async function main() {
  console.log('🔄 Generating domain files from domains.yaml...\n');
  
  // Read YAML file
  const yamlContent = await readFile(yamlPath, 'utf-8');
  const domains = yaml.load(yamlContent);
  
  if (!Array.isArray(domains)) {
    throw new Error('domains.yaml should contain an array of domains');
  }
  
  console.log(`Found ${domains.length} domains in YAML\n`);
  
  // Get existing domain files
  let existingFiles = [];
  try {
    existingFiles = await readdir(domainsDir);
  } catch (error) {
    // Directory might not exist, that's okay
  }
  const existingMdFiles = new Set(existingFiles.filter(f => f.endsWith('.md')));
  
  // Create stub pages for missing domains only
  console.log('📝 Creating stub pages for missing domains...\n');
  
  let createdCount = 0;
  let skippedCount = 0;
  
  for (const domain of domains) {
    if (!domain.id || !domain.name) {
      console.error(`⚠ Skipping invalid domain: ${JSON.stringify(domain)}`);
      continue;
    }
    
    const slug = idToSlug(domain.id);
    const filename = `${slug}.md`;
    const filePath = join(domainsDir, filename);
    
    // Check if file already exists
    let fileExists = false;
    try {
      await access(filePath, constants.F_OK);
      fileExists = true;
    } catch {
      fileExists = false;
    }
    
    if (fileExists) {
      console.log(`  ⊘ Skipped: ${filename} (${domain.name}) - already exists`);
      skippedCount++;
      continue;
    }
    
    // Create stub page for missing domain
    const frontmatter = generateDomainFrontmatter(domain, domains);
    const content = generateDomainContent();
    
    const markdown = formatFrontmatter(frontmatter) + '\n\n' + content;
    
    await writeFile(filePath, markdown, 'utf-8');
    console.log(`  ✓ Created: ${filename} (${domain.name})`);
    createdCount++;
  }
  
  console.log(`\n✅ Summary:`);
  console.log(`   Created: ${createdCount} stub pages`);
  console.log(`   Skipped: ${skippedCount} existing files`);
}

main().catch(console.error);

