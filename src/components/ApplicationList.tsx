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
  DialogFooter,
} from "@/components/ui/dialog";
import AddApplicationForm from "@/components/AddApplicationForm";
import { useToast } from "@/hooks/use-toast";
import {
  Select,
  SelectContent,
  SelectItem,
  SelectTrigger,
  SelectValue,
} from "@/components/ui/select";

// Extend the JobPosting interface to include new properties

export enum Status {
  APPLIED = "Applied",
  PHONE_SCREEN = "Phone Screen",
  INTERVIEW = "Interview",
  OFFER = "Offer",
  REJECTED = "Rejected",
}

// Extend the JobPosting interface to include new properties
export interface Application extends JobPosting {
  status: Status;
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
    status: Status.APPLIED,
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
    status: Status.INTERVIEW,
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
  const [statusFilter, setStatusFilter] = useState<Status | null>(null);

  useEffect(() => {
    // Simulate fetching applications from a service or database
    const fetchApplications = async () => {
      // Simulate loading
      setTimeout(() => {
        // Convert mock dates to ISO strings for proper hydration
        const hydratedApplications = mockApplications.map((app) => ({
          ...app,
          applicationDate: app.applicationDate ? app.applicationDate : null,
        }));
        setApplications(hydratedApplications);
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
    toast({
      title: "Success",
      description: "Job application added successfully.",
    });
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
    setOpen(false);
    toast({
      title: "Success",
      description: "Job application updated successfully.",
    });
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
        <Select
          onValueChange={(value) =>
            setStatusFilter((value as Status) || undefined)
          }
          defaultValue={statusFilter || undefined}
        >
          <SelectTrigger className="w-[180px]">
            <SelectValue placeholder="Filter by Status" />
          </SelectTrigger>
          <SelectContent>
            {Object.values(Status).map((status) => (
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
            <TableHead>Source</TableHead>
            <TableHead>Date Applied</TableHead>
            <TableHead>Status</TableHead>
            <TableHead>Rounds Completed</TableHead>
            <TableHead>Notes</TableHead>
            <TableHead>HR Contact</TableHead>
            <TableHead>Job Description</TableHead>
            <TableHead className="text-center">Actions</TableHead>
          </TableRow>
        </TableHeader>
        <TableBody>
          {filteredApplications.map((application) => (
            <TableRow key={application.id}>
              <TableCell className="font-medium">{application.title}</TableCell>
              <TableCell>{application.company}</TableCell>
              <TableCell>{application.position}</TableCell>
              <TableCell>{application.source}</TableCell>
              <TableCell>
                {application.applicationDate
                  ? format(application.applicationDate, "yyyy-MM-dd")
                  : "N/A"}
              </TableCell>
              <TableCell>{application.status}</TableCell>
              <TableCell>{application.roundsCompleted}</TableCell>
              <TableCell>{application.notes}</TableCell>
              <TableCell>{application.hrContact}</TableCell>
              <TableCell>{application.jobDescription}</TableCell>
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
        <DialogContent className="sm:max-w-[425px] h-[90vh] flex flex-col p-0">
          <DialogHeader className="p-6 pb-4 border-b">
            <DialogTitle>
              {selectedApplication
                ? "Edit Job Application"
                : "Add Job Application"}
            </DialogTitle>
            <DialogDescription>
              {selectedApplication
                ? "Update the details of your job application."
                : "Fill in the details to track your job application."}
            </DialogDescription>
          </DialogHeader>
          <div className="flex-1 overflow-y-auto p-6">
            <AddApplicationForm
              setOpen={setOpen}
              onSubmit={
                selectedApplication
                  ? (values) =>
                      handleUpdateApplication(selectedApplication.id, values)
                  : (values) => handleAddApplication(values)
              }
              initialValues={selectedApplication}
            />
          </div>
          <DialogFooter className="p-6 pt-4 border-t">
            <Button
              type="submit"
              form="add-application-form"
              className="w-full"
            >
              {selectedApplication ? "Update Application" : "Add Application"}
            </Button>
          </DialogFooter>
        </DialogContent>
      </Dialog>
    </>
  );
};

export default ApplicationList;
