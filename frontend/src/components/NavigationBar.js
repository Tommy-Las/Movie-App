import { Outlet, Link, useNavigate} from "react-router-dom";
import { Navbar, Nav, Container, FormControl, Button} from 'react-bootstrap';
import { useState} from "react";
import { signOut, getAuth } from "firebase/auth";

const NavigationBar = () => {

  let [searchValue, setSearchValue] = useState("")
  const navigate = useNavigate();
  
  const auth = getAuth();

  const logOut = () => {
    signOut(auth).then(() => {
        // Sign-out successful.
        console.log('User logged out successfuly')
    }).catch((error) => {
        // An error happened.
        console.log('Cannot log user out')
    });
}
  const searchMovieRequest = (e) => {
    e.preventDefault()
    console.log('searched movie: ' + searchValue)
    navigate('/movies', {state:{movie: searchValue}})
  } 

  return (
    <>
      <Navbar collapseOnSelect expand='sm' variant='dark' className="navbar">
        <Container>
          <Navbar.Brand as={Link} to='/'>Bear Movies</Navbar.Brand>
          <Navbar.Toggle/>
          <Navbar.Collapse>
            <Nav>
              <Nav.Link as={Link} to='/watchlist'>My Watchlist</Nav.Link>
              <Nav.Link as={Link} to='/top250'>Top 250 Movies</Nav.Link>
              <Button onClick={logOut}>LOG OUT FRIEND</Button>
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
