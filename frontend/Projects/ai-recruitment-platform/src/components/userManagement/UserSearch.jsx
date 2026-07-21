function UserSearch({ value, onChange }) {
  return (
    <input
      type="text"
      placeholder="Search users..."
      value={value}
      onChange={(e) => onChange(e.target.value)}
      className="w-full border rounded-xl p-4"
    />
  );
}

export default UserSearch;