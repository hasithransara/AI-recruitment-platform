function UserFilter({ value, onChange }) {
  return (
    <select
      value={value}
      onChange={(e) => onChange(e.target.value)}
      className="border rounded-xl p-3"
    >
      <option>All</option>
      <option>Candidate</option>
      <option>Recruiter</option>
      <option>Admin</option>
    </select>
  );
}

export default UserFilter;