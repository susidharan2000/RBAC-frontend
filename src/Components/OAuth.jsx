import React from 'react';
import { FcGoogle } from "react-icons/fc";
import { app } from '../Firebase';
import { useDispatch } from 'react-redux';
import { useNavigate } from 'react-router-dom';
import { SignInStart,SignInSuccess,SignInFailure } from '../Redux/Slice/UserSlice';
import { GoogleAuthProvider, getAuth, signInWithPopup } from 'firebase/auth';
import axios from 'axios';
const OAuth = () => {
    const auth = getAuth(app);
    const dispatch = useDispatch();
    const navigate = useNavigate();
    
    //google login
    const handleSubmit = async() => {
        const provider = new GoogleAuthProvider();
        provider.setCustomParameters({prompt:'select_account'});
        try {
         const result = await signInWithPopup(auth,provider)
         const response = await axios.post('https://rbac-backend-dxeh.onrender.com/api/user/googleauth',
         {
            name:result.user.displayName,
            email:result.user.email,
            profilePic:result.user.photoURL
        });
         if(response.status === 200){
           localStorage.setItem("Token",response.data.token);
             dispatch(SignInSuccess(response.data))
             navigate('/dashboard');
         }
       } catch (error) {
         dispatch(SignInFailure(error.message))
       }
     }

    return (
        <div>
            <button
      type="submit"
      onClick={handleSubmit}
      className="w-full max-w-xs md:max-w-sm bg-white rounded-md px-4 py-2 text-sm font-semibold leading-6 text-black border-2 border-gray-300 hover:bg-gray-100 focus:outline-none focus:ring-2 focus:ring-gray-600 focus:ring-opacity-50 flex items-center justify-center space-x-2">
     <FcGoogle size={24} />
      <span>Sign in with Google</span>
    </button>
        </div>
    );
};

export default OAuth;