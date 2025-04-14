
"use client";
import { useState } from "react";

import { Button } from "@/components/ui/button";
import {
  Dialog,
  DialogContent,
  DialogDescription,
  DialogHeader,
  DialogTitle,
  DialogTrigger,
} from "@/components/ui/dialog";
import AddApplicationForm from "@/components/AddApplicationForm";

const AddApplicationButton = () => {
  const [open, setOpen] = useState(false);

  return (
    <Dialog open={open} onOpenChange={setOpen}>
      <DialogTrigger asChild>
        <Button variant="primary">Add Application</Button>
      </DialogTrigger>
      <DialogContent className="sm:max-w-[425px]">
        <DialogHeader>
          <DialogTitle>Add Job Application</DialogTitle>
          <DialogDescription>
            Fill in the details to track your job application.
          </DialogDescription>
        </DialogHeader>
        <AddApplicationForm setOpen={setOpen} />
      </DialogContent>
    </Dialog>
  );
};

export default AddApplicationButton;
