import React,{useState,useEffect} from 'react';
import { Sidebar } from "flowbite-react";
import { HiArrowSmRight, HiInbox, HiShoppingBag, HiUser} from "react-icons/hi";
import { useDispatch, useSelector } from 'react-redux';
import { Link, useNavigate } from'react-router-dom';
import { SignOutSuccess } from '../Redux/Slice/UserSlice';
const DashboardSidebar = () => {
    const {currentUser} = useSelector((state)=>state.user);
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
        localStorage.removeItem('Token');
        navigate("/signin");
    }
    return (
        <Sidebar aria-label="Sidebar with logo branding example " >
      <Sidebar.Logo >
        Dashboard
      </Sidebar.Logo>
      <Sidebar.Items>
        <Sidebar.ItemGroup>

          <Sidebar.Item
          active={tab === "profile"}
          label={currentUser.rest.role}
          labelColor="dark"
          as="div"
          >
          <Link to="./?tab=profile">
            <div className='flex gap-4 text-gray-500'>
                <img src={currentUser.rest.profilePic} className="w-7 h-7 rounded-full"/>
            Profile
            </div>
            </Link>
          </Sidebar.Item>

          <Sidebar.Item
          active={tab === "inbox"}
          label={!currentUser.rest.role}
          labelColor="dark"
          as="div">
         <Link to="./?tab=inbox">
           <div className='flex gap-4 text-gray-500'>
           <HiInbox size={28}/>
           Inbox
           </div>
           </Link>
         </Sidebar.Item>
          
         {currentUser.rest.role === "admin" &&
          <Sidebar.Item 
          active={tab === "users"}
           as="div">
            <Link to="./?tab=users">
          <div className='flex gap-4 text-gray-500'>
            <HiUser size={28}/>
            Users</div>
            </Link>
          </Sidebar.Item>
         }
          <Sidebar.Item href="#" >
            <div className='flex gap-4 text-gray-500'>
            <HiShoppingBag size={28}/>
            Products</div>
          </Sidebar.Item>

          <Sidebar.Item>
          <div className='flex gap-4 text-gray-500' onClick={handleClickSignOut}>
            <HiArrowSmRight size={28}/>
            Sign Out</div>
          </Sidebar.Item>
        </Sidebar.ItemGroup>
      </Sidebar.Items>
    </Sidebar>
    );
};

export default DashboardSidebar;