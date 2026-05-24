import {
  getTagsForCollection,
  getTagsForAllCollections,
  getListableEntries,
  type ContentCollectionId,
  type TagWithCount,
} from "@/utils/content";

export type TagCollectionScope = ContentCollectionId | "all";

interface TagIndexConfig {
  basePath: string;
  title: string;
  description: string;
}

const CONFIG: Record<TagCollectionScope, TagIndexConfig> = {
  posts: {
    basePath: "/posts",
    title: "Tags (Posts)",
    description: "Filter posts by tag.",
  },
  domains: {
    basePath: "/domains",
    title: "Tags (Domains)",
    description: "Filter domain notes by tag.",
  },
  lexicon: {
    basePath: "/lexicon",
    title: "Tags (Lexicon)",
    description: "Filter lexicon entries by tag.",
  },
  influences: {
    basePath: "/influences",
    title: "Tags (Influences)",
    description: "Filter influences by tag.",
  },
  projects: {
    basePath: "/projects",
    title: "Tags (Projects)",
    description: "Filter projects by tag.",
  },
  questions: {
    basePath: "/research/questions",
    title: "Tags (Questions)",
    description: "Filter questions by tag.",
  },
  challenges: {
    basePath: "/research/challenges",
    title: "Tags (Challenges)",
    description: "Filter challenges by tag.",
  },
  all: {
    basePath: "/browse",
    title: "Tags (Browse)",
    description: "Tags across posts, domains, lexicon, influences, projects, questions, and challenges.",
  },
};

export interface TagIndexProps {
  tags: TagWithCount[];
  basePath: string;
  title: string;
  description: string;
}

/** Props for the tags index page (list of tags with counts). */
export async function getTagsIndexProps(
  scope: TagCollectionScope
): Promise<TagIndexProps> {
  const tags =
    scope === "all"
      ? await getTagsForAllCollections()
      : await getTagsForCollection(scope);
  const { basePath, title, description } = CONFIG[scope];
  return { tags, basePath, title, description };
}

export interface TagEntry {
  slug: string;
  data: Record<string, unknown>;
  collection: ContentCollectionId;
}

export interface TagPageProps {
  tag: string;
  entries: TagEntry[];
  allTags: string[];
  basePath: string;
}

function sortEntriesByDate(entries: TagEntry[]): TagEntry[] {
  return [...entries].sort((a, b) => {
    const da =
      (a.data.publish_date && new Date(a.data.publish_date as Date).getTime()) ??
      0;
    const db =
      (b.data.publish_date && new Date(b.data.publish_date as Date).getTime()) ??
      0;
    return db - da;
  });
}

/** Static paths for [tag].astro – single collection. */
export async function getTagPageStaticPaths(
  scope: ContentCollectionId
): Promise<{ params: { tag: string }; props: TagPageProps }[]> {
  const tags = await getTagsForCollection(scope);
  const listable = (await getListableEntries(scope)) as {
    slug: string;
    data: Record<string, unknown>;
  }[];
  const allTags = [...new Set(listable.flatMap((p) => (p.data.tags as string[] | undefined) ?? []))].sort();

  return tags.map(({ tag }) => {
    const filtered = listable.filter((e) =>
      ((e.data.tags as string[] | undefined) ?? []).includes(tag)
    );
    const entries: TagEntry[] = filtered.map((e) => ({
      slug: e.slug,
      data: e.data,
      collection: scope,
    }));
    return {
      params: { tag },
      props: {
        tag,
        entries: sortEntriesByDate(entries),
        allTags,
        basePath: CONFIG[scope].basePath,
      },
    };
  });
}

const ALL_COLLECTIONS: ContentCollectionId[] = [
  "posts",
  "domains",
  "lexicon",
  "influences",
  "projects",
  "questions",
  "challenges",
];

/** Static paths for [tag].astro – all collections (e.g. /all/tags/[tag]). */
export async function getTagPageStaticPathsAll(): Promise<
  { params: { tag: string }; props: TagPageProps }[]
> {
  const tagsData = await getTagsForAllCollections();
  const listables = await Promise.all(
    ALL_COLLECTIONS.map((id) => getListableEntries(id))
  );
  const allTags = tagsData.map((t) => t.tag);

  return tagsData.map(({ tag }) => {
    const entries: TagEntry[] = [];
    for (let i = 0; i < ALL_COLLECTIONS.length; i++) {
      const col = ALL_COLLECTIONS[i];
      const list = listables[i] as { slug: string; data: Record<string, unknown> }[];
      for (const e of list) {
        const tags = (e.data.tags as string[] | undefined) ?? [];
        if (tags.includes(tag)) {
          entries.push({ slug: e.slug, data: e.data, collection: col });
        }
      }
    }
    return {
      params: { tag },
      props: {
        tag,
        entries: sortEntriesByDate(entries),
        allTags,
        basePath: CONFIG.all.basePath,
      },
    };
  });
}
