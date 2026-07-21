import { useState } from "react";

import usersData from "../../data/users";

import UserSearch from "../../components/userManagement/UserSearch";
import UserFilter from "../../components/userManagement/UserFilter";
import UserTable from "../../components/userManagement/UserTable";

function UserManagement() {
  const [search, setSearch] = useState("");
  const [role, setRole] = useState("All");

  const filteredUsers = usersData.filter((user) => {
    const matchesSearch = user.name
      .toLowerCase()
      .includes(search.toLowerCase());

    const matchesRole =
      role === "All" || user.role === role;

    return matchesSearch && matchesRole;
  });

  return (
    <div className="min-h-screen bg-slate-100 p-8">

      <h1 className="text-4xl font-bold">
        User Management
      </h1>

      <p className="text-slate-500 mb-8">
        Manage platform users.
      </p>

      <div className="flex gap-4 mb-8">

        <div className="flex-1">
          <UserSearch
            value={search}
            onChange={setSearch}
          />
        </div>

        <UserFilter
          value={role}
          onChange={setRole}
        />

      </div>

      <UserTable users={filteredUsers} />

    </div>
  );
}

export default UserManagement;