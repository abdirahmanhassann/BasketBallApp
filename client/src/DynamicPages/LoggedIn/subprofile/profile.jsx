import React, { useContext } from 'react'
import { NavContext } from '../../../reusable/NavContext';

function Profile() {
    const { userInfo,selectedNav, setSelectedNav } = useContext(NavContext);

  return (
<>
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
</>
  )
}

export default Profile