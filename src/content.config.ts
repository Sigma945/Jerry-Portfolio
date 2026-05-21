import { defineCollection } from "astro:content";
import { z } from "zod";
import { glob, file } from "astro/loaders";

const projects = defineCollection({
  loader: file("src/content/projects/projects.json"),
  schema: z.object({
    title: z.string(),
    description: z.string(),
    tech: z.array(z.string()).optional(),
    link: z.string().optional(),
    date: z.coerce.date().optional(),
  }),
});

const blog = defineCollection({
  loader: glob({ pattern: "**/*.md", base: "./src/content/blog" }),
  schema: z.object({
    title: z.string(),
    description: z.string().optional(),
    date: z.date(),
    tags: z.array(z.string()).optional(),
    notion_id: z.string().optional(),
  }),
});

export const collections = { projects, blog };
