import Card from "../common/Card";

function AppearanceSettings() {
  return (
    <Card>
      <h2 className="text-2xl font-bold mb-6">
        Appearance
      </h2>

      <label className="flex items-center gap-3">
        <input type="checkbox" />
        Dark Mode (UI Only)
      </label>
    </Card>
  );
}

export default AppearanceSettings;