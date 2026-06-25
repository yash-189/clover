import React from "react";

const buttonStyles = {
  light: {
    background: "#ffffff40",
    border: "2px solid white",
    borderRadius: "12px",
    color: "white",
    backdropFilter: "blur(1px)",
    height: "40px",
    overflow: "hidden",
    zIndex: "0",
    fontFamily: "Roboto, sans-serif",
  },
  primary: {
    background: "linear-gradient(90deg, #86CC1C, #44C549)",
    color: "white",
    borderRadius: "12px",
    height: "40px",
    overflow: "hidden",
    textDecoration: "none",
    transition: ".2s transform ease-in-out",
    willChange: "transform",
    zIndex: "0",
    fontFamily: "Roboto, sans-serif",
  },
  outline: {
    background: `"linear-gradient(#ffffff, #ffffff) padding-box","linear-gradient(to right, #86CC1C, #44C549) border-box"`,
    color: "#86CC1C",
    borderRadius: "12px",
    borderColor: "#86CC1C",
    height: "40px",
    border: "2px solid ",
    overflow: "hidden",
    textDecoration: "none",
    transition: ".2s transform ease-in-out",
    willChange: "transform",
    zIndex: "0",
    position: "relative",
    fontFamily: "Roboto, sans-serif",
  },
};

const buttonClassNames = {
  light: "btn btn3",
  primary: "btn btn2",
  outline: "btn btn3",
};

const Button = ({
  name,
  variant = "light",
  width = "110px",
  type = "button",
  className = "",
  onClick,
  disabled = false,
  as = "button",
}) => {
  const resolvedVariant = buttonStyles[variant] ? variant : "light";
  const sharedProps = {
    className: `${buttonClassNames[resolvedVariant]} ${className}`.trim(),
    style: {
      ...buttonStyles[resolvedVariant],
      width,
    },
  };

  if (as !== "button") {
    const Tag = as;
    return <Tag {...sharedProps}>{name}</Tag>;
  }

  return (
    <button
      type={type}
      {...sharedProps}
      onClick={onClick}
      disabled={disabled}
    >
      {name}
    </button>
  );
};

export default Button;
