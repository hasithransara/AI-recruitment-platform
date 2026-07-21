function InterviewType({ value, onChange }) {
  return (
    <div className="flex gap-6">

      <label className="flex items-center gap-2">
        <input
          type="radio"
          value="Online"
          checked={value === "Online"}
          onChange={(e) => onChange(e.target.value)}
        />
        Online
      </label>

      <label className="flex items-center gap-2">
        <input
          type="radio"
          value="On-site"
          checked={value === "On-site"}
          onChange={(e) => onChange(e.target.value)}
        />
        On-site
      </label>

    </div>
  );
}

export default InterviewType;