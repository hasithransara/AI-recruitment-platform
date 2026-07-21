function QuickActions() {
  return (
    <div className="bg-white rounded-2xl shadow border border-slate-200 p-6">

      <h2 className="text-xl font-bold mb-6">
        Quick Actions
      </h2>

      <div className="space-y-3">

        <button className="w-full bg-indigo-600 text-white py-3 rounded-lg hover:bg-indigo-700">
          + Post New Job
        </button>

        <button className="w-full border py-3 rounded-lg hover:bg-slate-100">
          View Applicants
        </button>

        <button className="w-full border py-3 rounded-lg hover:bg-slate-100">
          Schedule Interviews
        </button>

      </div>

    </div>
  );
}

export default QuickActions;