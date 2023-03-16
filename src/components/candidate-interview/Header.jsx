import React from "react";
import { Container, Navbar } from "react-bootstrap";


const Header = (props) => {
  return (
    <Navbar bg="dark" variant="dark">
      <Container>
        <Navbar.Brand>
          {props.title}
        </Navbar.Brand>
      </Container>
    </Navbar>
  );
};

export default Header;
