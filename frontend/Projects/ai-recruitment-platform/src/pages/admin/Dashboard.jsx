import { useEffect, useState } from "react";
import {
  BriefcaseBusiness,
  FileText,
  UserCheck,
  Users,
} from "lucide-react";

import DashboardLayout from "../../layouts/DashboardLayout";
import PageHeader from "../../components/layout/PageHeader";
import StatCard from "../../components/cards/StatCard";

import { getAdminDashboard } from "../../services/adminService";

function AdminDashboard() {
  const [dashboard, setDashboard] = useState({
    totalUsers: 0,
    totalCandidates: 0,
    totalRecruiters: 0,
    totalHiringManagers: 0,
    totalJobs: 0,
    activeJobs: 0,
    totalApplications: 0,
    totalInterviews: 0,
  });

  const [loading, setLoading] = useState(true);
  const [error, setError] = useState("");

  useEffect(() => {
    loadDashboard();
  }, []);

  const loadDashboard = async () => {
    try {
      setLoading(true);
      setError("");

      const data = await getAdminDashboard();

      setDashboard({
        totalUsers: data.totalUsers ?? 0,
        totalCandidates: data.totalCandidates ?? 0,
        totalRecruiters: data.totalRecruiters ?? 0,
        totalHiringManagers:
          data.totalHiringManagers ?? 0,
        totalJobs: data.totalJobs ?? 0,
        activeJobs: data.activeJobs ?? 0,
        totalApplications:
          data.totalApplications ?? 0,
        totalInterviews:
          data.totalInterviews ?? 0,
      });
    } catch (error) {
      console.error(
        "Admin dashboard error:",
        error.response?.data || error
      );

      if (error.response?.status === 401) {
        setError(
          "Your login session has expired. Please log in again."
        );
      } else if (error.response?.status === 403) {
        setError(
          "You do not have permission to access the Admin Dashboard."
        );
      } else {
        setError(
          error.response?.data?.message ||
            "Failed to load the Admin Dashboard."
        );
      }
    } finally {
      setLoading(false);
    }
  };

  return (
    <DashboardLayout>
      <PageHeader
        title="Admin Dashboard"
        subtitle="Monitor users, jobs, and recruitment activity."
      />

      {loading && (
        <div className="rounded-xl bg-white p-8 text-center shadow-sm">
          Loading dashboard...
        </div>
      )}

      {!loading && error && (
        <div className="rounded-xl border border-red-200 bg-red-50 p-5 text-red-600">
          <p>{error}</p>

          <button
            type="button"
            onClick={loadDashboard}
            className="mt-4 rounded-lg bg-red-600 px-4 py-2 text-sm font-medium text-white hover:bg-red-700"
          >
            Try Again
          </button>
        </div>
      )}

      {!loading && !error && (
        <>
          <div className="grid gap-5 sm:grid-cols-2 xl:grid-cols-4">
            <StatCard
              title="Total Users"
              value={dashboard.totalUsers}
              icon={Users}
            />

            <StatCard
              title="Candidates"
              value={dashboard.totalCandidates}
              icon={UserCheck}
            />

            <StatCard
              title="Recruiters"
              value={dashboard.totalRecruiters}
              icon={Users}
            />

            <StatCard
              title="Hiring Managers"
              value={dashboard.totalHiringManagers}
              icon={UserCheck}
            />
          </div>

          <div className="mt-6 grid gap-5 sm:grid-cols-2 xl:grid-cols-4">
            <StatCard
              title="Total Jobs"
              value={dashboard.totalJobs}
              icon={BriefcaseBusiness}
            />

            <StatCard
              title="Active Jobs"
              value={dashboard.activeJobs}
              icon={BriefcaseBusiness}
            />

            <StatCard
              title="Applications"
              value={dashboard.totalApplications}
              icon={FileText}
            />

            <StatCard
              title="Interviews"
              value={dashboard.totalInterviews}
              icon={FileText}
            />
          </div>
        </>
      )}
    </DashboardLayout>
  );
}

export default AdminDashboard;