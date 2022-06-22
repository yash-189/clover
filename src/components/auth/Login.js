import React, { useState, useEffect } from 'react'
import { useNavigate, Link, NavLink } from 'react-router-dom'
import Button2 from '../Button2';
import background from '../images/background.jpg'
import Spinner from '../Spinner';
import logo from '../images/logo.png'


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
      setloading(false)
    }
  }




  return (
    <>
      <div className='position-absolute'>

        <img src={background} alt='background' className="img-fluid" style={{ height: "100vh", width: "100vw", objectFit: "cover", filter: "brightness(0.5)" }}></img>
      </div>

      <div className='container position-relative  d-flex justify-content-center flex-wrap py-3 user fw-bold flex-column' style={{ height: "100vh" }}>


        <div className='d-flex  justify-content-center  pb-3'>
          <Link to="/" className='nav-link d-flex text-white ' >
            <img src={logo} alt='logo' className="img-fluid pb-md-0 pb-sm-1 pb-2" style={{ width: "40px", height: "40px" }} />
            <h1 className='logo mb-0' style={{ fontFamily: 'Comfortaa, cursive', fontWeight: '900' }}>lover</h1></Link>
        </div>

        <form noValidate onSubmit={onSubmit} className="  p-5 align-self-center ">
          <div className="mb-3 text-center">
            <h2 style={{ fontFamily: 'Comfortaa, cursive', fontWeight: '900' }}>Log in</h2>
          </div>
          <div className="mb-3">
            <label htmlFor="email" className="form-label">Email address</label>
            <input type="email" className="form-control fw-bold" id="email" aria-describedby="emailHelp" onChange={onChange} value={login.email} error={errors.email} placeholder='Enter email' />
            <div id="emailHelp" className="form-text text-white">We'll never share your email with anyone else.</div>
          </div>
          <div className="mb-3 fw-bold">
            <label htmlFor="password" className="form-label">Password</label>
            <input type="password" className="form-control fw-bold" id="password" onChange={onChange} value={login.password} error={errors.password} placeholder='Enter password' />
          </div>
          <div type="submit" className="mt-5">
            {loading === false ?
              <Button2 name="Sign in" className={"fw-bold"} width={"100%"} type={"submit"} /> :
              <Spinner />}

          </div>
          <p className="small fw-bold mt-2 pt-1 mb-0">Don't have an account?

            <Link to="/register"><a href="#!"
              className=" mx-2" style={{
                fontSize: "16px",
                background: "-webkit-linear-gradient(#84cb1c, #45c547)",
                webkitBackgroundClip: "text",
                webkitTextFillColor: "transparent"
              }}>Sign Up Now</a></Link> </p>

        </form>
      </div>
    </>
  )
}

export default Login