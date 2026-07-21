import Card from "../common/Card";
import StatusBadge from "../common/StatusBadge";

function ApplicationsTable({
  applications = [],
  loading = false,
}) {
  if (loading) {
    return (
      <Card>
        <h2 className="text-xl font-semibold mb-5">
          Recent Applications
        </h2>

        <div className="py-10 text-center text-gray-500">
          Loading applications...
        </div>
      </Card>
    );
  }

  return (
    <Card>
      <h2 className="text-xl font-semibold mb-5">
        Recent Applications
      </h2>

      {applications.length === 0 ? (
        <div className="py-10 text-center text-gray-500">
          You haven't applied for any jobs yet.
        </div>
      ) : (
        <div className="overflow-x-auto">
          <table className="min-w-full">
            <thead className="border-b bg-gray-50">
              <tr>
                <th className="px-4 py-3 text-left">
                  Company
                </th>

                <th className="px-4 py-3 text-left">
                  Position
                </th>

                <th className="px-4 py-3 text-left">
                  Applied
                </th>

                <th className="px-4 py-3 text-left">
                  Match
                </th>

                <th className="px-4 py-3 text-left">
                  Status
                </th>
              </tr>
            </thead>

            <tbody>
              {applications.map((application) => (
                <tr
                  key={application.id}
                  className="border-b hover:bg-slate-50"
                >
                  <td className="px-4 py-4">
                    {application.company}
                  </td>

                  <td className="px-4">
                    {application.jobTitle}
                  </td>

                  <td className="px-4">
                    {new Date(
                      application.appliedDate
                    ).toLocaleDateString()}
                  </td>

                  <td className="px-4 font-medium">
                    {application.matchScore != null
                      ? `${Math.round(
                          application.matchScore
                        )}%`
                      : "-"}
                  </td>

                  <td className="px-4">
                    <StatusBadge
                      status={application.status}
                    />
                  </td>
                </tr>
              ))}
            </tbody>
          </table>
        </div>
      )}
    </Card>
  );
}

export default ApplicationsTable;