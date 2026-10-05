import React from "react";
import Slider from "react-slick";
import Item from "./Item";
import { ErrorRow, PosterSkeleton } from "./Skeleton";

const Carousel = ({ list, onRetry, dark }) => {
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




  if (list.error) return <ErrorRow message={list.error} onRetry={onRetry} dark={dark} />;

  if (list.loading) {
    return (
      <div className="d-flex overflow-hidden py-2">
        {Array.from({ length: 6 }, (_, i) => (
          <PosterSkeleton key={i} dark={dark} />
        ))}
      </div>
    );
  }

  if (list.items.length === 0) return <ErrorRow message="No anime found. Try another title." dark={dark} />;

  return (
    <Slider {...settings}>
      {list.items.map((a) => (
        <Item key={a.id} image={a.poster} title={a.title ? a.title.slice(0, 20) : "not available"} link={a.url} />
      ))}
    </Slider>
  );
};

export default Carousel;
