import { useState } from "react";
import { Save } from "lucide-react";
import { toast } from "react-toastify";

import DashboardLayout from "../../layouts/DashboardLayout";
import PageHeader from "../../components/layout/PageHeader";

function InterviewFeedback() {
  const [feedback, setFeedback] = useState({
    candidate: "",
    technicalScore: "",
    communicationScore: "",
    problemSolvingScore: "",
    cultureFitScore: "",
    comments: "",
    recommendation: "Pending",
  });

  const handleChange = (event) => {
    const { name, value } = event.target;

    setFeedback((current) => ({
      ...current,
      [name]: value,
    }));
  };

  const handleSubmit = (event) => {
    event.preventDefault();

    toast.success("Interview feedback saved successfully.");
  };

  const inputClassName =
    "w-full rounded-xl border border-gray-300 bg-white px-4 py-3 text-sm outline-none transition focus:border-indigo-500 focus:ring-4 focus:ring-indigo-100";

  return (
    <DashboardLayout>
      <PageHeader
        title="Interview Feedback"
        subtitle="Record interview evaluations and recommendations."
      />

      <form
        onSubmit={handleSubmit}
        className="rounded-2xl border border-gray-100 bg-white p-5 shadow-sm sm:p-8"
      >
        <div className="grid grid-cols-1 gap-5 md:grid-cols-2">
          <div className="md:col-span-2">
            <label
              htmlFor="candidate"
              className="mb-2 block text-sm font-semibold text-gray-700"
            >
              Candidate
            </label>

            <select
              id="candidate"
              name="candidate"
              value={feedback.candidate}
              onChange={handleChange}
              className={inputClassName}
              required
            >
              <option value="">Select a candidate</option>
              <option value="Nimal Perera">
                Nimal Perera
              </option>
              <option value="Kasuni Silva">
                Kasuni Silva
              </option>
              <option value="Dilan Fernando">
                Dilan Fernando
              </option>
            </select>
          </div>

          <ScoreField
            label="Technical Score"
            name="technicalScore"
            value={feedback.technicalScore}
            onChange={handleChange}
            className={inputClassName}
          />

          <ScoreField
            label="Communication Score"
            name="communicationScore"
            value={feedback.communicationScore}
            onChange={handleChange}
            className={inputClassName}
          />

          <ScoreField
            label="Problem-Solving Score"
            name="problemSolvingScore"
            value={feedback.problemSolvingScore}
            onChange={handleChange}
            className={inputClassName}
          />

          <ScoreField
            label="Culture Fit Score"
            name="cultureFitScore"
            value={feedback.cultureFitScore}
            onChange={handleChange}
            className={inputClassName}
          />

          <div className="md:col-span-2">
            <label
              htmlFor="recommendation"
              className="mb-2 block text-sm font-semibold text-gray-700"
            >
              Recommendation
            </label>

            <select
              id="recommendation"
              name="recommendation"
              value={feedback.recommendation}
              onChange={handleChange}
              className={inputClassName}
            >
              <option value="Pending">Pending</option>
              <option value="Recommend Hire">
                Recommend Hire
              </option>
              <option value="Recommend Reject">
                Recommend Reject
              </option>
              <option value="Second Interview">
                Second Interview
              </option>
            </select>
          </div>

          <div className="md:col-span-2">
            <label
              htmlFor="comments"
              className="mb-2 block text-sm font-semibold text-gray-700"
            >
              Interview Comments
            </label>

            <textarea
              id="comments"
              name="comments"
              value={feedback.comments}
              onChange={handleChange}
              rows={7}
              placeholder="Enter strengths, concerns and interview observations."
              className={`${inputClassName} resize-y`}
              required
            />
          </div>
        </div>

        <div className="mt-6 flex flex-col gap-3 border-t border-gray-100 pt-5 sm:flex-row sm:justify-end">
          <button
            type="submit"
            className="flex w-full items-center justify-center gap-2 rounded-xl bg-indigo-600 px-6 py-3 text-sm font-semibold text-white transition hover:bg-indigo-700 sm:w-auto"
          >
            <Save size={18} />
            Save Feedback
          </button>
        </div>
      </form>
    </DashboardLayout>
  );
}

function ScoreField({
  label,
  name,
  value,
  onChange,
  className,
}) {
  return (
    <div>
      <label
        htmlFor={name}
        className="mb-2 block text-sm font-semibold text-gray-700"
      >
        {label}
      </label>

      <input
        id={name}
        type="number"
        name={name}
        value={value}
        onChange={onChange}
        min="0"
        max="10"
        step="1"
        placeholder="Score out of 10"
        className={className}
        required
      />
    </div>
  );
}

export default InterviewFeedback;