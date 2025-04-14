/**
 * Represents a job posting with relevant details.
 */
export interface JobPosting {
  /**
   * The id of the job.
   */
  id: string;
  /**
   * The title of the job.
   */
  title: string;
  /**
   * The name of the company offering the job.
   */
  company: string;
  /**
   * The position of the job.
   */
  position: string;
  /**
   * The URL of the job posting.
   */
  url: string;
  /**
   * The job description.
   */
  description: string;

  /**
   * The date the application was submitted.
   */
  applicationDate?: Date | null;
}

/**
 * Asynchronously retrieves job postings from a specific job board.
 *
 * @param jobBoard The name of the job board to retrieve postings from.
 * @param searchTerm The search term to filter job postings.
 * @returns A promise that resolves to an array of JobPosting objects.
 */
export async function getJobPostings(
  jobBoard: string,
  searchTerm: string
): Promise<JobPosting[]> {
  // TODO: Implement this by calling an API.

  return [
    {
      id: '1',
      title: 'Software Engineer',
      company: 'Google',
      position: 'Frontend Developer',
      applicationDate: new Date(),
      url: 'https://example.com/jobs/123',
      description: 'Example job description.',
    },
  ];
}
