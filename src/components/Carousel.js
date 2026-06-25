import React from "react";
import Slider from "react-slick";
import { useGlobalContext } from "../context/AppContext";
import Item from "./Item";
import Spinner from "./Spinner";
import StatusMessage from "./StatusMessage";

const Carousel = ({ start = 0, end }) => {
  const { search, searchResults, loadingSearch, searchError, reloadSearchResults } = useGlobalContext();

  const items = searchResults.slice(start, end);

  const settings = {
    className: "center",
    infinite: items.length > 5,
    lazyLoad: true,
    centerPadding: "6px",
    slidesToShow: Math.min(items.length || 1, 5),
    swipeToSlide: true,
    responsive: [
      {
        breakpoint: 1024,
        settings: {
          slidesToShow: Math.min(items.length || 1, 3),
          slidesToScroll: 1,
          infinite: items.length > 3,
          dots: true
        }
      },
      {
        breakpoint: 600,
        settings: {
          slidesToShow: Math.min(items.length || 1, 2),
          slidesToScroll: 1
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

  if (loadingSearch) {
    return <Spinner />;
  }

  if (searchError) {
    return (
      <StatusMessage
        title="Could not load anime"
        message={searchError}
        actionLabel="Retry"
        onAction={reloadSearchResults}
        error
      />
    );
  }

  if (!items.length) {
    return (
      <StatusMessage
        title="No anime found"
        message={`No results found for "${search}".`}
      />
    );
  }

  return (
    <Slider {...settings}>
      {items.map((anime) => (
        <Item
          id={anime.id}
          key={anime.id}
          image={anime.image}
          title={anime.title ? anime.title.slice(0, 20) : "not available"}
          link={anime.link}
        />
      ))}
    </Slider>
  );
}

export default Carousel
