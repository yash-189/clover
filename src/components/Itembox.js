import React, { useState, useEffect } from "react";
import Slider from "react-slick";
import { useGlobalContext } from "./Context";
import Image from "./Image";
import Spinner from "./Spinner";



const Itembox = (props) => {
  const {ImageBoxData,loading}= useGlobalContext();

  const settings = {
    className: "center",
    infinite: true,
    centerPadding: "6px",
    slidesToShow: 1,
    swipeToSlide: true,
    afterChange: function (index) {
      // console.log(
      //   `Slider Changed to: ${index + 1}, background: #222; color: #bada55`
      // );
    }, responsive: [
      {
        breakpoint: 1024,
        settings: {
          slidesToShow: 1,
          slidesToScroll: 1,
          infinite: true,
          dots: true
        }
      },
      {
        breakpoint: 600,
        settings: {
          slidesToShow: 1,
          slidesToScroll: 1,
          initialSlide: 1
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






  return (
    <div className="">
      <div className="d-flex justify-content-between py-2" style={{ padding: "0 30px" }}>
        <h6 className="subhead " style={{ fontFamily: "Roboto, sans-serif" }} >{props.heading1}</h6>
        <h6 className="sublink" style={{ fontFamily: "Roboto, sans-serif" }}><a href="/" className=""> <div className="arrow"></div>{props.heading2}</a></h6>

      </div>
      <Slider {...settings}>

        {ImageBoxData.slice(20, 25).map((element, index) => {
          return <> <div className="row  px-3">
            <Image key={element.title} image={element.trailer.images.medium_image_url} title={element.title ? element.title.slice(0, 15) : "not available"} element={element}
              type={element.type}
              genres1={element.genres.name}
              genres2={element.genres.name}
              genres3={element.genres.name}
              genres4={element.genres.name}
              status={element.status}
              synopsis={element.synopsis ? element.synopsis.slice(0, 250) : "not"}
              score={element.score}
              episodes={element.episodes} link={element.trailer.url} />
          </div>
          </>

        })}
        {loading && <Spinner />}

      </Slider>

    </div>

  );
}
export default Itembox
