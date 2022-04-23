import {useLocation,Link} from 'react-router-dom'
import {Card, Button, Figure} from 'react-bootstrap'
import image from "./joker.jpg"

function SearchMovie(){

    let movie = useLocation().state.movie
    console.log(movie)

    let handleClick = () => {
        console.log('image clicked')
    }
    return(
        <div>
            <h1>{"Movie Searched: " + movie}</h1>
                <Link to={"/movie"} state={{id:1234}}>
                <Figure>
                <Figure.Image
                    width={171}
                    height={180}
                    alt="171x180"
                    src={image}
                />
                <Figure.Caption>
                    Joker
                </Figure.Caption>
                </Figure>
                </Link>
        </div>
    );
}

export default SearchMovie;