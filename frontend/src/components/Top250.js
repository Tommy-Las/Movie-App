import {useEffect, useState} from 'react'
import {Figure, Container} from 'react-bootstrap'
import axios from "axios"; 
import {Link} from 'react-router-dom'

function Top250(){
    let [movies, setMovies] = useState('')
    
    const sendRequest = () => {
        axios.get("http://localhost:5888/top250", {}).then((response) => {
            console.dir(response)
            var movies_array = response.data.items.map((movie) => {
                return (
                <Link to={"/movie"} state={{movie_id:movie.id}}>
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
        }).catch((err)=>{
            console.log(err)
        })
    }

    useEffect(() => {
        sendRequest()
    }, [])

    return(
        <div>
            <h1 className="top250_title">Top 250 Movies of All Time</h1>
            {movies}   
        </div>
    );
}

export default Top250;