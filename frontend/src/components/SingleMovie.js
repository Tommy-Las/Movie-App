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
import AddToWatchlistButton from './AddToWatchlistButton'
import RemoveFromWatchlistButton from './RemoveFromWatchlistButton'

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

    let user_id = props.user_id
    let movie_id = useLocation().state.movie_id
    console.log(movie_id)
    let [watchlistButton, setWatchlistButton] = useState('')

    let auth = getAuth()
    
    //set all variables
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
                main_image=response.data.image
                setPoster(response.data.image);
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

    /**
     * Will call the removeMovieWatchlist function to remove the given movie from the watchlist
     * and it will set the button so the user can add the movie to the watchlist
     */

    const removeMovie = () => {
        removeMovieWatchlist(user_id, movie_id)
        setWatchlistButton(<AddToWatchlistButton />)
    };

    /**
     * Will call the addMovieWatchlist to add the given movie to the watchlist of the user_id
     * And it will set the button so the user can remove the movie from the watchlist 
     */
    const addMovie = () => {
        addMovieWatchlist(user_id, movie_id, main_image)
        setWatchlistButton(<RemoveFromWatchlistButton />)
    }

    //send request once when page loads
    useEffect( () => {
        sendRequest()
    }, [])


    //when page loads it will check by running the movieInWatchlist function 
    //to check whether the movie is in the watchlist or not
    useEffect(()=>{
        movieInWatchlist(user_id, movie_id).then((res) => {
            console.log(res)
            //if movie is in the watchlist
            if(res){
                setWatchlistButton(<RemoveFromWatchlistButton />)
            } else{
                setWatchlistButton(setWatchlistButton(<AddToWatchlistButton />))
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
                        <h1>{fullTitle}{watchlistButton}</h1>
                        <h4>{"Directed by " + director}</h4><br/>
                        <p>{"Main Cast: " + stars}</p>
                        <p>{"Genre: " + genre}</p>
                        <p><BsStarFill id='imbd-star'/>{" IMBd Rating: " + rating}</p>
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