function CandidateSelect({ candidates, value, onChange }) {
  return (
    <select
      value={value}
      onChange={(e) => onChange(e.target.value)}
      className="w-full border rounded-lg p-3"
    >
      {candidates.map((candidate) => (
        <option key={candidate} value={candidate}>
          {candidate}
        </option>
      ))}
    </select>
  );
}

export default CandidateSelect;