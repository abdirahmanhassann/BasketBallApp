import React from 'react'
import { FaRegUser } from "react-icons/fa";
import { IoMdAddCircleOutline } from "react-icons/io";
import { IoLocationOutline } from "react-icons/io5";


function Leftprofile() {
  return (
<div className='profileDiv'>
            <div className='profileDivSub'>
                <p>Lorem.</p>
                <p>Lorem, ipsum.</p>
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
            <div className='profileDiveSub'>
            <IoLocationOutline />
                <p>Based in London,UK</p>
            </div>
            </div>           
           </div>  )
}

export default Leftprofile