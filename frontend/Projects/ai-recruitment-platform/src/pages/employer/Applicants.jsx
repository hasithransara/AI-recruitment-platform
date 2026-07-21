import { useState } from "react";

import applicantsData from "../../data/applicants";
import ApplicantSearch from "../../components/applicants/ApplicantSearch";
import ApplicantList from "../../components/applicants/ApplicantList";

function Applicants() {
  const [search, setSearch] = useState("");

  const filteredApplicants = applicantsData.filter((applicant) =>
    applicant.name.toLowerCase().includes(search.toLowerCase())
  );

  return (
    <div className="min-h-screen bg-slate-100 p-8">

      <h1 className="text-4xl font-bold mb-2">
        Applicants
      </h1>

      <p className="text-slate-500 mb-8">
        Review and manage candidates who applied for your jobs.
      </p>

      <ApplicantSearch
        value={search}
        onChange={setSearch}
      />

      <ApplicantList applicants={filteredApplicants} />

    </div>
  );
}

export default Applicants;