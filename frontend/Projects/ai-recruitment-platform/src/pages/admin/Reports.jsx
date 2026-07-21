import { useEffect, useState } from "react";
import {
  Users,
  UserCheck,
  BriefcaseBusiness,
  FileText,
  BarChart3,
  Award,
  UserCog,
  CalendarCheck,
} from "lucide-react";

import DashboardLayout from "../../layouts/DashboardLayout";
import PageHeader from "../../components/layout/PageHeader";
import StatCard from "../../components/cards/StatCard";
import { getAdminReports } from "../../services/adminService";

function AdminReports() {
  const [reports, setReports] = useState(null);
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    loadReports();
  }, []);

  const loadReports = async () => {
    try {
      const data = await getAdminReports();
      setReports(data);
    } catch (error) {
      console.error(error);
    } finally {
      setLoading(false);
    }
  };

  if (loading) {
    return (
      <DashboardLayout>
        <PageHeader
          title="System Reports"
          subtitle="Overall platform statistics"
        />

        <div className="bg-white rounded-xl p-8 shadow text-center">
          Loading reports...
        </div>
      </DashboardLayout>
    );
  }

  return (
    <DashboardLayout>
      <PageHeader
        title="System Reports"
        subtitle="Overall platform statistics"
      />

      <div className="grid gap-6 md:grid-cols-2 lg:grid-cols-4">

        <StatCard
          title="Total Users"
          value={reports.totalUsers}
          icon={Users}
          color="bg-blue-600"
        />

        <StatCard
          title="Candidates"
          value={reports.totalCandidates}
          icon={UserCheck}
          color="bg-green-600"
        />

        <StatCard
          title="Recruiters"
          value={reports.totalRecruiters}
          icon={UserCog}
          color="bg-purple-600"
        />

        <StatCard
          title="Hiring Managers"
          value={reports.totalHiringManagers}
          icon={Users}
          color="bg-pink-600"
        />

        <StatCard
          title="Total Jobs"
          value={reports.totalJobs}
          icon={BriefcaseBusiness}
          color="bg-indigo-600"
        />

        <StatCard
          title="Active Jobs"
          value={reports.activeJobs}
          icon={BriefcaseBusiness}
          color="bg-emerald-600"
        />

        <StatCard
          title="Applications"
          value={reports.totalApplications}
          icon={FileText}
          color="bg-orange-600"
        />

        <StatCard
          title="Interviews"
          value={reports.interviewCount}
          icon={CalendarCheck}
          color="bg-cyan-600"
        />

        <StatCard
          title="Hired Candidates"
          value={reports.hiredCount}
          icon={Award}
          color="bg-yellow-600"
        />

        <StatCard
          title="Average Match"
          value={`${reports.averageMatchScore}%`}
          icon={BarChart3}
          color="bg-red-600"
        />

      </div>
    </DashboardLayout>
  );
}

export default AdminReports;