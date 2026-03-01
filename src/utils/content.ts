import { getCollection, type CollectionEntry } from "astro:content";

export type ContentCollectionId = "posts" | "domains" | "lexicon" | "influences" | "projects";

const CONTENT_COLLECTIONS: ContentCollectionId[] = [
  "posts",
  "domains",
  "lexicon",
  "influences",
  "projects",
];

/** Status that should appear on index pages (excludes unlisted and non-published) */
const LISTABLE_STATUS = "published";

function hasListableStatus(
  data: { status?: string }
): data is { status: "published" } {
  return data.status === LISTABLE_STATUS;
}

/**
 * Returns entries from a collection that are listable (status === "published").
 * Unlisted and other statuses are excluded from index/listing pages but still have valid URLs.
 */
export async function getListableEntries<
  C extends ContentCollectionId
>(collectionId: C): Promise<CollectionEntry<C>[]> {
  const all = await getCollection(collectionId);
  return all.filter((entry) => hasListableStatus(entry.data)) as CollectionEntry<C>[];
}

/**
 * All listable entries from every content collection, with a `collection` field for routing.
 */
export interface UnifiedEntry {
  collection: ContentCollectionId;
  slug: string;
  data: CollectionEntry<ContentCollectionId>["data"];
  id: string;
}

function getDisplayTitle(data: UnifiedEntry["data"]): string {
  if ("title" in data && typeof data.title === "string") return data.title;
  return "";
}

function getPublishDate(data: UnifiedEntry["data"]): Date | null {
  if ("publish_date" in data && data.publish_date)
    return new Date(data.publish_date);
  if ("pubDate" in data && data.pubDate) return new Date(data.pubDate as Date);
  if ("created_date" in data && data.created_date)
    return new Date(data.created_date);
  return null;
}

export async function getAllListableEntries(): Promise<UnifiedEntry[]> {
  const results: UnifiedEntry[] = [];
  for (const id of CONTENT_COLLECTIONS) {
    const entries = await getListableEntries(id);
    for (const entry of entries) {
      results.push({
        collection: id,
        slug: entry.slug,
        data: entry.data,
        id: `${id}/${entry.slug}`,
      });
    }
  }
  return results;
}

/** Sort unified entries by publish date (newest first), then by display title */
export function sortByPublishDate(entries: UnifiedEntry[]): UnifiedEntry[] {
  return [...entries].sort((a, b) => {
    const da = getPublishDate(a.data)?.getTime() ?? 0;
    const db = getPublishDate(b.data)?.getTime() ?? 0;
    if (db !== da) return db - da;
    return getDisplayTitle(a.data).localeCompare(getDisplayTitle(b.data));
  });
}

/** Sort unified entries by display title */
export function sortByName(entries: UnifiedEntry[]): UnifiedEntry[] {
  return [...entries].sort((a, b) =>
    getDisplayTitle(a.data).localeCompare(getDisplayTitle(b.data))
  );
}

/** Base path for a collection (used for links) */
export function collectionBasePath(collection: ContentCollectionId): string {
  const map: Record<ContentCollectionId, string> = {
    posts: "/posts",
    domains: "/domains",
    lexicon: "/lexicon",
    influences: "/influences",
    projects: "/projects",
  };
  return map[collection];
}

/** Full URL path for an entry */
export function entryHref(collection: ContentCollectionId, slug: string): string {
  const base = collectionBasePath(collection);
  return `${base}/${slug}`;
}

/** Publish type enum from content schema (specific detail on entry cards). */
export type PublishTypeId = "atom" | "blog" | "essay" | "paper" | "domain" | "lexicon" | "influence" | "book" | "project";

// ─── Single source of truth: collection = large category (Browse/filter); publish type = specific detail (entry cards). ───
// Multiple publish types can belong to the same collection.

