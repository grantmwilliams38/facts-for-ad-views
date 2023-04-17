import React, { useState } from 'react';
import ListGroup from 'react-bootstrap/ListGroup';
import Container from 'react-bootstrap/Container';
import Form from 'react-bootstrap/Form';
import Nav from 'react-bootstrap/Nav';
import Navbar from 'react-bootstrap/Navbar';
import NavDropdown from 'react-bootstrap/NavDropdown';
import { useNavigate } from "react-router-dom";

function NavbarWithSearch(props) {
  const [matchingCelebrities, setMatchingCelebrities] = useState([]);
  const [searchQuery, setSearchQuery] = useState('');
  const navigate = useNavigate();

  const handleSearchChange = (event) => {
    const query = event.target.value.toLowerCase();
    setSearchQuery(query);
    const matching = props.celebrityList.filter((celebrity) => {
      return query !== '' ? celebrity.toLowerCase().startsWith(query) : null;
    });
    setMatchingCelebrities(matching);
  };

  const handleCelebrityClick = (celebrity) => {
    // Do something with the clicked celebrity (e.g. show their image)
    navigate(celebrity)
    setSearchQuery([])
    setMatchingCelebrities([])
    console.log(`Clicked on ${celebrity}`);
    props.setActivePage(celebrity);
  };

  return (
    <div>
      <Navbar bg="light" expand="lg">
        <Container fluid>
          <Navbar.Brand onClick={() => handleCelebrityClick('')}>
            <img
              alt="Get to know logo"
              src={require("./images/util/trending-up.png")}
              width="30"
              height="30"
              className="d-inline-block align-top"
            />{' '}
            Get to know {props.activePage}
          </Navbar.Brand>
          <Navbar.Toggle aria-controls="navbarScroll" />
          <Navbar.Collapse id="navbarScroll">
            <Nav
              className="me-auto my-2 my-lg-0"
              style={{ maxHeight: '100px' }}
              navbarScroll
            >
              <NavDropdown title="All Pages" id="navbarScrollingDropdown">
                {props.celebrityList.map((celebrity) => {
                  if (celebrity === props.activePage) {
                    return (
                      <NavDropdown.Item key={celebrity} onClick={() => handleCelebrityClick(celebrity)}>
                        {celebrity}
                      </NavDropdown.Item>
                    );
                  } else {
                    return (
                      <NavDropdown.Item key={celebrity} onClick={() => handleCelebrityClick(celebrity)}>
                        {celebrity}
                      </NavDropdown.Item>
                    );
                  }
                })}
              </NavDropdown>
            </Nav>
            <Form className="d-flex">
              <Form.Control
                type="search"
                placeholder="Search"
                className="me-2"
                aria-label="Search"
                onChange={handleSearchChange}
                value={searchQuery}
              />
            </Form>
          </Navbar.Collapse>
        </Container>
      </Navbar>
      <div>
        <ListGroup>
          {matchingCelebrities.map((celebrity) => {
            if (celebrity === props.activePage) {
              return (
                <ListGroup.Item key={celebrity} onClick={() => handleCelebrityClick(celebrity)} variant="dark">
                  {celebrity}
                </ListGroup.Item>
              );
            } else {
              return (
                <ListGroup.Item key={celebrity} onClick={() => handleCelebrityClick(celebrity)} variant="secondary">
                  {celebrity}
                </ListGroup.Item>
              );
            }
          })}
        </ListGroup>
      </div>
    </div>
  );
}

export default NavbarWithSearch;