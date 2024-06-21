import React from 'react';
import { useSelector } from 'react-redux';
import { Outlet } from 'react-router-dom';

const OnlyAdminRoutes = () => {
    const {currentUser} = useSelector((state)=>state.user);
    //console.log(currentUser);
    // Check if currentUser exists and has the role of "admin"
    if (currentUser && currentUser.rest.role === "admin") {
        return <Outlet />;
    } else {
        // Redirect to sign-in page if currentUser is not admin
        return "unauthorized";
    }
};

export default OnlyAdminRoutes;