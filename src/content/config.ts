import { defineCollection, z } from "astro:content";

const schema = z.object({
  title: z.string(),
  release: z.string().datetime({ offset: true }),
  description: z.string(),
  tags: z.array(z.string()),
  update: z.string().datetime({ offset: true }).optional(),
});

const posts = defineCollection({
  type: "content",
  schema,
});

export type PostType = z.infer<typeof schema>;
export const collections = { posts };
