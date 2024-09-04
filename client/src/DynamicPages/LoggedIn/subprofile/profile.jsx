import React, { useContext } from 'react'
import { NavContext } from '../../../reusable/NavContext';
import SignedInHeader from '../../../reusable/SignedInHeader';
import Leftprofile from './leftprofile';

function Profile() {
    const { userInfo,selectedNav, setSelectedNav } = useContext(NavContext);

  return (
    <>
    <SignedInHeader />
    <div className='LargeDivider'>
      <Leftprofile />
<div style={{display:'flex',marginTop:'20px',flexDirection:'row',marginInline:'auto',gap:'10px',flexWrap:'wrap'}}>
    <div>

    <img src='../../../../StockImgs/Userimg.png' style={{width:'80px',borderRadius:'50%'}}/>
    <p>reliabilty 100%</p>
    </div>
    <div>
    <h3>{userInfo&& userInfo.user.firstname} {userInfo&& userInfo.user.lastname}</h3>
    <p>{userInfo && userInfo.user.username}</p>
    </div>
</div>
</div>
</>
  )
}

export default Profile