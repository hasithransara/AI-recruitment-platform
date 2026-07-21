import { useState } from "react";
import { useNavigate } from "react-router-dom";
import {
  ArrowLeft,
  BriefcaseBusiness,
  Save,
} from "lucide-react";
import { toast } from "react-toastify";

import DashboardLayout from "../../layouts/DashboardLayout";
import PageHeader from "../../components/layout/PageHeader";

import { createJob } from "../../services/jobService";

const initialJobState = {
  title: "",
  company: "",
  location: "",
  jobType: "Full Time",
  experienceLevel: "Entry",
  salary: "",
  description: "",
};

function CreateJob() {
  const navigate = useNavigate();

  const [job, setJob] = useState(initialJobState);
  const [submitting, setSubmitting] = useState(false);

  const inputClassName =
    "w-full rounded-xl border border-gray-300 bg-white px-4 py-3 text-sm text-gray-900 outline-none transition placeholder:text-gray-400 focus:border-indigo-500 focus:ring-4 focus:ring-indigo-100 disabled:cursor-not-allowed disabled:bg-gray-100";

  const labelClassName =
    "mb-2 block text-sm font-semibold text-gray-700";

  const handleChange = (event) => {
    const { name, value } = event.target;

    setJob((currentJob) => ({
      ...currentJob,
      [name]: value,
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
      toast.warning("Please enter the job description.");
      return;
    }

    if (
      job.salary === "" ||
      Number.isNaN(salary) ||
      salary < 0
    ) {
      toast.warning("Please enter a valid salary.");
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
      setSubmitting(true);

      const result = await createJob(jobData);

      toast.success(
        result?.message || "Job created successfully."
      );

      navigate("/recruiter/jobs");
    } catch (error) {
      console.error(
        "Create job error:",
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
            "Please check the entered details."
        );

        return;
      }

      toast.error(
        error.response?.data?.message ||
          error.response?.data?.title ||
          "Failed to create job."
      );
    } finally {
      setSubmitting(false);
    }
  };

  return (
    <DashboardLayout>
      <PageHeader
        title="Create Job"
        subtitle="Post a new vacancy and start receiving candidate applications."
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
              Enter the vacancy details below.
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
                disabled={submitting}
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
                placeholder="Company name"
                className={inputClassName}
                disabled={submitting}
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
                disabled={submitting}
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
                placeholder="Example: 150000"
                min="0"
                step="0.01"
                className={inputClassName}
                disabled={submitting}
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
                disabled={submitting}
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
                disabled={submitting}
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
              placeholder="Describe the role, responsibilities, required skills and qualifications."
              className={`${inputClassName} resize-y`}
              disabled={submitting}
              required
            />
          </div>
        </div>

        <div className="flex flex-col gap-3 border-t border-gray-100 bg-gray-50 px-5 py-5 sm:flex-row sm:justify-end sm:px-8">
          <button
            type="button"
            onClick={() =>
              navigate("/recruiter/jobs")
            }
            disabled={submitting}
            className="flex w-full items-center justify-center gap-2 rounded-xl border border-gray-300 bg-white px-6 py-3 text-sm font-semibold text-gray-700 transition hover:bg-gray-100 disabled:cursor-not-allowed disabled:opacity-50 sm:w-auto"
          >
            <ArrowLeft size={18} />
            Cancel
          </button>

          <button
            type="submit"
            disabled={submitting}
            className="flex w-full items-center justify-center gap-2 rounded-xl bg-indigo-600 px-6 py-3 text-sm font-semibold text-white transition hover:bg-indigo-700 disabled:cursor-not-allowed disabled:bg-indigo-400 sm:w-auto"
          >
            <Save size={18} />

            {submitting
              ? "Creating Job..."
              : "Create Job"}
          </button>
        </div>
      </form>
    </DashboardLayout>
  );
}

export default CreateJob;