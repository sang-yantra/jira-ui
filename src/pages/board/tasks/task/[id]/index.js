import React, { useEffect, useState } from "react";
import AppSidebar from "../../../../../components/AppSidebar/AppSidebar";
import { createEditor } from "slate";
import { Slate, Editable, withReact } from "slate-react";

import { TASK_MANAGEMENT } from "../../../../../constants/api";
import SlateEditor from "../../../../../components/SlateEditor/Editor";
import { FaClipboardCheck } from "react-icons/fa";
import { Router, useRouter } from "next/router";

function Task() {
  // const prefetchData = {
  //   Id: "7aab6f10-1bfc-11ed-a3b2-b622babdeb3e",
  //   Pbi_Id: "f57da697-1bfa-11ed-a3b2-b622babdeb3e",
  //   Title: "Create node js apis",
  //   Type: "Normal",
  //   Description: "Implement swagger",
  //   Status: "Active",
  //   Acceptance_Criteria: "Verify that rest apis are working",
  //   Nfr: "some nfr",
  //   Original_Estimate: 10,
  //   Remaining: 5,
  //   Completed: 5,
  //   Priority: "High",
  //   Assigned_To: "ad55b9e0-39f6-49aa-8660-f4c4a998fd9d",
  //   Created_Date: "2022-08-14T18:11:12.000Z",
  //   Updated_Date: "2022-08-14T18:11:12.000Z",
  //   Pbi: {
  //     Title: "Implementation of Jira backend",
  //   },
  //   Assigned: {
  //     Name: "Anup Mahato",
  //     Email: "anup.mahato@gmail.com",
  //   },
  // };
  const [task, setTask] = useState({});
  const [isLoading, setLoading] = useState(true);
  ///const taskId = "7aab6f10-1bfc-11ed-a3b2-b622babdeb3e";
  const router = useRouter();
  const { id } = router.query;
  console.log(id);
  useEffect(() => {
    const abortController = new AbortController();

    const fetchTask = async () => {
      debugger;
      fetch(TASK_MANAGEMENT.TASKS_GET_TASK(id))
        .then((response) => response.json())
        .then((response) => {
          console.log(response);
          setTask(response);
          setLoading(false);
        });
    };

    if (id) {
      fetchTask();
    }

    return () => {
      abortController.abort();
    };
  }, [id]);
  const handleFormSubmit = (e) => {
    e.preventDefault();
  };

  return (
    <div className="flex text-xl font-semibold text-white">
      <AppSidebar />
      {!isLoading && (
        <section className="ml-2 flex-auto p-2">
          <div>
            <form onSubmit={handleFormSubmit}>
              <h1 className="text-center">
                <FaClipboardCheck className="inline-block text-xl text-blue-300" />
                Task Id : {task.Id}
              </h1>
              <div className=" border-l-8 border-orange-500 p-3">
                <input
                  id="ftitle"
                  name="ftitle"
                  type={"text"}
                  value={task.Title}
                  className="focus:border-dotte w-full border-none bg-transparent p-2 text-2xl focus:border-2"
                  onChange={(e) => setTask({ ...task, Title: e.target.value })}
                />
                <div className="mt-4 flex items-center">
                  <span className=" inline-block h-[50px] w-[50px] rounded-full bg-cyan-300">
                    {" "}
                  </span>
                  <span className="ml-2">{task.Assigned.Name}</span>
                </div>
              </div>
              <div className="content block min-h-[400px] w-[70%]">
                <Description description={task.Description} />
              </div>
              <br></br>
              <button className="group relative mb-2 mr-2 inline-flex items-center justify-center overflow-hidden rounded-lg bg-gradient-to-br from-purple-500 to-pink-500 p-0.5 text-sm font-medium text-gray-900 hover:text-white focus:outline-none focus:ring-4 focus:ring-purple-200 group-hover:from-purple-500 group-hover:to-pink-500 dark:text-white dark:focus:ring-purple-800">
                <span className="relative rounded-md bg-white px-5 py-2.5 transition-all duration-75 ease-in group-hover:bg-opacity-0 dark:bg-gray-900">
                  Submit
                </span>
              </button>
              <button
                type="button"
                className="mr-2 mb-2 rounded-lg bg-gradient-to-br from-pink-500 to-orange-400 px-5 py-2.5 text-center text-sm font-medium text-white hover:bg-gradient-to-bl focus:outline-none focus:ring-4 focus:ring-pink-200 dark:focus:ring-pink-800"
              >
                Pink to Orange
              </button>
            </form>
          </div>
        </section>
      )}
    </div>
  );
}

const Description = ({ description }) => {
  const editor = useState(() => withReact(createEditor()));
  const initialValue = [
    {
      type: "paragraph",
      children: [{ text: "A line of text in a paragraph." }],
      operations: [],
      selection: null,
      marks: null,
    },
  ];
  return (
    <>
      <SlateEditor description={description} />
    </>
  );
};

export default Task;
