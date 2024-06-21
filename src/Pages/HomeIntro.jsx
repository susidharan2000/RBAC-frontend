import React from 'react';
import { useTypewriter } from 'react-simple-typewriter';
import {Link } from 'react-router-dom';
const HomeIntro = () => {
    const[typewriter] = useTypewriter({
        words:['ech Solutions Inc.'],
        loop:{},
        typeSpeed:300,
        delaySpeed:200
    });
    return (
        <div className="text-center flex justify-center items-center h-screen flex-col gap-10">
        <h1 className="text-4xl sm:text-7xl text-blue-500">Welcome!</h1>
        <span className="text-2xl sm:text-4xl text-black-300">
          T{typewriter}
        </span>
        <p className="text-md sm:text-3xl text-gray-500">
  We specialize in IT consulting, software development, cybersecurity, and cloud services.
  <br/>
  Our team is committed to delivering innovative solutions that drive business success.
</p>
        <div className='flex flex-row gap-5'>
        <div>
          <button className="bg-blue-500 hover:bg-blue-700 text-white font-bold py-2 px-4 rounded">
            <Link to='signup'>Sign Up</Link>
          </button>
        </div>
        <div>
          <button className="bg-blue-500 hover:bg-blue-700 text-white font-bold py-2 px-4 rounded">
            Learn More
          </button>
        </div>
        </div>
      </div>
    );
};

export default HomeIntro;