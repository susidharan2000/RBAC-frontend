import axios from 'axios';
import React, { useState,useContext, useEffect } from 'react';
import { useNavigate } from 'react-router-dom';
import { mycontext } from './Home';
const AssignRole = () => {
    const navigate = useNavigate();
    const {role,userId} = useContext(mycontext);
    const [formData, setFormData] = useState({
        role: role,
        id: userId
    });
    const [viewFormData,setViewFormData] =useState({}); 
    useEffect(()=>{
        fetchdata();
    },[]);
    const fetchdata = async() =>{
        try{
            const response = await axios.get(`https://rbac-backend-dxeh.onrender.com/api/user/getuserbyid/${userId}`,{
                headers: {
                    "Content-Type": "application/json",
                    "Authorization": `Bearer ${localStorage.getItem("Token")}`
                }
            });
            if(response.status === 200){
                setViewFormData(response.data.user);
            }
        }
        catch(error){
            console.log(error);
        }
    }
    useEffect(() => {
        //console.log(viewFormData); // Log updated state
    }, [viewFormData]);
    const handleClickSubmit = async(e) => {
        e.preventDefault();
        try{
            const response = await axios.put('https://rbac-backend-dxeh.onrender.com/api/user/updaterole',formData,{
                headers: {
                    "Content-Type": "application/json",
                    "Authorization": `Bearer ${localStorage.getItem("Token")}`
                }
            });
            if(response.status === 200){
                //console.log(response.data.message);
                navigate('/dashboard?tab=users');
            }
        }
        catch(error){
            console.log(error);
        }
    }
    const handleRoleChange = (e) => {
        setFormData({ ...formData, role: e.target.value });
    }

    return (
        <div className='px-20 gap-5'>
            <h2 className='User-detail text-center text-4xl'>User Detail</h2>
            <div class="mb-6">
        <label for="username" class="block mb-2 text-sm font-medium text-gray-900 dark:text-white text-start">User Name</label>
        <input type="text" id="username" class="bg-gray-50 border border-gray-300 text-gray-900 text-sm rounded-lg focus:ring-blue-500 focus:border-blue-500 block w-full p-2.5 dark:bg-gray-700 dark:border-gray-600 dark:placeholder-gray-400 dark:text-white dark:focus:ring-blue-500 dark:focus:border-blue-500" disabled="true" defaultValue={viewFormData.username} />
    </div> 
    <div class="mb-6">
        <label for="" class="block mb-2 text-sm font-medium text-gray-900 dark:text-white text-start">Email Address</label>
        <input type="text"  class="bg-gray-50 border border-gray-300 text-gray-900 text-sm rounded-lg focus:ring-blue-500 focus:border-blue-500 block w-full p-2.5 dark:bg-gray-700 dark:border-gray-600 dark:placeholder-gray-400 dark:text-white dark:focus:ring-blue-500 dark:focus:border-blue-500" disabled="true" defaultValue={viewFormData.email} />
    </div> 
            <div class="mb-6">
        <label for="" class="block mb-2 text-sm font-medium text-gray-900 dark:text-white text-start">First Name</label>
        <input type="text" id="username" class="bg-gray-50 border border-gray-300 text-gray-900 text-sm rounded-lg focus:ring-blue-500 focus:border-blue-500 block w-full p-2.5 dark:bg-gray-700 dark:border-gray-600 dark:placeholder-gray-400 dark:text-white dark:focus:ring-blue-500 dark:focus:border-blue-500" disabled="true" defaultValue={viewFormData.fname} />
    </div> 
    <div class="mb-6">
        <label for="" class="block mb-2 text-sm font-medium text-gray-900 dark:text-white text-start">Last Name</label>
        <input type="text"  class="bg-gray-50 border border-gray-300 text-gray-900 text-sm rounded-lg focus:ring-blue-500 focus:border-blue-500 block w-full p-2.5 dark:bg-gray-700 dark:border-gray-600 dark:placeholder-gray-400 dark:text-white dark:focus:ring-blue-500 dark:focus:border-blue-500" disabled="true" defaultValue={viewFormData.lname} />
    </div> 
    <div class="mb-6">
        <label for="" class="block mb-2 text-sm font-medium text-gray-900 dark:text-white text-start">Gender</label>
        <input type="text"  class="bg-gray-50 border border-gray-300 text-gray-900 text-sm rounded-lg focus:ring-blue-500 focus:border-blue-500 block w-full p-2.5 dark:bg-gray-700 dark:border-gray-600 dark:placeholder-gray-400 dark:text-white dark:focus:ring-blue-500 dark:focus:border-blue-500" disabled="true" defaultValue={viewFormData.gender} />
    </div> 
    <div class="mb-6">
        <label for="" class="block mb-2 text-sm font-medium text-gray-900 dark:text-white text-start">Phone Number</label>
        <input type="text"  class="bg-gray-50 border border-gray-300 text-gray-900 text-sm rounded-lg focus:ring-blue-500 focus:border-blue-500 block w-full p-2.5 dark:bg-gray-700 dark:border-gray-600 dark:placeholder-gray-400 dark:text-white dark:focus:ring-blue-500 dark:focus:border-blue-500" disabled="true" defaultValue={viewFormData.phonenumber} />
    </div> 
    <div class="mb-6">
        <label for="" class="block mb-2 text-sm font-medium text-gray-900 dark:text-white text-start">Experiance</label>
        <input type="text"  class="bg-gray-50 border border-gray-300 text-gray-900 text-sm rounded-lg focus:ring-blue-500 focus:border-blue-500 block w-full p-2.5 dark:bg-gray-700 dark:border-gray-600 dark:placeholder-gray-400 dark:text-white dark:focus:ring-blue-500 dark:focus:border-blue-500" disabled="true" defaultValue={viewFormData.experiance} />
    </div> 
    <div class="mb-6">
        <label for="" class="block mb-2 text-sm font-medium text-gray-900 dark:text-white text-start">Address</label>
        <input type="text"  class="bg-gray-50 border border-gray-300 text-gray-900 text-sm rounded-lg focus:ring-blue-500 focus:border-blue-500 block w-full p-2.5 dark:bg-gray-700 dark:border-gray-600 dark:placeholder-gray-400 dark:text-white dark:focus:ring-blue-500 dark:focus:border-blue-500" disabled="true" defaultValue={viewFormData.address} />
    </div> 
    
    
    <div>
            <form onSubmit={handleClickSubmit}>
            <label for="" class="block mb-2 text-sm font-medium text-gray-900 dark:text-white text-start">Assign Role</label>
                    <select
                        onChange={handleRoleChange}
                        value={formData.role}
                        className=" bg-gray-700 text-white rounded"
                        
                    >
                        <option value="admin">Admin</option>
                        <option value="ProjectManager">Project Manager</option>
                        <option value="UIdeveloper">UI Developer</option>
                        <option value="FrontendDeveloper">Frontend Developer</option>
                        <option value="DBadmin">DB Admin</option>
                        <option value="BackendDeveloper">Backend Developer</option>
                    </select>
                    <button
                        type="submit"
                        className="focus:outline-none text-white bg-green-700 hover:bg-green-800 focus:ring-4 focus:ring-green-300 font-medium rounded-lg text-sm px-5 py-2.5 me-2 mb-2 dark:bg-green-600 dark:hover:bg-green-700 dark:focus:ring-green-800 ml-9"
                    >
                        Assign
                    </button>
            </form>
        </div>
        </div>
    );
};

export default AssignRole;
