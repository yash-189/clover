import React from 'react'
import { Link } from 'react-router-dom'
import Button from './Button'

const Imageitem = ({
  id,
  title,
  type,
  image,
  genres = [],
  status,
  link,
  synopsis,
  score,
  episodes,
}) => {
  const genreItems = genres.slice(0, 4);

  return (
    <div className='container'>
      <div className="clearfix">
        <div className='col-12 px-3'>
          <Link to={`/anime/${id}`} style={{ textAlign: "-webkit-center" }}>
            <img src={image} className="slideimage img-fluid col-md-6 float-lg-start mb-3 me-md-3" style={{ borderRadius: "12px" }} alt={title} />
          </Link>
          <div className='d-flex flex-column justify-content-center justify-content-lg-start align-items-lg-start align-items-center '>
            {title.length < 15 ? <h3>{title.slice(0, 10)}<br />{title.slice(10, 15)}</h3> : <h3>{title}</h3>}
            <h6 className='genres d-none'>
              Genres:
              {genreItems.map((genre) => (
                <span key={genre} className='mx-2'>{genre}</span>
              ))}
            </h6>
            <p>{synopsis}...</p>
            <div className='d-flex mt-2 flex-wrap justify-content-center justify-content-lg-start'>
              <p className='px-4 py-2' style={{ backgroundColor: "#EDFAED", borderRadius: "12px" }}>{type} Series</p>
              <p className='px-4 py-2 mx-2' style={{ backgroundColor: "#EDFAED", borderRadius: "12px" }}>{score}</p>
              <p className='px-4 py-2 mx-2' style={{ backgroundColor: "#EDFAED", borderRadius: "12px" }}>Epi {episodes}/{episodes}</p>
              <p className='px-4 py-2' style={{ backgroundColor: "#EDFAED", borderRadius: "12px" }}>{status}</p>
            </div>
            <div className='d-flex my-2'>
              <div className='me-2'><Button width={"150px"} name={"+ Watchlist"} variant="outline" /></div>
              <div>
                <a href={link} target="_blank" rel="noreferrer">
                  <Button width={"150px"} name={"Watch Now"} variant="primary" as="span" />
                </a>
              </div>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
};

export default Imageitem;
