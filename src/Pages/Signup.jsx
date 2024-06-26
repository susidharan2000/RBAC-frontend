import axios from 'axios';
import React, { useState } from 'react';
import { Link, useNavigate } from 'react-router-dom';
import OAuth from '../Components/OAuth';
const Signup = () => {
    const [formdata,setFormData] = useState({});
    const navigate = useNavigate();
    const handleChange = (e) => {
        e.preventDefault();
        setFormData({...formdata,[e.target.id]:e.target.value.trim()});
    }
    const handleSubmit = async(e) => {
        e.preventDefault();
        try{
            const response = await axios.post('https://rbac-backend-dxeh.onrender.com/api/user/registeruser',formdata);
            if(response.status === 200){
                navigate('/signin');
            }
        }catch(err){
            console.log(err);
        }
    }
    return (
        <div className="flex min-h-full flex-col justify-center px-6 py-12 lg:px-8">
  <div className="sm:mx-auto sm:w-full sm:max-w-sm">
    <h2 className="mt-10 text-center text-2xl font-bold leading-9 tracking-tight text-gray-900">Sign Up</h2>
  </div>
  <div className="mt-10 sm:mx-auto sm:w-full sm:max-w-sm">
    <form className="space-y-6" onSubmit={handleSubmit}>
    <div>
        <label htmlFor="text" className="block text-sm font-medium leading-6 text-gray-900">User name</label>
        <div className="mt-2">
          <input id="username" name="username" type="text" onChange={handleChange} autoComplete="username" required className="block w-full rounded-md border-0 py-1.5 text-gray-900 shadow-sm ring-1 ring-inset ring-gray-300 placeholder:text-gray-400 focus:ring-2 focus:ring-inset focus:ring-indigo-600 sm:text-sm sm:leading-6" />
        </div>
      </div>
      <div>
        <label htmlFor="email" className="block text-sm font-medium leading-6 text-gray-900">Email address</label>
        <div className="mt-2">
          <input id="email" name="email" type="email" onChange={handleChange} autoComplete="email" required className="block w-full rounded-md border-0 py-1.5 text-gray-900 shadow-sm ring-1 ring-inset ring-gray-300 placeholder:text-gray-400 focus:ring-2 focus:ring-inset focus:ring-indigo-600 sm:text-sm sm:leading-6" />
        </div>
      </div>
      <div>
        <div className="flex items-center justify-between">
          <label htmlFor="password" className="block text-sm font-medium leading-6 text-gray-900">Password</label>
        </div>
        <div className="mt-2">
          <input id="password" name="password" type="password" onChange={handleChange} autoComplete="current-password" required className="block w-full rounded-md border-0 py-1.5 text-gray-900 shadow-sm ring-1 ring-inset ring-gray-300 placeholder:text-gray-400 focus:ring-2 focus:ring-inset focus:ring-indigo-600 sm:text-sm sm:leading-6" />
        </div>
      </div>
      <div>
        <button type="submit" className="flex w-full justify-center rounded-md bg-indigo-600 px-3 py-1.5 text-sm font-semibold leading-6 text-white shadow-sm hover:bg-indigo-500 focus-visible:outline focus-visible:outline-2 focus-visible:outline-offset-2 focus-visible:outline-indigo-600">Sign Up</button>
      </div>
    </form>
    <div className="flex gap-2 text-sm mt-6 mb-4">
              <span>Already Have An Account ?</span>
              <Link to="/signin" className="text-blue-500">
                Sign In
              </Link>
            </div>
            <div className="flex items-center mt-6 mb-4">
  <hr className="flex-grow border-gray-300"/>
  <div className="mx-2 text-sm text-gray-500">Or</div>
  <hr className="flex-grow border-gray-300"/>
</div>
    <OAuth />
  </div>
</div>

    );
};

export default Signup;