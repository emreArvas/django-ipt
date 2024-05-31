import React, { useState, useEffect } from 'react';
import { useDispatch, useSelector } from 'react-redux';
import { getUserProfile, updateUserProfile } from '../actions/UserActions';
import {  useNavigate } from 'react-router-dom';
import {Form} from 'react-bootstrap'
import { USER_PROFILE_UPDATE_RESET } from '../constans/UserConstants';

const UpdateUserProfileScreen = () => {
  const [first_name, setfName] = useState('');
  const [email, setEmail] = useState('');
  const [message, setMessage] = useState('');

  const dispatch = useDispatch();
  const history = useNavigate()

  const userDetails = useSelector((state) => state.userDetails);
  const { loading, error, user } = userDetails;

  const userLogin = useSelector((state) => state.userLogin);
  const { userInfo } = userLogin;

  const userUpdateProfile = useSelector((state) => state.userUpdateProfile);
  const { success } = userUpdateProfile;


  useEffect(()=>{
    if(!userInfo){
      history('/login')
    }
    else{
      if(!user || !user.first_name || success || userInfo.id !== user.id){
        dispatch({type:USER_PROFILE_UPDATE_RESET})
        dispatch(getUserProfile(userInfo.username))

      }
      else{
        setfName(user.first_name)
        setEmail(user.email)
      }
    }



  }, [dispatch, history, userInfo, success, user])

  const submitHandler = (e)=>{
    e.preventDefault()

    const username = userInfo.username
    dispatch(updateUserProfile({first_name, email, username}))

  }





  return (
    <div>
      <h2>Profili Güncelle</h2>
      {loading && <p>Loading...</p>}
      {error && <p>Error: {error}</p>}
      <Form onSubmit={submitHandler}>
      <div>
        <label>İsim:</label>
        <input type="text" value={first_name} onChange={(e) => setfName(e.target.value)} />
      </div>
      <div>
        <label>Email:</label>
        <input type="email" value={email} onChange={(e) => setEmail(e.target.value)} />
      </div>
      <button>Profili Güncelle</button>
      </Form>
    </div>
  
  );
};

export default UpdateUserProfileScreen;