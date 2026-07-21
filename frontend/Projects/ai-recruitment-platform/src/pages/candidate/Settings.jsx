import DashboardLayout from "../../layouts/DashboardLayout";
import PageHeader from "../../components/layout/PageHeader";

import ProfileSettings from "../../components/settings/ProfileSettings";
import SecuritySettings from "../../components/settings/SecuritySettings";
import NotificationSettings from "../../components/settings/NotificationSettings";
import AppearanceSettings from "../../components/settings/AppearanceSettings";

function Settings() {
  return (
    <DashboardLayout>
      <PageHeader
        title="Settings"
        subtitle="Manage your account preferences."
      />

      <div className="space-y-6">
        <ProfileSettings />

        <SecuritySettings />

        <div className="grid md:grid-cols-2 gap-6">
          <NotificationSettings />
          <AppearanceSettings />
        </div>
      </div>
    </DashboardLayout>
  );
}

export default Settings;