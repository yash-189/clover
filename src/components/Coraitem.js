import React from 'react'

const Coraitem = (props) => {
  return (
    <>
     <div className="d-flex justify-content-between py-2" style={{ padding: "0 30px" }}>
        <h6 className="subhead" style={{fontFamily: "Roboto, sans-serif"}}>{props.heading1}</h6>
        <h6 className="sublink" style={{fontFamily: "Roboto, sans-serif"}}><a href="/seeall" className=""> <div className="arrow"></div>{props.heading2}</a></h6>

      </div>
    </>
  )
}

export default Coraitem