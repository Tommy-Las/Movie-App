import {useLocation,Link} from 'react-router-dom'
import {Figure} from 'react-bootstrap'
import { useEffect, useState} from 'react'
import { getIdToken, getAuth } from 'firebase/auth';
import axios from 'axios'

/**
 * Function will send a request to /search/:movie_title with movie_title being the movie being searched
 * the get request will return an array which will be modified using .map so it could be display on the website
 * @returns all the movie options from the search done
 */
function SearchMovie(){
    //get the parameter from state
    let movie_searched = useLocation().state.movie

    console.log("The movie that was searched:" + movie_searched)

    let auth = getAuth()

    let [movies, setMovies] = useState('')

    /**
     * Get the token from the user and send it to the backend with the request
     */

    //https://bearmovies.herokuapp.com/search/
    //http://localhost:5888/search/

    const sendRequest = () => {
        getIdToken(auth.currentUser).then((token)=>{
            axios.get("https://bearmovies.herokuapp.com/search/" + movie_searched, {headers: {Authorization: token}}).then((response) => {
                var movies_array = []
                movies_array = response.data.results.map((movie) => {
                    //there are movies with no pictures, so only display movies that include a picture
                    if(!movie.image.includes("nopicture")) {
                        return (<Link to={"/movie"} state={{movie_id:movie.id}} >
                        <Figure className="movie">
                        <Figure.Image
                            className="border border-light effect"
                            width={171}
                            height={180}
                            src={movie.image}
                        />
                        </Figure>
                        </Link>)
                    }
                    else{
                        return <></>
                    }
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
        <div className="movies-container">
            {movies}
        </div>
    );
}

export default SearchMovie;