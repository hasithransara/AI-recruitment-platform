import Card from "../common/Card";

function RecentJobCard({ job }) {
  return (
    <Card>
      <h3 className="text-xl font-semibold">{job.title}</h3>

      <p className="text-slate-500 mt-2">
        {job.applicants} Applicants
      </p>

      <button className="mt-4 bg-indigo-600 text-white px-4 py-2 rounded-lg hover:bg-indigo-700">
        View Applicants
      </button>
    </Card>
  );
}

export default RecentJobCard;