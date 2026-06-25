import React from "react";
import Slider from "react-slick";
import { useGlobalContext } from "../context/AppContext";
import Imageitem from "./Imageitem";
import Spinner from "./Spinner";
import SectionHeader from "./SectionHeader";
import StatusMessage from "./StatusMessage";

const FeaturedCarousel = ({ heading1, heading2 }) => {
  const { topAnime, loadingTopAnime, topAnimeError, reloadTopAnime } = useGlobalContext();

  const settings = {
    className: "center",
    infinite: topAnime.length > 1,
    centerPadding: "6px",
    slidesToShow: 1,
    swipeToSlide: true,
    responsive: [
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
      <SectionHeader heading1={heading1} heading2={heading2} />

      {loadingTopAnime ? <Spinner /> : null}
      {!loadingTopAnime && topAnimeError ? (
        <StatusMessage
          title="Could not load anime"
          message={topAnimeError}
          actionLabel="Retry"
          onAction={reloadTopAnime}
          error
        />
      ) : null}
      {!loadingTopAnime && !topAnimeError && !topAnime.length ? (
        <StatusMessage
          title="No anime available"
          message="Please check back in a moment."
        />
      ) : null}

      {!loadingTopAnime && !topAnimeError && topAnime.length ? (
        <Slider {...settings}>
          {topAnime.slice(20, 25).map((anime) => (
            <div className="row px-3" key={anime.id}>
              <Imageitem
                image={anime.largeImage}
                title={anime.title ? anime.title.slice(0, 15) : "not available"}
                type={anime.type}
                genres={anime.genres}
                status={anime.status}
                synopsis={anime.synopsis ? anime.synopsis.slice(0, 250) : "not"}
                score={anime.score}
                episodes={anime.episodes}
                link={anime.trailerLink}
              />
            </div>
          ))}
        </Slider>
      ) : null}
    </div>
  );
}

export default FeaturedCarousel
