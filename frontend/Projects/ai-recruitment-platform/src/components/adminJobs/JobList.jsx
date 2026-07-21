import JobCard from "./JobCard";

function JobList({ jobs }) {
  return (
    <div className="space-y-5">
      {jobs.map((job) => (
        <JobCard key={job.id} job={job} />
      ))}
    </div>
  );
}

export default JobList;