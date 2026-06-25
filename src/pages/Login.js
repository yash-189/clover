import React, { useState } from 'react'
import { useNavigate, Link } from 'react-router-dom'
import Button from '../components/Button';
import background from '../assets/images/background.jpg'
import Spinner from '../components/Spinner';
import logo from '../assets/images/logo.png'
import { loginUser } from '../api/authApi';
import { storage } from '../utils/storage';

const Login = () => {
  const [loading, setLoading] = useState(false);
  const [message, setMessage] = useState("");
  const [errors, setErrors] = useState({});
  const [login, setLogin] = useState({
    email: "",
    password: "",
  });

  const navigate = useNavigate();

  const onChange = (event) => {
    const { id, value } = event.target;

    setLogin((currentValues) => ({
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

    if (!login.email.trim()) {
      nextErrors.email = "Email is required";
    }

    if (!login.password.trim()) {
      nextErrors.password = "Password is required";
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
      const token = await loginUser(login);
      storage.setToken(token);
      navigate("/");
    } catch (error) {
      setMessage(error.message || "Unable to login right now");
    } finally {
      setLoading(false);
    }
  }

  return (
    <>
      <div className='position-absolute'>
        <img src={background} alt='background' className="img-fluid" style={{ height: "100vh", width: "100vw", objectFit: "cover", filter: "brightness(0.5)" }}></img>
      </div>

      <div className='container position-relative d-flex justify-content-center flex-wrap py-3 user fw-bold flex-column' style={{ height: "100vh" }}>
        <div className='d-flex justify-content-center pb-3'>
          <Link to="/" className='nav-link d-flex text-white'>
            <img src={logo} alt='logo' className="img-fluid pb-md-0 pb-sm-1 pb-2" style={{ width: "40px", height: "40px" }} />
            <h1 className='logo mb-0' style={{ fontFamily: 'Comfortaa, cursive', fontWeight: '900' }}>lover</h1>
          </Link>
        </div>

        <form noValidate onSubmit={onSubmit} className="p-5 align-self-center">
          <div className="mb-3 text-center">
            <h2 style={{ fontFamily: 'Comfortaa, cursive', fontWeight: '900' }}>Log in</h2>
          </div>

          <div className="mb-3">
            <label htmlFor="email" className="form-label">Email address</label>
            <input
              type="email"
              className={`form-control fw-bold ${errors.email ? "is-invalid" : ""}`}
              id="email"
              aria-describedby="emailHelp"
              onChange={onChange}
              value={login.email}
              placeholder='Enter email'
            />
            {errors.email ? <div className="invalid-feedback">{errors.email}</div> : null}
            <div id="emailHelp" className="form-text text-white">We'll never share your email with anyone else.</div>
          </div>

          <div className="mb-3 fw-bold">
            <label htmlFor="password" className="form-label">Password</label>
            <input
              type="password"
              className={`form-control fw-bold ${errors.password ? "is-invalid" : ""}`}
              id="password"
              onChange={onChange}
              value={login.password}
              placeholder='Enter password'
            />
            {errors.password ? <div className="invalid-feedback">{errors.password}</div> : null}
          </div>

          {message ? <p className="text-danger fw-bold mb-3">{message}</p> : null}

          <div className="mt-5">
            {loading ? <Spinner /> : <Button name="Sign in" className={"fw-bold"} width={"100%"} type={"submit"} variant="primary" />}
          </div>

          <p className="small fw-bold mt-2 pt-1 mb-0">Don't have an account?
            <Link
              to="/register"
              className="mx-2 text-decoration-none"
              style={{
                fontSize: "16px",
                background: "-webkit-linear-gradient(#84cb1c, #45c547)",
                WebkitBackgroundClip: "text",
                WebkitTextFillColor: "transparent"
              }}
            >
              Sign Up Now
            </Link>
          </p>
        </form>
      </div>
    </>
  )
}

export default Login
