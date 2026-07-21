import { useState } from "react";
import candidates from "../../data/interviews";

import CandidateSelect from "./CandidateSelect";
import InterviewType from "./InterviewType";
import ScheduleButton from "./ScheduleButton";

function InterviewForm() {
  const [candidate, setCandidate] = useState(candidates[0]);
  const [type, setType] = useState("Online");

  return (
    <div className="bg-white rounded-2xl shadow p-8 space-y-6">

      <div>
        <label className="block mb-2 font-medium">Candidate</label>
        <CandidateSelect
          candidates={candidates}
          value={candidate}
          onChange={setCandidate}
        />
      </div>

      <div>
        <label className="block mb-2 font-medium">Interview Date</label>
        <input
          type="date"
          className="w-full border rounded-lg p-3"
        />
      </div>

      <div>
        <label className="block mb-2 font-medium">Interview Time</label>
        <input
          type="time"
          className="w-full border rounded-lg p-3"
        />
      </div>

      <div>
        <label className="block mb-2 font-medium">Interview Type</label>
        <InterviewType
          value={type}
          onChange={setType}
        />
      </div>

      <div>
        <label className="block mb-2 font-medium">
          Meeting Link / Location
        </label>
        <input
          type="text"
          placeholder="Enter meeting URL or office location"
          className="w-full border rounded-lg p-3"
        />
      </div>

      <div>
        <label className="block mb-2 font-medium">Notes</label>
        <textarea
          rows="4"
          placeholder="Add interview notes..."
          className="w-full border rounded-lg p-3"
        />
      </div>

      <ScheduleButton />

    </div>
  );
}

export default InterviewForm;