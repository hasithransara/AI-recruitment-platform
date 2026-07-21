import Card from "../common/Card";
import { UserCircle } from "lucide-react";

function ProfileCard({ name, role }) {
  return (
    <Card className="text-center">

      <UserCircle
        size={120}
        className="mx-auto text-indigo-600"
      />

      <h2 className="text-2xl font-bold mt-4">
        {name}
      </h2>

      <p className="text-gray-500">
        {role}
      </p>

      <button className="mt-6 bg-indigo-600 text-white px-6 py-2 rounded-lg hover:bg-indigo-700">
        Edit Profile
      </button>

    </Card>
  );
}

export default ProfileCard;