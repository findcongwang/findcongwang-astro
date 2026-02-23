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

/** Shape for index/list pages: serializable entry with display fields */
export interface IndexEntry {
  slug: string;
  collection: ContentCollectionId;
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

/** Map listable collection entries to IndexEntry for a single collection */
export function toIndexEntries<C extends ContentCollectionId>(
  collectionId: C,
  entries: CollectionEntry<C>[]
): IndexEntry[] {
  return entries.map((entry) => ({
    slug: entry.slug,
    collection: collectionId,
    title: getEntryTitle(entry.data as Record<string, unknown>),
    description: (entry.data as Record<string, unknown>).description as string ?? "",
    tags: ((entry.data as Record<string, unknown>).tags as string[]) ?? [],
    publishDate: getEntryPublishDate(entry.data as Record<string, unknown>),
    id: (entry.data as Record<string, unknown>).id as string | undefined,
  }));
}

/** Map unified entries to IndexEntry[] */
export function unifiedToIndexEntries(entries: UnifiedEntry[]): IndexEntry[] {
  return entries.map((e) => ({
    slug: e.slug,
    collection: e.collection,
    title: getDisplayTitle(e.data),
    description: (e.data as Record<string, unknown>).description as string ?? "",
    tags: ((e.data as Record<string, unknown>).tags as string[]) ?? [],
    publishDate: getEntryPublishDate(e.data as Record<string, unknown>),
    id: (e.data as Record<string, unknown>).id as string | undefined,
  }));
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

/** Display labels for collections (for checkboxes etc.) */
export const COLLECTION_LABELS: Record<ContentCollectionId, string> = {
  posts: "Posts",
  domains: "Domains",
  lexicon: "Lexicon",
  influences: "Influences",
  projects: "Projects",
};

export { CONTENT_COLLECTIONS };
