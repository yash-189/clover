import React from 'react'

const Item = ({ image, title, link }) => {
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
      <a href={link} target="_blank" rel="noreferrer">
        <img src={image} alt={title} className="slideimage" style={style} />
      </a>
      <p className='text-dark text-center' style={{ fontFamily: "Roboto, sans-serif" }}>{title}</p>
    </div>
  );
};

export default Item;
