import React,{useState,useEffect} from 'react'
import Item from "./Item";
import Vbutton from './Vbutton';
import Vbutton2 from './Vbutton2';

const Itemcomp = (props) => {
  
   

    // const settings = {
    //     className: "center",
    //     infinite: true,
    //     centerPadding: "6px",
    //     // padding:"0 80px",
    //     slidesToShow: 5,
    //     swipeToSlide: true,
    //     afterChange: function (index) {
    //       // console.log(
    //       //   `Slider Changed to: ${index + 1}, background: #222; color: #bada55`
    //       // );
    //     }, responsive: [
    //       {
    //         breakpoint: 1024,
    //         settings: {
    //           slidesToShow: 3,
    //           slidesToScroll: 3,
    //           infinite: true,
    //           dots: true
    //         }
    //       },
    //       {
    //         breakpoint: 600,
    //         settings: {
    //           slidesToShow: 2,
    //           slidesToScroll: 2,
    //           initialSlide: 2
    //         }
    //       },
    //       {
    //         breakpoint: 480,
    //         settings: {
    //           slidesToShow: 2,
    //           slidesToScroll: 2
    //         }
    //       }
    //     ]
      
    //   };
      const [apiData, setapiData] = useState([])
      useEffect(() => {

        const getData= async ()=>{
          const data =  await fetch("https://api.jikan.moe/v4/top/anime")
      
          const parsedData = await data.json()
          setapiData(parsedData.data)
          // console.log(...apiData);
          
        }
        
          getData();
        }, [])

    return (
        <div className="">
            <div className="d-flex justify-content-between py-2" style={{ padding: "0 30px" }}>
                <h6 className="subhead" style={{fontFamily: "Roboto, sans-serif"}}>{props.heading1}</h6>
                <h6 className="sublink" style={{fontFamily: "Roboto, sans-serif"}}><a href="/" className=""> <div className="arrow"></div>{props.heading2}</a></h6>

            </div>
            
            <div className="d-flex justify-content-md-between justify-content-around flex-wrap py-2 position-relative" style={{ padding: "0 30px" }}>
            <Vbutton name={"ACTION"}/>
            
                {apiData.slice(0,5).map((element, index) => {
                    return <><div>
                        <Item key={index} image={element.images.webp.image_url} title={element.title?element.title.slice(0,15):"not available"} element={element} link={element.trailer.url} /></div>
                        <Vbutton2 name={"EXPLORE"}/></>
                })}
            </div>

            <div className="d-flex justify-content-md-between justify-content-around flex-wrap py-2 position-relative" style={{ padding: "0 30px" }}>
            <Vbutton name={"SHOUNEM"}/>
        
                {apiData.slice(5,10).map((element, index) => {
                    return <><div>
                        <Item key={index} image={element.images.webp.image_url} title={element.title?element.title.slice(0,15):"not available"} element={element} link={element.trailer.url} /></div> 
            <Vbutton2 name={"EXPLORE"}/>
                        </>
                        
                })}

            </div>
            <div className="d-flex justify-content-md-between justify-content-around flex-wrap py-2 position-relative" style={{ padding: "0 30px" }}>
            <Vbutton name={"COMEDY"}/>
        
                {apiData.slice(10,15).map((element, index) => {
                    return <><div>
                        <Item key={index} image={element.images.webp.image_url} title={element.title?element.title.slice(0,15):"not available"} element={element} link={element.trailer.url}/></div> 
            <Vbutton2 name={"EXPLORE"}/>
                        </>
                        
                })}

            </div>
            </div>
            
    );
  
}

export default Itemcomp