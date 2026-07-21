import Card from "../common/Card";
import {
  BarChart,
  Bar,
  XAxis,
  YAxis,
  Tooltip,
  ResponsiveContainer,
} from "recharts";

const data = [
  { month: "Jan", applications: 2 },
  { month: "Feb", applications: 4 },
  { month: "Mar", applications: 6 },
  { month: "Apr", applications: 5 },
  { month: "May", applications: 8 },
  { month: "Jun", applications: 7 },
];

function ChartCard() {
  return (
    <Card>
      <h2 className="text-xl font-semibold mb-4">
        Application Progress
      </h2>

      <div className="h-72">
        <ResponsiveContainer width="100%" height="100%">
          <BarChart data={data}>
            <XAxis dataKey="month" />
            <YAxis />
            <Tooltip />
            <Bar
              dataKey="applications"
              fill="#4F46E5"
              radius={[6, 6, 0, 0]}
            />
          </BarChart>
        </ResponsiveContainer>
      </div>
    </Card>
  );
}

export default ChartCard;