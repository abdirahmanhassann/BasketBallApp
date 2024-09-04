import React, { useContext } from 'react'
import { FaRegUser } from "react-icons/fa";
import { IoMdAddCircleOutline } from "react-icons/io";
import { IoLocationOutline } from "react-icons/io5";
import { NavContext } from '../../../reusable/NavContext';
import { Navigate, useNavigate } from 'react-router-dom';


function Leftprofile() {
    const { userInfo,selectedNav, setSelectedNav } = useContext(NavContext);
    const navigate=useNavigate()    
    
  return (

<div className='profileDiv'>
            <div className='profileDivSub' style={{display:'flex',flexDirection:'row',alignItems:'start',gap:'10px',paddingInline:'10px',textAlignLast:'start'}}>
                <img src='../../../../StockImgs/Userimg.png' style={{width:'50px',borderRadius:'50%'}}/>
            <div className='profileDivSub' style={{display:'flex',flexDirection:'column',justifyContent:'center',alignItems:'start'}}>
                <p style={{fontWeight:'bold',fontSize:'12px',color:'#494949'}}>{userInfo&& userInfo.user.firstname} {userInfo&& userInfo.user.lastname}</p>
                <p style={{color:'gray', fontWeight:'normal',fontSize:'12px'}}>@{userInfo && userInfo.user.username}</p>
            </div>
                </div>

            <div className='ProfileDivider'>
            <div className='profileDiveSub' onClick={() => navigate('/profile')}>
            <FaRegUser />
                <p>Profile</p>
            </div>
            <div className='profileDiveSub' onClick={() => navigate('/startgame')}>
            <IoMdAddCircleOutline />
                <p>Start a game</p>
            </div>
            <div className='profileDiveSub' onClick={() => navigate('/Settings')}>
            <IoLocationOutline />
                <p>Based in London,UK</p>
            </div>
            </div>           
           </div>  )
}

export default Leftprofile