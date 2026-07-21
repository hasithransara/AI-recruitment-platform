function JobActions() {
  return (
    <div className="flex flex-wrap gap-2 mt-5">

      <button className="bg-blue-600 text-white px-3 py-2 rounded-lg">
        View
      </button>

      <button className="bg-green-600 text-white px-3 py-2 rounded-lg">
        Approve
      </button>

      <button className="bg-yellow-500 text-white px-3 py-2 rounded-lg">
        Reject
      </button>

      <button className="bg-red-600 text-white px-3 py-2 rounded-lg">
        Delete
      </button>

    </div>
  );
}

export default JobActions;