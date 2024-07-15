import React, { useEffect, useState, useContext } from 'react';
import axios from 'axios';
import { mycontext } from './Home';
import { useNavigate } from 'react-router-dom';
import { BarChart, Bar, XAxis, YAxis, CartesianGrid, Tooltip, Legend, ResponsiveContainer } from 'recharts';

const CreateTask = () => {
    const { setUserId,projectteam,projectId } = useContext(mycontext);
    const [users, setUsers] = useState([]);
    const [tasks,setTasks] = useState([]);
    const navigate = useNavigate();
    const data = [
        { name: 'Group A', value: 400 },
        { name: 'Group B', value: 300 },
        { name: 'Group C', value: 300 },
        { name: 'Group D', value: 200 },
      ];
    useEffect(() => {
        //console.log(projectteam);
        const fetchUsers = async () => {
            try {
                const response = await axios.get("https://rbac-backend-dxeh.onrender.com/api/user/getusers", {
                    headers: {
                        "Content-Type": "application/json",
                        "Authorization": `Bearer ${localStorage.getItem("Token")}`
                    }
                });
                const fetchedUsers = response.data.result;
                setUsers(fetchedUsers);
                //console.log("Fetched users:", fetchedUsers); // Log fetched users
            } catch (error) {
                console.error("Error fetching users:", error);
            }
        };
        fetchUsers();
        //fetch task data here
       const fetchTaskData =async() =>{
        try{
           const response = await axios.get(`https://rbac-backend-dxeh.onrender.com/api/task/getprojecttask/${projectId}`,{
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
    }, []);
    
    const handleClick = (id) => {
        setUserId(id);
        navigate(`./?tab=Assigntask/${id}`);
    };

    return (
        <>
            <div>
                <h1 className='text-gray-500 text-3xl mt-10'>My Team</h1>
            </div>
            <div className='user-data mt-10'>
                <div className="relative overflow-x-auto">
                    <table className="w-full text-sm text-left rtl:text-right text-gray-500 dark:text-gray-400">
                        <thead className="text-xs text-gray-700 uppercase bg-gray-50 dark:bg-gray-700 dark:text-gray-400">
                            <tr>
                                <th scope="col" className="px-6 py-3">
                                    User Name
                                </th>
                                <th scope="col" className="px-6 py-3">
                                    Email
                                </th>
                                <th scope="col" className="px-6 py-3">
                                    Role
                                </th>
                                <th scope="col" className="px-6 py-3">
                                    Task Pending
                                </th>
                                <th scope="col" className="px-6 py-3">
                                    Task Completed
                                </th>
                                <th scope="col" className="px-6 py-3">
                                    Action
                                </th>
                            </tr>
                        </thead>
                        <tbody>
                            {projectteam.map((user, index) => (
                                <tr key={index} className="bg-white border-b dark:bg-gray-800 dark:border-gray-700">
                                    <th scope="row" className="px-6 py-4 font-medium text-gray-900 whitespace-nowrap dark:text-white">
                                        {user.username}
                                    </th>
                                    <td className="px-6 py-4">
                                        {user.email}
                                    </td>
                                    <td className="px-6 py-4">
                                        {user.role}
                                    </td>
                                    <td className="px-6 py-4">
                                        {user.taskPending.length}
                                    </td>
                                    <td className="px-6 py-4">
                                        {user.taskCompleted.length}
                                    </td>
                                    <td className="px-6 py-4">
                                        <button
                                            type="button"
                                            className="focus:outline-none text-white bg-purple-600 hover:bg-purple-800 focus:ring-4 focus:ring-purple-300 font-medium rounded-lg text-sm px-5 py-2.5 mb-2 dark:bg-purple-600 dark:hover:bg-purple-700 dark:focus:ring-purple-900"
                                            onClick={() => handleClick(user._id)}
                                        >
                                            Assign Task
                                        </button>
                                    </td>
                                </tr>
                            ))}
                        </tbody>
                    </table>
                </div>
            </div>
            <div>
                <h1 className='text-gray-500 text-3xl mt-10 mb-6'>Project Task</h1>
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
<div>
    <h1 className='text-gray-500 text-3xl mt-10'>Performance Report :</h1>
</div>
<div className="performance-chart">
        <ResponsiveContainer width="100%" height={400}>
          <BarChart
            data={projectteam.map(user => ({
              username: user.username,
              taskPending: user.taskPending.length || 0, 
              taskCompleted: user.taskCompleted.length || 0 
            }))}
            margin={{
              top: 5,
              right: 30,
              left: 20,
              bottom: 5,
            }}
          >
            <CartesianGrid strokeDasharray="3 3" />
            <XAxis dataKey="username" />
            <YAxis />
            <Tooltip />
            <Legend />
            <Bar dataKey="taskPending" fill="#8884d8" />
            <Bar dataKey="taskCompleted" fill="#82ca9d" />
          </BarChart>
        </ResponsiveContainer>
      </div>
        </>
    );
};

export default CreateTask;
