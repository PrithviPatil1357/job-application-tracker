
import ApplicationList from "@/components/ApplicationList";
import AddApplicationButton from "@/components/AddApplicationButton";

export default function Home() {
  return (
    <div className="container mx-auto p-4">
      <h1 className="text-2xl font-bold mb-4">Job Applications</h1>
      <AddApplicationButton />
      <ApplicationList />
    </div>
  );
}
