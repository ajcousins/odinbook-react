import React, { useState, useEffect } from "react";
import SvgTwitterLogo from "./../iconComponents/SvgTwitterLogo";
import axios from "axios";

const Login = (props) => {
  const [input, setInput] = useState({});
  const [token, setToken] = useState("");
  const [userId, setUserId] = useState("");

  const changeHandler = (e) => {
    let inputCopy = input;
    inputCopy[e.target.name] = e.target.value;
    setInput(inputCopy);
    // console.log(input);
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
    // props.userIdHandler(userId);
  };

  // useEffect(() => {
  //   // props.tokenHandler(token);
  //   props.userIdHandler(userId);
  // }, [userId]);

  return (
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
        <a href='#'>Forgot password?</a>
        &nbsp;·&nbsp;
        <a href='#'>Sign up for Twitter</a>
      </div>
    </div>
  );
};

export default Login;
