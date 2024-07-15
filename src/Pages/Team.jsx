import React, { useEffect, useState } from 'react';
import axios from 'axios';
import { useSelector } from 'react-redux';

const Team = () => {
    const [users, setUsers] = useState([]);
    const [projects, setProjects] = useState({});
    const { currentUser } = useSelector((state) => state.user);
    const [team, setTeam] = useState([]); 
    const [projectManager, setProjectManager] = useState(null);

    useEffect(() => {
        const fetchUsers = async () => {
            try {
                const response = await axios.get("https://rbac-backend-dxeh.onrender.com/api/user/users");
                setUsers(response.data.user);
            } catch (error) {
                console.error("Error fetching users:", error);
                // Optionally, set an error state to display to the user
            }
        };

        const fetchProjects = async () => {
            if (currentUser && currentUser.rest && currentUser.rest._id) {
                try {
                    const response = await axios.get(`https://rbac-backend-dxeh.onrender.com/api/project/getmemberteam/${currentUser.rest._id}`);
                    setProjects(response.data.projects || {});
                } catch (error) {
                    console.error("Error fetching user projects:", error);
                    // Optionally, set an error state to display to the user
                }
            }
        };

        fetchUsers();
        fetchProjects();
    }, [currentUser]);

    useEffect(() => {
        if (users.length > 0 && projects.team) {
            const teamMembers = users.filter(user => projects.team.includes(user._id));
            setTeam(teamMembers);
        }
    }, [users, projects]); 

    useEffect(() => {
        if (users.length > 0 && projects.projectManager) {
            const Pm = users.find(user => user._id === projects.projectManager);
            if (Pm) {
                setProjectManager(Pm.username);
            }
        }
    }, [users, projects]);

    return (
        <div>
            <div>
                <h1 className='text-gray-600 text-3xl mt-10'>Project Name:</h1>
                <h1 className='text-gray-500 text-3xl mt-2 mb-6'>{projects.title}</h1>
                <h1 className='text-gray-600 text-3xl mt-10'>Project Description:</h1>
                <h1 className='text-gray-500 text-3xl mt-2 mb-6'>{projects.description}</h1>
                <h1 className='text-gray-600 text-3xl mt-10'>Project Manager:</h1>
                <h1 className='text-gray-500 text-3xl mt-2 mb-6'>{projectManager || 'N/A'}</h1>
                <h1 className='text-gray-600 text-3xl mt-10'>Status:</h1>
                <div>
                    <p className='text-gray-500 text-sm'>Start Date: {new Date(projects.createdAt).toLocaleDateString()}</p>
                    <p className='text-gray-500 text-sm'>End Date: {projects.endDate ? new Date(projects.endDate).toLocaleDateString() : 'N/A'}</p>
                </div>
            </div>

            <h1 className='text-gray-600 text-3xl mt-10 mb-6'>My Team:</h1>
            <ul className="max-w-md divide-y divide-gray-200 dark:divide-gray-700">
                {team.map((user, index) => (
                    <li className="pb-1 sm:pb-4 mt-2" key={user._id}>
                        <div className="flex items-center space-x-6 rtl:space-x-reverse hover:bg-gray-100 dark:hover:bg-gray-800 p-4 rounded-md transition duration-200">
                            <div className="flex-shrink-0">
                                <img className="w-10 h-10 rounded-full" src={user.profilePic} alt={user.username} />
                            </div>
                            <div className="flex-1 min-w-0">
                                <p className="text-sm font-medium text-gray-900 truncate dark:text-white">
                                    {user.username}
                                </p>
                                <p className="text-sm text-gray-500 truncate dark:text-gray-400">
                                    {user.email}
                                </p>
                            </div>
                            <div className="inline-flex items-center text-base font-semibold text-gray-900 dark:text-white">
                                {user.role}
                            </div>
                        </div>
                    </li>
                ))}
            </ul>
        </div>
    );
};

export default Team;
