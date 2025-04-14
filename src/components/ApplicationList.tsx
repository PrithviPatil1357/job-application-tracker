
"use client";

import { useEffect, useState } from "react";
import {
  Table,
  TableBody,
  TableCaption,
  TableCell,
  TableHead,
  TableHeader,
  TableRow,
} from "@/components/ui/table";
import { JobPosting } from "@/services/job-boards";
import { getJobPostings } from "@/services/job-boards";

const mockApplications: JobPosting[] = [
  {
    title: "Software Engineer",
    company: "Google",
    url: "https://example.com/jobs/123",
    description: "Example job description.",
  },
  {
    title: "Senior Software Engineer",
    company: "Microsoft",
    url: "https://example.com/jobs/456",
    description: "Another job description.",
  },
];

const ApplicationList = () => {
  const [applications, setApplications] = useState<JobPosting[]>([]);

  useEffect(() => {
    // Simulate fetching applications from a service or database
    // In a real app, you would replace this with an actual data fetch
    const fetchApplications = async () => {
      // Replace 'yourJobBoard' and 'yourSearchTerm' with actual values
      const fetchedApplications = await getJobPostings(
        "yourJobBoard",
        "yourSearchTerm"
      );
      setApplications(fetchedApplications);
    };

    // Simulate loading
    setTimeout(() => {
      setApplications(mockApplications);
    }, 500);
  }, []);

  return (
    <Table>
      <TableCaption>A list of your job applications.</TableCaption>
      <TableHeader>
        <TableRow>
          <TableHead className="w-[200px]">Title</TableHead>
          <TableHead>Company</TableHead>
          <TableHead>Status</TableHead>
          <TableHead>Date Applied</TableHead>
        </TableRow>
      </TableHeader>
      <TableBody>
        {applications.map((application, index) => (
          <TableRow key={index}>
            <TableCell className="font-medium">{application.title}</TableCell>
            <TableCell>{application.company}</TableCell>
            <TableCell>Applied</TableCell>
            <TableCell>2024-01-01</TableCell>
          </TableRow>
        ))}
      </TableBody>
    </Table>
  );
};

export default ApplicationList;
