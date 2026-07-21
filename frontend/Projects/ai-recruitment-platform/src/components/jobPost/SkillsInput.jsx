function SkillsInput({ skills, removeSkill }) {
  return (
    <div className="flex flex-wrap gap-2 mt-3">
      {skills.map((skill, index) => (
        <span
          key={index}
          className="bg-indigo-600 text-white px-3 py-2 rounded-full flex items-center gap-2"
        >
          {skill}

          <button
            onClick={() => removeSkill(skill)}
            className="font-bold"
          >
            ×
          </button>
        </span>
      ))}
    </div>
  );
}

export default SkillsInput;