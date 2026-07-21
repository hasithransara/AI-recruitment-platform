function JobFilter() {
  const filters = [
    "All",
    "Remote",
    "Hybrid",
    "Onsite",
  ];

  return (
    <div className="flex gap-3 mb-8">
      {filters.map((filter) => (
        <button
          key={filter}
          className="px-5 py-2 rounded-full bg-white border hover:bg-indigo-600 hover:text-white transition"
        >
          {filter}
        </button>
      ))}
    </div>
  );
}

export default JobFilter;