'use server';
/**
 * @fileOverview Summarizes a job description, extracting key skills, requirements, and categorizing the job.
 *
 * - summarizeJobDescription - A function that handles the job description summarization process.
 * - SummarizeJobDescriptionInput - The input type for the summarizeJobDescription function.
 * - SummarizeJobDescriptionOutput - The return type for the summarizeJobDescription function.
 */

import {ai} from '@/ai/ai-instance';
import {z} from 'genkit';

const SummarizeJobDescriptionInputSchema = z.object({
  jobDescription: z
    .string()
    .describe('The full text of the job description to summarize.'),
});
export type SummarizeJobDescriptionInput = z.infer<
  typeof SummarizeJobDescriptionInputSchema
>;

const SummarizeJobDescriptionOutputSchema = z.object({
  summary: z
    .string()
    .describe('A concise summary of the job description.'),
  keySkills: z
    .array(z.string())
    .describe('A list of key skills required for the job.'),
  requirements: z
    .string()
    .describe('A summary of the essential requirements for the job.'),
  category: z
    .string()
    .describe('A category that best describes the job type.'),
});
export type SummarizeJobDescriptionOutput = z.infer<
  typeof SummarizeJobDescriptionOutputSchema
>;

export async function summarizeJobDescription(
  input: SummarizeJobDescriptionInput
): Promise<SummarizeJobDescriptionOutput> {
  return summarizeJobDescriptionFlow(input);
}

const prompt = ai.definePrompt({
  name: 'summarizeJobDescriptionPrompt',
  input: {
    schema: z.object({
      jobDescription: z
        .string()
        .describe('The full text of the job description to summarize.'),
    }),
  },
  output: {
    schema: z.object({
      summary: z
        .string()
        .describe('A concise summary of the job description.'),
      keySkills: z
        .array(z.string())
        .describe('A list of key skills required for the job.'),
      requirements: z
        .string()
        .describe('A summary of the essential requirements for the job.'),
      category: z
        .string()
        .describe('A category that best describes the job type.'),
    }),
  },
  prompt: `You are an AI assistant that summarizes job descriptions and extracts key information.

  Please provide a summary, list key skills, summarize requirements and categorize the following job description:

  {{jobDescription}}

  Make sure to follow the schema. Be concise.
  `,
});

const summarizeJobDescriptionFlow = ai.defineFlow<
  typeof SummarizeJobDescriptionInputSchema,
  typeof SummarizeJobDescriptionOutputSchema
>(
  {
    name: 'summarizeJobDescriptionFlow',
    inputSchema: SummarizeJobDescriptionInputSchema,
    outputSchema: SummarizeJobDescriptionOutputSchema,
  },
  async input => {
    const {output} = await prompt(input);
    return output!;
  }
);
