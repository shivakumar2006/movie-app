import React, { useEffect } from 'react';
import AuthButtonWithProvider from '../auth/AuthButtonWithProvider';
import { FaGoogle, FaGithub } from "react-icons/fa";
import { supabase } from '../supabase';
import { useDispatch } from 'react-redux';
import { setUser } from '../features/authSlice';
import { SiThemoviedatabase } from "react-icons/si";

const Authentication = () => {
  const dispatch = useDispatch();

  // Get user info on component mount
  useEffect(() => {
    const getUser = async () => {
      const { data: { user }, error } = await supabase.auth.getUser();
      if (error) {
        console.error("Error getting user:", error);
        return;
      }

      if (user) {
        // Dispatch user data to Redux store if user is logged in
        dispatch(setUser(user));
      } else {
        console.log("No user logged in!");
      }
    };
    getUser();
  }, [dispatch]);

  return (
    <div
      className='w-screen h-screen text-black flex flex-col justify-center items-center'
    >
        <div className='w-50 h-15 mx-10 text-8xl text-blue-950 flex justify-center items-center cursor-pointer'>
        {/* M<RiMovie2AiFill />VIES */}
        <SiThemoviedatabase />
        </div>
        <h1 className='text-sm font-light mt-2'>The Movie DataBase</h1>
      {/* <h1 className='text-5xl font-extrabold text-blue-900 md:text-5xl mb-0'>Flick Frenzy</h1> */}
      <div className='w-80 sm:w-96 md:w-120 lg:w-150 h-120 bg-white/8 rounded-2xl flex flex-col justify-center items-center shadow-sm shadow-white hover:shadow-md gap-8'>
        <h1 className='text-xl sm:text-2xl md:text-3xl text-center italic text-gray-500'>Because One Movie is Never Enough</h1>
        <p className='text-sm font-light sm:text-2xl md:text-3xl'>Authentication</p>
        <div className='w-72 sm:w-80 h-14 my-10 text-black rounded-2xl flex flex-col justify-center items-center gap-3'>
          <AuthButtonWithProvider
            Icon={FaGoogle}
            Label={"Sign in with Google"}
            Provider="google"
          />
          <AuthButtonWithProvider
            Icon={FaGithub}
            Label={"Sign in with GitHub"}
            Provider="github"
          />
        </div>
      </div>
    </div>
  );
};

export default Authentication;
