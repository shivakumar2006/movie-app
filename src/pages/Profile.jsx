import React from 'react';
import { useSelector, useDispatch } from 'react-redux';
import { useNavigate } from 'react-router-dom';
import { supabase } from '../supabase';
import { logOutUser } from '../features/authSlice';

const Profile = () => {

  const navigate = useNavigate();
  const dispatch = useDispatch();
  const user = useSelector((state) => state.auth.user);
  const userMeta = user?.user_metadata || {};
  const profilePicture = user?.user_metadata?.avatar_url || user?.user_metadata?.picture;
  const displayName = userMeta.name || userMeta.full_name || userMeta.user_name || "No name found";

  console.log(user.user_metadata.iss);

  const handleClick = async () => {
    // Log out from Supabase
    await supabase.auth.signOut();

    // Get the current session (should be null after logout)
    const { data: session } = await supabase.auth.getSession();
    console.log('Session after logout:', session); // This should be null if the session was cleared

    // Dispatch logOutUser to clear Redux state
    dispatch(logOutUser());

    // Redirect to home or login page
    navigate("/");
  };

  return (
    <div
      className="w-screen h-screen flex justify-center items-center"
    >
      <div className="w-80 sm:w-96 md:w-120 lg:w-160 h-auto bg-blue-950/20 rounded-2xl flex flex-col shadow-2xl">
        <div className="w-full h-40 rounded-t-2xl flex flex-col justify-center items-center">
          <div className="w-24 sm:w-32 h-24 sm:h-32 mb-0 rounded-full cursor-pointer">
            {profilePicture && (
              <img
                src={profilePicture}
                alt="profile"
                className="w-full h-full rounded-full shadow-lg border-white border-2"
              />
            )}
          </div>
        </div>

        {/* user data */}
        <div className="w-full flex flex-col items-center gap-4 text-black p-4">
          <div className="w-full h-16 hover:bg-black/30 flex flex-col justify-center items-center cursor-pointer">
            <div className="text-2xl sm:text-3xl md:text-4xl">
              <p className='name'>{displayName}</p>
            </div>
          </div>
          <div className="w-full h-16 hover:bg-black/30 flex flex-col justify-center items-center cursor-pointer">
            <div className="text-xl sm:text-2xl">
              <p className='name'>{user?.user_metadata?.email}</p>
            </div>
          </div>
        </div>

        {/* log out */}
        <div className="w-full h-20 rounded-b-2xl flex items-center justify-center p-4">
          <button
            className="w-64 sm:w-72 h-12 text-black text-xl bg-white/10 border-blue-950 border-2 rounded-2xl hover:text-white hover:bg-blue-950 cursor-pointer"
            onClick={handleClick}
          >
            <p className='button'>Log out</p>
          </button>
        </div>
      </div>
    </div>
  );
};

export default Profile;
