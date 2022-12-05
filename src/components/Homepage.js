import React from 'react'
import GoogleLogin from 'react-google-login';
import { useDispatch, useSelector } from 'react-redux';
import { selectSignedIn, setSignedIn, setUserData } from '../features/userSlice';

const Homepage = () => {

    const isSignedIn = useSelector(selectSignedIn);

    const dispatch = useDispatch()
    const login = (response) =>{
        console.log(response);
        dispatch(setSignedIn(true));
        dispatch(setUserData(response.profileObj));
    }

  return (
    <div className="home_page" style={{display: isSignedIn ? "none" : ""}}>
        
        {!isSignedIn ? (
          <div className="login_message">
          <h1>Hey! Welcome 😃</h1>
          <p>
            We provide high quality online resource for reading blogs. Just sign
            up and start reading some quality blogs.
          </p>
          <GoogleLogin
             clientId="20383348647-rf5q86ikug4asahe6u33jrgh8bhj2ert.apps.googleusercontent.com"
             render={renderProps => (
             <button 
               onClick={renderProps.onClick} 
               disabled={renderProps.disabled}
               className="login_button"
              >
                Login with Google
             </button>
              )}
              onSuccess={login}
              onFailure={login}
              isSignedIn={true}
              cookiePolicy={'single_host_origin'}
          /> 
        </div>) : (" ") }
      
    </div>
  )
}

export default Homepage
