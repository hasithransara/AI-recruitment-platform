import { useState } from "react";

import companiesData from "../../data/companies";

import CompanySearch from "../../components/companyManagement/CompanySearch";
import CompanyFilter from "../../components/companyManagement/CompanyFilter";
import CompanyList from "../../components/companyManagement/CompanyList";

function CompanyManagement() {
  const [search, setSearch] = useState("");
  const [status, setStatus] = useState("All");

  const filteredCompanies = companiesData.filter((company) => {
    const matchesSearch = company.name
      .toLowerCase()
      .includes(search.toLowerCase());

    const matchesStatus =
      status === "All" || company.status === status;

    return matchesSearch && matchesStatus;
  });

  return (
    <div className="min-h-screen bg-slate-100 p-8">

      <h1 className="text-4xl font-bold">
        Company Management
      </h1>

      <p className="text-slate-500 mb-8">
        Manage registered companies on the platform.
      </p>

      <div className="flex gap-4 mb-8">

        <div className="flex-1">
          <CompanySearch
            value={search}
            onChange={setSearch}
          />
        </div>

        <CompanyFilter
          value={status}
          onChange={setStatus}
        />

      </div>

      <CompanyList companies={filteredCompanies} />

    </div>
  );
}

export default CompanyManagement;