import rss from "@astrojs/rss";
import { getCollection } from "astro:content";

export async function GET(context) {
  const posts = await getCollection("posts");
  const listable = posts.filter((entry) => entry.data.status === "published");
  const sorted = [...listable].sort(
    (a, b) =>
      (b.data.publish_date ? new Date(b.data.publish_date).getTime() : 0) -
      (a.data.publish_date ? new Date(a.data.publish_date).getTime() : 0)
  );
  return rss({
    title: "Francis Wang",
    description: "Francis Wang's personal website.",
    site: context.site,
    items: sorted.map((entry) => ({
      title: entry.data.title,
      description: entry.data.description ?? "",
      pubDate: entry.data.publish_date ?? entry.data.created_date,
      link: `/posts/${entry.slug}/`,
    })),
  });
}
