import { useEffect, useState } from "react";
import {
  useNavigate,
  useParams,
} from "react-router-dom";
import {
  ArrowLeft,
  BriefcaseBusiness,
  RefreshCw,
  Save,
} from "lucide-react";
import { toast } from "react-toastify";

import DashboardLayout from "../../layouts/DashboardLayout";
import PageHeader from "../../components/layout/PageHeader";

import {
  getJobById,
  updateJob,
} from "../../services/jobService";

function EditJob() {
  const { id } = useParams();
  const navigate = useNavigate();

  const [job, setJob] = useState({
    title: "",
    company: "",
    location: "",
    jobType: "Full Time",
    experienceLevel: "Entry",
    salary: "",
    description: "",
    isActive: true,
  });

  const [loading, setLoading] = useState(true);
  const [saving, setSaving] = useState(false);
  const [error, setError] = useState("");

  const inputClassName =
    "w-full rounded-xl border border-gray-300 bg-white px-4 py-3 text-sm text-gray-900 outline-none transition placeholder:text-gray-400 focus:border-indigo-500 focus:ring-4 focus:ring-indigo-100 disabled:cursor-not-allowed disabled:bg-gray-100";

  const labelClassName =
    "mb-2 block text-sm font-semibold text-gray-700";

  const loadJob = async () => {
    try {
      setLoading(true);
      setError("");

      const data = await getJobById(id);

      setJob({
        title: data?.title ?? "",
        company: data?.company ?? "",
        location: data?.location ?? "",
        jobType: data?.jobType ?? "Full Time",
        experienceLevel:
          data?.experienceLevel ?? "Entry",
        salary: data?.salary ?? "",
        description: data?.description ?? "",
        isActive: data?.isActive ?? true,
      });
    } catch (error) {
      console.error(
        "Load job error:",
        error.response?.data || error
      );

      const message =
        error.response?.data?.message ||
        error.response?.data?.title ||
        "Failed to load job.";

      setError(message);
      toast.error(message);
    } finally {
      setLoading(false);
    }
  };

  useEffect(() => {
    loadJob();
  }, [id]);

  const handleChange = (event) => {
    const {
      name,
      value,
      type,
      checked,
    } = event.target;

    setJob((currentJob) => ({
      ...currentJob,
      [name]:
        type === "checkbox" ? checked : value,
    }));
  };

  const handleSubmit = async (event) => {
    event.preventDefault();

    const title = job.title.trim();
    const company = job.company.trim();
    const location = job.location.trim();
    const description = job.description.trim();
    const salary = Number(job.salary);

    if (!title) {
      toast.warning("Please enter the job title.");
      return;
    }

    if (!company) {
      toast.warning("Please enter the company name.");
      return;
    }

    if (!location) {
      toast.warning("Please enter the job location.");
      return;
    }

    if (!description) {
      toast.warning(
        "Please enter the job description."
      );
      return;
    }

    if (
      job.salary === "" ||
      Number.isNaN(salary) ||
      salary < 0
    ) {
      toast.warning(
        "Please enter a valid salary amount."
      );
      return;
    }

    const jobData = {
      ...job,
      title,
      company,
      location,
      description,
      salary,
    };

    try {
      setSaving(true);

      const result = await updateJob(id, jobData);

      toast.success(
        result?.message ||
          "Job updated successfully."
      );

      navigate("/recruiter/jobs");
    } catch (error) {
      console.error(
        "Update job error:",
        error.response?.data || error
      );

      const validationErrors =
        error.response?.data?.errors;

      if (validationErrors) {
        const firstError = Object.values(
          validationErrors
        )
          .flat()
          .find(Boolean);

        toast.error(
          firstError ||
            "Please check the entered information."
        );

        return;
      }

      toast.error(
        error.response?.data?.message ||
          error.response?.data?.title ||
          "Failed to update job."
      );
    } finally {
      setSaving(false);
    }
  };

  if (loading) {
    return (
      <DashboardLayout>
        <div className="rounded-2xl border border-gray-100 bg-white p-10 text-center shadow-sm">
          <div className="mx-auto h-9 w-9 animate-spin rounded-full border-4 border-indigo-100 border-t-indigo-600" />

          <p className="mt-4 text-sm text-gray-500">
            Loading job...
          </p>
        </div>
      </DashboardLayout>
    );
  }

  if (error) {
    return (
      <DashboardLayout>
        <div className="rounded-2xl border border-red-200 bg-red-50 p-5 text-red-700">
          <p className="font-medium">{error}</p>

          <div className="mt-4 flex flex-col gap-3 sm:flex-row">
            <button
              type="button"
              onClick={loadJob}
              className="flex items-center justify-center gap-2 rounded-lg bg-red-600 px-4 py-2 text-sm font-medium text-white transition hover:bg-red-700"
            >
              <RefreshCw size={16} />
              Try Again
            </button>

            <button
              type="button"
              onClick={() =>
                navigate("/recruiter/jobs")
              }
              className="flex items-center justify-center gap-2 rounded-lg border border-red-300 bg-white px-4 py-2 text-sm font-medium text-red-700 transition hover:bg-red-100"
            >
              <ArrowLeft size={16} />
              Back to Jobs
            </button>
          </div>
        </div>
      </DashboardLayout>
    );
  }

  return (
    <DashboardLayout>
      <PageHeader
        title="Edit Job"
        subtitle="Update the selected job vacancy and visibility."
      />

      <form
        onSubmit={handleSubmit}
        className="overflow-hidden rounded-2xl border border-gray-100 bg-white shadow-sm"
      >
        <div className="flex items-center gap-3 border-b border-gray-100 px-5 py-5 sm:px-8">
          <div className="flex h-11 w-11 items-center justify-center rounded-xl bg-indigo-100 text-indigo-600">
            <BriefcaseBusiness size={21} />
          </div>

          <div>
            <h2 className="font-semibold text-gray-900">
              Job Information
            </h2>

            <p className="text-sm text-gray-500">
              Modify the vacancy details below.
            </p>
          </div>
        </div>

        <div className="space-y-6 p-5 sm:p-8">
          <div className="grid grid-cols-1 gap-5 md:grid-cols-2">
            <div>
              <label
                htmlFor="title"
                className={labelClassName}
              >
                Job Title
              </label>

              <input
                id="title"
                type="text"
                name="title"
                value={job.title}
                onChange={handleChange}
                placeholder="Example: Software Engineer"
                className={inputClassName}
                disabled={saving}
                required
              />
            </div>

            <div>
              <label
                htmlFor="company"
                className={labelClassName}
              >
                Company
              </label>

              <input
                id="company"
                type="text"
                name="company"
                value={job.company}
                onChange={handleChange}
                placeholder="Example: ABC Technologies"
                className={inputClassName}
                disabled={saving}
                required
              />
            </div>

            <div>
              <label
                htmlFor="location"
                className={labelClassName}
              >
                Location
              </label>

              <input
                id="location"
                type="text"
                name="location"
                value={job.location}
                onChange={handleChange}
                placeholder="Example: Colombo"
                className={inputClassName}
                disabled={saving}
                required
              />
            </div>

            <div>
              <label
                htmlFor="salary"
                className={labelClassName}
              >
                Salary
              </label>

              <input
                id="salary"
                type="number"
                name="salary"
                value={job.salary}
                onChange={handleChange}
                min="0"
                step="0.01"
                placeholder="Example: 150000"
                className={inputClassName}
                disabled={saving}
                required
              />
            </div>

            <div>
              <label
                htmlFor="jobType"
                className={labelClassName}
              >
                Job Type
              </label>

              <select
                id="jobType"
                name="jobType"
                value={job.jobType}
                onChange={handleChange}
                className={inputClassName}
                disabled={saving}
              >
                <option value="Full Time">
                  Full Time
                </option>

                <option value="Part Time">
                  Part Time
                </option>

                <option value="Internship">
                  Internship
                </option>

                <option value="Contract">
                  Contract
                </option>
              </select>
            </div>

            <div>
              <label
                htmlFor="experienceLevel"
                className={labelClassName}
              >
                Experience Level
              </label>

              <select
                id="experienceLevel"
                name="experienceLevel"
                value={job.experienceLevel}
                onChange={handleChange}
                className={inputClassName}
                disabled={saving}
              >
                <option value="Entry">Entry</option>
                <option value="Junior">Junior</option>
                <option value="Mid">Mid</option>
                <option value="Senior">Senior</option>
              </select>
            </div>
          </div>

          <div>
            <label
              htmlFor="description"
              className={labelClassName}
            >
              Job Description
            </label>

            <textarea
              id="description"
              name="description"
              value={job.description}
              onChange={handleChange}
              rows={8}
              placeholder="Enter the job responsibilities, requirements and required skills."
              className={`${inputClassName} resize-y`}
              disabled={saving}
              required
            />
          </div>

          <label className="flex cursor-pointer items-start gap-3 rounded-xl border border-gray-200 bg-gray-50 p-4 transition hover:border-indigo-200 hover:bg-indigo-50/40">
            <input
              type="checkbox"
              name="isActive"
              checked={job.isActive}
              onChange={handleChange}
              disabled={saving}
              className="mt-0.5 h-5 w-5 shrink-0 accent-indigo-600"
            />

            <div>
              <p className="font-semibold text-gray-800">
                Job is active
              </p>

              <p className="mt-1 text-sm leading-5 text-gray-500">
                Active jobs are visible to candidates and
                can receive applications.
              </p>
            </div>
          </label>
        </div>

        <div className="flex flex-col gap-3 border-t border-gray-100 bg-gray-50 px-5 py-5 sm:flex-row sm:justify-end sm:px-8">
          <button
            type="button"
            disabled={saving}
            onClick={() =>
              navigate("/recruiter/jobs")
            }
            className="flex w-full items-center justify-center gap-2 rounded-xl border border-gray-300 bg-white px-6 py-3 text-sm font-semibold text-gray-700 transition hover:bg-gray-100 disabled:cursor-not-allowed disabled:opacity-50 sm:w-auto"
          >
            <ArrowLeft size={18} />
            Cancel
          </button>

          <button
            type="submit"
            disabled={saving}
            className="flex w-full items-center justify-center gap-2 rounded-xl bg-indigo-600 px-6 py-3 text-sm font-semibold text-white transition hover:bg-indigo-700 disabled:cursor-not-allowed disabled:bg-indigo-400 sm:w-auto"
          >
            <Save size={18} />

            {saving
              ? "Saving Changes..."
              : "Update Job"}
          </button>
        </div>
      </form>
    </DashboardLayout>
  );
}

export default EditJob;