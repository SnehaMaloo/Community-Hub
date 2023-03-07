import React from 'react';
import { Link, useLocation } from 'react-router-dom';
import { Navbar, Nav, Container } from 'react-bootstrap';
import styled from "styled-components";
import Logout from "./Logout";

function NavbarComponent() {
  const location = useLocation();

  return (
    <StyledContainer fluid>
      <Navbar bg="dark" variant="light" expand="lg">
        <Navbar.Toggle aria-controls="basic-navbar-nav" />
        <Navbar.Collapse id="basic-navbar-nav">
          <Nav className="mr-auto">
            <Nav.Link as={Link} to="/home" activeclassname="active">
              Home
            </Nav.Link>
            <Nav.Link as={Link} to="/" activeclassname="active" >
              Chat
            </Nav.Link>
            <Nav.Link as={Link} to="/event" activeclassname="active">
              Event Calendar
            </Nav.Link>
            <Nav.Link as={Link} to="/leaderboard" activeclassname="active">
              Leaderboard
            </Nav.Link>
            <Nav.Link as={Link} to="/submission" activeclassname="active">
              Submissions
            </Nav.Link>
            <Logout/>
          </Nav>
        </Navbar.Collapse>
      </Navbar>
    </StyledContainer>
  );
}

const StyledContainer = styled(Container)`
  background-color: black;
  color: white;
  border: 1px solid black;
  padding: 1.5rem;
  .navbar-light .navbar-nav .nav-link {
    color: white;
    margin-right: 1rem;
  }

  .navbar-light .navbar-nav .nav-link:hover {
    color: black;
    background-color: white;
  }

  .active {
    font-weight: bold;
    color: white;
  }
`;

export default NavbarComponent;