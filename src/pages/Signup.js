import React, { useState} from "react";
import { useNavigate, Link } from 'react-router-dom'
import Button from "../components/Button";
import background from '../assets/images/background.jpg'
import Spinner from "../components/Spinner";
import logo from '../assets/images/logo.png'
import { registerUser } from "../api/authApi";
import { storage } from '../utils/storage';

const Signup = () => {
  const [loading, setLoading] = useState(false);
  const [message, setMessage] = useState("");
  const [errors, setErrors] = useState({});
  const [register, setRegister] = useState({
    name: "",
    email: "",
    password: "",
    password2: "",
  });

  const navigate = useNavigate();

  const onChange = (event) => {
    const { id, value } = event.target;

    setRegister((currentValues) => ({
      ...currentValues,
      [id]: value,
    }));

    setErrors((currentErrors) => ({
      ...currentErrors,
      [id]: "",
    }));
    setMessage("");
  };

  const validateForm = () => {
    const nextErrors = {};

    if (!register.name.trim()) {
      nextErrors.name = "Name is required";
    }

    if (!register.email.trim()) {
      nextErrors.email = "Email is required";
    }

    if (!register.password.trim()) {
      nextErrors.password = "Password is required";
    } else if (register.password.length < 6) {
      nextErrors.password = "Password should be at least 6 characters";
    }

    if (!register.password2.trim()) {
      nextErrors.password2 = "Confirm password is required";
    } else if (register.password !== register.password2) {
      nextErrors.password2 = "Passwords do not match";
    }

    return nextErrors;
  };

  const onSubmit = async (event) => {
    event.preventDefault();

    const nextErrors = validateForm();
    if (Object.keys(nextErrors).length) {
      setErrors(nextErrors);
      return;
    }

    setLoading(true);
    setMessage("");

    try {
      const token = await registerUser(register);
      storage.setToken(token);
      navigate("/");
    } catch (error) {
      setMessage(error.message || "Unable to sign up right now");
    } finally {
      setLoading(false);
    }
  }

  return (
    <>
      <div className='position-absolute'>
        <img src={background} alt="background" className="img-fluid" style={{ height: "100vh", width: "100vw", objectFit: "cover", filter: "brightness(0.5)" }}></img>
      </div>

      <div className='container position-relative d-flex justify-content-center flex-wrap user fw-bold flex-column' style={{ height: "100vh" }}>
        <div className='d-flex justify-content-center '>
          <Link to="/" className='nav-link d-flex text-white ' >
            <img src={logo} alt='logo' className="img-fluid pb-md-0 pb-sm-1 pb-2" style={{ width: "38px", height: "38px" }} />
            <h1 className='logo mb-0' style={{ fontFamily: 'Comfortaa, cursive', fontWeight: '900' }}>lover</h1>
          </Link>
        </div>

        <form noValidate onSubmit={onSubmit} className="py-4 px-5 align-self-center">
          <div className="mb-1 text-center">
            <h1>Sign Up</h1>
          </div>

          <div className="mb-3 ">
            <label htmlFor="name" className="form-label">Name</label>
            <input type="text" className={`form-control ${errors.name ? "is-invalid" : ""}`} id="name" onChange={onChange} value={register.name} placeholder="Name" />
            {errors.name ? <div className="invalid-feedback">{errors.name}</div> : null}
          </div>

          <div className="mb-3">
            <label htmlFor="email" className="form-label">Email address</label>
            <input type="email" className={`form-control ${errors.email ? "is-invalid" : ""}`} id="email" aria-describedby="emailHelp" onChange={onChange} value={register.email} placeholder="Email" />
            {errors.email ? <div className="invalid-feedback">{errors.email}</div> : null}
            <div id="emailHelp" className="form-text text-white">We'll never share your email with anyone else.</div>
          </div>

          <div className="mb-3">
            <label htmlFor="password" className="form-label">Password</label>
            <input type="password" className={`form-control ${errors.password ? "is-invalid" : ""}`} id="password" onChange={onChange} value={register.password} placeholder="Password" />
            {errors.password ? <div className="invalid-feedback">{errors.password}</div> : null}
          </div>

          <div className="mb-3">
            <label htmlFor="password2" className="form-label">Confirm Password</label>
            <input type="password" className={`form-control ${errors.password2 ? "is-invalid" : ""}`} id="password2" onChange={onChange} value={register.password2} placeholder="Confirm password" />
            {errors.password2 ? <div className="invalid-feedback">{errors.password2}</div> : null}
          </div>

          {message ? <p className="text-danger fw-bold mb-3">{message}</p> : null}

          <div className="mt-5">
            {loading ? <Spinner /> : <Button name="SIGN UP" width={"100%"} type={"submit"} variant="primary" />}
          </div>

          <p className="small fw-bold mt-2 pt-1 mb-0">Already have an account?
            <Link
              to="/login"
              className="mx-2 text-decoration-none"
              style={{
                fontSize: "16px",
                background: "-webkit-linear-gradient(#84cb1c, #45c547)",
                WebkitBackgroundClip: "text",
                WebkitTextFillColor: "transparent"
              }}
            >
              Log in
            </Link>
          </p>
        </form>
      </div>
    </>
  )
}

export default Signup
