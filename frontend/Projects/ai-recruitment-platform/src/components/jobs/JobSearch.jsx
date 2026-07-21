import { Search } from "lucide-react";

function JobSearch() {
  return (
    <div className="relative mb-6">
      <Search
        className="absolute left-4 top-4 text-gray-400"
        size={20}
      />

      <input
        type="text"
        placeholder="Search jobs..."
        className="w-full pl-12 pr-4 py-3 rounded-xl border border-gray-300 focus:outline-none focus:ring-2 focus:ring-indigo-500"
      />
    </div>
  );
}

export default JobSearch;