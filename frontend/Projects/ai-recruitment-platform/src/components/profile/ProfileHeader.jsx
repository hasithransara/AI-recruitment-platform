function ProfileHeader({ profile }) {
  const apiBaseUrl = "https://localhost:7110";

  const profileImageUrl = profile.profileImage
    ? `${apiBaseUrl}${profile.profileImage}`
    : "https://i.pravatar.cc/150?img=12";

  const location = [profile.city, profile.country]
    .filter(Boolean)
    .join(", ");

  return (
    <div className="flex items-center gap-8 rounded-2xl bg-white p-8 shadow">
      <img
        src={profileImageUrl}
        alt={profile.fullName || "Candidate profile"}
        className="h-32 w-32 rounded-full border-4 border-indigo-500 object-cover"
      />

      <div>
        <h1 className="text-3xl font-bold">
          {profile.fullName || "Candidate"}
        </h1>

        <p className="mt-2 text-lg text-slate-600">
          Candidate
        </p>

        {location && (
          <p className="mt-1 text-indigo-600">
            {location}
          </p>
        )}

        {profile.about && (
          <p className="mt-3 max-w-2xl text-gray-600">
            {profile.about}
          </p>
        )}
      </div>
    </div>
  );
}

export default ProfileHeader;