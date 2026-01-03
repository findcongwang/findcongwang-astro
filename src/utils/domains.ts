import { getCollection, type CollectionEntry } from "astro:content";

/**
 * Recursively builds the full lineage for a domain
 * Returns an array of domain titles in order from root to current
 */
function buildLineageArray(
  domainSlug: string,
  allDomains: CollectionEntry<"domains">[],
  visited: Set<string> = new Set()
): string[] {
  // Prevent circular references
  if (visited.has(domainSlug)) {
    return [];
  }
  visited.add(domainSlug);

  const domain = allDomains.find((d) => d.slug === domainSlug);
  if (!domain) return [];

  // Convert parent IDs to slugs
  const parentSlugs = (domain.data.parents || []).map(parentId => {
    const parentDomain = allDomains.find(d => d.data.id === parentId);
    if (parentDomain) {
      return parentDomain.slug;
    }
    // Fallback: try to find by matching ID case-insensitively
    const found = allDomains.find(d => 
      d.data.id?.toLowerCase() === parentId.toLowerCase()
    );
    return found ? found.slug : parentId.toLowerCase().replace(/\s+/g, '-');
  });
  
  const parentDomains = parentSlugs;
  
  if (parentDomains.length === 0) {
    return [domain.data.title];
  }

  // Get all parent lineages and flatten them
  const parentLineages = parentDomains
    .map((parentSlug) => buildLineageArray(parentSlug, allDomains, visited))
    .filter((lineage) => lineage.length > 0);

  // If multiple parents, group them at the same level
  if (parentLineages.length > 1) {
    // Get the deepest level from all parents
    const maxDepth = Math.max(...parentLineages.map((l) => l.length));
    
    // Build the lineage: combine parents at each level with " x ", then " > " for next level
    const combined: string[] = [];
    
    // For each level, combine all parents at that level
    for (let level = 0; level < maxDepth; level++) {
      const levelItems = parentLineages
        .map((lineage) => {
          const index = lineage.length - maxDepth + level;
          return index >= 0 ? lineage[index] : null;
        })
        .filter(Boolean) as string[];
      
      if (levelItems.length > 0) {
        combined.push(levelItems.join(" x "));
      }
    }
    
    return [...combined, domain.data.title];
  } else if (parentLineages.length === 1) {
    // Single parent: just append current domain with " > "
    return [...parentLineages[0], domain.data.title];
  }

  return [domain.data.title];
}

/**
 * Builds the full lineage string for a domain
 * Format: "level1domain1 x level1domain2 > level2domain1"
 */
export async function getDomainLineage(
  domainSlug: string,
  allDomains: CollectionEntry<"domains">[]
): Promise<string> {
  const lineage = buildLineageArray(domainSlug, allDomains);
  
  if (lineage.length === 0) {
    const domain = allDomains.find((d) => d.slug === domainSlug);
    return domain ? domain.data.title : domainSlug;
  }

  // Join with " > " between levels
  return lineage.join(" > ");
}

/**
 * Gets lineage strings for multiple domains
 */
export async function getDomainLineages(
  domainSlugs: string[],
  allDomains: CollectionEntry<"domains">[]
): Promise<string[]> {
  return Promise.all(
    domainSlugs.map((slug) => getDomainLineage(slug, allDomains))
  );
}

/**
 * Calculate the depth of a domain (0 = root, 1 = has parent at depth 0, etc.)
 */
function calculateDepth(
  domainSlug: string,
  allDomains: CollectionEntry<"domains">[],
  visited: Set<string> = new Set()
): number {
  // Prevent circular references
  if (visited.has(domainSlug)) {
    return 0;
  }
  visited.add(domainSlug);

  const domain = allDomains.find((d) => d.slug === domainSlug);
  if (!domain) return 0;

  // Convert parent IDs to slugs
  const parentSlugs = (domain.data.parents || []).map(parentId => {
    const parentDomain = allDomains.find(d => d.data.id === parentId);
    if (parentDomain) {
      return parentDomain.slug;
    }
    // Fallback: try to find by matching ID case-insensitively
    const found = allDomains.find(d => 
      d.data.id?.toLowerCase() === parentId.toLowerCase()
    );
    return found ? found.slug : parentId.toLowerCase().replace(/\s+/g, '-');
  });
  
  if (parentSlugs.length === 0) {
    return 0; // Root domain
  }

  // Get max depth from all parents, then add 1
  const parentDepths = parentSlugs.map((parentSlug) => 
    calculateDepth(parentSlug, allDomains, new Set(visited))
  );
  
  return Math.max(...parentDepths) + 1;
}

/**
 * Get the depth of a domain
 */
export function getDomainDepth(
  domainSlug: string,
  allDomains: CollectionEntry<"domains">[]
): number {
  return calculateDepth(domainSlug, allDomains);
}

/**
 * Get full ancestry path for a domain
 * Format: "RootDomain1 > Lv1Domain1 x Lv1Domain2 > Lv2Domain > Domain"
 */
export async function getDomainAncestryPath(
  domainSlug: string,
  allDomains: CollectionEntry<"domains">[]
): Promise<string> {
  const lineage = buildLineageArray(domainSlug, allDomains);
  
  if (lineage.length === 0) {
    const domain = allDomains.find((d) => d.slug === domainSlug);
    return domain ? domain.data.title : domainSlug;
  }

  // Join with " > " between levels
  return lineage.join(" > ");
}

