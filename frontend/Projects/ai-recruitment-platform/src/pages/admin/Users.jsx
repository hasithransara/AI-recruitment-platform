import { useEffect, useMemo, useState } from "react";
import {
  Search,
  ShieldCheck,
  UserCheck,
  UserX,
} from "lucide-react";
import { toast } from "react-toastify";

import DashboardLayout from "../../layouts/DashboardLayout";
import PageHeader from "../../components/layout/PageHeader";

import {
  getAdminUsers,
  updateAdminUserRole,
  updateAdminUserStatus,
} from "../../services/adminService";

const roleOptions = [
  "Candidate",
  "Recruiter",
  "HiringManager",
  "Admin",
];

function AdminUsers() {
  const [users, setUsers] = useState([]);
  const [search, setSearch] = useState("");
  const [roleFilter, setRoleFilter] = useState("All");
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState("");
  const [updatingUserId, setUpdatingUserId] =
    useState(null);

  useEffect(() => {
    loadUsers();
  }, []);

  const loadUsers = async () => {
    try {
      setLoading(true);
      setError("");

      const data = await getAdminUsers();

      setUsers(Array.isArray(data) ? data : []);
    } catch (error) {
      console.error(
        "Admin users error:",
        error.response?.data || error
      );

      if (error.response?.status === 401) {
        setError(
          "Your login session has expired. Please log in again."
        );
      } else if (error.response?.status === 403) {
        setError(
          "You do not have permission to manage users."
        );
      } else {
        setError(
          error.response?.data?.message ||
            "Failed to load users."
        );
      }
    } finally {
      setLoading(false);
    }
  };

  const filteredUsers = useMemo(() => {
    const searchValue = search.trim().toLowerCase();

    return users.filter((user) => {
      const matchesSearch =
        !searchValue ||
        user.fullName
          ?.toLowerCase()
          .includes(searchValue) ||
        user.email
          ?.toLowerCase()
          .includes(searchValue);

      const matchesRole =
        roleFilter === "All" ||
        user.role === roleFilter;

      return matchesSearch && matchesRole;
    });
  }, [users, search, roleFilter]);

  const handleRoleChange = async (
    userId,
    newRole
  ) => {
    try {
      setUpdatingUserId(userId);

      const response = await updateAdminUserRole(
        userId,
        newRole
      );

      const updatedUser =
        response.user || response;

      setUsers((currentUsers) =>
        currentUsers.map((user) =>
          user.id === userId
            ? {
                ...user,
                role: updatedUser.role,
              }
            : user
        )
      );

      toast.success(
        response.message ||
          "User role updated successfully."
      );
    } catch (error) {
      console.error(
        "Update role error:",
        error.response?.data || error
      );

      toast.error(
        error.response?.data?.message ||
          "Failed to update user role."
      );
    } finally {
      setUpdatingUserId(null);
    }
  };

  const handleStatusChange = async (user) => {
    const newStatus = !user.isActive;

    try {
      setUpdatingUserId(user.id);

      const response =
        await updateAdminUserStatus(
          user.id,
          newStatus
        );

      const updatedUser =
        response.user || response;

      setUsers((currentUsers) =>
        currentUsers.map((currentUser) =>
          currentUser.id === user.id
            ? {
                ...currentUser,
                isActive:
                  updatedUser.isActive,
              }
            : currentUser
        )
      );

      toast.success(
        response.message ||
          "User status updated successfully."
      );
    } catch (error) {
      console.error(
        "Update status error:",
        error.response?.data || error
      );

      toast.error(
        error.response?.data?.message ||
          "Failed to update user status."
      );
    } finally {
      setUpdatingUserId(null);
    }
  };

  return (
    <DashboardLayout>
      <PageHeader
        title="Manage Users"
        subtitle="View users, change roles, and control account access."
      />

      <div className="mb-6 grid gap-4 rounded-xl bg-white p-5 shadow-sm md:grid-cols-2">
        <div className="relative">
          <Search
            size={19}
            className="absolute left-3 top-1/2 -translate-y-1/2 text-gray-400"
          />

          <input
            type="text"
            value={search}
            onChange={(event) =>
              setSearch(event.target.value)
            }
            placeholder="Search by name or email"
            className="w-full rounded-lg border border-gray-200 py-2.5 pl-10 pr-4 outline-none transition focus:border-indigo-500 focus:ring-2 focus:ring-indigo-100"
          />
        </div>

        <select
          value={roleFilter}
          onChange={(event) =>
            setRoleFilter(event.target.value)
          }
          className="rounded-lg border border-gray-200 px-4 py-2.5 outline-none transition focus:border-indigo-500 focus:ring-2 focus:ring-indigo-100"
        >
          <option value="All">All Roles</option>

          {roleOptions.map((role) => (
            <option key={role} value={role}>
              {role}
            </option>
          ))}
        </select>
      </div>

      {loading && (
        <div className="rounded-xl bg-white p-8 text-center shadow-sm">
          Loading users...
        </div>
      )}

      {!loading && error && (
        <div className="rounded-xl border border-red-200 bg-red-50 p-5 text-red-600">
          <p>{error}</p>

          <button
            type="button"
            onClick={loadUsers}
            className="mt-4 rounded-lg bg-red-600 px-4 py-2 text-sm font-medium text-white hover:bg-red-700"
          >
            Try Again
          </button>
        </div>
      )}

      {!loading &&
        !error &&
        filteredUsers.length === 0 && (
          <div className="rounded-xl bg-white p-8 text-center shadow-sm">
            <p className="text-gray-500">
              No users found.
            </p>
          </div>
        )}

      {!loading &&
        !error &&
        filteredUsers.length > 0 && (
          <div className="overflow-hidden rounded-xl bg-white shadow-sm">
            <div className="overflow-x-auto">
              <table className="min-w-full divide-y divide-gray-200">
                <thead className="bg-gray-50">
                  <tr>
                    <th className="px-5 py-3 text-left text-xs font-semibold uppercase tracking-wider text-gray-500">
                      User
                    </th>

                    <th className="px-5 py-3 text-left text-xs font-semibold uppercase tracking-wider text-gray-500">
                      Role
                    </th>

                    <th className="px-5 py-3 text-left text-xs font-semibold uppercase tracking-wider text-gray-500">
                      Status
                    </th>

                    <th className="px-5 py-3 text-left text-xs font-semibold uppercase tracking-wider text-gray-500">
                      Joined
                    </th>

                    <th className="px-5 py-3 text-right text-xs font-semibold uppercase tracking-wider text-gray-500">
                      Action
                    </th>
                  </tr>
                </thead>

                <tbody className="divide-y divide-gray-100">
                  {filteredUsers.map((user) => {
                    const isUpdating =
                      updatingUserId === user.id;

                    return (
                      <tr
                        key={user.id}
                        className="hover:bg-gray-50"
                      >
                        <td className="px-5 py-4">
                          <p className="font-medium text-gray-900">
                            {user.fullName}
                          </p>

                          <p className="mt-1 text-sm text-gray-500">
                            {user.email}
                          </p>
                        </td>

                        <td className="px-5 py-4">
                          <select
                            value={user.role}
                            disabled={isUpdating}
                            onChange={(event) =>
                              handleRoleChange(
                                user.id,
                                event.target.value
                              )
                            }
                            className="rounded-lg border border-gray-200 px-3 py-2 text-sm outline-none transition focus:border-indigo-500 focus:ring-2 focus:ring-indigo-100 disabled:cursor-not-allowed disabled:opacity-60"
                          >
                            {roleOptions.map(
                              (role) => (
                                <option
                                  key={role}
                                  value={role}
                                >
                                  {role}
                                </option>
                              )
                            )}
                          </select>
                        </td>

                        <td className="px-5 py-4">
                          <span
                            className={`inline-flex items-center gap-1.5 rounded-full px-3 py-1 text-xs font-semibold ${
                              user.isActive
                                ? "bg-green-100 text-green-700"
                                : "bg-red-100 text-red-700"
                            }`}
                          >
                            {user.isActive ? (
                              <UserCheck size={14} />
                            ) : (
                              <UserX size={14} />
                            )}

                            {user.isActive
                              ? "Active"
                              : "Inactive"}
                          </span>
                        </td>

                        <td className="px-5 py-4 text-sm text-gray-600">
                          {user.createdAt
                            ? new Date(
                                user.createdAt
                              ).toLocaleDateString()
                            : "N/A"}
                        </td>

                        <td className="px-5 py-4 text-right">
                          <button
                            type="button"
                            disabled={isUpdating}
                            onClick={() =>
                              handleStatusChange(user)
                            }
                            className={`inline-flex items-center gap-2 rounded-lg px-4 py-2 text-sm font-medium text-white transition disabled:cursor-not-allowed disabled:opacity-60 ${
                              user.isActive
                                ? "bg-red-600 hover:bg-red-700"
                                : "bg-green-600 hover:bg-green-700"
                            }`}
                          >
                            <ShieldCheck size={17} />

                            {isUpdating
                              ? "Updating..."
                              : user.isActive
                                ? "Deactivate"
                                : "Activate"}
                          </button>
                        </td>
                      </tr>
                    );
                  })}
                </tbody>
              </table>
            </div>
          </div>
        )}
    </DashboardLayout>
  );
}

export default AdminUsers;