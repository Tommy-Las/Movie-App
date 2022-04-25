import {useEffect, useState} from 'react'
import {Figure, Row, Column} from 'react-bootstrap'
import axios from "axios"; 
import {Link} from 'react-router-dom'

function Top250(){
    let movie_poster = ""

    let [movies, setMovies] = useState('')
    var movies_array = []
    
    const sendRequest = () => {
        axios.get("http://localhost:5888/top250", {}).then((response) => {
            console.dir(response)
            movies_array = response.data.items.map((movie) => {
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
                    {movie.fullTitle}
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
            <h1>in Top250</h1>
            <Row>
                {movies}
            </Row>
            
        </div>
    );
}

export default Top250;