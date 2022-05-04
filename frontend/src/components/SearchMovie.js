import {useLocation,Link} from 'react-router-dom'
import {Figure} from 'react-bootstrap'
import { useEffect, useState} from 'react'
import { getIdToken, getAuth } from 'firebase/auth';
import axios from 'axios'

function SearchMovie(){
    let movie_searched = useLocation().state.movie
    console.log("The movie that was searched:" + movie_searched)

    let auth = getAuth()

    let [movies, setMovies] = useState('')

    const sendRequest = () => {
        getIdToken(auth.currentUser).then((token)=>{
            axios.get("http://localhost:5888/search/" + movie_searched, {headers: {Authorization: token}}).then((response) => {
                var movies_array = []
                movies_array = response.data.results.map((movie) => {
                    if(!movie.image.includes("nopicture")) {
                        return (<Link to={"/movie"} state={{id:movie.id}} className="movie">
                        <Figure>
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
        <div className="mt-5">
            {movies}
        </div>
    );
}

export default SearchMovie;