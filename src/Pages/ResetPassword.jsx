import axios from 'axios';
import React, { useState } from 'react';
import { FaLock } from "react-icons/fa6";
import { useNavigate, useParams } from 'react-router-dom';
const ResetPassword = () => {
    const navigate = useNavigate();
    const {id,token} = useParams();
    const [passwords, setPasswords] = useState({
        newPassword: '',
        confirmPassword: ''
    });
    const [formData,setFormdata] = useState({});
    const [passwordMatch, setPasswordMatch] = useState(true); // State to track password match
    const handleChange = (e) => {
        //passowrd validation for form data
        setPasswords({
          ...passwords,
          [e.target.id]: e.target.value
      });
    
      // Check if passwords match
      if (e.target.id === 'confirm_password') {
          setPasswordMatch(e.target.value === passwords.newPassword);
      }
        setFormdata({ ...formData, [e.target.id === 'confirmPassword' ? 'password': e.target.id]: e.target.value });
      };
    
    const handleSubmit = async(e)=>{
        e.preventDefault();
        if (passwords.newPassword !== passwords.confirmPassword) {
          alert('Passwords do not match!');
          return;
      }
      //console.log(formData);
      try{
        const response = await axios.post(`https://rbac-backend-dxeh.onrender.com/api/user/reset-password/${id}/${token}`,formData);
                if(response.status === 200){
                    navigate('/signin');
                }
      }
      catch(err){
                console.log(err);
            }
    }
    return (
        <>
    <h1 className="text-3xl text-center text-gray-500 mt-20 mb-10">Reset Password </h1>
<form className="max-w-sm mx-auto" onSubmit={handleSubmit}>
  <label  className="block mb-2 text-sm font-medium text-gray-900 dark:text-white">New Password</label>
  <div className="relative">
    <div className="absolute inset-y-0 start-0 flex items-center ps-3.5 pointer-events-none">
      <svg className="w-4 h-4 text-gray-500 dark:text-gray-400" aria-hidden="true" xmlns="http://www.w3.org/2000/svg" fill="currentColor" viewBox="0 0 20 16">
      <FaLock />
      </svg>
    </div>
    <input type="password" id="newPassword" className="bg-gray-50 border border-gray-300 text-gray-900 text-sm rounded-lg focus:ring-blue-500 focus:border-blue-500 block w-full ps-10 p-2.5  dark:bg-gray-700 dark:border-gray-600 dark:placeholder-gray-400 dark:text-white dark:focus:ring-blue-500 dark:focus:border-blue-500" value={passwords.newPassword} placeholder="•••••••••••••"  onChange={handleChange}/>
  </div>
  <label  className="mt-5 block mb-2 text-sm font-medium text-gray-900 dark:text-white">Confirm Password</label>
  <div className="relative">
    <div className="absolute inset-y-0 start-0 flex items-center ps-3.5 pointer-events-none">
      <svg className="w-4 h-4 text-gray-500 dark:text-gray-400" aria-hidden="true" xmlns="http://www.w3.org/2000/svg" fill="currentColor" viewBox="0 0 20 16">
      <FaLock />
      </svg>
    </div>
    <input type="password" id="confirmPassword" className="bg-gray-50 border border-gray-300 text-gray-900 text-sm rounded-lg focus:ring-blue-500 focus:border-blue-500 block w-full ps-10 p-2.5  dark:bg-gray-700 dark:border-gray-600 dark:placeholder-gray-400 dark:text-white dark:focus:ring-blue-500 dark:focus:border-blue-500" value={passwords.confirmPassword} placeholder="•••••••••••••" onChange={handleChange} />
  </div>
  <button type="submit" className="focus:outline-none text-white bg-green-700 hover:bg-green-800 focus:ring-4 focus:ring-green-300 font-medium rounded-lg text-sm px-5 py-2.5 me-2 mb-2 dark:bg-green-600 dark:hover:bg-green-700 dark:focus:ring-green-800 mt-10">Reset</button>
</form>
      </>
    );
};

export default ResetPassword;