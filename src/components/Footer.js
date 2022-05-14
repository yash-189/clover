import React from 'react'
import imagef from './images/footer.jpg'

const Footer = () => {
    return (
        <>
        <div>
         <div className='position-absolute'>

<img src={imagef} className="img-fluid" style={{ height: "230px", width: "1600px", objectFit: "cover", filter: "brightness(0.18)" }}></img>
</div>
            <div className=' mt-5  position-relative' style={{
    backdropFilter: "grayscale(0.8)"}} >
               
                <div className="container" style={{fontFamily: "Roboto, sans-serif"}}>
                    <footer className="d-flex flex-wrap justify-content-between align-items-center pt-3 mt-4 border-top " style={{ height: "230px" }}>
                        <h3 className="col-md-4 mb-0 text-white" >Clover</h3>

                        <div className='col-md-4 d-flex align-items-center justify-content-center mb-3 mb-md-0 me-md-auto link-dark text-decoration-none flex-column'>
                            <p className='text-white'>Follow Us</p>
                            <div className='d-flex text-white'>
                            <a href='/' className='text-white'><i class="fa-brands fa-telegram fa-lg px-2"></i></a>
                            <a href='/' className='text-white'><i class="fa-brands fa-discord fa-lg px-2"></i></a>
                            <a href='/' className='text-white'><i class="fa-brands fa-twitter fa-lg px-2"></i></a>
                            <a href='/' className='text-white'><i class="fa-brands fa-facebook fa-lg px-2"></i></a>
                            </div>
                        </div>


                        <a href='/' className=' text-decoration-none text-white '>About Us</a>
                        <a href='/' className='mx-4 text-decoration-none text-white'>Terms & conditions</a>
                        <a href='/' className='text-decoration-none text-white'>Contact Us</a>
                    </footer>
                </div>
            </div>
            </div>
            

        </>
    )
}

export default Footer