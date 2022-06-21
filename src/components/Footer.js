import React from 'react'
import imagef from './images/footer.jpg'
import logo from './images/logo.png'

const Footer = () => {
    return (
        <>
        <div>
         <div className='position-absolute'>

<img src={imagef} alt='background' className="img-fluid" style={{ height: "230px", width: "100vw", objectFit: "cover", filter: "brightness(0.18)" }}></img>
</div>
            <div className=' mt-5  position-relative' style={{
    backdropFilter: "grayscale(0.8)"}} >
               
                <div className="container" style={{fontFamily: "Roboto, sans-serif"}}>
                    <footer className="d-flex flex-wrap flex-column flex-md-row justify-content-md-between justify-content-evenly align-items-center pt-3 mt-4 border-top " style={{ height: "230px" }}>
                        <div className='d-flex col-md-4 mb-0 text-white'>
                        <img src={logo} alt='logo' className="img-fluid" style={{width:"30px", height:"30px"}}/>
                        <h3 className="" >lover</h3>

                        </div>

                        <div className='col-md-4  link-dark text-decoration-none  '>
                            <p className='text-white text-center'>Follow Us</p>
                            <div className='d-flex text-white justify-content-center '>
                            <a href='/' className='text-white'><i className="fa-brands fa-telegram fa-lg px-2"></i></a>
                            <a href='/' className='text-white'><i className="fa-brands fa-discord fa-lg px-2"></i></a>
                            <a href='/' className='text-white'><i className="fa-brands fa-twitter fa-lg px-2"></i></a>
                            <a href='/' className='text-white'><i className="fa-brands fa-facebook fa-lg px-2"></i></a>
                            </div>
                        </div>

                    <ul className='nav col-md-4 justify-content-center'>
                        <li className='nav-item'><a href='/' className=' text-decoration-none text-white '>About Us</a></li>
                       <li className='nav-item'><a href='/' className='mx-4 text-decoration-none text-white'>Terms & conditions</a></li>
                       <li className='nav-item'><a href='/' className='text-decoration-none text-white'>Contact Us</a></li>
                        </ul>
                    </footer>
                </div>
            </div>
            </div>

           
            

        </>
    )
}

export default Footer