import { defineCollection, z } from "astro:content";

// Single base schema for all content collections
const statusEnum = z.enum(["private", "seed", "wip", "ready", "published", "unlisted"]);
const publishTypeEnum = z.enum(["posts", "domains", "lexicon", "influences", "projects"]);
const contentTypeEnum = z.enum(["note", "source", "person"]);

const baseSchema = z.object({
  type: contentTypeEnum.default("note"),
  status: statusEnum.default("wip"),
  publish_type: publishTypeEnum,
  tags: z.array(z.string()).default([]),
  created_date: z.coerce.date(),
  publish_date: z.coerce.date().optional(),
  title: z.string(),
  description: z.string().default(""),
  author: z.string().optional().default("Francis Wang"),
});

// All five collections use the same schema (folder names plural)
const posts = defineCollection({ schema: () => baseSchema });
const domains = defineCollection({ schema: () => baseSchema });
const lexicon = defineCollection({ schema: () => baseSchema });
const influences = defineCollection({ schema: () => baseSchema });
const projects = defineCollection({ schema: () => baseSchema });

export const collections = {
  posts,
  domains,
  lexicon,
  influences,
  projects,
};
