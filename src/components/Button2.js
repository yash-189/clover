import React from 'react'


const Button2 = (props) => {
    const style ={
        background: "linear-gradient(90deg, #86CC1C, #44C549)",
    color: "white",
    borderRadius: "12px",
    
    width:`${props.width}`,
    height:"40px",
    overflow: "hidden",
    textDecoration: "none",
  transition: ".2s transform ease-in-out",
  willChange: "transform",
  zIndex: "0",
  fontFamily: "Roboto, sans-serif"
    }
  return (
    <>
   {/* <a href={props.link}> */}
    <button type={props.type} className={`btn btn2 ${props.className}`} style={style}>{props.name}</button>
    {/* </a> */}
    </>
  )
}


Button2.defaultProps = {
  width:"110px",
  type:"button"
}

export default Button2