import React from 'react'
import Button from './Button'
import Button2 from './Button2'
import Button3 from './Button3'
import demon from './images/demon.jpg'

const Itembox1 = () => {
    const myStyle = {
        width: "560px",
        height: "322px",
        borderRadius:"15px"
    }
    return (
        <>
            
                    <div className='col-md-6 col-12 ps-md-5' >
                        <img src={demon} className="img-fluids" style={myStyle}></img>
                    </div>
                    <div className='col-md-6 col-12 d-flex flex-column  justify-content-md-between px-3 px-md-5 text-center mt-md-0 mt-3 flex-wrap justify-content-center ' >
                        <h3>Demon Slayer</h3>
                        <h6>Genres<a className='mx-2'>action</a><a className='mx-2'>action</a><a className='mx-2'>action</a><a className='mx-2'>action</a></h6>
                        <p>Saint Scroll
                            Saint Scroll | Demon Slayer: Kimetsu no Yaiba – Entertainment District Arc
                            Visit
                            Images may be subject to copyright. Learn more
                            Saint Scroll
                            Saint Scroll | Demon Slayer: Kimetsu no Yaiba</p>
                            <div className='d-flex mt-2'>
                                <p className='px-4 py-2 ' style={{backgroundColor: "#EDFAED", borderRadius:"12px"}}>TV Series</p>
                                <p className='px-4 py-2 mx-2 ' style={{backgroundColor: "#EDFAED", borderRadius:"12px"}}>8.9</p>
                                <p className='px-4 py-2 mx-2 ' style={{backgroundColor: "#EDFAED", borderRadius:"12px"}}>Epi 11/11</p>
                                <p className='px-4 py-2 ' style={{backgroundColor: "#EDFAED", borderRadius:"12px"}}>Finished airing</p>
                            </div>
                            <div className='d-flex my-2'>
                        <div className='me-2'><Button3 width={"150px"} name={"+ Watchlist"}/></div>
                        <div><Button2 width={"150px"} name={"Watch Now"} /></div>
                        </div>


                  
            </div>


        </>
    )
}

export default Itembox1