import { defineCollection } from 'astro:content';
import { glob, file } from 'astro/loaders';
import { z } from 'astro/zod';

export const industries = ['café', 'real estate', 'jewellery', 'wellness', 'D2C', 'hospitality', 'interiors'] as const;
export const objectives = ['footfall', 'leads', 'reviews', 'sales'] as const;

/** The Unboring Lab. One Markdown file per idea in src/content/lab. The body is the idea itself. */
const lab = defineCollection({
  loader: glob({ pattern: '**/*.md', base: './src/content/lab' }),
  schema: z.object({
    hook: z.string(),
    industry: z.enum(industries),
    objective: z.enum(objectives),
    budget: z.string(), // rough band, e.g. "INR 5k–15k"
    order: z.number().default(99),
    featured: z.boolean().default(false), // featured ideas show on the homepage teaser
  }),
});

const services = defineCollection({
  loader: file('./src/content/services.json'),
  schema: z.object({
    number: z.string(),
    name: z.string(),
    oneLiner: z.string(),
    includes: z.array(z.string()),
    youGet: z.string(),
    forWho: z.string(),
    exampleIdea: z.string(),
  }),
});

const testQuestions = defineCollection({
  loader: file('./src/content/test-questions.json'),
  schema: z.object({
    question: z.string(),
    answers: z.array(z.object({ text: z.string(), score: z.union([z.literal(0), z.literal(1), z.literal(2)]) })).length(3),
  }),
});

const testVerdicts = defineCollection({
  loader: file('./src/content/test-verdicts.json'),
  schema: z.object({
    min: z.number(),
    max: z.number(),
    title: z.string(),
    lines: z.array(z.string()).length(2),
  }),
});

const neverSay = defineCollection({
  loader: file('./src/content/never-say.json'),
  schema: z.object({ text: z.string() }),
});

const foundingFaq = defineCollection({
  loader: file('./src/content/founding-faq.json'),
  schema: z.object({ q: z.string(), a: z.string() }),
});

/** Real case studies only. The /work route stays off until this has entries. */
const work = defineCollection({
  loader: glob({ pattern: '**/*.md', base: './src/content/work' }),
  schema: z.object({
    client: z.string(),
    industry: z.string(),
    city: z.string(),
    headline: z.string(),
    objective: z.string(),
    // Results must be real, measured and approved by the client. No estimates.
    results: z.array(z.object({ label: z.string(), value: z.string() })).default([]),
    publishedAt: z.coerce.date(),
  }),
});

export const collections = { lab, services, testQuestions, testVerdicts, neverSay, foundingFaq, work };
