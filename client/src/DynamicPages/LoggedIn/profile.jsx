import React, { useEffect } from 'react'
import { useNavigate } from 'react-router-dom'
import auth from '../../reusable/AuthApiReq';
import SignedInHeader from '../../reusable/SignedInHeader';
import { FaRegUser } from "react-icons/fa";
import { IoMdAddCircleOutline } from "react-icons/io";
import { IoLocationOutline } from "react-icons/io5";
import Leftprofile from './subprofile/leftprofile';
import Home from './subprofile/home';


function Profile() {
    const navigate=useNavigate()
    useEffect ( ()=>{
        auth('profile');
    },[])

    



  return (
    <>
    <SignedInHeader/>
    <div className='LargeDivider'>
    <Leftprofile/>
        <Home/>
    </div>
    </>
  )
}

export default Profile