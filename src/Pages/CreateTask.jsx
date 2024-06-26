import React, { useEffect, useState,useContext } from 'react';
import axios from 'axios';
import { mycontext } from './Home';
import { useNavigate } from 'react-router-dom';
const CreateTask = () => {
    const {setUserId} = useContext(mycontext);
    const [users,setUsers] = useState([]);
    const navigate = useNavigate();
    useEffect(()=>{
        const fetchUsers = async () => {
            try {
                const response = await axios.get("https://rbac-backend-dxeh.onrender.com/api/user/getallusers", {
                    headers: {
                        "Content-Type": "application/json",
                        "Authorization": `Bearer ${localStorage.getItem("Token")}`
                    }
                });
                setUsers(response.data.result);
                console.log(response.data.result);
            } catch (error) {
                console.error("Error fetching data:", error);
            }
        };
                fetchUsers();
    },[]);
    const handleClick = (id)=>{
        setUserId(id);
        navigate(`./?tab=Assigntask/${id}`);
    }
    return (<>
        <div>
            <h1 className='text-gray-500 text-3xl text-center'>Create Task</h1>
        </div>
        <div>
            <h1 className='text-gray-500 text-3xl mt-10'>My Team</h1>
        </div>
        <div className='user-data mt-10'>
<div class="relative overflow-x-auto">
    <table class="w-full text-sm text-left rtl:text-right text-gray-500 dark:text-gray-400">
        <thead class="text-xs text-gray-700 uppercase bg-gray-50 dark:bg-gray-700 dark:text-gray-400">
            <tr>
                <th scope="col" class="px-6 py-3">
                    User Name
                </th>
                <th scope="col" class="px-6 py-3">
                    Email
                </th>
                <th scope="col" class="px-6 py-3">
                    task Pending
                </th>
                <th scope="col" class="px-6 py-3">
                    Task Completed
                </th>
                <th scope="col" class="px-6 py-3">
                    Action
                </th>
            </tr>
        </thead>
        <tbody>          
{users.map((user,index)=>{
    return(<>
        <tr key={index} class="bg-white border-b dark:bg-gray-800 dark:border-gray-700">
            <th scope="row" class="px-6 py-4 font-medium text-gray-900 whitespace-nowrap dark:text-white">
                {user.username}
            </th>
            <td class="px-6 py-4">
                {user.email}
            </td>
            <td class="px-6 py-4">
                {user.taskPending.length}
            </td>
            <td class="px-6 py-4">
                {user.taskCompleted.length}
            </td>
            <td class="px-6 py-4">
            <button type="submit" class="focus:outline-none text-white bg-purple-600 hover:bg-purple-800 focus:ring-4 focus:ring-purple-300 font-medium rounded-lg text-sm px-5 py-2.5 mb-2 dark:bg-purple-600 dark:hover:bg-purple-700 dark:focus:ring-purple-900" onClick={()=>handleClick(user._id)}>Assign Task</button>
            </td>
        </tr>
        </>
    )
})
}        
        </tbody>
    </table>
</div>

    </div>
        </>
    );
};

export default CreateTask;