import React from 'react'

const variantClassNames = {
  primary: "btn vbtn",
  secondary: "btn vbtn2 effect effect-1",
};

const VerticalButton = ({ name, variant = "primary" }) => {
  return (
    <button type="button" className={variantClassNames[variant] || variantClassNames.primary}>
      {name}
    </button>
  );
};

export default VerticalButton;
