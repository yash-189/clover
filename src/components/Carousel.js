import React from "react";
import Slider from "react-slick";
import { useGlobalContext } from "./Context";
import Item from "./Item";
import Spinner from "./Spinner";




const Carousel = (props) => {

  const {CarouselData,loading}= useGlobalContext();


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




  return (
      <Slider {...settings}>
        {CarouselData.slice(props.items).map((element, index) => {
          return <Item key={element} image={element.image_url} title={element.title?element.title.slice(0,20):"not available"} element={element} link={element.url} />
        })}
            {loading && <Spinner/>}
      </Slider>
    
  );
}

export default Carousel
