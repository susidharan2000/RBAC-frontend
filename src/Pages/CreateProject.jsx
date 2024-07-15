import React, { useEffect, useState } from 'react';
import axios from 'axios';
import { useNavigate } from 'react-router-dom';
const CreateProject = () => {
    const [users,setUsers] = useState([]);
    const [team,setTeam] = useState([]);
    const [formdata,setFormData] = useState({
        title:"",
        description:"",
        projectManager:"",
        team:[],
    });
    const navigate = useNavigate();
    useEffect(()=>{
        const fetchUsers = async () => {
            try {
                const response = await axios.get("https://rbac-backend-dxeh.onrender.com/api/user/getallusers", {
                    headers: {
                        'Content-Type': 'application/json',
                        Authorization: `Bearer ${localStorage.getItem('Token')}`,
                    },
                });
                setUsers(response.data.result);
            } catch (error) {
                console.error("Error fetching users:", error);
            }
        };
        fetchUsers();
        //console.log(users);
    },[]);
    const handleClickAddteam = (id)=>{
        setTeam((Team) => [...Team, id]);
    }
    const handleClickRemoveteam = (id)=>{
        const updatedTeam = team.filter(userId => userId !== id);
        setTeam(updatedTeam);
    }
    const handleChange = (e) => {
        e.preventDefault();
        if(e.target.id === "ProjectManager"){
            const selectedUser = users.find(user => user.username === value);
            if (selectedUser) {
                console.log("ProjectManager");
                setFormData({ ...formdata, projectManager: selectedUser._id});
            }
        }else{
        setFormData({ ...formdata, [e.target.id]: e.target.value});
        }
      };
   /*  useEffect(()=>{
        console.log(team);
    },[team]) */

    const handleCreateProject = async(e)=>{
        e.preventDefault();
        const payload = {
            ...formdata,
            team: team,
        };
        //console.log(payload);
        try{
            const response = await axios.post('https://rbac-backend-dxeh.onrender.com/api/project/createproject',payload,{
                headers: {
                                'Content-Type': 'application/json',
                                Authorization: `Bearer ${localStorage.getItem('Token')}`,
                            }
            });
            if(response.status === 200){
                console.log(response.data.message);
                alert("Project created successfully");
            }
        }catch(err){
            console.error("Error creating project:",err);
        }
        
    }

    return (
        <>
        <h1 class='mt-10 mb-8 text-gray-700 text-center text-4xl'>Create Project</h1>
        <div>
            <form class="max-w-sm mx-auto" onSubmit={handleCreateProject}>
  <div class="mb-5">
    {/* title */}
    <label for="title" class="block mb-2 text-xl font-medium text-gray-600 dark:text-white">Title</label>
    <input type="text" id="title" class="shadow-sm bg-gray-50 border border-gray-300 text-gray-900 text-sm rounded-lg focus:ring-blue-500 focus:border-blue-500 block w-full p-2.5 dark:bg-gray-700 dark:border-gray-600 dark:placeholder-gray-400 dark:text-white dark:focus:ring-blue-500 dark:focus:border-blue-500 dark:shadow-sm-light" placeholder='title' required onChange={handleChange}/>
  </div> 
  {/* Project Description */}
  <label for="description" class="block mb-2 text-xl font-medium text-gray-600 dark:text-white">Project Description</label>
  <textarea id="description" rows="4" class="block p-2.5 w-full text-sm text-gray-900 bg-gray-50 rounded-lg border border-gray-300 focus:ring-blue-500 focus:border-blue-500 dark:bg-gray-700 dark:border-gray-600 dark:placeholder-gray-400 dark:text-white dark:focus:ring-blue-500 dark:focus:border-blue-500" placeholder="description..." onChange={handleChange}></textarea> 
  {/* Select project Manager */}
  <label for="projectManager" class="block mb-5 mt-7 text-xl font-medium text-gray-600 dark:text-white">Select project Manager</label>
  <select id="projectManager" class="bg-gray-50 border border-gray-300 text-gray-900 text-sm rounded-lg focus:ring-blue-500 focus:border-blue-500 block w-full p-2.5 dark:bg-gray-700 dark:border-gray-600 dark:placeholder-gray-400 dark:text-white dark:focus:ring-blue-500 dark:focus:border-blue-500"
  onChange={handleChange}
  >
    <option value="">-- Select Project Manager --</option>  {/* Default option */}
    {users.map((user)=>{
        return (
            (user.role === "ProjectManager")&& (<option value={user._id} key={user._id}>{user.username}</option>)
        )
    })}
  </select>
  <div className="">
  <label htmlFor="team" className="block mb-5 mt-7 text-xl font-medium text-gray-600 dark:text-white">Add team members</label>
{/* Add team members */}
{team.map((teamId, index) => {
    // Find the user object in users array based on teamId
    const user = users.find(user => user._id === teamId);

    return (
        <div key={index} className="display p-2"> {/* Ensure to provide a unique key for each mapped element */}
            {user && (
                <span id={`badge-dismiss-${user._id}`} className="inline-flex items-center px-2 py-1 me-2 text-sm font-medium text-blue-800 bg-blue-100 rounded dark:bg-blue-900 dark:text-blue-300">
                    {user.username} {/* Display username */}
                    <button
                        type="button"
                        className="inline-flex items-center p-1 ms-2 text-sm text-blue-400 bg-transparent rounded-sm hover:bg-blue-200 hover:text-blue-900 dark:hover:bg-blue-800 dark:hover:text-blue-300"
                        data-dismiss-target={`#badge-dismiss-${user._id}`}
                        aria-label="Remove"
                        onClick={()=>handleClickRemoveteam(user._id)}
                    >
                        <svg
                            className="w-2 h-2"
                            aria-hidden="true"
                            xmlns="http://www.w3.org/2000/svg"
                            fill="none"
                            viewBox="0 0 14 14"
                        >
                            <path
                                stroke="currentColor"
                                strokeLinecap="round"
                                strokeLinejoin="round"
                                strokeWidth="2"
                                d="m1 1 6 6m0 0 6 6M7 7l6-6M7 7l-6 6"
                            />
                        </svg>
                        <span className="sr-only">Remove badge</span>
                    </button>
                </span>
            )}
        </div>
    );
})}

  {/* end */}
  <div className="max-w-md overflow-y-auto max-h-96 mt-10"> {/* Adjust max-h-96 based on your design needs */}
  {users.map((user) => (
  (user.role !== "admin" && user.role !== "guest" && user.role !== "ProjectManager") && (
    <div key={user._id} className="mb-4 border border-gray-200 rounded-lg p-3">
      <div className="flex items-center space-x-4 rtl:space-x-reverse">
        <div className="flex-shrink-0">
          <img className="w-8 h-8 rounded-full" src={user.profilePic} alt={`${user.username}'s profile`} />
        </div>
        <div className="flex-1 min-w-0">
          <p className="text-sm font-medium text-gray-900 truncate dark:text-white">
            {user.username}
          </p>
          <p className="text-sm text-gray-500 truncate dark:text-gray-400">
            {user.role}
          </p>
        </div>
        <div className="inline-flex items-center text-base font-semibold text-gray-900 dark:text-white">
          <button
            type="button"
            className="focus:outline-none text-white bg-green-500 hover:bg-green-800 focus:ring-4 focus:ring-green-300 font-medium rounded-lg text-sm px-5 py-2.5 me-2 mb-2 dark:bg-green-600 dark:hover:bg-green-700 dark:focus:ring-green-800"
            onClick={() => handleClickAddteam(user._id)}
          >
            Add
          </button>
        </div>
      </div>
    </div>
  )
))}

  </div>
</div>
<button type="submit" class="focus:outline-none text-white bg-yellow-300 hover:bg-yellow-500 focus:ring-4 focus:ring-yellow-300 font-medium rounded-lg text-sm px-5 py-2.5 me-2 mb-2 dark:focus:ring-yellow-900 mt-10" onClick={()=>navigate("/dashboard?tab=project")} >Create</button>
</form>
        </div>
        </>
    );
};

export default CreateProject;