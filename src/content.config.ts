import { defineCollection, z } from 'astro:content';
import { glob } from 'astro/loaders'; // Not available with legacy API

const blog = defineCollection({
	loader: glob({ pattern: ['**/*.md', '**/*.mdx'], base: './src/content/blog' }),
	schema: ({ image }) =>
		z.object({
			title: z.string(),
			seoTitle: z.string().optional(),
			description: z.string(),
			// Transform string to Date object
			pubDate: z.coerce.date(),
			updatedDate: z.coerce.date().optional(),
			tags: z.array(z.string()).optional(),
			coverImage: image().optional()
		})
});

const news = defineCollection({
	loader: glob({ pattern: '**/*.mdx', base: './src/content/news' }),
	schema: () =>
		z.object({
			pubDate: z.coerce.date()
		})
});

export const collections = { blog, news };
