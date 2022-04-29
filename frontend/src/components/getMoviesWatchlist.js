import axios from 'axios'
import { useState } from 'react'
import { Link } from 'react-router-dom'
import { Figure } from 'react-bootstrap'

function GetMoviesWatchlist (props) {
    let [movies, setMovies] = useState('')
    let user_id = props.user_id
    let movies_array = []
    axios.get('http://localhost:5888/watchlist/' + user_id).then((res) => {
        movies_array = res.data[0].movies
        console.log(movies_array)
        movies_array = movies_array.map((movie)=> {
            return (
                <Link to={"/movie"} state={{movie_id:movie.id}} key={movie.id}>
                <Figure className="movie">
                <Figure.Image
                    className="border border-light"
                    width={171}
                    height={180}
                    src={movie.image}
                />
                </Figure>
            </Link>)
        })
        setMovies(movies_array)
    }).catch((err)=>{console.log(err)})
    
    return <div>{movies}</div>
}

export default GetMoviesWatchlist;