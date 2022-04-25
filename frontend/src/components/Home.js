import {Container} from 'react-bootstrap';
/**
 * Home page that displays a title and my information
 * 
 * @returns the whole home html page
 */
function Home(){
    console.log("In home")
    return (
            <div>
            <Container className="home_box border">
                <h1>Welcome to Bear Movies!</h1>
                <p>You can search for your favorite movie using the search bar on top, or view the Top 250 movies of all time</p>
                <p>Keep track of the movies you would like to watch in the future by adding them to your watchlist!</p>
                <p>Full Stack Web Development Final Project by Tommy Las Z23517623</p>   
            </Container>
                   
            </div>
        
    );
}

export default Home;