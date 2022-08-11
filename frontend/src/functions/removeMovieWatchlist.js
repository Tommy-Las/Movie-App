import axios from 'axios'

/**
 * 
 * using axios, sends a DELETE request to /watchlist to remove a movie from the watchlist of the user_id given
 * it will display to console a success or error message
 * @param {string} user_id 
 * @param {string} movie_id 
 */

function removeMovieWatchlist (user_id, movie_id) {
    let obj = {
        uid: user_id,
        movie_id : movie_id,
    }
    axios.delete('http://localhost:5888/watchlist', {params: obj}).then((res)=>{
        console.log(res)}).catch((err)=>{
            console.log(err)
        })
}

export default removeMovieWatchlist;