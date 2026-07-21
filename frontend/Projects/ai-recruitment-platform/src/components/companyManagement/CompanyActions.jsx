function CompanyActions() {
  return (
    <div className="flex flex-wrap gap-2 mt-5">

      <button className="bg-blue-600 text-white px-3 py-2 rounded-lg hover:bg-blue-700">
        View
      </button>

      <button className="bg-green-600 text-white px-3 py-2 rounded-lg hover:bg-green-700">
        Verify
      </button>

      <button className="bg-yellow-500 text-white px-3 py-2 rounded-lg hover:bg-yellow-600">
        Suspend
      </button>

      <button className="bg-red-600 text-white px-3 py-2 rounded-lg hover:bg-red-700">
        Delete
      </button>

    </div>
  );
}

export default CompanyActions;