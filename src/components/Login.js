import React, { useState, useEffect } from "react";
import SvgTwitterLogo from "./../iconComponents/SvgTwitterLogo";
import RegisterForm from "./RegisterForm";
import axios from "axios";

const Login = (props) => {
  const [input, setInput] = useState({});
  const [token, setToken] = useState("");
  const [formActive, setFormActive] = useState(false);

  const changeHandler = (e) => {
    let inputCopy = input;
    inputCopy[e.target.name] = e.target.value;
    setInput(inputCopy);
  };
  const submitHandler = (e) => {
    console.log("VALIDATE (TO DO)");
    console.log("submit:", input);
    login();
  };

  const login = async () => {
    const response = await axios.post("/api/v1/users/login", input);
    const data = await response.data;
    setToken(data.token);

    console.log("id:", data.data.user._id);
    props.tokenHandler(token);
  };

  const clickHandler = () => {
    // console.log("Register");
    if (formActive) setFormActive(false);
    else setFormActive(true);
    // console.log(formActive);
  };

  return (
    <div className='wrapper-login'>
      <RegisterForm
        formActive={formActive}
        clickHandler={clickHandler}
        logOut={props.logOut}
      />
      <div className='login'>
        <SvgTwitterLogo height='40px' />
        <h1 className='login__title'>Log in to Twitter</h1>
        <input
          id='email'
          name='email'
          className='login__input'
          type='text'
          placeholder='Email'
          onChange={changeHandler}
        />
        <input
          id='password'
          name='password'
          className='login__input'
          type='password'
          placeholder='Password'
          onChange={changeHandler}
        />
        <button type='submit' onClick={submitHandler}>
          Log in
        </button>
        <div className='login__footer'>
          {/* <a href='#'>Forgot password?</a>
        &nbsp;·&nbsp; */}
          <a href='#' onClick={clickHandler}>
            Sign up for Twitter
          </a>
        </div>
      </div>
    </div>
  );
};

export default Login;
