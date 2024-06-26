import React, { useState, createContext } from "react";
import { BrowserRouter, Routes, Route } from "react-router-dom";
import HomeHeader from "../Components/HomeHeader";
import HomeIntro from "./HomeIntro";
import Services from "./Services";
import About from "./About";
import Contact from "./Contact";
import Signup from "./Signup";
import Signin from "./Signin";
import Landingpage from "./Landingpage";
import PrivateRoute from "../Components/PrivateRoute";
import Header from "../Components/Header";
import { useSelector } from "react-redux";
import Dashboard from "./Dashboard";
import Teams from "./Teams";
import Inbox from "./Inbox";
import OnlyAdminRoutes from "../Components/OnlyAdminRoutes";
import Users from "./Users";
import AssignRole from "./AssignRole";
import ForgetPassword from "./ForgetPassword";
import ResetPassword from "./ResetPassword";
import CreateTask from "./CreateTask";
import AssignTask from "./AssignTask";
import Developertask from "./Developertask";
export const mycontext = createContext(null);
const Home = () => {
  const [userId, setUserId] = useState(null);
  const [role, setRole] = useState("");
  const { currentUser } = useSelector((state) => state.user);
  //console.log(currentUser);
  //console.log(userId);
  return (
    <>
      <mycontext.Provider value={{ userId, setUserId, role, setRole }}>
        <BrowserRouter>
          {currentUser === null ? <HomeHeader /> : <Header />}
          <Routes>
            <Route path="/" element={<HomeIntro />} />
            <Route path="/service" element={<Services />} />
            <Route path="/about" element={<About />} />
            <Route path="/contact" element={<Contact />} />
            <Route path="/signup" element={<Signup />} />
            <Route path="/signin" element={<Signin />} />
            <Route path="/forgotPassword" element={<ForgetPassword />} />
            <Route
              path="/reset-password/:id/:token"
              element={<ResetPassword />}
            />
            {/* Private Routes */}
            <Route element={<PrivateRoute />}>
              <Route path="/landingpage" element={<Landingpage />} />
              <Route path="/dashboard" element={<Dashboard />} />
              <Route path="/teams" element={<Teams />} />
              <Route path="/inbox" element={<Inbox />} />
              <Route path="/devtasks" element={<Developertask />} />
            </Route>
            {/* Only Admin Routes */}
            <Route element={<OnlyAdminRoutes />}>
              <Route path="/users" element={<Users />} />
              <Route path="/Assignrole/:id" element={<AssignRole />} />
              <Route path="/createtask" element={<CreateTask />} />
              <Route path="/Assigntask/:id" elelement={<AssignTask />} />
            </Route>
          </Routes>
        </BrowserRouter>
      </mycontext.Provider>
    </>
  );
};

export default Home;
