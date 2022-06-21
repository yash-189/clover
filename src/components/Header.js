import React, { useState } from 'react'
import {
    Link, useNavigate
} from "react-router-dom";
import Button from './Button'
import background from './images/background.jpg'
import logo from './images/logo.png'
import Carousel from './Carousel'
import Itembox from './Itembox'
import Itemcomp from './Itemcomp'
import Button2 from './Button2'
import Coraitem from './Coraitem'
import profile from './images/profile.png'



const Header = (props) => {
    const navigate = useNavigate();
    const [show, setShow] = useState(false);
    const style = {
        //     background: "#fff",
        background: `"linear-gradient(#ffffff, #ffffff) padding-box","linear-gradient(to right, #86CC1C, #44C549) border-box"`,
        color: "#86CC1C",
        borderRadius: "12px",
        borderColor: "#86CC1C",
        width: `150px`,
        height: "40px",
        border: "2px solid ",
        overflow: "hidden",
        textDecoration: "none",
        transition: ".2s transform ease-in-out",
        willChange: "transform",
        zIndex: "0",
        position: "relative",
        fontFamily: "Roboto, sans-serif"
    }

    const [search, setsearch] = useState("");
    const [url, seturl] = useState("https://api.jikan.moe/v3/top/anime/1")

    const submitHandler = (e) => {
        e.preventDefault();
        console.log(search);
        seturl(`https://api.jikan.moe/v4/anime?q=demon${search}`);
        // getData()
    }
    // const onChange = (e) => { setsearch(e.target.value) }

    const token = localStorage.getItem("token");
    //   if(token===!null){
    //     console.log(token)
    //   }else{
    //     console.log("not available");
    //   }


    return (
        <>
            <div>
                <div className='position-absolute'>

                    <img src={background} alt='background' className="img-fluid" style={{ height: "514px", width: "100vw", objectFit: "cover", filter: "brightness(0.5)" }}></img>
                </div>


                <div className='container d-md-flex d-none justify-content-md-between position-relative text-white pt-md-5 px-0 flex-wrap'>
                    <div className='d-flex col-md-3 col-12 order-md-1'>
                        <img src={logo} alt='logo' className="img-fluid" style={{ width: "30px", height: "30px" }} />
                        <h3 className='logo ' style={{ fontFamily: 'Comfortaa, cursive', fontWeight: '900' }}>lover</h3>
                    </div>

                    {/* <div  style={{ maxWidth: "30rem", maxHeight: "41px" }}> */}
                    <form onSubmit={submitHandler} className="col-lg-6 col-12 order-lg-2 order-3 d-flex position-relative justify-content-md-center mt-md-5 mt-lg-0 " style={{ width: "", maxHeight: "41px" }}>

                        <input type="search" className="form-control position-relative" placeholder="Search your favourite anime..." value={search} style={{ background: "#ffffff40", border: "2px solid white", borderRadius: "12px", color: "#7fff00ab", backdropFilter: "blur(1px)", maxWidth: "30rem", maxHeight: "41px" }} onChange={(e) => setsearch(e.target.value)} />

                        <button className="btn position-absolute end-0  ms-n3" type="submit">
                            <i className="fa fa-search text-white"></i>
                        </button>
                        {/* <i className="fas fa-search"></i>
                            <i className="fa-thin fa-sliders"></i> */}

                    </form>

                    {/* </div> */}
                    <div className='d-flex col-md-3 col-12 order-md-2 order-1 justify-content-end'>

                        {token === null ? <> <div className='me-md-4 me-0'>
                            <Link to="/register"><Button2 name="SIGN UP" /></Link>
                        </div> <div>
                                <Link to="/login"><Button name="LOGIN" /></Link>
                            </div></> :
                            <>
                                <div>
                                    <Link to=""><Button2 name="Watchlist" /></Link>
                                </div>
                                <div className="dropdown">

                                    <img src={profile} alt='profile' className="rounded-circle img-fluid btn  dropdown-toggle" href="#" role="button" id="dropdownMenuLink" data-bs-toggle="dropdown" aria-expanded="false" style={{ height: "44px", width: "56px" }} ></img>

                                    <ul className="dropdown-menu" aria-labelledby="dropdownMenuButton1">
                                        <Link to="" className='text-decoration-none'><li><li className="dropdown-item disabled" >My profile</li></li></Link>
                                        <li><a className="dropdown-item btn" onClick={() => {
                                            localStorage.removeItem("token")
                                            navigate("/")
                                        }}>Logout</a></li>
                                    </ul>
                                </div>

                            </>}



                    </div>
                </div>
                <div className='container text-white position-relative d-flex flex-column    justify-content-md-center align-items-center text-center' style={{ minHeight: "410px" }}>
                    <div className='d-flex d-md-none pt-3 pb-4 py-md-0'>
                        <img src={logo} alt='logo' className="img-fluid" style={{ width: "30px", height: "30px" }} />
                        <h1 className=' ' style={{ fontFamily: 'Comfortaa, cursive' }}>lover</h1>
                    </div>


                    <div className="d-flex d-md-none col-12 pb-5 pb-md-0" style={{}}>
                        <input type="search" className="form-control" placeholder="Search your favourite anime..." style={{ background: "#ffffff40", border: "2px solid white", borderRadius: "12px", color: "#7fff00ab", backdropFilter: "blur(1px)" }} />
                        <span className=" border-0 " style={{ position: "absolute", right: "15px" }}>
                            <button className="btn   ms-n3" type="button">
                                <i className="fa fa-search text-white"></i>
                            </button>
                            {/* <i className="fas fa-search"></i>
                            <i className="fa-thin fa-sliders"></i> */}
                        </span>
                    </div>

                    <div className='d-flex col-md-3 col-12 order-md-2 order-1 mt-4 mb-5 pb-5 justify-content-center d-md-none '>

                        {token === null ? <> <div className=' me-3'>
                            <Link to="/register"><Button2 name="SIGN UP" width={"95px"} /></Link>
                        </div> <div>
                                <Link to="/login"><Button name="LOGIN"  width={"95px"}/></Link>
                            </div></> :
                            <>
                                <div>
                                    <Link to=""><Button2 name="Watchlist" width={"95px"} /></Link>
                                </div>
                                <div className="dropdown">

                                    <img src={profile} alt='profile' className="rounded-circle img-fluid btn  dropdown-toggle" href="#" role="button" id="dropdownMenuLink" data-bs-toggle="dropdown" aria-expanded="false" style={{ height: "44px", width: "56px" }} ></img>

                                    <ul className="dropdown-menu" aria-labelledby="dropdownMenuButton1">
                                        <Link to="" className='text-decoration-none'><li><li className="dropdown-item disabled" >My profile</li></li></Link>
                                        <li><a className="dropdown-item btn" onClick={() => {
                                            localStorage.removeItem("token")
                                            navigate("/")
                                        }}>Logout</a></li>
                                    </ul>
                                </div>

                            </>}



                    </div>



                    <h2 style={{ fontFamily: 'Comfortaa, cursive', fontWeight: "900" }}>Stream more than <span className="head">10,000 </span>Animes<br />for free without any Ads.</h2>

                </div>
            </div>


            <div className='container position-relative text-white mt-5 mt-md-0' style={{ top: "-90px" }}>
                <div className="">
                    <Coraitem heading1={"Trending Now"} heading2={"See all"} />
                    <Carousel items={(0, 1)} url={url} />
                </div>

            </div>
            <div className='container position-relative mt-md-0 mt-0 '>
                <div className="">
                    <Coraitem heading1={"Most Popular"} heading2={"See all"} />
                    <Carousel items={(15, 20)} />
                </div>
            </div>

            <div className='container position-relative mt-md-5 mt-0 '>
                <Itembox heading1={"Most Popular"} heading2={"See all"} />
            </div>

            <div className='container position-relative mt-md-5 mt-3  mb-5'>
                <Itemcomp heading1={"Top Genres"} heading2={"See all"} />
            </div>

            <div className='text-center mt-4 mb-5  d-md-block'>

                {show === false ? <button type="button" className="btn btn3" onClick={() => { setShow(true) }} style={style}>Load More</button> : ""}
                {show && <div className='container position-relative mt-md-5 mt-3  mb-5'>
                    <Itemcomp heading1={"Top Genres"} heading2={"See all"} />

                </div>}






            </div>




        </>
    )
}

export default Header