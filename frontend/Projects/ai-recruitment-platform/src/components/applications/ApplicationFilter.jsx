function ApplicationFilter({ selected, onSelect }) {
  const filters = [
    "All",
    "Interview",
    "Reviewing",
    "Shortlisted",
    "Rejected",
  ];

  return (
    <div className="flex flex-wrap gap-3 mb-6">
      {filters.map((filter) => (
        <button
          key={filter}
          onClick={() => onSelect(filter)}
          className={`px-5 py-2 rounded-full transition ${
            selected === filter
              ? "bg-indigo-600 text-white"
              : "bg-white border hover:bg-indigo-50"
          }`}
        >
          {filter}
        </button>
      ))}
    </div>
  );
}

export default ApplicationFilter;