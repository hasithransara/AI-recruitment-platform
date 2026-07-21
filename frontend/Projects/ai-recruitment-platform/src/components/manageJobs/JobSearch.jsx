function JobSearch({ value, onChange }) {
  return (
    <input
      type="text"
      placeholder="Search jobs..."
      value={value}
      onChange={(e) => onChange(e.target.value)}
      className="w-full border rounded-xl p-4 mb-6"
    />
  );
}

export default JobSearch;