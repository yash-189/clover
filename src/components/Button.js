import React from 'react'

const Button = (props) => {
  const style = {background: "#ffffff40",border: "2px solid white",borderRadius: "12px",color: "white",
  backdropFilter: "blur(1px)",
  width:`${props.width}`,
  height:"40px",
  overflow:"hidden",
  zIndex:"0",
  fontFamily: "Roboto, sans-serif"
  }
  return (
    <>
    <button type="button" className="btn btn3" style={style}>{props.name}</button>
    
    </>
  )
}

Button.defaultProps = {
  width:"110px",
}

export default Button