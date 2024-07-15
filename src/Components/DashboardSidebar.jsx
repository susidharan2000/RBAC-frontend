import React,{useState,useEffect} from 'react';
import { Sidebar } from "flowbite-react";
import { HiArrowSmRight, HiInbox, HiShoppingBag, HiUser} from "react-icons/hi";
import { useDispatch, useSelector } from "react-redux";
import { Link, useNavigate } from "react-router-dom";
import { SignOutSuccess } from "../Redux/Slice/UserSlice";
import { IoCreateSharp } from "react-icons/io5";
import { GoTasklist } from "react-icons/go";
import { IoChatbubbleEllipsesOutline } from "react-icons/io5";
import { GrProjects } from "react-icons/gr";
import { RiTeamFill } from "react-icons/ri";
const DashboardSidebar = () => {
  const { currentUser } = useSelector((state) => state.user);
  const [tab, settab] = useState("");
  const navigate = useNavigate();
  const dispatch = useDispatch();
  useEffect(() => {
    const urlParams = new URLSearchParams(location.search);
    const tabUrl = urlParams.get("tab"); //tab=profile
    if (tabUrl) {
      settab(tabUrl); //profile
    }
    //console.log(tabUrl);
  }, [location.search]);

  //Sign Out
  const handleClickSignOut = () => {
    dispatch(SignOutSuccess());
    localStorage.removeItem("Token");
    navigate("/signin");
  };
  /* useEffect(() => {
      console.log("Current user role:", currentUser.rest);
  }, [currentUser]); */
  return (
    <Sidebar aria-label="Sidebar with logo branding example ">
      <Sidebar.Logo>Dashboard</Sidebar.Logo>
      <Sidebar.Items>
        <Sidebar.ItemGroup>
          <Sidebar.Item
            active={tab === "profile"}
            label={currentUser.rest.role}
            labelColor="dark"
            as="div"
          >
            <Link to="./?tab=profile">
              <div className="flex gap-4 text-gray-500">
                <img
                  src={currentUser.rest.profilePic}
                  className="w-7 h-7 rounded-full"
                />
                Profile
              </div>
            </Link>
          </Sidebar.Item>

          <Sidebar.Item
            active={tab === "inbox"}
            label={!currentUser.rest.role}
            labelColor="dark"
            as="div"
          >
            <Link to="./?tab=inbox">
              <div className="flex gap-4 text-gray-500">
                <HiInbox size={28} />
                Inbox
              </div>
            </Link>
          </Sidebar.Item>


          {(currentUser.rest.role !== "admin" && currentUser.rest.role !== "ProjectManager" && currentUser.rest.role !== "guest") && (
            <Sidebar.Item active={tab === "team"} as="div">
              <Link to="./?tab=team">
                <div className="flex gap-4 text-gray-500">
                <RiTeamFill size={28} />
                  Team
                </div>
              </Link>
            </Sidebar.Item>
          )}

          {currentUser.rest.role === "admin" && (
            <Sidebar.Item active={tab === "users"} as="div">
              <Link to="./?tab=users">
                <div className="flex gap-4 text-gray-500">
                  <HiUser size={28} />
                  Users
                </div>
              </Link>
            </Sidebar.Item>
          )}
          {currentUser.rest.role === "ProjectManager" && (
            <Sidebar.Item active={tab === "myproject"} as="div">
              <Link to="./?tab=myproject">
                <div className="flex gap-4 text-gray-500">
                  <GrProjects size={19} />
                  My project
                </div>
              </Link>
            </Sidebar.Item>
          )}

          {currentUser.rest.role === "ProjectManager" && (
            <Sidebar.Item active={tab === "PMTasks"} as="div">
              <Link to="./?tab=PMTasks">
                <div className="flex gap-4 text-gray-500">
                  <IoCreateSharp size={28} />
                  Task
                </div>
              </Link>
            </Sidebar.Item>
          )}
          {(currentUser.rest.role !== "admin" && currentUser.rest.role !== "ProjectManager") && (
            <Sidebar.Item active={tab === "devtasks"} as="div">
              <Link to="./?tab=usertask">
                <div className="flex gap-4 text-gray-500">
                  <GoTasklist size={28} />
                  Task
                </div>
              </Link>
            </Sidebar.Item>
          )}

{currentUser.rest.role === "admin" && (
            <Sidebar.Item active={tab === "project"} as="div">
              <Link to="./?tab=project">
                <div className="flex gap-4 text-gray-500">
                <GrProjects size={20}/>
                  Projects
                </div>
              </Link>
            </Sidebar.Item>
          )}
{currentUser.rest.role !== "guest" && (
            <Sidebar.Item active={tab === "chat"} as="div">
              <Link to="./?tab=chat">
                <div className="flex gap-4 text-gray-500">
                <IoChatbubbleEllipsesOutline size={28}/>
                  Chat
                </div>
              </Link>
            </Sidebar.Item>
          )}

          
          <Sidebar.Item>
            <div
              className="flex gap-4 text-gray-500"
              onClick={handleClickSignOut}
            >
              <HiArrowSmRight size={28} />
              Sign Out
            </div>
          </Sidebar.Item>
        </Sidebar.ItemGroup>
      </Sidebar.Items>
    </Sidebar>
  );
};

export default DashboardSidebar;