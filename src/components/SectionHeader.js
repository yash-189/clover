import React from 'react'

const SectionHeader = ({ heading1, heading2 }) => {
  return (
    <div className="d-flex justify-content-between py-2" style={{ padding: "0 30px" }}>
      <h6 className="subhead" style={{ fontFamily: "Roboto, sans-serif" }}>{heading1}</h6>
      <h6 className="sublink" style={{ fontFamily: "Roboto, sans-serif" }}>
        <a href="/seeall">
          <div className="arrow"></div>
          {heading2}
        </a>
      </h6>
    </div>
  );
};

export default SectionHeader;
