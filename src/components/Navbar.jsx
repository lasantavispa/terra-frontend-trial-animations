import React, { useState, useEffect } from 'react';
import { Link } from 'react-router-dom';
import PropTypes from 'prop-types';
import { AiOutlineClose, AiOutlineMenu } from 'react-icons/ai';
import '../scss/NavBar.scss';

function Navbar({ navbar }) {
  const [nav, setNav] = useState(false);
  const handleNav = () => {
    setNav(!nav);
  };
  const closeNav = () => {
    setNav(false);
  };

  useEffect(() => {
    const handleResize = () => {
      if (window.innerWidth >= 768 && nav) {
        setNav(false);
      }
    };
    window.addEventListener('resize', handleResize);
    return () => window.removeEventListener('resize', handleResize);
  }, [nav]);

  return (
    <>
      <header className="navbar">
        <Link to="/">
          {' '}
          <img src={navbar.logo} alt="logo" className="navbar__logo fadeIn" />
        </Link>
        <div className="navbar__hamburger fadeIn">
          {nav ? (
            <AiOutlineClose size={30} onClick={closeNav} />
          ) : (
            <AiOutlineMenu size={30} onClick={handleNav} />
          )}
        </div>
        <nav className={`${nav ? 'hamburger' : 'hidden'}`}>
          <ul className="navbar__list fadeIn">
            <li>{navbar.menu.menu_item_1}</li>
            <li>
              <Link to={`/story`} onClick={closeNav}>
                {navbar.menu.menu_item_2}
              </Link>
            </li>
            <li>{navbar.menu.menu_item_3}</li>
          </ul>
        </nav>
      </header>
      <div
        className={`navbar__blur ${nav ? 'visible' : ''}`}
        onClick={closeNav}
      ></div>
    </>
  );
}

Navbar.propTypes = {
  navbar: PropTypes.shape({
    logo: PropTypes.string.isRequired,
    menu: PropTypes.shape({
      menu_item_1: PropTypes.string.isRequired,
      menu_item_2: PropTypes.string.isRequired,
      menu_item_3: PropTypes.string.isRequired,
    }).isRequired,
  }),
};

export default Navbar;
