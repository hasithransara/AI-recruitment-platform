function RecentApplicationsTable({ data = [] }) {
  return (
    <div className="rounded-xl bg-white p-6 shadow">
      <h2 className="mb-5 text-xl font-bold">
        Recent Applications
      </h2>

      <div className="overflow-x-auto">
        <table className="min-w-[700px]">
          <thead className="border-b">
            <tr>
              <th className="px-4 py-3 text-left">
                Candidate
              </th>

              <th className="px-4 py-3 text-left">
                Jobt
              </th>

              <th className="px-4 py-3 text-left">
                Match
              </th>

              <th className="px-4 py-3 text-left">
                Status
              </th>

              <th className="px-4 py-3 text-left">
                Applied
              </th>
            </tr>
          </thead>

          <tbody>
            {data.map((application) => (
              <tr
                key={application.applicationId}
                className="border-b"
              >
                <td className="px-4 py-3">
                  {application.candidateName}
                </td>

                <td className="px-4 py-3">
                  {application.jobTitle}
                </td>

                <td className="px-4 py-3 font-semibold">
                  {application.matchScore}%
                </td>

                <td className="px-4 py-3">
                  {application.status}
                </td>

                <td className="px-4 py-3">
                  {new Date(
                    application.appliedDate
                  ).toLocaleDateString()}
                </td>
              </tr>
            ))}
          </tbody>
        </table>
      </div>
    </div>
  );
}

export default RecentApplicationsTable;