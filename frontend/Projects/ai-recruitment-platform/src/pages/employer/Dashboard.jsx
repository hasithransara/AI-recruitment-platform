import employerDashboard from "../../data/employerDashboard";

import EmployerStatCard from "../../components/employer/EmployerStatCard";
import RecentJobCard from "../../components/employer/RecentJobCard";
import ApplicantsChart from "../../components/employer/ApplicantsChart";
import QuickActions from "../../components/employer/QuickActions";

function Dashboard() {
  const { stats, recentJobs } = employerDashboard;

  return (
    <div className="min-h-screen bg-slate-100 p-8">

      <h1 className="text-4xl font-bold">
        Employer Dashboard
      </h1>

      <p className="text-slate-500 mt-2">
        Welcome back, Recruiter 👋
      </p>

      <div className="grid md:grid-cols-2 xl:grid-cols-4 gap-6 mt-8">

        <EmployerStatCard
          title="Jobs Posted"
          value={stats.jobs}
          color="bg-blue-500"
        />

        <EmployerStatCard
          title="Applicants"
          value={stats.applicants}
          color="bg-green-500"
        />

        <EmployerStatCard
          title="Interviews"
          value={stats.interviews}
          color="bg-purple-500"
        />

        <EmployerStatCard
          title="Hired"
          value={stats.hired}
          color="bg-orange-500"
        />

      </div>

      <div className="grid lg:grid-cols-3 gap-6 mt-10">

        <div className="lg:col-span-2">
          <ApplicantsChart />
        </div>

        <QuickActions />

      </div>

      <div className="mt-10">

        <h2 className="text-2xl font-bold mb-6">
          Recent Job Posts
        </h2>

        <div className="space-y-5">
          {recentJobs.map((job, index) => (
            <RecentJobCard key={index} job={job} />
          ))}
        </div>

      </div>

    </div>
  );
}

export default Dashboard;