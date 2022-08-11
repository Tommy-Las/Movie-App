import { useEffect } from 'react';
import {Container} from 'react-bootstrap';
import createUserWatchlist from '../functions/createUserWatchlist.js';

/**
 * Home page component that displays a title and my information
 * It will also import the createUserWatchlist function to create a watchlist for the user that just logged in
 * 
 * @returns the whole home html page
 */

 
function Home(props){

    createUserWatchlist(props.user_id)

    return (
            <div className='home'>
                <h1>Welcome to Bear Movies!</h1>
                <p>Search for your favorite movie using the search bar on top, or view the Top 250 movies of all time.</p>
                <p>Keep track of the movies you would like to watch in the future by adding them to your watchlist.</p>
                <p>Full Stack Web Development Final Project by Tommy Las Z23517623</p>   
            </div> 
    );
}

export default Home;