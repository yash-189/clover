import React from 'react'
import Button2 from './Button2'
import Button3 from './Button3'

const Image = ({title,type,image,genres1,genres2,genres3,genres4,status,link,synopsis,score,episodes}) => {
    return (
        <>
            <div className='container '>
                <div className="clearfix">
                    <div className='col-12 px-3'>
                    <a href={link} style={{textAlign: "-webkit-center"}}>
                        <img src={image} className="slideimage img-fluid col-md-6 float-lg-start mb-3 me-md-3" style={{ borderRadius: "12px" }} alt="..." />
                        </a>
                        <div className='d-flex flex-column justify-content-center justify-content-lg-start align-items-lg-start align-items-center '>
                            {title.length<15?<h3>{title.slice(0,10)}<br/>
                            {title.slice(10,15)}</h3>:<h3>{title}</h3>}
                            <h6 className='genres  d-none' >Genres:<a className='mx-2'>{genres1}</a><a className='mx-2'>{genres2}</a><a className='mx-2'>{genres3}</a><a className='mx-2'>{genres4}</a></h6>
                            <p>{synopsis}...</p>
                            <div className='d-flex mt-2'>
                                <p className='px-4 py-2 ' style={{ backgroundColor: "#EDFAED", borderRadius: "12px" }}>{type} Series</p>
                                <p className='px-4 py-2 mx-2 ' style={{ backgroundColor: "#EDFAED", borderRadius: "12px" }}>{score}</p>
                                <p className='px-4 py-2 mx-2 ' style={{ backgroundColor: "#EDFAED", borderRadius: "12px" }}>Epi {episodes}/{episodes}</p>
                                <p className='px-4 py-2 ' style={{ backgroundColor: "#EDFAED", borderRadius: "12px" }}>{status}</p>
                            </div>
                            <div className='d-flex my-2'>
                                <div className='me-2'><Button3 width={"150px"} name={"+ Watchlist"} /></div>
                                <div><Button2 width={"150px"} name={"Watch Now"} link={link} /></div>
                            </div>
                        </div>
                    </div>
                </div>
            </div>
        </>
    )
}

export default Image


