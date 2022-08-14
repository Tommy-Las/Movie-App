import {useEffect, useState} from 'react'
import {Figure} from 'react-bootstrap'
import axios from "axios"; 
import {Link} from 'react-router-dom'
import { getIdToken, getAuth } from 'firebase/auth';


/**
 * Will make a GET request to /top250 to make an API call to request all top 250 movies
 * It will return an array of movies which will be modified using .map so it could be displayed on the page
 * @param {Object} props component parameters
 * @returns the page with all the top 250 movies 
 */
function Top250(props){
    let [movies, setMovies] = useState('')
    
    let auth = getAuth()

    /**
     * get the token to send to server as a header and do the GET request
     */
    const sendRequest = () => {
        getIdToken(auth.currentUser).then((token)=>{
            axios.get("https://bearmovies.netlify.app/top250", {headers: {Authorization: token}}).then((response) => {
                console.log(response)

                var movies_array = response.data.map((movie) => {
                    return (
                    <Link to={"/movie"} state={{movie_id:movie.id}} key={movie.id}>
                    <Figure className="movie">
                    <Figure.Image
                        className="border border-light effect"
                        width={171}
                        height={180}
                        src={movie.image}
                    />
                    </Figure>
                </Link>)
    
                })
                setMovies(movies_array)
            }).catch((err)=>{
                console.log(err)
            })
        })
    }
    useEffect(() => {
        sendRequest()
    }, [])

    return(
        <>
            <h1 className="page_title">Top 250 Movies of All Time</h1>
            <div className="movies-container">
                {movies} 
            </div>
        </>
    );
}

export default Top250;