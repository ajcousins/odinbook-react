import React, { useState, useEffect } from "react";
import SvgTwitterLogo from "./../iconComponents/SvgTwitterLogo";
import axios from "axios";

const Login = (props) => {
  const [input, setInput] = useState({});
  const [serverData, setServerData] = useState("");

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
    const data = await response.data.token;
    setServerData(data);
    // console.log(serverData);
  };

  useEffect(() => {
    props.tokenHandler(serverData);
  }, [serverData]);

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
