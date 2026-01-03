#!/usr/bin/env node
/**
 * PDF Generation Script for Content Collections
 * 
 * Generates PDF files from Astro content collections (Lexicon, Influences, Domains, Books)
 * for use with AI agents and Gemini gems.
 */

import { readdir, readFile, writeFile, mkdir } from 'fs/promises';
import { existsSync } from 'fs';
import { join, dirname, basename } from 'path';
import { fileURLToPath } from 'url';
import matter from 'gray-matter';
import { marked } from 'marked';

const __filename = fileURLToPath(import.meta.url);
const __dirname = dirname(__filename);
const rootDir = join(__dirname, '..');
const contentDir = join(rootDir, 'src', 'content');
const outputDir = join(rootDir, 'pdfs');

// Collections to generate PDFs for
const collectionsToExport = ['lexicon', 'influences', 'domains', 'books'];

// Configure marked
marked.setOptions({
  gfm: true,
  breaks: true,
});

/**
 * Format entry metadata as HTML
 */
function formatMetadata(frontmatter, collectionName) {
  const metadata = [];
  
  if (collectionName === 'influences') {
    metadata.push(`<h2>${frontmatter.name || 'Untitled'}</h2>`);
    if (frontmatter.description) {
      metadata.push(`<p><strong>Description:</strong> ${frontmatter.description}</p>`);
    }
    if (frontmatter.reflections && frontmatter.reflections.length > 0) {
      metadata.push(`<h3>Reflections:</h3><ul>`);
      frontmatter.reflections.forEach(reflection => {
        metadata.push(`<li>${reflection}</li>`);
      });
      metadata.push(`</ul>`);
    }
    if (frontmatter.domains && frontmatter.domains.length > 0) {
      metadata.push(`<p><strong>Domains:</strong> ${frontmatter.domains.join(', ')}</p>`);
    }
    if (frontmatter.tags && frontmatter.tags.length > 0) {
      metadata.push(`<p><strong>Tags:</strong> ${frontmatter.tags.join(', ')}</p>`);
    }
  } else {
    metadata.push(`<h2>${frontmatter.title || 'Untitled'}</h2>`);
    if (frontmatter.description) {
      metadata.push(`<p><strong>Description:</strong> ${frontmatter.description}</p>`);
    }
    if (frontmatter.pubDate) {
      const date = frontmatter.pubDate instanceof Date 
        ? frontmatter.pubDate.toLocaleDateString()
        : new Date(frontmatter.pubDate).toLocaleDateString();
      metadata.push(`<p><strong>Published:</strong> ${date}</p>`);
    }
    if (frontmatter.domains && frontmatter.domains.length > 0) {
      metadata.push(`<p><strong>Domains:</strong> ${frontmatter.domains.join(', ')}</p>`);
    }
    if (frontmatter.tags && frontmatter.tags.length > 0) {
      metadata.push(`<p><strong>Tags:</strong> ${frontmatter.tags.join(', ')}</p>`);
    }
    if (collectionName === 'domains' && frontmatter.parentDomains && frontmatter.parentDomains.length > 0) {
      metadata.push(`<p><strong>Parent Domains:</strong> ${frontmatter.parentDomains.join(', ')}</p>`);
    }
  }
  
  return metadata.join('\n');
}

/**
 * Recursively read markdown files from a directory
 */
async function readMarkdownFiles(dir, basePath = '') {
  const entries = [];
  const items = await readdir(dir, { withFileTypes: true });
  
  for (const item of items) {
    const fullPath = join(dir, item.name);
    
    if (item.isDirectory()) {
      // Recursively read subdirectories
      const subEntries = await readMarkdownFiles(fullPath, join(basePath, item.name));
      entries.push(...subEntries);
    } else if (item.isFile() && item.name.endsWith('.md')) {
      try {
        const content = await readFile(fullPath, 'utf-8');
        const { data: frontmatter, content: body } = matter(content);
        
        const slug = basePath 
          ? join(basePath, basename(item.name, '.md'))
          : basename(item.name, '.md');
        
        entries.push({
          slug,
          frontmatter,
          body
        });
      } catch (error) {
        console.error(`  ⚠ Error reading ${fullPath}: ${error.message}`);
      }
    }
  }
  
  return entries;
}

/**
 * Read and parse all markdown files from a collection directory
 */
async function readCollection(collectionName) {
  const collectionPath = join(contentDir, collectionName);
  
  if (!existsSync(collectionPath)) {
    console.log(`  ⚠ Directory not found: ${collectionPath}`);
    return [];
  }
  
  return await readMarkdownFiles(collectionPath);
}

/**
 * Generate HTML document for a collection
 */
