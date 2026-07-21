import { useState } from "react";
import {
  CheckCircle2,
  Clock3,
  Save,
  XCircle,
} from "lucide-react";
import { toast } from "react-toastify";

import DashboardLayout from "../../layouts/DashboardLayout";
import PageHeader from "../../components/layout/PageHeader";

function HiringDecisions() {
  const [decisions, setDecisions] = useState([
    {
      id: 1,
      candidateName: "Nimal Perera",
      jobTitle: "Software Engineer",
      interviewScore: 8.8,
      status: "Pending",
    },
    {
      id: 2,
      candidateName: "Kasuni Silva",
      jobTitle: "Business Analyst",
      interviewScore: 8.4,
      status: "Pending",
    },
    {
      id: 3,
      candidateName: "Dilan Fernando",
      jobTitle: "QA Engineer",
      interviewScore: 7.9,
      status: "Pending",
    },
  ]);

  const updateDecision = (candidateId, status) => {
    setDecisions((currentDecisions) =>
      currentDecisions.map((candidate) =>
        candidate.id === candidateId
          ? { ...candidate, status }
          : candidate
      )
    );

    toast.success(`Candidate marked as ${status}.`);
  };

  const getStatusClassName = (status) => {
    if (status === "Approved") {
      return "bg-green-100 text-green-700";
    }

    if (status === "Rejected") {
      return "bg-red-100 text-red-700";
    }

    return "bg-amber-100 text-amber-700";
  };

  return (
    <DashboardLayout>
      <PageHeader
        title="Hiring Decisions"
        subtitle="Approve, reject or keep evaluated candidates pending."
      />

      <div className="overflow-hidden rounded-2xl border border-gray-100 bg-white shadow-sm">
        <div className="overflow-x-auto">
          <table className="min-w-[850px] w-full">
            <thead className="border-b border-gray-200 bg-gray-50">
              <tr>
                <th className="px-6 py-4 text-left text-xs font-semibold uppercase tracking-wide text-gray-500">
                  Candidate
                </th>

                <th className="px-6 py-4 text-left text-xs font-semibold uppercase tracking-wide text-gray-500">
                  Position
                </th>

                <th className="px-6 py-4 text-left text-xs font-semibold uppercase tracking-wide text-gray-500">
                  Interview Score
                </th>

                <th className="px-6 py-4 text-left text-xs font-semibold uppercase tracking-wide text-gray-500">
                  Status
                </th>

                <th className="px-6 py-4 text-right text-xs font-semibold uppercase tracking-wide text-gray-500">
                  Actions
                </th>
              </tr>
            </thead>

            <tbody className="divide-y divide-gray-100">
              {decisions.map((candidate) => (
                <tr
                  key={candidate.id}
                  className="transition hover:bg-gray-50"
                >
                  <td className="px-6 py-4 font-semibold text-gray-900">
                    {candidate.candidateName}
                  </td>

                  <td className="px-6 py-4 text-sm text-gray-600">
                    {candidate.jobTitle}
                  </td>

                  <td className="px-6 py-4">
                    <span className="font-semibold text-indigo-600">
                      {candidate.interviewScore}/10
                    </span>
                  </td>

                  <td className="px-6 py-4">
                    <span
                      className={`inline-flex rounded-full px-3 py-1 text-xs font-semibold ${getStatusClassName(
                        candidate.status
                      )}`}
                    >
                      {candidate.status}
                    </span>
                  </td>

                  <td className="px-6 py-4">
                    <div className="flex justify-end gap-2">
                      <button
                        type="button"
                        onClick={() =>
                          updateDecision(
                            candidate.id,
                            "Approved"
                          )
                        }
                        className="flex items-center gap-1.5 rounded-lg border border-green-200 px-3 py-2 text-sm font-medium text-green-600 transition hover:bg-green-50"
                      >
                        <CheckCircle2 size={16} />
                        Approve
                      </button>

                      <button
                        type="button"
                        onClick={() =>
                          updateDecision(
                            candidate.id,
                            "Rejected"
                          )
                        }
                        className="flex items-center gap-1.5 rounded-lg border border-red-200 px-3 py-2 text-sm font-medium text-red-600 transition hover:bg-red-50"
                      >
                        <XCircle size={16} />
                        Reject
                      </button>

                      <button
                        type="button"
                        onClick={() =>
                          updateDecision(
                            candidate.id,
                            "Pending"
                          )
                        }
                        className="flex items-center gap-1.5 rounded-lg border border-amber-200 px-3 py-2 text-sm font-medium text-amber-600 transition hover:bg-amber-50"
                      >
                        <Clock3 size={16} />
                        Pending
                      </button>
                    </div>
                  </td>
                </tr>
              ))}
            </tbody>
          </table>
        </div>

        <div className="flex justify-end border-t border-gray-100 bg-gray-50 p-5">
          <button
            type="button"
            onClick={() =>
              toast.success(
                "Hiring decisions saved successfully."
              )
            }
            className="flex items-center gap-2 rounded-xl bg-indigo-600 px-6 py-3 text-sm font-semibold text-white transition hover:bg-indigo-700"
          >
            <Save size={18} />
            Save Decisions
          </button>
        </div>
      </div>
    </DashboardLayout>
  );
}

export default HiringDecisions;