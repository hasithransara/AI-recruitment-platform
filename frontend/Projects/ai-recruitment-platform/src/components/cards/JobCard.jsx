import { useState } from "react";
import { toast } from "react-toastify";

import Card from "../common/Card";
import { applyForJob } from "../../services/applicationService";

function JobCard({
  id,
  title,
  company,
  location,
  match,
}) {
  const [isApplying, setIsApplying] = useState(false);

  const handleApply = async () => {
    if (!id) {
      toast.error("Job ID is missing.");
      return;
    }

    try {
      setIsApplying(true);

      const result = await applyForJob(id);

      toast.success(
        result?.message ||
          "Application submitted successfully."
      );
    } catch (error) {
      console.error(
        "Apply job error:",
        error.response?.data || error
      );

      const message =
        error.response?.data?.message ||
        error.response?.data?.title ||
        "Failed to submit application.";

      toast.error(message);
    } finally {
      setIsApplying(false);
    }
  };

  return (
    <Card className="transition duration-300 hover:-translate-y-1 hover:shadow-lg">
      <div className="flex flex-col gap-5 sm:flex-row sm:items-center sm:justify-between">
        <div>
          <h3 className="text-xl font-semibold text-gray-900">
            {title}
          </h3>

          <p className="mt-1 text-gray-500">
            {company} • {location}
          </p>
        </div>

        <div className="flex flex-col items-start sm:items-end">
          <div className="rounded-full bg-green-100 px-4 py-2 font-semibold text-green-700">
            {match ?? 0}% Match
          </div>

          <button
            type="button"
            onClick={handleApply}
            disabled={isApplying}
            className="mt-4 rounded-lg bg-indigo-600 px-5 py-2 text-white transition hover:bg-indigo-700 disabled:cursor-not-allowed disabled:opacity-60"
          >
            {isApplying ? "Applying..." : "Apply"}
          </button>
        </div>
      </div>
    </Card>
  );
}

export default JobCard;