async function generateCollectionHTML(collectionName, entries) {
  const title = collectionName.charAt(0).toUpperCase() + collectionName.slice(1);
  
  let html = `<!DOCTYPE html>
<html lang="en">
<head>
  <meta charset="UTF-8">
  <meta name="viewport" content="width=device-width, initial-scale=1.0">
  <title>${title} Collection</title>
  <style>
    body {
      font-family: -apple-system, BlinkMacSystemFont, 'Segoe UI', Roboto, 'Helvetica Neue', Arial, sans-serif;
      line-height: 1.6;
      max-width: 800px;
      margin: 0 auto;
      padding: 20px;
      color: #333;
    }
    h1 {
      border-bottom: 3px solid #333;
      padding-bottom: 10px;
      margin-bottom: 30px;
    }
    h2 {
      color: #2c3e50;
      margin-top: 40px;
      margin-bottom: 15px;
      border-top: 2px solid #eee;
      padding-top: 20px;
    }
    h3 {
      color: #34495e;
      margin-top: 25px;
      margin-bottom: 10px;
    }
    .entry {
      margin-bottom: 50px;
      page-break-inside: avoid;
    }
    .metadata {
      background: #f8f9fa;
      padding: 15px;
      border-radius: 5px;
      margin-bottom: 20px;
    }
    .content {
      margin-top: 20px;
    }
    code {
      background: #f4f4f4;
      padding: 2px 6px;
      border-radius: 3px;
      font-family: 'Courier New', monospace;
    }
    pre {
      background: #f4f4f4;
      padding: 15px;
      border-radius: 5px;
      overflow-x: auto;
    }
    ul, ol {
      margin-left: 20px;
    }
    a {
      color: #0066cc;
      text-decoration: none;
    }
    a:hover {
      text-decoration: underline;
    }
    @media print {
      .entry {
        page-break-inside: avoid;
      }
    }
  </style>
</head>
<body>
  <h1>${title} Collection</h1>
  <p><em>Generated on ${new Date().toLocaleDateString()} at ${new Date().toLocaleTimeString()}</em></p>
  <p><em>Total entries: ${entries.length}</em></p>
`;

  // Sort entries
  const sortedEntries = [...entries].sort((a, b) => {
    const nameA = (a.frontmatter.title || a.frontmatter.name || '').toLowerCase();
    const nameB = (b.frontmatter.title || b.frontmatter.name || '').toLowerCase();
    return nameA.localeCompare(nameB);
  });

  for (const entry of sortedEntries) {
    html += `  <div class="entry">\n`;
    html += `    <div class="metadata">\n`;
    html += formatMetadata(entry.frontmatter, collectionName);
    html += `    </div>\n`;
    html += `    <div class="content">\n`;
    
    // Convert markdown body to HTML
    const bodyHTML = await marked.parse(entry.body);
    html += bodyHTML;
    
    html += `    </div>\n`;
    html += `  </div>\n`;
  }

  html += `</body>\n</html>`;
  
  return html;
}

/**
 * Generate PDF from HTML using Puppeteer
 */
async function generatePDF(html, outputPath) {
  try {
    // Dynamic import of puppeteer
    const puppeteer = await import('puppeteer');
    const browser = await puppeteer.default.launch({
      headless: true,
      args: ['--no-sandbox', '--disable-setuid-sandbox']
    });
    
    const page = await browser.newPage();
    await page.setContent(html, { waitUntil: 'networkidle0' });
    
    await page.pdf({
      path: outputPath,
      format: 'A4',
      margin: {
        top: '20mm',
        right: '15mm',
        bottom: '20mm',
        left: '15mm'
      },
      printBackground: true
    });
    
    await browser.close();
    console.log(`  ✓ Generated PDF: ${outputPath}`);
  } catch (error) {
    console.error(`  ✗ Error generating PDF: ${error.message}`);
    throw error;
  }
}

/**
 * Main function
 */
async function main() {
  console.log('📚 Starting PDF generation for content collections...\n');
  
  // Create output directory
  if (!existsSync(outputDir)) {
    await mkdir(outputDir, { recursive: true });
    console.log(`Created output directory: ${outputDir}\n`);
  }
  
  for (const collectionName of collectionsToExport) {
    try {
      console.log(`Processing ${collectionName} collection...`);
      
      // Read collection entries
      const entries = await readCollection(collectionName);
      console.log(`  Found ${entries.length} entries`);
      
      if (entries.length === 0) {
        console.log(`  ⚠ Skipping ${collectionName} - no entries found\n`);
        continue;
      }
      
      // Generate HTML
      const html = await generateCollectionHTML(collectionName, entries);
      
      // Save HTML (for debugging)
      const htmlPath = join(outputDir, `${collectionName}.html`);
      await writeFile(htmlPath, html, 'utf-8');
      console.log(`  ✓ Generated HTML: ${htmlPath}`);
      
      // Generate PDF
      const pdfPath = join(outputDir, `${collectionName}.pdf`);
      await generatePDF(html, pdfPath);
      
      console.log(`  ✓ Completed ${collectionName}\n`);
    } catch (error) {
      console.error(`  ✗ Error processing ${collectionName}:`, error.message);
      if (error.stack) {
        console.error(`  ${error.stack}\n`);
      }
    }
  }
  
  console.log('✅ PDF generation complete!');
  console.log(`📁 Output directory: ${outputDir}`);
}

// Run the script
main().catch(console.error);