/** Large categories for Browse/filter. */
const COLLECTION_CONFIG: Record<ContentCollectionId, { label: string }> = {
  posts: { label: "Blog" },
  domains: { label: "Domain" },
  lexicon: { label: "Lexicon" },
  influences: { label: "Influence" },
  projects: { label: "Projects" },
};

/** Publish types: specific detail shown on content entry cards. Each maps to one collection. */
const PUBLISH_TYPE_CONFIG: Record<
  PublishTypeId,
  { label: string; color: string; collection: ContentCollectionId }
> = {
  atom: { label: "Atom", color: "#7D8491", collection: "posts" },
  blog: { label: "Blog", color: "#7D8491", collection: "posts" },
  essay: { label: "Essay", color: "#7D8491", collection: "posts" },
  paper: { label: "Paper", color: "#7D8491", collection: "posts" },
  domain: { label: "Domain", color: "#6D6875", collection: "domains" },
  lexicon: { label: "Lexicon", color: "#8A9A5B", collection: "lexicon" },
  influence: { label: "Influence", color: "#D4A373", collection: "influences" },
  book: { label: "Books", color: "#4A6FA5", collection: "projects" },
  project: { label: "Projects", color: "#C28B2E", collection: "projects" },
};

/** Shape for index/list pages: serializable entry with display fields */
export interface IndexEntry {
  slug: string;
  collection: ContentCollectionId;
  /** From frontmatter publish_type; used for card/layout label and color. */
  publishType: PublishTypeId | string;
  title: string;
  description: string;
  tags: string[];
  publishDate: string | null;
  id?: string;
}

function getEntryTitle(data: Record<string, unknown>): string {
  if (typeof data.title === "string") return data.title;
  return "";
}

function getEntryPublishDate(data: Record<string, unknown>): string | null {
  if (data.publish_date) return new Date(data.publish_date as Date).toISOString();
  if (data.pubDate) return new Date(data.pubDate as Date).toISOString();
  if (data.created_date) return new Date(data.created_date as Date).toISOString();
  return null;
}

/** Publish type → collection (for validation; entry routing uses file location). */
export const PUBLISH_TYPE_TO_COLLECTION: Record<PublishTypeId, ContentCollectionId> = Object.fromEntries(
  (Object.entries(PUBLISH_TYPE_CONFIG) as [PublishTypeId, { collection: ContentCollectionId }][]).map(
    ([id, { collection }]) => [id, collection]
  )
) as Record<PublishTypeId, ContentCollectionId>;

/** Publish types that belong to each collection (for filters / defaults). */
export const COLLECTION_PUBLISH_TYPES: Record<ContentCollectionId, PublishTypeId[]> = (() => {
  const map: Record<string, PublishTypeId[]> = {};
  for (const id of CONTENT_COLLECTIONS) map[id] = [];
  for (const [pt, { collection }] of Object.entries(PUBLISH_TYPE_CONFIG) as [PublishTypeId, { collection: ContentCollectionId }][]) {
    map[collection].push(pt);
  }
  return map as Record<ContentCollectionId, PublishTypeId[]>;
})();

/** Fallback publish_type when entry has none: first publish type in that collection. */
export const COLLECTION_TO_PUBLISH_TYPE: Record<ContentCollectionId, PublishTypeId> = Object.fromEntries(
  CONTENT_COLLECTIONS.map((id) => [id, COLLECTION_PUBLISH_TYPES[id][0]])
) as Record<ContentCollectionId, PublishTypeId>;

function getEntryPublishType(data: Record<string, unknown>, collectionId: ContentCollectionId): string {
  const pt = data.publish_type;
  if (typeof pt === "string" && pt.length > 0) return pt;
  return COLLECTION_TO_PUBLISH_TYPE[collectionId];
}

