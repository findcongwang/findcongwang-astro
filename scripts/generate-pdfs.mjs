#!/usr/bin/env node
/**
 * PDF Generation Script for Content Collections
 * 
 * Generates PDF files from Astro content collections (Lexicon, Influences, Domains, Books)
 * for use with AI agents and Gemini gems.
 */

import { readdir, readFile, writeFile, mkdir } from 'fs/promises';
import { existsSync } from 'fs';
import { join, dirname, basename, resolve } from 'path';
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
 * Convert image to base64 data URL
 */
async function imageToBase64(imagePath) {
  try {
    const imageBuffer = await readFile(imagePath);
    const ext = imagePath.split('.').pop().toLowerCase();
    const mimeTypes = {
      'jpg': 'image/jpeg',
      'jpeg': 'image/jpeg',
      'png': 'image/png',
      'gif': 'image/gif',
      'webp': 'image/webp',
      'svg': 'image/svg+xml'
    };
    const mimeType = mimeTypes[ext] || 'image/png';
    const base64 = imageBuffer.toString('base64');
    return `data:${mimeType};base64,${base64}`;
  } catch (error) {
    console.error(`  ⚠ Error reading image ${imagePath}: ${error.message}`);
    return null;
  }
}

/**
 * Process image paths in HTML and convert to base64
 */
async function processImages(html, entryPath) {
  // Match img tags with src attributes
  const imgRegex = /<img[^>]+src=["']([^"']+)["'][^>]*>/gi;
  const matches = [...html.matchAll(imgRegex)];
  
  for (const match of matches) {
    const fullMatch = match[0];
    const srcPath = match[1];
    
    // Skip if already a data URL
    if (srcPath.startsWith('data:')) continue;
    
    // Resolve image path
    let imagePath;
    if (srcPath.startsWith('/')) {
      // Absolute path from root
      imagePath = resolve(rootDir, srcPath.substring(1));
    } else if (srcPath.startsWith('./') || srcPath.startsWith('../')) {
      // Relative path
      imagePath = resolve(dirname(entryPath), srcPath);
    } else {
      // Try relative to src/images
      imagePath = resolve(rootDir, 'src', 'images', srcPath);
    }
    
    // Also try with /src/images prefix removed if path starts with it
    if (!existsSync(imagePath) && srcPath.includes('/src/images/')) {
      const cleanPath = srcPath.replace(/^\/src\/images\//, '');
      imagePath = resolve(rootDir, 'src', 'images', cleanPath);
    }
    
    if (existsSync(imagePath)) {
      const base64 = await imageToBase64(imagePath);
      if (base64) {
        html = html.replace(fullMatch, fullMatch.replace(srcPath, base64));
      }
    } else {
      console.error(`  ⚠ Image not found: ${imagePath} (from ${srcPath})`);
    }
  }
  
  // Also handle markdown image syntax ![alt](src)
  const mdImgRegex = /!\[([^\]]*)\]\(([^)]+)\)/gi;
  const mdMatches = [...html.matchAll(mdImgRegex)];
  
  for (const match of mdMatches) {
    const fullMatch = match[0];
    const alt = match[1];
    const srcPath = match[2];
    
    // Skip if already a data URL
    if (srcPath.startsWith('data:')) continue;
    
    // Resolve image path
    let imagePath;
    if (srcPath.startsWith('/')) {
      imagePath = resolve(rootDir, srcPath.substring(1));
    } else if (srcPath.startsWith('./') || srcPath.startsWith('../')) {
      imagePath = resolve(dirname(entryPath), srcPath);
    } else {
      imagePath = resolve(rootDir, 'src', 'images', srcPath);
    }
    
    if (!existsSync(imagePath) && srcPath.includes('/src/images/')) {
      const cleanPath = srcPath.replace(/^\/src\/images\//, '');
      imagePath = resolve(rootDir, 'src', 'images', cleanPath);
    }
    
    if (existsSync(imagePath)) {
      const base64 = await imageToBase64(imagePath);
      if (base64) {
        html = html.replace(fullMatch, `<img src="${base64}" alt="${alt}" style="max-width: 100%; height: auto;" />`);
      }
    } else {
      console.error(`  ⚠ Image not found: ${imagePath} (from ${srcPath})`);
    }
  }
  
  return html;
}

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
          body,
          filePath: fullPath
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
      font-size: 10px;
      line-height: 1.4;
      max-width: 800px;
      margin: 0 auto;
      padding: 10px;
      color: #333;
    }
    h1 {
      font-size: 16px;
      border-bottom: 2px solid #333;
      padding-bottom: 6px;
      margin-bottom: 20px;
    }
    h2 {
      font-size: 14px;
      color: #2c3e50;
      margin-top: 30px;
      margin-bottom: 10px;
      border-top: 1px solid #eee;
      padding-top: 15px;
    }
    h3 {
      font-size: 12px;
      color: #34495e;
      margin-top: 20px;
      margin-bottom: 8px;
    }
    h4 {
      font-size: 11px;
      margin-top: 15px;
      margin-bottom: 6px;
    }
    p {
      font-size: 10px;
      margin-bottom: 8px;
    }
    .entry {
      margin-bottom: 30px;
      page-break-inside: avoid;
    }
    .metadata {
      background: #f8f9fa;
      padding: 8px;
      border-radius: 3px;
      margin-bottom: 12px;
      font-size: 9px;
    }
    .metadata p {
      margin-bottom: 4px;
    }
    .content {
      margin-top: 12px;
      font-size: 10px;
    }
    code {
      font-size: 9px;
      background: #f4f4f4;
      padding: 1px 4px;
      border-radius: 2px;
      font-family: 'Courier New', monospace;
    }
    pre {
      font-size: 9px;
      background: #f4f4f4;
      padding: 8px;
      border-radius: 3px;
      overflow-x: auto;
    }
    ul, ol {
      margin-left: 15px;
      font-size: 10px;
    }
    li {
      margin-bottom: 4px;
    }
    img {
      max-width: 100%;
      height: auto;
      margin: 8px 0;
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
    let bodyHTML = await marked.parse(entry.body);
    
    // Process images in the content
    // Use the stored file path or construct it
    const entryFilePath = entry.filePath || join(contentDir, collectionName, `${entry.slug}.md`);
    bodyHTML = await processImages(bodyHTML, entryFilePath);
    
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
        top: '8mm',
        right: '8mm',
        bottom: '8mm',
        left: '8mm'
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
