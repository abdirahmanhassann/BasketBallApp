import React, { useContext, useEffect } from 'react'
import { useNavigate } from 'react-router-dom'
import auth from '../../reusable/AuthApiReq';
import SignedInHeader from '../../reusable/SignedInHeader';
import { FaRegUser } from "react-icons/fa";
import { IoMdAddCircleOutline } from "react-icons/io";
import { IoLocationOutline } from "react-icons/io5";
import Leftprofile from './subprofile/leftprofile';
import Home from './subprofile/home';
import { NavContext, NavProvider } from '../../reusable/NavContext';


function Profile() {
    const navigate=useNavigate()
    const { selectedNav } = useContext(NavContext);

    useEffect ( ()=>{
        auth('profile');
         
    },[])

    const renderComponent = () => {
        switch (selectedNav) {
          case 'Games':
            return null;
            case 'Venues':
                //return <Venues />;
                return null;
                case 'Teams':
                 //   return <Teams />;
                    return null;
          default:
            return <Home />;
        }
      };

      return (
        <>
          <SignedInHeader />
          <div className='LargeDivider'>
            <Leftprofile />
            {renderComponent()}
          </div>
        </>
        
      );    
}

export default Profile