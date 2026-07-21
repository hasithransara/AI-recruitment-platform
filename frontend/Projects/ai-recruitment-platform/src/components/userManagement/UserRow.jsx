import UserActions from "./UserActions";

function UserRow({ user }) {
  return (
    <tr className="border-b">

      <td className="p-4">{user.name}</td>

      <td>{user.email}</td>

      <td>{user.role}</td>

      <td>
        <span
          className={`px-3 py-1 rounded-full text-white ${
            user.status === "Active"
              ? "bg-green-500"
              : "bg-red-500"
          }`}
        >
          {user.status}
        </span>
      </td>

      <td>
        <UserActions />
      </td>

    </tr>
  );
}

export default UserRow;