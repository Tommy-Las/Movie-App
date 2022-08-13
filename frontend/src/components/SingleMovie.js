import {useLocation} from 'react-router-dom'
import {Container, Col, Figure, Row, Carousel, Button} from 'react-bootstrap'
import axios from 'axios'
import { useEffect, useState } from 'react'
import addMovieWatchlist from '../functions/addMovieWatchlist'
import removeMovieWatchlist from '../functions/removeMovieWatchlist'
import movieInWatchlist from '../functions/movieInWatchlist'
import { BsStarFill } from "react-icons/bs";
import {IoClose , IoAdd} from "react-icons/io5";
import {getAuth, getIdToken} from 'firebase/auth'

/**
 * 
 * Will display the single move interface with its information:
 * -Poster
 * -Full title
 * -Year released
 * -Director
 * -Main Cast
 * -IMBd rating
 * -Lenght
 * -Description
 * -Images
 *
 * Will also make two API calls for the movie information and its images
 * 
 * @param {Object} props component parameters
 * @returns the single movie page
 */
function SingleMovie(props){
    const user_id = props.user_id
    const movie_id = useLocation().state.movie_id
    const auth = getAuth()
    let main_image = ''
    
    //set all variables
    const [fullTitle, setFullTitle] = useState('')
    const [director, setDirector] = useState('')
    const [stars, setStars] = useState('')
    const [rating, setRating] = useState('')
    const [genre, setGenre] = useState('')
    const [description, setDescription] = useState('')
    const [poster, setPoster] = useState('')
    const [minutes, setMinutes] = useState('')
    const [images, setImages] = useState('')
    const [watchlistButton, setWatchlistButton] = useState('')


    /**
     * First, we need to get the id token of the user and will be sent as a header to the backend
     * Then make two GET requests:
     * 
     * One GET request to /movie/:movie_id to get the information of the given movie_id
     * The other GET request to /images/:movie_id to get the images of the given movie_id
     */
    const sendRequest = () => {
        getIdToken(auth.currentUser).then((token)=>{
            axios.get("http://localhost:5888/movie/" + movie_id, {headers: {Authorization: token}}).then((response)=>{
                //set all use state hooks with the new information
                setFullTitle(response.data.fullTitle);
                setDirector(response.data.directors);
                setStars(response.data.stars);
                setRating(response.data.imDbRating);
                setGenre(response.data.genres);
                setPoster(response.data.image);
                main_image = response.data.image
                setMinutes(response.data.runtimeMins);
                setDescription(response.data.plot);
            }).catch((err)=>{
                console.dir(err)
            })

            axios.get("http://localhost:5888/images/" + movie_id, {headers: {Authorization: token}}).then((response)=>{
                var images_array = response.data.items.map((image_element) => {
                    //carousel item that contains the image
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

    //send request once when page loads
    useEffect( () => {
        sendRequest()
    }, [])

    /**
     * Will call the removeMovieWatchlist function to remove the given movie from the watchlist
     * and it will set the button so the user can add the movie to the watchlist
     */
    const removeMovie = () => {
        removeMovieWatchlist(user_id, movie_id)
        setWatchlistButton(
        <Button className='watchlist-btn'  variant="success" onClick={() => {addMovie()}}>
        Add to Watchlist<IoAdd className='icon' />
        </Button>)
    };

    /**
     * Will call the addMovieWatchlist to add the given movie to the watchlist of the user_id
     * And it will set the button so the user can remove the movie from the watchlist 
     */
    const addMovie = () => {
        addMovieWatchlist(user_id, movie_id, main_image)
        setWatchlistButton(
        <Button className='watchlist-btn' variant="danger" onClick={() => {removeMovie()}}>
            Remove from Watchlist<IoClose className="icon" />
         </Button>)
    }

    //when page loads it will check by running the movieInWatchlist function 
    //to check whether the movie is in the watchlist or not
    useEffect(()=>{
        movieInWatchlist(user_id, movie_id).then((res) => {
            if(res){
                setWatchlistButton(
                <Button className='watchlist-btn' variant="danger" onClick={() => {removeMovie()}}>
                    Remove from Watchlist<IoClose className="icon" />
                </Button>)
            }
            else{
                setWatchlistButton(
                <Button className='watchlist-btn'  variant="success" onClick={() => {addMovie()}}>
                    Add to Watchlist<IoAdd className='icon' />
                </Button>)
            }
        })
    }, [])

    return(
        <div className='movie-box'>
            <Container fluid>
                <div className='watchlist-btn-position'>
                </div>
                <Row>
                    <Col className="poster_column">
                        <Row>
                        <Figure>
                            <Figure.Image
                                width={320}
                                height={320}
                                src={poster}
                            />
                            <Figure.Caption className="minutes">
                                {minutes + " mins"}
                            </Figure.Caption>
                        </Figure>
                        </Row>
                    </Col>
                    <Col className="info_column">
                        <h1>{fullTitle}</h1>
                        <h4>{"Directed by " + director}</h4><br/>
                        <p>{"Main Cast: " + stars}</p>
                        <p>{"Genre: " + genre}</p>
                        <p><BsStarFill id='imbd-star'/>{" IMBd Rating: " + rating}</p>
                        <p className='description'>{description}</p>
                        <br />
                        {watchlistButton}
                    </Col>
                </Row>
                <div className='carousel_container'>
                    <Carousel  className = "carousel">
                        {images}
                    </Carousel>
                </div>
            </Container>
        </div>
    );
}

export default SingleMovie;