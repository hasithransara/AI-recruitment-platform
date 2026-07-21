import Card from "../common/Card";

function ProfileScore({ score }) {
  return (
    <Card>
      <h2 className="text-xl font-semibold mb-5">
        AI Profile Score
      </h2>

      <div className="text-center">
        <div className="text-5xl font-bold text-indigo-600">
          {score}%
        </div>

        <div className="w-full bg-slate-200 rounded-full h-4 mt-6">
          <div
            className="bg-indigo-600 h-4 rounded-full"
            style={{ width: `${score}%` }}
          ></div>
        </div>

        <p className="text-gray-500 mt-4">
          Complete your profile to improve job matching.
        </p>
      </div>
    </Card>
  );
}

export default ProfileScore;