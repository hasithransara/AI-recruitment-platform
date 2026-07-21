import Card from "../common/Card";

function SecuritySettings() {
  return (
    <Card>
      <h2 className="text-2xl font-bold mb-6">
        Change Password
      </h2>

      <div className="space-y-4">

        <input
          type="password"
          placeholder="Current Password"
          className="w-full border rounded-lg p-3"
        />

        <input
          type="password"
          placeholder="New Password"
          className="w-full border rounded-lg p-3"
        />

        <input
          type="password"
          placeholder="Confirm Password"
          className="w-full border rounded-lg p-3"
        />

        <button className="bg-indigo-600 text-white px-6 py-3 rounded-lg hover:bg-indigo-700">
          Change Password
        </button>

      </div>
    </Card>
  );
}

export default SecuritySettings;