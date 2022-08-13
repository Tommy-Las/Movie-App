import { Outlet, Link, useNavigate} from "react-router-dom";
import { Navbar, Nav, Container, FormControl, Button, NavDropdown, InputGroup} from 'react-bootstrap';
import { useState} from "react";
import { signOut, getAuth } from "firebase/auth";
import {BsSearch} from "react-icons/bs"
import image from "./logo.png"

/**
 * Navigation bar component that contains:
 * -A search bar
 * -Top250 access
 * -Watchlist Access
 * -Logout
 * 
 * @param {object} props component parameter
 * 
 * @returns the navigation var
 */
const NavigationBar = (props) => {
  //user picture that will be used for the logout button
  let user_photo = props.user_photo

  //use state hook for the searched value
  let [searchValue, setSearchValue] = useState("")
  const navigate = useNavigate();
  
  const auth = getAuth();

  const logOut = () => {
    signOut(auth).then(() => {
        // Sign-out successful.
        //I used navigate to load the home page
        navigate("/")
        console.log('User logged out successfuly')
    }).catch((error) => {
        // An error happened.
        console.log('Cannot log user out')
    });
}

  /**
   * 
   * Will navigate to the movies path and will be given as a parameter the search value
   * It will be pased using the state property from the router
   * @param {event} e 
   */
  const searchMovieRequest = (e) => {
    e.preventDefault()
    navigate('/movies', {state:{movie: searchValue}})
  } 

  return (
    <>
      <Navbar collapseOnSelect expand='lg' className="navbar" variant="dark">
        <Container fluid>
          <Navbar.Brand as={Link} to='/' className="navbar-brand">
            <img
            src={image}
            className="align-top logo"
            alt="logo"/>
            <h1 as={Link} to='/' className='logo-title'>
            Bear Movies
           </h1> 
          </Navbar.Brand>
          <Navbar.Toggle/>
            <Navbar.Collapse className='nav-items-container'>
              <Nav className='nav-items'>
                <InputGroup>
                  <FormControl
                    placeholder="Search"
                    value = {searchValue}
                    className='search-input'
                    onChange={(e) => { setSearchValue(e.target.value) }}
                  />
                  <Button className="search-btn" onClick={searchMovieRequest}>
                    <BsSearch/>
                  </Button>
                </InputGroup>
              </Nav>
              <Nav className="nav-items">
                <Nav.Link className='nav-btn'as={Link} to='/top250'>Top 250 Movies</Nav.Link>
                <Nav.Link className='nav-btn' as={Link} to='/watchlist'>My Watchlist</Nav.Link>
              </Nav>
              <Nav className="last-nav-item">
                <NavDropdown title={<img className='user_image' src={user_photo} alt=''/>}>
                      <NavDropdown.Item onClick={logOut}>Logout</NavDropdown.Item>
                </NavDropdown>
              </Nav>
            </Navbar.Collapse>
        </Container>
      </Navbar>
      <Outlet />
    </>

    
  );
};

export default NavigationBar;
