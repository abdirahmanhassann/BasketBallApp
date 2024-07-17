import React, { useContext } from 'react'
import { FaRegUser } from "react-icons/fa";
import { IoMdAddCircleOutline } from "react-icons/io";
import { IoLocationOutline } from "react-icons/io5";
import { NavContext } from '../../../reusable/NavContext';


function Leftprofile() {
    const { userInfo,selectedNav, setSelectedNav } = useContext(NavContext);

  return (
<div className='profileDiv'>
            <div className='profileDivSub'>
                <p>{userInfo&& userInfo.user.firstname} {userInfo&& userInfo.user.lastname}</p>
                <p>@{userInfo && userInfo.user.username}</p>
            </div>

            <div className='ProfileDivider'>
            <div className='profileDiveSub'>
            <FaRegUser />
                <p>Profile</p>
            </div>
            <div className='profileDiveSub'>
            <IoMdAddCircleOutline />
                <p>Start a game</p>
            </div>
            <div className='profileDiveSub' onClick={() => setSelectedNav('Settings')}>
            <IoLocationOutline />
                <p>Based in London,UK</p>
            </div>
            </div>           
           </div>  )
}

export default Leftprofile