import Card from "../common/Card";
import settings from "../../data/settings";

function ProfileSettings() {
  return (
    <Card>
      <h2 className="text-2xl font-bold mb-6">
        Profile Settings
      </h2>

      <div className="space-y-4">

        <input
          defaultValue={settings.profile.name}
          className="w-full border rounded-lg p-3"
          placeholder="Full Name"
        />

        <input
          defaultValue={settings.profile.email}
          className="w-full border rounded-lg p-3"
          placeholder="Email"
        />

        <input
          defaultValue={settings.profile.phone}
          className="w-full border rounded-lg p-3"
          placeholder="Phone"
        />

        <button className="bg-indigo-600 text-white px-6 py-3 rounded-lg hover:bg-indigo-700">
          Save Changes
        </button>

      </div>
    </Card>
  );
}

export default ProfileSettings;