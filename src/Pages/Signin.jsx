import React, { useState } from 'react';
import { useNavigate } from 'react-router-dom';
import { useSelector,useDispatch } from 'react-redux';
import { SignInStart,SignInSuccess,SignInFailure } from '../Redux/Slice/UserSlice';
import OAuth from '../Components/OAuth';
import axios from 'axios';
const Signin = () => {
  const [formdata,setFormData] = useState({});
  const navigate = useNavigate();
  const dispatch = useDispatch();
  const {currentUser,loading,error:errormessage} = useSelector((state)=>state.user);
  const handleChange = (e) => {
    e.preventDefault();
    setFormData({...formdata,[e.target.id]:e.target.value.trim()});
}
const handleSubmit = async(e)=>{
  e.preventDefault();
  // Checking if any of the required form fields are empty
  if (!formdata.password || !formdata.email) {
    dispatch(SignInFailure(("please fill out the fields")));
     //return console.log("please fill out the fields");
 }
  try{
    dispatch(SignInStart());
    const response = await axios.post('http://localhost:4000/api/user/login',formdata);
    if (response.success === false) {
      return dispatch(SignInFailure((data.message))); // Setting error message if registration fails
  }
  if (response.status === 200) {
    //console.log("Data received from server:", response);
    if (response.data.token) {
        localStorage.setItem('Token', response.data.token);
        //console.log("Token stored in localStorage:", response.data.token);
    } else {
        console.error("Token is missing in the response data:", response);
    }
    dispatch(SignInSuccess(response.data)); // Setting the current user if sign-in succeeds
    navigate('/dashboard');
} else {
    console.error("Sign-in request failed with status:", response.status);
    dispatch(SignInFailure("Sign-in request failed")); // Setting error message if sign-in fails
}

  }
  catch(err){
    console.error(err);
    }
}
    return (
        <div className="flex min-h-full flex-col justify-center px-6 py-12 lg:px-8">
  <div className="sm:mx-auto sm:w-full sm:max-w-sm">
    <h2 className="mt-10 text-center text-2xl font-bold leading-9 tracking-tight text-gray-900">Sign in to your account</h2>
  </div>
  <div className="mt-10 sm:mx-auto sm:w-full sm:max-w-sm">
    <form className="space-y-6" onSubmit={handleSubmit}>
      <div>
        <label htmlFor="email" className="block text-sm font-medium leading-6 text-gray-900">Email address</label>
        <div className="mt-2">
          <input id="email" name="email" type="email" onChange={handleChange} autoComplete="email" required className="block w-full rounded-md border-0 py-1.5 text-gray-900 shadow-sm ring-1 ring-inset ring-gray-300 placeholder:text-gray-400 focus:ring-2 focus:ring-inset focus:ring-indigo-600 sm:text-sm sm:leading-6" />
        </div>
      </div>
      <div>
        <div className="flex items-center justify-between">
          <label htmlFor="password" className="block text-sm font-medium leading-6 text-gray-900">Password</label>
          <div className="text-sm">
            <a href="#" className="font-semibold text-indigo-600 hover:text-indigo-500">Forgot password?</a>
          </div>
        </div>
        <div className="mt-2">
          <input id="password" name="password" type="password" onChange={handleChange} autoComplete="current-password" required className="block w-full rounded-md border-0 py-1.5 text-gray-900 shadow-sm ring-1 ring-inset ring-gray-300 placeholder:text-gray-400 focus:ring-2 focus:ring-inset focus:ring-indigo-600 sm:text-sm sm:leading-6" />
        </div>
      </div>
      <div>
        <button type="submit" className="flex w-full justify-center rounded-md bg-indigo-600 px-3 py-1.5 text-sm font-semibold leading-6 text-white shadow-sm hover:bg-indigo-500 focus-visible:outline focus-visible:outline-2 focus-visible:outline-offset-2 focus-visible:outline-indigo-600">Sign in</button>
      </div>
    </form>
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

export default Signin;