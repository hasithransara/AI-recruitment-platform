import CompanyCard from "./CompanyCard";

function CompanyList({ companies }) {
  return (
    <div className="space-y-5">
      {companies.map((company) => (
        <CompanyCard
          key={company.id}
          company={company}
        />
      ))}
    </div>
  );
}

export default CompanyList;