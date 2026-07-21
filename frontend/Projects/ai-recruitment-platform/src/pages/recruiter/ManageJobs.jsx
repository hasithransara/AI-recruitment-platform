import { useEffect, useState } from "react";
import { Link } from "react-router-dom";
import {
  Pencil,
  Plus,
  RefreshCw,
  Trash2,
  Users,
} from "lucide-react";
import { toast } from "react-toastify";

import DashboardLayout from "../../layouts/DashboardLayout";
import PageHeader from "../../components/layout/PageHeader";

import {
  deleteJob,
  getJobs,
} from "../../services/jobService";

function ManageJobs() {
  const [jobs, setJobs] = useState([]);
  const [loading, setLoading] = useState(true);
  const [deletingId, setDeletingId] = useState(null);
  const [error, setError] = useState("");

  const loadJobs = async () => {
    try {
      setLoading(true);
      setError("");

      const data = await getJobs();

      setJobs(Array.isArray(data) ? data : []);
    } catch (error) {
      console.error(
        "Load jobs error:",
        error.response?.data || error
      );

      setError(
        error.response?.data?.message ||
          error.response?.data?.title ||
          "Failed to load jobs."
      );
    } finally {
      setLoading(false);
    }
  };

  useEffect(() => {
    loadJobs();
  }, []);

  const handleDelete = async (job) => {
    const confirmed = window.confirm(
      `Are you sure you want to delete "${job.title}"?`
    );

    if (!confirmed) {
      return;
    }

    try {
      setDeletingId(job.id);

      const result = await deleteJob(job.id);

      setJobs((currentJobs) =>
        currentJobs.filter(
          (currentJob) => currentJob.id !== job.id
        )
      );

      toast.success(
        result?.message || "Job deleted successfully."
      );
    } catch (error) {
      console.error(
        "Delete job error:",
        error.response?.data || error
      );

      toast.error(
        error.response?.data?.message ||
          error.response?.data?.title ||
          "Failed to delete job."
      );
    } finally {
      setDeletingId(null);
    }
  };

  const createJobButton = (
    <Link
      to="/recruiter/create-job"
      className="flex w-full items-center justify-center gap-2 rounded-xl bg-indigo-600 px-5 py-3 text-sm font-semibold text-white shadow-sm transition hover:bg-indigo-700 active:scale-[0.98] sm:w-auto"
    >
      <Plus size={18} />
      Create Job
    </Link>
  );

  return (
    <DashboardLayout>
      <PageHeader
        title="Manage Jobs"
        subtitle="View, edit, manage applicants and delete job vacancies."
        action={createJobButton}
      />

      {loading && (
        <div className="rounded-2xl border border-gray-100 bg-white p-10 text-center shadow-sm">
          <div className="mx-auto h-9 w-9 animate-spin rounded-full border-4 border-indigo-100 border-t-indigo-600" />

          <p className="mt-4 text-sm text-gray-500">
            Loading jobs...
          </p>
        </div>
      )}

      {!loading && error && (
        <div className="rounded-2xl border border-red-200 bg-red-50 p-5 text-red-700">
          <p className="font-medium">{error}</p>

          <button
            type="button"
            onClick={loadJobs}
            className="mt-4 flex items-center gap-2 rounded-lg bg-red-600 px-4 py-2 text-sm font-medium text-white transition hover:bg-red-700"
          >
            <RefreshCw size={16} />
            Try Again
          </button>
        </div>
      )}

      {!loading && !error && jobs.length === 0 && (
        <div className="rounded-2xl border border-gray-100 bg-white p-10 text-center shadow-sm">
          <div className="mx-auto flex h-14 w-14 items-center justify-center rounded-full bg-indigo-50 text-indigo-600">
            <Plus size={25} />
          </div>

          <h2 className="mt-4 text-lg font-semibold text-gray-900">
            No jobs created yet
          </h2>

          <p className="mt-2 text-sm text-gray-500">
            Create your first vacancy to start receiving
            applications.
          </p>

          <Link
            to="/recruiter/create-job"
            className="mt-5 inline-flex items-center gap-2 rounded-lg bg-indigo-600 px-5 py-3 text-sm font-medium text-white transition hover:bg-indigo-700"
          >
            <Plus size={18} />
            Create Job
          </Link>
        </div>
      )}

      {!loading && !error && jobs.length > 0 && (
        <div className="overflow-hidden rounded-2xl border border-gray-100 bg-white shadow-sm">
          <div className="overflow-x-auto">
            <table className="min-w-[900px] w-full">
              <thead className="border-b border-gray-200 bg-gray-50">
                <tr>
                  <th className="px-6 py-4 text-left text-xs font-semibold uppercase tracking-wide text-gray-500">
                    Job
                  </th>

                  <th className="px-6 py-4 text-left text-xs font-semibold uppercase tracking-wide text-gray-500">
                    Location
                  </th>

                  <th className="px-6 py-4 text-left text-xs font-semibold uppercase tracking-wide text-gray-500">
                    Type
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
                {jobs.map((job) => (
                  <tr
                    key={job.id}
                    className="transition hover:bg-gray-50"
                  >
                    <td className="px-6 py-4">
                      <p className="font-semibold text-gray-900">
                        {job.title}
                      </p>

                      <p className="mt-1 text-sm text-gray-500">
                        {job.company}
                      </p>
                    </td>

                    <td className="px-6 py-4 text-sm text-gray-600">
                      {job.location || "Not specified"}
                    </td>

                    <td className="px-6 py-4 text-sm text-gray-600">
                      {job.jobType || "Not specified"}
                    </td>

                    <td className="px-6 py-4">
                      <span
                        className={`inline-flex rounded-full px-3 py-1 text-xs font-semibold ${
                          job.isActive
                            ? "bg-green-100 text-green-700"
                            : "bg-gray-100 text-gray-600"
                        }`}
                      >
                        {job.isActive
                          ? "Active"
                          : "Inactive"}
                      </span>
                    </td>

                    <td className="px-6 py-4">
                      <div className="flex justify-end gap-2">
                        <Link
                          to={`/recruiter/jobs/${job.id}/applicants`}
                          className="flex items-center gap-1.5 rounded-lg border border-blue-200 px-3 py-2 text-sm font-medium text-blue-600 transition hover:bg-blue-50"
                        >
                          <Users size={16} />
                          Applicants
                        </Link>

                        <Link
                          to={`/recruiter/jobs/${job.id}/edit`}
                          className="flex items-center gap-1.5 rounded-lg border border-indigo-200 px-3 py-2 text-sm font-medium text-indigo-600 transition hover:bg-indigo-50"
                        >
                          <Pencil size={16} />
                          Edit
                        </Link>

                        <button
                          type="button"
                          onClick={() =>
                            handleDelete(job)
                          }
                          disabled={
                            deletingId === job.id
                          }
                          className="flex items-center gap-1.5 rounded-lg border border-red-200 px-3 py-2 text-sm font-medium text-red-600 transition hover:bg-red-50 disabled:cursor-not-allowed disabled:opacity-50"
                        >
                          <Trash2 size={16} />

                          {deletingId === job.id
                            ? "Deleting..."
                            : "Delete"}
                        </button>
                      </div>
                    </td>
                  </tr>
                ))}
              </tbody>
            </table>
          </div>
        </div>
      )}
    </DashboardLayout>
  );
}

export default ManageJobs;