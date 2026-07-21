function ApplicantActions() {
  return (
    <div className="flex flex-wrap gap-3 mt-5">

      <button className="bg-indigo-600 text-white px-4 py-2 rounded-lg hover:bg-indigo-700">
        View Profile
      </button>

      <button className="bg-green-600 text-white px-4 py-2 rounded-lg hover:bg-green-700">
        Schedule Interview
      </button>

      <button className="bg-red-600 text-white px-4 py-2 rounded-lg hover:bg-red-700">
        Reject
      </button>

    </div>
  );
}

export default ApplicantActions;