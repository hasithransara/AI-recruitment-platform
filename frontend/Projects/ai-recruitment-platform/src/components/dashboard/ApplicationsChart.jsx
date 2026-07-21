import {
  BarChart,
  Bar,
  XAxis,
  YAxis,
  Tooltip,
  ResponsiveContainer,
  CartesianGrid,
} from "recharts";

function ApplicationsChart({ data = [] }) {
  return (
    <div className="rounded-xl bg-white p-6 shadow">
      <h2 className="mb-5 text-xl font-bold">
        Applications Per Job
      </h2>

      {data.length === 0 ? (
        <div className="flex h-80 items-center justify-center">
          <p className="text-gray-500">
            No application data available.
          </p>
        </div>
      ) : (
        <ResponsiveContainer width="100%" height={320}>
          <BarChart data={data}>
            <CartesianGrid strokeDasharray="3 3" />

            <XAxis
              dataKey="jobTitle"
              tick={{ fontSize: 12 }}
              interval={0}
              angle={-15}
              textAnchor="end"
              height={80}
            />

            <YAxis allowDecimals={false} />

            <Tooltip />

            <Bar
              dataKey="count"
              name="Applications"
              radius={[6, 6, 0, 0]}
            />
          </BarChart>
        </ResponsiveContainer>
      )}
    </div>
  );
}

export default ApplicationsChart;