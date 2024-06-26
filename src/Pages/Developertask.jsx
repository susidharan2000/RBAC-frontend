import React, { useEffect, useState } from 'react';
import axios from 'axios';
import { useSelector } from 'react-redux';

const Developertask = () => {
    const [tasks, setTasks] = useState([]);
    const { currentUser } = useSelector((state) => state.user);
    const [doneBtn, setDoneBtn] = useState([]);

    useEffect(() => {
        const fetchTask = async () => {
            try {
                const response = await axios.get(`https://rbac-backend-dxeh.onrender.com/api/task/getusertask/${currentUser.rest._id}`);
                setTasks(response.data.tasks);
                setDoneBtn(Array(response.data.tasks.length).fill(true));
            } catch (error) {
                console.error("Error fetching data:", error);
            }
        };

        fetchTask();
    }, [currentUser.rest._id]);

    const handleClick = async (taskId, index) => {
        try {
            const response = await axios.put(`https://rbac-backend-dxeh.onrender.com/api/task/update-status/${currentUser.rest._id}/${taskId}`, { status: "completed" });
            setDoneBtn(prevState => {
                const updatedBtns = [...prevState];
                updatedBtns[index] = false;
                return updatedBtns;
            });
            setTasks(prevTasks => {
                const updatedTasks = [...prevTasks];
                updatedTasks[index].status = "completed";
                return updatedTasks;
            });
        } catch (error) {
            console.log(error);
        }
    };

    return (
        <>
            <h1 className="text-3xl text-gray-500 mb-20">My Tasks</h1>
            <div className="flex flex-wrap gap-10 mt-20">
                {tasks.map((task, index) => (
                    <div key={task._id} className="flex flex-col max-w-sm p-6 bg-white border border-gray-200 rounded-lg shadow-md hover:bg-gray-100 dark:bg-gray-800 dark:border-gray-700 dark:hover:bg-gray-700">
                        <div className="flex justify-between items-center mb-4 gap-6">
                            <h5 className="text-xl font-bold text-gray-700 dark:text-white">{task.title}</h5>
                            <span className={`px-2.5 py-0.5 rounded ${task.status === "pending" ? 'bg-yellow-100 text-yellow-800 text-xs' : 'bg-green-100 text-green-800 text-sm'} ${task.status === "pending" ? 'dark:bg-yellow-900 dark:text-yellow-300' : 'dark:bg-green-900 dark:text-green-300'}`}>
                                {task.status}
                            </span>
                        </div>
                        <p className="text-sm text-gray-400 dark:text-gray-400">{task.description}</p>
                        <button
                            type="button"
                            className="focus:outline-none text-white bg-green-700 hover:bg-green-800 focus:ring-4 focus:ring-green-300 font-medium rounded-lg text-sm px-5 py-2.5 me-2 mb-2 dark:bg-green-600 dark:hover:bg-green-700 dark:focus:ring-green-800 w-20 mt-10"
                            disabled={!doneBtn[index]}
                            onClick={() => handleClick(task._id, index)}
                        >
                            Done
                        </button>
                    </div>
                ))}
            </div>
        </>
    );
};

export default Developertask;
