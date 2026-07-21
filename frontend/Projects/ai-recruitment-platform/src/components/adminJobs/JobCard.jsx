import Card from "../common/Card";
import JobActions from "./JobActions";

function JobCard({ job }) {
  return (
    <Card>
      <h2 className="text-2xl font-bold">{job.title}</h2>

      <p className="text-gray-600 mt-2">{job.company}</p>

      <p className="text-gray-500">{job.location}</p>

      <span
        className={`inline-block mt-4 px-3 py-1 rounded-full text-white ${
          job.status === "Approved"
            ? "bg-green-500"
            : job.status === "Pending"
            ? "bg-yellow-500"
            : "bg-red-500"
        }`}
      >
        {job.status}
      </span>

      <JobActions />
    </Card>
  );
}

export default JobCard;