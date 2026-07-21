function CompanyFilter({ value, onChange }) {
  return (
    <select
      value={value}
      onChange={(e) => onChange(e.target.value)}
      className="border rounded-xl p-3"
    >
      <option>All</option>
      <option>Verified</option>
      <option>Pending</option>
      <option>Suspended</option>
    </select>
  );
}

export default CompanyFilter;