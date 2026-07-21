function JobFilter({ value, onChange }) {
  return (
    <select
      value={value}
      onChange={(e) => onChange(e.target.value)}
      className="border rounded-xl p-3"
    >
      <option>All</option>
      <option>Pending</option>
      <option>Approved</option>
      <option>Rejected</option>
    </select>
  );
}

export default JobFilter;