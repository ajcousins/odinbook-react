import { useState } from "react";
import axios from "axios";
import SvgTwitterLogo from "./../iconComponents/SvgTwitterLogo";

const RegisterForm = (props) => {
  const [input, setInput] = useState({});
  const [page, setPage] = useState(0);

  const changeHandler = (e) => {
    let inputCopy = input;
    inputCopy[e.target.name] = e.target.value;
    setInput(inputCopy);
  };

  const submitHandler = () => {
    console.log("Submit:", input);

    axios.post("/api/v1/users/signup", input).then(
      (res) => {
        console.log(res);
        if (res.status === 201) {
          props.logOut();
          setPage(1);
        }
      },
      (err) => {
        console.log(err);
      }
    );

    setInput({});
  };

  if (!props.formActive) return null;

  switch (page) {
    // Blank form
    case 0:
      return (
        <div className='register__wrapper'>
          <div className='register__background' onClick={props.clickHandler} />
          <div className='register__form'>
            <div className='register__header'>
              <SvgTwitterLogo height='29px' />
            </div>
            <h2 className='register__title'>Create your account</h2>
            <input
              name='email'
              className='login__input'
              onChange={changeHandler}
              placeholder='Email'
            />
            <input
              name='name'
              className='login__input'
              onChange={changeHandler}
              placeholder='Full Name'
            />
            <input
              name='handle'
              className='login__input'
              onChange={changeHandler}
              placeholder='Handle'
            />
            <input
              name='password'
              className='login__input'
              onChange={changeHandler}
              placeholder='Password'
              type='password'
            />
            <input
              name='passwordConfirm'
              className='login__input'
              onChange={changeHandler}
              placeholder='Confirm Password'
              type='password'
            />
            <button onClick={submitHandler}>Register</button>
          </div>
        </div>
      );

    // Form submission successful
    case 1:
      return (
        <div className='register__wrapper'>
          <div className='register__background' onClick={props.clickHandler} />
          <div className='register__form'>
            <div className='register__success-page'>
              <div className='register__spacer' />
              <SvgTwitterLogo
                height='44px'
                className='register__logo__success'
              />
              <h2 className='register__title'>Success!</h2>
              <p style={{ whiteSpace: "pre-wrap", textAlign: "center" }}>
                Get the most out of Twitter by staying up to date with {"\n"}
                what's happening.
              </p>
              <button
                className='register__success-button'
                onClick={props.clickHandler}
              >
                Go to login!
              </button>
            </div>
          </div>
        </div>
      );
    default:
      return null;
  }
};

export default RegisterForm;
