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

