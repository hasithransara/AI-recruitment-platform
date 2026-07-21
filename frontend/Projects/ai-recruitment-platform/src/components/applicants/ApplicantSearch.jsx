function ApplicantSearch({ value, onChange }) {
  return (
    <input
      type="text"
      placeholder="Search candidates..."
      value={value}
      onChange={(e) => onChange(e.target.value)}
      className="w-full border rounded-xl p-4 mb-6"
    />
  );
}

export default ApplicantSearch;