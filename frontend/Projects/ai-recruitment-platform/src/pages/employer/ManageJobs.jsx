import { useState } from "react";

import jobsData from "../../data/manageJobs";
import JobSearch from "../../components/manageJobs/JobSearch";
import JobList from "../../components/manageJobs/JobList";

function ManageJobs() {
  const [search, setSearch] = useState("");

  const filteredJobs = jobsData.filter((job) =>
    job.title.toLowerCase().includes(search.toLowerCase())
  );

  return (
    <div className="min-h-screen bg-slate-100 p-8">

      <h1 className="text-4xl font-bold mb-2">
        Manage Jobs
      </h1>

      <p className="text-slate-500 mb-8">
        View and manage all posted jobs.
      </p>

      <JobSearch
        value={search}
        onChange={setSearch}
      />

      <JobList jobs={filteredJobs} />

    </div>
  );
}

export default ManageJobs;