import ApplicantCard from "./ApplicantCard";

function ApplicantList({ applicants }) {
  return (
    <div className="space-y-5">
      {applicants.map((applicant, index) => (
        <ApplicantCard
          key={applicant.applicationId ?? applicant.id}
          applicant={applicant}
          rank={index + 1}
        />
      ))}
    </div>
  );
}

export default ApplicantList;