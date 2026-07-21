import { useState } from "react";

import jobsData from "../../data/adminJobs";
import JobSearch from "../../components/adminJobs/JobSearch";
import JobFilter from "../../components/adminJobs/JobFilter";
import JobList from "../../components/adminJobs/JobList";

function JobManagement() {
  const [search, setSearch] = useState("");
  const [status, setStatus] = useState("All");

  const filteredJobs = jobsData.filter((job) => {
    const matchesSearch = job.title
      .toLowerCase()
      .includes(search.toLowerCase());

    const matchesStatus =
      status === "All" || job.status === status;

    return matchesSearch && matchesStatus;
  });

  return (
    <div className="min-h-screen bg-slate-100 p-8">

      <h1 className="text-4xl font-bold">
        Job Management
      </h1>

      <p className="text-slate-500 mb-8">
        Review and manage all job postings.
      </p>

      <div className="flex gap-4 mb-8">
        <div className="flex-1">
          <JobSearch
            value={search}
            onChange={setSearch}
          />
        </div>

        <JobFilter
          value={status}
          onChange={setStatus}
        />
      </div>

      <JobList jobs={filteredJobs} />

    </div>
  );
}

export default JobManagement;