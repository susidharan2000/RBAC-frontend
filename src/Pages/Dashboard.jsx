import React,{useEffect,useState,useContext} from 'react';
import { useLocation} from 'react-router-dom';
import DashboardProfile from '../Components/DashboardProfile';
import DashboardSidebar from '../Components/DashboardSidebar';
import AssignRole from './AssignRole';
import Inbox from './Inbox';
import Users from './Users';
import { mycontext } from './Home';
import Landingpage from './Landingpage';
import CreateTask from './CreateTask';
import AssignTask from './AssignTask';
import { useSelector } from 'react-redux';
import Developertask from './Developertask';
const Dashboard = () => {
  const {currentUser} = useSelector((state)=>state.user);
    const location = useLocation();
    const [tab,setTab]= useState('')
    const {userId,setUserId} = useContext(mycontext);
    useEffect(()=>{
        const urlParams = new URLSearchParams(location.search);
        const tabUrl = urlParams.get('tab'); 
        if(tabUrl){
            setTab(tabUrl) 
        }
    },[location.search])
    return (
        <div className='min-h-screen flex flex-col md:flex-row sm:w-100'>
  <div className='sm:w-58 mb-4 md:mb-0 md:mr-4 md:mt-4'>
    <DashboardSidebar />
  </div>
  {tab === "profile" ?
  (<div className='flex-grow flex items-center justify-center'>
    {tab === "profile" && <DashboardProfile />}
  </div>):
  (<div className='mt-8 w-full mr-10'>
  {(tab === "" && currentUser.rest.role === "admin") && <Landingpage />}
  {(tab === "landingpage" && currentUser.rest.role === "admin") && <Landingpage />}
  {(tab === "usertask" && currentUser.rest.role !== "admin" ) && <Developertask />}
  {tab === "inbox" && <Inbox />}
  {tab === "users" && <Users />}
  {tab === "createtask" && <CreateTask />}
  {tab === `Assignrole/${userId}` && <AssignRole /> }
  {tab === `Assigntask/${userId}` && <AssignTask />}
</div>)
}
</div>

    );
};

export default Dashboard;