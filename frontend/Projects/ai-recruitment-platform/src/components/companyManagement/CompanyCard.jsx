import Card from "../common/Card";
import CompanyActions from "./CompanyActions";

function CompanyCard({ company }) {
  return (
    <Card>

      <h2 className="text-2xl font-bold">
        {company.name}
      </h2>

      <p className="text-gray-600 mt-2">
        {company.industry}
      </p>

      <p className="text-gray-500">
        {company.jobs} Active Jobs
      </p>

      <span
        className={`inline-block mt-4 px-3 py-1 rounded-full text-white ${
          company.status === "Verified"
            ? "bg-green-500"
            : company.status === "Pending"
            ? "bg-yellow-500"
            : "bg-red-500"
        }`}
      >
        {company.status}
      </span>

      <CompanyActions />

    </Card>
  );
}

export default CompanyCard;