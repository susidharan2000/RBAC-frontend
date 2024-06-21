import React from 'react';
import { Navbar} from "flowbite-react";
import { useLocation,Link } from 'react-router-dom';
const HomeHeader = () => {
    const path = useLocation().pathname;
    return (
        <>
        <Navbar fluid rounded>
        <Navbar.Brand >
        <span className="self-center whitespace-nowrap text-xl font-semibold text-blue-500">
            <Link to="/landingpage">Tech Solutions Inc.</Link>
            </span>
      </Navbar.Brand>
      <Navbar.Toggle />
      <Navbar.Collapse style={{color:"blue"}}>
        <Navbar.Link  active={path === "/"} as="div">
          <Link to="/">Home</Link>
        </Navbar.Link>
        <Navbar.Link active={path === "/about"} as="div">
        <Link to="/about">About</Link>
        </Navbar.Link>
        <Navbar.Link active={path === "/service"} as="div">
        <Link to="/service">Service</Link>
        </Navbar.Link>
        <Navbar.Link active={path === "/contact"} as="div">
            <Link to="/contact">Contact</Link>
        </Navbar.Link>
        <Navbar.Link active={path === "/signup"} as="div">
            <Link to="/signup" className="bg-blue-500 hover:bg-blue-700 text-white font-bold py-2 px-4 rounded">Sign Up</Link>
        </Navbar.Link>
      </Navbar.Collapse>
    </Navbar>
        </>
    );
};

export default HomeHeader;