import { Avatar } from "@material-ui/core"; 
import React, { useState } from 'react'
import { useDispatch, useSelector } from 'react-redux'
import { GoogleLogout } from 'react-google-login';
import { selectSignedIn,
         selectUserData,  
         setSearchInput, 
         setSignedIn, 
         setUserData } from '../features/userSlice'

const Navbar = () => {

    const [inputValue, setInputValue] = useState("tech")
    const isSignedIn = useSelector(selectSignedIn)
    const userData = useSelector(selectUserData)

    const dispatch = useDispatch()

    const logout = (response) => {
        dispatch(setSignedIn(false));
       dispatch(setUserData(null));
    }

    const handleClick = (e) => {
      e.preventDefault();
      dispatch(setSearchInput(inputValue))
    };

  return (
    <div className='navbar'>
      <h1 className='navbar_header'>We blog 📢 </h1>
      {isSignedIn && (
        <div className='blog_search'>
            <input
                type='text'
                placeholder='Search'
                className='search'
                value={inputValue}
                onChange={(e) => setInputValue(e.target.value)}
            />
            <button className="submit" onClick={handleClick}>Search</button>
        </div> 
        )}
        {isSignedIn ?  (
           <div className="navbar__user__data">
           <Avatar
             className="user"
             src={userData?.imageUrl}
             alt={userData?.name}
           />
           <h1 className="signedIn">{userData?.givenName}</h1>
        <GoogleLogout
          clientId="20383348647-rf5q86ikug4asahe6u33jrgh8bhj2ert.apps.googleusercontent.com"
          render={(renderProps) => (
            <button
              onClick={renderProps.onClick}
              disabled={renderProps.disabled}
              className="logout__button"
            >
              Logout 😦
            </button>
          )}
          onLogoutSuccess={logout}
        />
      </div>
    ) : (
      <h1 className="notSignedIn">User not available 😞</h1>
    )}
  </div>
  )
}

export default Navbar
