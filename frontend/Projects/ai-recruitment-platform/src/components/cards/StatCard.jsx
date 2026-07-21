import { isValidElement } from "react";
import Card from "../common/Card";

function StatCard({
  title,
  value,
  icon,
  color = "bg-indigo-600",
}) {
  const Icon = icon;

  return (
    <Card className="cursor-pointer transition duration-300 hover:shadow-lg">
      <div className="flex items-center justify-between">
        <div>
          <p className="text-sm text-gray-500">{title}</p>

          <h2 className="mt-2 text-3xl font-bold">
            {value ?? 0}
          </h2>
        </div>

        <div
          className={`flex h-14 w-14 items-center justify-center rounded-xl text-white ${color}`}
        >
          {isValidElement(icon)
            ? icon
            : Icon && <Icon size={26} />}
        </div>
      </div>
    </Card>
  );
}

export default StatCard;