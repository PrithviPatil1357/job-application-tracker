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
import { Button } from "@/components/ui/button";
import { Edit, Trash } from "lucide-react";
import { format } from "date-fns";
import {
  Dialog,
  DialogContent,
  DialogDescription,
  DialogHeader,
  DialogTitle,
  DialogTrigger,
} from "@/components/ui/dialog";
import AddApplicationForm from "@/components/AddApplicationForm";
import { useToast } from "@/hooks/use-toast";

// Dummy data for demonstration
const mockApplications: JobPosting[] = [
  {
    id: "1",
    title: "Software Engineer",
    company: "Google",
    position: "Frontend Developer",
    applicationDate: new Date(),
    url: "https://example.com/jobs/123",
    description: "Example job description.",
  },
  {
    id: "2",
    title: "Senior Software Engineer",
    company: "Microsoft",
    position: "Backend Developer",
    applicationDate: new Date(),
    url: "https://example.com/jobs/456",
    description: "Another job description.",
  },
];

const ApplicationList = () => {
  const [applications, setApplications] = useState<JobPosting[]>([]);
  const [open, setOpen] = useState(false);
  const [selectedApplication, setSelectedApplication] =
    useState<JobPosting | null>(null);
    const { toast } = useToast();

  useEffect(() => {
    // Simulate fetching applications from a service or database
    // In a real app, you would replace this with an actual data fetch
    const fetchApplications = async () => {
      // Replace 'yourJobBoard' and 'yourSearchTerm' with actual values
      // const fetchedApplications = await getJobPostings(
      //   "yourJobBoard",
      //   "yourSearchTerm"
      // );
      // setApplications(fetchedApplications);

      // Simulate loading
      setTimeout(() => {
        setApplications(mockApplications);
      }, 500);
    };

    fetchApplications();
  }, []);

  const handleAddApplication = (newApplication: Omit<JobPosting, "id">) => {
    // Simulate adding an application to a service or database
    const newId = String(applications.length + 1);
    const applicationToAdd = { ...newApplication, id: newId };
    setApplications([...applications, applicationToAdd as JobPosting]);
  };

  const handleUpdateApplication = (
    id: string,
    updatedApplication: Omit<JobPosting, "id">
  ) => {
    // Simulate updating an application in a service or database
    const updatedApplications = applications.map((app) =>
      app.id === id ? { ...updatedApplication, id } : app
    );
    setApplications(updatedApplications as JobPosting[]);
    setSelectedApplication(null); // Close the dialog after updating
  };

  const handleDeleteApplication = (id: string) => {
    // Simulate deleting an application from a service or database
    const updatedApplications = applications.filter((app) => app.id !== id);
    setApplications(updatedApplications as JobPosting[]);
    toast({
      title: "Success",
      description: "Job application deleted successfully.",
    });
  };

  const handleEdit = (application: JobPosting) => {
    setSelectedApplication(application);
    setOpen(true);
  };

  return (
    <>
      <Table>
        <TableCaption>A list of your job applications.</TableCaption>
        <TableHeader>
          <TableRow>
            <TableHead className="w-[100px]">Title</TableHead>
            <TableHead>Company</TableHead>
            <TableHead>Position</TableHead>
            <TableHead>Date Applied</TableHead>
            <TableHead className="text-center">Actions</TableHead>
          </TableRow>
        </TableHeader>
        <TableBody>
          {applications.map((application) => (
            <TableRow key={application.id}>
              <TableCell className="font-medium">{application.title}</TableCell>
              <TableCell>{application.company}</TableCell>
              <TableCell>{application.position}</TableCell>
              <TableCell>
                {application.applicationDate
                  ? format(application.applicationDate, "yyyy-MM-dd")
                  : "N/A"}
              </TableCell>
              <TableCell className="flex justify-center gap-4">
                <Button
                  variant="ghost"
                  size="icon"
                  onClick={() => handleEdit(application)}
                >
                  <Edit className="h-4 w-4" />
                </Button>
                <Button
                  variant="ghost"
                  size="icon"
                  onClick={() => handleDeleteApplication(application.id)}
                >
                  <Trash className="h-4 w-4" />
                </Button>
              </TableCell>
            </TableRow>
          ))}
        </TableBody>
      </Table>

      <Dialog open={open} onOpenChange={setOpen}>
        <DialogTrigger asChild>
          <Button variant="primary" className="hidden">
            Edit Application
          </Button>
        </DialogTrigger>
        <DialogContent className="sm:max-w-[425px]">
          <DialogHeader>
            <DialogTitle>
              {selectedApplication ? "Edit Job Application" : "Add Job Application"}
            </DialogTitle>
            <DialogDescription>
              {selectedApplication
                ? "Update the details of your job application."
                : "Fill in the details to track your job application."}
            </DialogDescription>
          </DialogHeader>
          <AddApplicationForm
            setOpen={setOpen}
            onSubmit={
              selectedApplication
                ? (values) => handleUpdateApplication(selectedApplication.id, values)
                : (values) => handleAddApplication(values)
            }
          />
        </DialogContent>
      </Dialog>
    </>
  );
};

export default ApplicationList;
