import axios from 'axios';
import React, { useEffect,useState,useContext } from 'react';
import { IoEyeSharp } from "react-icons/io5";
import { useNavigate } from 'react-router-dom';
import { mycontext } from './Home';
const Users = () => {
    // states for search users(API search)
    const [query,setQuery] = useState("");
    const [data, setData] = useState([]);
    //state for filtering users
    const [filterrole,setfilterrole] =useState("all");
    //state for users
    const [users, setUsers] = useState([]);
    //state for setrole
    const { setUserId,setRole} = useContext(mycontext);
    const navigate = useNavigate();
    useEffect(() => {
        fetchData(); 
    }, []); 
    //handle change search results
    const handleChangeSearch = (e)=>{
        setQuery(e.target.value);
    }
    // search Api
    useEffect(() => {
        const fetchsearchUsers = async () => {
            try {
                if (query.length === 0 || query.length > 2) {
                    const res = await axios.get(`https://rbac-backend-dxeh.onrender.com/api/user/search/username?q=${query}`);
                    setData(res.data);
                } 
            } catch (error) {
                console.error("Error fetching search results:", error);
            }
        }
        if (query !== "" ) {
            fetchsearchUsers();
        } 
    }, [query]);
    // get all users fetch data
    const fetchData = async () => {
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
    const handleClickView = (id,role) =>{
        //console.log(id);
        setUserId(id);
        //console.log(role);
        setRole(role);
        navigate(`./?tab=Assignrole/${id}`);
    };
    // Filter users based on selected role
    const filteredUsers = filterrole === "all" ? users : users.filter(user => user.role === filterrole);
    return (
        <div className='nav-bar'>
            <h1 className='text-center text-3xl mb-5'>Users</h1>
        <div className='flex flex-row justify-between'>
        <div className='Search-bar'>
            <form>
                <div className="relative text-gray-600 focus-within:text-gray-400">
                    <span className="absolute inset-y-0 left-0 flex items-center pl-2">
                        <button type="submit" className="p-1 focus:outline-none focus:shadow-outline">
                            <svg fill="none" stroke="currentColor" stroke-linecap="round" stroke-linejoin="round" stroke-width="2" viewBox="0 0 24 24" class="w-6 h-6"><path d="M21 21l-6-6m2-5a7 7 0 11-14 0 7 7 0 0114 0z"></path></svg>
                        </button>
                    </span>
                    <input type="search"  className="py-2 text-sm text-white bg-gray-700 rounded-md pl-10 focus:outline-none focus:bg-white focus:text-gray-900" placeholder="Search..." onChange={handleChangeSearch}/>
                </div>
            </form>
        </div>
        <div>
            <select onChange={(e) => setfilterrole(e.target.value)} className="ml-2 bg-gray-700 text-white  rounded">
                <option value="all">All</option>
                <option value="admin">Admin</option>
                <option value="guest">Guest</option>
                <option value="developer">Developer</option>
                <option value="qaengineer">QA Engineer</option>
                <option value="supportspecialist">Support Specialist</option>
            </select>
        </div>
    </div>
    <div className='user-data mt-10'>
<div class="relative overflow-x-auto">
    <table class="w-full text-sm text-left rtl:text-right text-gray-500 dark:text-gray-400">
        <thead class="text-xs text-gray-700 uppercase bg-gray-50 dark:bg-gray-700 dark:text-gray-400">
            <tr>
            <th scope="col" class="px-6 py-3">
                    Profile
                </th>
                <th scope="col" class="px-6 py-3">
                    UserId
                </th>
                <th scope="col" class="px-6 py-3">
                    User Name
                </th>
                <th scope="col" class="px-6 py-3">
                    Email
                </th>
                <th scope="col" class="px-6 py-3">
                    Role
                </th>
                <th scope="col" class="px-6 py-3">
                    Action
                </th>
            </tr>
        </thead>
        <tbody>
            {data.length > 0 && query !== 0 ?(
data.map((user,index)=>{
    return(<>
        <tr key={index} class="bg-white border-b dark:bg-gray-800 dark:border-gray-700">
            <td class="px-6 py-4">
            <img className='rounded-full h-12 w-12' src={user.profilePic} />
            </td> 
            <th scope="row" class="px-6 py-4 font-medium text-gray-900 whitespace-nowrap dark:text-white">
                {user._id}
            </th>
            <td class="px-6 py-4">
                {user.username}
            </td>
            <td class="px-6 py-4">
                {user.email}
            </td>
            <td class="px-6 py-4">
                {user.role}
            </td>
            <td class="px-6 py-4">
            <button type="button" class="text-white bg-blue-500 hover:bg-blue-700 focus:ring-4 focus:ring-blue-300 font-medium rounded-lg text-sm px-5 py-2.5 me-2 mb-2 dark:bg-blue-600 dark:hover:bg-blue-700 focus:outline-none dark:focus:ring-blue-800 flex flex-row gap-1" onClick={()=>handleClickView(user._id,user.role)}><IoEyeSharp size={20}/>View</button>
            </td>
        </tr>
        </>
    )
})
            ):(
                filteredUsers.map((user,index)=>{
                    return(<>
                        <tr key={index} class="bg-white border-b dark:bg-gray-800 dark:border-gray-700">
                            <td class="px-6 py-4">
                            <img className='rounded-full h-12 w-12' src={user.profilePic} />
                            </td> 
                            <th scope="row" class="px-6 py-4 font-medium text-gray-900 whitespace-nowrap dark:text-white">
                                {user._id}
                            </th>
                            <td class="px-6 py-4">
                                {user.username}
                            </td>
                            <td class="px-6 py-4">
                                {user.email}
                            </td>
                            <td class="px-6 py-4">
                                {user.role}
                            </td>
                            <td class="px-6 py-4">
                            <button type="button" class="text-white bg-blue-500 hover:bg-blue-700 focus:ring-4 focus:ring-blue-300 font-medium rounded-lg text-sm px-5 py-2.5 me-2 mb-2 dark:bg-blue-600 dark:hover:bg-blue-700 focus:outline-none dark:focus:ring-blue-800 flex flex-row gap-1" onClick={()=>handleClickView(user._id,user.role)}><IoEyeSharp size={20}/>View</button>
                            </td>
                        </tr>
                        </>
                    )
                })
            )}




            
        </tbody>
    </table>
</div>

    </div>
    </div>
    );
};

export default Users;