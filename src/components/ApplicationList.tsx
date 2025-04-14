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
} from "@/components/ui/dialog";
import AddApplicationForm from "@/components/AddApplicationForm";
import { useToast } from "@/hooks/use-toast";
import { Select, SelectContent, SelectItem, SelectTrigger, SelectValue } from "@/components/ui/select";

// Define possible status options
const statusOptions = [
  "Applied",
  "Phone Screen",
  "Interview",
  "Offer",
  "Rejected",
];

// Extend the JobPosting interface to include new properties
export interface Application extends JobPosting {
  status: string;
  roundsCompleted: number;
  notes: string;
  jobDescription: string;
  hrContact: string;
  source: string;
}

// Dummy data for demonstration
const mockApplications: Application[] = [
  {
    id: "1",
    title: "Software Engineer",
    company: "Google",
    position: "Frontend Developer",
    applicationDate: new Date(),
    url: "https://example.com/jobs/123",
    description: "Example job description.",
    status: "Applied",
    roundsCompleted: 1,
    notes: "First round done",
    jobDescription: "Example job description.",
    hrContact: "HR Contact",
    source: "LinkedIn",
  },
  {
    id: "2",
    title: "Senior Software Engineer",
    company: "Microsoft",
    position: "Backend Developer",
    applicationDate: new Date(),
    url: "https://example.com/jobs/456",
    description: "Another job description.",
    status: "Interview",
    roundsCompleted: 2,
    notes: "Second round done",
     jobDescription: "Example job description.",
    hrContact: "HR Contact",
    source: "LinkedIn",
  },
];

const ApplicationList = () => {
  const [applications, setApplications] = useState<Application[]>([]);
  const [open, setOpen] = useState(false);
  const [selectedApplication, setSelectedApplication] =
    useState<Application | null>(null);
  const { toast } = useToast();
  const [statusFilter, setStatusFilter] = useState<string | null>(null);

  useEffect(() => {
    // Simulate fetching applications from a service or database
    const fetchApplications = async () => {
      // Simulate loading
      setTimeout(() => {
        setApplications(mockApplications);
      }, 500);
    };

    fetchApplications();
  }, []);

  // Filter applications based on selected status
  const filteredApplications = statusFilter
    ? applications.filter((app) => app.status === statusFilter)
    : applications;

  const handleAddApplication = (newApplication: Omit<Application, "id">) => {
    // Simulate adding an application to a service or database
    const newId = String(applications.length + 1);
    const applicationToAdd = { ...newApplication, id: newId };
    setApplications([...applications, applicationToAdd as Application]);
  };

  const handleUpdateApplication = (
    id: string,
    updatedApplication: Omit<Application, "id">
  ) => {
    // Simulate updating an application in a service or database
    const updatedApplications = applications.map((app) =>
      app.id === id ? { ...app, ...updatedApplication } : app
    );
    setApplications(updatedApplications as Application[]);
    setSelectedApplication(null); // Close the dialog after updating
    setOpen(false)
  };

  const handleDeleteApplication = (id: string) => {
    // Simulate deleting an application from a service or database
    const updatedApplications = applications.filter((app) => app.id !== id);
    setApplications(updatedApplications as Application[]);
    toast({
      title: "Success",
      description: "Job application deleted successfully.",
    });
  };

  const handleEdit = (application: Application) => {
    setSelectedApplication(application);
    setOpen(true);
  };

  const handleDialogClose = () => {
        setOpen(false);
        setSelectedApplication(null); // Clear selected application when closing
    };

  return (
    <>
      {/* Status Filter */}
      <div className="mb-4 flex justify-end">
        <Select onValueChange={setStatusFilter} defaultValue={statusFilter || ""}>
          <SelectTrigger className="w-[180px]">
            <SelectValue placeholder="Filter by Status" />
          </SelectTrigger>
          <SelectContent>
            <SelectItem value="">All Statuses</SelectItem>
            {statusOptions.map((status) => (
              <SelectItem key={status} value={status}>
                {status}
              </SelectItem>
            ))}
          </SelectContent>
        </Select>
      </div>

      <Table>
        <TableCaption>A list of your job applications.</TableCaption>
        <TableHeader>
          <TableRow>
            <TableHead className="w-[100px]">Title</TableHead>
            <TableHead>Company</TableHead>
            <TableHead>Position</TableHead>
            <TableHead>Date Applied</TableHead>
            <TableHead>Status</TableHead>
            <TableHead>Rounds Completed</TableHead>
            <TableHead>Notes</TableHead>
            <TableHead className="text-center">Actions</TableHead>
          </TableRow>
        </TableHeader>
        <TableBody>
          {filteredApplications.map((application) => (
            <TableRow key={application.id}>
              <TableCell className="font-medium">{application.title}</TableCell>
              <TableCell>{application.company}</TableCell>
              <TableCell>{application.position}</TableCell>
              <TableCell>
                {application.applicationDate
                  ? format(application.applicationDate, "yyyy-MM-dd")
                  : "N/A"}
              </TableCell>
              <TableCell>{application.status}</TableCell>
              <TableCell>{application.roundsCompleted}</TableCell>
              <TableCell>{application.notes}</TableCell>
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

      <Dialog open={open} onOpenChange={handleDialogClose}>
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
            initialValues={selectedApplication}
          />
        </DialogContent>
      </Dialog>
    </>
  );
};

export default ApplicationList;
