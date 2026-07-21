import { useEffect, useState } from "react";
import {
  BriefcaseBusiness,
  CheckCircle2,
  FileText,
  UserCheck,
} from "lucide-react";

import DashboardLayout from "../../layouts/DashboardLayout";
import PageHeader from "../../components/layout/PageHeader";

import ApplicationsChart from "../../components/dashboard/ApplicationsChart";
import StatusChart from "../../components/dashboard/StatusChart";
import MatchDistributionChart from "../../components/dashboard/MatchDistributionChart";
import RecentApplicationsTable from "../../components/dashboard/RecentApplicationsTable";

import { getRecruiterDashboard } from "../../services/dashboardService";
import { getRecruiterAnalytics } from "../../services/analyticsService";

function RecruiterDashboard() {
  const [dashboard, setDashboard] = useState({
    activeJobs: 0,
    totalApplications: 0,
    shortlisted: 0,
    hired: 0,
  });

  const [analytics, setAnalytics] = useState({
    applicationsPerJob: [],
    applicationStatus: [],
    matchDistribution: [],
    recentApplications: [],
  });

  const [loading, setLoading] = useState(true);
  const [error, setError] = useState("");

  const loadDashboardData = async () => {
    try {
      setLoading(true);
      setError("");

      const [dashboardData, analyticsData] =
        await Promise.all([
          getRecruiterDashboard(),
          getRecruiterAnalytics(),
        ]);

      setDashboard({
        activeJobs: dashboardData?.activeJobs ?? 0,
        totalApplications:
          dashboardData?.totalApplications ?? 0,
        shortlisted: dashboardData?.shortlisted ?? 0,
        hired: dashboardData?.hired ?? 0,
      });

      setAnalytics({
        applicationsPerJob:
          analyticsData?.applicationsPerJob ?? [],
        applicationStatus:
          analyticsData?.applicationStatus ?? [],
        matchDistribution:
          analyticsData?.matchDistribution ?? [],
        recentApplications:
          analyticsData?.recentApplications ?? [],
      });
    } catch (error) {
      console.error(
        "Recruiter dashboard error:",
        error.response?.data || error
      );

      setError(
        error.response?.data?.message ||
          error.response?.data?.title ||
          "Failed to load recruiter dashboard."
      );
    } finally {
      setLoading(false);
    }
  };

  useEffect(() => {
    loadDashboardData();
  }, []);

  const cards = [
    {
      title: "Active Jobs",
      value: dashboard.activeJobs,
      description: "Currently visible vacancies",
      icon: BriefcaseBusiness,
      iconClassName: "bg-indigo-100 text-indigo-600",
    },
    {
      title: "Applications",
      value: dashboard.totalApplications,
      description: "Total candidate applications",
      icon: FileText,
      iconClassName: "bg-blue-100 text-blue-600",
    },
    {
      title: "Shortlisted",
      value: dashboard.shortlisted,
      description: "Candidates moved forward",
      icon: UserCheck,
      iconClassName: "bg-amber-100 text-amber-600",
    },
    {
      title: "Hired",
      value: dashboard.hired,
      description: "Successfully hired candidates",
      icon: CheckCircle2,
      iconClassName: "bg-green-100 text-green-600",
    },
  ];

  return (
    <DashboardLayout>
      <PageHeader
        title="Recruiter Dashboard"
        subtitle="Track jobs, applicants and AI matching analytics."
      />

      {loading && (
        <div className="rounded-2xl border border-gray-100 bg-white p-10 text-center shadow-sm">
          <div className="mx-auto h-9 w-9 animate-spin rounded-full border-4 border-indigo-100 border-t-indigo-600" />

          <p className="mt-4 text-sm text-gray-500">
            Loading dashboard...
          </p>
        </div>
      )}

      {!loading && error && (
        <div className="rounded-2xl border border-red-200 bg-red-50 p-5 text-red-700">
          <p className="font-medium">{error}</p>

          <button
            type="button"
            onClick={loadDashboardData}
            className="mt-4 rounded-lg bg-red-600 px-4 py-2 text-sm font-medium text-white transition hover:bg-red-700"
          >
            Try Again
          </button>
        </div>
      )}

      {!loading && !error && (
        <div className="space-y-6">
          <section className="grid grid-cols-1 gap-5 sm:grid-cols-2 xl:grid-cols-4">
            {cards.map((card) => {
              const Icon = card.icon;

              return (
                <article
                  key={card.title}
                  className="rounded-2xl border border-gray-100 bg-white p-5 shadow-sm transition duration-200 hover:-translate-y-1 hover:shadow-md sm:p-6"
                >
                  <div className="flex items-start justify-between gap-4">
                    <div>
                      <p className="text-sm font-medium text-gray-500">
                        {card.title}
                      </p>

                      <p className="mt-3 text-3xl font-bold text-gray-900 sm:text-4xl">
                        {card.value}
                      </p>
                    </div>

                    <div
                      className={`flex h-11 w-11 shrink-0 items-center justify-center rounded-xl ${card.iconClassName}`}
                    >
                      <Icon size={21} />
                    </div>
                  </div>

                  <p className="mt-4 text-xs leading-5 text-gray-500">
                    {card.description}
                  </p>
                </article>
              );
            })}
          </section>

          <section className="grid grid-cols-1 gap-6 xl:grid-cols-2">
            <ApplicationsChart
              data={analytics.applicationsPerJob}
            />

            <StatusChart
              data={analytics.applicationStatus}
            />
          </section>

          <section>
            <MatchDistributionChart
              data={analytics.matchDistribution}
            />
          </section>

          <section>
            <RecentApplicationsTable
              data={analytics.recentApplications}
            />
          </section>
        </div>
      )}
    </DashboardLayout>
  );
}

export default RecruiterDashboard;