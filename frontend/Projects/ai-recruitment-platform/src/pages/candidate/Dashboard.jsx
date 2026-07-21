import { useEffect, useState } from "react";

import DashboardLayout from "../../layouts/DashboardLayout";
import PageHeader from "../../components/layout/PageHeader";

import StatCard from "../../components/cards/StatCard";
import JobCard from "../../components/cards/JobCard";
import ChartCard from "../../components/cards/ChartCard";
import NotificationCard from "../../components/cards/NotificationCard";
import ApplicationsTable from "../../components/tables/ApplicationsTable";

import { getCurrentUser } from "../../services/userService";
import { getCandidateDashboard } from "../../services/candidateService";

import {
  FileText,
  CalendarCheck,
  Bot,
  Briefcase,
} from "lucide-react";

function Dashboard() {
  const [user, setUser] = useState(null);

  const [dashboard, setDashboard] = useState({
    totalApplications: 0,
    totalInterviews: 0,
    averageMatchScore: 0,
    savedJobs: 0,
    recommendedJobs: [],
    recentApplications: [],
  });

  const [loading, setLoading] = useState(true);
  const [error, setError] = useState("");

  useEffect(() => {
    loadDashboardData();
  }, []);

  const loadDashboardData = async () => {
    try {
      setLoading(true);
      setError("");

      const [userData, dashboardData] =
        await Promise.all([
          getCurrentUser(),
          getCandidateDashboard(),
        ]);

      setUser(userData);
      setDashboard(dashboardData);
    } catch (error) {
      console.error(
        "Failed to load candidate dashboard:",
        error
      );

      setError(
        error.response?.data?.message ||
          "Failed to load dashboard data."
      );
    } finally {
      setLoading(false);
    }
  };

  return (
    <DashboardLayout>
      <div className="w-full min-w-0 space-y-8">
        <PageHeader
          title={`Good Evening, ${
            user?.fullName || "Candidate"
          } 👋`}
          subtitle="Welcome back to your recruitment dashboard."
        />

        {error && (
          <div className="rounded-xl border border-red-200 bg-red-50 px-4 py-3 text-sm text-red-700">
            {error}
          </div>
        )}

        <section>
          <div className="grid grid-cols-1 gap-5 sm:grid-cols-2 xl:grid-cols-4">
            <StatCard
              title="Applications"
              value={
                loading
                  ? "..."
                  : dashboard.totalApplications
              }
              icon={<FileText size={28} />}
              color="bg-blue-500"
            />

            <StatCard
              title="Interviews"
              value={
                loading
                  ? "..."
                  : dashboard.totalInterviews
              }
              icon={<CalendarCheck size={28} />}
              color="bg-green-500"
            />

            <StatCard
              title="AI Match"
              value={
                loading
                  ? "..."
                  : `${Math.round(
                      dashboard.averageMatchScore
                    )}%`
              }
              icon={<Bot size={28} />}
              color="bg-purple-500"
            />

            <StatCard
              title="Saved Jobs"
              value={
                loading
                  ? "..."
                  : dashboard.savedJobs
              }
              icon={<Briefcase size={28} />}
              color="bg-orange-500"
            />
          </div>
        </section>

        <section>
          <h2 className="mb-5 text-2xl font-bold text-gray-900">
            Recommended Jobs
          </h2>

          {loading ? (
            <div className="rounded-xl bg-white p-6 text-gray-500 shadow-sm">
              Loading recommended jobs...
            </div>
          ) : dashboard.recommendedJobs.length >
            0 ? (
            <div className="grid grid-cols-1 gap-5 xl:grid-cols-3">
              {dashboard.recommendedJobs.map(
                (job) => (
                  <JobCard
                    key={job.id}
                    id={job.id}
                    title={job.title}
                    company={job.company}
                    location={job.location}
                    match={Math.round(
                      job.matchScore
                    )}
                    type={job.jobType}
                  />
                )
              )}
            </div>
          ) : (
            <div className="rounded-xl bg-white p-6 text-gray-500 shadow-sm">
              No recommended jobs are available.
            </div>
          )}
        </section>

        <section className="grid grid-cols-1 gap-6 xl:grid-cols-3">
          <div className="min-w-0 xl:col-span-2">
            <ChartCard />
          </div>

          <div className="min-w-0">
            <NotificationCard />
          </div>
        </section>

        <section className="min-w-0 overflow-hidden">
          <ApplicationsTable
            applications={
              dashboard.recentApplications
            }
            loading={loading}
          />
        </section>
      </div>
    </DashboardLayout>
  );
}

export default Dashboard;