import Card from "../common/Card";

function RecentActivity({ activities }) {
  return (
    <Card>

      <h2 className="text-2xl font-bold mb-6">
        Recent Activity
      </h2>

      <ul className="space-y-4">

        {activities.map((activity, index) => (
          <li key={index}>
            • {activity}
          </li>
        ))}

      </ul>

    </Card>
  );
}

export default RecentActivity;