import { defineCollection, z } from "astro:content";

// Base schema for common frontmatter fields
const baseContentSchema = ({ image }: { image: any }) =>
  z.object({
    pubDate: z.date(),
    title: z.string(),
    description: z.string(),
    image: z.object({
      url: image(),
      alt: z.string(),
    }),
    link: z.string().optional(),
    domains: z.array(z.string()).optional(),
    tags: z.array(z.string()).optional(),
  });

const infopages = defineCollection({
  schema: z.object({
    page: z.string(),
    pubDate: z.date(),
  }),
});

const customers = defineCollection({
  schema: ({ image }) =>
    z.object({
      name: z.string(),
      avatar: z.object({
        url: image(),
        alt: z.string(),
      }),
      location: z.string().optional(),
      occupation: z.string().optional(),
      course: z.string(),
      quote: z.string().optional(),
      testimonial: z.string(),
      tags: z.array(z.string()).optional(),
    }),
});

// Books with aligned frontmatter
const books = defineCollection({
  schema: ({ image }) => baseContentSchema({ image }),
});

// Domains with parent domains support for hierarchy
const domains = defineCollection({
  schema: ({ image }) =>
    baseContentSchema({ image }).extend({
      id: z.string(), // Unique identifier (PascalCase)
      code: z.string().optional(), // 3-5 char uppercase course-style code
      alias: z.array(z.string()).optional(), // Optional list of alternative names
      parents: z.array(z.string()).optional(), // Array of parent domain IDs
    }),
});

// Lexicon with aligned frontmatter
const lexicon = defineCollection({
  schema: ({ image }) => baseContentSchema({ image }),
});

// Influences with aligned frontmatter (name instead of title)
const influences = defineCollection({
  type: "content",
  schema: ({ image }) =>
    z.object({
      pubDate: z.date(),
      name: z.string(), // Influences use 'name' instead of 'title'
      description: z.string(),
      image: z.object({
        url: image(),
        alt: z.string(),
      }),
      link: z.string().optional(),
      domains: z.array(z.string()).optional(),
      tags: z.array(z.string()).optional(),
      reflections: z.array(z.string()).optional(), // Renamed from "quote" to "reflections" (list)
      socials: z
        .object({
          twitter: z.string().optional(),
          website: z.string().optional(),
          linkedin: z.string().optional(),
          email: z.string().optional(),
        })
        .optional(),
    }),
});

// Posts (blog) with aligned frontmatter
const postsCollection = defineCollection({
  schema: ({ image }) => baseContentSchema({ image }),
});

// Courses with aligned frontmatter + course-specific fields
const courses = defineCollection({
  schema: ({ image }) =>
    baseContentSchema({ image }).extend({
      duration: z.string().optional(),
      videoUrl: z.string().optional(),
      price: z.number().min(0).optional(),
      skills: z.array(z.string()).optional(),
      sections: z
        .array(
          z.object({
            title: z.string(),
            lessons: z.array(z.string()),
          })
        )
        .optional(),
      isFeatured: z.boolean().optional(),
      isFree: z.boolean().optional(),
      isNew: z.boolean().optional(),
      isLocked: z.boolean().optional(),
    }),
});
const lessons = defineCollection({
  type: "content",
  schema: z.object({
    title: z.string(),
    duration: z.string(),
    videoUrl: z.string(),
    course: z.string(),
    section: z.string(),
    isLocked: z.boolean().optional(),
  }),
});
export const collections = {
  influences: influences,
  courses: courses,
  lessons: lessons,
  books: books,
  domains: domains,
  lexicon: lexicon,
  customers: customers,
  infopages: infopages,
  posts: postsCollection,
};
