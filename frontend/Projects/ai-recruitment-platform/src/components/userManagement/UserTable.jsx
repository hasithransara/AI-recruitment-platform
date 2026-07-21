import UserRow from "./UserRow";

function UserTable({ users }) {
  return (
   <div className="overflow-x-auto">
    <table className="min-w-[700px]">

        <thead className="bg-slate-100">

          <tr>

            <th className="text-left p-4">Name</th>
            <th>Email</th>
            <th>Role</th>
            <th>Status</th>
            <th>Actions</th>

          </tr>

        </thead>

        <tbody>

          {users.map((user) => (
            <UserRow
              key={user.id}
              user={user}
            />
          ))}

        </tbody>

      </table>

    </div>
  );
}

export default UserTable;