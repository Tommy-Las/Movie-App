import {useLocation,Link} from 'react-router-dom'
import {Figure} from 'react-bootstrap'
import { useEffect, useState} from 'react'
import axios from 'axios'

function SearchMovie(){

    let movie_searched = useLocation().state.movie
    console.log(movie_searched)

    let [movies, setMovies] = useState('')
    var movies_array = []

    const sendRequest = () => {
        axios.get("http://localhost:5888/search/" + movie_searched, {}).then((response) => {
            console.dir(response)
            movies_array = response.data.results.map((movie) => {
                return <div key={movie.id}>
                <Link to={"/movie"} state={{id:movie.id}}>
                <Figure>
                <Figure.Image
                    width={171}
                    height={180}
                    alt="171x180"
                    src={movie.image}
                />
                <Figure.Caption>
                    {movie.title}
                </Figure.Caption>
                </Figure>
                </Link></div>
            })
            setMovies(movies_array)

        }).catch((err)=>{
            console.log(err)
        })
    }
    useEffect(() => {
        console.log('in UseEffect')
        sendRequest()
    }, [])

    return(
        <div>
            <h1>{"Movie Searched: " + movie_searched}</h1>
            {movies}
        </div>
    );
}

export default SearchMovie;