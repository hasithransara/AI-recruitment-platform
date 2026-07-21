import Card from "../common/Card";
import settings from "../../data/settings";

function NotificationSettings() {
  return (
    <Card>
      <h2 className="text-2xl font-bold mb-6">
        Notifications
      </h2>

      <div className="space-y-4">

        <label className="flex items-center gap-3">
          <input type="checkbox" defaultChecked={settings.notifications.email} />
          Email Notifications
        </label>

        <label className="flex items-center gap-3">
          <input type="checkbox" defaultChecked={settings.notifications.jobs} />
          Job Alerts
        </label>

        <label className="flex items-center gap-3">
          <input type="checkbox" defaultChecked={settings.notifications.interview} />
          Interview Reminders
        </label>

      </div>
    </Card>
  );
}

export default NotificationSettings;