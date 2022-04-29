import { useEffect, useState } from "react";
import axios from 'axios'
import { Link } from 'react-router-dom'
import { Figure, Button, Container } from 'react-bootstrap'
//import { BsXCircleFill } from "react-icons/bs";

function Watchlist(props){
    let user_id = props.user_id
    let movies_array = []
    let [movies, setMovies] = useState('')

    useEffect(()=>{
        axios.get('http://localhost:5888/watchlist/' + user_id).then((res) => {
        movies_array = res.data[0].movies
        //console.log(movies_array)
        movies_array = movies_array.map((movie)=> {
            return (<Link to={"/movie"} state={{movie_id: movie.movie_id}} key={movie.image}>
                <Figure className="movie">
                <Figure.Image
                    className="border border-light"
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
    }).catch((err)=>{console.log(err)})
    }, [])

    return(
        <Container>
            <h1 className="page_title">My Watchlist</h1>
            {movies}
        </Container>
    );
}

export default Watchlist;