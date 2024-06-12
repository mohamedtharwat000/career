import React, { useState, useContext } from 'react';
import {
  Navbar,
  NavbarBrand,
  NavbarToggler,
  Collapse,
  Nav,
  Button,
  NavItem,
} from 'reactstrap';
import context from './Context';
import OffcanvasLogin from './offcanvas/Login';
import OffcanvasSignup from './offcanvas/Signup';

function Header() {
  const { userData } = useContext(context);
  const [isNavOpen, setIsNavOpen] = useState(false);
  const [showLogin, setShowLogin] = useState(false);
  const [showSignup, setShowSignup] = useState(false);

  const toggleNavbar = () => setIsNavOpen(!isNavOpen);

  const toggleShowLogin = () => setShowLogin(!showLogin);

  const toggleShowSignup = () => setShowSignup(!showSignup);

  const handleLogout = () => {
    fetch('/api/logout', {
      method: 'DELETE',
    });
    localStorage.removeItem('userData');
    window.location.reload();
  };

  return (
    <>
      <Navbar
        color="dark"
        dark
        expand="lg"
      >
        <NavbarBrand href="#">Marbrains</NavbarBrand>

        <NavbarToggler onClick={toggleNavbar} />

        <Collapse
          isOpen={isNavOpen}
          navbar
        >
          <Nav
            className="ms-auto"
            navbar
          >
            {!userData.isLoggedIn ? (
              <>
                <NavItem className="m-1">
                  <Button
                    color="primary"
                    onClick={toggleShowLogin}
                    className="me-2"
                  >
                    Login
                  </Button>
                </NavItem>
                <NavItem className="m-1">
                  <Button
                    color="secondary"
                    onClick={toggleShowSignup}
                    className="me-2"
                  >
                    Sign Up
                  </Button>
                </NavItem>
              </>
            ) : (
              <>
                <NavItem className="m-1">
                  <Button
                    color="secondary"
                    onClick={handleLogout}
                  >
                    Logout
                  </Button>
                </NavItem>
                <NavItem className="m-1">
                  <Button color="primary">{userData.username}</Button>
                </NavItem>
              </>
            )}
          </Nav>
        </Collapse>
      </Navbar>

      <OffcanvasLogin
        show={showLogin}
        handleClose={toggleShowLogin}
        placement="end"
      />

      <OffcanvasSignup
        show={showSignup}
        handleClose={toggleShowSignup}
        placement="end"
      />
    </>
  );
}

export default Header;
