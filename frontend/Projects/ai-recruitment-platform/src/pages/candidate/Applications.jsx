import { useEffect, useState } from "react";

import DashboardLayout from "../../layouts/DashboardLayout";
import PageHeader from "../../components/layout/PageHeader";

import ApplicationFilter from "../../components/applications/ApplicationFilter";
import ApplicationCard from "../../components/applications/ApplicationCard";

import { getMyApplications } from "../../services/applicationService";

function Applications() {
  const [applications, setApplications] = useState([]);
  const [selected, setSelected] = useState("All");
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState("");

  useEffect(() => {
    loadApplications();
  }, []);

  const loadApplications = async () => {
    try {
      setLoading(true);
      setError("");

      const data = await getMyApplications();

      setApplications(data);
    } catch (error) {
      console.error(
        "Load applications error:",
        error.response?.data || error
      );

      if (error.response?.status === 401) {
        setError(
          "Your login session has expired. Please log in again."
        );
      } else {
        setError(
          error.response?.data?.message ||
            "Failed to load applications."
        );
      }
    } finally {
      setLoading(false);
    }
  };

  const filtered =
    selected === "All"
      ? applications
      : applications.filter(
          (application) =>
            application.status === selected
        );

  return (
    <DashboardLayout>
      <PageHeader
        title="My Applications"
        subtitle="Track all your job applications."
      />

      <ApplicationFilter
        selected={selected}
        onSelect={setSelected}
      />

      {loading && (
        <div className="rounded-xl bg-white p-8 text-center shadow">
          Loading applications...
        </div>
      )}

      {!loading && error && (
        <div className="rounded-xl border border-red-200 bg-red-50 p-5 text-red-600">
          {error}
        </div>
      )}

      {!loading &&
        !error &&
        filtered.length === 0 && (
          <div className="rounded-xl bg-white p-8 text-center shadow">
            <p className="text-gray-500">
              No applications found.
            </p>
          </div>
        )}

      {!loading &&
        !error &&
        filtered.length > 0 && (
          <div className="space-y-5">
            {filtered.map((application) => (
              <ApplicationCard
                key={application.id}
                application={application}
              />
            ))}
          </div>
        )}
    </DashboardLayout>
  );
}

export default Applications;