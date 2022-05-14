import React from 'react'
import {
  BrowserRouter as Router,
  Switch,
  Route,
  Link
} from "react-router-dom";

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
   <a href={props.link}>
    <button type="button" className="btn btn2" style={style}>{props.name}</button>
    </a>
    </>
  )
}


Button2.defaultProps = {
  width:"110px",
}

export default Button2