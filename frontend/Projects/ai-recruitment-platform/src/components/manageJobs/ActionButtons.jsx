function ActionButtons() {
  return (
    <div className="flex gap-3 mt-5">

      <button className="bg-blue-600 text-white px-4 py-2 rounded-lg">
        Edit
      </button>

      <button className="bg-red-600 text-white px-4 py-2 rounded-lg">
        Delete
      </button>

      <button className="bg-green-600 text-white px-4 py-2 rounded-lg">
        View Applicants
      </button>

    </div>
  );
}

export default ActionButtons;