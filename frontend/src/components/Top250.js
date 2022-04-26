import {useEffect, useState} from 'react'
import {Figure, Row, Col} from 'react-bootstrap'
import axios from "axios"; 
import {Link} from 'react-router-dom'

function Top250(){
    let [movies, setMovies] = useState('')
    var movies_array = []

    const setUpMovies = () => {
        let organized_movies = []
        for(let i = 0; i < movies_array.length; i = i+5){
            let single_row = [
                <Row className="movies_row">
                    <Col>
                    {movies_array[i+0]}
                    </Col>
                    <Col>
                    {movies_array[i+1]}
                    </Col>
                    <Col>
                    {movies_array[i+2]}
                    </Col>
                    <Col>
                    {movies_array[i+3]}
                    </Col>
                    <Col>
                    {movies_array[i+4]}
                    </Col>
                </Row>
                ]
                organized_movies.push(single_row)
        }
        setMovies(organized_movies)
    }
    
    const sendRequest = () => {
        axios.get("http://localhost:5888/top250", {}).then((response) => {
            console.dir(response)
            movies_array = response.data.items.map((movie) => {
                return <div key={movie.id}>
                <Link to={"/movie"} state={{movie_id:movie.id}}>
                <Figure>
                <Figure.Image
                    className="border border-light"
                    width={171}
                    height={180}
                    alt="171x180"
                    src={movie.image}
                />
                {/* <Figure.Caption>
                    {movie.fullTitle}
                </Figure.Caption> */}
                </Figure>
                </Link></div>
            })
            setUpMovies()
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
            <h1 className="top250_title">Top 250 Movies of All Time</h1>
            <Row>
                {movies}
            </Row>
            
        </div>
    );
}

export default Top250;