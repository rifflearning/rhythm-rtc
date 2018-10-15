import React, { Component } from "react";
import { withRouter } from 'react-router-dom';
import styled, { injectGlobal, keyframes } from 'styled-components';
import { Link } from 'react-router-dom';

// Styling
const Brandimg = styled.img`
  width: 63px;
  height: 50px;
`;

const NavBar = styled.nav.attrs({
  className: 'navbar is-transparent'
})`
  background-color:rgba(255, 255, 255, 0);
  max-height: 4rem;
  .navbar-item img {
    max-height: 100%;
  }
`;

const ProfileLinks = (props) => {
  if (!props.loggedIn) {
    return (
      <div className="navbar-end">
        <a className="navbar-item" href="mailto:beta@rifflearning.com">Send Feedback</a>
        <Link className='navbar-item' to="/signup">Sign Up</Link>
        <Link className='navbar-item' to="/login">Login</Link>
      </div>);
  } else {
    return <div className="navbar-end">
      <a className='navbar-item' href="mailto:beta@rifflearning.com">Send Feedback</a>
      <Link className='navbar-item' to="/profile">Profile</Link>
      <Link className='navbar-item' to="/home" onClick={ props.handleLogOut }>Log Out</Link>
      </div>;
  }
}

const NavBarView = ({loggedIn, menuOpen, handleLogOut, handleBurgerClick}) => (
  <NavBar role="navigation" aria-label="main navigation">
    <div className="navbar-brand">
      <Link className="navbar-item" to="/home">
      <Brandimg src={require('../../../assets/rifflogo.jpeg')}/>
    </Link>
      <div className={menuOpen ? 'navbar-burger burger is-active' : 'navbar-burger burger'} onClick={event => handleBurgerClick(event)}>
      <span></span>
      <span></span>
      <span></span>
    </div>
  </div>
    <div className={menuOpen ? 'navbar-menu is-active' : 'navbar-menu'}>
    <div className="navbar-start">
      <Link className='navbar-item' to="/riffs">My Riffs</Link>
      <Link className='navbar-item' to="/room">Chat</Link>
      <a className='navbar-item' href="https://rifflearning.com">Learn More</a>
    </div>
    <ProfileLinks loggedIn={loggedIn} handleLogOut={handleLogOut}></ProfileLinks>
  </div>
</NavBar>
);

export default withRouter(NavBarView);
