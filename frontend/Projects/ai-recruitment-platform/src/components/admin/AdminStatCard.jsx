function AdminStatCard({ title, value, color }) {
  return (
    <div className="bg-white rounded-2xl shadow border border-slate-200 p-6">

      <div
        className={`w-12 h-12 rounded-xl ${color} mb-4`}
      ></div>

      <h3 className="text-slate-500">
        {title}
      </h3>

      <h2 className="text-3xl font-bold mt-2">
        {value}
      </h2>

    </div>
  );
}

export default AdminStatCard;