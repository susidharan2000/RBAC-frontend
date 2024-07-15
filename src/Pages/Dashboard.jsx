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
import ChatPage from './ChatPage';
import Projects from './Projects';
import CreateProject from './CreateProject';
import Myproject from './Myproject';
import PMTasks from './PMTasks';
import Team from './Team';
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
  {(tab === "" && currentUser.rest.role === "ProjectManager") && <Landingpage />}
  {(tab === "pmDB" && currentUser.rest.role === "ProjectManager") && <Landingpage />}
  {(tab === "landingpage" && currentUser.rest.role === "admin") && <Landingpage />}
  {(tab === "usertask" && currentUser.rest.role !== "admin" ) && <Developertask />}
  {tab === "inbox" && <Inbox />}
  {tab === "users" && <Users />}
  {tab === "createtask" && <CreateTask />}
  {tab === `Assignrole/${userId}` && <AssignRole /> }
  {tab === `Assigntask/${userId}` && <AssignTask />}
  {tab === "project" && <Projects />}
  {tab === "chat" && <ChatPage />}
  {tab === "createproject" && <CreateProject />}
  {tab === "myproject" && <Myproject />}
  {tab === "PMTasks" && <PMTasks />}
  {tab === "team" && <Team />}
</div>)
}
</div>

    );
};

export default Dashboard;