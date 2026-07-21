import JobItem from "./JobItem";

function JobList({ jobs }) {
  return (
    <div className="space-y-5">
      {jobs.map((job) => (
        <JobItem key={job.id} job={job} />
      ))}
    </div>
  );
}

export default JobList;