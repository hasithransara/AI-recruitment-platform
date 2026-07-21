import { useEffect, useMemo, useState } from "react";
import { Link, useParams } from "react-router-dom";
import {
  ArrowLeft,
  Search,
  Users,
} from "lucide-react";

import DashboardLayout from "../../layouts/DashboardLayout";
import PageHeader from "../../components/layout/PageHeader";
import ApplicantList from "../../components/applicants/ApplicantList";
import { getApplicantsByJob } from "../../services/applicationService";

function ViewApplicants() {
  const { jobId } = useParams();

  const [applicants, setApplicants] = useState([]);
  const [search, setSearch] = useState("");
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState("");

  useEffect(() => {
    const loadApplicants = async () => {
      try {
        setLoading(true);
        setError("");

        const data = await getApplicantsByJob(jobId);

console.log("Applicants API response:", data);

const applicantData = Array.isArray(data)
  ? data
  : data?.applicants ||
    data?.applications ||
    data?.data ||
    [];

const sortedApplicants = [...applicantData].sort(
  (a, b) =>
    (Number(b.matchScore) || 0) -
    (Number(a.matchScore) || 0)
);

setApplicants(sortedApplicants);
      } catch (error) {
        console.error(
          "Load applicants error:",
          error.response?.data || error
        );

        setError(
          error.response?.data?.message ||
            "Failed to load applicants."
        );
      } finally {
        setLoading(false);
      }
    };

    loadApplicants();
  }, [jobId]);

  const filteredApplicants = useMemo(() => {
    const searchValue = search.trim().toLowerCase();

    if (!searchValue) {
      return applicants;
    }

    return applicants.filter((applicant) => {
      const name =
        applicant.candidateName ||
        applicant.name ||
        "";

      const email =
        applicant.candidateEmail ||
        applicant.email ||
        "";

      return (
        name.toLowerCase().includes(searchValue) ||
        email.toLowerCase().includes(searchValue)
      );
    });
  }, [applicants, search]);

  return (
    <DashboardLayout>
      <div className="mb-6">
        <Link
          to="/recruiter/jobs"
          className="mb-4 inline-flex items-center gap-2 text-sm font-medium text-indigo-600 hover:text-indigo-700"
        >
          <ArrowLeft size={18} />
          Back to jobs
        </Link>

        <PageHeader
          title="Job Applicants"
          subtitle="Review candidates ranked by their AI resume match score."
        />
      </div>

      <div className="mb-6 rounded-xl bg-white p-4 shadow-sm">
        <div className="relative">
          <Search
            size={20}
            className="absolute left-4 top-1/2 -translate-y-1/2 text-gray-400"
          />

          <input
            type="text"
            value={search}
            onChange={(event) =>
              setSearch(event.target.value)
            }
            placeholder="Search by candidate name or email..."
            className="w-full rounded-lg border border-gray-200 py-3 pl-12 pr-4 outline-none transition focus:border-indigo-500 focus:ring-2 focus:ring-indigo-100"
          />
        </div>
      </div>

      {loading && (
        <div className="rounded-xl bg-white p-10 text-center shadow-sm">
          <p className="text-gray-500">
            Loading applicants...
          </p>
        </div>
      )}

      {!loading && error && (
        <div className="rounded-xl border border-red-200 bg-red-50 p-5 text-red-600">
          {error}
        </div>
      )}

      {!loading &&
        !error &&
        applicants.length === 0 && (
          <div className="rounded-xl bg-white p-12 text-center shadow-sm">
            <Users
              size={48}
              className="mx-auto mb-4 text-gray-300"
            />

            <h2 className="text-xl font-semibold text-gray-800">
              No applicants yet
            </h2>

            <p className="mt-2 text-gray-500">
              Candidates who apply for this job will appear here.
            </p>
          </div>
        )}

      {!loading &&
        !error &&
        applicants.length > 0 &&
        filteredApplicants.length === 0 && (
          <div className="rounded-xl bg-white p-10 text-center shadow-sm">
            <p className="text-gray-500">
              No applicants match your search.
            </p>
          </div>
        )}

      {!loading &&
        !error &&
        filteredApplicants.length > 0 && (
          <ApplicantList
            applicants={filteredApplicants}
          />
        )}
    </DashboardLayout>
  );
}

export default ViewApplicants;