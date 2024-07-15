import axios from 'axios';
import React, { useEffect, useState,useContext } from 'react';
import { useSelector} from 'react-redux';
import { useNavigate } from 'react-router-dom';
import { mycontext } from './Home';
const Myproject = () => {
    const [projects,setProject] = useState([]);
    const [users,setUsers] = useState([]);
    const { currentUser } = useSelector((state) => state.user);
    const {setProjectTeam,projectteam, setProjectId} = useContext(mycontext);
    const navigate = useNavigate();
    useEffect(()=>{
        
        const fetchdata = async()=>{
            try{
                const response = await axios.get(`https://rbac-backend-dxeh.onrender.com/api/project/getmyproject/${currentUser.rest._id}`);
                setProject(response.data.projects);
                //console.log(response.data.projects);
            }catch(error){
                console.error(error);
            }
        }
        fetchdata();

        const  fetchuserdata = async()=>{
            try{
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
            }catch(error){
                console.error(error);
            }
        };
        fetchuserdata();
        
    },[]);
    /* useEffect(()=>{
        console.log(projects);
        console.log(users);
        console.log(projectteam);
    },[]); */
    const handleClickteam = async(projectid)=>{
        //console.log(projectid);
        setProjectId(projectid);
        try{
            const response = await axios.get(`https://rbac-backend-dxeh.onrender.com/api/project/getmyteam/${projectid}`,{
                headers: {
                                    "Content-Type": "application/json",
                                    Authorization: `Bearer ${localStorage.getItem("Token")}`,
                                }
            });
            setProjectTeam(response.data.team);
            //console.log(response.data.team);
            navigate('./?tab=createtask')

        }
        catch(error){
            console.error(error);
        }
    }
    return (
        <>
        <div className="gap-10">
       
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
        {/* description */}
        <p className="text-sm text-gray-700 dark:text-gray-400 mb-2">
          {project.description}
        </p>
        {/* team */}
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
        {/* Assign task  */}
        <div className="flex items-center space-x-4 mt-5">
          <button className="px-4 py-2 text-sm font-medium text-white bg-blue-500 hover:bg-blue-600 rounded-md dark:text-gray-200 dark:hover:bg-blue-700" onClick={()=>handleClickteam(project._id)}>
            Assign Task
          </button>
  </div>
      </div>
    </div>
  ))}
</div>

    </div>
        </>
    );
};

export default Myproject;