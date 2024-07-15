import React, { useEffect, useState } from 'react';
import { useSelector } from 'react-redux';
import axios from 'axios';
const PMTasks = () => {
    const [tasks,setTasks] = useState([]);
    const [users,setUsers] = useState([]);;
    const { currentUser } = useSelector((state) => state.user);
    useEffect(()=>{
        //fetch task data here
       const fetchTaskData =async() =>{
         try{
            const response = await axios.get(`https://rbac-backend-dxeh.onrender.com/api/task/getPMTask/${currentUser.rest._id}`,{
                headers: {
                    "Content-Type": "application/json",
                    "Authorization": `Bearer ${localStorage.getItem("Token")}`
                }
 
            });
            setTasks(response.data.tasks);
         } catch(error){
             console.error("Error fetching task data:", error);
         }
       }
       fetchTaskData();
         //Fetching Users
    const fetchUsers = async () => {
        try {
          const response = await axios.get(
            "https://rbac-backend-dxeh.onrender.com/api/user/getusers",
            {
              headers: {
                "Content-Type": "application/json",
                Authorization: `Bearer ${localStorage.getItem("Token")}`,
              },
            }
          );
          setUsers(response.data.result);
        } catch (error) {
          console.error("Error fetching data:", error);
        }
      };
      fetchUsers();
    },[]);
    return (
        <>
        <div>
        <h1 className='text-gray-500 text-3xl mt-10 mb-6'>All Task</h1>
        </div>
        <div className="flex flex-wrap gap-10">
        {
        tasks.map((task, index) => {
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
        </>
    );
};

export default PMTasks;