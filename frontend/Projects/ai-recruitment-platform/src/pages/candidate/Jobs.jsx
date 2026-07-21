import { useEffect, useState } from "react";
import DashboardLayout from "../../layouts/DashboardLayout";
import PageHeader from "../../components/layout/PageHeader";
import JobFilter from "../../components/jobs/JobFilter";
import JobCard from "../../components/jobs/JobCard";
import { getJobs } from "../../services/jobService";

function Jobs() {
  const [search, setSearch] = useState("");
  const [jobs, setJobs] = useState([]);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState("");

  useEffect(() => {
    loadJobs();
  }, []);

  const loadJobs = async () => {
    try {
      setLoading(true);

      const data = await getJobs();

      // Ensure we always store an array
      setJobs(Array.isArray(data) ? data : []);
    } catch (err) {
      console.error(err);
      setError("Failed to load jobs.");
    } finally {
      setLoading(false);
    }
  };

  const filteredJobs = jobs.filter((job) =>
    (job.title || "")
      .toLowerCase()
      .includes(search.toLowerCase())
  );

  if (loading) {
    return (
      <DashboardLayout>
        <div className="p-8">
          <h2 className="text-2xl font-bold">
            Loading jobs...
          </h2>
        </div>
      </DashboardLayout>
    );
  }

  if (error) {
    return (
      <DashboardLayout>
        <div className="p-8 text-red-600 font-semibold">
          {error}
        </div>
      </DashboardLayout>
    );
  }

  return (
    <DashboardLayout>
      <PageHeader
        title="Find Your Next Job"
        subtitle="Browse AI-recommended opportunities."
      />

      <input
        type="text"
        placeholder="Search jobs..."
        value={search}
        onChange={(e) => setSearch(e.target.value)}
        className="w-full p-4 border rounded-xl mb-6 bg-white"
      />

      <JobFilter />

      {filteredJobs.length === 0 ? (
        <div className="bg-white p-6 rounded-xl border text-center text-gray-500">
          No jobs available.
        </div>
      ) : (
        <div className="space-y-6">
          {filteredJobs.map((job) => (
            <JobCard
              key={job.id}
              job={job}
            />
          ))}
        </div>
      )}
    </DashboardLayout>
  );
}

export default Jobs;