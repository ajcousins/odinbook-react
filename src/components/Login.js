import React from "react";
import SvgTwitterLogo from "./../iconComponents/SvgTwitterLogo";

const Login = (props) => {
  return (
    <div className='login'>
      <SvgTwitterLogo height='40px' />
      <h1 className='login__title'>Log in to Twitter</h1>
      <input className='login__input' type='text' placeholder='Username' />
      <input className='login__input' type='password' placeholder='Password' />
      <button type='submit'>Log in</button>
      {/* Login Page */}
      <div className='login__footer'>
        <a href='#'>Forgot password?</a>
        &nbsp;·&nbsp;
        <a href='#'>Sign up for Twitter</a>
      </div>
    </div>
  );
};

export default Login;
