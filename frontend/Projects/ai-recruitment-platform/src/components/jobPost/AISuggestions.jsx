import aiSkills from "../../data/aiSkills";

function AISuggestions({ onAddSkill }) {
  return (
    <div className="bg-slate-50 border rounded-xl p-4">
      <h3 className="font-semibold mb-3">
        🤖 AI Suggested Skills
      </h3>

      <div className="flex flex-wrap gap-2">
        {aiSkills.map((skill) => (
          <button
            key={skill}
            onClick={() => onAddSkill(skill)}
            className="bg-indigo-100 text-indigo-700 px-3 py-2 rounded-full hover:bg-indigo-200"
          >
            + {skill}
          </button>
        ))}
      </div>
    </div>
  );
}

export default AISuggestions;