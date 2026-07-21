import { useState } from "react";
import {
  Award,
  ChevronDown,
  ChevronUp,
  FileText,
  Mail,
} from "lucide-react";

import Card from "../common/Card";
import { updateApplicationStatus } from "../../services/applicationService";
import { toast } from "react-toastify";

function ApplicantCard({ applicant, rank }) {
  const [expanded, setExpanded] = useState(false);
  const [status, setStatus] = useState(
    applicant.status || "Pending"
  );
  const [updating, setUpdating] = useState(false);

  const applicationId =
    applicant.applicationId ?? applicant.id;

  const candidateName =
    applicant.candidateName ||
    applicant.name ||
    "Unknown Candidate";

  const candidateEmail =
    applicant.candidateEmail ||
    applicant.email ||
    "Email not available";

  const matchScore = Math.round(
    applicant.matchScore ?? applicant.match ?? 0
  );

  const matchedSkills = convertSkillsToArray(
    applicant.matchedSkills
  );

  const missingSkills = convertSkillsToArray(
    applicant.missingSkills
  );

  const handleStatusChange = async (event) => {
    const newStatus = event.target.value;
    const previousStatus = status;

    try {
      setStatus(newStatus);
      setUpdating(true);

      await updateApplicationStatus(
        applicationId,
        newStatus
      );
toast.success(
  `Application status updated to ${newStatus}.`
);

    } catch (error) {
      console.error(
        "Update status error:",
        error.response?.data || error
      );

      setStatus(previousStatus);

    toast.error(
      error.response?.data?.message ||
        "Failed to update application status."
    );
  } finally {
    setUpdating(false);
  }
};

  const getScoreClasses = () => {
    if (matchScore >= 80) {
      return "bg-green-100 text-green-700";
    }

    if (matchScore >= 60) {
      return "bg-amber-100 text-amber-700";
    }

    return "bg-red-100 text-red-700";
  };

  const getRankLabel = () => {
    if (rank === 1) {
      return "Top Match";
    }

    if (rank === 2) {
      return "Second Match";
    }

    if (rank === 3) {
      return "Third Match";
    }

    return `Rank #${rank}`;
  };

  return (
    <Card>
      <div className="flex flex-col justify-between gap-6 lg:flex-row">
        <div className="flex-1">
          <div className="flex flex-wrap items-center gap-3">
            <span className="inline-flex items-center gap-1 rounded-full bg-indigo-100 px-3 py-1 text-sm font-medium text-indigo-700">
              <Award size={16} />
              {getRankLabel()}
            </span>

            <span
              className={`rounded-full px-3 py-1 text-sm font-semibold ${getScoreClasses()}`}
            >
              {matchScore}% AI Match
            </span>
          </div>

          <h2 className="mt-4 text-2xl font-bold text-gray-900">
            {candidateName}
          </h2>

          <p className="mt-2 flex items-center gap-2 text-gray-500">
            <Mail size={17} />
            {candidateEmail}
          </p>

          <div className="mt-5">
            <div className="mb-2 flex justify-between text-sm">
              <span className="font-medium text-gray-600">
                Resume match
              </span>

              <span className="font-semibold text-gray-900">
                {matchScore}%
              </span>
            </div>

            <div className="h-3 overflow-hidden rounded-full bg-gray-200">
              <div
                className="h-full rounded-full bg-indigo-600 transition-all"
                style={{
                  width: `${Math.min(
                    Math.max(matchScore, 0),
                    100
                  )}%`,
                }}
              />
            </div>
          </div>
        </div>

        <div className="flex min-w-52 flex-col gap-3">
          <label className="text-sm font-medium text-gray-600">
            Application status
          </label>

          <select
            value={status}
            onChange={handleStatusChange}
            disabled={updating}
            className="rounded-lg border border-gray-200 px-4 py-3 outline-none focus:border-indigo-500 disabled:cursor-not-allowed disabled:opacity-60"
          >
            <option value="Pending">Pending</option>
            <option value="Shortlisted">
              Shortlisted
            </option>
            <option value="Rejected">Rejected</option>
            <option value="Hired">Hired</option>
          </select>

          {applicant.resumeUrl && (
            <a
              href={applicant.resumeUrl}
              target="_blank"
              rel="noreferrer"
              className="flex items-center justify-center gap-2 rounded-lg border border-indigo-200 px-4 py-3 font-medium text-indigo-600 hover:bg-indigo-50"
            >
              <FileText size={18} />
              View Resume
            </a>
          )}
        </div>
      </div>

      <button
        type="button"
        onClick={() => setExpanded((current) => !current)}
        className="mt-6 flex items-center gap-2 text-sm font-semibold text-indigo-600 hover:text-indigo-700"
      >
        {expanded ? (
          <ChevronUp size={18} />
        ) : (
          <ChevronDown size={18} />
        )}

        {expanded
          ? "Hide AI match details"
          : "View AI match details"}
      </button>

      {expanded && (
        <div className="mt-5 grid gap-5 md:grid-cols-2">
          <div className="rounded-xl border border-green-200 bg-green-50 p-5">
            <h3 className="font-semibold text-green-800">
              Matched Skills
            </h3>

            {matchedSkills.length > 0 ? (
              <div className="mt-3 flex flex-wrap gap-2">
                {matchedSkills.map((skill) => (
                  <span
                    key={skill}
                    className="rounded-full bg-white px-3 py-1 text-sm font-medium text-green-700"
                  >
                    {skill}
                  </span>
                ))}
              </div>
            ) : (
              <p className="mt-3 text-sm text-green-700">
                No matched skills found.
              </p>
            )}
          </div>

          <div className="rounded-xl border border-red-200 bg-red-50 p-5">
            <h3 className="font-semibold text-red-800">
              Missing Skills
            </h3>

            {missingSkills.length > 0 ? (
              <div className="mt-3 flex flex-wrap gap-2">
                {missingSkills.map((skill) => (
                  <span
                    key={skill}
                    className="rounded-full bg-white px-3 py-1 text-sm font-medium text-red-700"
                  >
                    {skill}
                  </span>
                ))}
              </div>
            ) : (
              <p className="mt-3 text-sm text-red-700">
                No missing skills found.
              </p>
            )}
          </div>
        </div>
      )}
    </Card>
  );
}

function convertSkillsToArray(skills) {
  if (!skills) {
    return [];
  }

  if (Array.isArray(skills)) {
    return skills.filter(Boolean);
  }

  return skills
    .split(",")
    .map((skill) => skill.trim())
    .filter(Boolean);
}

export default ApplicantCard;