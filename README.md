# RBAC(Role Based Access Control)
## Project Overview
- This project is a web application built using React.js and React Router for client-side routing. It includes features like user authentication, private routes, and admin-specific routes. Redux is used for state management, and various components handle different functionalities such as user management, task assignment, and messaging.
## Project Structure
### Components:
- HomeHeader: Header component for the homepage.
- Header: Header component for authenticated users.
- PrivateRoute: Custom route component for authenticated users.
- OnlyAdminRoutes: Custom route component for admin-only routes. 
### Pages:
- HomeIntro: Introduction page.
- Services: Service offerings page.
- About: About us page.
- Contact: Contact information page.
- Signup: User registration page.
- Signin: User login page.
- Landingpage: Landing page for authenticated users.
- Dashboard: Main dashboard for authenticated users.
- Teams: Teams management page.
- Inbox: Messaging inbox page.
- Developertask: Tasks page for developers.
- Users: User management page for admins.
- AssignRole: Page to assign roles to users.
- ForgetPassword: Forgot password page.
- ResetPassword: Password reset page.
- CreateTask: Page to create new tasks.
- AssignTask: Page to assign tasks to users.
## Context and State Management
- The application uses React Context API for managing global state related to user authentication (mycontext). It provides userId, setUserId, role, and setRole to manage current user information and role across different components.
## Redux Integration
- Redux is employed for centralized state management, particularly for user-related data (currentUser). It's integrated using useSelector hook to access the current user's state across the application.
## Routing
- React Router: Handles client-side routing for different pages and components.
- Public Routes: Routes accessible to all users.
- Private Routes: Routes accessible only to authenticated users.
- Admin Routes: Routes accessible only to users with admin privileges.
## Dependencies
- "@headlessui/react": "^2.0.4",
- "@heroicons/react": "^2.1.3",
- "@reduxjs/toolkit": "^2.2.5",
- "@tailwindcss/postcss7-compat": "^2.2.17",
- "antd": "^5.18.2",
- "apexcharts": "^3.49.1",
- "axios": "^1.7.2",
- "chart.js": "^4.4.3",
- "firebase": "^10.12.2",
- "flowbite-react": "^0.9.0",
- "formik": "^2.4.6",
- "react": "^18.2.0",
- "react-chartjs-2": "^5.2.0",
- "react-circular-progressbar": "^2.1.0",
- "react-dom": "^18.2.0",
- "react-icons": "^4.10.1",
- "react-redux": "^9.1.2",
- "react-router-dom": "^6.23.1",
- "react-simple-typewriter": "^5.0.1",
- "redux-persist": "^6.0.0",
- "yup": "^1.4.0"

## Usage
### Setup:
 - Clone the repository.
 - Install dependencies using npm install.
### Run:
 - Start the development server with npm start.
 - Access the application on http://localhost:3000.
## Conclusion
 - This README aims to provide a comprehensive overview of the project structure, functionalities, and usage guidelines. For further details, refer to individual component and page documentation within the project source code.