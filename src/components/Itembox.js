import React from "react";
import Slider from "react-slick";
import { useGlobalContext } from "./Context";
import Imageitem from "./Imageitem";
import { ErrorRow, SpotlightSkeleton } from "./Skeleton";

const Itembox = (props) => {
  const { popular, loadPopular } = useGlobalContext();
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
        <h6 className="sublink" style={{ fontFamily: "Roboto, sans-serif" }}><a href="https://anilist.co/search/anime/popular" target="_blank" rel="noreferrer"> <div className="arrow"></div>{props.heading2}</a></h6>
      </div>
      {popular.loading && <SpotlightSkeleton />}
      {popular.error && <ErrorRow message={popular.error} onRetry={loadPopular} />}
      {!popular.loading && !popular.error && (
        <Slider {...settings}>
          {popular.items.slice(0, 5).map((a) => (
            <div key={a.id} className="row px-3">
              <Imageitem
                image={a.image}
                title={a.title || "not available"}
                type={a.type}
                genres={a.genres}
                status={a.status}
                synopsis={a.synopsis ? a.synopsis.slice(0, 250) : "No synopsis available"}
                score={a.score}
                episodes={a.episodes}
                link={a.url}
                trailer={a.trailer}
              />
            </div>
          ))}
        </Slider>
      )}
    </div>
  );
}

export default Itembox
