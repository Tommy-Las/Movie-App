import {useLocation} from 'react-router-dom'
import {Container, Col, Figure, Row, Carousel} from 'react-bootstrap'
import axios from 'axios'
import { useEffect, useState } from 'react'
import addMovieWatchlist from './addMovieWatchlist'
import removeMovieWatchlist from './removeMovieWatchlist'

import { propTypes } from 'react-bootstrap/esm/Image'

function SingleMovie(props){

    
    let user_id = props.user_id
    let movie_id = useLocation().state.movie_id

    let [inWatchlist, setInWatchlist] = useState(false)
    let [watchlistButton, setWatchlistButton] = useState('')

    
    useEffect(()=>{
        if(inWatchlist){
            setWatchlistButton(<button onClick={() => {removeMovieWatchlist(user_id, movie_id)}}>
                REMOVE FROM MY WATCHLIST
                </button>)
        } else{
            setWatchlistButton(<button onClick={() => {addMovieWatchlist(user_id, movie_id, poster)}}>
                ADD TO MY WATCHLIST
                </button>)
        }
    }, [])

    const isInWatchlist = () =>{
        
    }

    console.log("The movie id is: " + movie_id)
    //all variables
    let [fullTitle, setFullTitle] = useState('')
    let [director, setDirector] = useState('')
    let [stars, setStars] = useState('')
    let [rating, setRating] = useState('')
    let [genre, setGenre] = useState('')
    let [description, setDescription] = useState('')
    let [poster, setPoster] = useState('')
    let [minutes, setMinutes] = useState('')
    let [images, setImages] = useState('')
    
    const sendRequest = () => {
        axios.get("http://localhost:5888/movie/" + movie_id, {}).then((response)=>{
            setFullTitle(response.data.fullTitle);
            setDirector(response.data.directors);
            setStars(response.data.stars);
            setRating(response.data.imDbRating);
            setGenre(response.data.genres);
            setPoster(response.data.image);
            setMinutes(response.data.runtimeMins);
            setDescription(response.data.plot);
        }).catch((err)=>{
            console.dir(err)
        })
        
        axios.get("http://localhost:5888/images/" + movie_id, {}).then((response)=>{
            var images_array = response.data.items.map((image_element) => {
                return(<Carousel.Item key={image_element.image}>
                    <img
                    className="d-block w-100"
                    src={image_element.image}
                    alt={image_element.title}
                    />
                </Carousel.Item>)
            })
            setImages(images_array)
        }).catch((err)=>{
            console.log(err)
        })
    }

    useEffect(() => {
        sendRequest()
    }, [])

    return(
        <div>
            <Container fluid className="margin-top">
                <Row>
                    <Col className="poster_column">
                        <Figure>
                            <Figure.Image
                                width={350}
                                height={350}
                                src={poster}
                            />
                            <Figure.Caption>
                                {minutes}
                            </Figure.Caption>
                        </Figure>
                    </Col>
                    <Col className="info_column">
                        {inWatchlist}
                        <h1>{fullTitle}</h1>
                        <h4>{"Directed by " + director}</h4><br/>
                        <p>{"Main Cast: " + stars}</p>
                        <p>{"Genre: " + genre}</p>
                        <p>{"IMBd Rating: " + rating}</p>
                        <p>{description}</p>
                            <Carousel fade className = "carousel">
                                {images}
                            </Carousel>
                    </Col>
                </Row>
            </Container>
        </div>
    );
}

export default SingleMovie;