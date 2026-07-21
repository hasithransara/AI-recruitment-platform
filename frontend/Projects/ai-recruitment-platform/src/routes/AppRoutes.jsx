import {
  BrowserRouter,
  Navigate,
  Route,
  Routes,
} from "react-router-dom";

// Authentication pages
import Login from "../pages/auth/Login";
import Register from "../pages/auth/Register";
import ForgotPassword from "../pages/auth/ForgotPassword";

// Candidate pages
import CandidateDashboard from "../pages/candidate/Dashboard";
import Profile from "../pages/candidate/Profile";
import Jobs from "../pages/candidate/Jobs";
import Applications from "../pages/candidate/Applications";
import AIAssistant from "../pages/candidate/AIAssistant";
import Messages from "../pages/candidate/Messages";
import Settings from "../pages/candidate/Settings";

// Employer pages
import EmployerDashboard from "../pages/employer/Dashboard";
import PostJob from "../pages/employer/PostJob";
import EmployerManageJobs from "../pages/employer/ManageJobs";
import Applicants from "../pages/employer/Applicants";
import InterviewScheduler from "../pages/employer/InterviewScheduler";

// Recruiter pages
import RecruiterDashboard from "../pages/recruiter/RecruiterDashboard";
import CreateJob from "../pages/recruiter/CreateJob";
import RecruiterManageJobs from "../pages/recruiter/ManageJobs";
import EditJob from "../pages/recruiter/EditJob";
import ViewApplicants from "../pages/recruiter/ViewApplicants";

// Hiring Manager pages
import HiringManagerDashboard from "../pages/hiringManager/HiringManagerDashboard";
import ReviewCandidates from "../pages/hiringManager/ReviewCandidates";
import InterviewFeedback from "../pages/hiringManager/InterviewFeedback";
import HiringDecisions from "../pages/hiringManager/HiringDecisions";

// Admin pages
import AdminDashboard from "../pages/admin/Dashboard";
import AdminUsers from "../pages/admin/Users";
import AdminJobs from "../pages/admin/Jobs";
import AdminReports from "../pages/admin/Reports";

function AppRoutes() {
  return (
    <BrowserRouter>
      <Routes>
        {/* Default route */}
        <Route
          path="/"
          element={
            <Navigate
              to="/login"
              replace
            />
          }
        />

        {/* Authentication routes */}
        <Route
          path="/login"
          element={<Login />}
        />

        <Route
          path="/register"
          element={<Register />}
        />

        <Route
          path="/forgot-password"
          element={<ForgotPassword />}
        />

        {/* Candidate routes */}
        <Route
          path="/candidate"
          element={<CandidateDashboard />}
        />

        <Route
          path="/candidate/profile"
          element={<Profile />}
        />

        <Route
          path="/candidate/jobs"
          element={<Jobs />}
        />

        <Route
          path="/candidate/applications"
          element={<Applications />}
        />

        <Route
          path="/candidate/ai-assistant"
          element={<AIAssistant />}
        />

        <Route
          path="/candidate/messages"
          element={<Messages />}
        />

        <Route
          path="/candidate/settings"
          element={<Settings />}
        />

        {/* Recruiter routes */}
        <Route
          path="/recruiter"
          element={<RecruiterDashboard />}
        />

        <Route
          path="/recruiter/jobs"
          element={<RecruiterManageJobs />}
        />

        <Route
          path="/recruiter/create-job"
          element={<CreateJob />}
        />

        <Route
          path="/recruiter/jobs/:id/edit"
          element={<EditJob />}
        />

        <Route
          path="/recruiter/jobs/:jobId/applicants"
          element={<ViewApplicants />}
        />

        <Route
          path="/recruiter/applicants"
          element={
            <Navigate
              to="/recruiter/jobs"
              replace
            />
          }
        />

        {/* Hiring Manager routes */}
        <Route
          path="/hiring-manager"
          element={<HiringManagerDashboard />}
        />

        <Route
          path="/hiring-manager/candidates"
          element={<ReviewCandidates />}
        />

        <Route
          path="/hiring-manager/feedback"
          element={<InterviewFeedback />}
        />

        <Route
          path="/hiring-manager/decisions"
          element={<HiringDecisions />}
        />

        {/* Admin routes */}
        <Route
          path="/admin"
          element={<AdminDashboard />}
        />

        <Route
          path="/admin/users"
          element={<AdminUsers />}
        />

        <Route
  path="/admin/jobs"
  element={<AdminJobs />}
/>

        {/* Old Admin dashboard URL */}
        <Route
          path="/admin/dashboard"
          element={
            <Navigate
              to="/admin"
              replace
            />
          }
        />

        {/* Temporary Admin routes */}
        <Route
          path="/admin/jobs"
          element={
            <Navigate
              to="/admin"
              replace
            />
          }
        />

        <Route
    path="/admin/reports"
    element={<AdminReports />}
/><Route
    path="/admin/reports"
    element={<AdminReports />}
/>

        <Route
          path="/admin/recruiters"
          element={
            <Navigate
              to="/admin/users"
              replace
            />
          }
        />

        <Route
          path="/admin/reports"
          element={
            <Navigate
              to="/admin"
              replace
            />
          }
        />

        <Route
          path="/admin/settings"
          element={
            <Navigate
              to="/admin"
              replace
            />
          }
        />

        {/* Employer routes */}
        <Route
          path="/employer/dashboard"
          element={<EmployerDashboard />}
        />

        <Route
          path="/employer/post-job"
          element={<PostJob />}
        />

        <Route
          path="/employer/manage-jobs"
          element={<EmployerManageJobs />}
        />

        <Route
          path="/employer/jobs"
          element={<EmployerManageJobs />}
        />

        <Route
          path="/employer/applicants"
          element={<Applicants />}
        />

        <Route
          path="/employer/interview-scheduler"
          element={<InterviewScheduler />}
        />

        {/* Old candidate URLs */}
        <Route
          path="/profile"
          element={
            <Navigate
              to="/candidate/profile"
              replace
            />
          }
        />

        <Route
          path="/jobs"
          element={
            <Navigate
              to="/candidate/jobs"
              replace
            />
          }
        />

        <Route
          path="/applications"
          element={
            <Navigate
              to="/candidate/applications"
              replace
            />
          }
        />

        <Route
          path="/ai-assistant"
          element={
            <Navigate
              to="/candidate/ai-assistant"
              replace
            />
          }
        />

        <Route
          path="/messages"
          element={
            <Navigate
              to="/candidate/messages"
              replace
            />
          }
        />

        <Route
          path="/settings"
          element={
            <Navigate
              to="/candidate/settings"
              replace
            />
          }
        />

        {/* Unknown URL fallback */}
        <Route
          path="*"
          element={
            <Navigate
              to="/login"
              replace
            />
          }
        />
      </Routes>
    </BrowserRouter>
  );
}

export default AppRoutes;