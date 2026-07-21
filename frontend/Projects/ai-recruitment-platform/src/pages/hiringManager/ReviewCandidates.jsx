import { useEffect, useMemo, useState } from "react";
import { Eye, RefreshCw, Search } from "lucide-react";
import { useNavigate } from "react-router-dom";
import { toast } from "react-toastify";

import PageHeader from "../../components/layout/PageHeader";
import Card from "../../components/common/Card";
import { getCandidates } from "../../services/hiringManagerService";

const ReviewCandidates = () => {
  const navigate = useNavigate();

  const [candidates, setCandidates] = useState([]);
  const [loading, setLoading] = useState(true);
  const [refreshing, setRefreshing] = useState(false);
  const [searchTerm, setSearchTerm] = useState("");
  const [statusFilter, setStatusFilter] = useState("All");
  const [jobFilter, setJobFilter] = useState("All");

  useEffect(() => {
    loadCandidates();
  }, []);

  const loadCandidates = async (showRefreshLoader = false) => {
    try {
      if (showRefreshLoader) {
        setRefreshing(true);
      } else {
        setLoading(true);
      }

      const response = await getCandidates();

      setCandidates(
        Array.isArray(response.data) ? response.data : []
      );
    } catch (error) {
      console.error("Failed to load candidates:", error);

      const message =
        error.response?.data?.message ||
        "Failed to load candidates.";

      toast.error(message);
    } finally {
      setLoading(false);
      setRefreshing(false);
    }
  };

  const jobTitles = useMemo(() => {
    const titles = candidates
      .map((candidate) => candidate.jobTitle)
      .filter(Boolean);

    return [...new Set(titles)].sort();
  }, [candidates]);

  const filteredCandidates = useMemo(() => {
    const normalizedSearch = searchTerm
      .trim()
      .toLowerCase();

    return candidates.filter((candidate) => {
      const matchesSearch =
        normalizedSearch === "" ||
        candidate.candidateName
          ?.toLowerCase()
          .includes(normalizedSearch) ||
        candidate.candidateEmail
          ?.toLowerCase()
          .includes(normalizedSearch) ||
        candidate.jobTitle
          ?.toLowerCase()
          .includes(normalizedSearch) ||
        candidate.company
          ?.toLowerCase()
          .includes(normalizedSearch);

      const matchesStatus =
        statusFilter === "All" ||
        candidate.applicationStatus === statusFilter;

      const matchesJob =
        jobFilter === "All" ||
        candidate.jobTitle === jobFilter;

      return (
        matchesSearch &&
        matchesStatus &&
        matchesJob
      );
    });
  }, [
    candidates,
    searchTerm,
    statusFilter,
    jobFilter,
  ]);

  const handleReviewCandidate = (applicationId) => {
    navigate(
      `/hiring-manager/candidates/${applicationId}`
    );
  };

  const formatDate = (dateValue) => {
    if (!dateValue) {
      return "N/A";
    }

    const date = new Date(dateValue);

    if (Number.isNaN(date.getTime())) {
      return "N/A";
    }

    return date.toLocaleDateString("en-US", {
      year: "numeric",
      month: "short",
      day: "numeric",
    });
  };

  const getStatusClass = (status) => {
    switch (status?.toLowerCase()) {
      case "shortlisted":
        return "bg-blue-100 text-blue-700";

      case "hired":
        return "bg-green-100 text-green-700";

      case "rejected":
        return "bg-red-100 text-red-700";

      case "pending":
        return "bg-yellow-100 text-yellow-700";

      default:
        return "bg-gray-100 text-gray-700";
    }
  };

  const getDecisionClass = (decision) => {
    switch (decision?.toLowerCase()) {
      case "approved":
        return "bg-green-100 text-green-700";

      case "rejected":
        return "bg-red-100 text-red-700";

      case "pending":
        return "bg-yellow-100 text-yellow-700";

      default:
        return "bg-gray-100 text-gray-700";
    }
  };

  const getMatchScoreClass = (score) => {
    const numericScore = Number(score) || 0;

    if (numericScore >= 80) {
      return "bg-green-100 text-green-700";
    }

    if (numericScore >= 60) {
      return "bg-yellow-100 text-yellow-700";
    }

    return "bg-red-100 text-red-700";
  };

  return (
    <div className="space-y-6">
      <PageHeader
        title="Review Candidates"
        subtitle="Review shortlisted candidates, AI match scores, interview feedback, and hiring decisions."
      />

      <Card>
        <div className="flex flex-col gap-4 p-5 lg:flex-row lg:items-center lg:justify-between">
          <div className="relative w-full lg:max-w-md">
            <Search
              size={18}
              className="absolute left-3 top-1/2 -translate-y-1/2 text-gray-400"
            />

            <input
              type="text"
              value={searchTerm}
              onChange={(event) =>
                setSearchTerm(event.target.value)
              }
              placeholder="Search candidate, email, job, or company"
              className="w-full rounded-xl border border-gray-200 bg-white py-2.5 pl-10 pr-4 text-sm outline-none transition focus:border-blue-500 focus:ring-2 focus:ring-blue-100"
            />
          </div>

          <div className="flex flex-col gap-3 sm:flex-row">
            <select
              value={jobFilter}
              onChange={(event) =>
                setJobFilter(event.target.value)
              }
              className="rounded-xl border border-gray-200 bg-white px-4 py-2.5 text-sm outline-none focus:border-blue-500 focus:ring-2 focus:ring-blue-100"
            >
              <option value="All">All Jobs</option>

              {jobTitles.map((jobTitle) => (
                <option
                  key={jobTitle}
                  value={jobTitle}
                >
                  {jobTitle}
                </option>
              ))}
            </select>

            <select
              value={statusFilter}
              onChange={(event) =>
                setStatusFilter(event.target.value)
              }
              className="rounded-xl border border-gray-200 bg-white px-4 py-2.5 text-sm outline-none focus:border-blue-500 focus:ring-2 focus:ring-blue-100"
            >
              <option value="All">
                All Statuses
              </option>

              <option value="Shortlisted">
                Shortlisted
              </option>

              <option value="Hired">
                Hired
              </option>

              <option value="Rejected">
                Rejected
              </option>
            </select>

            <button
              type="button"
              onClick={() => loadCandidates(true)}
              disabled={refreshing}
              className="flex items-center justify-center gap-2 rounded-xl border border-gray-200 bg-white px-4 py-2.5 text-sm font-medium text-gray-700 transition hover:bg-gray-50 disabled:cursor-not-allowed disabled:opacity-60"
            >
              <RefreshCw
                size={17}
                className={
                  refreshing ? "animate-spin" : ""
                }
              />

              Refresh
            </button>
          </div>
        </div>
      </Card>

      <Card>
        <div className="border-b border-gray-100 px-5 py-4">
          <div className="flex flex-col gap-1 sm:flex-row sm:items-center sm:justify-between">
            <div>
              <h2 className="text-lg font-semibold text-gray-900">
                Candidate Applications
              </h2>

              <p className="text-sm text-gray-500">
                {filteredCandidates.length} candidate
                {filteredCandidates.length === 1
                  ? ""
                  : "s"}{" "}
                found
              </p>
            </div>
          </div>
        </div>

        {loading ? (
          <div className="flex min-h-64 items-center justify-center">
            <div className="flex flex-col items-center gap-3">
              <div className="h-10 w-10 animate-spin rounded-full border-4 border-gray-200 border-t-blue-600" />

              <p className="text-sm text-gray-500">
                Loading candidates...
              </p>
            </div>
          </div>
        ) : filteredCandidates.length === 0 ? (
          <div className="flex min-h-64 flex-col items-center justify-center px-6 text-center">
            <div className="mb-3 rounded-full bg-gray-100 p-4">
              <Search
                size={28}
                className="text-gray-400"
              />
            </div>

            <h3 className="text-lg font-semibold text-gray-900">
              No candidates found
            </h3>

            <p className="mt-1 max-w-md text-sm text-gray-500">
              No candidate applications match your
              current search and filter options.
            </p>
          </div>
        ) : (
          <>
            <div className="hidden overflow-x-auto lg:block">
              <table className="min-w-full divide-y divide-gray-100">
                <thead className="bg-gray-50">
                  <tr>
                    <th className="px-5 py-3 text-left text-xs font-semibold uppercase tracking-wide text-gray-500">
                      Candidate
                    </th>

                    <th className="px-5 py-3 text-left text-xs font-semibold uppercase tracking-wide text-gray-500">
                      Job
                    </th>

                    <th className="px-5 py-3 text-left text-xs font-semibold uppercase tracking-wide text-gray-500">
                      Applied Date
                    </th>

                    <th className="px-5 py-3 text-left text-xs font-semibold uppercase tracking-wide text-gray-500">
                      AI Match
                    </th>

                    <th className="px-5 py-3 text-left text-xs font-semibold uppercase tracking-wide text-gray-500">
                      Status
                    </th>

                    <th className="px-5 py-3 text-left text-xs font-semibold uppercase tracking-wide text-gray-500">
                      Decision
                    </th>

                    <th className="px-5 py-3 text-right text-xs font-semibold uppercase tracking-wide text-gray-500">
                      Action
                    </th>
                  </tr>
                </thead>

                <tbody className="divide-y divide-gray-100 bg-white">
                  {filteredCandidates.map(
                    (candidate) => (
                      <tr
                        key={candidate.applicationId}
                        className="transition hover:bg-gray-50"
                      >
                        <td className="px-5 py-4">
                          <div className="flex items-center gap-3">
                            <div className="flex h-10 w-10 shrink-0 items-center justify-center rounded-full bg-blue-100 text-sm font-semibold text-blue-700">
                              {candidate.candidateName
                                ?.charAt(0)
                                ?.toUpperCase() || "C"}
                            </div>

                            <div>
                              <p className="font-medium text-gray-900">
                                {candidate.candidateName}
                              </p>

                              <p className="text-sm text-gray-500">
                                {candidate.candidateEmail}
                              </p>
                            </div>
                          </div>
                        </td>

                        <td className="px-5 py-4">
                          <p className="font-medium text-gray-900">
                            {candidate.jobTitle}
                          </p>

                          <p className="text-sm text-gray-500">
                            {candidate.company}
                          </p>
                        </td>

                        <td className="px-5 py-4 text-sm text-gray-600">
                          {formatDate(
                            candidate.appliedDate
                          )}
                        </td>

                        <td className="px-5 py-4">
                          <span
                            className={`inline-flex rounded-full px-3 py-1 text-xs font-semibold ${getMatchScoreClass(
                              candidate.matchScore
                            )}`}
                          >
                            {Math.round(
                              Number(
                                candidate.matchScore
                              ) || 0
                            )}
                            %
                          </span>
                        </td>

                        <td className="px-5 py-4">
                          <span
                            className={`inline-flex rounded-full px-3 py-1 text-xs font-semibold ${getStatusClass(
                              candidate.applicationStatus
                            )}`}
                          >
                            {candidate.applicationStatus ||
                              "Unknown"}
                          </span>
                        </td>

                        <td className="px-5 py-4">
                          <span
                            className={`inline-flex rounded-full px-3 py-1 text-xs font-semibold ${getDecisionClass(
                              candidate.decision
                            )}`}
                          >
                            {candidate.decision ||
                              "Pending"}
                          </span>
                        </td>

                        <td className="px-5 py-4 text-right">
                          <button
                            type="button"
                            onClick={() =>
                              handleReviewCandidate(
                                candidate.applicationId
                              )
                            }
                            className="inline-flex items-center gap-2 rounded-lg bg-blue-600 px-4 py-2 text-sm font-medium text-white transition hover:bg-blue-700"
                          >
                            <Eye size={16} />
                            Review
                          </button>
                        </td>
                      </tr>
                    )
                  )}
                </tbody>
              </table>
            </div>

            <div className="divide-y divide-gray-100 lg:hidden">
              {filteredCandidates.map((candidate) => (
                <div
                  key={candidate.applicationId}
                  className="space-y-4 p-5"
                >
                  <div className="flex items-start gap-3">
                    <div className="flex h-11 w-11 shrink-0 items-center justify-center rounded-full bg-blue-100 font-semibold text-blue-700">
                      {candidate.candidateName
                        ?.charAt(0)
                        ?.toUpperCase() || "C"}
                    </div>

                    <div className="min-w-0 flex-1">
                      <p className="truncate font-semibold text-gray-900">
                        {candidate.candidateName}
                      </p>

                      <p className="truncate text-sm text-gray-500">
                        {candidate.candidateEmail}
                      </p>
                    </div>

                    <span
                      className={`rounded-full px-3 py-1 text-xs font-semibold ${getMatchScoreClass(
                        candidate.matchScore
                      )}`}
                    >
                      {Math.round(
                        Number(candidate.matchScore) || 0
                      )}
                      %
                    </span>
                  </div>

                  <div className="grid grid-cols-2 gap-3 text-sm">
                    <div>
                      <p className="text-gray-500">
                        Job
                      </p>

                      <p className="font-medium text-gray-900">
                        {candidate.jobTitle}
                      </p>
                    </div>

                    <div>
                      <p className="text-gray-500">
                        Applied
                      </p>

                      <p className="font-medium text-gray-900">
                        {formatDate(
                          candidate.appliedDate
                        )}
                      </p>
                    </div>

                    <div>
                      <p className="text-gray-500">
                        Status
                      </p>

                      <span
                        className={`mt-1 inline-flex rounded-full px-3 py-1 text-xs font-semibold ${getStatusClass(
                          candidate.applicationStatus
                        )}`}
                      >
                        {candidate.applicationStatus ||
                          "Unknown"}
                      </span>
                    </div>

                    <div>
                      <p className="text-gray-500">
                        Decision
                      </p>

                      <span
                        className={`mt-1 inline-flex rounded-full px-3 py-1 text-xs font-semibold ${getDecisionClass(
                          candidate.decision
                        )}`}
                      >
                        {candidate.decision ||
                          "Pending"}
                      </span>
                    </div>
                  </div>

                  <button
                    type="button"
                    onClick={() =>
                      handleReviewCandidate(
                        candidate.applicationId
                      )
                    }
                    className="flex w-full items-center justify-center gap-2 rounded-xl bg-blue-600 px-4 py-2.5 text-sm font-medium text-white transition hover:bg-blue-700"
                  >
                    <Eye size={17} />
                    Review Candidate
                  </button>
                </div>
              ))}
            </div>
          </>
        )}
      </Card>
    </div>
  );
};

export default ReviewCandidates;