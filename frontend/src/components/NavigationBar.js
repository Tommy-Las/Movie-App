import { Outlet, Link, useNavigate} from "react-router-dom";
import { Navbar, Nav, Container, NavDropdown, Form, FormControl, Button} from 'react-bootstrap';
import { useState} from "react";
import SearchMovie from "./SearchMovie";

const NavigationBar = () => {

  let [searchValue, setSearchValue] = useState("")
  const navigate = useNavigate();
  
  const searchMovieRequest = (e) => {
    e.preventDefault()
    console.log('searched movie: ' + searchValue)
    navigate('/movies', {state:{movie: searchValue}})
  } 

  return (
    <>
      <Navbar collapseOnSelect expand='sm' bg='dark' variant='dark'>
        <Container>
          <Navbar.Brand as={Link} to='/'>Bear Movies</Navbar.Brand>
          <Navbar.Toggle aria-controls="responsive-navbar-bar"/>
          <Navbar.Collapse id ='responsive-navbar-nav'>
            <Nav>
              <Nav.Link as={Link} to='/watchlist'>My Watchlist</Nav.Link>
              <Nav.Link as={Link} to='/top250'>Top 250 Movies</Nav.Link>
            </Nav>
            <Nav>
              <FormControl placeholder="Search"
                    value = {searchValue}
                    onChange={(e) => { setSearchValue(e.target.value) }}/>
              <Button onClick={searchMovieRequest}>Search</Button>
            </Nav>
          </Navbar.Collapse>
        </Container>
      </Navbar>
      <Outlet />
    </>

    
  );
};

export default NavigationBar;
