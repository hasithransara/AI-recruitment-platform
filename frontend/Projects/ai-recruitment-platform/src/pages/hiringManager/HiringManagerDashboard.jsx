import { useCallback, useEffect, useState } from "react";
import {
  BriefcaseBusiness,
  CheckCircle2,
  Clock3,
  UserCheck,
  Users,
} from "lucide-react";
import { toast } from "react-toastify";

import PageHeader from "../../components/layout/PageHeader";
import StatCard from "../../components/cards/StatCard";
import Card from "../../components/common/Card";

import { getDashboard } from "../../services/hiringManagerService";

const HiringManagerDashboard = () => {
  const [dashboard, setDashboard] = useState({
    candidatesToReview: 0,
    interviewsToday: 0,
    pendingDecisions: 0,
    approved: 0,
    rejected: 0,
    recentCandidates: [],
  });

  const [loading, setLoading] = useState(true);
  const [error, setError] = useState("");

  const loadDashboard = useCallback(async () => {
    try {
      setLoading(true);
      setError("");

      const response = await getDashboard();

      setDashboard({
        candidatesToReview:
          response.data?.candidatesToReview ?? 0,

        interviewsToday:
          response.data?.interviewsToday ?? 0,

        pendingDecisions:
          response.data?.pendingDecisions ?? 0,

        approved:
          response.data?.approved ?? 0,

        rejected:
          response.data?.rejected ?? 0,

        recentCandidates:
          response.data?.recentCandidates ?? [],
      });
    } catch (err) {
      console.error(
        "Failed to load Hiring Manager dashboard:",
        err
      );

      const message =
        err.response?.data?.message ||
        "Unable to load the Hiring Manager dashboard.";

      setError(message);
      toast.error(message);
    } finally {
      setLoading(false);
    }
  }, []);

  useEffect(() => {
    loadDashboard();
  }, [loadDashboard]);

  const formatDate = (dateValue) => {
    if (!dateValue) {
      return "Not available";
    }

    return new Date(dateValue).toLocaleDateString(
      "en-US",
      {
        year: "numeric",
        month: "short",
        day: "numeric",
      }
    );
  };

  const getStatusClasses = (status) => {
    const normalizedStatus =
      status?.toLowerCase() ?? "";

    switch (normalizedStatus) {
      case "hired":
      case "approved":
        return "bg-green-100 text-green-700";

      case "rejected":
        return "bg-red-100 text-red-700";

      case "shortlisted":
        return "bg-blue-100 text-blue-700";

      case "pending":
        return "bg-yellow-100 text-yellow-700";

      default:
        return "bg-gray-100 text-gray-700";
    }
  };

  const getMatchScoreClasses = (score) => {
    const numericScore = Number(score ?? 0);

    if (numericScore >= 80) {
      return "bg-green-100 text-green-700";
    }

    if (numericScore >= 60) {
      return "bg-yellow-100 text-yellow-700";
    }

    return "bg-red-100 text-red-700";
  };

  if (loading) {
    return (
      <div className="space-y-6">
        <PageHeader
          title="Hiring Manager Dashboard"
          subtitle="Review shortlisted candidates and make hiring decisions."
        />

        <div className="flex min-h-[350px] items-center justify-center">
          <div className="text-center">
            <div className="mx-auto h-10 w-10 animate-spin rounded-full border-4 border-gray-200 border-t-blue-600" />

            <p className="mt-4 text-sm text-gray-500">
              Loading dashboard...
            </p>
          </div>
        </div>
      </div>
    );
  }

  if (error) {
    return (
      <div className="space-y-6">
        <PageHeader
          title="Hiring Manager Dashboard"
          subtitle="Review shortlisted candidates and make hiring decisions."
        />

        <Card>
          <div className="flex min-h-[250px] flex-col items-center justify-center text-center">
            <p className="text-base font-medium text-red-600">
              {error}
            </p>

            <button
              type="button"
              onClick={loadDashboard}
              className="mt-4 rounded-lg bg-blue-600 px-5 py-2.5 text-sm font-medium text-white transition hover:bg-blue-700"
            >
              Try Again
            </button>
          </div>
        </Card>
      </div>
    );
  }

  return (
    <div className="space-y-6">
      <PageHeader
        title="Hiring Manager Dashboard"
        subtitle="Review shortlisted candidates, interview feedback, and hiring decisions."
      />

      <section className="grid grid-cols-1 gap-4 sm:grid-cols-2 xl:grid-cols-5">
        <StatCard
          title="Candidates to Review"
          value={dashboard.candidatesToReview}
          icon={Users}
        />

        <StatCard
          title="Interviews Today"
          value={dashboard.interviewsToday}
          icon={BriefcaseBusiness}
        />

        <StatCard
          title="Pending Decisions"
          value={dashboard.pendingDecisions}
          icon={Clock3}
        />

        <StatCard
          title="Approved"
          value={dashboard.approved}
          icon={UserCheck}
        />

        <StatCard
          title="Rejected"
          value={dashboard.rejected}
          icon={CheckCircle2}
        />
      </section>

      <Card>
        <div className="flex flex-col gap-2 border-b border-gray-100 pb-4 sm:flex-row sm:items-center sm:justify-between">
          <div>
            <h2 className="text-lg font-semibold text-gray-900">
              Recent Candidates
            </h2>

            <p className="mt-1 text-sm text-gray-500">
              Recently shortlisted candidates waiting for review.
            </p>
          </div>

          <button
            type="button"
            onClick={loadDashboard}
            className="w-fit rounded-lg border border-gray-200 px-4 py-2 text-sm font-medium text-gray-700 transition hover:bg-gray-50"
          >
            Refresh
          </button>
        </div>

        {dashboard.recentCandidates.length === 0 ? (
          <div className="flex min-h-[240px] flex-col items-center justify-center text-center">
            <Users
              size={42}
              className="text-gray-300"
            />

            <h3 className="mt-4 text-base font-semibold text-gray-800">
              No recent candidates
            </h3>

            <p className="mt-1 max-w-md text-sm text-gray-500">
              Shortlisted candidates will appear here after
              recruiters update their application status.
            </p>
          </div>
        ) : (
          <div className="mt-4 overflow-x-auto">
            <table className="min-w-full divide-y divide-gray-200">
              <thead>
                <tr className="bg-gray-50">
                  <th className="whitespace-nowrap px-4 py-3 text-left text-xs font-semibold uppercase tracking-wide text-gray-500">
                    Candidate
                  </th>

                  <th className="whitespace-nowrap px-4 py-3 text-left text-xs font-semibold uppercase tracking-wide text-gray-500">
                    Job
                  </th>

                  <th className="whitespace-nowrap px-4 py-3 text-left text-xs font-semibold uppercase tracking-wide text-gray-500">
                    Applied Date
                  </th>

                  <th className="whitespace-nowrap px-4 py-3 text-left text-xs font-semibold uppercase tracking-wide text-gray-500">
                    AI Match
                  </th>

                  <th className="whitespace-nowrap px-4 py-3 text-left text-xs font-semibold uppercase tracking-wide text-gray-500">
                    Status
                  </th>

                  <th className="whitespace-nowrap px-4 py-3 text-left text-xs font-semibold uppercase tracking-wide text-gray-500">
                    Decision
                  </th>
                </tr>
              </thead>

              <tbody className="divide-y divide-gray-100 bg-white">
                {dashboard.recentCandidates.map(
                  (candidate) => (
                    <tr
                      key={candidate.applicationId}
                      className="transition hover:bg-gray-50"
                    >
                      <td className="whitespace-nowrap px-4 py-4">
                        <div>
                          <p className="text-sm font-semibold text-gray-900">
                            {candidate.candidateName ||
                              "Unknown candidate"}
                          </p>

                          <p className="mt-1 text-xs text-gray-500">
                            {candidate.candidateEmail ||
                              "No email"}
                          </p>
                        </div>
                      </td>

                      <td className="whitespace-nowrap px-4 py-4">
                        <p className="text-sm font-medium text-gray-800">
                          {candidate.jobTitle ||
                            "Unknown job"}
                        </p>

                        <p className="mt-1 text-xs text-gray-500">
                          {candidate.company ||
                            "Unknown company"}
                        </p>
                      </td>

                      <td className="whitespace-nowrap px-4 py-4 text-sm text-gray-600">
                        {formatDate(
                          candidate.appliedDate
                        )}
                      </td>

                      <td className="whitespace-nowrap px-4 py-4">
                        <span
                          className={`inline-flex rounded-full px-3 py-1 text-xs font-semibold ${getMatchScoreClasses(
                            candidate.matchScore
                          )}`}
                        >
                          {Math.round(
                            Number(
                              candidate.matchScore ?? 0
                            )
                          )}
                          %
                        </span>
                      </td>

                      <td className="whitespace-nowrap px-4 py-4">
                        <span
                          className={`inline-flex rounded-full px-3 py-1 text-xs font-semibold ${getStatusClasses(
                            candidate.applicationStatus
                          )}`}
                        >
                          {candidate.applicationStatus ||
                            "Pending"}
                        </span>
                      </td>

                      <td className="whitespace-nowrap px-4 py-4">
                        <span
                          className={`inline-flex rounded-full px-3 py-1 text-xs font-semibold ${getStatusClasses(
                            candidate.decision
                          )}`}
                        >
                          {candidate.decision ||
                            "Pending"}
                        </span>
                      </td>
                    </tr>
                  )
                )}
              </tbody>
            </table>
          </div>
        )}
      </Card>
    </div>
  );
};

export default HiringManagerDashboard;