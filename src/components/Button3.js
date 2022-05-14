import React from 'react'

const Button3 = (props) => {
    const style ={
    //     background: "#fff",
    background: `"linear-gradient(#ffffff, #ffffff) padding-box","linear-gradient(to right, #86CC1C, #44C549) border-box"`,
    color: "#86CC1C",
    borderRadius: "12px",
    borderColor:"#86CC1C",
    width:`${props.width}`,
    height:"40px",
    border: "2px solid ",
    overflow: "hidden",
    textDecoration: "none",
  transition: ".2s transform ease-in-out",
  willChange: "transform",
  zIndex: "0",
  position: "relative",
  fontFamily: "Roboto, sans-serif"
  }
  return (
    <>
    <button type="button" className="btn btn3" onClick={props.onclick} style={style}>{props.name} 
    </button>
    </>
  )
}



export default Button3