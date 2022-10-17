import React from "react";
import Table from "@/components/CustomTable/Table";
import users from "@/data/user/users.json";

function Users() {
  const columns = ["User name", "Alias", "Email", "Actions"];
  const spliceUsers = users.splice(900, users.length - 1);
  const tableUsers = spliceUsers.map((user, index) => {
    return {
      username: user.username,
      alias: user.alias,
      email: user.email,
      actions: "edit, delete",
    };
  });

  return (
    <section className="m-auto h-full w-[80%] overflow-y-auto rounded-md bg-zinc-800 p-3 text-white">
      Users
      <h1>some heading</h1>
      <div className="users-table-container w-full table-fixed border-collapse overflow-y-auto">
        <Table columns={columns} rows={tableUsers} />
      </div>
    </section>
  );
}

export default Users;
