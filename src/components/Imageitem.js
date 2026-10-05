import React from 'react'
import Button2 from './Button2'
import Button3 from './Button3'

const Imageitem = ({ title, type, image, genres = [], status, link, trailer, synopsis, score, episodes }) => {
    return (
        <>
            <div className='container '>
                <div className="clearfix">
                    <div className='col-12 px-3'>
                    <a href={link} target="_blank" rel="noreferrer" style={{textAlign: "-webkit-center"}}>
                        <img src={image} className="slideimage img-fluid col-md-6 float-lg-start mb-3 me-md-3" style={{ borderRadius: "12px" }} alt={title} loading="lazy" />
                        </a>
                        <div className='d-flex flex-column justify-content-center justify-content-lg-start align-items-lg-start align-items-center '>
                            <h3>{title}</h3>
                            {genres.length > 0 && <h6 className='genres'>{genres.slice(0, 4).join(" · ")}</h6>}
                            <p>{synopsis}...</p>
                            <div className='d-flex mt-2'>
                                <p className='px-4 py-2 ' style={{ backgroundColor: "#EDFAED", borderRadius: "12px" }}>{type}</p>
                                <p className='px-4 py-2 mx-2 ' style={{ backgroundColor: "#EDFAED", borderRadius: "12px" }}>{score ? `★ ${score}` : "Not rated"}</p>
                                <p className='px-4 py-2 mx-2 ' style={{ backgroundColor: "#EDFAED", borderRadius: "12px" }}>{episodes ? `${episodes} episodes` : "Ongoing"}</p>
                                <p className='px-4 py-2 ' style={{ backgroundColor: "#EDFAED", borderRadius: "12px" }}>{status}</p>
                            </div>
                            <div className='d-flex my-2'>
                                <div className='me-2'><Button3 width={"150px"} name={"+ Watchlist"} /></div>
                                <div><a href={trailer || link} target="_blank" rel="noreferrer"><Button2 width={"150px"} name={trailer ? "Watch Trailer" : "View Details"} /></a></div>
                            </div>
                        </div>
                    </div>
                </div>
            </div>
        </>
    )
}

export default Imageitem


