import React,{useState,useEffect} from 'react'
import { useGlobalContext } from './Context';
import Item from "./Item";
import Spinner from './Spinner';
import Vbutton from './Vbutton';
import Vbutton2 from './Vbutton2';

const Itemcomp = (props) => {
   const {ImageBoxData, loading}= useGlobalContext();

    return (
        <div className="">
            <div className="d-flex justify-content-between py-2" style={{ padding: "0 30px" }}>
                <h6 className="subhead" style={{fontFamily: "Roboto, sans-serif"}}>{props.heading1}</h6>
                <h6 className="sublink" style={{fontFamily: "Roboto, sans-serif"}}><a href="/" className=""> <div className="arrow"></div>{props.heading2}</a></h6>

            </div>
            
            <div className="d-flex justify-content-lg-around justify-content-md-between justify-content-around flex-lg-nowrap flex-wrap py-2 position-relative" style={{ padding: "0 30px" }}>
            <Vbutton name={"ACTION"}/>
            
                {ImageBoxData.slice(0,5).map((element, index) => {
                    return <><div key={index}  >
                        <Item  image={element.images.webp.image_url} title={element.title?element.title.slice(0,15):"not available"} element={element} link={element.trailer.url} /></div>
                        <Vbutton2 name={"EXPLORE"}/></>
                })}
                {loading && <Spinner/>}
            </div>

            <div className="d-flex  justify-content-lg-around justify-content-md-between justify-content-around flex-lg-nowrap flex-wrap py-2 position-relative" style={{ padding: "0 30px" }}>
            <Vbutton name={"SHOUNEM"}/>
        
                {ImageBoxData.slice(5,10).map((element, index) => {
                    return <><div>
                        <Item key={index} image={element.images.webp.image_url} title={element.title?element.title.slice(0,15):"not available"} element={element} link={element.trailer.url} /></div> 
            <Vbutton2 name={"EXPLORE"}/>
                        </>
                        
                })}
                {loading && <Spinner/>}

            </div>
            <div className="d-flex justify-content-lg-around justify-content-md-between justify-content-around flex-lg-nowrap flex-wrap py-2 position-relative" style={{ padding: "0 30px" }}>
            <Vbutton name={"COMEDY"}/>
        
                {ImageBoxData.slice(10,15).map((element, index) => {
                    return <><div>
                        <Item key={index} image={element.images.webp.image_url} title={element.title?element.title.slice(0,15):"not available"} element={element} link={element.trailer.url}/></div> 
            <Vbutton2 name={"EXPLORE"}/>
                        </>
                        
                })}
                {loading && <Spinner/>}

            </div>
            </div>
            
    );
  
}

export default Itemcomp