import React from 'react'
import { Link } from 'react-router-dom'

const Item = ({ id, image, title, link }) => {
  const style = {
    height: "216px",
    width: "162px",
    margin: "auto",
    border: "3px solid white",
    borderRadius: "15px",
    overflow: "hidden",
  };

  return (
    <div className='mx-2'>
      <Link to={`/anime/${id}`}>
        <img src={image} alt={title} className="slideimage" style={style} />
      </Link>
      <p className='text-dark text-center' style={{ fontFamily: "Roboto, sans-serif" }}>{title}</p>
    </div>
  );
};

export default Item;
