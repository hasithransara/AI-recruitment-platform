import { useState } from "react";

import Card from "../common/Card";
import StatusBadge from "./StatusBadge";

import {
  Building2,
  CalendarDays,
  ArrowRight,
  CheckCircle2,
  XCircle,
  Target,
} from "lucide-react";

function ApplicationCard({ application }) {
  const [showDetails, setShowDetails] = useState(false);

  const appliedDate = application.appliedDate
    ? new Date(application.appliedDate).toLocaleDateString()
    : "Not available";

  const matchScore =
    application.matchScore !== null &&
    application.matchScore !== undefined
      ? Number(application.matchScore)
      : 0;

  const matchedSkills = application.matchedSkills
    ? application.matchedSkills
        .split(",")
        .map((skill) => skill.trim())
        .filter(Boolean)
    : [];

  const missingSkills = application.missingSkills
    ? application.missingSkills
        .split(",")
        .map((skill) => skill.trim())
        .filter(Boolean)
    : [];

  const getScoreClasses = () => {
    if (matchScore >= 75) {
      return {
        text: "text-green-600",
        background: "bg-green-100",
        progress: "bg-green-500",
      };
    }

    if (matchScore >= 50) {
      return {
        text: "text-yellow-600",
        background: "bg-yellow-100",
        progress: "bg-yellow-500",
      };
    }

    return {
      text: "text-red-600",
      background: "bg-red-100",
      progress: "bg-red-500",
    };
  };

  const scoreClasses = getScoreClasses();
  console.log(application);

  return (
    <Card className="transition hover:shadow-md">
      <div className="flex flex-col gap-6">
        <div className="flex flex-col justify-between gap-4 md:flex-row md:items-start">
          <div>
            <h2 className="text-xl font-bold text-slate-900">
              {application.jobTitle}
            </h2>

            <div className="mt-2 flex items-center gap-2 text-slate-600">
              <Building2 size={18} />
              <span>{application.company}</span>
            </div>

            <div className="mt-2 flex items-center gap-2 text-slate-500">
              <CalendarDays size={18} />
              <span>Applied: {appliedDate}</span>
            </div>

            <div className="mt-4">
              <StatusBadge status={application.status} />
            </div>
          </div>

          <div className="w-full md:w-64">
            <div
              className={`rounded-xl p-4 ${scoreClasses.background}`}
            >
              <div className="flex items-center justify-between">
                <div className="flex items-center gap-2">
                  <Target
                    size={20}
                    className={scoreClasses.text}
                  />

                  <span className="font-semibold text-slate-700">
                    AI Match
                  </span>
                </div>

                <span
                  className={`text-2xl font-bold ${scoreClasses.text}`}
                >
                  {matchScore.toFixed(1)}%
                </span>
              </div>

              <div className="mt-3 h-2 overflow-hidden rounded-full bg-white">
                <div
                  className={`h-full rounded-full transition-all duration-500 ${scoreClasses.progress}`}
                  style={{
                    width: `${Math.min(matchScore, 100)}%`,
                  }}
                />
              </div>
            </div>

            <button
              type="button"
              onClick={() => setShowDetails(!showDetails)}
              className="mt-3 flex w-full items-center justify-center gap-2 rounded-lg bg-indigo-600 px-4 py-2 text-white transition hover:bg-indigo-700"
            >
              {showDetails ? "Hide Details" : "View Details"}

              <ArrowRight
                size={18}
                className={`transition-transform ${
                  showDetails ? "rotate-90" : ""
                }`}
              />
            </button>
          </div>
        </div>

        {showDetails && (
          <div className="grid gap-5 border-t border-slate-200 pt-5 md:grid-cols-2">
            <div className="rounded-xl border border-green-200 bg-green-50 p-4">
              <div className="mb-3 flex items-center gap-2">
                <CheckCircle2
                  size={20}
                  className="text-green-600"
                />

                <h3 className="font-semibold text-green-700">
                  Matched Skills
                </h3>
              </div>

              {matchedSkills.length > 0 ? (
                <div className="flex flex-wrap gap-2">
                  {matchedSkills.map((skill) => (
                    <span
                      key={skill}
                      className="rounded-full bg-green-100 px-3 py-1 text-sm font-medium text-green-700"
                    >
                      {skill}
                    </span>
                  ))}
                </div>
              ) : (
                <p className="text-sm text-slate-500">
                  No matched skills were found.
                </p>
              )}
            </div>

            <div className="rounded-xl border border-red-200 bg-red-50 p-4">
              <div className="mb-3 flex items-center gap-2">
                <XCircle
                  size={20}
                  className="text-red-600"
                />

                <h3 className="font-semibold text-red-700">
                  Missing Skills
                </h3>
              </div>

              {missingSkills.length > 0 ? (
                <div className="flex flex-wrap gap-2">
                  {missingSkills.map((skill) => (
                    <span
                      key={skill}
                      className="rounded-full bg-red-100 px-3 py-1 text-sm font-medium text-red-700"
                    >
                      {skill}
                    </span>
                  ))}
                </div>
              ) : (
                <p className="text-sm text-slate-500">
                  No missing skills were found.
                </p>
              )}
            </div>
          </div>
        )}
      </div>
    </Card>
  );
}

export default ApplicationCard;