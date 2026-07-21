import Card from "../common/Card";

function PersonalInfo({ profile }) {
  const location = [profile.city, profile.country]
    .filter(Boolean)
    .join(", ");

  return (
    <Card>
      <h2 className="mb-6 text-2xl font-bold">
        Personal Information
      </h2>

      <div className="space-y-4">
        <div>
          <p className="text-gray-500">Email</p>
          <p>{profile.email || "Not provided"}</p>
        </div>

        <div>
          <p className="text-gray-500">Phone</p>
          <p>{profile.phone || "Not provided"}</p>
        </div>

        <div>
          <p className="text-gray-500">Address</p>
          <p>{profile.address || "Not provided"}</p>
        </div>

        <div>
          <p className="text-gray-500">Location</p>
          <p>{location || "Not provided"}</p>
        </div>

        {profile.linkedIn && (
          <div>
            <p className="text-gray-500">LinkedIn</p>

            <a
              href={profile.linkedIn}
              target="_blank"
              rel="noreferrer"
              className="text-indigo-600 hover:underline"
            >
              View LinkedIn
            </a>
          </div>
        )}

        {profile.gitHub && (
          <div>
            <p className="text-gray-500">GitHub</p>

            <a
              href={profile.gitHub}
              target="_blank"
              rel="noreferrer"
              className="text-indigo-600 hover:underline"
            >
              View GitHub
            </a>
          </div>
        )}

        {profile.portfolio && (
          <div>
            <p className="text-gray-500">Portfolio</p>

            <a
              href={profile.portfolio}
              target="_blank"
              rel="noreferrer"
              className="text-indigo-600 hover:underline"
            >
              View Portfolio
            </a>
          </div>
        )}
      </div>
    </Card>
  );
}

export default PersonalInfo;