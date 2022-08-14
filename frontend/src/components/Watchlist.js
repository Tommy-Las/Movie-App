import { useEffect, useState } from "react";
import axios from 'axios'
import { Link } from 'react-router-dom'
import { Figure, Container } from 'react-bootstrap'
import { getIdToken, getAuth } from 'firebase/auth';

/**
 * make a GET request to /watchlist/:user_id to get all the movies in the users's watchlist 
 * it will return an array of all movies in the watchlist and will be modified using .map 
 * so it could be displayed on the website
 * 
 * @param {Object} props 
 * @returns all movies in the watchlist as a page
 */
function Watchlist(props){
    let user_id = props.user_id
    let movies_array = []
    let [movies, setMovies] = useState('')

    let auth = getAuth()

    useEffect(()=>{
        getIdToken(auth.currentUser).then((token)=>{
            axios.get('https://bearmovies.netlify.app/watchlist/' + user_id, {headers: {Authorization: token}}).then((res) => {
                movies_array = res.data[0].movies
                
                movies_array = movies_array.map((movie)=> {
                    return (<Link to={"/movie"} state={{movie_id: movie.movie_id}} key={movie.image}>
                        <Figure className="movie">
                        <Figure.Image
                            className="border border-light effect"
                            width={171}
                            height={180}
                            src={movie.image}
                        />
                        <Figure.Caption>
                        </Figure.Caption>
                        </Figure>
                    </Link>)
                    
                })
                setMovies(movies_array)  
        })
    }).catch((err)=>{console.log(err)})
    }, [])

    return(
        <>
            <h1 className="page_title">My Watchlist</h1>
            <div className="movies-container">
                {movies} 
            </div>
        </>
    );
}

export default Watchlist;