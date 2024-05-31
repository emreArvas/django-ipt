import React, { useEffect } from 'react';
import { useDispatch, useSelector } from 'react-redux';
import { getUserProfile } from '../actions/UserActions'; // Assuming you have created the getUserProfile action.
import { useParams } from 'react-router-dom';

const ProfileScreen = ({ match }) => {
  const dispatch = useDispatch();

  // Extract the username from the URL parameter
  const {username} =useParams();

  const userDetails = useSelector((state) => state.userDetails);
  const { loading, error, user } = userDetails;

  useEffect(() => {
    // Dispatch the getUserProfile action with the username parameter
    dispatch(getUserProfile(username));
  }, [dispatch, username]);

  return (
    <div className='loginPage'>
      {loading ? (
        <div>Yükleniyor...</div>
      ) : error ? (
        <div>Error: {error}</div>
      ) : (
        <div>
          <h2>Profil</h2>
          <p>Username: {user.username}</p>
          <p>Email: {user.email}</p>
          <p>İsim: {user.first_name}</p>
          <p>Soyisim: {user.last_name}</p>
          
        </div>
      )}
    </div>
  );
};


export default ProfileScreen;
