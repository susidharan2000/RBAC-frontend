import axios from "axios";
import React, { useEffect, useState } from "react";
import { useNavigate } from "react-router-dom";
import { IoMdAdd } from "react-icons/io";

const Projects = () => {
  const [projects, setProjects] = useState([]);
  const [users, setUsers] = useState([]);
  const navigate = useNavigate();
  useEffect(() => {
    const fetchProjects = async () => {
      try {
        const response = await axios.get(
          "https://rbac-backend-dxeh.onrender.com/api/project/getproject",
          {
            headers: {
              "Content-Type": "application/json",
              Authorization: `Bearer ${localStorage.getItem("Token")}`,
            },
          }
        );
        setProjects(response.data.project);
      } catch (error) {
        console.error("Error fetching projects:", error);
      }
    };

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
      } catch (error) {
        console.error("Error fetching users:", error);
      }
    };

    fetchProjects();
    fetchUsers();
  }, [projects]);
  return (
    <div className="gap-10">
        <button type="submit" class="focus:outline-none text-white bg-green-700 hover:bg-green-800 focus:ring-4 focus:ring-green-300 font-medium rounded-lg text-xl px-5 py-2.5 me-2  dark:bg-green-600 dark:hover:bg-green-700 dark:focus:ring-green-800 mb-10 mt-10 flex justify-evenly gap-1" onClick={()=>navigate("./?tab=createproject")}><IoMdAdd size={28}/>Create Project</button>
        <h1 className="mb-7 text-2xl font-bold tracking-tight text-gray-900 dark:text-white">projects</h1>
        <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-6">
  {projects.map((project, index) => (
    <div key={index} className="max-w-sm bg-white border border-gray-200 rounded-lg shadow hover:bg-gray-100 dark:bg-gray-800 dark:border-gray-700 dark:hover:bg-gray-700">
      <div className="p-4">
        <div className="flex justify-between items-center mb-2">
          <h5 className="text-xl sm:text-2xl font-bold tracking-tight text-gray-900 dark:text-white">
            {project.title}
          </h5>
          {project.status === "Pending" ? (
            <span className="bg-yellow-100 text-yellow-800 text-xs sm:text-sm font-medium px-3 py-1 rounded-full uppercase tracking-wide dark:bg-yellow-900 dark:text-yellow-300">
              {project.status}
            </span>
          ) : (
            <span className="bg-green-100 text-green-800 text-xs sm:text-sm font-medium px-3 py-1 rounded-full uppercase tracking-wide dark:bg-green-900 dark:text-green-300">
              {project.status}
            </span>
          )}
        </div>
        <p className="text-sm text-gray-700 dark:text-gray-400 mb-2">
          {project.description}
        </p>
        <p className="text-sm text-gray-700 dark:text-gray-400 mb-2">
          Project Manager:{" "}
          {users.find((user) => user._id === project.projectManager)
            ? users.find((user) => user._id === project.projectManager).username
            : "No project manager assigned"}
        </p>
        <div className="flex flex-wrap gap-1">
          <p className="text-sm text-gray-700 dark:text-gray-400 mb-2">
            Team:{" "}
          </p>
          {project.team.length > 0 ? (
            project.team.map((teamMemberId, idx) => {
              const user = users.find((user) => user._id === teamMemberId);
              return user ? (
                <span
                  key={idx}
                  className="bg-blue-100 text-blue-800 text-xs sm:text-sm font-medium px-2.5 py-0.5 rounded dark:bg-blue-900 dark:text-blue-300"
                >
                  {user.username}
                </span>
              ) : null;
            })
          ) : (
            <p className="text-sm text-gray-700 dark:text-gray-400">
              No team members assigned
            </p>
          )}
        </div>
      </div>
    </div>
  ))}
</div>

    </div>
  );
};

export default Projects;
