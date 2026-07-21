import Card from "../common/Card";

const notifications = [
  "Interview scheduled with WSO2",
  "Microsoft viewed your profile",
  "AI found 5 matching jobs",
  "Resume successfully updated",
];

function NotificationCard() {
  return (
    <Card>
      <h2 className="text-xl font-semibold mb-4">
        Notifications
      </h2>

      <div className="space-y-4">
        {notifications.map((item, index) => (
          <div
            key={index}
            className="border-b border-slate-200 pb-3 last:border-none"
          >
            <p className="text-gray-700">{item}</p>
          </div>
        ))}
      </div>
    </Card>
  );
}

export default NotificationCard;