import React, { useState, useContext,useEffect } from "react";
import { useSelector } from "react-redux";
import axios from "axios";
import { mycontext } from "../Pages/Home";
import { IoCloseOutline } from "react-icons/io5";
import debounce from "lodash.debounce";
const Messageheader = ({ chat }) => {
    //console.log(chat.groupAdmin);
    /* states for search users */
    const [query, setQuery] = useState("");
  const [data, setData] = useState([]);
  const [loading, setLoading] = useState(false);
  const [error, setError] = useState("");
  /* end */
  const { setChatToggle, chatToggle } = useContext(mycontext);
  const { currentUser } = useSelector((state) => state.user);
  const userProfilePic = chat.isGroupChat
    ? chat.GroupPic
    : chat.users &&
      chat.users.find((user) => user._id !== currentUser.rest._id)?.profilePic;
  const userName = chat.isGroupChat
    ? chat.chatName
    : chat.users &&
      chat.users.find((user) => user._id !== currentUser.rest._id)?.username;
  /* state for open settings(three dot) */
  const [isDropdownOpen, setIsDropdownOpen] = useState(false);
  /* state for open EditnameModal */
  const [isEditnameModalOpen, setIsEditnameModalOpen] = useState(false);
  /* state for view members */
  const [isViewMember, setIsViewMember] = useState(false);
  /* state for view members for non admin users */
  const [isViewNonAdmin, setIsViewNonAdmin] = useState(false);
  /* state for change group name */
  const [groupname, setGroupname] = useState("");
  //toggle strrings name
  const toggleDropdown = () => {
    setIsDropdownOpen(!isDropdownOpen);
  };
  //edit name modal
  const toggleEditnameModal = () => {
    setIsEditnameModalOpen(!isEditnameModalOpen);
  };
  //for view members
  const toggleViewMember = () => {
    setIsViewMember(!isViewMember);
  };
  //for view non admin members
  const toggleViewNonAdmin = () =>{
    setIsViewNonAdmin(!isViewNonAdmin);
  }
  /* searching users api */
  const handleChangeSearch = (e) => {
    setQuery(e.target.value);
  };
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
  /* end */

  /* Editing name */
  const handleSubmiteditname = async (e) => {
    e.preventDefault();
    const payload = {
      chatId: chat._id,
      chatName: groupname,
    };
    //console.log(payload);
    try {
      const response = await axios.put(
        `https://rbac-backend-dxeh.onrender.com/api/chat/renamegroup`,
        payload,
        {
          headers: {
            "Content-Type": "application/json",
            Authorization: `Bearer ${localStorage.getItem("Token")}`,
          },
        }
      );
      setIsEditnameModalOpen(false);
      setGroupname("");
      setChatToggle(!chatToggle);
      setIsDropdownOpen(!isDropdownOpen);
    } catch (error) {
      console.log(error);
    }
  };
  /* end */
 /* add user to group */
const handleClickaddUser = async (userId) => {
    const payload = {
      chatId: chat._id,
      userId: userId,
    };
    //console.log(payload);
    if(!chat.users.some((user)=>user._id === userId)) {
        try {
            const response = await axios.put(
              `https://rbac-backend-dxeh.onrender.com/api/chat/addgroup`,
              payload,
              {
                headers: {
                  "Content-Type": "application/json",
                  Authorization: `Bearer ${localStorage.getItem("Token")}`,
                },
              }
            );
            setChatToggle(!chatToggle);
            setIsDropdownOpen(false); 
          } catch (error) {
            console.log(error);
          }
    }
  };
  /* end */
  
  /* remove user from group */
  const handleClickremoveUser = async(id) =>{
    const payload = {
      chatId: chat._id,
      userId: id,
    };
    if(id !== chat.groupAdmin){
        try {
            const response = await axios.put(
              `https://rbac-backend-dxeh.onrender.com/api/chat/removefromgroup`,
              payload,
              {
                headers: {
                  "Content-Type": "application/json",
                  Authorization: `Bearer ${localStorage.getItem("Token")}`,
                },
              }
            );
            //console.log(response);
            setChatToggle(!chatToggle);
            setIsDropdownOpen(!isDropdownOpen);
          } catch (error) {
            console.log(error);
          }
    }
  }
/* end */
  return (
    <div>
      <div className="header flex justify-between p-1">
        <ul className="max-w-md divide-y divide-gray-700">
          <li className="pb-2">
            <div className="flex items-center space-x-2">
              <div className="flex-shrink-0">
                <img
                  className="w-10 h-10 rounded-full border-white border-2"
                  src={userProfilePic}
                  alt="User Profile"
                />
              </div>
              <div className="flex-1 min-w-0">
                <p className="text-sm font-medium truncate t">{userName}</p>
              </div>
            </div>
          </li>
        </ul>
        <div className="relative">
          <button
            onClick={toggleDropdown}
            className="inline-flex items-center p-2 text-sm font-medium text-center text-gray-900 bg-white rounded-lg hover:bg-gray-100 focus:ring-4 focus:outline-none dark:text-white focus:ring-gray-50 dark:bg-gray-800 dark:hover:bg-gray-700 dark:focus:ring-gray-600"
            type="button"
          >
            <svg
              className="w-5 h-5"
              aria-hidden="true"
              xmlns="http://www.w3.org/2000/svg"
              fill="currentColor"
              viewBox="0 0 4 15"
            >
              <path d="M3.5 1.5a1.5 1.5 0 1 1-3 0 1.5 1.5 0 0 1 3 0Zm0 6.041a1.5 1.5 0 1 1-3 0 1.5 1.5 0 0 1 3 0Zm0 5.959a1.5 1.5 0 1 1-3 0 1.5 1.5 0 0 1 3 0Z" />
            </svg>
          </button>
          {isDropdownOpen && (
            <div className="absolute right-0 mt-2 w-44 bg-white divide-y divide-gray-100 rounded-lg shadow dark:bg-gray-700 dark:divide-gray-600">
              <ul
                className="py-2 text-sm text-gray-700 dark:text-gray-200"
                aria-labelledby="dropdownMenuIconButton"
              >
                <li>
                  <div className="flex items-center space-x-2 ml-2">
                    <div className="flex-shrink-0">
                      <img
                        className="w-8 h-8 rounded-full border-white border-2"
                        src={userProfilePic}
                        alt="User Profile"
                      />
                    </div>
                    <div className="flex-1 min-w-0">
                      <p className="text-sm font-medium truncate t">
                        {userName}
                      </p>
                    </div>
                  </div>
                </li>
                {(chat.isGroupChat && chat.groupAdmin !== currentUser.rest._id) && (
                    <li>
                    <div className="block px-4 py-2 hover:bg-gray-100 dark:hover:bg-gray-600 dark:hover:text-white hover:cursor-pointer"
                    onClick={toggleViewNonAdmin}
                    >
                      Members
                    </div>
                  </li>
                ) }
                {(chat.isGroupChat && chat.groupAdmin === currentUser.rest._id) && (
                  <>
                    <li>
                      <div className="block px-4 py-2 hover:bg-gray-100 dark:hover:bg-gray-600 dark:hover:text-white hover:cursor-pointer">
                        Group Photo
                      </div>
                    </li>
                    <li>
                      <div
                        className="block px-4 py-2 hover:bg-gray-100 dark:hover:bg-gray-600 dark:hover:text-white hover:cursor-pointer"
                        onClick={toggleEditnameModal}
                      >
                        Group Name
                      </div>
                    </li>
                    <li>
                      <div
                        className="block px-4 py-2 hover:bg-gray-100 dark:hover:bg-gray-600 dark:hover:text-white hover:cursor-pointer"
                        onClick={toggleViewMember}
                      >
                        Members
                      </div>
                    </li>
                  </>
                )}
              </ul>
            </div>
          )}
        </div>
        {/* Edit name Modal */}
        {isEditnameModalOpen && (
          <div className="fixed inset-0 flex items-center justify-center bg-gray-800 bg-opacity-75 z-50">
            <div className="bg-white rounded-lg p-5 max-w-md w-full mx-auto">
              <button
                onClick={toggleEditnameModal}
                className="absolute top-3 end-3 text-gray-400 hover:text-gray-900"
              >
                <svg
                  className="w-5 h-5"
                  viewBox="0 0 20 20"
                  fill="currentColor"
                >
                  <path
                    fillRule="evenodd"
                    d="M10.293 10l3.768-3.768a1 1 0 011.414 1.414L11.414 11l3.061 3.061a1 1 0 01-1.414 1.414L10.293 12l-3.768 3.768a1 1 0 01-1.414-1.414L8.586 11 5.525 7.939a1 1 0 011.414-1.414L10.293 10z"
                    clipRule="evenodd"
                  />
                </svg>
              </button>
              <div className="text-center">
                <h2 className="text-lg font-semibold mb-4">Edit Group Name</h2>
                <form onSubmit={handleSubmiteditname}>
                  <input
                    type="text"
                    className="border rounded px-3 py-2 w-full mb-3"
                    defaultValue={chat.chatName}
                    onChange={(e) => setGroupname(e.target.value)}
                  />
                  <div className="flex justify-center">
                    <button
                      type="submit"
                      className="bg-blue-500 hover:bg-blue-600 text-white px-4 py-2 rounded mr-2"
                    >
                      Update
                    </button>
                    <button
                      onClick={toggleEditnameModal}
                      className="bg-gray-300 hover:bg-gray-400 text-gray-800 px-4 py-2 rounded"
                    >
                      Cancel
                    </button>
                  </div>
                </form>
              </div>
            </div>
          </div>
        )}
        {/* end */}
        {/* Model for viewing members for non admin users */}
        {isViewNonAdmin && (
          <div className="fixed inset-0 flex items-center justify-center bg-gray-800 bg-opacity-75 z-50">
            <div className="bg-white rounded-lg p-5 max-w-md w-full mx-auto">
              <button
                onClick={toggleViewNonAdmin}
                className="absolute top-3 end-3 text-gray-400 hover:text-gray-900"
              >
                <svg
                  className="w-5 h-5"
                  viewBox="0 0 20 20"
                  fill="currentColor"
                >
                  <path
                    fillRule="evenodd"
                    d="M10.293 10l3.768-3.768a1 1 0 011.414 1.414L11.414 11l3.061 3.061a1 1 0 01-1.414 1.414L10.293 12l-3.768 3.768a1 1 0 01-1.414-1.414L8.586 11 5.525 7.939a1 1 0 011.414-1.414L10.293 10z"
                    clipRule="evenodd"
                  />
                </svg>
              </button>
              <div className="text-center">
  <h2 className="text-lg font-semibold mb-4">Members</h2>
  <ul
    className="flex flex-row flex-wrap py-2 text-sm text-gray-700 dark:text-gray-200"
    aria-labelledby="dropdownMenuIconButton"
  >
    {chat.users.map((user) => (
      <li className="flex flex-col items-center" key={user._id}>
        <div className="team flex flex-col items-start border rounded-2xl shadow-md shadow-gray-200 w-45 p-2 m-2 text-center">
            <div className="flex">
        <div>
          <div className="flex items-start space-x-1 ">
            <img
              className="w-6 h-6 rounded-full border-gray border-2"
              src={user.profilePic}
              alt="User Profile"
            />
            <p className="text-sm font-medium truncate">
              {user.username}
            </p>
          </div>
          <p className="text-xs text-gray-500 dark:text-gray-300 truncate">
            {/* Display admin or member based on condition */}
            {user._id === chat.groupAdmin ? (
                      <span className="text-xs px-2 py-1 rounded-md">Admin</span>
                    ) : (
                      <span className="text-xs px-2 py-1 rounded-md">Member</span>
                    )}
          </p>
          </div>
          </div>
        </div>
      </li>
    ))}
  </ul>
  <button
    type="button"
    className="focus:outline-none text-white bg-red-700 hover:bg-red-800 focus:ring-4 focus:ring-red-300 font-medium rounded-lg text-sm px-5 py-2.5 me-2 mb-2 dark:bg-red-600 dark:hover:bg-red-700 dark:focus:ring-red-900"
    onClick={toggleViewNonAdmin}
  >
    Close
  </button>
</div>
            </div>
          </div>
        )}
        {/* end */}
        {/* Modal for view,add and remove */}
        {isViewMember && (
          <div className="fixed inset-0 flex items-center justify-center bg-gray-800 bg-opacity-75 z-50">
            <div className="bg-white rounded-lg p-5 max-w-md w-full mx-auto">
              <button
                onClick={toggleViewMember}
                className="absolute top-3 end-3 text-gray-400 hover:text-gray-900"
              >
                <svg
                  className="w-5 h-5"
                  viewBox="0 0 20 20"
                  fill="currentColor"
                >
                  <path
                    fillRule="evenodd"
                    d="M10.293 10l3.768-3.768a1 1 0 011.414 1.414L11.414 11l3.061 3.061a1 1 0 01-1.414 1.414L10.293 12l-3.768 3.768a1 1 0 01-1.414-1.414L8.586 11 5.525 7.939a1 1 0 011.414-1.414L10.293 10z"
                    clipRule="evenodd"
                  />
                </svg>
              </button>
              <div className="text-center">
  <h2 className="text-lg font-semibold mb-4">Members</h2>
  <ul
    className="flex flex-row flex-wrap py-2 text-sm text-gray-700 dark:text-gray-200"
    aria-labelledby="dropdownMenuIconButton"
  >
    {chat.users.map((user) => (
      <li className="flex flex-col items-center" key={user._id}>
        <div className="team flex flex-col items-start border rounded-2xl shadow-md shadow-gray-200 w-45 p-2 m-2 text-center">
            <div className="flex">
        <div>
          <div className="flex items-start space-x-1 ">
            <img
              className="w-6 h-6 rounded-full border-gray border-2"
              src={user.profilePic}
              alt="User Profile"
            />
            <p className="text-sm font-medium truncate">
              {user.username}
            </p>
          </div>
          <p className="text-xs text-gray-500 dark:text-gray-300 truncate">
            {/* Display admin or member based on condition */}
            {user._id === chat.groupAdmin ? (
                      <span className="text-xs px-2 py-1 rounded-md">Admin</span>
                    ) : (
                      <span className="text-xs px-2 py-1 rounded-md">Member</span>
                    )}
          </p>
          </div>
          <button
          className="text-gray-400"
          onClick={()=>handleClickremoveUser(user._id)}
          >
                        <IoCloseOutline size={20}/>
                        </button>
          </div>
        </div>
      </li>
    ))}
  </ul>
  {/* adding user */}
  <h2 className="text-md text-gray-600">Add Users</h2>
  <form className="mb-6">
          <div className="Search-bar">
            <div className="relative text-gray-600 focus-within:text-gray-400">
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
          <ul >
            <li className="flex flex-col items-center" key={user._id} >
            <div className="team flex flex-col items-start border rounded-2xl shadow-md shadow-gray-200 w-45 p-2 m-2 text-center">
  <div className="flex flex-row gap-10">
    <div>
      <div className="flex items-start space-x-1">
        <img
          className="w-6 h-6 rounded-full border-gray border-2"
          src={user.profilePic}
          alt="User Profile"
        />
        <p className="text-sm font-medium truncate">
          {user.username}
        </p>
      </div>
      <p className="text-xs text-gray-500 dark:text-gray-300 truncate">
        {user.email}
      </p>
    </div>
    <button
      className="focus:outline-none text-white bg-green-700 hover:bg-green-800 focus:ring-4 focus:ring-green-300 font-medium rounded-lg text-sm px-5 py-2.5 me-2 mb-2 dark:bg-green-600 dark:hover:bg-green-700 dark:focus:ring-green-800"
      onClick={() => handleClickaddUser(user._id)}
    >
      Add
    </button>
  </div>
</div>
      </li>
          </ul>
        ))}

  {/* end */}
  <button
    type="button"
    className="focus:outline-none text-white bg-red-700 hover:bg-red-800 focus:ring-4 focus:ring-red-300 font-medium rounded-lg text-sm px-5 py-2.5 me-2 mb-2 dark:bg-red-600 dark:hover:bg-red-700 dark:focus:ring-red-900"
    onClick={toggleViewMember}
  >
    Close
  </button>
</div>
            </div>
          </div>
        )}
        {/* end */}
      </div>
    </div>
  );
};

export default Messageheader;