/** Map listable collection entries to IndexEntry for a single collection */
export function toIndexEntries<C extends ContentCollectionId>(
  collectionId: C,
  entries: CollectionEntry<C>[]
): IndexEntry[] {
  return entries.map((entry) => {
    const data = entry.data as Record<string, unknown>;
    return {
      slug: entry.slug,
      collection: collectionId,
      publishType: getEntryPublishType(data, collectionId),
      title: getEntryTitle(data),
      description: (data.description as string) ?? "",
      tags: (data.tags as string[]) ?? [],
      publishDate: getEntryPublishDate(data),
      id: data.id as string | undefined,
    };
  });
}

/** Map unified entries to IndexEntry[] */
export function unifiedToIndexEntries(entries: UnifiedEntry[]): IndexEntry[] {
  return entries.map((e) => {
    const data = e.data as Record<string, unknown>;
    return {
      slug: e.slug,
      collection: e.collection,
      publishType: getEntryPublishType(data, e.collection),
      title: getDisplayTitle(e.data),
      description: (data.description as string) ?? "",
      tags: (data.tags as string[]) ?? [],
      publishDate: getEntryPublishDate(data),
      id: data.id as string | undefined,
    };
  });
}

/** Tag with count for index pages */
export interface TagWithCount {
  tag: string;
  count: number;
}

/** Get unique tags and counts for a single collection */
export async function getTagsForCollection(
  collectionId: ContentCollectionId
): Promise<TagWithCount[]> {
  const entries = await getListableEntries(collectionId);
  const counts: Record<string, number> = {};
  for (const e of entries) {
    const tags = (e.data as Record<string, unknown>).tags as string[] | undefined ?? [];
    for (const t of tags) {
      counts[t] = (counts[t] ?? 0) + 1;
    }
  }
  return Object.entries(counts)
    .map(([tag, count]) => ({ tag, count }))
    .sort((a, b) => a.tag.localeCompare(b.tag));
}

/** Get unique tags and counts across all collections */
export async function getTagsForAllCollections(): Promise<TagWithCount[]> {
  const counts: Record<string, number> = {};
  for (const id of CONTENT_COLLECTIONS) {
    const entries = await getListableEntries(id);
    for (const e of entries) {
      const tags = (e.data as Record<string, unknown>).tags as string[] | undefined ?? [];
      for (const t of tags) {
        counts[t] = (counts[t] ?? 0) + 1;
      }
    }
  }
  return Object.entries(counts)
    .map(([tag, count]) => ({ tag, count }))
    .sort((a, b) => a.tag.localeCompare(b.tag));
}

/** Labels for entry cards and content pages (specific detail). Derived from PUBLISH_TYPE_CONFIG. */
export const PUBLISH_TYPE_LABELS: Record<string, string> = Object.fromEntries(
  (Object.entries(PUBLISH_TYPE_CONFIG) as [PublishTypeId, { label: string }][]).map(([id, { label }]) => [id, label])
);

/** Colors for entry cards and rough notation. Derived from PUBLISH_TYPE_CONFIG. */
export const PUBLISH_TYPE_COLORS: Record<string, string> = Object.fromEntries(
  (Object.entries(PUBLISH_TYPE_CONFIG) as [PublishTypeId, { color: string }][]).map(([id, { color }]) => [id, color])
);

/** Collection labels for Browse/filter (large categories). Derived from COLLECTION_CONFIG. */
export const COLLECTION_LABELS = Object.fromEntries(
  (Object.entries(COLLECTION_CONFIG) as [ContentCollectionId, { label: string }][]).map(([id, { label }]) => [id, label])
) as Record<ContentCollectionId, string>;

/** Collection → hex for legacy use; prefer PUBLISH_TYPE_COLORS by publishType on entries. */
export const COLLECTION_COLORS = Object.fromEntries(
  CONTENT_COLLECTIONS.map((id) => [id, PUBLISH_TYPE_COLORS[COLLECTION_TO_PUBLISH_TYPE[id]]])
) as Record<ContentCollectionId, string>;

export { CONTENT_COLLECTIONS };
