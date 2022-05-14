import React, { useState, useEffect } from "react";
import Slider from "react-slick";
import Item from "./Item";
import anime from './images/anime.jpg'




const Carousel = (props) => {
const [apiData, setapiData] = useState([])


  const settings = {
    className: "center",
    infinite: true,
    lazyLoad: true,
    centerPadding: "6px",
    slidesToShow: 5,
    swipeToSlide: true,
    afterChange: function (index) {
      // console.log(
      //   `Slider Changed to: ${index + 1}, background: #222; color: #bada55`
      // );
    }, responsive: [
      {
        breakpoint: 1024,
        settings: {
          slidesToShow: 3,
          slidesToScroll: 3,
          infinite: true,
          dots: true
        }
      },
      {
        breakpoint: 600,
        settings: {
          slidesToShow: 2,
          slidesToScroll: 2,
          initialSlide: 2
        }
      },
      {
        breakpoint: 480,
        settings: {
          slidesToShow: 1,
          slidesToScroll: 1
        }
      }
    ]

  };

  useEffect(() => {

  const getData= async ()=>{
    const data =  await fetch(props.url)

    const parsedData = await data.json()
    setapiData(parsedData.top)
    // console.log(...apiData);
    
  }
  
    getData();
  }, [])
  // console.log(...apiData);

  




  return (
    // <div className="">
    //   <div className="d-flex justify-content-between py-2" style={{ padding: "0 30px" }}>
    //     <h6 className="subhead">{props.heading1}</h6>
    //     <h6 className="sublink"><a href="/seeall" className=""> <div className="arrow"></div>{props.heading2}</a></h6>

    //   </div>
      <Slider {...settings}>
        {apiData.slice(props.items).map((element, index) => {
          return <Item key={element} image={element.image_url} title={element.title?element.title.slice(0,20):"not available"} element={element} link={element} />
        })}
      </Slider>
    // </div>
  );
}

Carousel.defaultProps = {
  url:"https://api.jikan.moe/v3/top/anime/1"
}
export default Carousel
