import Card from "../common/Card";
import ActionButtons from "./ActionButtons";

function JobItem({ job }) {
  return (
    <Card>
      <h2 className="text-2xl font-bold">
        {job.title}
      </h2>

      <p className="mt-2 text-gray-600">
        {job.company}
      </p>

      <p className="text-gray-500">
        {job.location}
      </p>

      <div className="flex gap-4 mt-4">
        <span className="bg-indigo-100 text-indigo-700 px-3 py-1 rounded-full">
          {job.type}
        </span>

        <span className="bg-green-100 text-green-700 px-3 py-1 rounded-full">
          {job.applicants} Applicants
        </span>
      </div>

      <ActionButtons />
    </Card>
  );
}

export default JobItem;