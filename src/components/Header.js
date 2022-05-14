import React, { useState } from 'react'
import Button from './Button'
import background from './images/background.jpg'
import Item from './Item'
import Carousel from './Carousel'
import Itembox from './Itembox'
import Itemcomp from './Itemcomp'
import Button2 from './Button2'
import Vbutton from './Vbutton'
import Button3 from './Button3'
import Coraitem from './Coraitem'


const Header = (props) => {
    const [show, setShow] = useState(false);
    const style ={
        //     background: "#fff",
        background: `"linear-gradient(#ffffff, #ffffff) padding-box","linear-gradient(to right, #86CC1C, #44C549) border-box"`,
        color: "#86CC1C",
        borderRadius: "12px",
        borderColor:"#86CC1C",
        width:`150px`,
        height:"40px",
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
        seturl(`https://private-anon-0a20b11613-jikan.apiary-proxy.com/v3/search/anime?q=${search}`);
        props.getData()
    }


    return (
        <>
            <div>
                <div className='position-absolute'>

                    <img src={background} className="img-fluid" style={{ height: "514px", width: "1600px", objectFit: "cover", filter: "brightness(0.5)" }}></img>
                </div>


                <div className='container d-none d-md-flex flex-wrap justify-content-between position-relative text-white pt-md-5 px-0 '>
                    <h3 className='logo col-md-3 col-12' style={{fontFamily: "Roboto, sans-serif"}}>Clover</h3>

                    {/* <div  style={{ maxWidth: "30rem", maxHeight: "41px" }}> */}
                    <form onSubmit={submitHandler} className="col-md-6 col-12 order-md-1 order-3 d-flex position-relative " style={{ width: "30rem", maxHeight: "41px" }}>

                        <input type="search" className="form-control" placeholder="Search your favourite anime..." value={search} style={{ background: "#ffffff40", border: "2px solid white", borderRadius: "12px", color: "#7fff00ab", backdropFilter: "blur(1px)", maxWidth: "30rem", maxHeight: "41px" }} onChange={(e) => setsearch(e.target.value)} />
                        <span className=" border-0 " style={{ position: "absolute", right: "0" }}>
                            <button className="btn   ms-n3" type="submit">
                                <i className="fa fa-search text-white"></i>
                            </button>
                            {/* <i className="fas fa-search"></i>
                            <i className="fa-thin fa-sliders"></i> */}
                        </span>
                    </form>

                    {/* </div> */}
                    <div className='d-flex col-md-3 col-12 order-md-3 order-1 justify-content-end'>
                        <div className='me-4'><Button2 name="SIGN UP" /></div>
                        <div><Button name="LOGIN" /></div>


                    </div>
                </div>
                <div className='container text-white position-relative d-flex flex-column    justify-content-md-center align-items-center text-center' style={{ minHeight: "410px" }}>
                    <h1 className=' d-md-none pt-3 pb-4 py-md-0'>Clover</h1>
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
                    <h3 style={{fontFamily: "Roboto, sans-serif"}}>Stream more than <span className="head">10,000 </span>Animes<br />for free without any Ads.</h3>

                </div>
            </div>
            <div className='container position-relative text-white' style={{ top: "-90px" }}>
                <div className="">
                    <Coraitem heading1={"Trending Now"} heading2={<a>See all</a>} />
                    <Carousel items={(0, 1)} url={url} />
                </div>

            </div>
            <div className='container position-relative mt-md-0 mt-0 '>
                <div className="">
                    <Coraitem heading1={"Most Popular"} heading2={<a>See all</a>} />
                    <Carousel items={(15, 20)} />
                </div>
            </div>

            <div className='container position-relative mt-md-5 mt-0 '>
                <Itembox heading1={"Most Popular"} heading2={<a>See all</a>} />
            </div>

            <div className='container position-relative mt-md-5 mt-3  mb-5'>
                <Itemcomp heading1={"Top Genres"} heading2={<a>See all</a>} />
            </div>
            <div className='text-center mt-4 mb-5 d-none d-md-block'>
            {show===false?<button type="button" className="btn btn3" onClick={()=>{setShow(true)}} style={style}>Load More</button>:""}
                {show && <div className='container position-relative mt-md-5 mt-3  mb-5'>
                <Itemcomp heading1={"Top Genres"} heading2={<a>See all</a>} />
                
            </div>}
          
               

      


            </div>




        </>
    )
}

export default Header