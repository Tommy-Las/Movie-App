import {useLocation} from 'react-router-dom'
import {Container, Col, Figure, Row, Carousel, Button} from 'react-bootstrap'
import axios from 'axios'
import { useEffect, useState } from 'react'
import addMovieWatchlist from './addMovieWatchlist'
import removeMovieWatchlist from './removeMovieWatchlist'
import movieInWatchlist from './movieInWatchlist'
import { BsStarFill } from "react-icons/bs";
import {getAuth, getIdToken} from 'firebase/auth'

function SingleMovie(props){

    let user_id = props.user_id
    let movie_id = useLocation().state.movie_id
    let [watchlistButton, setWatchlistButton] = useState('')

    let auth = getAuth()
    
    //all variables
    let [fullTitle, setFullTitle] = useState('')
    let [director, setDirector] = useState('')
    let [stars, setStars] = useState('')
    let [rating, setRating] = useState('')
    let [genre, setGenre] = useState('')
    let [description, setDescription] = useState('')
    let main_image = ''
    let [poster, setPoster] = useState('')
    let [minutes, setMinutes] = useState('')
    let [images, setImages] = useState('')

    const sendRequest = () => {

        getIdToken(auth.currentUser).then((token)=>{
            axios.get("http://localhost:5888/movie/" + movie_id, {headers: {Authorization: token}}).then((response)=>{
                setFullTitle(response.data.fullTitle);
                setDirector(response.data.directors);
                setStars(response.data.stars);
                setRating(response.data.imDbRating);
                setGenre(response.data.genres);
                main_image=response.data.image
                setPoster(response.data.image);
                setMinutes(response.data.runtimeMins);
                setDescription(response.data.plot);
            }).catch((err)=>{
                console.dir(err)
            })

            axios.get("http://localhost:5888/images/" + movie_id, {headers: {Authorization: token}}).then((response)=>{
                var images_array = response.data.items.map((image_element) => {
                    return(<Carousel.Item key={image_element.image}>
                        <img
                        className="carousel_image"
                        src={image_element.image}
                        alt={image_element.title}
                        />
                    </Carousel.Item>)
                })
                setImages(images_array)
            }).catch((err)=>{
                console.log(err)
            })
        })
        
        
        
    }
    const removeMovie = () => {
        removeMovieWatchlist(user_id, movie_id)
        setWatchlistButton(<Button variant="success" onClick={() => {addMovie()}}>
                    ADD TO MY WATCHLIST
                    </Button>)
    };

    const addMovie = () => {
        addMovieWatchlist(user_id, movie_id, main_image)
        setWatchlistButton(<Button variant="danger" onClick={() => {removeMovie()}}>REMOVE FROM MY WATCHLIST</Button>)
    }

    useEffect( () => {
        sendRequest()
    }, [])

    useEffect(()=>{
        movieInWatchlist(user_id, movie_id).then((res) => {
            console.log(res)
            if(res){
                setWatchlistButton(<Button variant="danger" onClick={() => {removeMovie()}}>
                    REMOVE FROM MY WATCHLIST
                    </Button>)
            } else{
                setWatchlistButton(<Button variant="success" onClick={() => {addMovie()}}>
                    ADD TO MY WATCHLIST
                    </Button>)
            }
        })
    }, [])

    return(
        <div>
            <Container fluid className="margin-top">
                <Row>
                    <Col className="poster_column">
                        <Row>
                        <Figure>
                            <Figure.Image
                                width={380}
                                height={380}
                                src={poster}
                            />
                            <Figure.Caption className="minutes">
                                {watchlistButton}
                            </Figure.Caption>
                        </Figure>
                        </Row>
                    </Col>
                    <Col className="info_column">
                        <h1>{fullTitle}</h1>
                        <h4>{"Directed by " + director}</h4><br/>
                        <p>{"Main Cast: " + stars}</p>
                        <p>{"Genre: " + genre}</p>
                        <Row>
                            <Col xs={3}>
                                <p><span><BsStarFill/></span>{" IMBd Rating: " + rating}</p>
                            </Col>
                            <Col>
                                <p>{ minutes + " mins"}</p>
                            </Col>
                        </Row>
                        
                        <p className='description'>{description}</p>
                        <div className='carousel_container'>
                            <Carousel  className = "carousel">
                                {images}
                            </Carousel>
                        </div>
                            
                    </Col>
                </Row>
            </Container>
        </div>
    );
}

export default SingleMovie;