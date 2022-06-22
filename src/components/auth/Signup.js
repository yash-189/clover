import React, { useState, useEffect } from "react";
import { useNavigate, Link } from 'react-router-dom'
import Button2 from "../Button2";
import background from '../images/background.jpg'
import Spinner from "../Spinner";
import logo from '../images/logo.png'


const Signup = () => {
  const [loading, setloading] = useState(false)

  const navigate = useNavigate();
  const [register, setregister] = useState({
    name: "",
    email: "",
    password: "",
    password2: "",
    errors: {}
  })

  const newUser = {
    name: register.name,
    email: register.email,
    password: register.password,
    password2: register.password2
  };
  const { errors } = register;


  // const onChange=(e) => {setsearch(e.target.value)} 

  // useEffect(() => {
  //   console.log(newUser);
  //   // eslint-disable-next-line react-hooks/exhaustive-deps
  // }, [])

  const onChange = (e) => {
    setregister({ ...register, [e.target.id]: e.target.value });
  };

  const api = process.env.REACT_APP_REGISTER;
  const onSubmit = async (e) => {
    setloading(true)

    e.preventDefault();
    const response = await fetch(api, {
      method: 'POST',
      headers: {
        'Content-Type': 'application/json'
      },
      body: JSON.stringify({ email: register.email, password: register.password, name: register.name, password2: register.password2 })
    });
    const json = await response.json();
    // console.log(json);
    if (json.success) {
      localStorage.setItem('token', json.authtoken);
      setloading(false)
      navigate("/")
      // console.log("success");

    } else {
      alert("Email is already registered")
      setloading(false)
    }
    // console.log(newUser);
  }

  return (
    <>
      <div className='position-absolute'>

        <img src={background} alt="background" className="img-fluid" style={{ height: "100vh", width: "100vw", objectFit: "cover", filter: "brightness(0.5)" }}></img>
      </div>


      <div className='container position-relative  d-flex justify-content-center flex-wrap  user fw-bold flex-column' style={{ height: "100vh" }}>


      <div className='d-flex  justify-content-center '>
          <Link to="/" className='nav-link d-flex text-white ' >
            <img src={logo} alt='logo' className="img-fluid pb-md-0 pb-sm-1 pb-2" style={{ width: "38px", height: "38px" }} />
            <h1 className='logo mb-0' style={{ fontFamily: 'Comfortaa, cursive', fontWeight: '900' }}>lover</h1></Link>
        </div>



        <form noValidate onSubmit={onSubmit} className=" py-4 px-5 align-self-center ">
          <div className="mb-1 text-center">
            <h1>Sign Up</h1>
          </div>


          <div className="mb-3 ">
            <label htmlFor="name" className="form-label">Name</label>
            <input type="text" className="form-control" id="name" onChange={onChange} value={register.name} error={errors.name} placeholder="Name" />
          </div>
          <div className="mb-3">
            <label htmlFor="email" className="form-label">Email address</label>
            <input type="email" className="form-control" id="email" aria-describedby="emailHelp" onChange={onChange} value={register.email} error={errors.email} placeholder="Email" />
            <div id="emailHelp" className="form-text text-white">We'll never share your email with anyone else.</div>
          </div>
          <div className="mb-3">
            <label htmlFor="password" className="form-label">Password</label>
            <input type="password" className="form-control" id="password" onChange={onChange} value={register.password} error={errors.password} placeholder="Password" />
          </div>
          <div className="mb-3">
            <label htmlFor="password2" className="form-label">Confirm Password</label>
            <input type="password" className="form-control" id="password2" onChange={onChange} value={register.password2} error={errors.password2} placeholder="Confirm password" />
          </div>
          <div className="mt-5">
            {loading === false ? <Button2 name="SIGN UP" width={"100%"} type={"submit"} /> : <Spinner />}</div>
          <p className="small fw-bold mt-2 pt-1 mb-0">Already have an account?

            <Link to="/login"><a href="#!"
              className=" mx-2" style={{
                fontSize: "16px",
                background: "-webkit-linear-gradient(#84cb1c, #45c547)",
                webkitBackgroundClip: "text",
                webkitTextFillColor: "transparent"
              }}>Log in</a></Link> </p>
        </form>
      </div>
    </>
  )
}

export default Signup