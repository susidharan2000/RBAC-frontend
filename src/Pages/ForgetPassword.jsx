import { async } from '@firebase/util';
import axios from 'axios';
import React, { useState } from 'react';

const ForgetPassword = () => {
    const [email,setEmail] = useState('');
    const handleSubmit = async(e)=>{
    e.preventDefault();
    const payload = {
        user_email: email
    };
    try{
        const response = await axios.post('https://rbac-backend-dxeh.onrender.com/api/user/forgot-password',payload);
        if(response.data.status === 200) {
            toast.success(response.data.message)
            navigate('/signin');
        }
    }
    catch(error){
        console.log(error);
    }
    }
    return (<>
    <h1 className="text-3xl text-center text-gray-500 mt-20 mb-10">Forget Password ?</h1>
<form className="max-w-sm mx-auto" onSubmit={handleSubmit}>
  <label htmlFor="email-address-icon" className="block mb-2 text-sm font-medium text-gray-900 dark:text-white">Your Email</label>
  <div className="relative">
    <div className="absolute inset-y-0 start-0 flex items-center ps-3.5 pointer-events-none">
      <svg className="w-4 h-4 text-gray-500 dark:text-gray-400" aria-hidden="true" xmlns="http://www.w3.org/2000/svg" fill="currentColor" viewBox="0 0 20 16">
        <path d="m10.036 8.278 9.258-7.79A1.979 1.979 0 0 0 18 0H2A1.987 1.987 0 0 0 .641.541l9.395 7.737Z" />
        <path d="M11.241 9.817c-.36.275-.801.425-1.255.427-.428 0-.845-.138-1.187-.395L0 2.6V14a2 2 0 0 0 2 2h16a2 2 0 0 0 2-2V2.5l-8.759 7.317Z" />
      </svg>
    </div>
    <input type="text" id="email-address-icon" className="bg-gray-50 border border-gray-300 text-gray-900 text-sm rounded-lg focus:ring-blue-500 focus:border-blue-500 block w-full ps-10 p-2.5  dark:bg-gray-700 dark:border-gray-600 dark:placeholder-gray-400 dark:text-white dark:focus:ring-blue-500 dark:focus:border-blue-500" placeholder="name@company.com" onChange={(e)=>setEmail(e.target.value)}/>
  </div>
  <button type="submit" className="focus:outline-none text-white bg-green-700 hover:bg-green-800 focus:ring-4 focus:ring-green-300 font-medium rounded-lg text-sm px-5 py-2.5 me-2 mb-2 dark:bg-green-600 dark:hover:bg-green-700 dark:focus:ring-green-800 mt-10">Send</button>
</form>
      </>
    );
};

export default ForgetPassword;