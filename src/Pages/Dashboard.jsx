import React,{useEffect,useState,useContext} from 'react';
import { useLocation} from 'react-router-dom';
import DashboardProfile from '../Components/DashboardProfile';
import DashboardSidebar from '../Components/DashboardSidebar';
import AssignRole from './AssignRole';
import Inbox from './Inbox';
import Users from './Users';
import { mycontext } from './Home';
const Dashboard = () => {
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
  {tab === "" || tab === "profile"?
  (<div className='flex-grow flex items-center justify-center'>
    {tab === "" && <DashboardProfile />}
    {tab === "profile" && <DashboardProfile />}
  </div>):
  (<div className='mt-8 w-full mr-10'>
  {tab === "inbox" && <Inbox />}
  {tab === "users" && <Users />}
  {tab === `Assignrole/${userId}` && <AssignRole /> }
</div>)
}
</div>

    );
};

export default Dashboard;