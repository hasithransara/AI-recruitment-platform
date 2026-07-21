import { useState } from "react";
import Card from "../common/Card";
import { Bookmark, Briefcase } from "lucide-react";
import { toast } from "react-toastify";
import { applyForJob } from "../../services/applicationService";

function JobCard({ job }) {
  const [applying, setApplying] = useState(false);
  const [applied, setApplied] = useState(false);

  const handleApply = async () => {
    if (applying || applied) {
      return;
    }

    try {
      setApplying(true);

      const result = await applyForJob(job.id);

      toast.success(
        result.message ||
          "Application submitted successfully."
      );

      setApplied(true);
    } catch (error) {
      console.error("Apply error:", error);

      const message =
        error.response?.data?.message ||
        error.message ||
        "Failed to submit application.";

      toast.error(message);

      if (
        error.response?.status === 400 &&
        message.toLowerCase().includes("already")
      ) {
        setApplied(true);
      }
    } finally {
      setApplying(false);
    }
  };

  return (
    <Card className="mb-6">
      <div className="flex items-start justify-between gap-4">
        <div className="min-w-0 flex-1">
          <h2 className="text-2xl font-bold">
            {job.title}
          </h2>

          <p className="mt-2 text-gray-500">
            {job.company} • {job.location}
          </p>

          <div className="mt-4 flex flex-wrap gap-3">
            <span className="rounded-full bg-slate-100 px-3 py-1 text-sm">
              {job.jobType}
            </span>

            <span className="rounded-full bg-slate-100 px-3 py-1 text-sm">
              {job.experienceLevel}
            </span>
          </div>

          <p className="mt-5 text-lg font-semibold">
            Rs.{" "}
            {Number(job.salary || 0).toLocaleString()}
          </p>
        </div>

        <Briefcase
          size={45}
          className="shrink-0 text-indigo-600"
        />
      </div>

      <p className="mt-4 text-gray-600">
        {job.description}
      </p>

      <div className="mt-6 flex justify-end gap-3">
        <button
          type="button"
          className="rounded-lg border px-5 py-2 hover:bg-gray-50"
          aria-label="Save job"
        >
          <Bookmark size={18} />
        </button>

        <button
          type="button"
          onClick={handleApply}
          disabled={applying || applied}
          className={`rounded-lg px-6 py-2 text-white transition ${
            applied
              ? "cursor-not-allowed bg-green-600"
              : applying
                ? "cursor-wait bg-indigo-400"
                : "bg-indigo-600 hover:bg-indigo-700"
          }`}
        >
          {applied
            ? "Applied"
            : applying
              ? "Applying..."
              : "Apply"}
        </button>
      </div>
    </Card>
  );
}

export default JobCard;