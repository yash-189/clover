import React from 'react'

const Item = (props) => {
  const mystyle = {
    height:"216px",
    width: "162px",
    margin:"auto",
    border:"3px solid white",
    borderRadius: "15px",
    overflow:"hidden"
    
  }
  return (
    <> 
    <div className='mx-2'>
    <a href={props.link} className="">

                <img src={props.image} className="slideimage" style={mystyle} ></img>
                </a>
                <p className='text-dark text-center' style={{fontFamily: "Roboto, sans-serif"}} >{props.title}</p>
                </div>
    </>
  )
}

export default Item