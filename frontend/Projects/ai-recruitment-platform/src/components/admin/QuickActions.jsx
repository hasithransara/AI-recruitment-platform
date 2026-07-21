function QuickActions() {
  return (
    <div className="bg-white rounded-2xl shadow border border-slate-200 p-6">

      <h2 className="text-xl font-bold mb-6">
        Quick Actions
      </h2>

      <div className="space-y-3">

        <button className="w-full bg-indigo-600 text-white py-3 rounded-lg">
          Manage Users
        </button>

        <button className="w-full border py-3 rounded-lg">
          Manage Jobs
        </button>

        <button className="w-full border py-3 rounded-lg">
          Manage Companies
        </button>

      </div>

    </div>
  );
}

export default QuickActions;