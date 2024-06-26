import React, { useEffect, useState } from "react";
import axios from "axios";
import { Link, useNavigate } from "react-router-dom";

const Landingpage = () => {
  const [users, setUsers] = useState([]);
  const [tasks, setTask] = useState([]);
  const navigate = useNavigate();
  useEffect(() => {
    //Fetching Users
    const fetchUsers = async () => {
      try {
        const response = await axios.get(
          "https://rbac-backend-dxeh.onrender.com/api/user/getallusers",
          {
            headers: {
              "Content-Type": "application/json",
              Authorization: `Bearer ${localStorage.getItem("Token")}`,
            },
          }
        );
        setUsers(response.data.result);
        /*  console.log(users.filter((ele)=>ele.role === 'developer').length); */
      } catch (error) {
        console.error("Error fetching data:", error);
      }
    };
    fetchUsers();
    // Fetching All Task
    const fetchTask = async () => {
      try {
        const response = await axios.get(
          "https://rbac-backend-dxeh.onrender.com/api/task/getalltask",
          {
            headers: {
              "Content-Type": "application/json",
              Authorization: `Bearer ${localStorage.getItem("Token")}`,
            },
          }
        );
        setTask(response.data.tasks);
        //console.log(tasks);
      } catch (error) {
        console.error("Error fetching data:", error);
      }
    };
    fetchTask();
  }, []);

  return (
    <div>
      <h1 className="text-2xl text-gray-600">Overview</h1>
      <div className="flex gap-10">
        {/* users card */}
        <div class="max-w-sm p-6 bg-white border border-gray-200 rounded-lg shadow hover:bg-gray-100 dark:bg-gray-800 dark:border-gray-700 dark:hover:bg-gray-700 mt-10 flex flex-row gap-10">
          <div>
            <h5 class="mb-2 text-2xl font-bold tracking-tight text-gray-500 dark:text-white">
              Users
            </h5>
            <p class="font-normal dark:text-gray-400 text-3xl text-blue-500">
              {users.length}
            </p>
          </div>
          <div class="self-center">
            <Link to="./?tab=users" className="text-blue-500 hover:underline">
              View Users
            </Link>
          </div>
        </div>
        {/* users based on role */}
        <div class="max-w-sm bg-white border border-gray-200 rounded-lg shadow-lg hover:shadow-xl dark:bg-gray-800 dark:border-gray-700 mt-10">
          <div class="p-6">
            <h5 class="text-xl font-bold mb-4 text-gray-700 dark:text-white">
              Users Based on Role
            </h5>

            <div class="grid grid-cols-2 gap-4">
              <div class="flex items-center">
                <span class="mr-2 text-blue-500 dark:text-gray-400">
                  Admin:
                </span>
                <span class="text-gray-700">
                  {users.filter((ele) => ele.role === "Admin").length}
                </span>
              </div>

              <div class="flex items-center">
                <span class="mr-2 text-blue-500 dark:text-gray-400">
                  Developer:
                </span>
                <span class="text-gray-700">
                  {users.filter((ele) => ele.role === "developer").length}
                </span>
              </div>

              <div class="flex items-center">
                <span class="mr-2 text-blue-500 dark:text-gray-400">
                  QA Engineer:
                </span>
                <span class="text-gray-700">
                  {users.filter((ele) => ele.role === "qaengineer").length}
                </span>
              </div>

              <div class="flex items-center">
                <span class="mr-2 text-blue-500 dark:text-gray-400">
                  Support Specialist:
                </span>
                <span class="text-gray-700">
                  {
                    users.filter((ele) => ele.role === "supportspecialist")
                      .length
                  }
                </span>
              </div>

              <div class="flex items-center">
                <span class="mr-2 text-blue-500 dark:text-gray-400">
                  Guest:
                </span>
                <span class="text-gray-700">
                  {users.filter((ele) => ele.role === "guest").length}
                </span>
              </div>
            </div>
          </div>
        </div>
      </div>

      {/* Tasks */}
      <div className="flex flex-row justify justify-between mt-10">
        <h1 className="text-3xl text-gray-500 ">Tasks</h1>
        <button
          type="button"
          className="focus:outline-none text-white bg-purple-700 hover:bg-purple-800 focus:ring-4 focus:ring-purple-300 font-medium rounded-lg text-sm px-5 py-2.5 mb-2 dark:bg-purple-600 dark:hover:bg-purple-700 dark:focus:ring-purple-900"
          onClick={() => navigate("/dashboard/?tab=createtask")}
        >
          Assign Task
        </button>
      </div>
      {/* All task */}
      <div className="flex flex-wrap gap-10">
        {tasks.map((task, index) => {
          const assignedUser = users.find((user) => user._id === task.user);
          return (
            <div
              key={index}
              className="flex flex-col max-w-sm p-6 bg-white border border-gray-200 rounded-lg shadow-md hover:bg-gray-100 dark:bg-gray-800 dark:border-gray-700 dark:hover:bg-gray-700"
            >
              <div className="flex justify-between items-center mb-4 gap-6">
                <h5 className="text-xl font-bold text-gray-700 dark:text-white">
                  {task.title}
                </h5>
                <span
                  className={`px-2.5 py-0.5 rounded ${
                    task.status === "pending"
                      ? "bg-yellow-100 text-yellow-800 text-xs"
                      : "bg-green-100 text-green-800 text-sm"
                  } ${
                    task.status === "pending"
                      ? "dark:bg-yellow-900 dark:text-yellow-300"
                      : "dark:bg-green-900 dark:text-green-300"
                  }`}
                >
                  {task.status}
                </span>
              </div>
              <p className="text-sm text-gray-700 dark:text-gray-400 mb-2">
                Assigned to:{" "}
                {assignedUser ? assignedUser.username : "Unassigned"}
              </p>
              <p className="text-sm text-gray-400 dark:text-gray-400">
                {task.description}
              </p>
            </div>
          );
        })}
      </div>
    </div>
  );
};

export default Landingpage;
