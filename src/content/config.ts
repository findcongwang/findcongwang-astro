import { defineCollection, z } from "astro:content";
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

const books = defineCollection({
  schema: ({ image }) =>
    z.object({
      pubDate: z.date(),
      title: z.string(),
      description: z.string(),
      live: z.string(),
      image: z.object({
        url: image(),
        alt: z.string(),
      }),
    }),
});

const domains = defineCollection({
  schema: ({ image }) =>
    z.object({
      pubDate: z.date(),
      title: z.string(),
      description: z.string(),
      live: z.string(),
      image: z.object({
        url: image(),
        alt: z.string(),
      }),
    }),
});

const lexicon = defineCollection({
  schema: ({ image }) =>
    z.object({
      pubDate: z.date(),
      title: z.string(),
      description: z.string(),
      live: z.string(),
      image: z.object({
        url: image(),
        alt: z.string(),
      }),
    }),
});

const influences = defineCollection({
  schema: ({ image }) =>
    z.object({
      name: z.string(),
      role: z.string().optional(),
      bio: z.string().optional(),
      quote: z.string().optional(),
      image: z.object({
        url: image(),
        alt: z.string(),
      }),
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
const postsCollection = defineCollection({
  schema: ({ image }) =>
    z.object({
      title: z.string(),
      pubDate: z.date(),
      description: z.string(),
      team: z.string(),
      image: z.object({
        url: image(),
        alt: z.string(),
      }),
      tags: z.array(z.string()),
    }),
});
const courses = defineCollection({
  schema: ({ image }) =>
    z.object({
      title: z.string(),
      description: z.string(),
      pubDate: z.date(),
      teacher: z.string(),
      duration: z.string(),
      videoUrl: z.string(),
      price: z.number().min(0),
      skills: z.array(z.string()),
      sections: z.array(
        z.object({
          title: z.string(),
          lessons: z.array(z.string()),
        })
      ),
      image: z.object({
        url: image(),
        alt: z.string(),
      }),
      tags: z.array(z.string()).optional(),
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
