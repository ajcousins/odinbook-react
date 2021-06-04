import React from "react";
import SvgTwitterLogo from "./../iconComponents/SvgTwitterLogo";

const Login = (props) => {
  return (
    <div className='login'>
      <SvgTwitterLogo height='40px' />
      <h1 className='login__title'>Log in to Twitter</h1>
      <input className='login__input' type='text' placeholder='Username' />
      <input className='login__input' type='password' placeholder='Password' />
      Login Page
    </div>
  );
};

export default Login;
