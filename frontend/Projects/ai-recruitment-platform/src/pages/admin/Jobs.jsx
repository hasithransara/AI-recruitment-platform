import { useEffect, useMemo, useState } from "react";
import {
  BriefcaseBusiness,
  Search,
  Trash2,
} from "lucide-react";
import { toast } from "react-toastify";

import DashboardLayout from "../../layouts/DashboardLayout";
import PageHeader from "../../components/layout/PageHeader";

import {
  deleteAdminJob,
  getAdminJobs,
  updateAdminJobStatus,
} from "../../services/adminService";

const statusOptions = ["Active", "Inactive"];

function AdminJobs() {
  const [jobs, setJobs] = useState([]);
  const [search, setSearch] = useState("");
  const [statusFilter, setStatusFilter] = useState("All");
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState("");

  const [updatingJobId, setUpdatingJobId] = useState(null);
  const [deletingJobId, setDeletingJobId] = useState(null);

  useEffect(() => {
    loadJobs();
  }, []);

  const loadJobs = async () => {
    try {
      setLoading(true);
      setError("");

      const response = await getAdminJobs();

      const jobsData = Array.isArray(response)
        ? response
        : response?.jobs || [];

      setJobs(jobsData);
    } catch (error) {
      console.error(
        "Admin jobs error:",
        error.response?.data || error
      );

      if (error.response?.status === 401) {
        setError(
          "Your session has expired. Please log in again."
        );
      } else if (error.response?.status === 403) {
        setError(
          "You do not have permission to manage jobs."
        );
      } else {
        setError(
          error.response?.data?.message ||
            "Failed to load jobs."
        );
      }
    } finally {
      setLoading(false);
    }
  };

  const filteredJobs = useMemo(() => {
    const searchValue = search.trim().toLowerCase();

    return jobs.filter((job) => {
      const jobStatus = job.isActive
        ? "Active"
        : "Inactive";

      const matchesSearch =
        !searchValue ||
        job.title?.toLowerCase().includes(searchValue) ||
        job.companyName
          ?.toLowerCase()
          .includes(searchValue) ||
        job.location
          ?.toLowerCase()
          .includes(searchValue) ||
        job.recruiterName
          ?.toLowerCase()
          .includes(searchValue);

      const matchesStatus =
        statusFilter === "All" ||
        jobStatus === statusFilter;

      return matchesSearch && matchesStatus;
    });
  }, [jobs, search, statusFilter]);

  const handleStatusChange = async (
    jobId,
    newStatus
  ) => {
    try {
      setUpdatingJobId(jobId);

      const response = await updateAdminJobStatus(
        jobId,
        newStatus
      );

      const updatedJob = response?.job;

      setJobs((currentJobs) =>
        currentJobs.map((job) =>
          job.id === jobId
            ? {
                ...job,
                isActive:
                  updatedJob?.isActive ??
                  newStatus === "Active",
              }
            : job
        )
      );

      toast.success(
        response?.message ||
          "Job status updated successfully."
      );
    } catch (error) {
      console.error(
        "Update job status error:",
        error.response?.data || error
      );

      toast.error(
        error.response?.data?.message ||
          "Failed to update job status."
      );
    } finally {
      setUpdatingJobId(null);
    }
  };

  const handleDeleteJob = async (job) => {
    const confirmed = window.confirm(
      `Are you sure you want to delete "${job.title}"?`
    );

    if (!confirmed) {
      return;
    }

    try {
      setDeletingJobId(job.id);

      const response = await deleteAdminJob(job.id);

      setJobs((currentJobs) =>
        currentJobs.filter(
          (currentJob) => currentJob.id !== job.id
        )
      );

      toast.success(
        response?.message ||
          "Job deleted successfully."
      );
    } catch (error) {
      console.error(
        "Delete job error:",
        error.response?.data || error
      );

      const message =
        error.response?.data?.message ||
        "Failed to delete job.";

      toast.error(message);
    } finally {
      setDeletingJobId(null);
    }
  };

  const getStatusClasses = (isActive) => {
    return isActive
      ? "bg-green-100 text-green-700"
      : "bg-yellow-100 text-yellow-700";
  };

  return (
    <DashboardLayout>
      <PageHeader
        title="Manage Jobs"
        subtitle="Review, activate, deactivate, and remove jobs."
      />

      <div className="mb-6 grid gap-4 rounded-xl bg-white p-5 shadow-sm md:grid-cols-2">
        <div className="relative">
          <Search
            size={19}
            className="absolute left-3 top-1/2 -translate-y-1/2 text-gray-400"
          />

          <input
            type="text"
            value={search}
            onChange={(event) =>
              setSearch(event.target.value)
            }
            placeholder="Search title, company, location, or recruiter"
            className="w-full rounded-lg border border-gray-200 py-2.5 pl-10 pr-4 outline-none transition focus:border-indigo-500 focus:ring-2 focus:ring-indigo-100"
          />
        </div>

        <select
          value={statusFilter}
          onChange={(event) =>
            setStatusFilter(event.target.value)
          }
          className="rounded-lg border border-gray-200 px-4 py-2.5 outline-none transition focus:border-indigo-500 focus:ring-2 focus:ring-indigo-100"
        >
          <option value="All">All Statuses</option>

          {statusOptions.map((status) => (
            <option key={status} value={status}>
              {status}
            </option>
          ))}
        </select>
      </div>

      {loading && (
        <div className="rounded-xl bg-white p-8 text-center shadow-sm">
          Loading jobs...
        </div>
      )}

      {!loading && error && (
        <div className="rounded-xl border border-red-200 bg-red-50 p-5 text-red-600">
          <p>{error}</p>

          <button
            type="button"
            onClick={loadJobs}
            className="mt-4 rounded-lg bg-red-600 px-4 py-2 text-sm font-medium text-white transition hover:bg-red-700"
          >
            Try Again
          </button>
        </div>
      )}

      {!loading &&
        !error &&
        filteredJobs.length === 0 && (
          <div className="rounded-xl bg-white p-8 text-center shadow-sm">
            <BriefcaseBusiness
              size={36}
              className="mx-auto mb-3 text-gray-400"
            />

            <p className="text-gray-500">
              No jobs found.
            </p>
          </div>
        )}

      {!loading &&
        !error &&
        filteredJobs.length > 0 && (
          <div className="overflow-hidden rounded-xl bg-white shadow-sm">
            <div className="overflow-x-auto">
              <table className="min-w-full divide-y divide-gray-200">
                <thead className="bg-gray-50">
                  <tr>
                    <th className="px-5 py-3 text-left text-xs font-semibold uppercase tracking-wider text-gray-500">
                      Job
                    </th>

                    <th className="px-5 py-3 text-left text-xs font-semibold uppercase tracking-wider text-gray-500">
                      Recruiter
                    </th>

                    <th className="px-5 py-3 text-left text-xs font-semibold uppercase tracking-wider text-gray-500">
                      Status
                    </th>

                    <th className="px-5 py-3 text-left text-xs font-semibold uppercase tracking-wider text-gray-500">
                      Created
                    </th>

                    <th className="px-5 py-3 text-right text-xs font-semibold uppercase tracking-wider text-gray-500">
                      Action
                    </th>
                  </tr>
                </thead>

                <tbody className="divide-y divide-gray-100">
                  {filteredJobs.map((job) => {
                    const isUpdating =
                      updatingJobId === job.id;

                    const isDeleting =
                      deletingJobId === job.id;

                    const currentStatus = job.isActive
                      ? "Active"
                      : "Inactive";

                    return (
                      <tr
                        key={job.id}
                        className="hover:bg-gray-50"
                      >
                        <td className="px-5 py-4">
                          <p className="font-medium text-gray-900">
                            {job.title || "Untitled Job"}
                          </p>

                          <p className="mt-1 text-sm text-gray-500">
                            {job.companyName ||
                              "No company"}
                            {" · "}
                            {job.location ||
                              "No location"}
                          </p>
                        </td>

                        <td className="px-5 py-4">
                          <p className="text-sm font-medium text-gray-800">
                            {job.recruiterName || "N/A"}
                          </p>

                          <p className="mt-1 text-sm text-gray-500">
                            {job.recruiterEmail || ""}
                          </p>
                        </td>

                        <td className="px-5 py-4">
                          <div className="flex flex-col gap-2">
                            <span
                              className={`w-fit rounded-full px-3 py-1 text-xs font-semibold ${getStatusClasses(
                                job.isActive
                              )}`}
                            >
                              {currentStatus}
                            </span>

                            <select
                              value={currentStatus}
                              disabled={
                                isUpdating || isDeleting
                              }
                              onChange={(event) =>
                                handleStatusChange(
                                  job.id,
                                  event.target.value
                                )
                              }
                              className="rounded-lg border border-gray-200 px-3 py-2 text-sm outline-none transition focus:border-indigo-500 focus:ring-2 focus:ring-indigo-100 disabled:cursor-not-allowed disabled:opacity-60"
                            >
                              {statusOptions.map(
                                (status) => (
                                  <option
                                    key={status}
                                    value={status}
                                  >
                                    {status}
                                  </option>
                                )
                              )}
                            </select>

                            {isUpdating && (
                              <span className="text-xs text-gray-500">
                                Updating...
                              </span>
                            )}
                          </div>
                        </td>

                        <td className="px-5 py-4 text-sm text-gray-600">
                          {job.createdAt
                            ? new Date(
                                job.createdAt
                              ).toLocaleDateString()
                            : "N/A"}
                        </td>

                        <td className="px-5 py-4 text-right">
                          <button
                            type="button"
                            disabled={
                              isDeleting || isUpdating
                            }
                            onClick={() =>
                              handleDeleteJob(job)
                            }
                            className="inline-flex items-center gap-2 rounded-lg bg-red-600 px-4 py-2 text-sm font-medium text-white transition hover:bg-red-700 disabled:cursor-not-allowed disabled:opacity-60"
                          >
                            <Trash2 size={17} />

                            {isDeleting
                              ? "Deleting..."
                              : "Delete"}
                          </button>
                        </td>
                      </tr>
                    );
                  })}
                </tbody>
              </table>
            </div>
          </div>
        )}
    </DashboardLayout>
  );
}

export default AdminJobs;