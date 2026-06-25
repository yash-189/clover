import React, { useState } from 'react'
import { Link, useNavigate } from "react-router-dom";
import Button from './Button'
import background from '../assets/images/background.jpg'
import logo from '../assets/images/logo.png'
import Carousel from './Carousel'
import FeaturedCarousel from './FeaturedCarousel'
import GenreSections from './GenreSections'
import SectionHeader from './SectionHeader'
import profile from '../assets/images/profile.png'
import { useGlobalContext } from '../context/AppContext';
import { storage } from '../utils/storage';

const Header = () => {
  const { search, submitHandler, SearchAnime } = useGlobalContext();

  const navigate = useNavigate();
  const [show, setShow] = useState(false);

  const token = storage.getToken();

  const renderAuthButtons = (width) => {
    const dropdownId = width ? "dropdownMenuLinkMobile" : "dropdownMenuLinkDesktop";

    if (token === null) {
      return (
        <>
          <div className={width ? 'me-3' : 'me-md-4 me-0'}>
            <Link to="/register"><Button name="SIGN UP" width={width} variant="primary" as="span" /></Link>
          </div>
          <div>
            <Link to="/login"><Button name="LOGIN" width={width || "110px"} as="span" /></Link>
          </div>
        </>
      );
    }

    return (
      <>
        <div>
          <Button name="Watchlist" width={width || "110px"} variant="primary" />
        </div>
        <div className="dropdown">
          <button
            type="button"
            className="btn p-0 border-0 bg-transparent dropdown-toggle"
            id={dropdownId}
            data-bs-toggle="dropdown"
            aria-expanded="false"
          >
            <img src={profile} alt='profile' className="rounded-circle img-fluid" style={{ height: "44px", width: "56px" }} />
          </button>

          <ul className="dropdown-menu" aria-labelledby={dropdownId}>
            <li><button type="button" className="dropdown-item" disabled>My profile</button></li>
            <li>
              <button
                type="button"
                className="dropdown-item"
                onClick={() => {
                  storage.clearToken()
                  navigate("/")
                }}
              >
                Logout
              </button>
            </li>
          </ul>
        </div>
      </>
    );
  };

  const renderSearchForm = (mobile = false) => (
    <form
      onSubmit={submitHandler}
      className={mobile
        ? "d-flex d-md-none col-12 pb-5 pb-md-0 position-relative"
        : "col-lg-5 col-xl-6 col-12 order-lg-2 order-3 d-flex position-relative justify-content-md-center mt-md-5 mt-lg-0"}
      style={mobile ? undefined : { maxHeight: "41px" }}
    >
      <input
        type="search"
        className={`form-control ${mobile ? "" : "position-relative"}`}
        placeholder="Search your favourite anime..."
        value={search}
        style={{
          background: "#ffffff40",
          border: "2px solid white",
          borderRadius: "12px",
          color: "#7fff00ab",
          backdropFilter: "blur(1px)",
          maxWidth: mobile ? undefined : "30rem",
          maxHeight: mobile ? undefined : "41px",
          fontSize: mobile ? undefined : "18px",
          fontWeight: "600",
          fontFamily: "Comfortaa, cursive"
        }}
        onChange={(e) => SearchAnime(e.target.value)}
      />

      <button
        className={mobile ? "btn border-0 position-absolute" : "btn position-absolute end-0 ms-n3 me-md-4 me-lg-0"}
        style={mobile ? { right: "15px" } : undefined}
        type="submit"
      >
        <i className="fa fa-search text-white"></i>
      </button>
    </form>
  );

  return (
    <>
      <div>
        <div className='position-absolute'>
          <img src={background} alt='background' className="img-fluid" style={{ height: "514px", width: "100vw", objectFit: "cover", filter: "brightness(0.5)" }}></img>
        </div>

        <div className='container d-md-flex d-none justify-content-md-between position-relative text-white pt-md-5 px-0 flex-wrap'>
          <div className='d-flex col-md-3 col-12 order-md-1'>
            <img src={logo} alt='logo' className="img-fluid" style={{ width: "30px", height: "30px" }} />
            <h3 className='logo' style={{ fontFamily: 'Comfortaa, cursive', fontWeight: '900' }}>lover</h3>
          </div>

          {renderSearchForm()}

          <div className='d-flex col-md-3 col-12 order-md-2 order-1 justify-content-end'>
            {renderAuthButtons()}
          </div>
        </div>

        <div className='container text-white position-relative d-flex flex-column justify-content-md-center align-items-center text-center header-section' >
          <div className='d-flex d-md-none pt-3 pb-4 py-md-0'>
            <img src={logo} alt='logo' className="img-fluid" style={{ width: "30px", height: "30px" }} />
            <h1 style={{ fontFamily: 'Comfortaa, cursive' }}>lover</h1>
          </div>

          {renderSearchForm(true)}

          <div className='d-flex col-md-3 col-12 order-md-2 order-1 mt-4 mb-5 pb-5 justify-content-center d-md-none '>
            {renderAuthButtons("95px")}
          </div>

          <h2 style={{ fontFamily: 'Comfortaa, cursive', fontWeight: "900" }}>Stream more than <span className="head">10,000 </span>Animes<br />for free without any Ads.</h2>
        </div>
      </div>

      <div className='container position-relative text-white mt-5 mt-md-0 ' style={{ top: "-90px" }}>
        <SectionHeader heading1={"Trending Now"} heading2={"See all"} />
        <Carousel start={0} end={10} />
      </div>
      <div className='container position-relative mt-md-0 mt-0 '>
        <SectionHeader heading1={"Most Popular"} heading2={"See all"} />
        <Carousel start={10} end={20} />
      </div>

      <div className='container position-relative mt-md-5 mt-0 '>
        <FeaturedCarousel heading1={"Most Popular"} heading2={"See all"} />
      </div>

      <div className='container position-relative mt-md-5 mt-3  mb-5'>
        <GenreSections heading1={"Top Genres"} heading2={"See all"} />
      </div>

      <div className='text-center mt-4 mb-5 d-md-block'>
        {show === false ? <Button type="button" name="Load More" variant="outline" width="150px" onClick={() => { setShow(true) }} /> : ""}
        {show && <div className='container position-relative mt-md-5 mt-3  mb-5'>
          <GenreSections heading1={"Top Genres"} heading2={"See all"} />
        </div>}
      </div>
    </>
  )
}

export default Header
