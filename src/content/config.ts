import { defineCollection, z } from "astro:content";

// Single base schema for all content collections
const statusEnum = z.enum(["private", "seed", "wip", "ready", "published", "unlisted"]);
const publishTypeEnum = z.enum(["atom", "blog", "essay", "paper", "domain", "lexicon", "influence", "book", "project", "question", "challenge"]);
const contentTypeEnum = z.enum(["atom", "note", "source", "person"]);

// Cross-post syndication tracking (see 00_Protocol/Playbooks/content-publishing.md)
const syndicationEntry = z.object({
  site: z.string(),           // e.g. "novaromahorizon.org"
  collection: z.string(),     // e.g. "insights"
  slug: z.string(),           // slug on the target site
  last_synced: z.coerce.date(),
});

const baseSchema = z.object({
  type: contentTypeEnum.default("note"),
  status: statusEnum.default("wip"),
  publish_type: publishTypeEnum,
  tags: z.array(z.string()).default([]),
  // Date fields: collections may use either created_date or originated_date
  // Lexicon uses originated_date (concept birth date); other collections use created_date
  created_date: z.coerce.date().optional(),
  originated_date: z.coerce.date().optional(),
  publish_date: z.coerce.date().optional(),
  updated_date: z.coerce.date().optional(),
  title: z.string(),
  description: z.string().default(""),
  author: z.string().optional().default("Francis Wang"),
  // Syndication: tracks where this content has been cross-posted
  syndicated_to: z.array(syndicationEntry).optional(),
  // Canonical URL: set when THIS page is a mirror of content hosted elsewhere
  canonical_url: z.string().url().optional(),
});

// Extended schema for Compelling Questions (hero question rendering)
const questionsSchema = baseSchema.extend({
  domain_theme: z.string().optional(),
  bold_ambition: z.string().optional(),
  constraints: z.array(z.string()).default([]),
});

// All five collections use the same schema (folder names plural)
const posts = defineCollection({ schema: () => baseSchema });
const domains = defineCollection({ schema: () => baseSchema });
const lexicon = defineCollection({ schema: () => baseSchema });
const influences = defineCollection({ schema: () => baseSchema });
const projects = defineCollection({ schema: () => baseSchema });
const questions = defineCollection({ schema: () => questionsSchema });
const challenges = defineCollection({ schema: () => baseSchema });

export const collections = {
  posts,
  domains,
  lexicon,
  influences,
  projects,
  questions,
  challenges,
};
