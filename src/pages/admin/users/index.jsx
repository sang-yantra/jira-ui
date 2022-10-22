import React, { useEffect, useState } from "react";
import Table from "@/components/CustomTable/Table";
////import users from "@/data/user/users.json";
import { USERS_MANAGEMENT_ACTIONS} from "../../../constants/api"

function Users() {
  const columns = ["Avatar","User name", "Alias", "Email", "Actions"];
  const [users, setUsers] = useState([]);


  useEffect(() => {
    const abortController = new AbortController();
    fetch(USERS_MANAGEMENT_ACTIONS.USERS)
    .then(res => res.json())
    .then(res => {
      debugger;
      const spliceUsers = res.splice(900, res.length - 1);
      const tableUsers = spliceUsers.map((user, index) => {
        return {
          avatar: user.avatar,
          username: user.username,
          alias: user.alias,
          email: user.email,
          actions: "edit, delete",
        };
      });

      console.log(tableUsers);
      setUsers(tableUsers);
    })

    return () => abortController.abort();

  }, [])
  return (
    <section className="m-auto h-full w-[80%] overflow-y-auto rounded-md bg-zinc-800 p-3 text-white">
      Users
      <h1>some heading</h1>
      <div className="users-table-container w-full table-fixed border-collapse overflow-y-auto">
        {users && <Table columns={columns} rows={users} />}
      </div>
    </section>
  );
}

export default Users;
