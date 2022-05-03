import {useEffect, useState} from 'react'
import {Figure} from 'react-bootstrap'
import axios from "axios"; 
import {Link} from 'react-router-dom'
import { getIdToken, getAuth } from 'firebase/auth';



function Top250(props){
    let [movies, setMovies] = useState('')
    
    let auth = getAuth()
    console.log(auth)
    //let auth = props.auth;
    //console.log(props.auth)
    
    const sendRequest = () => {
        getIdToken(auth.currentUser).then((token)=>{
            axios.get("http://localhost:5888/top250", {headers: {Authorization: token}}).then((response) => {
                var movies_array = response.data.items.map((movie) => {
                    return (
                    <Link to={"/movie"} state={{movie_id:movie.id}} key={movie.id}>
                    <Figure className="movie">
                    <Figure.Image
                        className="border border-light effect"
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
        })
    }
    useEffect(() => {
        sendRequest()
    }, [])

    return(
        <div>
            <h1 className="page_title">Top 250 Movies of All Time</h1>
            {movies}   
        </div>
    );
}

export default Top250;