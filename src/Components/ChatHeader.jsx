import React, { useState, useEffect, useContext } from "react";
import { IoSearch } from "react-icons/io5";
import { useSelector } from "react-redux";
import { MdAdd } from "react-icons/md";
import axios from "axios";
import debounce from "lodash.debounce";
import { mycontext } from '../Pages/Home';
import { IoCloseOutline } from "react-icons/io5";

const ChatHeader = () => {
  const [isOpen, setIsOpen] = useState(false);
  const [isModalOpen, setIsModalOpen] = useState(false);
  const { currentUser } = useSelector((state) => state.user);
  const [query, setQuery] = useState("");
  const [data, setData] = useState([]);
  const [loading, setLoading] = useState(false);
  const [error, setError] = useState("");
  const { chatToggle, setChatToggle } = useContext(mycontext);
  const [groupmembers,setGroupmembers] = useState([]);
  const [users, setUsers] = useState([]);
  const [groupname, setGroupname] = useState("");

  const toggleDrawer = () => {
    setIsOpen((prev) => !prev);
  };

  const toggleModal = () => {
    setIsModalOpen((prev) => !prev);
  };

  const handleChangeSearch = (e) => {
    setQuery(e.target.value);
  };

  const handleChange = (e) =>{
    setGroupname(e.target.value);
  }
/* add chat */
  const handleClickAddChat = async (id) => {
    const payload = { userId: id };
    try {
      const response = await axios.post(
        "https://rbac-backend-dxeh.onrender.com/api/chat/accesschat",
        payload,
        {
          headers: {
            "Content-Type": "application/json",
            "Authorization": `Bearer ${localStorage.getItem("Token")}`,
          },
        }
      );
      setChatToggle(!chatToggle);
    } catch (error) {
      console.error(error);
    }
  };
  /* add member to team */
  const handleclickAddmember = async(id)=>{
    if(!groupmembers.includes(id)){
    setGroupmembers((prev) => [...prev, id]);
    }
  }
  /* remove member from team */
  const handleClickremovemember = async (id) => {
    setGroupmembers((prev) => prev.filter((userId) => userId!== id));
  }
  /* create Group chat */
  const handleClickCreateGroup = async(e)=>{
    e.preventDefault();
    if(groupmembers.length > 1){
      const payload = { 
        name: groupname,
        users: JSON.stringify(groupmembers)
    };
        console.log(payload);
      try {
        const response = await axios.post(
          "https://rbac-backend-dxeh.onrender.com/api/chat/creategroup",
          payload,
          {
            headers: {
              "Content-Type": "application/json",
              "Authorization": `Bearer ${localStorage.getItem("Token")}`,
            },
          }
        );
        setChatToggle(!chatToggle);
      } catch (error) {
        console.error(error);
      }
    }else{
      alert("Please select at least two member.");
    }
  }

  const fetchSearchUsers = async (searchQuery) => {
    setLoading(true);
    setError("");
    try {
      const res = await axios.get(
        `https://rbac-backend-dxeh.onrender.com/api/user/search/username?q=${searchQuery}`
      );
      setData(res.data);
    } catch (error) {
      setError("Error fetching search results.");
    } finally {
      setLoading(false);
    }
  };

  const debouncedFetch = debounce(fetchSearchUsers, 300);

  useEffect(() => {
    if (query.length > 2) {
      debouncedFetch(query);
    } else {
      setData([]);
    }
  }, [query]);
 /*  useEffect(() => {
    console.log("Current group members:", groupmembers);
  }, [groupmembers]); */
  useEffect(()=>{
    const fetchUsers = async()=>{
      try{
        const response = await axios.get("https://rbac-backend-dxeh.onrender.com/api/user/users");
        const fetchedUsers = response.data.user;
        //console.log(response.data.user);
        setUsers(fetchedUsers);
      }catch(error){
        console.error(error);
      }
    }
    fetchUsers();
  },[])

  return (
    <div>
      <div className="header flex justify-between p-4 bg-gray-400 rounded-2xl text-white">
        <ul className="max-w-md divide-y divide-gray-700">
          <li className="pb-2">
            <div className="flex items-center space-x-2">
              <div className="flex-shrink-0">
                <img
                  className="w-10 h-10 rounded-full  border-white border-2"
                  src={currentUser.rest.profilePic}
                  alt="User Profile"
                />
              </div>
              <div className="flex-1 min-w-0">
                <p className="text-sm font-medium truncate">
                  {currentUser.rest.username}
                </p>
              </div>
              <div className="inline-flex items-center">
                <button
                  className="bg-gray-500 hover:bg-gray-600 focus:outline-none focus:ring-4 focus:ring-gray-300 rounded-full text-sm p-2 flex items-center"
                  type="button"
                  onClick={toggleDrawer}
                  aria-label="Search User"
                >
                  <IoSearch size={18} />
                </button>
              </div>
            </div>
          </li>
        </ul>
        <div>
          <button
            type="button"
            onClick={toggleModal}
            className="bg-gray-600 hover:bg-gray-700 focus:outline-none focus:ring-4 focus:ring-gray-300 rounded-lg text-sm px-5 py-2.5 flex items-center gap-2"
          >
            <MdAdd size={20} /> Create Group
          </button>
        </div>
      </div>

      <div className={`fixed top-20 left-0 z-40 h-screen p-4 overflow-y-auto transition-transform ${isOpen ? "translate-x-0" : "-translate-x-full"} bg-white w-64 shadow-lg`} aria-hidden={!isOpen}>
        <h5 className="mb-6 text-base font-semibold text-gray-500">Search User</h5>
        <button
          type="button"
          onClick={toggleDrawer}
          className="text-gray-400 hover:bg-gray-200 rounded-lg text-sm w-8 h-8 absolute top-2 right-2"
        >
          &times; {/* Close icon */}
        </button>

        <form className="mb-6">
          <div className="Search-bar">
            <div className="relative text-gray-600 focus-within:text-gray-400">
              <span className="absolute inset-y-0 left-0 flex items-center pl-2">
                <button type="submit" className="p-1 focus:outline-none focus:shadow-outline">
                  <svg
                    fill="none"
                    stroke="currentColor"
                    strokeLinecap="round"
                    strokeLinejoin="round"
                    strokeWidth="2"
                    viewBox="0 0 24 24"
                    className="w-6 h-6"
                  >
                    <path d="M21 21l-6-6m2-5a7 7 0 11-14 0 7 7 0 0114 0z"></path>
                  </svg>
                </button>
              </span>
              <input
                type="search"
                className="py-2 text-sm text-white bg-gray-700 rounded-md pl-10 focus:outline-none focus:bg-white focus:text-gray-900"
                placeholder="Search..."
                onChange={handleChangeSearch}
              />
            </div>
          </div>
        </form>
        {loading && <p>Loading...</p>}
        {error && <p className="text-red-500">{error}</p>}
        {data.map((user) => (
          <ul key={user._id} onClick={() => handleClickAddChat(user._id)}>
            <li className="py-2 hover:cursor-pointer">
              <div className="flex items-center space-x-2">
                <div className="flex-shrink-0">
                  <img
                    className="w-10 h-10 rounded-full border-gray border-2"
                    src={user.profilePic}
                    alt="User Profile"
                  />
                </div>
                <div className="flex-1 min-w-0">
                  <p className="text-sm font-medium truncate">
                    {user.username}
                  </p>
                </div>
              </div>
            </li>
          </ul>
        ))}
      </div>

      {/* Modal for creating group chat*/}
      <div className={`fixed inset-0 z-50 flex justify-center items-center bg-black bg-opacity-50 ${isModalOpen ? 'block' : 'hidden'}`}>
  <div className="relative p-4 w-full max-w-md max-h-full">
    <div className="relative bg-white rounded-lg shadow">
      <button
        type="button"
        className="absolute top-3 right-3 text-gray-400 hover:bg-gray-200 hover:text-gray-900 rounded-lg text-sm w-8 h-8 inline-flex justify-center items-center"
        onClick={toggleModal}
      >
        &times;
      </button>
      <div className="p-4 ">
        <h3 className="mb-5 text-lg font-normal text-gray-500">Create Group</h3>
        {/* From */}
        <form class="space-y-4" action="#" onSubmit={handleClickCreateGroup}>
                    <div>
                        <label for="name" class="block mb-2 text-sm font-medium text-gray-900 dark:text-white">Group name</label>
                        <input type="text" name="name" id="name" class="bg-gray-50 border border-gray-300 text-gray-900 text-sm rounded-lg focus:ring-blue-500 focus:border-blue-500 block w-full p-2.5 dark:bg-gray-600 dark:border-gray-500 dark:placeholder-gray-400 dark:text-white" placeholder="My Team " required  onChange={handleChange}/>
                    </div>
                    {/* added users */}
                    <div className="flex flex-row flex-wrap ">
                    {groupmembers.map((member)=>{
                      const user = users.filter((user)=>user._id === member)
                      return(
                        <div className="team flex flex-row border rounded-2xl shadow-md shadow-gray-200 w-49 p-1 m-2">
                        <div className="flex items-center space-x-1">
                          <img
                            className="w-6 h-6 rounded-full  border-gray border-2"
                            src={user[0].profilePic}
                            alt="User Profile"
                          />
                          <p className="text-sm font-medium truncate">{user[0].username}</p>
                        </div>
                        <button className="text-gray-400" onClick={()=>handleClickremovemember(member)}>
                        <IoCloseOutline size={20}/>
                        </button>
                        </div>
                      )
                    })}
                    </div>
                    <div>
                        <label for="text" class="block mb-2 text-sm font-medium text-gray-900 dark:text-white">Add Users</label>
                        <input type="text" name="users" id="users" placeholder="Jhon deo" onChange={handleChangeSearch} class="bg-gray-50 border border-gray-300 text-gray-900 text-sm rounded-lg focus:ring-blue-500 focus:border-blue-500 block w-full p-2.5 dark:bg-gray-600 dark:border-gray-500 dark:placeholder-gray-400 dark:text-white" required />
                    </div>
                    {/* users list */}
                    {loading && <p>Loading...</p>}
        {error && <p className="text-red-500">{error}</p>}
        {data.map((user) => (
          <ul key={user._id} onClick={()=>handleclickAddmember(user._id)}>
            <li className="py-2 hover:cursor-pointer">
              <div className="flex items-center space-x-2">
                <div className="flex-shrink-0">
                  <img
                    className="w-10 h-10 rounded-full border-gray border-2"
                    src={user.profilePic}
                    alt="User Profile"
                  />
                </div>
                <div className="flex-1 min-w-0">
                  <p className="text-sm font-medium truncate">
                    {user.username}
                  </p>
                </div>
              </div>
            </li>
          </ul>
        ))}
                    <button type="submit" class="w-full focus:outline-none text-white bg-red-500 hover:bg-red-600 focus:ring-4 focus:ring-red-300 font-medium rounded-lg text-sm px-5 py-2.5 me-2 mb-2 dark:bg-red-600 dark:hover:bg-red-700 dark:focus:ring-red-900">Create</button>
                </form>
                {/* end */}
      </div>
    </div>
  </div>
</div>
{/* end */}
    </div>
  );
};

export default ChatHeader;
