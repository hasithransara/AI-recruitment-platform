import { useState } from "react";
import SkillsInput from "./SkillsInput";
import AISuggestions from "./AISuggestions";
import PublishButton from "./PublishButton";

function JobForm() {
  const [skills, setSkills] = useState([]);

  const addSkill = (skill) => {
    if (!skills.includes(skill)) {
      setSkills([...skills, skill]);
    }
  };

  const removeSkill = (skill) => {
    setSkills(skills.filter((s) => s !== skill));
  };

  return (
    <div className="bg-white rounded-2xl shadow p-8 space-y-6">

      <input
        placeholder="Job Title"
        className="w-full border rounded-lg p-3"
      />

      <input
        placeholder="Company"
        className="w-full border rounded-lg p-3"
      />

      <input
        placeholder="Location"
        className="w-full border rounded-lg p-3"
      />

      <select className="w-full border rounded-lg p-3">
        <option>Full Time</option>
        <option>Part Time</option>
        <option>Internship</option>
        <option>Contract</option>
      </select>

      <input
        placeholder="Salary"
        className="w-full border rounded-lg p-3"
      />

      <textarea
        rows="6"
        placeholder="Job Description"
        className="w-full border rounded-lg p-3"
      />

      <SkillsInput
        skills={skills}
        removeSkill={removeSkill}
      />

      <AISuggestions onAddSkill={addSkill} />

      <PublishButton />

    </div>
  );
}

export default JobForm;