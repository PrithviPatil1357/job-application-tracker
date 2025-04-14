"use client";

import ApplicationList from "@/components/ApplicationList";
import AddApplicationButton from "@/components/AddApplicationButton";
import { Toaster } from "@/components/ui/toaster";

export default function Home() {
  return (
    <div className="container mx-auto p-4">
      <h1 className="text-2xl font-bold mb-4">Job Applications</h1>
      <p className="text-muted-foreground mb-4">Track your job applications and stay organized.</p>
      <AddApplicationButton />
      <ApplicationList />
    </div>
  );
}

