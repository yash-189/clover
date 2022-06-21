import React, { useState, useEffect } from 'react'
import { useNavigate } from 'react-router-dom'
import Button2 from '../Button2';
import background from '../images/background.jpg'
import Spinner from '../Spinner';


const Login = () => {
  const [loading, setloading] = useState(false)

  const navigate = useNavigate();
  const [login, setlogin] = useState({
    email: "",
    password: "",
    errors: {}
  })
  const userData = {
    email: login.email,
    password: login.password
  };
  const { errors } = login;



  // useEffect(() => {
  //   console.log(userData);

  // }, [])

  const onChange = (e) => {
    setlogin({ ...login, [e.target.id]: e.target.value });
  };
const api = process.env.REACT_APP_LOGIN;

  const onSubmit = async (e) => {
    setloading(true)

    e.preventDefault();
    // console.log("enterr");
    const response = await fetch(api, {
      method: 'POST',
      headers: {
        'Content-Type': 'application/json'
      },
      body: JSON.stringify({ email: login.email, password: login.password })
    });
    const json = await response.json();
    // console.log(json);
    if (json.success) {
      localStorage.setItem('token', json.token);
      setloading(false)
      navigate("/")
      // console.log("success");
      // console.log(localStorage.getItem("token"));
      // alert("Login successfully")


    } else {
      alert("Enter valid details")
    }
  }




  return (
    <>
      <div className='position-absolute'>

        <img src={background} alt='background' className="img-fluid" style={{ height: "100vh", width: "100vw", objectFit: "cover", filter: "brightness(0.5)" }}></img>
      </div>


      <div className='container position-relative  d-flex justify-content-center flex-wrap py-3 user' style={{ height: "100vh" }}>
        <form noValidate onSubmit={onSubmit} className="  p-5 align-self-center ">
          <div className="mb-3 text-center">
            <h1>Log in</h1>
          </div>
          <div className="mb-3">
            <label htmlFor="email" className="form-label">Email address</label>
            <input type="email" className="form-control" id="email" aria-describedby="emailHelp" onChange={onChange} value={login.email} error={errors.email} placeholder='Enter email' />
            <div id="emailHelp" className="form-text">We'll never share your email with anyone else.</div>
          </div>
          <div className="mb-3">
            <label htmlFor="password" className="form-label">Password</label>
            <input type="password" className="form-control" id="password" onChange={onChange} value={login.password} error={errors.password} placeholder='Enter password' />
          </div>
          <div type="submit" className="mt-5">
            {loading===false?
            <Button2 name="Sign in" width={"100%"} type={"submit"} />:
            <Spinner/>}
            </div>
          
        </form>
      </div>
    </>
  )
}

export default Login