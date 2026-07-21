import { useCallback, useEffect, useState } from "react";

import DashboardLayout from "../../layouts/DashboardLayout";
import PageHeader from "../../components/layout/PageHeader";

import ProfileHeader from "../../components/profile/ProfileHeader";
import PersonalInfo from "../../components/profile/PersonalInfo";
import SkillsCard from "../../components/profile/SkillsCard";
import EducationCard from "../../components/profile/EducationCard";
import ResumeCard from "../../components/profile/ResumeCard";

import { getProfile } from "../../services/profileService";

function Profile() {
  const [profile, setProfile] = useState(null);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState("");

  const loadProfile = useCallback(async () => {
    try {
      setLoading(true);
      setError("");

      const data = await getProfile();
      setProfile(data);
    } catch (err) {
      console.error("Profile loading error:", err);

      setError(
        err.response?.data?.message ||
          "Unable to load your profile."
      );
    } finally {
      setLoading(false);
    }
  }, []);

  useEffect(() => {
    loadProfile();
  }, [loadProfile]);

  return (
    <DashboardLayout>
      <PageHeader
        title="My Profile"
        subtitle="Manage your professional information."
      />

      {loading && (
        <div className="rounded-xl bg-white p-6 shadow-sm">
          Loading profile...
        </div>
      )}

      {!loading && error && (
        <div className="rounded-xl bg-red-50 p-6 text-red-700">
          {error}
        </div>
      )}

      {!loading && !error && profile && (
        <div className="space-y-8">
          <ProfileHeader profile={profile} />

          <div className="grid gap-6 lg:grid-cols-2">
            <PersonalInfo profile={profile} />

            <SkillsCard profile={profile} />
          </div>

          <EducationCard profile={profile} />

          <ResumeCard
            profile={profile}
            onResumeUploaded={loadProfile}
          />
        </div>
      )}
    </DashboardLayout>
  );
}

export default Profile;